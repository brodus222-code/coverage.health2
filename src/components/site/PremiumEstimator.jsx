import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const HOUSEHOLDS = [
  { label: 'Just me', factor: 1 },
  { label: 'Me + spouse', factor: 1.9 },
  { label: 'Me + kids', factor: 1.65 },
  { label: 'Whole family', factor: 2.5 },
];

// Simple age-band base rates (illustrative pre-subsidy monthly premium per primary applicant)
function baseRate(age) {
  if (age < 30) return 285;
  if (age < 40) return 330;
  if (age < 50) return 405;
  if (age < 60) return 545;
  return 690;
}

export default function PremiumEstimator() {
  const [age, setAge] = useState(35);
  const [household, setHousehold] = useState(HOUSEHOLDS[0]);

  const mid = Math.round((baseRate(age) * household.factor) / 5) * 5;
  const low = Math.round((mid * 0.75) / 5) * 5;
  const high = Math.round((mid * 1.25) / 5) * 5;

  const scrollToQuote = () => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="glass-card rounded-2xl p-7 md:p-10 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-[#FFF8E6] text-[#EAB308] grid place-items-center shrink-0">
            <Calculator className="w-5 h-5" />
          </span>
          <h3 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">Estimate your monthly premium</h3>
        </div>

        <div className="mb-7">
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-sm font-semibold text-slate-900">Your age</label>
            <span className="font-display font-extrabold text-xl text-[#CA8A04]">{age}</span>
          </div>
          <Slider value={[age]} onValueChange={([v]) => setAge(v)} min={18} max={64} step={1} />
          <div className="flex justify-between text-xs text-slate-400 mt-1.5"><span>18</span><span>64</span></div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900 mb-3">Who needs coverage?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {HOUSEHOLDS.map((h) => (
              <button
                key={h.label}
                type="button"
                onClick={() => setHousehold(h)}
                className={`rounded-xl border-[1.5px] px-3 py-3 font-semibold text-sm transition-all ${household.label === h.label ? 'border-[#EAB308] bg-[#FFF8E6] text-slate-900' : 'border-slate-300 bg-white text-slate-700 hover:border-[#EAB308]'}`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center lg:w-72 lg:border-l lg:border-slate-200 lg:pl-10">
        <p className="text-xs font-bold tracking-[0.08em] uppercase text-slate-500 mb-2">Estimated range*</p>
        <p className="font-display font-extrabold text-slate-900 text-4xl md:text-[44px] leading-none mb-1">
          ${low}–${high}
        </p>
        <p className="text-sm text-slate-600 mb-5">per month, before subsidies</p>
        <button type="button" onClick={scrollToQuote} className="w-full inline-flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold rounded-xl px-5 py-3.5 transition-all hover:shadow-lg hover:shadow-[#EAB308]/30">
          See my real prices <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-slate-500 leading-relaxed mt-4 text-left">
          *Illustrative estimate only — not a quote or guarantee. Actual premiums depend on your ZIP code, income, tobacco use, and plan selection. ACA subsidies can substantially lower these amounts.
        </p>
      </div>
    </div>
  );
}