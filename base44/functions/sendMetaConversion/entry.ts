import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

const PIXEL_ID = '1365271749041016';

async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Service-role call from the workflow — must be authenticated.
    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const accessToken = secrets.get('META_ACCESS_TOKEN');
    if (!accessToken) {
      return Response.json({ error: 'META_ACCESS_TOKEN not configured' }, { status: 500 });
    }

    const event_id = typeof body.event_id === 'string' ? body.event_id.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = typeof body.phone === 'string' ? body.phone.replace(/\D/g, '') : '';
    const zip = typeof body.zip === 'string' ? body.zip.trim() : '';
    const state = typeof body.state === 'string' ? body.state.trim().toLowerCase() : '';
    const full_name = typeof body.full_name === 'string' ? body.full_name.trim() : '';
    const landing_page = typeof body.landing_page === 'string' ? body.landing_page : '';
    const user_agent = typeof body.user_agent === 'string' ? body.user_agent : '';
    const fbclid = typeof body.fbclid === 'string' ? body.fbclid.trim() : '';
    const fbp = typeof body.fbp === 'string' ? body.fbp.trim() : '';

    // Build hashed user_data for Advanced Matching (SHA-256 required by CAPI).
    const userData: Record<string, string[]> = {};
    if (email) userData.em = [await sha256(email)];
    if (phone) userData.ph = [await sha256(phone)];
    if (zip) userData.zp = [await sha256(zip)];
    if (state) userData.st = [await sha256(state)];
    if (full_name) {
      const parts = full_name.split(/\s+/);
      if (parts[0]) userData.fn = [await sha256(parts[0].toLowerCase())];
      if (parts.length > 1) userData.ln = [await sha256(parts.slice(1).join(' ').toLowerCase())];
    }
    // fbc constructed from fbclid — Meta's click ID for attribution.
    if (fbclid) userData.fbc = [`fb.1.${Date.now()}.${fbclid}`];
    // fbp — browser ID from the _fbp cookie, passed from the client.
    if (fbp) userData.fbp = [fbp];
    if (user_agent) userData.client_user_agent = user_agent;

    const payload = {
      data: [{
        event_name: 'Lead',
        event_id: event_id || undefined,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: landing_page || undefined,
        user_data: userData,
        custom_data: {
          content_name: 'Health Insurance Quote',
          content_category: 'Health Insurance',
        }
      }],
      access_token: accessToken,
    };

    const response = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      return Response.json({ error: `Meta CAPI error: ${JSON.stringify(result)}` }, { status: 500 });
    }

    return Response.json({ success: true, fb_trace_id: result.fb_trace_id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}