import { useEffect } from 'react';

/**
 * Lightweight parallax: any element with data-parallax="0.15" gets a --py CSS variable
 * based on where its parent sits relative to the viewport centre. One rAF-throttled listener.
 */
export function useParallax(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const els = Array.from(document.querySelectorAll('[data-parallax]'));
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) return;
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const offset = r.top + r.height / 2 - vh / 2;
        el.style.setProperty('--py', `${(-offset * speed).toFixed(1)}px`);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);
}
