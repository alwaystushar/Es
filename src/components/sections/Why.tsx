import { whyItems } from "@/data/home";
import { dictionary } from "@/i18n/dictionary";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { Icon } from "@/components/ui/Icon";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

const whyTitleLines = {
  "Rooted in the Local Context": ["Rooted in the", "Local Context"],
  "Established Global Methodologies": ["Established Global", "Methodologies"],
  "Expertise Shaped by Practice": ["Expertise Shaped", "by Practice"],
  "Knowledge Made Practical": ["Knowledge Made", "Practical"],
} as const;

export function Why() {
  return (
    <section className="why" aria-labelledby="why-title">
      <FieldWash />
      <div className="section-container">
        <div className="why__intro">
          <Eyebrow>Why ES Learning?</Eyebrow>
          <RevealLines id="why-title" as="h2" className="section-title">
            Learning you can put to work
          </RevealLines>
          <RevealLines as="p" className="section-copy" duration={0.7} stagger={0.08}>
            The value of a program lies not in how much information it covers, but in how it strengthens the way you think, work, and apply what you learn.
          </RevealLines>
        </div>
        <div className="why-grid">
          {whyItems.map((item) => (
            <article key={item.title} className="why-card" tabIndex={0}>
              <div className="why-card__icon">
                <Icon
                  className="why-card__glyph"
                  src={item.icon}
                  width={item.iconWidth}
                  height={item.iconHeight}
                />
              </div>
              <div className="why-card__copy">
                <h3>
                  <span className="loc-en">
                    {whyTitleLines[item.title][0]}
                    <br />
                    {whyTitleLines[item.title][1]}
                  </span>
                  <span className="loc-ar">{dictionary[item.title]}</span>
                </h3>
                <p>
                  <span className="why-card__detail">
                    <T>{item.description}</T>
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
