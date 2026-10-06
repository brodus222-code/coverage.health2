import { Image } from '@/components/ui/image';

const DESK_IMAGE = 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/6f6860c8c_generated_image.png';

export default function AboutHero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl min-[520px]:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-10 min-[520px]:px-8 min-[520px]:py-7 md:px-10">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">About the agency ·</p>
          <h1 className="max-w-xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground min-[520px]:text-[26px] md:text-4xl">We’re HealthLink Insurance — the licensed team behind Coverage.Health.</h1>
          <p className="mt-4 max-w-xl text-sm leading-snug text-muted-foreground min-[520px]:mt-3 min-[520px]:text-[9px] md:text-sm">HealthLink Insurance Agency LLC is a licensed insurance agency domiciled in Illinois. We built Coverage.Health for one reason: shopping for Under-65 health coverage shouldn’t require a law degree, three hours on hold, or a leap of faith.</p>
        </div>
        <div className="relative min-h-[330px] overflow-hidden min-[520px]:min-h-[250px] md:min-h-[320px]">
          <Image src={DESK_IMAGE} alt="Health insurance enrollment documents arranged on a desk" className="absolute inset-0 h-full w-full" fittingType="fill" />
          <div className="absolute inset-0 bg-foreground/10" />
          <div className="glass-card absolute inset-x-5 bottom-7 mx-auto max-w-sm rounded-xl p-5 shadow-2xl min-[520px]:inset-x-auto min-[520px]:bottom-7 min-[520px]:left-1/2 min-[520px]:w-52 min-[520px]:-translate-x-1/2 min-[520px]:p-3 md:w-64 md:p-4">
            <p className="font-display text-xl font-extrabold text-foreground min-[520px]:text-base md:text-lg">Enrollment-path</p>
            <div className="mt-4 space-y-2 min-[520px]:mt-2"><div><span className="mb-1 block text-[11px] font-semibold text-foreground min-[520px]:text-[8px]">First name</span><div className="h-9 rounded-md border border-[#e8a020] bg-card px-3 py-2 text-xs text-muted-foreground min-[520px]:h-7 min-[520px]:py-1 min-[520px]:text-[9px]">First name</div></div><div><span className="mb-1 block text-[11px] font-semibold text-foreground min-[520px]:text-[8px]">Input address</span><div className="h-9 rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground min-[520px]:h-7 min-[520px]:py-1 min-[520px]:text-[9px]">Confirm code</div></div></div>
            <div className="mt-3 rounded-full bg-[#1a2744] py-2.5 text-center text-sm font-bold text-white min-[520px]:py-1.5 min-[520px]:text-[10px]">Enrollment →</div>
          </div>
        </div>
      </div>
      <div className="border-t border-border bg-card px-5 py-3 text-center text-[10px] text-muted-foreground"><b className="text-foreground">Licensed in 13 states</b> · HealthLink Insurance Agency LLC</div>
    </section>
  );
}