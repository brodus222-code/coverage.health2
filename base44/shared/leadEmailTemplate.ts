// Fixed, code-owned lead email templates. Lead data comes from public forms,
// so only strictly allowlisted values are ever inserted — no free text, no links
// beyond the ones hardcoded here.
import { escapeHtml } from './emailSanitize.ts';

const HOUSEHOLDS: Record<string, string> = {
  'Just me': 'just you',
  'Me + spouse': 'you and your spouse',
  'Me + kids': 'you and your kids',
  'Whole family': 'your whole family',
};

function safeFirstName(fullName: unknown): string {
  const first = typeof fullName === 'string' ? fullName.trim().split(/\s+/)[0] : '';
  return /^[A-Za-z][A-Za-z-]{0,29}$/.test(first) ? first : 'there';
}

function safeState(state: unknown): string {
  return typeof state === 'string' && /^[A-Z]{2}$/.test(state) ? state : '';
}

function situationLine(lead: Record<string, unknown>): string {
  const who = HOUSEHOLDS[String(lead.household)] || '';
  const st = safeState(lead.state);
  if (who && st) return `We have your request for coverage for ${who} in ${st}.`;
  if (who) return `We have your request for coverage for ${who}.`;
  if (st) return `We have your request for coverage in ${st}.`;
  return 'We have your health coverage request.';
}

function layout(heading: string, paragraphs: string[]): string {
  const body = paragraphs.map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1A202C;">${p}</p>`).join('');
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;">
<h1 style="font-size:24px;color:#1a2744;margin:0 0 20px;">${heading}</h1>
${body}
<p style="margin:24px 0;"><a href="tel:+18553955001" style="display:inline-block;background:#e8a020;color:#1a2744;font-weight:bold;text-decoration:none;padding:14px 28px;border-radius:12px;">Call (855) 395-5001</a></p>
<p style="margin:0;font-size:16px;color:#1A202C;">The Coverage.Health Team</p>
</div>`;
}

export function welcomeEmail(lead: Record<string, unknown>) {
  const name = escapeHtml(safeFirstName(lead.full_name));
  return {
    subject: 'We received your Coverage.Health request',
    html: layout(`Thanks, ${name}!`, [
      escapeHtml(situationLine(lead)),
      'An in-house licensed agent will call you within one business day to review available plan options and confirm pricing.',
      'Want to talk sooner? Call us at (855) 395-5001, Mon to Fri, 8am to 8pm ET. There is no obligation.',
    ]),
  };
}

export function followUpEmail(lead: Record<string, unknown>) {
  const name = escapeHtml(safeFirstName(lead.full_name));
  return {
    subject: 'Following up on your Coverage.Health request',
    html: layout(`Hi ${name}, still looking for coverage?`, [
      escapeHtml(situationLine(lead)) + ' We have not been able to connect with you yet.',
      'An in-house licensed agent can walk you through available plans and whether Marketplace savings may apply.',
      'Reply to this email or call (855) 395-5001, Mon to Fri, 8am to 8pm ET. There is no obligation.',
    ]),
  };
}