import { Download } from 'lucide-react';
import KitCard from '@/components/kit/KitCard';

export const NEGATIVES = [
  ['medicare', 'Phrase'], ['medicare advantage', 'Phrase'], ['medigap', 'Phrase'], ['medicare supplement', 'Phrase'],
  ['medicaid', 'Phrase'], ['chip', 'Exact'], ['tricare', 'Phrase'], ['va benefits', 'Phrase'], ['veterans', 'Phrase'],
  ['free', 'Phrase'], ['jobs', 'Phrase'], ['careers', 'Phrase'], ['salary', 'Phrase'], ['hiring', 'Phrase'],
  ['agent license', 'Phrase'], ['become an agent', 'Phrase'], ['insurance license', 'Phrase'], ['exam', 'Phrase'],
  ['life insurance', 'Phrase'], ['car insurance', 'Phrase'], ['auto insurance', 'Phrase'], ['home insurance', 'Phrase'],
  ['homeowners insurance', 'Phrase'], ['renters insurance', 'Phrase'], ['pet insurance', 'Phrase'], ['travel insurance', 'Phrase'],
  ['disability insurance', 'Phrase'], ['workers comp', 'Phrase'], ['group health', 'Phrase'], ['employer', 'Phrase'],
  ['claim', 'Phrase'], ['claims phone number', 'Phrase'], ['login', 'Phrase'], ['member portal', 'Phrase'],
  ['cancel', 'Phrase'], ['lawsuit', 'Phrase'], ['complaints', 'Phrase'], ['reviews reddit', 'Phrase'],
  ['definition', 'Phrase'], ['what is a deductible', 'Phrase'], ['school project', 'Phrase'],
  ['international', 'Phrase'], ['visitor insurance', 'Phrase'], ['immigrant', 'Phrase'],
];

function downloadCsv() {
  const csv = 'Keyword,Match type\n' + NEGATIVES.map(([k, m]) => `${k},${m}`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'coverage-health-negative-keywords.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function NegativeKeywords() {
  return (
    <KitCard title="Negative Keyword List" badge="Google Ads">
      <p>Apply as a shared negative list across all Search campaigns. Blocks Medicare/Medicaid (unlicensed lines), job seekers, other insurance verticals, existing-member service queries, and research-only intent.</p>
      <button
        onClick={downloadCsv}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg px-4 py-2.5 transition-colors"
      >
        <Download className="w-4 h-4" /> Download negative-keywords.csv
      </button>
      <div className="flex flex-wrap gap-1.5 pt-2">
        {NEGATIVES.map(([k, m]) => (
          <span key={k} className="text-xs bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1 text-slate-700">
            {k} <span className="text-slate-400">({m})</span>
          </span>
        ))}
      </div>
    </KitCard>
  );
}