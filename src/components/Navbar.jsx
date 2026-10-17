import { useEffect, useState } from 'react';
import { wedding } from '../data/wedding.js';
import { useScrollLock } from '../hooks/useScrollLock.js';

const LINKS = [
  { id: 'home', label: 'الرئيسية', en: 'Home' },
  { id: 'story', label: 'قصتنا', en: 'Our Story' },
  { id: 'wedding', label: 'الزفاف', en: 'Wedding' },
];

export default function Navbar({ visible }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const { groom, bride } = wedding.couple;
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // wait for the menu to close so the scroll lock doesn't swallow the jump
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, open ? 380 : 0);
  };

  return (
    <>
      <header className={`nav ${visible ? 'is-visible' : ''} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <a href="#home" className="nav__brand" onClick={go('home')} aria-label="الرئيسية">
          <span>{groom.initial}</span>
          <i aria-hidden="true">×</i>
          <span>{bride.initial}</span>
        </a>

        <nav className="nav__links" aria-label="التنقل الرئيسي">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className={active === l.id ? 'is-active' : ''}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="mobile-menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="menu__bg" />
        <ul className="menu__list">
          {LINKS.map((l, i) => (
            <li key={l.id} style={{ '--i': i }}>
              <a href={`#${l.id}`} onClick={go(l.id)} tabIndex={open ? 0 : -1}>
                <small dir="ltr">0{i + 1}</small>
                <span>{l.label}</span>
                <em dir="ltr">{l.en}</em>
              </a>
            </li>
          ))}
        </ul>
        <p className="menu__foot">
          {groom.name} <i>&amp;</i> {bride.name} · 30.10.2026
        </p>
      </div>
    </>
  );
}
