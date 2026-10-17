import { wedding } from '../data/wedding.js';

export default function Hero({ ready, onEnter }) {
  const { groom, bride } = wedding.couple;
  const { weekday, day, month, year } = wedding.date;

  return (
    <section id="home" className={`hero ${ready ? 'is-ready' : ''}`} aria-label="الغلاف">
      <div className="hero__media" aria-hidden="true">
        <img
          src={wedding.images.hero}
          alt=""
          className="hero__img"
          data-parallax="0.18"
          fetchpriority="high"
          decoding="async"
        />
        <div className="hero__shade" />
        <div className="hero__grain" />
      </div>

      <div className="hero__frame" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__kicker">
          <span className="hero__kicker-line" />
          <span>دعوة زفاف</span>
          <span className="hero__kicker-line" />
        </p>
        <p className="hero__kicker-en" dir="ltr">THE WEDDING OF</p>

        <h1 className="hero__names">
          <span className="hero__name hero__name--a">
            <span>{groom.name}</span>
          </span>
          <span className="hero__amp" aria-hidden="true">&amp;</span>
          <span className="hero__name hero__name--b">
            <span>{bride.name}</span>
          </span>
        </h1>

        <p className="hero__date">
          <span>{weekday}</span>
          <i aria-hidden="true" />
          <span dir="ltr">
            {day} · {month} · {year}
          </span>
        </p>

        <button type="button" className="cta" onClick={onEnter}>
          <span className="cta__label">ادخل إلى الاحتفال</span>
          <span className="cta__en" dir="ltr">ENTER THE CELEBRATION</span>
          <span className="cta__arrow" aria-hidden="true">↓</span>
        </button>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
