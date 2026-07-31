import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';
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
        <div className="mb-8">
          <span className="inline-block bg-slate-900 text-white text-[11px] font-bold tracking-[0.08em] uppercase rounded-full px-3 py-1 mb-3">Internal · Team only</span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">Leads Dashboard</h1>
          <p className="text-slate-600 mt-2">Incoming quote requests from both landing page variants. Click any column header to sort.</p>
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