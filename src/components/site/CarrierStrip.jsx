const CARRIERS = [
  { name: 'Cigna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/f61175671_cigna_logo.png' },
  { name: 'Kaiser Permanente', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/64e3453c0_kaiser_permanente_transparent.png' },
  { name: 'Aetna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/ffa2e170e_aetna_logo.png', maxH: 'max-h-[26px] md:max-h-[30px]' },
  { name: 'Blue Cross Blue Shield', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/2b2cb24fb_bcbs_logo_transparent.png', nudge: 10 },
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
            <div key={c.name} className="h-11 md:h-12 w-[130px] md:w-[160px] flex items-center justify-center" style={c.nudge ? { transform: `translateY(${c.nudge}px)` } : undefined}>
              <img
                src={c.src}
                alt={`${c.name} logo`}
                className={`w-auto ${c.maxH || 'max-h-full'} object-contain`}
                style={{ opacity: 0.9 }}
              />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-8 max-w-3xl mx-auto leading-relaxed">
          Carrier names and logos are trademarks of their respective owners and are shown for identification only. Plan and network availability varies by state and county; not all carriers are offered in every area.
        </p>
      </div>
    </div>
  );
}