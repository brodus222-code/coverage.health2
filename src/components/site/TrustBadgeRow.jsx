import { Check } from 'lucide-react';

const ITEMS = ['A+ Rating', 'Local Agents', '100% Free'];

export default function TrustBadgeRow() {
  return (
    <div className="flex items-center justify-center gap-3.5 text-[12.5px] text-slate-500">
      {ITEMS.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 whitespace-nowrap">
          <Check className="w-3.5 h-3.5 text-[#22B573] shrink-0" /> {t}
        </span>
      ))}
    </div>
  );
}