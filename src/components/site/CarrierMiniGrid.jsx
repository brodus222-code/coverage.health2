const BASE_CARRIERS = [
  { name: 'Cigna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/f61175671_cigna_logo.png' },
  { name: 'Aetna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/ffa2e170e_aetna_logo.png', maxH: 'max-h-[24px]' },
  { name: 'Anthem Blue Cross Blue Shield', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/54fbaac7b_Anthem_BCBS_Logo_Readable_v4.png', maxH: 'max-h-7' },
];

const KAISER = { name: 'Kaiser Permanente', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/64e3453c0_kaiser_permanente_transparent.png' };
const UHC = { name: 'UnitedHealthcare', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/e42e9acfd_uhc_logo.png' };

export default function CarrierMiniGrid({ stateAbbr }) {
  const second = (stateAbbr === 'CA' || stateAbbr === 'GA') ? KAISER : UHC;
  const CARRIERS = [BASE_CARRIERS[0], second, BASE_CARRIERS[1], BASE_CARRIERS[2]];
  return (
    <div className="mb-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
        Compare plans from top carriers
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-md">
        {CARRIERS.map((c) => (
          <div
            key={c.name}
            className="h-12 flex items-center justify-center bg-white rounded-lg border border-slate-200/70 px-2"
            style={c.nudge ? { transform: `translateY(${c.nudge}px)` } : undefined}
          >
            <img
              src={c.src}
              alt={`${c.name} logo`}
              className={`w-auto ${c.maxH || 'max-h-7'} object-contain`}
              style={{ opacity: 0.9 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}