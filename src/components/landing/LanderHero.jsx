import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import QuoteForm from '@/components/site/QuoteForm';
import CarrierMiniGrid from '@/components/site/CarrierMiniGrid';
import YearBadge from '@/components/site/YearBadge';
import SocialProof from '@/components/site/SocialProof';
import TrustBadgeRow from '@/components/site/TrustBadgeRow';

export default function LanderHero({ eyebrow, headline, intro, bullets, lockedState = null, image = 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/9a19a46ca_generated_image.png', imageAlt = 'A smiling family of four walking together along a garden path — protected and at ease' }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-[#EAB308]/[0.06] blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-8 md:pt-20 pb-12 md:pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-y-8 lg:gap-y-0 gap-x-12 lg:gap-x-16 lg:items-stretch">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col">
          <div className="mb-2"><YearBadge /></div>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-[56px] leading-[1.06] tracking-tight">
            {headline}
          </h1>
          {intro && <p className="mt-4 text-[15px] md:text-base leading-relaxed text-slate-600 max-w-2xl">{intro}</p>}
          {bullets?.length > 0 && (
            <div className="mt-4 space-y-2">
              {bullets.slice(0, 3).map((bullet) => (
                <p key={bullet} className="flex items-start gap-2 text-[13px] leading-snug text-slate-700">
                  <Check className="w-4 h-4 mt-0.5 text-[#22B573] shrink-0" />
                  <span>{bullet}</span>
                </p>
              ))}
            </div>
          )}
          <div className="mt-6"><QuoteForm mode="hero" lockedState={lockedState} /></div>
          <div className="mt-5 lg:mt-auto [&>div]:mx-auto"><TrustBadgeRow stateAbbr={lockedState?.abbr} /></div>
          <div className="mt-5 [&_p]:text-center [&>div>div]:mx-auto"><CarrierMiniGrid stateAbbr={lockedState?.abbr} /></div>
          <div className="mt-5 lg:hidden"><SocialProof /></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }} className="hidden lg:block lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/60">
            <Image
              src={image}
              alt={imageAlt}
              className="w-full h-[540px]"
              focalPointY={0.4}
            />
          </div>
          <div className="mt-6"><SocialProof /></div>
        </motion.div>
      </div>
    </section>
  );
}