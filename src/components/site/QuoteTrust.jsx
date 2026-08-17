import { Check, ShieldCheck } from 'lucide-react';

const ITEMS = ['A+ rated agency', 'Licensed agents', '100% free'];

export default function QuoteTrust() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4 flex-wrap text-[12.5px] text-slate-500">
        {ITEMS.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#22B573]" /> {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3 items-start rounded-xl border border-slate-200 bg-white px-4 py-3.5">
        <ShieldCheck className="w-4 h-4 text-[#22B573] mt-0.5 shrink-0" />
        <p className="text-[13px] text-slate-600 leading-snug">
          <b className="text-slate-900">We never sell your information.</b> Your request is handled by our own licensed agents — never passed to a call center or lead buyer.
        </p>
      </div>
    </div>
  );
}