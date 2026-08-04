import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  { q: 'Is the quote really free? What\'s the catch?', a: 'Yes — quotes and agent consultations are 100% free with no obligation to enroll. We\'re a licensed insurance agency: if you enroll in a plan, the insurance carrier pays us a commission. Your premium is the same whether you buy through us or directly from the carrier.' },
  { q: 'How fast will I get my quote?', a: 'After you submit the form, a licensed agent for your state reviews your household details and calls you — usually within the hour during business hours (Mon–Fri 8am–8pm ET). Prefer not to wait? Call us directly and get quotes on the spot.' },
  { q: 'What types of plans can you show me?', a: 'We compare Under-65 private PPO plans, ACA marketplace plans (including subsidy checks), short-term medical, and supplemental products like dental, vision, and accident coverage. One call compares every category against your ZIP code, doctors, and budget.' },
  { q: 'Will you check if I qualify for a subsidy?', a: 'Yes. Your agent runs your household size and estimated income against the ACA subsidy tables for your state. Many households qualify for premium tax credits that significantly lower the monthly cost — sometimes to $0.' },
  { q: 'Can I keep my current doctor?', a: 'Often, yes. Tell your agent which doctors and medications matter to you, and they\'ll filter for plans whose networks and formularies include them — that\'s exactly why we ask for your ZIP code, since networks are set by county.' },
  { q: 'I\'m self-employed / between jobs. Do you have options for me?', a: 'That\'s our specialty. Self-employed workers, early retirees, and people between jobs are the majority of who we help. Options range from ACA plans with subsidies to private PPOs and short-term bridge coverage.' },
  { q: 'What if I missed Open Enrollment?', a: 'You may still have options: a qualifying life event (job loss, move, marriage, new baby) can open a Special Enrollment Period for ACA plans, and many private and supplemental plans can be started year-round. An agent can confirm what\'s available today.' },
  { q: 'Who will contact me, and how often?', a: 'A licensed agent from HealthLink Insurance Agency or one of the named partners listed on our Disclosures page. You can revoke consent anytime — reply STOP to any text, tell any agent to add you to our Do-Not-Call list, or email privacy@coverage.health.' },
  { q: 'Is Coverage.Health a government website?', a: 'No. We are a private, commercial website operated by HealthLink Insurance Agency LLC. We are not affiliated with or endorsed by the U.S. government or Healthcare.gov — though we can help you enroll in official ACA marketplace plans.' },
  { q: 'Is my information safe?', a: 'Your information is encrypted in transit and shared only as described in our Privacy Policy — with the licensed agents and carriers needed to quote your coverage. We never sell your details to spam lists, and you can exercise your state privacy rights anytime.' },
  { q: 'What if I\'m 65 or older?', a: 'Our online quote flow focuses on Under-65 coverage, but our agents can still help with supplemental products like dental, vision, and hospital indemnity. Call us and we\'ll point you in the right direction.' },
  { q: 'What states do you operate in?', a: 'We\'re licensed in 13 states: Arizona, California, Florida, Georgia, Illinois, Nebraska, Nevada, New Jersey, North Carolina, Ohio, South Carolina, Tennessee, and Texas. License numbers are on our Licensing & Disclosures page.' },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      <section className="bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20 text-center">
          <span className="inline-block bg-[#FFF8E6] text-[#CA8A04] font-bold text-xs tracking-[0.08em] uppercase rounded-full px-4 py-1.5 mb-6">FAQ</span>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight mb-4">Frequently asked questions</h1>
          <p className="text-lg text-slate-600">Straight answers about coverage, quotes, and how we work. Can't find yours? <a href="tel:+18553955001" className="text-[#CA8A04] font-semibold underline">Call us</a> — asking questions is free too.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-16 md:pb-24">
        <div className="glass-card rounded-2xl px-6 md:px-8 py-2">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-slate-200/80">
                <AccordionTrigger className="text-left font-display font-bold text-slate-900 text-[16px] hover:no-underline hover:text-[#CA8A04]">{q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-[15px] leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 bg-slate-900 rounded-2xl p-7 md:p-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="font-display font-bold text-white text-lg mb-1">Still have questions?</p>
            <p className="text-slate-300 text-sm">Licensed agents answer in under 30 seconds, Mon–Fri 8am–8pm ET.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+18553955001" className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold rounded-xl px-6 py-3.5 transition-colors">
              <Phone className="w-4 h-4" /> <span className="dni-number">(855) 395-5001</span>
            </a>
            <Link to="/" className="inline-flex items-center bg-white text-slate-900 font-bold rounded-xl px-6 py-3.5 hover:bg-slate-100 transition-colors">Get my quote</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}