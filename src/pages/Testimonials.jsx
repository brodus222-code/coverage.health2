import { Link } from 'react-router-dom';
import { Star, ShieldCheck, FileCheck, Lock, ArrowRight } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import TestimonialCard from '@/components/site/TestimonialCard';

const REVIEWS = [
  { name: 'Maria G.', state: 'Texas', tag: 'Self-employed', stars: 5, quote: 'I put off getting coverage for two years because every site felt like a trap. My agent walked me through three PPO options, told me which one my doctor actually takes, and I was enrolled the same afternoon.' },
  { name: 'Derrick W.', state: 'Georgia', tag: 'Between jobs', stars: 5, quote: 'Lost my employer plan in a layoff. They found me a subsidy I had no idea I qualified for — my premium went from a quoted $610 to $148 a month. Nobody pressured me on anything.' },
  { name: 'Susan & Tom R.', state: 'Florida', tag: 'Early retirees', stars: 5, quote: 'We retired at 61 and needed a bridge to Medicare. Our agent compared ACA plans against a private PPO side by side and explained the trade-offs like a human being. Refreshing.' },
  { name: 'Alyssa P.', state: 'Ohio', tag: 'Family of four', stars: 5, quote: 'Two kids, one with a pediatric specialist we could not lose. They filtered plans by her doctor\'s network first, price second. That\'s the right order and no other site did it.' },
  { name: 'James K.', state: 'Arizona', tag: 'Freelancer', stars: 4, quote: 'Quote came by phone within 40 minutes of the form. Took one more call to finalize than I expected, but the agent knew Arizona plans cold and added dental in the same enrollment.' },
  { name: 'Renee B.', state: 'North Carolina', tag: 'Small business owner', stars: 5, quote: 'I asked hard questions about what the fixed indemnity plan did NOT cover and got straight answers. Ended up on an ACA plan instead — they recommended the option that paid them less. Trust earned.' },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      <section className="bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20 text-center">
          <span className="inline-block bg-[#FFF2EC] text-[#E85A26] font-bold text-xs tracking-[0.08em] uppercase rounded-full px-4 py-1.5 mb-6">Testimonials</span>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight mb-4">Real households. Real coverage.</h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </span>
            <span className="font-display font-extrabold text-slate-900 text-lg">4.8/5</span>
          </div>
          <p className="text-lg text-slate-600">From verified customers across our 13 licensed states.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-10 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {REVIEWS.map((r) => <TestimonialCard key={r.name} {...r} />)}
        </div>

        <p className="text-xs text-slate-400 mb-12">[PLACEHOLDER — replace with verified customer reviews and required substantiation before launch. Testimonials must reflect real, typical experiences per FTC endorsement guidelines.]</p>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: ShieldCheck, title: 'Licensed agency', body: 'HealthLink Insurance Agency LLC — licensed in 13 states, NPN available on request.' },
            { icon: Lock, title: 'Your data, protected', body: 'Encrypted in transit and never sold to spam lists. Revoke contact consent anytime.' },
            { icon: FileCheck, title: 'Named partners only', body: 'Every partner who may contact you is listed on our Disclosures page. No mystery calls.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
              <div className="w-11 h-11 rounded-xl bg-[#FFF2EC] text-[#FF6B35] grid place-items-center mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-display font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-white tracking-tight mb-1">Your story could be next.</h2>
            <p className="text-slate-300">Five quick questions. Real prices. A licensed agent in your corner.</p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E85A26] text-white font-bold rounded-xl px-7 py-4 transition-colors">
            Get my free quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}