import { useState } from 'react';
import { wedding } from '../data/wedding.js';
import Reveal from './Reveal.jsx';

export default function Invitation() {
  const { invitation: inv, families, couple, date, events } = wedding;
  const [showOriginal, setShowOriginal] = useState(false);
  const venue = events.find((e) => e.id === 'wedding');

  return (
    <section id="invitation" className="section invitation">
      <div className="invitation__bg" aria-hidden="true" />
      <div className="container-xl">
        <Reveal variant="up" className="card-invite">
          <div className="card-invite__border" aria-hidden="true" />
          <span className="card-invite__corner card-invite__corner--tl" aria-hidden="true" />
          <span className="card-invite__corner card-invite__corner--tr" aria-hidden="true" />
          <span className="card-invite__corner card-invite__corner--bl" aria-hidden="true" />
          <span className="card-invite__corner card-invite__corner--br" aria-hidden="true" />

          <p className="card-invite__verse">{inv.verse}</p>
          <p className="card-invite__ref">{inv.verseRef}</p>

          <div className="card-invite__orn" aria-hidden="true"><i /><b /><i /></div>

          <p className="card-invite__family">{families.groom}</p>
          <p className="card-invite__and">و</p>
          <p className="card-invite__family">{families.bride}</p>

          <p className="card-invite__line">{inv.inviteLine}</p>

          <h2 className="card-invite__names">
            <span>{couple.groom.name}</span>
            <i>و</i>
            <span>{couple.bride.name}</span>
          </h2>

          <p className="card-invite__bless">{inv.blessing}</p>

          <div className="card-invite__orn" aria-hidden="true"><i /><b /><i /></div>

          <p className="card-invite__when">
            {date.weekday} {date.day} {date.monthName} {date.year}
            <br />
            الساعة {date.time} {date.period}
          </p>
          <p className="card-invite__where">
            {venue.venue}
            <small>{venue.address}</small>
          </p>
        </Reveal>

        <Reveal variant="fade" delay={200} className="invitation__original">
          <button
            type="button"
            className="link-btn"
            onClick={() => setShowOriginal(true)}
            aria-haspopup="dialog"
          >
            <span>عرض الدعوة الأصلية</span>
            <i aria-hidden="true">↗</i>
          </button>
        </Reveal>
      </div>

      {showOriginal && (
        <div
          className="lightbox lightbox--invite"
          role="dialog"
          aria-modal="true"
          aria-label={inv.original.caption}
          onClick={() => setShowOriginal(false)}
        >
          <button type="button" className="lightbox__close" aria-label="إغلاق" onClick={() => setShowOriginal(false)}>
            ×
          </button>
          <img src={inv.original.src} alt="الدعوة الأصلية لزفاف محمد وريم" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
