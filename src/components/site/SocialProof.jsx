import { ShieldCheck } from 'lucide-react';

export default function SocialProof() {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm px-5 py-3.5 max-w-md">
      <ShieldCheck className="w-8 h-8 text-[#22B573] shrink-0" aria-hidden="true" />
      <div className="leading-tight">
        <p className="font-display font-extrabold text-slate-900 text-[15px]">In-house licensed guidance</p>
        <p className="text-[12px] text-slate-500">Your information stays with the Coverage.Health team.</p>
      </div>
    </div>
  );
}