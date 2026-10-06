import ReactMarkdown from 'react-markdown';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function AdvisorMessage({ message }) {
  const isUser = message.role === 'user';
  const saving = false;
  const saved = message.saved;
  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <span className="w-8 h-8 shrink-0 rounded-full bg-[#1a2744] text-[#e8a020] grid place-items-center"><Sparkles className="w-4 h-4" /></span>
      )}
      <div className="max-w-[85%] space-y-2">
        {message.content && (
          <div className={isUser ? 'rounded-2xl rounded-br-md bg-[#1a2744] text-white px-4 py-2.5 text-[15px]' : 'rounded-2xl rounded-bl-md bg-white border border-slate-200 px-4 py-2.5 text-[15px] text-slate-800 shadow-sm'}>
            {isUser ? message.content : <ReactMarkdown className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1">{message.content}</ReactMarkdown>}
          </div>
        )}
        {saving && <p className="flex items-center gap-1.5 text-xs text-slate-500"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving your request…</p>}
        {saved && !saving && <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" /> Request sent to a licensed agent</p>}
      </div>
    </div>
  );
}