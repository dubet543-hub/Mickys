import { useEffect } from 'react';
import Lenis from 'lenis';

/*
  useLenis — site-wide smooth momentum scrolling (the "premium Webflow feel").
  Exposes the instance on window.__lenis so navigation can jump to top cleanly.
  Fully disabled when the user prefers reduced motion.
*/
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    window.__lenis = lenis;
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}
