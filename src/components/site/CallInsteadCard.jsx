import { Phone } from 'lucide-react';

export default function CallInsteadCard() {
  return (
    <div className="rounded-2xl border border-[#EAB308]/30 bg-[#FFFBEB] px-5 py-6 text-center">
      <h4 className="font-display font-bold text-lg text-slate-900">Don't want to fill this out?</h4>
      <p className="text-[14.5px] text-slate-700 mt-1">We can <b className="text-slate-900">call you</b> instead.</p>
      <p className="text-[13px] text-slate-500 mt-2 leading-snug">
        A licensed agent can review your info and walk you through your options in minutes.
      </p>
      <a
        href="tel:+18553955001"
        data-call-source="Quote call-instead card"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#1A202C] to-[#2D3A52] text-white font-bold text-[15px] px-6 py-3.5 hover:opacity-95 transition-opacity"
      >
        <Phone className="w-4 h-4" /> Have an Agent Call Me
      </a>
    </div>
  );
}