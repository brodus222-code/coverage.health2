import { TrendingDown } from 'lucide-react';

export default function FunnelSteps({ funnel }) {
  const top = funnel[0]?.count || 0;
  const worst = funnel.reduce((acc, s, i) => (i > 0 && s.dropOff > (acc?.dropOff ?? -1) ? s : acc), null);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="font-display font-extrabold text-lg text-slate-900">Funnel drop-off</h2>
      <p className="text-[13px] text-slate-500 mt-1 mb-5">Where visitors abandon the quote flow. Counts are unique sessions.</p>

      <div className="space-y-2.5">
        {funnel.map((stage, i) => (
          <div key={stage.key}>
            <div className="flex items-baseline justify-between mb-1 text-[13px]">
              <span className="font-semibold text-slate-800">{stage.label}</span>
              <span className="text-slate-500">
                <b className="text-slate-900">{stage.count}</b>
                <span className="ml-2">{stage.pctOfTotal.toFixed(0)}%</span>
                {i > 0 && stage.dropOff > 0 && (
                  <span className="ml-2 text-red-500">−{stage.dropOff.toFixed(0)}%</span>
                )}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6]"
                style={{ width: `${top ? (stage.count / top) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {worst && worst.dropOff > 0 && (
        <div className="mt-5 flex gap-2.5 rounded-xl bg-slate-50 border border-slate-200 p-3.5">
          <TrendingDown className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-[13px] text-slate-700 leading-snug">
            Biggest leak: <b>{worst.dropOff.toFixed(0)}%</b> of visitors drop at <b>{worst.label}</b>. That's the highest-value screen to test next.
          </p>
        </div>
      )}
    </div>
  );
}