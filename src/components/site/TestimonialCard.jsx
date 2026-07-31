import { Star } from 'lucide-react';

export default function TestimonialCard({ name, state, tag, stars, quote }) {
  return (
    <div className="glass-card rounded-2xl p-7 flex flex-col">
      <span className="flex gap-0.5 text-amber-400 mb-4" aria-label={`${stars} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < stars ? 'fill-current' : 'text-slate-200 fill-slate-200'}`} />
        ))}
      </span>
      <p className="text-[15px] text-slate-700 leading-relaxed flex-1 mb-5">“{quote}”</p>
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-[#FF6B35]/10 text-[#E85A26] grid place-items-center font-display font-extrabold text-sm shrink-0">
          {name.charAt(0)}
        </span>
        <div>
          <p className="font-bold text-slate-900 text-sm">{name}</p>
          <p className="text-xs text-slate-500">{state} · {tag}</p>
        </div>
      </div>
    </div>
  );
}