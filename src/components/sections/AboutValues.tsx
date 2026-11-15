"use client";

import { useState } from "react";
import { aboutValues } from "@/data/about";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { Icon } from "@/components/ui/Icon";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

const ICON_DEFAULT = "/assets/images/about/values/icon-ksa.svg";
const ICON_HOVER = "/assets/images/about/values/icon-ksa-hover.svg";

export function AboutValues() {
  const [active, setActive] = useState<number | null>(null);

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
        <ul
          className={["about-values__grid", active !== null ? "is-hot" : ""].filter(Boolean).join(" ")}
          onMouseLeave={() => setActive(null)}
        >
          {aboutValues.map((value, index) => {
            const isActive = active === index;
            const isDimmed = active !== null && !isActive;

            return (
              <li
                key={value.title}
                className={[
                  "about-values__card",
                  isActive ? "is-active" : "",
                  isDimmed ? "is-dimmed" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                tabIndex={0}
              >
                <span className="about-values__icon" aria-hidden="true">
                  <Icon
                    className="about-values__glyph"
                    src={isActive ? ICON_HOVER : value.icon || ICON_DEFAULT}
                    width={40}
                    height={40}
                  />
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
            );
          })}
        </ul>
      </div>
    </section>
  );
}
