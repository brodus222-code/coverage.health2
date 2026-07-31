import { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown, Inbox } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const COLUMNS = [
  { key: 'created_date', label: 'Received' },
  { key: 'full_name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'state', label: 'State' },
  { key: 'zip', label: 'ZIP' },
  { key: 'household', label: 'Household' },
  { key: 'age_range', label: 'Age' },
  { key: 'income', label: 'Income' },
  { key: 'variant', label: 'Variant' },
  { key: 'utm_source', label: 'Source' },
];

function sourceOf(lead) {
  if (lead.utm_source) return lead.utm_source;
  if (lead.gclid) return 'google';
  if (lead.fbclid) return 'meta';
  return 'direct';
}

export default function LeadsTable({ leads }) {
  const [sortKey, setSortKey] = useState('created_date');
  const [dir, setDir] = useState(-1);

  const toggle = (key) => {
    if (key === sortKey) setDir(-dir);
    else { setSortKey(key); setDir(key === 'created_date' ? -1 : 1); }
  };

  const sorted = [...leads].sort((a, b) => {
    const av = sortKey === 'utm_source' ? sourceOf(a) : (a[sortKey] ?? '');
    const bv = sortKey === 'utm_source' ? sourceOf(b) : (b[sortKey] ?? '');
    if (av === bv) return 0;
    return (av > bv ? 1 : -1) * dir;
  });

  if (!leads.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl py-20 text-center text-slate-500">
        <Inbox className="w-10 h-10 mx-auto mb-3 text-slate-300" />
        <p className="font-semibold text-slate-700">No leads yet</p>
        <p className="text-sm">Quote requests from the landing pages will appear here in real time.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
      <table className="w-full text-sm min-w-[980px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {COLUMNS.map(({ key, label }) => (
              <th key={key} className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                <button onClick={() => toggle(key)} className="inline-flex items-center gap-1 hover:text-slate-900">
                  {label}
                  {sortKey === key
                    ? (dir === 1 ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />)
                    : <ArrowUpDown className="w-3.5 h-3.5 text-slate-300" />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((lead) => (
            <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
              <td className="px-4 py-3 whitespace-nowrap text-slate-600">{format(new Date(lead.created_date), 'MMM d, h:mm a')}</td>
              <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{lead.full_name || '—'}</td>
              <td className="px-4 py-3 whitespace-nowrap"><a href={`tel:${lead.phone}`} className="text-[#E85A26] font-medium hover:underline">{lead.phone}</a></td>
              <td className="px-4 py-3 text-slate-600">{lead.email || '—'}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">{lead.state || '—'}</td>
              <td className="px-4 py-3 text-slate-600">{lead.zip}</td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.household || '—'}</td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.age_range || lead.age || '—'}</td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.income || '—'}</td>
              <td className="px-4 py-3">
                <Badge variant="outline" className={lead.variant === 'B' ? 'border-sky-300 text-sky-700 bg-sky-50' : 'border-orange-300 text-orange-700 bg-orange-50'}>
                  {lead.variant || 'A'}
                </Badge>
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{sourceOf(lead)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}