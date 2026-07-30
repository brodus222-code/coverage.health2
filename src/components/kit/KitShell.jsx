import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, FolderKanban } from 'lucide-react';

export default function KitShell({ title, subtitle, children }) {
  const { pathname } = useLocation();
  const tab = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${pathname === to ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
    >
      {label}
    </Link>
  );
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FolderKanban className="w-5 h-5 text-[#FF6B35]" />
            <span className="font-display font-bold text-slate-900">Coverage.Health — Launch Kit</span>
            <span className="hidden md:inline text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 rounded-full px-2.5 py-0.5">Internal</span>
          </div>
          <nav className="flex items-center gap-1.5">
            {tab('/campaigns', 'Campaigns')}
            {tab('/ops', 'Ops')}
            <Link to="/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-[#E85A26] hover:bg-[#FFF2EC] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Site
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-12">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight mb-2">{title}</h1>
        <p className="text-slate-600 mb-10 max-w-[70ch]">{subtitle}</p>
        {children}
      </main>
    </div>
  );
}