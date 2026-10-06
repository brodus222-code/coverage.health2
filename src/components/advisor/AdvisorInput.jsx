import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const STARTERS = ['Get my plan comparison', 'Do I qualify for subsidies?', 'PPO vs HMO?', 'Can I enroll now?'];

export default function AdvisorInput({ onSend, disabled, showStarters }) {
  const [text, setText] = useState('');
  const send = (v) => { if (!v.trim() || disabled) return; onSend(v.trim()); setText(''); };
  return (
    <div className="space-y-2.5">
      {showStarters && (
        <div className="flex flex-wrap gap-2">
          {STARTERS.map((s) => (
            <button key={s} onClick={() => send(s)} className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-slate-700 hover:border-[#e8a020]">{s}</button>
          ))}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-center gap-2 rounded-2xl border-[1.5px] border-slate-300 bg-white p-1.5 pl-4 focus-within:border-[#e8a020]">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask anything about coverage…" className="flex-1 bg-transparent text-base outline-none" />
        <button type="submit" disabled={disabled || !text.trim()} className="w-10 h-10 rounded-xl bg-[#e8a020] text-[#1a2744] grid place-items-center disabled:opacity-40"><ArrowUp className="w-5 h-5" /></button>
      </form>
    </div>
  );
}