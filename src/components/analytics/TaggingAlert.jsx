import { AlertTriangle } from 'lucide-react';

// Paid clicks arrive with a click ID (msclkid/gclid/fbclid) but campaign-level
// reporting needs UTM tags on the ad URLs. Surface that gap explicitly.
export default function TaggingAlert({ untaggedPaid, paidSessions }) {
  if (!untaggedPaid) return null;

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-6 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-[13.5px] leading-relaxed text-amber-900">
        <p className="font-bold mb-1">
          {untaggedPaid} of {paidSessions} paid clicks have no campaign tags
        </p>
        <p>
          We can see the click ID, so we know the visit was paid — but not which campaign, ad group, or keyword drove it.
          Add tracking templates to your ad platforms so campaign-level reporting fills in:
        </p>
        <div className="mt-2.5 space-y-1.5 font-mono text-[11.5px] bg-white/70 border border-amber-200 rounded-lg p-3">
          <p><b className="font-sans">Microsoft Ads →</b> {'{lpurl}?utm_source=bing&utm_medium=cpc&utm_campaign={Campaign}&utm_term={keyword}&utm_content={AdId}'}</p>
          <p><b className="font-sans">Google Ads →</b> {'{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}'}</p>
        </div>
        <p className="mt-2.5">Set these once at the account level (Settings → Tracking template) and every ad inherits them.</p>
      </div>
    </div>
  );
}