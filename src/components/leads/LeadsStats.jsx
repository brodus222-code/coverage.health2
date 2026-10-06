import { Users, CalendarDays, SplitSquareHorizontal, MapPin } from 'lucide-react';

export default function LeadsStats({ leads }) {
  const today = new Date().toDateString();
  const todayCount = leads.filter((l) => new Date(l.created_date).toDateString() === today).length;
  const aCount = leads.filter((l) => l.variant !== 'B').length;
  const bCount = leads.filter((l) => l.variant === 'B').length;
  const states = new Set(leads.map((l) => l.state).filter(Boolean)).size;

  const stats = [
    { icon: Users, label: 'Total leads', value: leads.length },
    { icon: CalendarDays, label: 'Today', value: todayCount },
    { icon: SplitSquareHorizontal, label: 'Variant A / B', value: `${aCount} / ${bCount}` },
    { icon: MapPin, label: 'States represented', value: states },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#e8f4fd] text-[#3b82f6] grid place-items-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-display font-extrabold text-2xl text-slate-900 leading-none">{value}</p>
            <p className="text-[13px] text-slate-500 mt-1">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}