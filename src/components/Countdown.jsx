import { useEffect, useRef } from 'react';
import { wedding } from '../data/wedding.js';
import { useCountdown } from '../hooks/useCountdown.js';
import Reveal from './Reveal.jsx';

const pad = (n, l = 2) => String(n).padStart(l, '0');

/** A digit that slides up when its value changes — feels like a mechanical luxury clock. */
function Digit({ value }) {
  const prev = useRef(value);
  const changed = prev.current !== value;
  useEffect(() => {
    prev.current = value;
  });
  return (
    <span className="cd__digit" dir="ltr">
      <span key={value} className={`cd__glyph ${changed ? 'is-tick' : ''}`}>
        {value}
      </span>
    </span>
  );
}

function Unit({ value, label, en, len = 2 }) {
  const str = pad(value, len);
  return (
    <div className="cd__unit">
      <div className="cd__num" dir="ltr" aria-hidden="true">
        {str.split('').map((c, i) => (
          <Digit key={i} value={c} />
        ))}
      </div>
      <span className="cd__label">{label}</span>
      <span className="cd__en" dir="ltr">{en}</span>
    </div>
  );
}

export default function Countdown() {
  const t = useCountdown(wedding.date.iso);
  const sr = `${t.days} يوم و${t.hours} ساعة و${t.minutes} دقيقة حتى الزفاف`;

  return (
    <section id="countdown" className="section countdown">
      <div className="countdown__ring" aria-hidden="true" />
      <div className="container-xl">
        <Reveal variant="fade" className="countdown__head">
          <span dir="ltr">THE COUNTDOWN</span>
          <h2>{t.done ? 'إنه يوم الفرح' : 'ما تبقّى من الانتظار'}</h2>
        </Reveal>

        <Reveal variant="up" delay={120} className="cd" role="timer" aria-label={sr}>
          <Unit value={t.days} label="يوم" en="DAYS" len={t.days > 99 ? 3 : 2} />
          <span className="cd__sep" aria-hidden="true">:</span>
          <Unit value={t.hours} label="ساعة" en="HOURS" />
          <span className="cd__sep" aria-hidden="true">:</span>
          <Unit value={t.minutes} label="دقيقة" en="MINUTES" />
          <span className="cd__sep" aria-hidden="true">:</span>
          <Unit value={t.seconds} label="ثانية" en="SECONDS" />
        </Reveal>

        <Reveal variant="fade" delay={260} as="p" className="countdown__foot">
          الجمعة · 30 أكتوبر 2026 · الساعة 7 مساءً
        </Reveal>
      </div>
    </section>
  );
}
