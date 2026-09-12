// Tracking guard: suppresses ad-platform pixels and CAPI when not on the
// production site, so test/preview/dev submissions don't pollute analytics.
//
// Production is identified by hostname. In any other environment (builder
// preview, local dev, staging) tracking is suppressed. Two URL overrides:
//   ?track=1   force tracking ON  (verify pixels on a non-prod host)
//   ?test=1    force tracking OFF (suppress on the prod host)

const PRODUCTION_HOSTS = ['coverage.health', 'www.coverage.health'];

export function isTestEnvironment() {
  if (typeof window === 'undefined') return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get('track') === '1') return false;
  if (params.get('test') === '1' || params.get('notrack') === '1') return true;
  return !PRODUCTION_HOSTS.includes(window.location.hostname);
}

// Meta Pixel: fire a Lead event with optional dedup eventID.
export function trackMetaLead(params = {}, eventId = '') {
  if (isTestEnvironment()) return;
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead', params, eventId ? { eventID: eventId } : undefined);
}

// Microsoft Ads UET: enhanced conversions (hashed email/phone) + conversion.
export function trackUetLead(email = '', phoneDigits = '', eventId = '', leadType = 'quote_request') {
  if (isTestEnvironment()) return;
  if (typeof window.uet_report_conversion !== 'function') return;
  const normalizedPhone = `+1${phoneDigits.replace(/^1/, '').slice(-10)}`;
  window.uetq = window.uetq || [];
  window.uetq.push('set', { pid: { em: email.trim().toLowerCase(), ph: normalizedPhone } });
  window.uet_report_conversion({ revenue_value: 1.0, currency: 'USD', transaction_id: eventId, event_category: 'lead', event_label: leadType });
}

// Microsoft Ads UET custom event for click-to-call. The Microsoft event goal is
// configured to match Action = "call_click" and Category = "engagement".
export function trackUetCallClick(label = '') {
  if (isTestEnvironment()) return;
  window.uetq = window.uetq || [];
  window.uetq.push('event', 'call_click', {
    event_category: 'engagement',
    event_label: label,
  });
}

// Meta Pixel equivalent, so call clicks are visible on both platforms.
export function trackMetaCallClick(label = '') {
  if (isTestEnvironment()) return;
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', 'Contact', { content_name: 'Click to call', content_category: label });
}