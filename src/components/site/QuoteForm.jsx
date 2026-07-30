import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Lock, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const CONSENT_TEXT = 'By checking this box and clicking "See My Quotes," I provide my electronic signature and express written consent for Coverage.Health (HealthLink Insurance Agency LLC) and its licensed agent partners to contact me about insurance products at the phone number and email provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the Terms of Use and Privacy Policy.';

const inputCls = 'w-full px-4 py-3.5 rounded-xl border-[1.5px] border-slate-300 bg-white text-slate-900 text-base focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/20 transition-shadow';
const choiceCls = (active) => `rounded-xl border-[1.5px] px-4 py-3.5 font-semibold text-[15px] transition-all text-center ${active ? 'border-[#FF6B35] bg-[#FFF2EC] text-slate-900' : 'border-slate-300 bg-white text-slate-800 hover:border-[#FF6B35]'}`;
const btnCls = 'w-full inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E85A26] text-white font-bold text-[17px] rounded-xl px-5 py-4 transition-all hover:shadow-lg hover:shadow-[#FF6B35]/30 disabled:opacity-60';

export default function QuoteForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [err, setErr] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tcpa, setTcpa] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const total = 5;

  const go = (n) => { setErr(''); setStep(n); };

  const nextFromZip = () => {
    const st = /^[0-9]{5}$/.test(zip.trim()) ? zipState(zip.trim()) : null;
    if (!st) return setErr('Enter a valid 5-digit ZIP in a state we serve: FL, NC, NE, TN, IL, NJ, TX, GA, OH, SC, NV, AZ, CA.');
    setData((d) => ({ ...d, zip: zip.trim(), state: st }));
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
    if (!/^1?[2-9]\d{9}$/.test(digits)) return setErr('Enter a valid 10-digit US phone number.');
    if (!tcpa) return setErr('Please check the consent box to receive your quotes.');
    setErr('');
    setSubmitting(true);
    const qs = new URLSearchParams(window.location.search);
    await base44.entities.Lead.create({
      ...data,
      variant: 'A',
      full_name: name.trim(),
      email: email.trim(),
      phone: digits,
      tcpa_consent: true,
      tcpa_consent_text: CONSENT_TEXT,
      tcpa_timestamp: new Date().toISOString(),
      utm_source: qs.get('utm_source') || '',
      utm_campaign: qs.get('utm_campaign') || '',
      utm_medium: qs.get('utm_medium') || '',
      gclid: qs.get('gclid') || '',
      fbclid: qs.get('fbclid') || '',
      landing_page: window.location.href,
      user_agent: navigator.userAgent,
    });
    base44.analytics.track({ eventName: 'lead_submit', properties: { state: data.state || '' } });
    navigate(`/thank-you?st=${encodeURIComponent(data.state || '')}`);
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-7 relative overflow-hidden" id="quote">
      <div className="flex justify-between items-baseline">
        <h3 className="font-display font-bold text-xl text-slate-900">See your plan options</h3>
        <span className="text-xs font-bold tracking-wider text-[#FF6B35]">{step} OF {total}</span>
      </div>
      <div className="h-[3px] bg-slate-200 rounded-full my-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FF9A6B] to-[#FF6B35] shadow-[0_0_10px_#FF6B35] transition-all duration-500"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {step === 1 && (
            <div>
              <h4 className="font-display font-bold text-lg text-slate-900 mb-4">Where do you live?</h4>
              <label className="block text-[13px] font-semibold text-slate-900 mb-1.5" htmlFor="zip">ZIP code</label>
              <input id="zip" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" placeholder="e.g. 32922" autoComplete="postal-code" className={inputCls} />
              <button type="button" onClick={nextFromZip} className={`${btnCls} mt-4`}>Get started <ArrowRight className="w-4 h-4" /></button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-3"><Lock className="w-3 h-3" /> Your information is encrypted and never sold to spam lists.</p>
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
              <p className="text-[13.5px] text-slate-600 mb-3.5">This checks whether you qualify for ACA subsidies that can lower your monthly premium — sometimes to $0.</p>
              <div className="grid grid-cols-2 gap-2.5">
                {['Under $30k', '$30k–$60k', '$60k–$100k', 'Over $100k'].map((v) => (
                  <button key={v} type="button" onClick={() => pick('income', v, 5)} className={choiceCls(data.income === v)}>{v}</button>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <form onSubmit={submit}>
              <h4 className="font-display font-bold text-lg text-slate-900 mb-4">Where should we send your quotes?</h4>
              <div className="space-y-3.5">
                <div><label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Full name</label><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="First and last name" className={inputCls} /></div>
                <div><label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@email.com" className={inputCls} /></div>
                <div><label className="block text-[13px] font-semibold text-slate-900 mb-1.5">Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" className={inputCls} /></div>
              </div>
              <label className="flex gap-2.5 items-start mt-4 cursor-pointer text-[11.5px] leading-relaxed text-slate-500">
                <input type="checkbox" checked={tcpa} onChange={(e) => setTcpa(e.target.checked)} className="mt-0.5 w-4 h-4 shrink-0 accent-[#FF6B35]" />
                <span>
                  By checking this box and clicking "See My Quotes," I provide my electronic signature and express written consent for <b>Coverage.Health (HealthLink Insurance Agency LLC)</b> and its <Link to="/disclosures#partners" target="_blank" className="underline text-slate-700">licensed agent partners</Link> to contact me about insurance products at the phone number and email provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the <Link to="/terms" target="_blank" className="underline text-slate-700">Terms of Use</Link> and <Link to="/privacy" target="_blank" className="underline text-slate-700">Privacy Policy</Link>.
                </span>
              </label>
              <button type="submit" disabled={submitting} className={`${btnCls} mt-4`}>
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>See My Quotes <ArrowRight className="w-4 h-4" /></>}
              </button>
              <p className="text-center text-xs text-slate-500 mt-3">Reviewed by a licensed agent — not a robo-quote.</p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      {err && <p className="text-red-600 text-[13px] mt-3">{err}</p>}
      {step > 1 && (
        <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 mt-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      )}
    </div>
  );
}