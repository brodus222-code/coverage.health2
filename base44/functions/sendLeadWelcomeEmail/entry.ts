import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { requireAdmin } from '../../shared/requireAdmin.ts';
import { secrets } from 'base44:runtime';

import { sanitize, escapeHtml } from '../../shared/emailSanitize.ts';
import { welcomeEmail } from '../../shared/leadEmailTemplate.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function(req: Request): Promise<Response> {
  try {
    // Require authentication — blocks unauthenticated open-relay abuse
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const base44 = createClientFromRequest(req);

    // Require platform-authenticated request. isAuthenticated() returns true
    // only for valid user tokens or legitimate service-role workflow invocations;
    // invalid/missing tokens are rejected here before any catch-block logic.
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

    // Validate and sanitize email
    const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!EMAIL_RE.test(rawEmail) || rawEmail.length > 254) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Sanitize all user-supplied inputs before LLM concatenation
    const full_name = sanitize(body.full_name, 100);
    const zip = sanitize(body.zip, 10);
    const state = sanitize(body.state, 50);
    const household = sanitize(body.household, 20);
    const age = typeof body.age === 'number' ? body.age : undefined;
    const age_range = sanitize(body.age_range, 20);
    const income = sanitize(body.income, 50);

    const email = welcomeEmail(body);

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

    // Send lead notification to internal team — escape all user-supplied values
    const escPhone = escapeHtml(sanitize(body.phone, 20));
    const escVariant = escapeHtml(sanitize(body.variant, 2));
    const escLanding = escapeHtml(sanitize(body.landing_page, 200));
    const escUtmSource = escapeHtml(sanitize(body.utm_source, 100));
    const escUtmCampaign = escapeHtml(sanitize(body.utm_campaign, 100));
    const escGclid = escapeHtml(sanitize(body.gclid, 100));
    const escFbclid = escapeHtml(sanitize(body.fbclid, 100));
    const escTcpaTs = escapeHtml(sanitize(body.tcpa_timestamp, 50));

    const leadDetails = [
      `Name: ${escapeHtml(full_name || 'Not provided')}`,
      `Email: ${escapeHtml(rawEmail)}`,
      `Phone: ${escPhone}`,
      `ZIP: ${escapeHtml(zip || 'Not provided')}`,
      `State: ${escapeHtml(state || 'Not provided')}`,
      `Household: ${escapeHtml(household || 'Not provided')}`,
      `Age: ${escapeHtml(String(age || age_range || 'Not provided'))}`,
      `Income: ${escapeHtml(income || 'Not provided')}`,
      `Variant: ${escVariant}`,
      `Landing Page: ${escLanding}`,
      `UTM Source: ${escUtmSource}`,
      `UTM Campaign: ${escUtmCampaign}`,
      `GCLID: ${escGclid}`,
      `FBCLID: ${escFbclid}`,
      `TCPA Consent: ${body.tcpa_consent ? 'Yes' : 'No'}`,
      `TCPA Timestamp: ${escTcpaTs}`
    ].join('<br>');

    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #EAB308; margin-bottom: 8px;">🔔 New Lead Received</h2>
        <p style="color: #64748b; margin-bottom: 20px;">A new health insurance lead has been captured on Coverage.Health.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #1A202C;">${leadDetails}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="color: #94a3b8; font-size: 12px;">Coverage.Health Lead System</p>
      </div>
    `;

    const notifyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secrets.get('RESEND_API')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Coverage.Health Leads <no-reply@coverage.health>',
        to: ['john@healthlinkagency.com'],
        subject: `New Lead: ${full_name || 'Unknown'} - ${state || 'Unknown State'}`,
        html: notificationHtml
      })
    });

    return Response.json({ success: true, message_id: resendData.id, subject: email.subject, notification_sent: notifyRes.ok });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}