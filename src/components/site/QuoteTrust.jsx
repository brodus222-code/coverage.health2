import { ShieldCheck, Lock, Trophy, Award } from 'lucide-react';

export default function QuoteTrust() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 text-[12.5px] text-slate-500">
        <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> <b className="text-slate-900">Encrypted</b> — never sold to spam lists</span>
        <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> <b className="text-slate-900">4.8/5</b> customer rating</span>
        <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> <b className="text-slate-900">A+</b> rated agency</span>
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