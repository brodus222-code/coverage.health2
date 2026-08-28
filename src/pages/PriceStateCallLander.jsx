import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Check, Phone, ShieldCheck } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import QuoteForm from '@/components/site/QuoteForm';
import QuoteTrust from '@/components/site/QuoteTrust';
import CarrierMiniGrid from '@/components/site/CarrierMiniGrid';
import MobileCallBar from '@/components/site/MobileCallBar';
import CompactFooter from '@/components/site/CompactFooter';
import { STATES } from '@/data/landerContent';

// Call-first variant of the "$56/mo" state lander: /plans-56-call/texas, /plans-56-call/florida, etc.
export default function PriceStateCallLander() {
  const { stateSlug } = useParams();
  const state = STATES[stateSlug];

  useEffect(() => {
    if (!state) return;
    const oldTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const oldDescription = meta?.getAttribute('content');
    document.title = `Call to Compare ${state.name} Health Plans from $56/mo | Coverage.Health`;
    meta?.setAttribute('content', `Call a licensed ${state.name} agent to compare health plans for adults under 65 starting from $56 per month, or check options online by ZIP.`);
    return () => { document.title = oldTitle; if (meta && oldDescription) meta.setAttribute('content', oldDescription); };
  }, [state]);

  if (!state) return <Navigate to="/" replace />;

  const benefits = [
    `${state.name} ACA and private plan options`,
    'Individual and family coverage',
    `Licensed ${state.name} agents · free guidance`,
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar staticLogo />
      <main className="bg-gradient-to-b from-card to-background">
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-7 md:py-14 grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-14 items-start">
          <div className="text-center lg:text-left lg:pt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-foreground">{state.name} · Talk to a Licensed Agent</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance">{state.name} Health Plans <span className="text-accent-foreground">from $56/mo</span></h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">Get personal help comparing individual and family coverage available near you.</p>
            <a href="tel:+18553955001" data-call-source={`Plans 56 Call Hero ${state.abbr}`} className="mt-6 w-full sm:w-auto inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-foreground px-7 py-4 text-background shadow-lg font-bold text-lg"><Phone className="w-6 h-6" /><span>Call (855) 395-5001</span></a>
            <p className="mt-2 text-sm font-semibold text-foreground">Free consultation · No obligation</p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm font-semibold text-foreground items-center lg:items-start">
              {benefits.map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-accent-foreground shrink-0" />{item}</span>)}
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto lg:mx-0">{state.name} enrolls through {state.exchange}.</p>
          </div>
          <div className="glass-card rounded-2xl p-5 md:p-7">
            <p className="text-center text-sm font-bold text-foreground mb-1">Prefer to check online?</p>
            <p className="text-center text-xs text-muted-foreground mb-4">Enter your ZIP to see available options.</p>
            <QuoteForm />
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">Rates and availability vary by applicant, ZIP, plan type, and eligibility. $56/mo reflects available pricing for qualifying applicants.</p>
            <div className="mt-4"><QuoteTrust /></div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-8 flex justify-center [&_.max-w-md]:mx-auto [&_p]:text-center">
          <CarrierMiniGrid stateAbbr={state.abbr} />
        </section>
        <section className="border-y border-border bg-card"><div className="max-w-4xl mx-auto px-5 py-6 flex gap-3 items-start justify-center"><ShieldCheck className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground"><b className="text-foreground">Free and private.</b> Checking your options does not obligate you to enroll.</p></div></section>
      </main>
      <CompactFooter />
      <MobileCallBar />
    </div>
  );
}