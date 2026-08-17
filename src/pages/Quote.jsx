import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import CompactFooter from '@/components/site/CompactFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import QuoteForm from '@/components/site/QuoteForm';
import QuoteTrust from '@/components/site/QuoteTrust';
import CallInsteadCard from '@/components/site/CallInsteadCard';

export default function Quote() {
  const [params] = useSearchParams();
  const zip = params.get('zip') || '';
  const state = params.get('state') || '';
  const hasZip = /^[0-9]{5}$/.test(zip) && state;
  const lockedState = params.get('lock') ? { abbr: params.get('lock'), name: params.get('lname') || '' } : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full bg-[#EAB308]/[0.06] blur-3xl" />
        <div className="max-w-xl mx-auto px-5 md:px-6 pt-10 md:pt-16 pb-20 md:pb-24">
          {hasZip && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <MapPin className="w-4 h-4 text-[#EAB308]" />
              <span>Building your quote for <b className="text-slate-900">{state}</b> · ZIP {zip}</span>
            </motion.div>
          )}
          {!hasZip && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-5 flex items-center gap-3 bg-white border border-slate-200 rounded-full py-2 pl-2 pr-4 w-fit max-w-full mx-auto text-[13.5px] text-slate-600">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A202C] to-[#2D3A52] text-white grid place-items-center font-display font-extrabold shrink-0 text-sm">CH</span>
              <span>Answer <b className="text-slate-900">a few quick questions</b> — a licensed agent for your state matches your plans. Free, no obligation.</span>
            </motion.div>
          )}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] p-6 md:p-8">
            <QuoteForm mode={hasZip ? 'quote' : 'hero'} initialData={hasZip ? { zip, state } : {}} lockedState={lockedState} />
          </div>
          <div className="mt-5"><QuoteTrust /></div>
          <div className="mt-5"><CallInsteadCard /></div>
        </div>
      </section>
      <CompactFooter />
      <MobileCallBar />
    </div>
  );
}