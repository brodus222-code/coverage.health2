import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str: unknown, maxLen: number): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n\t]/g, ' ').replace(/[<>]/g, '').replace(/["'`\\]/g, '').slice(0, maxLen).trim();
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!EMAIL_RE.test(rawEmail) || rawEmail.length > 254) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const full_name = sanitize(body.full_name, 100);
    const zip = sanitize(body.zip, 10);
    const state = sanitize(body.state, 50);
    const household = sanitize(body.household, 20);
    const age = typeof body.age === 'number' ? body.age : undefined;
    const age_range = sanitize(body.age_range, 20);
    const income = sanitize(body.income, 50);

    const firstName = full_name ? full_name.split(' ')[0] : 'there';

    const profileBits = [];
    if (state) profileBits.push(`located in ${state}`);
    if (household) profileBits.push(`household of ${household}`);
    if (age) profileBits.push(`age ${age}`);
    else if (age_range) profileBits.push(`age range ${age_range}`);
    if (income) profileBits.push(`income bracket "${income}"`);
    const profileContext = profileBits.length ? profileBits.join(', ') : 'seeking health coverage';

    const prompt = `You are writing a friendly follow-up email for Coverage.Health, a licensed health insurance agency (HealthLink Insurance Agency LLC).

LEAD DETAILS:
- Name: ${full_name || 'Not provided'}
- First name to use in greeting: ${firstName}
- ZIP: ${zip || 'Not provided'}
- State: ${state || 'Not provided'}
- Household size: ${household || 'Not provided'}
- Age: ${age || age_range || 'Not provided'}
- Income bracket: ${income || 'Not provided'}

PROFILE SUMMARY: ${profileContext}

This person requested a health insurance quote about a week ago but hasn't moved forward yet. Write a warm, low-pressure follow-up email that:
1. Gently checks in — acknowledges they requested a quote and we haven't connected yet
2. Reminds them of the value — personalized plan options from top carriers (Blue Cross Blue Shield, UnitedHealthcare, Anthem), potential ACA subsidies that could lower their premium
3. Mentions their specific situation naturally (${profileContext}) so it feels personal, not generic
4. Offers two easy next steps: reply to this email, or call (855) 395-5001 (Mon–Fri, 8am–8pm ET)
5. Reassures them there's no obligation — we're here to help them find the best fit
6. Closes warmly, signed "The Coverage.Health Team"

STYLE REQUIREMENTS:
- Clean, responsive HTML email with inline styles (no external CSS, no <style> tags)
- Max-width 600px container, centered, with padding
- Calm, trustworthy color palette: white background, dark slate text (#1A202C), gold accent (#EAB308) for the headline or key elements
- Keep body text concise (150-200 words)
- Include a prominent call-to-action button linking to tel:+18553955001
- Address them by first name in the greeting
- Do NOT include legal disclaimers, TCPA text, or footers about licensing

Return a JSON object with "subject" (an engaging, personalized subject line under 60 chars) and "html" (the complete HTML email).`;

    const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          subject: { type: 'string' },
          html: { type: 'string' }
        }
      }
    });

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secrets.get('RESEND_API')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Coverage.Health <no-reply@coverage.health>',
        to: [rawEmail],
        subject: llmResult.subject,
        html: llmResult.html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return Response.json({ error: `Resend API error: ${errText}` }, { status: 500 });
    }

    const resendData = await resendRes.json();
    return Response.json({ success: true, message_id: resendData.id, subject: llmResult.subject });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}