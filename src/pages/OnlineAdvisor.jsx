import { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, ShieldCheck } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import CompactFooter from '@/components/site/CompactFooter';
import AdvisorMessage from '@/components/advisor/AdvisorMessage';
import AdvisorInput from '@/components/advisor/AdvisorInput';

const GREETING = { role: 'assistant', content: "Hi! I'm the Coverage.Health Online Advisor. Ask me anything about health insurance, or I can gather a few details so an in-house licensed agent can prepare your **free plan comparison**. What can I help with?" };

export default function OnlineAdvisor() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    document.title = 'Online Advisor | Coverage.Health';
    base44.agents.createConversation({ agent_name: 'online_advisor', metadata: { name: 'Online Advisor chat' } }).then(setConversation);
  }, []);

  useEffect(() => {
    if (!conversation) return;
    return base44.agents.subscribeToConversation(conversation.id, (d) => setMessages(d.messages));
  }, [conversation?.id]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const last = messages[messages.length - 1];
  const thinking = last?.role === 'user';
  const send = (content) => base44.agents.addMessage(conversation, { role: 'user', content });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#e8f4fd] via-[#f0f7ff] to-white">
      <TopBar />
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 flex flex-col">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-[#1a2744]">Your Online Advisor</h1>
        <p className="mt-1 text-sm text-slate-600 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#3b82f6]" /> Free · Private · Backed by in-house licensed agents</p>
        <div className="glass-card mt-5 flex-1 rounded-2xl p-4 flex flex-col min-h-[60vh]">
          <div className="flex-1 space-y-4 overflow-y-auto pb-4">
            {[GREETING, ...messages].map((m, i) => <AdvisorMessage key={i} message={m} />)}
            {thinking && <p className="flex items-center gap-2 text-sm text-slate-500 pl-10"><Loader2 className="w-4 h-4 animate-spin" /> Typing…</p>}
            <div ref={endRef} />
          </div>
          {conversation
            ? <AdvisorInput onSend={send} disabled={thinking} showStarters={messages.length === 0} />
            : <p className="flex items-center justify-center gap-2 text-sm text-slate-500 py-3"><Loader2 className="w-4 h-4 animate-spin" /> Connecting…</p>}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">AI assistant for general information only; not a licensed agent. Not a government website. Rates shown are examples; your licensed agent confirms pricing.</p>
      </main>
      <CompactFooter />
    </div>
  );
}