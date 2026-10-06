import { Users, MousePointerClick, FileCheck2, TrendingUp, PhoneCall, Target } from 'lucide-react';

export default function SummaryCards({ summary, leadRecords }) {
  const cards = [
    { icon: Users, label: 'Visitors (sessions)', value: summary.sessions },
    { icon: MousePointerClick, label: 'Paid ad clicks', value: summary.paidSessions },
    { icon: Target, label: 'Started a quote', value: summary.started },
    { icon: FileCheck2, label: 'Leads submitted', value: leadRecords },
    { icon: TrendingUp, label: 'Paid conversion rate', value: `${summary.paidConvRate.toFixed(1)}%` },
    { icon: PhoneCall, label: 'Call button clicks', value: summary.calls },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-[#e8f4fd] text-[#3b82f6] grid place-items-center mb-3">
            <Icon className="w-[18px] h-[18px]" />
          </div>
          <p className="font-display font-extrabold text-2xl text-slate-900 leading-none">{value}</p>
          <p className="text-[12.5px] text-slate-500 mt-1.5 leading-snug">{label}</p>
        </div>
      ))}
    </div>
  );
}