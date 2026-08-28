import { Link } from 'react-router-dom';

export default function AboutFooter() {
  return (
    <footer className="bg-foreground px-5 pb-24 pt-14 text-[10px] leading-relaxed text-slate-400 md:px-10 md:pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-white/10 pb-6 min-[520px]:grid-cols-4">
          <div><Link to="/" className="font-display text-base font-extrabold text-white">Coverage<span className="text-primary">.</span>Health</Link><p className="mt-2">A service of HealthLink Insurance Agency LLC<br />2501 Chatham Rd, Suite R · Springfield, IL 62704<br />Licensed insurance agency · Illinois · NPN 21554495</p></div>
          <div><b className="mb-2 block text-white">Company</b><Link to="/about" className="block">About Us</Link><Link to="/faq" className="block">FAQ</Link><Link to="/contact" className="block">Contact Us</Link><Link to="/health-insurance-guide" className="block">Insurance Guide</Link><Link to="/blog" className="block">Blog</Link></div>
          <div><b className="mb-2 block text-white">Legal</b><Link to="/privacy" className="block">Privacy Policy</Link><Link to="/terms" className="block">Terms of Use</Link><Link to="/disclosures" className="block">Licensing &amp; Disclosures</Link><Link to="/privacy#rights" className="block">Do Not Sell/Share My Info</Link></div>
          <div><b className="mb-2 block text-white">Contact</b><a href="tel:+18553955001" className="dni-number block">(855) 395-5001</a><a href="mailto:help@coverage.health" className="block">help@coverage.health</a></div>
        </div>
        <div className="space-y-2 pt-5 text-[9px] text-slate-500"><p>Coverage.Health is owned and operated by HealthLink Insurance Agency LLC, a licensed insurance agency domiciled in Illinois and licensed in AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, and TX. We are <b>not a government website</b> and are not affiliated with or endorsed by the U.S. government, Medicare, or Healthcare.gov. Not all products are available in all states.</p><p>*Advertised rates are examples only. Fixed indemnity, limited medical, and MEC plans are <b>not comprehensive major medical insurance</b>. Read plan documents carefully before enrolling.</p><p>By using this site you agree to our <Link to="/terms" className="underline">Terms of Use</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>. © 2026 HealthLink Insurance Agency LLC. All rights reserved.</p></div>
      </div>
    </footer>
  );
}