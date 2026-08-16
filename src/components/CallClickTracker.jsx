import { useEffect } from 'react';
import { trackFunnel } from '@/lib/funnel';
import { trackUetCallClick, trackMetaCallClick } from '@/lib/tracking';

// One delegated listener catches every outbound tel: link on the site — header,
// mobile bar, footer, landers, thank-you page — so no call button can be added
// later and silently go untracked. Fires the Microsoft UET event goal, the Meta
// Contact event, and our own first-party funnel record.
export default function CallClickTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="tel:"]');
      if (!link) return;
      const label = link.dataset.callSource || window.location.pathname;
      trackUetCallClick(label);
      trackMetaCallClick(label);
      trackFunnel('call_click', { step_name: label });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}