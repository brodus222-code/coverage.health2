import LegalShell from '@/components/site/LegalShell';

const LICENSES = [
  { state: 'Arizona', number: '3003628886' },
  { state: 'California', number: '6019438' },
  { state: 'Florida', number: 'L131967' },
  { state: 'Georgia', number: '241191' },
  { state: 'Illinois (domicile)', number: '3003596873' },
  { state: 'Nebraska', number: '3003628988' },
  { state: 'Nevada', number: '4108410' },
  { state: 'New Jersey', number: '3003628832' },
  { state: 'North Carolina', number: '3003628870' },
  { state: 'Ohio', number: '1656911' },
  { state: 'South Carolina', number: '3003628950' },
  { state: 'Tennessee', number: '3003628850' },
  { state: 'Texas', number: '3350687' },
];

export default function Disclosures() {
  return (
    <LegalShell
      title="Licensing & Disclosures"
    >
      <h2>Who we are</h2>
      <p>Coverage.Health is owned and operated by <b>HealthLink Insurance Agency LLC</b>, a licensed insurance producer (agency) organized under the laws of Illinois. National Producer Number (NPN): <b>21554495</b>. Our Agent of Record is <b>Nick Loucks</b> (NPN 21137267). We are compensated by insurance carriers when you enroll in a plan through us; our help costs you nothing extra.</p>
      <p>We are <b>not a government agency</b> and are not affiliated with or endorsed by the U.S. government, Medicare, Medicaid, or the federal Health Insurance Marketplace (Healthcare.gov). If you want to enroll through the federal marketplace directly, you may do so at Healthcare.gov or by calling 1-800-318-2596.</p>

      <h2>State licenses</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse my-3">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-slate-100 text-slate-900 px-3 py-2 text-left">State</th>
              <th className="border border-slate-200 bg-slate-100 text-slate-900 px-3 py-2 text-left">License #</th>
            </tr>
          </thead>
          <tbody>
            {LICENSES.map((row) => (
              <tr key={row.state}>
                <td className="border border-slate-200 px-3 py-2">{row.state}</td>
                <td className="border border-slate-200 px-3 py-2 font-mono text-slate-700">{row.number}</td>
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

      <h2 id="partners">How your information is handled</h2>
      <p>When you submit a quote or callback request, your information is handled only by HealthLink Insurance Agency LLC and its in-house licensed agents. We do not sell, transfer, or pass lead information to outside agents, agencies, call centers, or lead buyers.</p>
      <p>Insurance carriers may receive information only when needed to quote, apply for, or service coverage that you choose to pursue with our team. If our information-sharing practices change in the future, this disclosure and the consent shown before submission will be updated before the new practice begins.</p>

      <h2>Questions or complaints</h2>
      <p>HealthLink Insurance Agency LLC · 2501 Chatham Rd, Suite R · Springfield, IL 62704</p>
      <p>Contact us at <a href="mailto:compliance@coverage.health">compliance@coverage.health</a> or (855) 395-5001. You may also contact your state's Department of Insurance.</p>
    </LegalShell>
  );
}