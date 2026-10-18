import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import CarrierMiniGrid from '@/components/site/CarrierMiniGrid';
import YearBadge from '@/components/site/YearBadge';
import SocialProof from '@/components/site/SocialProof';
import QuoteForm from '@/components/site/QuoteForm';
import PlanCards from '@/components/site/PlanCards';
import HowItWorks from '@/components/site/HowItWorks';
import CtaBand from '@/components/site/CtaBand';

import LanderDirectory from '@/components/landing/LanderDirectory';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f4fd] via-[#f0f7ff] to-[#e6f0fa]">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-[#3b82f6]/[0.06] blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-14 md:pt-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-y-10 lg:gap-y-0 gap-x-12 lg:gap-x-16 lg:items-stretch">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col">
            <div className="mb-4"><YearBadge /></div>
            <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-[64px] leading-[1.05] tracking-tight lg:mb-6">
              Health insurance that fits your budget, <em className="not-italic text-[#3b82f6]">explained by a human.</em>
            </h1>
            <div className="mt-6"><QuoteForm mode="hero" /></div>
            <div className="mt-6 lg:mt-auto"><CarrierMiniGrid /></div>
            <div className="mt-5 lg:hidden"><SocialProof /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="hidden lg:block lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/60">
              <Image
                src="https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/c43b50088_image_20261018_182915.jpg"
                alt="A licensed agent on a friendly video call with a customer reviewing health coverage"
                className="w-full h-[540px]"
                focalPointY={0.35}
              />
            </div>
            <div className="mt-6"><SocialProof /></div>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="pulse-line w-full mb-14" />
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight mb-3">Coverage for how you actually live</h2>
          <p className="text-slate-600 max-w-[62ch] mb-10 text-lg">
            Self-employed, between jobs, early retiree, or just tired of overpaying — one call compares every category below against your ZIP code, doctors, and budget.
          </p>
          <PlanCards />
        </div>
      </section>

      {/* How it works */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight mb-10">How it works</h2>
          <HowItWorks />
        </div>
      </section>

      {/* CTA band */}
      <section className="pb-20 md:pb-28">
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