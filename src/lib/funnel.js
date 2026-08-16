// Records first-party funnel events so we can see what happened to every click —
// including the ones that never became a lead. Writes are fire-and-forget: an
// analytics failure must never break a visitor's quote flow.

import { base44 } from '@/api/base44Client';
import { getSessionId, getDevice, getAttribution } from './attribution';
import { isTestEnvironment } from './tracking';

export function trackFunnel(eventType, extra = {}) {
  try {
    const attr = getAttribution();
    return base44.entities.TrafficEvent.create({
      session_id: getSessionId(),
      event_type: eventType,
      path: window.location.pathname,
      device: getDevice(),
      is_test: isTestEnvironment(),
      landing_page: attr.landing_page || '',
      referrer: attr.referrer || '',
      channel: attr.channel || '',
      is_paid: Boolean(attr.is_paid),
      utm_source: attr.utm_source || '',
      utm_medium: attr.utm_medium || '',
      utm_campaign: attr.utm_campaign || '',
      utm_term: attr.utm_term || '',
      utm_content: attr.utm_content || '',
      gclid: attr.gclid || '',
      msclkid: attr.msclkid || '',
      fbclid: attr.fbclid || '',
      ...extra,
    }).catch(() => {});
  } catch {
    return Promise.resolve();
  }
}

// Attribution fields to persist on the Lead record itself, so every lead is
// traceable back to its click without joining against events.
export function leadAttributionFields() {
  try {
    const attr = getAttribution();
    return {
      session_id: getSessionId(),
      channel: attr.channel || '',
      is_paid: Boolean(attr.is_paid),
      device: getDevice(),
      referrer: attr.referrer || '',
      first_landing_page: attr.landing_page || '',
      utm_source: attr.utm_source || '',
      utm_medium: attr.utm_medium || '',
      utm_campaign: attr.utm_campaign || '',
      utm_term: attr.utm_term || '',
      utm_content: attr.utm_content || '',
      gclid: attr.gclid || '',
      msclkid: attr.msclkid || '',
      fbclid: attr.fbclid || '',
    };
  } catch {
    return {};
  }
}