import { ShieldCheck } from 'lucide-react';

export default function SocialProof() {
  return (
    <div className="flex gap-3 items-start bg-white rounded-2xl border border-slate-200/80 shadow-sm px-5 py-4 max-w-md">
      <ShieldCheck className="w-5 h-5 text-[#22B573] mt-0.5 shrink-0" aria-hidden="true" />
      <p className="text-[14px] text-slate-600 leading-snug">
        <b className="text-slate-900">We never sell or pass along your information.</b> Your request is handled only by our in-house licensed agents.
      </p>
    </div>
  );
}