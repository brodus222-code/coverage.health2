import { Wallet, UserCheck, ShieldCheck, Clock } from 'lucide-react';

const ITEMS = [
  { icon: Wallet, title: 'Subsidies checked first', body: 'We check your income against 2026 ACA subsidy tables before quoting — many households qualify for a premium far lower than the sticker price.' },
  { icon: UserCheck, title: 'A licensed human, not a bot', body: 'Your answers go to a licensed agent in your state who reviews plans against your doctors, prescriptions, and budget.' },
  { icon: ShieldCheck, title: 'Every option on the table', body: 'ACA marketplace, short-term, fixed indemnity, and supplemental — compared side by side so nothing is hidden from you.' },
  { icon: Clock, title: 'Answers in one call', body: 'Most people finish in a single conversation. No portals to fight, no forms mailed back and forth.' },
];

export default function BenefitsB() {
  return (
    <section className="bg-white border-y border-[#DCE6F0] py-14 md:py-20">
      <div className="max-w-[1080px] mx-auto px-4">
        <h2 className="font-heading font-extrabold text-[#132A47] text-[27px] md:text-[34px] leading-tight tracking-tight text-center mb-3">
          Why people stop shopping and just call us
        </h2>
        <p className="text-[#4A6076] text-center max-w-[58ch] mx-auto mb-10">
          Health insurance pricing is confusing on purpose. We do the comparing out loud, with you, in plain English.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[16px] border border-[#DCE6F0] bg-[#F8FBFF] p-6">
              <span className="w-11 h-11 rounded-[12px] bg-[#2E90FA]/10 text-[#2E90FA] grid place-items-center mb-4">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-heading font-bold text-[#132A47] text-[18px] mb-1.5">{title}</h3>
              <p className="text-[#4A6076] text-[15px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}