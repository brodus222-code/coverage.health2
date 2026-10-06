import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Phone, PhoneCall, FileSearch, ClipboardList } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';

const TIMELINE = [
  { icon: FileSearch, title: 'Request received', body: 'Your information has been securely saved for our in-house licensed team.' },
  { icon: PhoneCall, title: 'During business hours', body: "An available licensed agent will call from a local or toll-free number to discuss your options." },
  { icon: ClipboardList, title: 'On the call', body: "Have your doctors' names and any current medications handy — it makes the comparison faster." },
];

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('lead_submitted')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <TopBar />
      <main className="flex-1 max-w-3xl mx-auto px-5 py-16 md:py-24 w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-[#3b82f6] text-white grid place-items-center mx-auto mb-6 shadow-lg shadow-[#3b82f6]/30">
            <Check className="w-8 h-8" strokeWidth={3} />
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight mb-4">Your quote request is in.</h1>
          <p className="text-lg text-slate-600 max-w-[50ch] mx-auto">
            Your request is with our in-house licensed team. An available agent will call during business hours to review your coverage options.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-7 md:p-9 mb-10">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-6">What happens next</h2>
          <div className="space-y-6">
            {TIMELINE.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8f4fd] text-[#3b82f6] grid place-items-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-[15px]">{title}</p>
                  <p className="text-[15px] text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-slate-900 mb-3">Want your quotes right now? Skip the wait:</p>
          <a
            href="tel:+18553955001"
            className="inline-flex items-center gap-2.5 bg-[#e8a020] hover:bg-[#d4911a] text-[#1a2744] font-bold text-lg rounded-xl px-8 py-4 transition-all hover:shadow-lg hover:shadow-[#e8a020]/40"
          >
            <Phone className="w-5 h-5" /> <span className="dni-number">Call (855) 395-5001</span>
          </a>
          <p className="text-xs text-slate-500 mt-4">Agents available Mon–Fri 8am–8pm ET.</p>
        </div>

        <div className="mt-12 bg-slate-900 rounded-2xl p-6 md:p-7 text-center">
          <p className="text-white font-display font-bold mb-1">You're in licensed hands</p>
          <p className="text-slate-300 text-sm">
            Coverage.Health is operated by <b className="text-white">HealthLink Insurance Agency LLC</b>, a licensed insurance agency domiciled in Illinois and licensed in AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN &amp; TX. NPN: 21554495.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}