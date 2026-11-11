import { aboutValues } from "@/data/about";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { Icon } from "@/components/ui/Icon";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

export function AboutValues() {
  return (
    <section className="about-values" aria-labelledby="about-values-title">
      <div className="about-values__stage" aria-hidden="true">
        <FieldWash />
      </div>
      <div className="section-container">
        <div className="about-values__intro">
          <Eyebrow>Our Values</Eyebrow>
          <RevealLines id="about-values-title" as="h2" className="about-values__title">
            Our principles shape every learning experience
          </RevealLines>
        </div>
        <ul className="about-values__grid">
          {aboutValues.map((value) => (
            <li key={value.title} className="about-values__card">
              <span className="about-values__icon" aria-hidden="true">
                <Icon className="about-values__glyph" src={value.icon} width={40} height={40} />
              </span>
              <div className="about-values__copy">
                <h3>
                  <T>{value.title}</T>
                </h3>
                <p>
                  <T>{value.description}</T>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
