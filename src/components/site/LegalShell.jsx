import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';

export default function LegalShell({ title, meta, notice, children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <main className="max-w-3xl mx-auto px-5 py-14 md:py-20">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:text-[#3b82f6] mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Coverage.Health
        </Link>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight mb-2">{title}</h1>
        {meta && <p className="text-[13px] text-slate-500 mb-6">{meta}</p>}
        {notice && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 text-[13.5px] text-amber-900 mb-8">
            <b>Internal note — remove before publishing:</b> {notice}
          </div>
        )}
        <div className="space-y-4 text-slate-600 text-[15.5px] leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-1 [&_a]:text-[#2563eb] [&_a]:underline [&_b]:text-slate-900">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}