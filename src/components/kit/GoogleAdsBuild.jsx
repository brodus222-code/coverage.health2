import KitCard from '@/components/kit/KitCard';

export default function GoogleAdsBuild() {
  return (
    <KitCard title="Google Ads Build" badge="Search">
      <h3>Account settings</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li><b>Geo-targeting:</b> "Presence" only (not "presence or interest") — the 13 licensed states: AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, TX. Never run nationwide.</li>
        <li><b>Conversion actions:</b> Lead Submit (primary, from thank-you page / AW-XXXXXXX tag), Call from ads &ge; 60s, Call from site (Ringba/GA import) as secondary.</li>
        <li><b>Ad schedule:</b> bid up +20% Mon–Fri 8am–8pm ET (agents live); keep on 24/7 for form fills.</li>
        <li><b>Assets:</b> Call asset with (888) 555-1234; sitelinks to Plans (/#quote), How It Works, Licensing &amp; Disclosures; callout assets: "Licensed in 13 States", "Free Quotes", "Talk to a Human", "No Obligation".</li>
      </ul>

      <h3>Campaign structure</h3>
      <table>
        <thead><tr><th>Campaign</th><th>Ad group</th><th>Sample keywords (phrase/exact)</th><th>Daily budget</th></tr></thead>
        <tbody>
          <tr><td rowSpan={4}><b>S1 — Core Health Insurance</b><br />Max Conversions → tCPA after 30 conv.</td><td>Quotes</td><td>"health insurance quotes", [health insurance quote online], "compare health insurance plans"</td><td rowSpan={4}>$150 (start)</td></tr>
          <tr><td>Self-Employed</td><td>"health insurance for self employed", "self employed health insurance cost", [1099 health insurance]</td></tr>
          <tr><td>Private PPO</td><td>"private health insurance", "ppo health insurance plans", [private ppo health insurance]</td></tr>
          <tr><td>ACA / Subsidy</td><td>"aca health plans", "obamacare enrollment", "health insurance subsidy calculator"</td></tr>
          <tr><td><b>S2 — State Intent</b><br />One ad group per state</td><td>FL / TX / GA / … (13)</td><td>"health insurance florida", "florida health insurance quotes", [health insurance plans texas]</td><td>$100</td></tr>
          <tr><td><b>S3 — Gap / Between Jobs</b></td><td>Short-term intent</td><td>"health insurance between jobs", "cobra alternatives", "temporary health insurance"</td><td>$50</td></tr>
          <tr><td><b>S4 — Brand</b></td><td>Brand</td><td>[coverage.health], [coverage health insurance]</td><td>$20</td></tr>
        </tbody>
      </table>

      <h3>Responsive Search Ad — asset bank</h3>
      <p><b>Headlines (mix &amp; match, ≤30 chars):</b></p>
      <ul className="list-disc pl-5 space-y-0.5 text-sm">
        <li>Health Insurance Quotes</li><li>Compare Plans In Your State</li><li>Talk To A Licensed Agent</li>
        <li>Plans From Under $200/Mo*</li><li>Free Quote In Minutes</li><li>Self-Employed? We Can Help</li>
        <li>PPO, ACA &amp; Budget Plans</li><li>Check Your Subsidy — Free</li><li>Keep Your Doctor (PPO)</li>
        <li>Licensed In 13 States</li><li>No Obligation. No Spam.</li><li>Enroll Same Day On Most Plans</li>
        <li>Dental &amp; Vision Add-Ons</li><li>{'{'}Location(State){'}'} Health Plans</li><li>Call (888) 555-1234</li>
      </ul>
      <p className="mt-3"><b>Descriptions (≤90 chars):</b></p>
      <ul className="list-disc pl-5 space-y-0.5 text-sm">
        <li>Compare private PPO, ACA marketplace &amp; supplemental plans side by side. Free, no obligation.</li>
        <li>A licensed agent pulls real prices for your ZIP — including subsidies — and explains in plain English.</li>
        <li>Answer 5 quick questions online or call. Same-day enrollment available on most plans.</li>
        <li>Our help costs you nothing — carriers pay us. Licensed agency, not a government site.</li>
      </ul>
      <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><b>Compliance:</b> Google requires health-insurance advertiser verification (broker/agent certification) in the US before ads serve. Apply with the agency NPN. Never use "Obamacare official", "government", or "free health insurance" in ad copy.</p>
    </KitCard>
  );
}