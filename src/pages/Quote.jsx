import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import CompactFooter from '@/components/site/CompactFooter';
import QuoteForm from '@/components/site/QuoteForm';
import QuoteTrust from '@/components/site/QuoteTrust';
import CallInsteadCard from '@/components/site/CallInsteadCard';

export default function Quote() {
  const [params] = useSearchParams();
  const zip = params.get('zip') || '';
  const state = params.get('state') || '';
  const hasZip = /^[0-9]{5}$/.test(zip) && state;
  const lockedState = params.get('lock') ? { abbr: params.get('lock'), name: params.get('lname') || '' } : null;

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');
    document.title = 'Affordable Health Insurance Quotes | Coverage.Health';
    description?.setAttribute('content', 'Compare affordable health insurance plans available in your ZIP. Check plans and pricing free with no obligation.');
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute('content', previousDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar staticLogo hideCall />
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full bg-[#EAB308]/[0.06] blur-3xl" />
        <div className="max-w-xl mx-auto px-4 md:px-6 pt-6 md:pt-12 pb-16 md:pb-24">
          {!hasZip && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-5 text-center">
              <h1 className="font-display font-extrabold text-3xl md:text-4xl leading-tight tracking-tight text-slate-900 text-balance">
                Find Affordable Health Coverage in Your Area
              </h1>
              <p className="mt-2.5 text-base text-slate-600 leading-relaxed text-pretty">
                Compare plans and see whether you qualify for lower monthly premiums.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[13px] font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-[#22B573]" /> Free to compare</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-[#22B573]" /> No obligation</span>
              </div>
            </motion.div>
          )}
          {hasZip && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600">
              <MapPin className="w-4 h-4 text-[#EAB308]" />
              <span>Checking affordable options for <b className="text-slate-900">{state}</b> · ZIP {zip}</span>
            </motion.div>
          )}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] p-5 md:p-8">
            <QuoteForm mode={hasZip ? 'quote' : 'hero'} initialData={hasZip ? { zip, state } : {}} lockedState={lockedState} />
          </div>
          <div className="mt-5"><QuoteTrust /></div>
          <div className="mt-5"><CallInsteadCard zip={hasZip ? zip : ''} state={hasZip ? state : ''} /></div>
        </div>
      </section>
      <CompactFooter />
    </div>
  );
}