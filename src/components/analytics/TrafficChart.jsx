import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TrafficChart({ series }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="font-display font-extrabold text-lg text-slate-900">Visitors vs. leads</h2>
      <p className="text-[13px] text-slate-500 mt-1 mb-5">Daily unique sessions and submitted quote requests.</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EAB308" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#EAB308" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="visits" name="Visitors" stroke="#EAB308" strokeWidth={2} fill="url(#visitsFill)" />
            <Area type="monotone" dataKey="leads" name="Leads" stroke="#0F766E" strokeWidth={2} fill="#0F766E" fillOpacity={0.12} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}