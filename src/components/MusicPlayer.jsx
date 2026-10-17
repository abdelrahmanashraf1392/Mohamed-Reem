import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from '../data/wedding.js';

/**
 * Optional atmosphere. Never autoplays — only starts after the visitor taps the button.
 * - If wedding.music.src is set, it plays that file.
 * - Otherwise a soft generative pad (Web Audio) plays, so the control works out-of-the-box.
 */
function createPad() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  filter.connect(master);
  master.connect(ctx.destination);

  // Slow, warm Dm9-ish chord (D3 F3 A3 C4 E4) with detuned pairs + a very slow LFO on the filter.
  const notes = [146.83, 174.61, 220.0, 261.63, 329.63];
  const oscs = [];
  notes.forEach((f, i) => {
    [-4, 4].forEach((cents) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = i % 2 ? 'sine' : 'triangle';
      o.frequency.value = f;
      o.detune.value = cents;
      g.gain.value = 0.055 / (1 + i * 0.35);
      o.connect(g).connect(filter);
      o.start();
      oscs.push(o);
    });
  });
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.07;
  lfoGain.gain.value = 380;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();

  return {
    ctx,
    play() {
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 3);
    },
    pause() {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      setTimeout(() => ctx.suspend(), 1300);
    },
    destroy() {
      oscs.forEach((o) => o.stop());
      lfo.stop();
      ctx.close();
    },
  };
}

export default function MusicPlayer({ visible }) {
  const [on, setOn] = useState(false);
  const audio = useRef(null);
  const pad = useRef(null);
  const src = wedding.music.src;

  useEffect(
    () => () => {
      audio.current?.pause();
      pad.current?.destroy();
    },
    []
  );

  const toggle = useCallback(async () => {
    if (src) {
      if (!audio.current) {
        audio.current = new Audio(src);
        audio.current.loop = true;
        audio.current.volume = 0.5;
      }
      if (on) audio.current.pause();
      else await audio.current.play().catch(() => {});
    } else {
      if (!pad.current) pad.current = createPad();
      if (on) pad.current?.pause();
      else pad.current?.play();
    }
    setOn((v) => !v);
  }, [on, src]);

  return (
    <button
      type="button"
      className={`music ${visible ? 'is-visible' : ''} ${on ? 'is-on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
    >
      <span className="music__bars" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="music__label">{on ? 'إيقاف' : 'موسيقى'}</span>
    </button>
  );
}
