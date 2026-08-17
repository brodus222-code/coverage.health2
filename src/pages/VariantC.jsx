import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Lock, Trophy, Award } from 'lucide-react';
import { Image } from '@/components/ui/image';
import QuizCardB from '@/components/site/QuizCardB';
import CarrierMiniGrid from '@/components/site/CarrierMiniGrid';
import BenefitsB from '@/components/landerB/BenefitsB';
import StepsB from '@/components/landerB/StepsB';
import FaqB from '@/components/landerB/FaqB';

export default function VariantC() {
  const [step, setStep] = useState(1);
  const total = 5;

  return (
    <div
      className="min-h-screen bg-[#F4F7FB] flex flex-col font-body"
      style={{ '--font-heading': "'Sora', sans-serif", '--font-body': "'Inter', sans-serif" }}
    >
      {/* Slim header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#DCE6F0]">
        <div className="max-w-[1080px] mx-auto px-4 h-[58px] flex items-center justify-between">
          <Link to="/c" className="font-heading font-extrabold text-[19px] text-[#132A47]">
            Coverage<b className="text-[#FF6B57]">.</b>Health
          </Link>
          <a href="tel:+18553955001" data-call-source="Variant C header" className="text-right font-bold text-[#132A47] text-[15px] leading-tight">
            <small className="hidden sm:flex items-center justify-end gap-1.5 font-medium text-[#4A6076] text-[11.5px]">
              Licensed agents online <span className="w-2 h-2 rounded-full bg-[#22B573] inline-block" />
            </small>
            <span className="dni-number">(855) 395-5001</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="px-4 pt-9 md:pt-14 pb-12 md:pb-16">
          <div className="max-w-[1080px] mx-auto grid lg:grid-cols-[1fr_520px] gap-10 lg:gap-14 lg:items-start">
            {/* Left: pitch */}
            <div>
              <h1 className="font-heading font-extrabold text-[#132A47] text-[34px] md:text-[46px] leading-[1.07] tracking-tight">
                See what health insurance actually costs you — <em className="not-italic text-[#F0755A]">after subsidies.</em>
              </h1>
              <p className="text-[#4A6076] text-[17px] leading-relaxed mt-5 max-w-[54ch]">
                Answer 5 quick questions and a licensed agent in your state compares real plans against your doctors, prescriptions, and budget. Free, no obligation, no portal to fight with.
              </p>

              <ul className="mt-6 space-y-2.5 text-[15.5px] text-[#132A47]">
                {['2026 subsidy eligibility checked before we quote', 'ACA, short-term, and supplemental compared side by side', 'Enroll the same day if you like what you see'].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-[7px] w-2 h-2 rounded-full bg-[#2E90FA] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="hidden lg:block mt-8 rounded-[18px] overflow-hidden ring-1 ring-[#DCE6F0] shadow-[0_20px_50px_-24px_rgba(19,42,71,0.35)]">
                <Image
                  src="https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/9a19a46ca_generated_image.png"
                  alt="A smiling family of four walking together along a garden path"
                  className="w-full h-[300px]"
                  focalPointY={0.4}
                />
              </div>

              <div className="mt-7"><CarrierMiniGrid /></div>
            </div>

            {/* Right: quiz card */}
            <div className="lg:sticky lg:top-[74px]">
              <div className="flex items-center gap-3 bg-white border border-[#DCE6F0] rounded-full py-2 pl-2 pr-4 w-fit max-w-full mb-5 text-[13.5px] text-[#4A6076]">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2E90FA] to-[#7BB8FC] text-white grid place-items-center font-heading font-extrabold shrink-0">CH</span>
                <span>Answer <b className="text-[#132A47]">5 quick questions</b> — free, no obligation.</span>
              </div>

              {/* Progress rail */}
              <div className="flex items-center gap-2.5 mb-5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={`w-9 h-1.5 rounded-full transition-colors duration-300 ${n <= step ? 'bg-[#2E90FA]' : 'bg-[#DCE6F0]'}`} />
                ))}
                <span className="text-[12.5px] font-bold text-[#2E90FA] ml-1.5 min-w-[64px]">{Math.round((step / total) * 100)}% done</span>
              </div>

              <QuizCardB onStepChange={setStep} />

              <div className="flex flex-col gap-2 mt-5 text-[12.5px] text-[#4A6076]">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> <b className="text-[#132A47]">Encrypted</b> — never sold to spam lists</span>
                <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> <b className="text-[#132A47]">4.8/5</b> customer rating</span>
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> <b className="text-[#132A47]">A+</b> rated agency</span>
              </div>
            </div>
          </div>
        </section>

        <BenefitsB />
        <StepsB />

        {/* Call band */}
        <section className="px-4 pb-4">
          <div className="max-w-[1080px] mx-auto bg-[#132A47] rounded-[16px] px-6 py-7 flex items-center justify-between gap-5 flex-wrap">
            <div>
              <h2 className="font-heading font-extrabold text-white text-[22px] md:text-[26px] leading-tight">Rather just talk it through?</h2>
              <p className="text-[#B9CBE0] text-[15px] mt-1.5">Licensed agents answer in under 30 seconds, Mon–Fri 8am–8pm ET.</p>
            </div>
            <a href="tel:+18553955001" data-call-source="Variant C call band" className="bg-white text-[#132A47] font-heading font-extrabold rounded-[10px] px-6 py-3.5 text-base whitespace-nowrap inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> <span className="dni-number">(855) 395-5001</span>
            </a>
          </div>
        </section>

        <FaqB />
      </main>

      {/* Compact footer */}
      <footer className="px-4 pb-24 md:pb-8 pt-8 text-[11.5px] text-[#7A8CA0] leading-relaxed bg-white border-t border-[#DCE6F0]">
        <div className="max-w-[1080px] mx-auto space-y-2">
          <p>Coverage.Health is owned and operated by HealthLink Insurance Agency LLC, a licensed insurance agency domiciled in Illinois and licensed in AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, and TX. This is a commercial website; we are <b className="text-[#4A6076]">not a government website and are not affiliated with or endorsed by the U.S. government or the Health Insurance Marketplace (Healthcare.gov)</b>. Not all products are available in all states. Fixed indemnity, limited medical, and MEC plans are not comprehensive major medical insurance. Advertised examples are not guarantees; actual premiums depend on age, location, household size, income, tobacco use, and plan selection.</p>
          <p>
            <Link to="/privacy" className="text-[#5E7A96] underline">Privacy Policy</Link> · <Link to="/terms" className="text-[#5E7A96] underline">Terms of Use</Link> · <Link to="/disclosures" className="text-[#5E7A96] underline">Licensing &amp; Disclosures</Link> · <Link to="/privacy#rights" className="text-[#5E7A96] underline">Do Not Sell/Share My Info</Link> · © 2026 HealthLink Insurance Agency LLC
          </p>
        </div>
      </footer>

      {/* Sticky mobile call bar */}
      <a
        href="tel:+18553955001"
        data-call-source="Variant C mobile bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#F0755A] text-white font-heading font-extrabold text-[16.5px] text-center py-3.5 flex items-center justify-center gap-2"
      >
        <Phone className="w-4 h-4" /> Skip the form — call <span className="dni-number">(855) 395-5001</span>
      </a>
    </div>
  );
}