import { Link } from 'react-router-dom';

const STATES = [['Arizona','AZ'],['California','CA'],['Florida','FL'],['Georgia','GA'],['Illinois','IL'],['Nebraska','NE'],['Nevada','NV'],['New Jersey','NJ'],['North Carolina','NC'],['Ohio','OH'],['South Carolina','SC'],['Tennessee','TN'],['Texas','TX']];

export default function AboutStates() {
  return (
    <section className="bg-background px-5 py-12 min-[520px]:py-8 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 min-[520px]:grid-cols-[0.85fr_1.15fr]">
        <div><h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground min-[520px]:text-3xl">Licensed in 13 states</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground min-[520px]:mt-2 min-[520px]:text-[10px]">Every agent who takes your call holds an active license in your state. Full license numbers are listed on our <Link to="/disclosures" className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4">Licensing &amp; Disclosures</Link> page.</p></div>
        <div className="relative rounded-2xl border border-border bg-muted p-5 min-[520px]:p-4 md:p-6">
          <div className="pointer-events-none absolute inset-6 rounded-[45%_55%_48%_52%] border border-border bg-card/60" />
          <div className="relative grid grid-cols-3 gap-2 min-[520px]:grid-cols-5">
            {STATES.map(([name, abbr]) => <div key={abbr} className="rounded-lg bg-emerald-800 px-2 py-3 text-center text-white shadow-sm min-[520px]:py-2"><b className="block font-display text-sm min-[520px]:text-[10px]">{abbr}</b><span className="block truncate text-[9px] text-emerald-100 min-[520px]:text-[7px]">{name}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}