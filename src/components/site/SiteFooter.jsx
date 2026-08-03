import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-[13px] leading-relaxed pt-14 pb-24 md:pb-14">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap justify-between gap-10 mb-10">
          <div>
            <Link to="/" className="font-display font-extrabold text-xl text-white">
              Coverage<span className="text-[#FF6B35]">.</span>Health
            </Link>
            <p className="mt-2">A service of HealthLink Insurance Agency LLC<br />Licensed insurance agency · Illinois · NPN 21554495</p>
          </div>
          <div className="space-y-1.5">
            <b className="text-white block mb-2">Company</b>
            <Link to="/about" className="block hover:text-white transition-colors">About Us</Link>
            <Link to="/faq" className="block hover:text-white transition-colors">FAQ</Link>
            <Link to="/contact" className="block hover:text-white transition-colors">Contact Us</Link>
          </div>
          <div className="space-y-1.5">
            <b className="text-white block mb-2">Legal</b>
            <Link to="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="block hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/disclosures" className="block hover:text-white transition-colors">Licensing &amp; Disclosures</Link>
            <Link to="/privacy#rights" className="block hover:text-white transition-colors">Do Not Sell/Share My Info</Link>
          </div>
          <div className="space-y-1.5">
            <b className="text-white block mb-2">Contact</b>
            <a href="tel:+18885551234" className="dni-number block hover:text-white transition-colors">(888) 555-1234</a>
            <a href="mailto:help@coverage.health" className="block hover:text-white transition-colors">help@coverage.health</a>
          </div>
        </div>
        <div className="border-t border-slate-700/60 pt-6 space-y-3 text-slate-500">
          <p>Coverage.Health is owned and operated by HealthLink Insurance Agency LLC, a licensed insurance agency domiciled in Illinois and licensed in AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, and TX. Coverage.Health is a commercial website; we are <b className="text-slate-400">not a government website and are not affiliated with or endorsed by the U.S. government, the federal Medicare program, or the Health Insurance Marketplace (Healthcare.gov)</b>. Not all products are available in all states. Enrollment in ACA marketplace plans may be limited to Open Enrollment or a qualifying Special Enrollment Period.</p>
          <p>*Advertised rates are examples only; your actual premium depends on age, location, household size, income, tobacco use, and plan selection. Fixed indemnity, limited medical, and MEC plans are <b className="text-slate-400">not comprehensive major medical insurance</b> and do not satisfy all requirements of the Affordable Care Act. Read plan documents carefully before enrolling.</p>
          <p>By using this site you agree to our <Link to="/terms" className="underline hover:text-white">Terms of Use</Link> and <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>. © 2026 HealthLink Insurance Agency LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}