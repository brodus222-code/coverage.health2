import KitCard from '@/components/kit/KitCard';

export default function TrackingArchitecture() {
  return (
    <KitCard title="Tracking Architecture">
      <h3>Data flow</h3>
      <p className="font-mono text-[13px] bg-slate-900 text-slate-200 rounded-xl p-4 overflow-x-auto whitespace-pre leading-relaxed">
{`Ad click (gclid/fbclid + UTMs)
   └─► Landing page — GA4 + AW tag + Meta Pixel + TrustedForm + Ringba DNI load
         └─► 5-step quote form (UTMs & click IDs captured to hidden fields)
               └─► Lead saved + CRM webhook  ──►  agent dialer (speed-to-lead < 5 min)
               └─► /thank-you  ──►  gtag conversion + fbq('track','Lead')
Phone path: DNI number per source ──► Ringba ──► call ≥60s = conversion import`}
      </p>

      <h3>IDs to replace before launch (site &lt;head&gt;)</h3>
      <table>
        <thead><tr><th>Tool</th><th>Placeholder</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>GA4</td><td>G-XXXXXXX</td><td>Analytics, funnel steps, source reporting</td></tr>
          <tr><td>Google Ads</td><td>AW-XXXXXXX (+ conversion label)</td><td>Lead conversion on /thank-you</td></tr>
          <tr><td>Meta Pixel</td><td>PIXEL_ID</td><td>PageView + Lead event, retargeting audiences</td></tr>
          <tr><td>TrustedForm</td><td>(script enable only)</td><td>Independent TCPA consent certificate per lead — required</td></tr>
          <tr><td>Jornaya</td><td>CAMPAIGN_ID</td><td>Optional second consent witness</td></tr>
          <tr><td>Ringba</td><td>RINGBA_TAG_ID</td><td>Dynamic number insertion + call attribution</td></tr>
          <tr><td>CRM</td><td>Lead delivery destination</td><td>Leads currently stored in the site database; connect your CRM before launch</td></tr>
        </tbody>
      </table>

      <h3>Event map</h3>
      <table>
        <thead><tr><th>Event</th><th>Fires</th><th>Destination</th></tr></thead>
        <tbody>
          <tr><td>form_step_1…5</td><td>Each quote-form step viewed</td><td>GA4 (drop-off analysis)</td></tr>
          <tr><td>lead_submit</td><td>Form submitted successfully</td><td>GA4 + AW conversion + Meta Lead</td></tr>
          <tr><td>call_click_header / _band / _sticky</td><td>Any tel: link tapped</td><td>GA4; ≥60s calls import from Ringba</td></tr>
        </tbody>
      </table>
    </KitCard>
  );
}