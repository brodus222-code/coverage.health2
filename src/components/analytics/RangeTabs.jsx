export const RANGES = [
  { key: 'today', label: 'Today', days: 1 },
  { key: '7d', label: 'Last 7 days', days: 7 },
  { key: '30d', label: 'Last 30 days', days: 30 },
  { key: 'all', label: 'All time', days: 365 },
];

export default function RangeTabs({ value, onChange, includeTest, onToggleTest }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 gap-1">
        {RANGES.map((r) => (
          <button
            key={r.key}
            onClick={() => onChange(r.key)}
            className={`px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
              value === r.key ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <label className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-600 cursor-pointer">
        <input type="checkbox" checked={includeTest} onChange={(e) => onToggleTest(e.target.checked)} className="w-4 h-4 accent-[#3b82f6]" />
        Include preview/test traffic
      </label>
    </div>
  );
}