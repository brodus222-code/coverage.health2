import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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

const TICKS = [
  'Plans starting under $200/mo for many households*',
  'See if you qualify for ACA subsidies that lower your premium',
  'PPO options with nationwide networks — keep your doctor',
  'Dental & vision can be added in the same call',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-[#EAB308]/[0.06] blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-14 md:pt-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-y-10 lg:gap-y-0 gap-x-12 lg:gap-x-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-start-1 lg:row-start-1">
            <div className="mb-4"><YearBadge /></div>
            <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-[64px] leading-[1.05] tracking-tight lg:mb-6">
              Health insurance that fits your budget, <em className="not-italic text-[#EAB308]">explained by a human.</em>
            </h1>
            <div className="mt-6"><QuoteForm mode="hero" /></div>
            <div className="mt-5"><SocialProof /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="hidden lg:block lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/60">
              <Image
                src="https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/9a19a46ca_generated_image.png"
                alt="A smiling family of four walking together along a garden path — protected and at ease"
                className="w-full h-[540px]"
                focalPointY={0.4}
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-start-1 lg:row-start-2">
            <CarrierMiniGrid />
            <p className="text-lg text-slate-600 max-w-[46ch] mb-8">
              Compare Under-65 private PPO, ACA marketplace, and supplemental plans side by side. Answer a few questions and a licensed agent shows you real prices for your ZIP code — in minutes, not days.
            </p>
            <ul className="space-y-3 mb-8">
              {TICKS.map((t) => (
                <li key={t} className="flex gap-3 items-start font-medium text-slate-900">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#EAB308]/10 text-[#EAB308] grid place-items-center shrink-0"><Check className="w-3.5 h-3.5" /></span>
                  {t}
                </li>
              ))}
            </ul>
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