export default function GuideCosts() {
  return (
    <>
      <section className="space-y-4" aria-labelledby="guide-costs">
        <h2 id="guide-costs" className="font-display font-bold text-foreground text-2xl">2. Compare the whole year—not just the monthly price</h2>
        <p>A low premium can be a reasonable choice, but only if you can also afford the costs when you need care. Compare these four numbers for each plan:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="text-foreground">Premium:</strong> what you pay each month to keep coverage, whether or not you use it. Compare the amount you would actually pay after any confirmed savings.</li>
          <li><strong className="text-foreground">Deductible:</strong> what you pay for certain covered services before the plan begins sharing those costs. Some services are covered before you meet it; prescriptions may have a separate deductible.</li>
          <li><strong className="text-foreground">Copays and coinsurance:</strong> a fixed charge or percentage of the allowed cost for covered care. Check office visits, urgent care, hospital stays, and prescriptions separately.</li>
          <li><strong className="text-foreground">Out-of-pocket maximum:</strong> the annual limit on your share of covered, in-network costs under an ACA-compliant plan. Premiums, non-covered services, and most out-of-network costs do not count toward it.</li>
        </ul>
        <p><strong className="text-foreground">A simple example:</strong> Plan A costs $300 a month with $2,000 in estimated annual out-of-pocket care costs: $3,600 + $2,000 = $5,600. Plan B costs $400 a month with $500 in estimated care costs: $4,800 + $500 = $5,300. The higher-premium plan could cost less overall.</p>
        <p className="text-base">These are hypothetical numbers, not quotes. Care-cost estimates include applicable deductibles, copays, and coinsurance—don’t add the deductible twice. Also compare annual premiums plus the in-network out-of-pocket maximum to understand a high-use year, remembering that excluded costs can add more.</p>
      </section>
      <section className="space-y-4" aria-labelledby="guide-savings">
        <h2 id="guide-savings" className="font-display font-bold text-foreground text-2xl">3. Check metal tiers and possible savings</h2>
        <p>Bronze, Silver, Gold, and Platinum describe how you and an ACA plan share costs—not the quality of care. Bronze generally has lower premiums and higher costs when you use care; Gold and Platinum generally shift more of those costs to the plan. Actual prices and deductibles vary, so compare the details rather than choosing by the metal name alone.</p>
        <p>If you qualify for cost-sharing reductions, you generally must choose a Marketplace Silver plan to receive those lower deductibles, copays, and coinsurance. Premium tax credits are different: eligible shoppers can use them across Marketplace metal categories.</p>
        <p>Savings depend on your projected annual household income, tax household, and other eligibility factors, including access to qualifying employer coverage. If you’re self-employed, use estimated net income rather than gross business revenue. Report income and household changes to the Marketplace; advance tax credits are reconciled when you file your federal tax return.</p>
      </section>
    </>
  );
}