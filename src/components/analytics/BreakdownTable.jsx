export default function BreakdownTable({ title, description, keyLabel, rows, showCalls = false, limit = 12 }) {
  const visible = rows.slice(0, limit);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="font-display font-extrabold text-lg text-slate-900">{title}</h2>
      {description && <p className="text-[13px] text-slate-500 mt-1">{description}</p>}

      {!visible.length ? (
        <p className="text-[13px] text-slate-400 py-8 text-center">No traffic recorded in this range yet.</p>
      ) : (
        <div className="overflow-x-auto -mx-2 mt-4">
          <table className="w-full text-[13px] min-w-[440px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="text-left font-semibold px-2 py-2">{keyLabel}</th>
                <th className="text-right font-semibold px-2 py-2">Visitors</th>
                <th className="text-right font-semibold px-2 py-2">Started</th>
                <th className="text-right font-semibold px-2 py-2">Leads</th>
                {showCalls && <th className="text-right font-semibold px-2 py-2">Calls</th>}
                <th className="text-right font-semibold px-2 py-2">Conv.</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.key} className="border-b border-slate-100 last:border-0">
                  <td className="px-2 py-2.5 font-semibold text-slate-900 max-w-[240px] truncate" title={r.key}>{r.key}</td>
                  <td className="px-2 py-2.5 text-right text-slate-600">{r.sessions}</td>
                  <td className="px-2 py-2.5 text-right text-slate-600">{r.started}</td>
                  <td className="px-2 py-2.5 text-right font-semibold text-slate-900">{r.leads}</td>
                  {showCalls && <td className="px-2 py-2.5 text-right text-slate-600">{r.calls}</td>}
                  <td className={`px-2 py-2.5 text-right font-semibold ${r.convRate >= 10 ? 'text-emerald-600' : r.convRate > 0 ? 'text-slate-700' : 'text-slate-400'}`}>
                    {r.convRate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}