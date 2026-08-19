import { useParams, Navigate } from 'react-router-dom';
import TopBar from '@/components/site/TopBar';
import CompactFooter from '@/components/site/CompactFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import HowItWorks from '@/components/site/HowItWorks';
import CtaBand from '@/components/site/CtaBand';
import LanderHero from '@/components/landing/LanderHero';
import LanderBenefits from '@/components/landing/LanderBenefits';
import LanderFaq from '@/components/landing/LanderFaq';
import { CATEGORIES } from '@/data/landerContent';

export default function CategoryLander() {
  const { categorySlug } = useParams();
  const cat = CATEGORIES[categorySlug];
  if (!cat) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar staticLogo />
      <LanderHero
        eyebrow={cat.eyebrow}
        headline={cat.headline}
        intro={cat.intro}
        bullets={cat.benefits.map(([title]) => title)}
      />
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight mb-10">How it works</h2>
          <HowItWorks />
        </div>
      </section>

      <LanderBenefits heading="What a licensed agent does for you here" items={cat.benefits} />

      <LanderFaq heading="Common questions" faqs={cat.faqs} />

      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <CtaBand />
        </div>
      </section>

      <CompactFooter />
      <MobileCallBar />
    </div>
  );
}