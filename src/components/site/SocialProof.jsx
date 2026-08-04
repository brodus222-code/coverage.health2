import { Star } from 'lucide-react';

export default function SocialProof() {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm px-5 py-3.5 max-w-md">
      <div className="flex gap-0.5 shrink-0 text-amber-400" aria-hidden="true">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
      </div>
      <div className="leading-tight">
        <p className="font-display font-extrabold text-slate-900 text-[15px]">4.8/5</p>
        <p className="text-[12px] text-slate-500">average rating from verified shoppers across our network</p>
      </div>
    </div>
  );
}