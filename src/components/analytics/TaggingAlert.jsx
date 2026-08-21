import { AlertTriangle } from 'lucide-react';

// Recommended tracking template per ad platform, keyed by our channel label.
const TEMPLATES = {
  'Microsoft Ads': '{lpurl}?utm_source=bing&utm_medium=cpc&utm_campaign={Campaign}&utm_term={keyword}&utm_content={AdGroup}&msclkid={msclkid}',
  'Google Ads': '{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}&gclid={gclid}',
  'Meta Ads': '{{site_source_name}} → use URL parameters: utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}',
};

// Paid clicks arrive with a click ID (msclkid/gclid/fbclid) but campaign-level
// reporting needs UTM tags on the ad URLs. Surface that gap explicitly — and
// only for the platforms actually missing tags.
export default function TaggingAlert({ untaggedPaid, paidSessions, untaggedChannels = [] }) {
  if (!untaggedPaid) return null;

  const fixable = untaggedChannels.filter((c) => TEMPLATES[c]);
  const other = untaggedChannels.filter((c) => !TEMPLATES[c]);

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-6 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-[13.5px] leading-relaxed text-amber-900">
        <p className="font-bold mb-1">
          {untaggedPaid} of {paidSessions} paid clicks have no campaign tags
        </p>
        <p>
          We can see the click ID, so we know the visit was paid — but not which campaign, ad group, or keyword drove it.
          {untaggedChannels.length ? ` Missing tags on: ${untaggedChannels.join(', ')}.` : ''}
        </p>
        {fixable.length > 0 && (
          <div className="mt-2.5 space-y-1.5 font-mono text-[11.5px] bg-white/70 border border-amber-200 rounded-lg p-3">
            {fixable.map((c) => (
              <p key={c}><b className="font-sans">{c} →</b> {TEMPLATES[c]}</p>
            ))}
          </div>
        )}
        {other.length > 0 && (
          <p className="mt-2.5">For {other.join(', ')}, add UTM parameters at the ad or campaign level in that platform.</p>
        )}
        <p className="mt-2.5">Set these once at the account level (Settings → Tracking template) and every ad inherits them.</p>
      </div>
    </div>
  );
}