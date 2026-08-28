import { useEffect } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import QuoteForm from '@/components/site/QuoteForm';
import QuoteTrust from '@/components/site/QuoteTrust';
import CompactFooter from '@/components/site/CompactFooter';

const BENEFITS = ['Private PPO plan options', 'Broad provider access', 'Free licensed-agent guidance'];

export default function Ppo89() {
  useEffect(() => {
    const oldTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const oldDescription = meta?.getAttribute('content');
    document.title = 'Private PPO Plans from $89/mo | Coverage.Health';
    meta?.setAttribute('content', 'Explore private PPO health plan options starting from $89 per month. Check availability in your ZIP free with no obligation.');
    return () => {
      document.title = oldTitle;
      if (meta && oldDescription) meta.setAttribute('content', oldDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopBar staticLogo hideCall />
      <main className="bg-gradient-to-b from-card to-background">
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-7 md:py-16 grid lg:grid-cols-[1fr_440px] gap-7 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <p className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">Private PPO Coverage</p>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance">Private PPO Health Plans <span className="text-accent-foreground">from $89/mo</span></h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">Check private health coverage available near you and compare options with help from a licensed agent.</p>
            <div className="mt-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start gap-2.5 text-sm font-semibold text-foreground">
              {BENEFITS.map((item) => <span key={item} className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-accent-foreground" />{item}</span>)}
            </div>
          </div>
          <div>
            <div className="glass-card rounded-2xl p-5 md:p-7"><QuoteForm offer="ppo-89" /></div>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">Rates and availability vary by age, health history, ZIP, and eligibility. $89/mo reflects available pricing for qualifying applicants.</p>
            <div className="mt-4"><QuoteTrust /></div>
          </div>
        </section>
        <section className="border-y border-border bg-card"><div className="max-w-4xl mx-auto px-5 py-6 flex gap-3 items-start justify-center"><ShieldCheck className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground"><b className="text-foreground">Free and private.</b> Checking your options does not obligate you to enroll.</p></div></section>
      </main>
      <CompactFooter />
    </div>
  );
}