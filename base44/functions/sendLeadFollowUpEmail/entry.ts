import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { requireAdmin } from '../../shared/requireAdmin.ts';
import { secrets } from 'base44:runtime';

import { followUpEmail } from '../../shared/leadEmailTemplate.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For user-authenticated calls, require admin role.
    // Service-role calls (from the workflow) have no user context —
    // isAuthenticated() is true but me() throws, which is expected.
    const denied = await requireAdmin(base44);
    if (denied) return denied;

    const body = await req.json();
    const leadId = typeof body.lead_id === 'string' ? body.lead_id.trim() : '';
    if (!leadId) {
      return Response.json({ error: 'lead_id is required' }, { status: 400 });
    }

    // Use the caller's permissions: admins and workflow service-role calls can
    // read leads; ordinary users cannot bypass Lead read restrictions.
    const leads = await base44.entities.Lead.filter({ id: leadId }, undefined, 1);
    const lead = leads[0];
    if (!lead) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }
    if (lead.tcpa_consent !== true || (lead.status || 'New') !== 'New' || lead.selected_plan) {
      return Response.json({ skipped: true, reason: 'Lead is not eligible for follow-up' });
    }

    // Never use a recipient or personalization supplied in the invocation.
    const rawEmail = typeof lead.email === 'string' ? lead.email.trim().toLowerCase() : '';
    if (!EMAIL_RE.test(rawEmail) || rawEmail.length > 254) {
      return Response.json({ error: 'Invalid stored email address' }, { status: 400 });
    }

    const email = followUpEmail(lead);

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secrets.get('RESEND_API')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Coverage.Health <no-reply@coverage.health>',
        to: [rawEmail],
        subject: email.subject,
        html: email.html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return Response.json({ error: `Resend API error: ${errText}` }, { status: 500 });
    }

    const resendData = await resendRes.json();
    return Response.json({ success: true, message_id: resendData.id, subject: email.subject });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}