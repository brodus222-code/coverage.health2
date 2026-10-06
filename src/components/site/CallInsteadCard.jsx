import { useState } from 'react';
import { Phone } from 'lucide-react';
import CallbackForm from '@/components/site/CallbackForm';

export default function CallInsteadCard({ zip = '', state = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[#3b82f6]/25 bg-[#f0f7ff] px-5 py-6 text-center">
      <h4 className="font-display font-bold text-lg text-slate-900">Don't want to fill this out?</h4>
      <p className="text-[14.5px] text-slate-700 mt-1">We can <b className="text-slate-900">call you</b> instead.</p>
      <p className="text-[13px] text-slate-500 mt-2 leading-snug">
        A licensed agent can review your info and walk you through your options in minutes.
      </p>
      {open ? (
        <div className="mt-4"><CallbackForm zip={zip} state={state} /></div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#1a2744] to-[#2a3d63] text-white font-bold text-[15px] px-6 py-3.5 hover:opacity-95 transition-opacity"
        >
          <Phone className="w-4 h-4" /> Have an Agent Call Me
        </button>
      )}
    </div>
  );
}