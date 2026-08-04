import { Headphones } from 'lucide-react';

export default function MobileCallBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#1E293B] px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-8px_24px_rgba(15,23,42,0.2)]">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="relative w-9 h-9 rounded-lg bg-white/10 grid place-items-center shrink-0">
          <Headphones className="w-4 h-4 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22B573] border-2 border-[#1E293B]" />
        </span>
        <span className="leading-tight min-w-0">
          <span className="block text-[10px] text-slate-300">Licensed Advisor Available</span>
          <span className="dni-number block text-white font-bold text-sm">(888) 555-1234</span>
        </span>
      </div>
      <a href="tel:+18885551234" className="bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold text-sm rounded-full px-5 py-2.5 whitespace-nowrap transition-colors">
        Call Now
      </a>
    </div>
  );
}