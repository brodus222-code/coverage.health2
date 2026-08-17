import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Lock, Trophy, Award } from 'lucide-react';
import QuizCardB from '@/components/site/QuizCardB';
import CarrierMiniGrid from '@/components/site/CarrierMiniGrid';

export default function VariantB() {
  const [step, setStep] = useState(1);
  const total = 5;

  return (
    <div
      className="min-h-screen bg-[#F4F7FB] flex flex-col font-body"
      style={{ '--font-heading': "'Sora', sans-serif", '--font-body': "'Inter', sans-serif" }}
    >
      {/* Slim header */}
      <header className="bg-white border-b border-[#DCE6F0]">
        <div className="max-w-[920px] mx-auto px-4 h-[58px] flex items-center justify-between">
          <Link to="/b" className="font-heading font-extrabold text-[19px] text-[#132A47]">
            Coverage<b className="text-[#FF6B57]">.</b>Health
          </Link>
          <a href="tel:+18553955001" className="text-right font-bold text-[#132A47] text-[15px] leading-tight">
            <small className="hidden sm:flex items-center justify-end gap-1.5 font-medium text-[#4A6076] text-[11.5px]">
              Licensed agents online <span className="w-2 h-2 rounded-full bg-[#22B573] inline-block" />
            </small>
            <span className="dni-number">(855) 395-5001</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex justify-center px-4 pt-9 pb-16">
        <div className="w-full max-w-[640px]">
          {/* Advisor chip */}
          <div className="flex items-center gap-3 bg-white border border-[#DCE6F0] rounded-full py-2 pl-2 pr-4 w-fit max-w-full mx-auto mb-6 text-[13.5px] text-[#4A6076]">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2E90FA] to-[#7BB8FC] text-white grid place-items-center font-heading font-extrabold shrink-0">CH</span>
            <span>Answer <b className="text-[#132A47]">5 quick questions</b> — a licensed agent for your state matches your plans. Free, no obligation.</span>
          </div>

          {/* Progress rail */}
          <div className="flex items-center justify-center gap-2.5 mb-6" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`w-11 h-1.5 rounded-full transition-colors duration-300 ${n <= step ? 'bg-[#2E90FA]' : 'bg-[#DCE6F0]'}`} />
            ))}
            <span className="text-[12.5px] font-bold text-[#2E90FA] ml-1.5 min-w-[64px]">{Math.round((step / total) * 100)}% done</span>
          </div>

          <QuizCardB onStepChange={setStep} />

          {/* Reassure row */}
          <div className="flex justify-center gap-6 flex-wrap mt-5 text-[12.5px] text-[#4A6076]">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> <b className="text-[#132A47]">Encrypted</b> — never sold to spam lists</span>
            <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> <b className="text-[#132A47]">4.8/5</b> customer rating</span>
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> <b className="text-[#132A47]">A+</b> rated agency</span>
          </div>

          <div className="mt-6">
            <CarrierMiniGrid />
          </div>

          {/* Skip-to-call band (desktop) */}
          <div className="hidden md:flex mt-7 bg-[#132A47] rounded-[14px] px-5 py-4 items-center justify-between gap-4 flex-wrap">
            <p className="text-[#B9CBE0] text-sm"><b className="text-white">Rather just talk it through?</b> Licensed agents answer in under 30 seconds, Mon–Fri 8am–8pm ET.</p>
            <a href="tel:+18553955001" className="bg-white text-[#132A47] font-heading font-extrabold rounded-[10px] px-5 py-3 text-base whitespace-nowrap inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> <span className="dni-number">(855) 395-5001</span>
            </a>
          </div>
        </div>
      </main>

      {/* Compact footer */}
      <footer className="px-4 pb-24 md:pb-8 text-[11.5px] text-[#7A8CA0] leading-relaxed">
        <div className="max-w-[640px] mx-auto border-t border-[#DCE6F0] pt-4 space-y-2">
          <p>Coverage.Health is owned and operated by HealthLink Insurance Agency LLC, a licensed insurance agency domiciled in Illinois and licensed in AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, and TX. This is a commercial website; we are <b className="text-[#4A6076]">not a government website and are not affiliated with or endorsed by the U.S. government or the Health Insurance Marketplace (Healthcare.gov)</b>. Not all products are available in all states. Fixed indemnity, limited medical, and MEC plans are not comprehensive major medical insurance. Advertised examples are not guarantees; actual premiums depend on age, location, household size, income, tobacco use, and plan selection.</p>
          <p>
            <Link to="/privacy" className="text-[#5E7A96] underline">Privacy Policy</Link> · <Link to="/terms" className="text-[#5E7A96] underline">Terms of Use</Link> · <Link to="/disclosures" className="text-[#5E7A96] underline">Licensing &amp; Disclosures</Link> · <Link to="/privacy#rights" className="text-[#5E7A96] underline">Do Not Sell/Share My Info</Link> · © 2026 HealthLink Insurance Agency LLC
          </p>
        </div>
      </footer>

      {/* Sticky mobile call bar */}
      <a
        href="tel:+18553955001"
        className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#F0755A] text-white font-heading font-extrabold text-[16.5px] text-center py-3.5 flex items-center justify-center gap-2"
      >
        <Phone className="w-4 h-4" /> Skip the form — call <span className="dni-number">(855) 395-5001</span>
      </a>
    </div>
  );
}