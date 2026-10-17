import { useEffect, useRef, useState } from 'react';
import { wedding } from '../data/wedding.js';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const toAr = (n) => String(n).padStart(2, '0');

export default function Timeline() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // The gold line "draws" itself as the section scrolls through the viewport.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.6 - r.top) / r.height;
      setProgress(Math.min(1, Math.max(0, p)));
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
  }, []);

  return (
    <section id="timeline" className="section timeline">
      <div className="container-xl">
        <SectionHead number="02" eyebrow="THE JOURNEY · رحلتنا" title="محطات الطريق إلى اليوم" />

        <ol className="tl" ref={trackRef} style={{ '--p': progress }}>
          <span className="tl__line" aria-hidden="true">
            <span className="tl__fill" />
          </span>
          {wedding.timeline.map((m, i) => (
            <li key={m.title} className={`tl__item ${i % 2 ? 'tl__item--alt' : ''}`}>
              <Reveal variant="fade" className="tl__dot" aria-hidden="true" />
              <Reveal variant="up" delay={80} className="tl__card">
                <span className="tl__no" dir="ltr">{toAr(i + 1)}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                {m.when && <time dir="ltr">{m.when}</time>}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
