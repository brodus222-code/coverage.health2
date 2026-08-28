import { ShieldCheck, MessagesSquare, Handshake } from 'lucide-react';

const VALUES = [
  { icon: ShieldCheck, title: 'Licensed, not lead-flipped', body: 'Every conversation happens with an agent licensed in your state. We are an insurance agency first — not an anonymous lead broker.' },
  { icon: MessagesSquare, title: 'Human explanations', body: 'Deductibles, networks, and subsidies are confusing on purpose. Our job is to translate them into plain English so you choose with confidence.' },
  { icon: Handshake, title: 'Compliance as a feature', body: 'Clear consent, named partners, honest pricing language, and no government look-alike tricks. If a plan is not major medical, we say so out loud.' },
];

export default function AboutValues() {
  return (
    <section className="bg-foreground px-5 py-10 min-[520px]:py-7 md:px-10 md:py-12">
      <div className="mx-auto grid max-w-6xl gap-3 min-[520px]:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, body }) => (
          <article key={title} className="rounded-xl border border-white/10 bg-white/[0.06] p-5 text-white min-[520px]:p-3 md:p-5">
            <div className="mb-4 flex items-start justify-between gap-3 min-[520px]:mb-2"><h3 className="max-w-[12rem] font-display text-xl font-bold leading-none min-[520px]:text-base md:text-xl">{title}</h3><Icon className="h-6 w-6 shrink-0 text-primary min-[520px]:h-5 min-[520px]:w-5" /></div>
            <p className="text-sm leading-relaxed text-slate-300 min-[520px]:text-[9px] min-[520px]:leading-snug md:text-xs">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}