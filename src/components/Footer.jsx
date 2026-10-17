import { wedding } from '../data/wedding.js';
import Reveal from './Reveal.jsx';

export default function Footer() {
  const { couple, meta } = wedding;
  return (
    <footer className="footer">
      <Reveal variant="fade" className="footer__inner">
        <p className="footer__mono" dir="ltr">
          {couple.groom.initial} <i>×</i> {couple.bride.initial}
        </p>
        <p className="footer__names">
          {couple.groom.name} <i>&amp;</i> {couple.bride.name}
        </p>
        <p className="footer__tag">{meta.hashtag}</p>
        <p className="footer__thanks">بحضوركم تكتمل فرحتنا — جزاكم الله خيرًا</p>
        <p className="footer__small" dir="ltr">30 · 10 · 2026 — 6th of October City, Egypt</p>
      </Reveal>
    </footer>
  );
}
