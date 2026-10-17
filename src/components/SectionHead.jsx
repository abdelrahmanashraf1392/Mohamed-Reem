import Reveal from './Reveal.jsx';

export default function SectionHead({ number, eyebrow, title, light = false }) {
  return (
    <header className={`section-head ${light ? 'section-head--light' : ''}`}>
      <Reveal variant="fade" className="section-head__meta">
        <span className="section-head__no">{number}</span>
        <span className="section-head__rule" aria-hidden="true" />
        <span className="section-head__eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" variant="line" delay={120} className="section-head__title">
        <span>{title}</span>
      </Reveal>
    </header>
  );
}
