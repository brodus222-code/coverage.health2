import { CheckSquare } from 'lucide-react';
import KitCard from '@/components/kit/KitCard';

const PHASES = [
  {
    name: 'Phase 1 — Foundation (Days 1–14)',
    badge: 'Start here',
    items: [
      'Verify HealthLink Insurance Agency LLC licenses active in all 13 states on NIPR; pull license numbers.',
      'Replace every [PLACEHOLDER] across the site: agency NPN, state license numbers, effective dates, registered address, arbitration county, partner list.',
      'Legal counsel review: Privacy Policy, Terms of Use, Disclosures, TCPA consent language. Remove all "internal note" boxes.',
      'Set up GA4 + Google Ads (AW-) conversion tags, Meta Pixel, TrustedForm, and Ringba DNI — replace the commented IDs in the site <head>.',
      'Stand up CRM (webhook from lead form), phone routing to licensed agents by state, and call recording with disclosure.',
      'Submit Google Ads health-insurance advertiser verification (requires NPN).',
      'End-to-end test: 5 test leads through the form → CRM → agent callback; verify TrustedForm cert captured on each.',
    ],
  },
  {
    name: 'Phase 2 — Launch & Learn (Days 15–45)',
    items: [
      'Launch Google Search: Brand (S4) + Core (S1) at $170/day combined; apply the shared negative keyword list.',
      'Launch state-intent campaign (S2) for the top 4 states by agent capacity (FL, TX, GA, OH).',
      'Set call-handling SLA: answer < 30s during 8am–8pm ET; speed-to-lead callback < 5 minutes on form leads.',
      'Weekly optimization ritual: search-terms report → add negatives, pause <0.8% CTR ads, check cost per lead vs $[TARGET CPL].',
      'Launch Meta M1 (broad + self-employed) once Google produces 25+ leads and contact-rate ≥ 60%.',
      'Instrument dashboards: CPL, contact rate, quote rate, enrollment rate, revenue per lead by source.',
    ],
  },
  {
    name: 'Phase 3 — Scale (Days 46–90)',
    items: [
      'Scale winning campaigns +20% budget per week while CPL holds; expand S2 to all 13 states.',
      'A/B test the stepper variant (index-b) against the current form; keep whichever lifts completion ≥ 10%.',
      'Launch Meta retargeting (M2) and a 15s agent-intro video creative.',
      'Add gap/between-jobs campaign (S3) and season the account for Open Enrollment (Nov 1) keyword surge.',
      'Quarterly compliance audit: consent records sampled, partner list current and dated, DNC revocations honored, ad copy re-reviewed.',
      'Review 90-day P&L per source; set Q2 budget and state-expansion (new license) shortlist.',
    ],
  },
];

export default function LaunchPlan() {
  return (
    <KitCard title="90-Day Launch Plan">
      {PHASES.map((p) => (
        <div key={p.name} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
          <div className="flex items-center gap-2.5 mb-3">
            <h3 className="!mb-0">{p.name}</h3>
            {p.badge && <span className="text-[11px] font-bold uppercase tracking-wider bg-[#3b82f6] text-white rounded-full px-2.5 py-0.5">{p.badge}</span>}
          </div>
          <ul className="space-y-2">
            {p.items.map((it) => (
              <li key={it} className="flex gap-2.5 items-start text-[14.5px]">
                <CheckSquare className="w-4 h-4 text-[#3b82f6] mt-0.5 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </KitCard>
  );
}