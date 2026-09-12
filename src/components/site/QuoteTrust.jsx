import { Check, ShieldCheck } from 'lucide-react';

const ITEMS = ['Licensed Agents', 'In-House Team', '100% Free'];

export default function QuoteTrust() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3.5 text-[12.5px] text-slate-500">
        {ITEMS.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 whitespace-nowrap">
            <Check className="w-3.5 h-3.5 text-[#22B573] shrink-0" /> {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3 items-start rounded-xl border border-slate-200 bg-white px-4 py-3.5">
        <ShieldCheck className="w-4 h-4 text-[#22B573] mt-0.5 shrink-0" />
        <p className="text-[13px] text-slate-600 leading-snug">
          <b className="text-slate-900">We never sell or pass along your information.</b> Your request is handled only by our in-house licensed agents.
        </p>
      </div>
    </div>
  );
}