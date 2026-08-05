import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';

export default function HealthInsuranceGuide() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <article className="max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight mb-6">
          How to Compare Health Insurance Plans
        </h1>
        <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
          <p>
            Comparing health insurance plans doesn't have to be complicated. Whether you're self-employed, between jobs, early retired, or simply tired of overpaying for coverage you barely use, the right plan is out there — you just need to know how to find it.
          </p>
          <p>
            Start with the plan type. Private PPO plans give you the freedom to see specialists without a referral and typically include nationwide networks, so your doctor stays in-network even when you travel. ACA Marketplace plans cover the ten essential health benefits required by the Affordable Care Act and may qualify your household for premium tax credits that lower what you pay each month. Supplemental plans — dental, vision, and fixed indemnity — fill the gaps that major medical leaves behind.
          </p>
          <p>
            Next, understand metal tiers. Bronze plans carry the lowest monthly premium but higher out-of-pocket costs when you visit the doctor, making them a fit for generally healthy households. Silver plans often strike a balance and may include cost-sharing reductions that lower deductibles and copays if your income qualifies. Gold and Platinum plans raise the monthly premium but reduce what you pay at the point of care — ideal if you expect regular medical expenses.
          </p>
          <p>
            Then evaluate the network and drug formulary. Confirm your preferred doctors, hospitals, and prescriptions are covered before you enroll — a lower premium isn't a deal if your doctor is out of network. Also check whether the plan requires referrals for specialists and whether your medications are on the preferred drug list.
          </p>
          <p>
            Finally, factor in household income and size. Many shoppers are surprised to learn they qualify for subsidies that can reduce monthly costs by hundreds of dollars. A licensed agent can run your numbers, confirm eligibility, and show you real prices for your ZIP code in minutes — not days. Ready to see your options? Start with your ZIP code above or call a licensed advisor directly.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold rounded-xl px-6 py-3.5 transition-colors"
          >
            See My Options <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+18553955001"
            className="inline-flex items-center gap-2 border border-slate-300 bg-white hover:border-slate-400 text-slate-900 font-bold rounded-xl px-6 py-3.5 transition-colors"
          >
            <Phone className="w-4 h-4" /> <span className="dni-number">(855) 395-5001</span>
          </a>
        </div>
      </article>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}