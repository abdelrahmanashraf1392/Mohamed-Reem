import { useEffect, useState } from 'react';
import { wedding } from '../data/wedding.js';

const MIN_MS = 2400;

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('in'); // in -> out -> gone
  const { groom, bride } = wedding.couple;

  useEffect(() => {
    const started = performance.now();
    let cancelled = false;

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const heroImg = new Image();
    const heroLoaded = new Promise((res) => {
      heroImg.onload = heroImg.onerror = res;
      heroImg.src = wedding.images.hero;
    });

    Promise.race([
      Promise.all([fontsReady, heroLoaded]),
      new Promise((res) => setTimeout(res, 5000)), // never hang on a slow network
    ]).then(() => {
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      setTimeout(() => {
        if (cancelled) return;
        setPhase('out');
        onDone();
        setTimeout(() => !cancelled && setPhase('gone'), 1200);
      }, wait);
    });

    return () => {
      cancelled = true;
    };
  }, [onDone]);

  if (phase === 'gone') return null;

  return (
    <div className={`loader ${phase === 'out' ? 'is-out' : ''}`} role="status" aria-label="جاري التحميل">
      <div className="loader__panel loader__panel--a" />
      <div className="loader__panel loader__panel--b" />
      <div className="loader__content">
        <div className="loader__mono" dir="ltr">
          <span className="loader__letter loader__letter--a">{groom.initial}</span>
          <span className="loader__x" aria-hidden="true">×</span>
          <span className="loader__letter loader__letter--b">{bride.initial}</span>
        </div>
        <div className="loader__line" aria-hidden="true" />
        <p className="loader__date">30 · 10 · 2026</p>
      </div>
    </div>
  );
}
