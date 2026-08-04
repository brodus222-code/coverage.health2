import { useSearchParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import QuoteForm from '@/components/site/QuoteForm';
import SocialProof from '@/components/site/SocialProof';

export default function Quote() {
  const [params] = useSearchParams();
  const zip = params.get('zip') || '';
  const state = params.get('state') || '';
  if (!/^[0-9]{5}$/.test(zip) || !state) return <Navigate to="/" replace />;

  const lockedState = params.get('lock') ? { abbr: params.get('lock'), name: params.get('lname') || '' } : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full bg-[#EAB308]/[0.06] blur-3xl" />
        <div className="max-w-xl mx-auto px-5 md:px-6 pt-10 md:pt-16 pb-20 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <MapPin className="w-4 h-4 text-[#EAB308]" />
            <span>Building your quote for <b className="text-slate-900">{state}</b> · ZIP {zip}</span>
          </motion.div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] p-6 md:p-8">
            <QuoteForm mode="quote" initialData={{ zip, state }} lockedState={lockedState} />
          </div>
          <div className="mt-5"><SocialProof /></div>
        </div>
      </section>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}