import KitCard from '@/components/kit/KitCard';

export default function MetaAdsBuild() {
  return (
    <KitCard title="Meta Ads Build" badge="Facebook / Instagram">
      <h3>Campaign structure</h3>
      <table>
        <thead><tr><th>Campaign</th><th>Ad set</th><th>Targeting</th><th>Budget</th></tr></thead>
        <tbody>
          <tr>
            <td rowSpan={2}><b>M1 — Lead Gen (Sales objective → landing page)</b><br />Optimize for Lead (pixel event on thank-you)</td>
            <td>Broad</td>
            <td>Ages 25–60, the 13 licensed states only, Advantage+ off for geo. No interest stack — let the pixel learn.</td>
            <td rowSpan={2}>$100/day (start)</td>
          </tr>
          <tr>
            <td>Self-Employed</td>
            <td>Ages 25–60, 13 states, interests: self-employment, freelancing, small business owners, gig platforms.</td>
          </tr>
          <tr>
            <td><b>M2 — Retargeting</b></td>
            <td>Site visitors 14d, no lead</td>
            <td>Pixel custom audience: visited landing page, excluded thank-you visitors.</td>
            <td>$25/day</td>
          </tr>
        </tbody>
      </table>

      <h3>Creative direction ("Empowered Serenity")</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>High-key lifestyle photography: father + child at home, freelancer at a bright window, couple outdoors. No stethoscopes, no handshakes, no text overlays baked into images.</li>
        <li>Formats: 1:1 feed image, 9:16 story/reel with a 15s talking-agent video ("What a real quote call sounds like").</li>
        <li>3 images × 3 primary texts × 2 headlines = launch grid; kill anything under 0.8% CTR after 3 days.</li>
      </ul>

      <h3>Copy bank</h3>
      <p><b>Primary texts:</b></p>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Self-employed and paying too much for health insurance? A licensed agent compares private PPO, ACA and budget plans for your ZIP code — free, in one call. 🍊</li>
        <li>Between jobs? You have more options than COBRA. Compare real prices from a licensed agent in your state — takes 60 seconds to start.</li>
        <li>Many households qualify for ACA subsidies they never claim. Check yours free — a human (not a robot) walks you through it.</li>
      </ul>
      <p><b>Headlines:</b> "Compare Health Plans — Free" · "Talk To A Licensed Agent". <b>CTA button:</b> Get Quote.</p>

      <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><b>Compliance:</b> Health-insurance lead ads on Meta must not imply government affiliation or guaranteed rates, and cannot use personal-attribute callouts ("Do YOU have diabetes?"). Landing page must show the licensed-agency disclosure above the fold on mobile. Keep TrustedForm active — Meta traffic is the highest TCPA-litigation risk.</p>
    </KitCard>
  );
}