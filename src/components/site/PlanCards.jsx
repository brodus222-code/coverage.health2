import { ShieldCheck, HeartPulse, Layers } from 'lucide-react';

const PLANS = [
  {
    icon: ShieldCheck,
    title: 'Private PPO (Under 65)',
    body: 'Year-round enrollment, nationwide PPO networks, and pricing based on your health profile. Popular with self-employed and healthy households.',
    pills: ['Year-round enrollment', 'Nationwide PPO', 'Keep your doctor'],
    fit: "Best if: you want flexibility and don't qualify for large subsidies.",
  },
  {
    icon: HeartPulse,
    title: 'ACA Marketplace Plans',
    body: 'Comprehensive, guaranteed-issue coverage with pre-existing conditions included. Income-based subsidies can dramatically cut your premium.',
    pills: ['Guaranteed issue', 'Subsidy eligible', 'Pre-existing covered'],
    fit: 'Best if: your income qualifies for subsidies or you have ongoing conditions.',
  },
  {
    icon: Layers,
    title: 'Supplemental & Budget Plans',
    body: 'Fixed indemnity, limited medical, and MEC plans that pay set benefits or cover the basics at a lower monthly cost — plus dental, vision, and accident add-ons.',
    pills: ['Lower monthly cost', 'Dental & vision', 'Stackable benefits'],
    fit: 'Best if: you need a safety net between jobs or want to stack benefits.',
  },
];

export default function PlanCards() {
  return (
    <div className="grid md:grid-cols-3 gap-5 lg:gap-8">
      {PLANS.map(({ icon: Icon, title, body, pills, fit }) => (
        <div key={title} className="bg-white border border-slate-200 rounded-2xl p-7 lg:p-8 transition-all hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-[#FFF8E6] text-[#EAB308] grid place-items-center mb-5">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 mb-2.5">{title}</h3>
          <p className="text-[15px] text-slate-600 mb-4">{body}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pills.map((p) => (
              <span key={p} className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">{p}</span>
            ))}
          </div>
          <p className="text-[13px] font-semibold text-[#CA8A04]">{fit}</p>
        </div>
      ))}
    </div>
  );
}