import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

function sanitize(str: unknown, maxLen: number): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n\t]/g, ' ').replace(/[<>]/g, '').replace(/["'`\\]/g, '').slice(0, maxLen).trim();
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const full_name = escapeHtml(sanitize(body.full_name, 100));
    const email = escapeHtml(sanitize(body.email, 254));
    const phone = escapeHtml(sanitize(body.phone, 20));
    const state = escapeHtml(sanitize(body.state, 50));
    const zip = escapeHtml(sanitize(body.zip, 10));
    const leadId = escapeHtml(sanitize(body.lead_id, 100));

    const leadDetails = [
      `Name: ${full_name || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Phone: ${phone || 'Not provided'}`,
      `State: ${state || 'Not provided'}`,
      `ZIP: ${zip || 'Not provided'}`,
      `Lead ID: ${leadId || 'Not provided'}`
    ].join('<br>');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #dc2626; margin-bottom: 8px;">⚠️ Cold Lead Alert</h2>
        <p style="color: #64748b; margin-bottom: 20px;">This lead was created 14 days ago, received a follow-up email 7 days ago, and still hasn't selected a plan or been contacted. Time to reach out personally.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #1A202C;">${leadDetails}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="color: #94a3b8; font-size: 12px;">Coverage.Health Lead System — Automated follow-up workflow</p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secrets.get('RESEND_API')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Coverage.Health Leads <no-reply@coverage.health>',
        to: ['john@healthlinkagency.com'],
        subject: `Cold Lead Alert: ${full_name || 'Unknown'} - ${state || 'Unknown State'}`,
        html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return Response.json({ error: `Resend API error: ${errText}` }, { status: 500 });
    }

    const resendData = await resendRes.json();
    return Response.json({ success: true, message_id: resendData.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}