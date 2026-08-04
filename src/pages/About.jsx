import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Scale, MapPin, ArrowRight } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';

const STATES = [
  ['Arizona', 'AZ'], ['California', 'CA'], ['Florida', 'FL'], ['Georgia', 'GA'], ['Illinois', 'IL'],
  ['Nebraska', 'NE'], ['Nevada', 'NV'], ['New Jersey', 'NJ'], ['North Carolina', 'NC'], ['Ohio', 'OH'],
  ['South Carolina', 'SC'], ['Tennessee', 'TN'], ['Texas', 'TX'],
];

const VALUES = [
  { icon: ShieldCheck, title: 'Licensed, not lead-flipped', body: 'Every conversation happens with an agent licensed in your state. We are an insurance agency first — not an anonymous lead broker.' },
  { icon: HeartHandshake, title: 'Human explanations', body: 'Deductibles, networks, and subsidies are confusing on purpose. Our job is to translate them into plain English so you choose with confidence.' },
  { icon: Scale, title: 'Compliance as a feature', body: 'Clear consent, named partners, honest pricing language, and no government look-alike tricks. If a plan is not major medical, we say so out loud.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      <section className="bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-5 py-16 md:py-24 text-center">
          <span className="inline-block bg-[#FFF8E6] text-[#CA8A04] font-bold text-xs tracking-[0.08em] uppercase rounded-full px-4 py-1.5 mb-6">About the agency</span>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight leading-[1.08] mb-6">
            We're HealthLink Insurance — the licensed team behind <span className="text-[#EAB308]">Coverage.Health</span>.
          </h1>
          <p className="text-lg text-slate-600 max-w-[60ch] mx-auto">
            HealthLink Insurance Agency LLC is a licensed insurance agency domiciled in Illinois. We built Coverage.Health for one reason: shopping for Under-65 health coverage shouldn't require a law degree, three hours on hold, or a leap of faith.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-10 pb-16 md:pb-20">
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-14">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mb-4">Our mission</h2>
          <p className="text-lg text-slate-600 max-w-[70ch]">
            Match every household with health coverage that actually fits — the right network for their doctors, the right premium for their budget, and every subsidy they legally qualify for — explained by a licensed human in one honest conversation. No jargon, no pressure, no surprises at the pharmacy counter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {VALUES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="w-11 h-11 rounded-xl bg-[#FFF8E6] text-[#EAB308] grid place-items-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h3>
              <p className="text-[15px] text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-[#EAB308]" />
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">Licensed in 13 states</h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-[62ch]">Every agent who takes your call holds an active license in your state. Full license numbers are listed on our <Link to="/disclosures" className="text-[#CA8A04] font-semibold underline">Licensing &amp; Disclosures</Link> page.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {STATES.map(([name, abbr]) => (
              <div key={abbr} className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="font-display font-extrabold text-[#EAB308] text-sm w-8">{abbr}</span>
                <span className="text-sm font-medium text-slate-900">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-white tracking-tight mb-1">Ready to see your options?</h2>
            <p className="text-slate-300">Five quick questions. Real prices for your ZIP code. Zero obligation.</p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold rounded-xl px-7 py-4 transition-colors">
            Get my free quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}