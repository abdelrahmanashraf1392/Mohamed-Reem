import { wedding } from '../data/wedding.js';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Story() {
  const { groom, bride } = wedding.couple;
  const { story } = wedding;

  return (
    <section id="story" className="section story">
      <div className="container-xl">
        <SectionHead number="01" eyebrow="OUR STORY · قصتنا" title="حكايةٌ تستحق أن تُروى" />

        <div className="story__grid">
          <div className="story__text">
            <Reveal as="p" variant="up" className="story__lead">
              {story.lead}
            </Reveal>

            {story.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} variant="up" delay={120 * (i + 1)} className="story__p">
                {p}
              </Reveal>
            ))}

            <Reveal variant="fade" delay={300} className="story__names">
              <span>{groom.name}</span>
              <i>&amp;</i>
              <span>{bride.name}</span>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
