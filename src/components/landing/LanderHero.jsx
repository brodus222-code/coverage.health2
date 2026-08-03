import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import QuoteForm from '@/components/site/QuoteForm';

export default function LanderHero({ eyebrow, headline, intro, bullets, lockedState = null }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-[#FF6B35]/[0.06] blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-y-8 lg:gap-y-0 gap-x-12 lg:gap-x-16 items-start">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-start-1 lg:row-start-1">
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-[56px] leading-[1.06] tracking-tight lg:mb-6">
            {headline}
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }} className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24">
          <QuoteForm lockedState={lockedState} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-start-1 lg:row-start-2">
          <p className="text-lg text-slate-600 max-w-[52ch] mb-8">{intro}</p>
          <ul className="space-y-3 mb-8">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 items-start font-medium text-slate-900">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] grid place-items-center shrink-0"><Check className="w-3.5 h-3.5" /></span>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </span>
            <span><b className="text-slate-900">4.8/5</b> from verified customers</span>
            <span>·</span>
            <span>Licensed agency · NPN on request</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}