import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Loader2, BarChart3 } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import LeadsStats from '@/components/leads/LeadsStats';
import LeadsTable from '@/components/leads/LeadsTable';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState(null);

  useEffect(() => {
    base44.entities.Lead.list('-created_date', 500).then(setLeads);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <main className="max-w-7xl mx-auto px-5 md:px-10 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block bg-slate-900 text-white text-[11px] font-bold tracking-[0.08em] uppercase rounded-full px-3 py-1 mb-3">Internal · Team only</span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">Leads Dashboard</h1>
            <p className="text-slate-600 mt-2">Incoming quote requests from both landing page variants. Click any row for full attribution, or any column header to sort.</p>
          </div>
          <Link to="/analytics" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-slate-800 transition-colors">
            <BarChart3 className="w-4 h-4" /> Traffic &amp; funnel analytics
          </Link>
        </div>

        {!leads ? (
          <div className="flex items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            <LeadsStats leads={leads} />
            <LeadsTable leads={leads} />
          </>
        )}
      </main>
    </div>
  );
}