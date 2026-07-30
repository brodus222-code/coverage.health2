import { Link } from 'react-router-dom';
import LegalShell from '@/components/site/LegalShell';

export default function Privacy() {
  return (
    <LegalShell
      title="Privacy Policy"
      meta="Effective date: [DATE] · HealthLink Insurance Agency LLC d/b/a Coverage.Health"
      notice='This is a working template. Have licensed privacy counsel review before launch, particularly the state-privacy-rights section (CA/TX/NJ/etc.) and the "sale/sharing" characterization of your lead flow.'
    >
      <h2>1. Who we are</h2>
      <p>Coverage.Health is operated by HealthLink Insurance Agency LLC, a licensed insurance agency organized in Illinois ("we," "us"). This policy explains what information we collect on this website, how we use it, and the choices you have.</p>

      <h2>2. Information we collect</h2>
      <p><b>Information you provide:</b> name, email, phone number, ZIP code, state, age, household composition, estimated income range, and any details you share with our agents about coverage needs.</p>
      <p><b>Information collected automatically:</b> IP address, device and browser data, pages viewed, referral source, advertising identifiers and click IDs (e.g., gclid, fbclid), and call recordings when you speak with our agents (where permitted and disclosed).</p>
      <p><b>Consent documentation:</b> we use third-party services such as ActiveProspect TrustedForm and/or Jornaya to create an independent record of the page you saw and the consent you gave when submitting a form.</p>

      <h2>3. How we use your information</h2>
      <p>We use your information to provide quotes and enrollment assistance; connect you with licensed agents and, where you have consented, with our agent and carrier partners; verify identity and eligibility; comply with insurance, telemarketing, and record-keeping laws; measure and improve our advertising; and prevent fraud.</p>

      <h2>4. How we share your information</h2>
      <p>With your consent, we share your quote-request information with licensed insurance agents, agencies, and carriers so they can contact you about coverage (see our <Link to="/disclosures#partners">partner list</Link>). We also share information with service providers (hosting, CRM, call tracking, analytics, advertising platforms, consent verification) under contract; with regulators or law enforcement where required; and in connection with a business transfer. Some of this sharing may be considered a "sale" or "sharing" of personal information under certain state privacy laws; you may opt out as described below.</p>

      <h2 id="rights">5. Your privacy rights</h2>
      <p>Depending on your state (including California, Texas, and New Jersey), you may have the right to know, access, correct, or delete personal information we hold about you, to opt out of the sale or sharing of your personal information and of targeted advertising, and to not be discriminated against for exercising these rights.</p>
      <p><b>To exercise any right, including "Do Not Sell/Share My Personal Information":</b> email <a href="mailto:privacy@coverage.health">privacy@coverage.health</a> or call our toll-free number and say "privacy request." We will verify your identity and respond within the time required by your state's law.</p>

      <h2>6. Telemarketing consent and revocation</h2>
      <p>Submitting our quote form with the consent box checked constitutes your express written consent to be contacted as described on the form. You may revoke consent at any time by replying STOP to any text, telling any agent to place you on our internal Do-Not-Call list, or emailing <a href="mailto:privacy@coverage.health">privacy@coverage.health</a>. Revocation is honored within the timeframes required by the TCPA and FCC rules.</p>

      <h2>7. Cookies and advertising</h2>
      <p>We use cookies and similar technologies (Google Analytics, Google Ads, Meta Pixel, call-tracking scripts) to operate the site and measure advertising. You can limit cookies via your browser settings and opt out of targeted advertising through the links in Section 5.</p>

      <h2>8. Data security and retention</h2>
      <p>We use commercially reasonable safeguards, including encryption in transit, and retain records as required by insurance and telemarketing regulations (generally 5+ years for consent records).</p>

      <h2>9. Children</h2>
      <p>This site is not directed to individuals under 18, and we do not knowingly collect their information.</p>

      <h2>10. Contact</h2>
      <p>HealthLink Insurance Agency LLC d/b/a Coverage.Health<br />[Registered address, Illinois]<br /><a href="mailto:privacy@coverage.health">privacy@coverage.health</a> · (888) 555-1234</p>
    </LegalShell>
  );
}