import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Skip scroll-to-top when navigating to contact form
    if (state && (state as { scrollToForm?: boolean }).scrollToForm) return;

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, state]);

  return null;
}
