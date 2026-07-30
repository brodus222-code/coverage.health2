import LegalShell from '@/components/site/LegalShell';

const LICENSES = [
  ['Arizona', 'Nevada'], ['California', 'New Jersey'], ['Florida', 'North Carolina'],
  ['Georgia', 'Ohio'], ['Illinois (domicile)', 'South Carolina'], ['Nebraska', 'Tennessee'], ['Texas', ''],
];

export default function Disclosures() {
  return (
    <LegalShell
      title="Licensing & Disclosures"
      notice="Fill in the agency NPN and each state license number from NIPR before launch. Several states (e.g., CA, TX) require the license number to appear in advertising."
    >
      <h2>Who we are</h2>
      <p>Coverage.Health is owned and operated by <b>HealthLink Insurance Agency LLC</b>, a licensed insurance producer (agency) organized under the laws of Illinois. National Producer Number (NPN): <b>[AGENCY NPN]</b>. We are compensated by insurance carriers when you enroll in a plan through us; our help costs you nothing extra.</p>
      <p>We are <b>not a government agency</b> and are not affiliated with or endorsed by the U.S. government, Medicare, Medicaid, or the federal Health Insurance Marketplace (Healthcare.gov). If you want to enroll through the federal marketplace directly, you may do so at Healthcare.gov or by calling 1-800-318-2596.</p>

      <h2>State licenses</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse my-3">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-slate-100 text-slate-900 px-3 py-2 text-left">State</th>
              <th className="border border-slate-200 bg-slate-100 text-slate-900 px-3 py-2 text-left">License #</th>
              <th className="border border-slate-200 bg-slate-100 text-slate-900 px-3 py-2 text-left">State</th>
              <th className="border border-slate-200 bg-slate-100 text-slate-900 px-3 py-2 text-left">License #</th>
            </tr>
          </thead>
          <tbody>
            {LICENSES.map(([a, b]) => (
              <tr key={a}>
                <td className="border border-slate-200 px-3 py-2">{a}</td>
                <td className="border border-slate-200 px-3 py-2">[LIC #]</td>
                <td className="border border-slate-200 px-3 py-2">{b}</td>
                <td className="border border-slate-200 px-3 py-2">{b ? '[LIC #]' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Product disclosures</h2>
      <p><b>ACA / Marketplace plans</b> are comprehensive major medical coverage; enrollment may be limited to Open Enrollment or a Special Enrollment Period, and subsidy eligibility is determined by the marketplace based on the income information you attest to.</p>
      <p><b>Private (off-marketplace) PPO plans</b> may be medically underwritten: your health history can affect eligibility and price, and pre-existing conditions may be excluded.</p>
      <p><b>Fixed indemnity, limited medical, and MEC plans are not major medical insurance.</b> They pay limited, fixed benefits or cover a limited set of services, do not cap your out-of-pocket costs, and lack of comprehensive coverage may leave you responsible for significant medical bills. Federal rules require a consumer notice with these plans — read it and the plan brochure before enrolling.</p>
      <p><b>Dental, vision, and other ancillary products</b> are standalone supplemental benefits, not health insurance.</p>

      <h2 id="partners">Marketing &amp; agent partners</h2>
      <p>When you submit a quote request with consent, your information may be shared with, and you may be contacted by, HealthLink Insurance Agency LLC and one or more of the following licensed partners:</p>
      <p>[MAINTAIN A CURRENT, DATED LIST OF EVERY AGENCY/CARRIER/BUYER THAT MAY CALL A LEAD. This list is legally significant: the TCPA consent on our form covers only entities disclosed here. Update it every time a lead buyer is added or removed, and archive dated versions.]</p>

      <h2>Questions or complaints</h2>
      <p>Contact us at <a href="mailto:compliance@coverage.health">compliance@coverage.health</a> or (888) 555-1234. You may also contact your state's Department of Insurance.</p>
    </LegalShell>
  );
}