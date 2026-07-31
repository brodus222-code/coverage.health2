const CARRIERS = [
  ['UnitedHealthcare', 'font-bold tracking-tight'],
  ['Cigna', 'font-extrabold tracking-tight'],
  ['Aetna', 'font-bold lowercase tracking-wide'],
  ['Blue Cross Blue Shield', 'font-semibold tracking-tight'],
  ['Ambetter', 'font-bold tracking-tight'],
  ['Oscar', 'font-extrabold tracking-widest lowercase'],
  ['Kaiser Permanente', 'font-semibold tracking-tight'],
];

export default function CarrierStrip() {
  return (
    <div className="bg-slate-900 py-7">
      <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-4">
          Compare plans from top-rated carriers, including
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {CARRIERS.map(([name, cls]) => (
            <span key={name} className={`text-slate-300 text-base md:text-lg whitespace-nowrap font-display ${cls}`}>
              {name}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-4 max-w-3xl mx-auto">
          Carrier names are trademarks of their respective owners. Plan availability varies by state and county; not all carriers are offered in every area.
        </p>
      </div>
    </div>
  );
}