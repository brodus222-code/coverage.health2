export default function GuidePlanTypes() {
  return (
    <section className="space-y-4" aria-labelledby="guide-plan-types">
      <h2 id="guide-plan-types" className="font-display font-bold text-foreground text-2xl">1. Know what kind of coverage you’re comparing</h2>
      <p>“Private,” “PPO,” and “Marketplace” are not opposite categories. Marketplace plans are offered by private insurers; PPO describes a provider network, not how comprehensive the benefits are. Start by asking whether a policy is ACA-compliant major medical insurance.</p>
      <ul className="list-disc pl-6 space-y-3">
        <li><strong className="text-foreground">ACA-compliant individual plans</strong> cover essential health benefits and cannot deny coverage or charge more because of pre-existing conditions. You can buy them through the Marketplace or, where available, directly from an insurer. Premium tax credits are available only through the Marketplace if you qualify.</li>
        <li><strong className="text-foreground">PPO, HMO, and EPO networks</strong> determine where you can receive covered care. PPOs generally allow out-of-network care at a higher cost and do not require specialist referrals. HMOs and EPOs generally restrict non-emergency coverage to their networks; referral rules vary. A PPO label does not guarantee a nationwide network or that your doctor participates.</li>
        <li><strong className="text-foreground">Supplemental and limited-benefit policies</strong> are not substitutes for comprehensive major medical coverage. Fixed indemnity policies pay set amounts for specified events, not necessarily the full bill. Short-term coverage, where available, may exclude pre-existing conditions and important benefits. Read exclusions, benefit caps, and renewal rules carefully.</li>
      </ul>
      <p><strong className="text-foreground">Ask before comparing prices:</strong> “What does this policy cover, what does it exclude, and is it comprehensive major medical insurance?”</p>
    </section>
  );
}