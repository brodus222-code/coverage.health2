import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutCta() {
  return (
    <section className="relative z-10 mx-auto -mb-8 max-w-6xl px-4 md:-mb-10">
      <div className="flex flex-col items-start justify-between gap-6 rounded-xl border-[3px] border-primary bg-foreground p-7 shadow-xl min-[520px]:flex-row min-[520px]:items-center min-[520px]:p-4 md:p-7">
        <div><h2 className="font-display text-3xl font-extrabold tracking-tight text-white min-[520px]:text-2xl md:text-3xl">Ready to see your options?</h2><p className="mt-1 text-sm text-slate-300 md:text-base">Five quick questions. Real prices for your ZIP code. Zero obligation.</p></div>
        <Link to="/" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-sm min-[520px]:w-auto min-[520px]:text-sm">Get my free quote <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}