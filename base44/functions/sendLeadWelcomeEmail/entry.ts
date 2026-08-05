import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

export default async function(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { email, full_name, zip, state, household, age, age_range, income } = body;

    if (!email) {
      return Response.json({ error: 'No email address on lead' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    const firstName = full_name ? full_name.split(' ')[0] : 'there';

    const profileBits = [];
    if (state) profileBits.push(`located in ${state}`);
    if (household) profileBits.push(`household of ${household}`);
    if (age) profileBits.push(`age ${age}`);
    else if (age_range) profileBits.push(`age range ${age_range}`);
    if (income) profileBits.push(`income bracket "${income}"`);
    const profileContext = profileBits.length ? profileBits.join(', ') : 'seeking health coverage';

    const prompt = `You are writing a personalized welcome email for Coverage.Health, a licensed health insurance agency (HealthLink Insurance Agency LLC).

LEAD DETAILS:
- Name: ${full_name || 'Not provided'}
- First name to use in greeting: ${firstName}
- ZIP: ${zip || 'Not provided'}
- State: ${state || 'Not provided'}
- Household size: ${household || 'Not provided'}
- Age: ${age || age_range || 'Not provided'}
- Income bracket: ${income || 'Not provided'}

PROFILE SUMMARY: ${profileContext}

Write a high-quality, professional, warm HTML email that:
1. Confirms we received their health insurance quote request
2. Briefly and naturally acknowledges their specific situation (${profileContext}) — be specific but not invasive or repetitive
3. Explains the next step: a licensed insurance advisor will call them within one business day to review personalized plan options from top carriers
4. Provides the direct phone number (855) 395-5001 and mentions business hours (Mon–Fri, 8am–8pm ET) in case they want to talk sooner
5. Reassures them there is no obligation — we compare plans from carriers like Blue Cross Blue Shield, UnitedHealthcare, and Anthem to find the best fit
6. Closes warmly, signed "The Coverage.Health Team"

STYLE REQUIREMENTS:
- Clean, responsive HTML email with inline styles (no external CSS, no <style> tags)
- Max-width 600px container, centered, with padding
- Use a calm, trustworthy color palette: white background, dark slate text (#1A202C), gold accent (#EAB308) for the headline or key elements
- Keep body text concise (150-200 words)
- Include a prominent call-to-action button linking to tel:+18553955001
- Address them by first name in the greeting
- Do NOT include legal disclaimers, TCPA text, or footers about licensing — those are handled elsewhere

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
        to: [email],
        subject: llmResult.subject,
        html: llmResult.html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return Response.json({ error: `Resend API error: ${errText}` }, { status: 500 });
    }

    const resendData = await resendRes.json();

    // Send lead notification to internal team
    const leadDetails = [
      `Name: ${full_name || 'Not provided'}`,
      `Email: ${email}`,
      `Phone: ${body.phone || 'Not provided'}`,
      `ZIP: ${zip || 'Not provided'}`,
      `State: ${state || 'Not provided'}`,
      `Household: ${household || 'Not provided'}`,
      `Age: ${age || age_range || 'Not provided'}`,
      `Income: ${income || 'Not provided'}`,
      `Variant: ${body.variant || 'A'}`,
      `Landing Page: ${body.landing_page || 'Not provided'}`,
      `UTM Source: ${body.utm_source || 'None'}`,
      `UTM Campaign: ${body.utm_campaign || 'None'}`,
      `GCLID: ${body.gclid || 'None'}`,
      `FBCLID: ${body.fbclid || 'None'}`,
      `TCPA Consent: ${body.tcpa_consent ? 'Yes' : 'No'}`,
      `TCPA Timestamp: ${body.tcpa_timestamp || 'None'}`
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
        subject: `New Lead: ${full_name || 'Unknown'} — ${state || 'Unknown State'}`,
        html: notificationHtml
      })
    });

    return Response.json({ success: true, message_id: resendData.id, subject: llmResult.subject, notification_sent: notifyRes.ok });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}