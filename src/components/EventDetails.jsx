import { wedding } from '../data/wedding.js';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const Icon = {
  clock: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" /><circle cx="12" cy="10" r="2.4" /></svg>
  ),
  hanger: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8V6.5a2 2 0 1 1 2 2M12 8l9 6.2a1 1 0 0 1-.6 1.8H3.6a1 1 0 0 1-.6-1.8L12 8z" /></svg>
  ),
  cal: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>
  ),
};

function Row({ icon, label, children }) {
  const has = Array.isArray(children) ? children.some(Boolean) : Boolean(children);
  if (!has) return null;
  return (
    <li className="ev__row">
      <span className="ev__icon">{Icon[icon]}</span>
      <span className="ev__label">{label}</span>
      <span className="ev__value">{children}</span>
    </li>
  );
}

export default function EventDetails() {
  return (
    <section id="wedding" className="section events">
      <div className="container-xl">
        <SectionHead number="03" eyebrow="THE CELEBRATION · الاحتفال" title="يومان من الفرح" light />

        <div className="events__grid">
          {wedding.events.map((ev, i) => (
            <Reveal key={ev.id} variant="up" delay={i * 160} className={`ev ev--${ev.id}`}>
              <div className="ev__top">
                <span className="ev__eyebrow" dir="ltr">{ev.eyebrow}</span>
                <h3 className="ev__title">{ev.title}</h3>
              </div>

              <div className="ev__date" aria-label={ev.dateText}>
                <span className="ev__day" dir="ltr">{ev.day}</span>
                <span className="ev__meta">
                  <strong>{ev.weekday}</strong>
                  <span>{ev.monthYear}</span>
                </span>
              </div>

              <ul className="ev__list">
                <Row icon="clock" label="الموعد">{ev.time}</Row>
                <Row icon="pin" label="المكان">
                  {ev.venue}
                  {ev.address && <small>{ev.address}</small>}
                </Row>
                <Row icon="hanger" label="الزي">{ev.dressCode}</Row>
              </ul>

              <a className="btn-line" href={ev.mapUrl} target="_blank" rel="noopener noreferrer">
                <span>افتح الموقع على الخريطة</span>
                <i aria-hidden="true">↗</i>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
