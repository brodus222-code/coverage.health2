import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Loader2, Table2 } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import RangeTabs, { RANGES } from '@/components/analytics/RangeTabs';
import SummaryCards from '@/components/analytics/SummaryCards';
import TaggingAlert from '@/components/analytics/TaggingAlert';
import FunnelSteps from '@/components/analytics/FunnelSteps';
import TrafficChart from '@/components/analytics/TrafficChart';
import BreakdownTable from '@/components/analytics/BreakdownTable';
import { sessionize, buildFunnel, groupBy, dailySeries, summarize } from '@/lib/funnel-report';

function pathOf(url) {
  try { return new URL(url).pathname || '/'; } catch { return url || '(unknown)'; }
}

export default function Analytics() {
  const [events, setEvents] = useState(null);
  const [leads, setLeads] = useState([]);
  const [range, setRange] = useState('7d');
  const [includeTest, setIncludeTest] = useState(false);

  useEffect(() => {
    base44.entities.TrafficEvent.list('-created_date', 5000).then(setEvents);
    base44.entities.Lead.list('-created_date', 1000).then(setLeads);
  }, []);

  const report = useMemo(() => {
    if (!events) return null;
    const days = RANGES.find((r) => r.key === range)?.days || 7;
    const since = new Date();
    since.setHours(0, 0, 0, 0);
    since.setDate(since.getDate() - (days - 1));

    const scoped = events.filter((e) => {
      if (!includeTest && e.is_test) return false;
      return new Date(e.created_date) >= since;
    });
    const sessions = sessionize(scoped);
    const paidSessions = sessions.filter((s) => s.is_paid);
    const leadsInRange = leads.filter((l) => new Date(l.created_date) >= since).length;

    return {
      days,
      sessions,
      leadsInRange,
      summary: summarize(sessions),
      funnel: buildFunnel(sessions),
      series: dailySeries(sessions, days),
      channels: groupBy(sessions, (s) => s.channel),
      campaigns: groupBy(paidSessions, (s) => s.utm_campaign || '(not tagged)'),
      keywords: groupBy(paidSessions, (s) => s.utm_term || '(not tagged)'),
      devices: groupBy(sessions, (s) => s.device),
      landingPages: groupBy(sessions, (s) => pathOf(s.landing_page)),
      states: groupBy(sessions.filter((s) => s.state), (s) => s.state),
      variants: groupBy(sessions, (s) => `Variant ${s.variant || 'A'}`),
    };
  }, [events, leads, range, includeTest]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <main className="max-w-7xl mx-auto px-5 md:px-10 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block bg-slate-900 text-white text-[11px] font-bold tracking-[0.08em] uppercase rounded-full px-3 py-1 mb-3">Internal · Team only</span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">Traffic &amp; Funnel Analytics</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">Every visit, ad click, funnel step and call click — including the clicks that never became a lead.</p>
          </div>
          <Link to="/leads-dashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-800 hover:border-slate-400 transition-colors">
            <Table2 className="w-4 h-4" /> Leads dashboard
          </Link>
        </div>

        {!report ? (
          <div className="flex items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            <RangeTabs value={range} onChange={setRange} includeTest={includeTest} onToggleTest={setIncludeTest} />

            {!report.sessions.length ? (
              <div className="bg-white border border-slate-200 rounded-2xl py-16 px-6 text-center">
                <p className="font-display font-bold text-lg text-slate-900">No visitor data in this range yet</p>
                <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
                  Funnel tracking starts collecting from now on. Once visitors hit the live site, every page view, quote step, and call click will appear here — pick a wider range or check back after your next ad clicks.
                </p>
              </div>
            ) : (
              <>
                <SummaryCards summary={report.summary} leadRecords={report.leadsInRange} />
                <TaggingAlert untaggedPaid={report.summary.untaggedPaid} paidSessions={report.summary.paidSessions} />

                <div className="grid lg:grid-cols-2 gap-5 mb-5">
                  <FunnelSteps funnel={report.funnel} />
                  <TrafficChart series={report.series} />
                </div>

                <div className="grid lg:grid-cols-2 gap-5 mb-5">
                  <BreakdownTable
                    title="Channels"
                    description="Where visitors came from, and which sources actually convert."
                    keyLabel="Channel"
                    rows={report.channels}
                    showCalls
                  />
                  <BreakdownTable
                    title="Paid campaigns"
                    description="Paid clicks grouped by campaign tag."
                    keyLabel="Campaign"
                    rows={report.campaigns}
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-5 mb-5">
                  <BreakdownTable
                    title="Paid keywords / search terms"
                    description="Requires utm_term on your ad tracking templates."
                    keyLabel="Keyword"
                    rows={report.keywords}
                  />
                  <BreakdownTable
                    title="Landing pages"
                    description="First page of each visit."
                    keyLabel="Page"
                    rows={report.landingPages}
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-5">
                  <BreakdownTable title="Devices" keyLabel="Device" rows={report.devices} showCalls />
                  <BreakdownTable title="A / B variants" keyLabel="Variant" rows={report.variants} />
                  <BreakdownTable title="States" keyLabel="State" rows={report.states} />
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}