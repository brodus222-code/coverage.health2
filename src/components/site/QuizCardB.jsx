import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, ArrowLeft, Loader2, User, Users, Baby, Home as HomeIcon } from 'lucide-react';
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

const CONSENT_TEXT = 'By checking this box and clicking "Show My Matches," I provide my electronic signature and express written consent for Coverage.Health (HealthLink Insurance Agency LLC) and its licensed agent partners to contact me about insurance products at the phone number and email provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the Terms of Use and Privacy Policy.';

const HOUSEHOLD = [
  { icon: User, label: 'Just me', value: 'Just me' },
  { icon: Users, label: 'Me + my spouse/partner', value: 'Me + spouse' },
  { icon: Baby, label: 'Me + my kids', value: 'Me + kids' },
  { icon: HomeIcon, label: 'Our whole family', value: 'Family' },
];
const AGES = ['18-25', '26-35', '36-45', '46-55', '56-64', '65+'];
const INCOMES = ['Under $30k', '$30k-$60k', '$60k-$100k', 'Over $100k'];

const inputCls = 'w-full px-4 py-4 rounded-[13px] border-[1.6px] border-[#DCE6F0] bg-white text-[#132A47] text-[17px] focus:outline-none focus:border-[#2E90FA] focus:ring-4 focus:ring-[#2E90FA]/20';
const optCls = (active) => `flex items-center gap-3 rounded-[13px] border-[1.6px] px-4 py-4 text-base font-semibold text-[#132A47] text-left transition-all active:scale-[0.985] ${active ? 'border-[#2E90FA] bg-[#EDF5FF]' : 'border-[#DCE6F0] bg-white hover:border-[#2E90FA]'}`;
const btnCls = 'w-full flex items-center justify-center gap-2 bg-[#FF6B57] hover:bg-[#E9503C] text-white font-heading font-bold text-[17px] rounded-[13px] py-4 mt-4 transition-colors disabled:opacity-60';
const labelCls = 'block text-[13px] font-semibold text-[#132A47] mb-1.5';

export default function QuizCardB({ onStepChange }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [err, setErr] = useState('');
  const [zip, setZip] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tcpa, setTcpa] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const go = (n) => { setErr(''); setStep(n); onStepChange?.(n); };
  const pick = (field, value, nextStep) => {
    setData((d) => ({ ...d, [field]: value }));
    setTimeout(() => go(nextStep), 180);
  };

  const nextFromZip = () => {
    const st = /^[0-9]{5}$/.test(zip.trim()) ? zipState(zip.trim()) : null;
    if (!st) return setErr("We're licensed in FL, NC, NE, TN, IL, NJ, TX, GA, OH, SC, NV, AZ, and CA. Enter a 5-digit ZIP in one of these states.");
    setData((d) => ({ ...d, zip: zip.trim(), state: st }));
    go(4);
  };

  const submit = async (e) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (!/^1?[2-9]\d{9}$/.test(digits)) return setErr('Enter a valid 10-digit US phone number.');
    if (!tcpa) return setErr('Please check the consent box to see your matches.');
    setErr('');
    setSubmitting(true);
    const qs = new URLSearchParams(window.location.search);
    await base44.entities.Lead.create({
      ...data,
      variant: 'B',
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
      msclkid: qs.get('msclkid') || '',
      landing_page: window.location.href,
      user_agent: navigator.userAgent,
    });
    base44.analytics.track({ eventName: 'lead_submit', properties: { variant: 'B', state: data.state || '' } });
    navigate(`/thank-you?st=${encodeURIComponent(data.state || '')}&v=B`);
  };

  const qHead = (num, title, sub) => (
    <>
      <p className="font-heading font-extrabold text-[13px] text-[#2E90FA] tracking-[0.12em] uppercase mb-2">{num}</p>
      <h2 className="font-heading font-extrabold text-[#132A47] text-[clamp(22px,3.4vw,28px)] leading-tight tracking-tight mb-1.5">{title}</h2>
      <p className="text-[14.5px] text-[#4A6076] mb-5">{sub}</p>
    </>
  );

  return (
    <form onSubmit={submit} className="bg-white border border-[#DCE6F0] rounded-[18px] shadow-[0_14px_40px_rgba(19,42,71,0.08)] px-7 py-8 md:px-8">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          {step === 1 && (
            <div>
              {qHead('Question 1 of 5', 'Who needs coverage?', 'Tap the option that fits your household.')}
              <div className="grid gap-2.5">
                {HOUSEHOLD.map(({ icon: Icon, label, value }) => (
                  <button key={value} type="button" onClick={() => pick('household', value, 2)} className={optCls(data.household === value)}>
                    <Icon className="w-5 h-5 text-[#2E90FA] shrink-0" /> {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              {qHead('Question 2 of 5', 'How old are you?', 'Plans and prices are grouped by age band.')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AGES.map((a) => (
                  /* 65+ still advances — agents pivot these calls to supplemental/ancillary products */
                  <button key={a} type="button" onClick={() => pick('age_range', a, 3)} className={optCls(data.age_range === a)}>
                    {a === '65+' ? '65 or older' : a.replace('-', '–')}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              {qHead('Question 3 of 5', "What's your ZIP code?", 'Networks and prices are set by county — this is how we pull real rates.')}
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                inputMode="numeric"
                placeholder="•••••"
                autoComplete="postal-code"
                aria-label="ZIP code"
                autoFocus
                className={`${inputCls} !text-2xl tracking-[0.2em] text-center font-heading font-bold`}
              />
              <button type="button" onClick={nextFromZip} className={btnCls}>Continue <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}
          {step === 4 && (
            <div>
              {qHead('Question 4 of 5', 'Estimated household income?', 'Just an estimate — it checks whether subsidies could lower your premium, sometimes to $0.')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INCOMES.map((v) => (
                  <button key={v} type="button" onClick={() => pick('income', v, 5)} className={optCls(data.income === v)}>{v.replace('-', '–')}</button>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              {qHead('Last step', 'Where should we send your matches?', 'A licensed agent for your state confirms your options by phone.')}
              <div className="space-y-3.5">
                <div><label className={labelCls}>Full name</label><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="First and last name" className={inputCls} /></div>
                <div><label className={labelCls}>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@email.com" className={inputCls} /></div>
                <div><label className={labelCls}>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" className={inputCls} /></div>
              </div>
              <label className="flex gap-2.5 items-start mt-4 cursor-pointer text-[11.5px] leading-relaxed text-[#66798D]">
                <input type="checkbox" checked={tcpa} onChange={(e) => setTcpa(e.target.checked)} className="mt-0.5 w-4 h-4 shrink-0 accent-[#FF6B57]" />
                <span>
                  By checking this box and clicking "Show My Matches," I provide my electronic signature and express written consent for <b className="text-[#132A47]">Coverage.Health (HealthLink Insurance Agency LLC)</b> and its <Link to="/disclosures#partners" target="_blank" className="text-[#2E90FA] underline">licensed agent partners</Link> to contact me about insurance products at the phone number and email provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I have read and agree to the <Link to="/terms" target="_blank" className="text-[#2E90FA] underline">Terms of Use</Link> and <Link to="/privacy" target="_blank" className="text-[#2E90FA] underline">Privacy Policy</Link>.
                </span>
              </label>
              <button type="submit" disabled={submitting} className={btnCls}>
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Show My Matches <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {err && <p className="text-red-600 text-[13px] mt-3">{err}</p>}
      {step > 1 && (
        <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#4A6076] hover:text-[#132A47] mt-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Go back
        </button>
      )}
    </form>
  );
}