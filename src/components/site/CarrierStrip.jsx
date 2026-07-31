import { Image } from '@/components/ui/image';

const CARRIERS = [
  { name: 'UnitedHealthcare', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/a4e4a1a1a_UHClogo.jpeg' },
  { name: 'Blue Cross Blue Shield', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/3e3d7b1cf_bcbslogo.jpeg' },
  { name: 'Cigna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/1fa432048_cignalogo.jpeg' },
  { name: 'Aetna', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/c9a6ec4c0_aetnalogo.jpeg' },
  { name: 'Ambetter', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/e9efda220_ambetterlogo.jpeg' },
  { name: 'First Health', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/608947826_FirstHealthlogo.jpeg' },
];

export default function CarrierStrip() {
  return (
    <div className="bg-white border-y border-slate-200 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-6">
          Compare plans and networks from top-rated carriers, including
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CARRIERS.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-slate-200/80 bg-white h-16 md:h-20 flex items-center justify-center px-3"
            >
              <Image
                src={c.src}
                alt={`${c.name} logo`}
                fittingType="fit"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-6 max-w-3xl mx-auto leading-relaxed">
          Carrier names and logos are trademarks of their respective owners and are shown for identification only. Plan and network availability varies by state and county; not all carriers are offered in every area.
        </p>
      </div>
    </div>
  );
}