import { useParams, Navigate } from 'react-router-dom';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import LicenseStrip from '@/components/site/LicenseStrip';
import HowItWorks from '@/components/site/HowItWorks';
import CtaBand from '@/components/site/CtaBand';
import LanderHero from '@/components/landing/LanderHero';
import LanderBenefits from '@/components/landing/LanderBenefits';
import LanderFaq from '@/components/landing/LanderFaq';
import LanderDirectory from '@/components/landing/LanderDirectory';
import { STATES } from '@/data/landerContent';

export default function StateLander() {
  const { stateSlug } = useParams();
  const state = STATES[stateSlug];
  if (!state) return <Navigate to="/" replace />;

  const benefits = [
    ['A licensed agent for your state', `Every quote is reviewed by an agent licensed in ${state.name} — never an automated price with no one behind it.`],
    ['Your doctors checked first', `${state.name} networks vary widely by county. We verify your physicians and prescriptions before you enroll.`],
    ['Every category compared', 'ACA Marketplace, private PPO, short-term where available, and supplemental plans — priced side by side.'],
    ['No cost to you', 'Our service is free. We are paid by the carrier when you enroll, and you never pay more for using an agent.'],
  ];

  const faqs = [
    [`How do I enroll in health insurance in ${state.name}?`, `${state.name} enrolls through ${state.exchange}. A licensed agent can complete the application with you by phone, or you can start with the quote form on this page.`],
    [`When can I enroll in ${state.name}?`, 'Open Enrollment for Marketplace coverage generally runs November 1 through January 15, though some state exchanges extend it. Outside that window you need a qualifying life event such as job loss, a move, marriage, or a new baby.'],
    [`Do you charge a fee in ${state.name}?`, 'No. We are a licensed insurance agency compensated by the carriers, so our help costs you nothing and does not raise your premium.'],
    [`What if I do not qualify for a subsidy?`, `Plenty of ${state.name} households are above the subsidy cliff after the enhanced tax credits expired. In that case we price off-exchange PPO and supplemental options alongside Marketplace plans so you can see the real difference.`],
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <LanderHero
        eyebrow={`${state.name} · Licensed agents · Free quote`}
        headline={state.headline}
        intro={state.intro}
        bullets={state.facts}
      />
      <LicenseStrip />
      <LanderBenefits heading={`Why ${state.name} households call us`} items={benefits} />
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight mb-10">How it works</h2>
          <HowItWorks />
        </div>
      </section>
      <LanderFaq heading={`${state.name} health insurance questions`} faqs={faqs} />
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <CtaBand />
        </div>
      </section>
      <LanderDirectory />
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}