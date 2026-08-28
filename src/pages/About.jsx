import AboutHeader from '@/components/about/AboutHeader';
import AboutHero from '@/components/about/AboutHero';
import AboutValues from '@/components/about/AboutValues';
import AboutStates from '@/components/about/AboutStates';
import AboutCta from '@/components/about/AboutCta';
import AboutFooter from '@/components/about/AboutFooter';
import MobileCallBar from '@/components/site/MobileCallBar';

export default function About() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <AboutHeader />
      <main>
        <AboutHero />
        <section className="bg-background px-5 py-12 text-center min-[520px]:py-8 md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground min-[520px]:text-3xl md:text-4xl">Our mission</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground min-[520px]:mt-2 min-[520px]:text-[11px] min-[520px]:leading-snug md:text-base">Match every household with health coverage that actually fits — the right network for their doctors, the right premium for their budget, and every subsidy they legally qualify for — explained by a licensed human in one honest conversation. No jargon, no pressure, no surprises at the pharmacy counter.</p>
          </div>
        </section>
        <AboutValues />
        <AboutStates />
        <AboutCta />
      </main>
      <AboutFooter />
      <div className="min-[520px]:hidden"><MobileCallBar /></div>
    </div>
  );
}