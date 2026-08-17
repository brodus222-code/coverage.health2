import { Link } from 'react-router-dom';

export default function CompactFooter({ maxWidth = 'max-w-[1080px]' }) {
  return (
    <footer className="px-4 pb-24 md:pb-8 pt-8 text-[11.5px] text-[#7A8CA0] leading-relaxed bg-white border-t border-[#DCE6F0]">
      <div className={`${maxWidth} mx-auto space-y-2`}>
        <p>Coverage.Health is owned and operated by HealthLink Insurance Agency LLC, a licensed insurance agency domiciled in Illinois and licensed in AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, and TX. This is a commercial website; we are <b className="text-[#4A6076]">not a government website and are not affiliated with or endorsed by the U.S. government or the Health Insurance Marketplace (Healthcare.gov)</b>. Not all products are available in all states. Fixed indemnity, limited medical, and MEC plans are not comprehensive major medical insurance. Advertised examples are not guarantees; actual premiums depend on age, location, household size, income, tobacco use, and plan selection.</p>
        <p>
          <Link to="/privacy" className="text-[#5E7A96] underline">Privacy Policy</Link> · <Link to="/terms" className="text-[#5E7A96] underline">Terms of Use</Link> · <Link to="/disclosures" className="text-[#5E7A96] underline">Licensing &amp; Disclosures</Link> · <Link to="/privacy#rights" className="text-[#5E7A96] underline">Do Not Sell/Share My Info</Link> · © 2026 HealthLink Insurance Agency LLC
        </p>
      </div>
    </footer>
  );
}