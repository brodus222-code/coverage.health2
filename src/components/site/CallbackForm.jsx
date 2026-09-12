import { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { isTestEnvironment, trackMetaLead, trackUetLead } from '@/lib/tracking';
import { trackFunnel, leadAttributionFields } from '@/lib/funnel';
import { secondsSinceSessionStart } from '@/lib/attribution';

const TIMES = ['Morning', 'Afternoon', 'Evening', 'ASAP'];

const CONSENT_TEXT = 'By clicking "Request My Call," I provide my electronic signature and express written consent for Coverage.Health (HealthLink Insurance Agency LLC) and its in-house licensed agents to contact me about insurance products at the phone number provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Coverage.Health does not sell or pass my information to lead buyers or outside partners. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the Terms of Use and Privacy Policy.';

const inputCls = 'w-full px-4 py-3 rounded-xl border-[1.5px] border-slate-300 bg-white text-slate-900 text-base focus:outline-none focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/20 transition-shadow';

export default function CallbackForm({ zip = '', state = '' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipVal, setZipVal] = useState(zip);
  const [time, setTime] = useState('');
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return setErr('Please enter your name.');
    const digits = phone.replace(/\D/g, '');
    if (!/^1?[2-9]\d{9}$/.test(digits)) return setErr('Enter a valid 10-digit US phone number.');
    if (!/^[0-9]{5}$/.test(zipVal.trim())) return setErr('Enter your 5-digit ZIP code.');
    if (!time) return setErr('Pick the best time for us to call.');
    setErr('');
    setSubmitting(true);
    try {
      const isTest = isTestEnvironment();
      const metaEventId = isTest ? '' : (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      const fbpMatch = document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/);
      await base44.entities.Lead.create({
        full_name: name.trim(),
        phone: digits,
        zip: zipVal.trim(),
        state,
        variant: 'A',
        description: `Callback request — preferred time: ${time}`,
        tcpa_consent: true,
        tcpa_consent_text: CONSENT_TEXT,
        tcpa_timestamp: new Date().toISOString(),
        ...leadAttributionFields(),
        time_to_convert_seconds: secondsSinceSessionStart(),
        landing_page: window.location.href,
        user_agent: navigator.userAgent,
        meta_event_id: metaEventId,
        meta_fbp: fbpMatch ? fbpMatch[1] : '',
      });
      trackMetaLead({ content_name: 'Callback Request', content_category: 'Health Insurance', state }, metaEventId);
      trackUetLead('', digits, metaEventId, 'callback_request');
      trackFunnel('lead_submit', { variant: 'A', state, description: 'callback_request' });
      base44.analytics.track({ eventName: 'callback_request', properties: { state, preferred_time: time } });
      setSubmitting(false);
      setDone(true);
    } catch {
      setSubmitting(false);
      setErr('We could not save your callback request. Please check your connection and try again.');
    }
  };

  if (done) {
    return (
      <div className="text-center">
        <CheckCircle2 className="w-8 h-8 text-[#22B573] mx-auto" />
        <p className="font-display font-bold text-slate-900 mt-2">Your callback is requested, {name.trim().split(' ')[0]}.</p>
        <p className="text-[13.5px] text-slate-600 mt-1">A licensed agent will call you at {phone} — {time.toLowerCase() === 'asap' ? 'as soon as possible' : `in the ${time.toLowerCase()}`}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="text-left">
      <div className="space-y-3">
        <div>
          <label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="First and last name" className={inputCls} />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" className={inputCls} />
        </div>
        {!zip && (
          <div>
            <label className="block text-[13px] font-semibold text-slate-900 mb-1.5">ZIP code</label>
            <input value={zipVal} onChange={(e) => setZipVal(e.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" autoComplete="postal-code" placeholder="12345" className={inputCls} />
          </div>
        )}
        <div>
          <label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Best time to call</label>
          <div className="grid grid-cols-2 gap-2">
            {TIMES.map((t) => (
              <button key={t} type="button" onClick={() => setTime(t)} className={`rounded-xl border-[1.5px] px-3 py-2.5 font-semibold text-[14px] transition-all ${time === t ? 'border-[#EAB308] bg-[#FFF8E6] text-slate-900' : 'border-slate-300 bg-white text-slate-800 hover:border-[#EAB308]'}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 mt-4 rounded-full bg-gradient-to-br from-[#1A202C] to-[#2D3A52] text-white font-bold text-[15px] px-6 py-3.5 hover:opacity-95 transition-opacity disabled:opacity-60">
        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request My Call'}
      </button>
      {err && <p className="text-red-600 text-[13px] mt-2">{err}</p>}
      <p className="text-[11px] leading-relaxed text-slate-500 mt-3">
        By clicking "Request My Call," I provide my electronic signature and express written consent for <b>Coverage.Health (HealthLink Insurance Agency LLC)</b> and its in-house licensed agents to contact me about insurance products at the phone number provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Coverage.Health does not sell or pass my information to lead buyers or outside partners. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the <Link to="/terms" target="_blank" className="underline text-slate-700">Terms of Use</Link> and <Link to="/privacy" target="_blank" className="underline text-slate-700">Privacy Policy</Link>.
      </p>
    </form>
  );
}