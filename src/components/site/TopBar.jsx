import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
        <Link to="/" className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-slate-900">
          Coverage<span className="text-[#FF6B35]">.</span>Health
        </Link>
        <a href="tel:+18885551234" className="flex items-center gap-3 group">
          <span className="hidden md:block text-right text-xs text-slate-500 leading-tight">
            Talk to a licensed agent<br />Mon–Fri 8am–8pm ET
          </span>
          <span className="dni-number hidden sm:block font-display font-extrabold text-lg text-slate-900">(888) 555-1234</span>
          <span className="w-10 h-10 rounded-full bg-[#FF6B35] text-white grid place-items-center transition-transform group-hover:scale-110">
            <Phone className="w-4 h-4" />
          </span>
        </a>
      </div>
    </header>
  );
}