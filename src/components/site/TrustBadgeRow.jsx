import { Check } from 'lucide-react';

export default function TrustBadgeRow({ stateAbbr = '' }) {
  const ITEMS = [stateAbbr === 'FL' ? 'Florida-Licensed' : 'Licensed Agents', 'In-House Team', '100% Free'];
  return (
    <div className="flex items-center justify-center gap-3.5 md:gap-7 md:mt-2 text-[12.5px] text-slate-500">
      {ITEMS.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 whitespace-nowrap">
          <Check className="w-3.5 h-3.5 text-[#22B573] shrink-0" /> {t}
        </span>
      ))}
    </div>
  );
}