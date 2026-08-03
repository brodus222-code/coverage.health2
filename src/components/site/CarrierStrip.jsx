const CARRIERS = [
  { name: 'Cigna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/f61175671_cigna_logo.png' },
  { name: 'First Health', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/608947826_FirstHealthlogo.jpeg' },
  { name: 'Aetna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/ffa2e170e_aetna_logo.png' },
  { name: 'Blue Cross Blue Shield', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/09db35733_bcbs_logo_transparent2x.png', nudge: 4 },
  { name: 'Ambetter', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/e9efda220_ambetterlogo.jpeg' },
];

export default function CarrierStrip() {
  return (
    <div className="bg-white border-y border-slate-200 py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-5 md:px-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-8">
          Compare plans and networks from top-rated carriers, including
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
          {CARRIERS.map((c) => (
            <img
              key={c.name}
              src={c.src}
              alt={`${c.name} logo`}
              className="h-9 md:h-11 w-auto max-w-[140px] md:max-w-[180px] object-contain"
              style={{ opacity: 0.9, transform: c.nudge ? `translateY(${c.nudge}px)` : undefined }}
            />
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-8 max-w-3xl mx-auto leading-relaxed">
          Carrier names and logos are trademarks of their respective owners and are shown for identification only. Plan and network availability varies by state and county; not all carriers are offered in every area.
        </p>
      </div>
    </div>
  );
}