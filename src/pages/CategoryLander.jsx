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
import LanderNotice from '@/components/landing/LanderNotice';
import LanderDirectory from '@/components/landing/LanderDirectory';
import { CATEGORIES } from '@/data/landerContent';

export default function CategoryLander() {
  const { categorySlug } = useParams();
  const cat = CATEGORIES[categorySlug];
  if (!cat) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <LanderHero
        eyebrow={cat.eyebrow}
        headline={cat.headline}
        intro={cat.intro}
        bullets={cat.benefits.map(([title]) => title)}
      />
      <LicenseStrip />

      {cat.notComprehensive && (
        <LanderNotice>
          <b>Important:</b> Short-term medical, fixed indemnity, and limited benefit plans are <b>not comprehensive major medical insurance</b> and do not satisfy all requirements of the Affordable Care Act. They may exclude pre-existing conditions and are not available in every state. If you need guaranteed coverage of a pre-existing condition, a licensed agent will direct you to an ACA-compliant plan instead. Read all plan documents carefully before enrolling.
        </LanderNotice>
      )}

      <LanderBenefits heading="What a licensed agent does for you here" items={cat.benefits} />

      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight mb-10">How it works</h2>
          <HowItWorks />
        </div>
      </section>

      <LanderFaq heading="Common questions" faqs={cat.faqs} />

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