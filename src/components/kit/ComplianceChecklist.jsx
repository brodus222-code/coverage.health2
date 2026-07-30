import { ShieldAlert } from 'lucide-react';
import KitCard from '@/components/kit/KitCard';

const ITEMS = [
  ['TCPA consent', 'One-to-one consent box (unchecked by default) naming HealthLink Insurance Agency LLC and linking the dated partner list. Consent text stored verbatim with timestamp on every lead.'],
  ['Consent proof', 'TrustedForm (or Jornaya) certificate captured on 100% of leads; certs retained 5+ years.'],
  ['Partner list', 'Disclosures page lists every agency/carrier/buyer that may call a lead. Dated, archived on every change — consent covers only entities disclosed there.'],
  ['State license display', 'Agency NPN and state license numbers on the Disclosures page; CA & TX require license numbers in advertising.'],
  ['Non-government disclosure', '"Not a government website / not affiliated with Healthcare.gov or Medicare" appears in the footer of every page and in ad landing context.'],
  ['Product honesty', 'Fixed indemnity / limited medical / MEC always described as NOT major medical, with the federally required consumer notice at enrollment.'],
  ['Rate claims', 'Every price mention ("under $200/mo*") carries the asterisked disclaimer; no "free insurance" or guaranteed-rate claims anywhere.'],
  ['DNC & revocation', 'STOP replies, verbal DNC requests, and privacy@ emails logged to an internal suppression list and honored within FCC timeframes.'],
  ['Call recording', 'Two-party-consent states (incl. CA, FL, IL, NV) — recording disclosure at call start; scripts approved by compliance.'],
  ['Record retention', 'Leads, consent records, and call recordings retained per state insurance + telemarketing rules (generally 5+ years).'],
  ['Geo discipline', 'Ads geo-locked to the 13 licensed states; ZIP validation on the form rejects unlicensed states.'],
  ['Privacy rights', 'CA/TX/NJ (and other state) opt-out requests via privacy@ handled within statutory windows; "Do Not Sell/Share" link live in footer.'],
];

export default function ComplianceChecklist() {
  return (
    <KitCard title="Compliance Checklist" badge="Before every launch & quarterly">
      <div className="grid md:grid-cols-2 gap-3">
        {ITEMS.map(([title, body]) => (
          <div key={title} className="flex gap-3 border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <ShieldAlert className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 text-sm mb-0.5">{title}</p>
              <p className="text-[13.5px]">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </KitCard>
  );
}