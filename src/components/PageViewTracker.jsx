import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackFunnel } from '@/lib/funnel';

// Internal pages are excluded so team browsing doesn't pollute traffic reports.
const IGNORED = ['/leads-dashboard', '/analytics', '/login', '/register', '/forgot-password', '/reset-password'];

export default function PageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (IGNORED.some((p) => pathname.startsWith(p))) return;
    trackFunnel('page_view', { variant: pathname === '/b' ? 'B' : 'A' });
  }, [pathname]);

  return null;
}