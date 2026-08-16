// Rolls raw TrafficEvent rows up into session-level funnel, channel and device
// reporting for the analytics dashboard.

export const FUNNEL_STAGES = [
  { key: 1, label: 'Visited site' },
  { key: 2, label: 'Started quote' },
  { key: 3, label: 'Reached question 2' },
  { key: 4, label: 'Reached question 3' },
  { key: 5, label: 'Reached question 4' },
  { key: 6, label: 'Reached contact form' },
  { key: 7, label: 'Submitted lead' },
];

function blankSession(e) {
  return {
    session_id: e.session_id,
    channel: e.channel || 'Direct',
    is_paid: Boolean(e.is_paid),
    device: e.device || 'desktop',
    landing_page: e.landing_page || '',
    utm_campaign: e.utm_campaign || '',
    utm_term: e.utm_term || '',
    variant: e.variant || '',
    state: e.state || '',
    maxStep: 0,
    converted: false,
    called: false,
    first_seen: e.created_date,
  };
}

export function sessionize(events) {
  const map = new Map();
  for (const e of events) {
    if (!map.has(e.session_id)) map.set(e.session_id, blankSession(e));
    const s = map.get(e.session_id);
    if (e.is_paid) s.is_paid = true;
    if (e.channel && e.channel !== 'Direct') s.channel = e.channel;
    if (e.utm_campaign) s.utm_campaign = e.utm_campaign;
    if (e.utm_term) s.utm_term = e.utm_term;
    if (e.variant) s.variant = e.variant;
    if (e.state) s.state = e.state;
    if (e.landing_page && !s.landing_page) s.landing_page = e.landing_page;
    if (e.created_date < s.first_seen) s.first_seen = e.created_date;

    if (e.event_type === 'quote_start') s.maxStep = Math.max(s.maxStep, 2);
    if (e.event_type === 'quote_step') s.maxStep = Math.max(s.maxStep, (e.step_number || 1) + 1);
    if (e.event_type === 'call_click') s.called = true;
    if (e.event_type === 'lead_submit') { s.converted = true; s.maxStep = 7; }
  }
  for (const s of map.values()) s.maxStep = Math.max(s.maxStep, 1);
  return [...map.values()];
}

export function buildFunnel(sessions) {
  return FUNNEL_STAGES.map((stage, i) => {
    const count = sessions.filter((s) => s.maxStep >= stage.key).length;
    const prev = i === 0 ? count : sessions.filter((s) => s.maxStep >= FUNNEL_STAGES[i - 1].key).length;
    return {
      ...stage,
      count,
      pctOfTotal: sessions.length ? (count / sessions.length) * 100 : 0,
      dropOff: prev ? ((prev - count) / prev) * 100 : 0,
    };
  });
}

export function groupBy(sessions, keyFn) {
  const map = new Map();
  for (const s of sessions) {
    const key = keyFn(s) || '(none)';
    if (!map.has(key)) map.set(key, { key, sessions: 0, leads: 0, calls: 0, started: 0 });
    const row = map.get(key);
    row.sessions += 1;
    if (s.converted) row.leads += 1;
    if (s.called) row.calls += 1;
    if (s.maxStep >= 2) row.started += 1;
  }
  return [...map.values()]
    .map((r) => ({ ...r, convRate: r.sessions ? (r.leads / r.sessions) * 100 : 0 }))
    .sort((a, b) => b.sessions - a.sessions);
}

export function dailySeries(sessions, days) {
  const buckets = new Map();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    buckets.set(d.toDateString(), { date: d, label: `${d.getMonth() + 1}/${d.getDate()}`, visits: 0, leads: 0 });
  }
  for (const s of sessions) {
    const key = new Date(s.first_seen).toDateString();
    const bucket = buckets.get(key);
    if (!bucket) continue;
    bucket.visits += 1;
    if (s.converted) bucket.leads += 1;
  }
  return [...buckets.values()];
}

export function summarize(sessions) {
  const paid = sessions.filter((s) => s.is_paid);
  const leads = sessions.filter((s) => s.converted);
  const paidLeads = paid.filter((s) => s.converted);
  return {
    sessions: sessions.length,
    paidSessions: paid.length,
    leads: leads.length,
    paidLeads: paidLeads.length,
    calls: sessions.filter((s) => s.called).length,
    started: sessions.filter((s) => s.maxStep >= 2).length,
    convRate: sessions.length ? (leads.length / sessions.length) * 100 : 0,
    paidConvRate: paid.length ? (paidLeads.length / paid.length) * 100 : 0,
    untaggedPaid: paid.filter((s) => !s.utm_campaign).length,
  };
}