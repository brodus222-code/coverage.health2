import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';

const CHANNELS = [
  {
    icon: Phone,
    title: 'Talk to a licensed agent',
    body: 'Fastest way to get quotes, ask plan questions, or make changes to a pending application.',
    action: <a href="tel:+18885551234" className="dni-number font-display font-extrabold text-xl text-[#CA8A04] hover:underline">(888) 555-1234</a>,
    note: 'Mon–Fri 8am–8pm ET',
  },
  {
    icon: Mail,
    title: 'General inquiries',
    body: 'Questions about our agency, partnerships, careers, or anything that isn\'t urgent.',
    action: <a href="mailto:help@coverage.health" className="font-display font-extrabold text-xl text-[#CA8A04] hover:underline">help@coverage.health</a>,
    note: 'We reply within 1 business day',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy & consent requests',
    body: 'Revoke contact consent, opt out of data sharing, or exercise your state privacy rights.',
    action: <a href="mailto:privacy@coverage.health" className="font-display font-extrabold text-xl text-[#CA8A04] hover:underline">privacy@coverage.health</a>,
    note: 'Or reply STOP to any text',
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      <section className="bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20 text-center">
          <span className="inline-block bg-[#FFF8E6] text-[#CA8A04] font-bold text-xs tracking-[0.08em] uppercase rounded-full px-4 py-1.5 mb-6">Contact us</span>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight mb-4">Real humans, easy to reach.</h1>
          <p className="text-lg text-slate-600">Whether you need a quote, help with a plan, or want to exercise a privacy right — here's exactly where to go.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-10 pb-16 md:pb-24">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {CHANNELS.map(({ icon: Icon, title, body, action, note }) => (
            <div key={title} className="glass-card rounded-2xl p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[#FFF8E6] text-[#EAB308] grid place-items-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h2>
              <p className="text-[15px] text-slate-600 mb-5 flex-1">{body}</p>
              {action}
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {note}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-[#EAB308]" />
              <h2 className="font-display font-bold text-lg text-slate-900">Business address</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              HealthLink Insurance Agency LLC<br />
              d/b/a Coverage.Health<br />
              [Street Address, Suite #]<br />
              Chicago, Illinois [ZIP]
            </p>
            <p className="text-xs text-slate-500 mt-4">Licensed insurance agency domiciled in Illinois · NPN: 21554495. Written correspondence only — sales and service are handled by phone and email.</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-7 flex flex-col justify-center">
            <h2 className="font-display font-extrabold text-2xl text-white tracking-tight mb-2">Skip the inbox — get your quote now.</h2>
            <p className="text-slate-300 mb-6">Five quick questions and a licensed agent shows you real prices for your ZIP code.</p>
            <Link to="/" className="inline-flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold rounded-xl px-7 py-4 transition-colors w-fit">
              Start my free quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}