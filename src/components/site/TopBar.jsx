import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function TopBar({ staticLogo = false, hideCall = false }) {
  const brand = (
    <>
      <span className="w-9 h-9 rounded-full bg-[#1a2744] text-white grid place-items-center font-display font-extrabold text-base shrink-0">C</span>
      <span className="leading-none">
        <span className="block font-display font-extrabold text-[17px] md:text-lg text-slate-900 tracking-tight">Coverage.Health</span>
        <span className="block text-[8.5px] md:text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 mt-0.5">Powered by HealthLink</span>
      </span>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
        {staticLogo ? (
          <div className="flex items-center gap-2.5">{brand}</div>
        ) : (
          <Link to="/" className="flex items-center gap-2.5">{brand}</Link>
        )}
        {!hideCall && (
          <a href="tel:+18553955001" data-call-source="Header" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 text-sm hover:border-slate-400 transition-colors">
            <Phone className="w-4 h-4 md:w-3.5 md:h-3.5" />
            <span className="md:hidden">Call Now</span>
            <span className="dni-number hidden md:inline">(855) 395-5001</span>
          </a>
        )}
      </div>
    </header>
  );
}