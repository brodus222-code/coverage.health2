import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, ArrowLeft, Loader2, Lock, Trophy, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MatchingAnimation from '@/components/site/MatchingAnimation';
import { isTestEnvironment, trackMetaLead, trackUetLead } from '@/lib/tracking';
import { trackFunnel, leadAttributionFields } from '@/lib/funnel';
import { secondsSinceSessionStart } from '@/lib/attribution';

const STEP_NAMES = { 2: 'Household', 3: 'Age', 4: 'Income', 5: 'Contact info' };

const emailLooksValid = (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

const ZIP_PREFIXES = {
  FL: [[320, 349]], NC: [[270, 289]], NE: [[680, 693]], TN: [[370, 385]], IL: [[600, 629]],
  NJ: [[70, 89]], TX: [[750, 799], [885, 885]], GA: [[300, 319], [398, 399]], OH: [[430, 459]],
  SC: [[290, 299]], NV: [[889, 898]], AZ: [[850, 865]], CA: [[900, 961]],
};

function zipState(z) {
  const p = +z.substring(0, 3);
  for (const [st, ranges] of Object.entries(ZIP_PREFIXES))
    for (const [a, b] of ranges) if (p >= a && p <= b) return st;
  return null;
}

const CONSENT_TEXT = 'By clicking "Request My Plan Comparison," I provide my electronic signature and express written consent for Coverage.Health (HealthLink Insurance Agency LLC) and its in-house licensed agents to contact me about insurance products at the phone number and email provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Coverage.Health does not sell or pass my information to lead buyers or outside partners. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the Terms of Use and Privacy Policy.';

const inputCls = 'w-full px-4 py-3.5 rounded-xl border-[1.5px] border-slate-300 bg-white text-slate-900 text-base focus:outline-none focus:border-[#e8a020] focus:ring-4 focus:ring-[#e8a020]/20 transition-shadow';
const choiceCls = (active) => `rounded-xl border-[1.5px] px-4 py-3.5 font-semibold text-[15px] transition-all text-center ${active ? 'border-[#e8a020] bg-[#e8f4fd] text-slate-900' : 'border-slate-300 bg-white text-slate-800 hover:border-[#e8a020]'}`;
const btnCls = 'w-full min-h-[52px] inline-flex items-center justify-center gap-2 bg-[#e8a020] hover:bg-[#d4911a] text-[#1a2744] shadow-md shadow-[#e8a020]/30 font-bold text-[17px] rounded-xl px-5 py-3.5 transition-colors disabled:opacity-60';

export default function QuoteForm({ lockedState = null, mode = 'hero', initialData = null, offer = '', trustRow = false }) {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(lockedState);
  const [step, setStep] = useState(mode === 'quote' ? 2 : 1);
  const [data, setData] = useState(mode === 'quote' ? (initialData || {}) : {});
  const [err, setErr] = useState('');
  const [zip, setZip] = useState(mode === 'quote' ? (initialData?.zip || '') : '');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [textUpdates, setTextUpdates] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const total = 5;

  // Records which screen each visitor reached, so drop-off is visible per step.
  useEffect(() => {
    if (step < 2) return;
    trackFunnel('quote_step', { step_number: step, step_name: STEP_NAMES[step] || `Step ${step}`, variant: 'A', state: data.state || '' });
  }, [step]);

  const go = (n) => { setErr(''); setStep(n); };

  const nextFromZip = () => {
    const st = /^[0-9]{5}$/.test(zip.trim()) ? zipState(zip.trim()) : null;
    if (!st) return setErr('Enter a valid 5-digit ZIP in a state we serve: FL, NC, NE, TN, IL, NJ, TX, GA, OH, SC, NV, AZ, CA.');
    if (locked && st !== locked.abbr) return setErr(`That ZIP is not in ${locked.name}. Double-check it — or if you need coverage in another state, use the link below.`);
    setData((d) => ({ ...d, zip: zip.trim(), state: st }));
    trackFunnel('quote_start', { variant: 'A', state: st });
    if (mode === 'hero') {
      const qs = new URLSearchParams(window.location.search);
      const out = new URLSearchParams();
      ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'msclkid'].forEach((k) => { const v = qs.get(k); if (v) out.set(k, v); });
      out.set('zip', zip.trim());
      out.set('state', st);
      // Carries the lander's offer messaging into the wizard.
      const carriedOffer = offer || qs.get('offer') || '';
      if (carriedOffer) out.set('offer', carriedOffer);
      if (locked) { out.set('lock', locked.abbr); out.set('lname', locked.name); }
      navigate(`/quote?${out.toString()}`);
      return;
    }
    go(2);
  };

  const nextFromAge = () => {
    const a = +age;
    if (!(a >= 18 && a <= 64)) return setErr('Enter an age between 18 and 64. For 65+, ask us about supplemental options by phone.');
    setData((d) => ({ ...d, age: a }));
    go(4);
  };

  const pick = (field, value, next) => {
    setData((d) => ({ ...d, [field]: value }));
    setTimeout(() => go(next), 180);
  };

  const submit = async (e) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (name.trim().length < 2) return setErr('Please enter your name.');
    if (!/^1?[2-9]\d{9}$/.test(digits)) return setErr('Enter a valid 10-digit US phone number.');
    if (email.trim() && !emailLooksValid(email)) return setErr('Enter a valid email address or leave it blank.');
    setErr('');
    setSubmitting(true);

    try {
      const isTest = isTestEnvironment();
      const metaEventId = isTest ? '' : (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      const fbpMatch = document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/);
      const metaFbp = fbpMatch ? fbpMatch[1] : '';
      await base44.entities.Lead.create({
        ...data,
        variant: 'A',
        full_name: name.trim(),
        email: email.trim(),
        phone: digits,
        description: 'In-house plan comparison request',
        tcpa_consent: true,
        text_updates_opt_in: textUpdates,
        tcpa_consent_text: CONSENT_TEXT,
        tcpa_timestamp: new Date().toISOString(),
        ...leadAttributionFields(),
        time_to_convert_seconds: secondsSinceSessionStart(),
        landing_page: window.location.href,
        user_agent: navigator.userAgent,
        meta_event_id: metaEventId,
        meta_fbp: metaFbp,
      });
      trackMetaLead({ content_name: 'Plan Comparison Request', content_category: 'Health Insurance', state: data.state || '' }, metaEventId);
      trackUetLead(email.trim().toLowerCase(), digits, metaEventId, 'plan_comparison');
      trackFunnel('lead_submit', { variant: 'A', state: data.state || '', description: 'plan_comparison' });
      base44.analytics.track({ eventName: 'lead_submit', properties: { state: data.state || '', lead_type: 'plan_comparison' } });
      sessionStorage.setItem('lead_submitted', 'true');
      await new Promise((r) => setTimeout(r, 900));
      navigate(`/thank-you?st=${encodeURIComponent(data.state || '')}`);
    } catch {
      setSubmitting(false);
      setErr('We could not save your request. Please check your connection and try again.');
    }
  };

  return (
    <div className="relative" id="quote">
      <p className="font-display font-bold text-lg text-slate-900 leading-snug">
        {mode === 'quote' ? 'A few quick questions for your plan comparison' : 'Start with your ZIP code'}
      </p>
      {step === 1 && <p className="mt-1 text-[13px] leading-snug text-slate-600">{trustRow ? 'Takes about 2 minutes · Your information stays private' : 'An in-house licensed agent will review your request with you by phone.'}</p>}
      {step > 1 && (
        <div className="h-[3px] bg-slate-200 rounded-full my-4 overflow-hidden" aria-label={`Step ${step} of ${total}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#e8a020] shadow-[0_0_10px_#e8a020] transition-all duration-500"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {step === 1 && (
            <div className="mt-3">
              <label className="sr-only" htmlFor="zip">ZIP code</label>
              <input id="zip" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" placeholder="Enter your 5-digit ZIP code" autoComplete="postal-code" className={inputCls} />
              <button type="button" onClick={nextFromZip} className={`${btnCls} mt-3.5`}>Start My Plan Comparison <ArrowRight className="w-4 h-4" /></button>
              {trustRow ? (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12.5px] text-slate-500">
                  <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> <b className="text-slate-900">Encrypted</b> — never sold to spam lists</span>
                  <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> <b className="text-slate-900">4.8/5</b> customer rating</span>
                  <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> <b className="text-slate-900">A+</b> rated agency</span>
                </div>
              ) : (
                <p className="mt-2.5 text-center text-xs text-slate-600">Takes about 2 minutes · Your information stays private</p>
              )}
              {locked && (
                <a href={`/quote?lock=${locked.abbr}&lname=${encodeURIComponent(locked.name)}`} onClick={(e) => { e.preventDefault(); setLocked(null); setErr(''); }} className="block w-full text-center text-[13px] font-semibold text-slate-500 hover:text-slate-900 underline mt-3 transition-colors">
                  I need coverage in a different state
                </a>
              )}
            </div>
          )}
          {step === 2 && (
            <div>
              <h4 className="font-display font-bold text-lg text-slate-900 mb-4">Who needs coverage?</h4>
              <div className="grid grid-cols-2 gap-2.5">
                {['Just me', 'Me + spouse', 'Me + kids', 'Whole family'].map((v) => (
                  <button key={v} type="button" onClick={() => pick('household', v, 3)} className={choiceCls(data.household === v)}>{v}</button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h4 className="font-display font-bold text-lg text-slate-900 mb-4">What's your age?</h4>
              <label className="block text-[13px] font-semibold text-slate-900 mb-1.5" htmlFor="age">Age of primary applicant</label>
              <input id="age" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 2))} inputMode="numeric" placeholder="e.g. 42" className={inputCls} />
              <button type="button" onClick={nextFromAge} className={`${btnCls} mt-4`}>Continue <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}
          {step === 4 && (
            <div>
              <h4 className="font-display font-bold text-lg text-slate-900 mb-2">Estimated household income</h4>
              <p className="text-[13.5px] text-slate-600 mb-3.5">This helps your agent determine whether Marketplace savings may apply. Choose the closest range or “Not sure.”</p>
              <div className="grid grid-cols-2 gap-2.5">
                {['Under $30k', '$30k–$60k', '$60k–$100k', 'Over $100k', 'Not sure'].map((v) => (
                  <button key={v} type="button" onClick={() => pick('income', v, 5)} className={choiceCls(data.income === v)}>{v}</button>

                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            submitting ? (
              <MatchingAnimation state={data.state} />
            ) : (
              <form onSubmit={submit}>
                <h4 className="font-display font-bold text-lg text-slate-900 mb-2">Where can our licensed team reach you?</h4>
                <p className="text-[13.5px] text-slate-600 mb-3.5">An in-house agent will call to review available options and confirm pricing. We do not sell or pass along your information.</p>
                <div className="space-y-3.5">
                  <div><label className="block text-[13px] font-semibold text-slate-900 mb-1.5" htmlFor="fullname">Full name</label><input id="fullname" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="First and last name" autoFocus className={inputCls} /></div>
                  <div><label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" className={inputCls} /></div>
                  <div><label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Email <span className="font-medium text-slate-500">(optional)</span></label><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@email.com" className={inputCls} /></div>
                </div>
                <label className="flex gap-2.5 items-start mt-4 cursor-pointer">
                  <input type="checkbox" checked={textUpdates} onChange={(e) => setTextUpdates(e.target.checked)} className="mt-0.5 w-4 h-4 shrink-0 accent-[#e8a020]" />
                  <span className="text-[13px] font-semibold text-slate-800 leading-snug">Text me updates about my request <span className="font-medium text-slate-500">(optional)</span></span>
                </label>
                <button type="submit" disabled={submitting} className={`${btnCls} mt-4`}>
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Request My Plan Comparison <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="text-[11.5px] leading-relaxed text-slate-500 mt-3">
                  By clicking "Request My Plan Comparison," I provide my electronic signature and express written consent for <b>Coverage.Health (HealthLink Insurance Agency LLC)</b> and its in-house licensed agents to contact me about insurance products at the phone number and email provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Coverage.Health does not sell or pass my information to lead buyers or outside partners. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the <Link to="/terms" target="_blank" className="underline text-slate-700">Terms of Use</Link> and <Link to="/privacy" target="_blank" className="underline text-slate-700">Privacy Policy</Link>.
                </p>
                <p className="text-center text-xs text-slate-500 mt-3">Agent-assisted comparison — not an instant robo-quote.</p>
              </form>
            )
          )}
        </motion.div>
      </AnimatePresence>

      {err && <p className="text-red-600 text-[13px] mt-3">{err}</p>}
      {step > (mode === 'quote' ? 2 : 1) && (
        <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 mt-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      )}
    </div>
  );
}