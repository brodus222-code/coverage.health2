import { Image } from '@/components/ui/image';

const BASE_CARRIERS = [
  { name: 'Cigna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/f61175671_cigna_logo.png' },
  { name: 'Aetna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/ffa2e170e_aetna_logo.png', height: 'h-6' },
  { name: 'Anthem Blue Cross Blue Shield', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/d22cfa78d_Anthem_Blue_Cross_Final_Verified_v5.png', height: 'h-7' },
];

const KAISER = { name: 'Kaiser Permanente', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/64e3453c0_kaiser_permanente_transparent.png' };
const UHC = { name: 'UnitedHealthcare', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/e42e9acfd_uhc_logo.png' };
const FLORIDA_BLUE = { name: 'Florida Blue', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/1570c327b_image.png', height: 'h-9' };

export default function CarrierMiniGrid({ stateAbbr }) {
  const second = (stateAbbr === 'CA' || stateAbbr === 'GA') ? KAISER : UHC;
  const fourth = stateAbbr === 'FL' ? FLORIDA_BLUE : BASE_CARRIERS[2];
  const CARRIERS = [BASE_CARRIERS[0], second, BASE_CARRIERS[1], fourth];
  return (
    <div className="mb-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
        Carrier and network availability varies by ZIP
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-md">
        {CARRIERS.map((c) => (
          <div
            key={c.name}
            className="h-12 flex items-center justify-center bg-white rounded-lg border border-slate-200/70 px-2"
            style={c.nudge ? { transform: `translateY(${c.nudge}px)` } : undefined}
          >
            <Image
              src={c.src}
              alt={`${c.name} logo`}
              fittingType="fit"
              className={`w-full ${c.height || 'h-7'} opacity-90`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}