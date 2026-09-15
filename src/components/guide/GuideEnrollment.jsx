export default function GuideEnrollment() {
  return (
    <>
      <section className="space-y-4" aria-labelledby="guide-checks">
        <h2 id="guide-checks" className="font-display font-bold text-foreground text-2xl">4. Verify your doctors and prescriptions</h2>
        <p>Accepting an insurance company is not the same as participating in every plan it offers. Use the exact plan and network name—not just the carrier logo.</p>
        <ul className="list-disc pl-6 space-y-3">
          <li>Check your doctors, specialists, preferred hospital, and labs in the insurer’s current directory, then confirm participation with the provider’s office.</li>
          <li>Look up each medication’s exact name and dose in the formulary, or covered-drug list. Check its price tier, pharmacy network, prior authorization, and any step-therapy requirements.</li>
          <li>Review the Summary of Benefits and Coverage alongside the policy documents for exclusions, referral rules, and services requiring approval. If you travel or live in two states, ask specifically about routine care away from home.</li>
        </ul>
      </section>
      <section className="space-y-4" aria-labelledby="guide-enrollment">
        <h2 id="guide-enrollment" className="font-display font-bold text-foreground text-2xl">5. Confirm when you can enroll—and when coverage starts</h2>
        <p>Marketplace enrollment generally takes place during annual Open Enrollment. Outside that window, a qualifying event—such as losing job-based coverage, getting married, having a baby, or certain moves—may open a Special Enrollment Period. Timing and documentation depend on the event; many windows are around 60 days. Check the current rules for your state and coverage year rather than assuming enrollment is available anytime.</p>
        <p>Medicaid and CHIP accept applications year-round for eligible people. If you’re leaving a job, compare any COBRA option with Marketplace coverage before deciding; voluntarily ending COBRA early generally does not create a new enrollment opportunity.</p>
        <p><strong className="text-foreground">Before canceling existing coverage:</strong> confirm the new plan’s effective date, any required documents, and payment of the first premium. Submitting a quote request does not enroll you or activate insurance.</p>
      </section>
      <section className="space-y-4" aria-labelledby="guide-ready">
        <h2 id="guide-ready" className="font-display font-bold text-foreground text-2xl">Your checklist for a useful plan comparison</h2>
        <p>Have your ZIP code, household members’ ages, estimated annual household income, doctor names, medication list, and desired start date ready. If you’re losing coverage, note its end date and keep the notice.</p>
        <p>Our in-house licensed agents can help review available options, explain trade-offs, and confirm pricing and eligibility. A comparison request starts a phone conversation—not an instant quote or an obligation to enroll.</p>
        <p className="text-sm">This guide provides general education, not a guarantee of benefits, availability, or savings. The policy’s terms and current eligibility rules control.</p>
        <p className="text-sm">Official references: <a className="underline" href="https://www.healthcare.gov/choose-a-plan/comparing-plans/" target="_blank" rel="noopener noreferrer">Comparing plans</a> · <a className="underline" href="https://www.healthcare.gov/choose-a-plan/your-total-costs/" target="_blank" rel="noopener noreferrer">Total health care costs</a> · <a className="underline" href="https://www.healthcare.gov/choose-a-plan/plans-categories/" target="_blank" rel="noopener noreferrer">Metal categories</a> · <a className="underline" href="https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/" target="_blank" rel="noopener noreferrer">Special Enrollment Periods</a>. Coverage.Health is not a government website or affiliated with the Marketplace.</p>
      </section>
    </>
  );
}