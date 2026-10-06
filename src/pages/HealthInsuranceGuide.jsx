import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import GuidePlanTypes from '@/components/guide/GuidePlanTypes';
import GuideCosts from '@/components/guide/GuideCosts';
import GuideEnrollment from '@/components/guide/GuideEnrollment';

export default function HealthInsuranceGuide() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <article className="max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight mb-6">
          How to Compare Health Insurance Plans
        </h1>
        <div className="space-y-10 text-muted-foreground text-lg leading-relaxed">
          <p>The right health plan needs to fit your budget, cover the care you use, and protect you from costs you couldn’t comfortably pay yourself. Whether you’re self-employed, between jobs, or retiring before Medicare, use these five steps to compare options with fewer surprises.</p>
          <GuidePlanTypes />
          <GuideCosts />
          <GuideEnrollment />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-[#e8a020] hover:bg-[#d4911a] text-[#1a2744] font-bold rounded-xl px-6 py-3.5 transition-colors"
          >
            See My Options <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+18553955001"
            className="inline-flex items-center gap-2 border border-slate-300 bg-white hover:border-slate-400 text-slate-900 font-bold rounded-xl px-6 py-3.5 transition-colors"
          >
            <Phone className="w-4 h-4" /> <span className="dni-number">(855) 395-5001</span>
          </a>
        </div>
      </article>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}