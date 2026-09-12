// First-touch attribution for the visit. Captured once per session on the first
// page load and reused for every later event, so a lead submitted on /quote still
// reports the ad click and landing page that actually started the visit.

const SESSION_KEY = 'ch_session_id';
const ATTR_KEY = 'ch_attribution';

const PAID_MEDIUMS = ['cpc', 'ppc', 'paid', 'paidsearch', 'paid_search', 'paidsocial', 'paid_social', 'display'];

const SEARCH_HOSTS = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'ecosia.', 'brave.'];
const SOCIAL_HOSTS = ['facebook.', 'instagram.', 'l.facebook', 'lm.facebook', 'twitter.', 't.co', 'linkedin.', 'reddit.', 'tiktok.', 'pinterest.'];

function uuid() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getSessionId() {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = uuid();
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export function getDevice() {
  const ua = navigator.userAgent;
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|Android/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Turns raw click IDs / UTMs / referrer into one readable channel label.
export function classifyChannel({ utm_source, utm_medium, gclid, msclkid, fbclid }, referrer) {
  if (msclkid) return { channel: 'Microsoft Ads', is_paid: true };
  if (gclid) return { channel: 'Google Ads', is_paid: true };

  const medium = (utm_medium || '').toLowerCase().replace(/[\s-]/g, '');
  const source = (utm_source || '').toLowerCase();

  // Facebook appends fbclid to organic post links too, so fbclid on its own is
  // not proof of a paid click — only count it as Meta Ads when the URL is also
  // tagged as paid traffic.
  if (fbclid) {
    if (PAID_MEDIUMS.includes(medium)) return { channel: 'Meta Ads', is_paid: true };
    return { channel: 'Organic Social — Facebook', is_paid: false };
  }
  if (medium && PAID_MEDIUMS.includes(medium)) {
    return { channel: `Paid — ${source || medium}`, is_paid: true };
  }
  if (source) return { channel: source, is_paid: false };

  if (!referrer) return { channel: 'Direct', is_paid: false };
  let host = '';
  try { host = new URL(referrer).hostname.toLowerCase(); } catch { host = ''; }
  if (!host || host.includes(window.location.hostname)) return { channel: 'Direct', is_paid: false };
  if (SEARCH_HOSTS.some((h) => host.includes(h))) return { channel: 'Organic Search', is_paid: false };
  if (SOCIAL_HOSTS.some((h) => host.includes(h))) return { channel: 'Organic Social', is_paid: false };
  return { channel: `Referral — ${host.replace(/^www\./, '')}`, is_paid: false };
}

// Reads the current URL for tracking params and stores first-touch data once per
// session. Later calls return the stored value, but a fresh ad click mid-session
// overwrites it so the most recent paid click gets credit.
export function getAttribution() {
  const stored = sessionStorage.getItem(ATTR_KEY);
  const qs = new URLSearchParams(window.location.search);
  const raw = {
    utm_source: qs.get('utm_source') || '',
    utm_medium: qs.get('utm_medium') || '',
    utm_campaign: qs.get('utm_campaign') || '',
    utm_term: qs.get('utm_term') || '',
    utm_content: qs.get('utm_content') || '',
    gclid: qs.get('gclid') || '',
    msclkid: qs.get('msclkid') || '',
    fbclid: qs.get('fbclid') || '',
  };
  let storedAttribution = null;
  if (stored) {
    try { storedAttribution = JSON.parse(stored); } catch { /* fall through and rebuild */ }
  }
  const hasClickParams = Boolean(raw.gclid || raw.msclkid || raw.fbclid || raw.utm_source);
  const isSameClick = storedAttribution && ['gclid', 'msclkid', 'fbclid', 'utm_source', 'utm_campaign'].every((key) => !raw[key] || raw[key] === storedAttribution[key]);
  const hasFreshClick = hasClickParams && !isSameClick;

  if (storedAttribution && !hasFreshClick) return storedAttribution;

  const referrer = document.referrer || '';
  const { channel, is_paid } = classifyChannel(raw, referrer);
  const attribution = {
    ...raw,
    channel,
    is_paid,
    referrer,
    landing_page: stored && !hasFreshClick ? window.location.href : window.location.href,
    session_started_at: new Date().toISOString(),
  };
  sessionStorage.setItem(ATTR_KEY, JSON.stringify(attribution));
  return attribution;
}

// Seconds since this session's attribution was first captured.
export function secondsSinceSessionStart() {
  const attr = getAttribution();
  const started = new Date(attr.session_started_at).getTime();
  if (!started) return null;
  return Math.max(0, Math.round((Date.now() - started) / 1000));
}