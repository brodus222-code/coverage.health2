import { Link } from 'react-router-dom';
import LegalShell from '@/components/site/LegalShell';

export default function Terms() {
  return (
    <LegalShell
      title="Terms of Use"
      meta="Effective date: 8/4/2026"
    >
      <h2>1. Agreement</h2>
      <p>These Terms govern your use of Coverage.Health, operated by HealthLink Insurance Agency LLC ("we"). By using the site or submitting a quote request, you agree to these Terms and our <Link to="/privacy">Privacy Policy</Link>.</p>

      <h2>2. What this site is (and isn't)</h2>
      <p>Coverage.Health is a commercial insurance marketing and quoting website operated by a licensed insurance agency. We are <b>not a government website</b> and are not affiliated with or endorsed by the U.S. government or the federal Health Insurance Marketplace. Quotes are estimates only; final rates and eligibility are determined by the insurance carrier. Nothing on this site is a guarantee of coverage, a complete description of any policy, or legal, tax, or medical advice.</p>

      <h2>3. Consent to contact</h2>
      <p>If you submit a quote request with the consent box checked, you agree to be contacted as described in the consent disclosure on the form. Consent is not a condition of purchase, and you may revoke it at any time as described in our Privacy Policy.</p>

      <h2>4. Eligibility and accuracy</h2>
      <p>You must be at least 18 and a U.S. resident. You agree that the information you submit is accurate and about yourself or someone who has authorized you to act for them. Providing false information on an insurance application may be fraud under state law.</p>

      <h2>5. Intellectual property and acceptable use</h2>
      <p>Site content is owned by us or our licensors. You may not scrape the site, submit false leads, interfere with its operation, or use it for any unlawful purpose.</p>

      <h2>6. Disclaimers and limitation of liability</h2>
      <p>The site is provided "as is" without warranties of any kind. To the maximum extent permitted by law, our total liability arising from your use of the site will not exceed $100. Nothing in these Terms limits rights you have under applicable insurance law.</p>

      <h2>7. Dispute resolution</h2>
      <p>Any dispute arising from these Terms or your use of the site will be resolved by binding individual arbitration in Illinois under the rules of the American Arbitration Association, and you waive participation in class actions, except where prohibited by law. Illinois law governs, without regard to conflict-of-law rules.</p>

      <h2>8. Changes</h2>
      <p>We may update these Terms by posting a revised version with a new effective date. Continued use after changes constitutes acceptance.</p>

      <h2>9. Contact</h2>
      <p>HealthLink Insurance Agency LLC d/b/a Coverage.Health · 2501 Chatham Rd, Suite R, Springfield, IL 62704 · (855) 395-5001 · <a href="mailto:help@coverage.health">help@coverage.health</a></p>
    </LegalShell>
  );
}