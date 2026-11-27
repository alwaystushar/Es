"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { aboutValues } from "@/data/about";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n/locale";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MQ_PHONE } from "@/lib/breakpoints";
import "swiper/css";

function ValueCard({
  value,
  as: Tag = "div",
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: {
  value: (typeof aboutValues)[number];
  as?: "div" | "li";
  isActive?: boolean;
  isDimmed?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
}) {
  return (
    <Tag
      className={[
        "about-values__card",
        isActive ? "is-active" : "",
        isDimmed ? "is-dimmed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      tabIndex={0}
    >
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
    </Tag>
  );
}

export function AboutValues() {
  const [active, setActive] = useState<number | null>(null);
  const swiper = useRef<SwiperInstance | null>(null);
  const direction = useDocumentDirection();
  const isPhone = useMediaQuery(MQ_PHONE);

  return (
    <section className="about-values" aria-labelledby="about-values-title">
      <div className="about-values__stage" aria-hidden="true">
        <FieldWash />
      </div>
      <div className="section-container">
        <div className="about-values__intro">
          <Eyebrow>Our Values</Eyebrow>
          <h2 id="about-values-title" className="about-values__title">
            <span className="loc-en">
              <span className="about-values__title-line">Our principles shape every</span>{" "}
              <span className="about-values__title-line">learning experience</span>
            </span>
            <span className="loc-ar">
              <T>Our principles shape every learning experience</T>
            </span>
          </h2>
        </div>

        {isPhone ? (
          <div className="about-values__track">
            <Swiper
              key={direction}
              className="about-values-swiper"
              slidesPerView="auto"
              spaceBetween={16}
              dir={direction}
              watchOverflow
              onSwiper={(instance) => {
                swiper.current = instance;
              }}
            >
              {aboutValues.map((value) => (
                <SwiperSlide key={value.title} className="about-values-swiper__slide">
                  <ValueCard value={value} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <ul
            className={["about-values__grid", active !== null ? "is-hot" : ""].filter(Boolean).join(" ")}
            onMouseLeave={() => setActive(null)}
          >
            {aboutValues.map((value, index) => {
              const isActive = active === index;
              const isDimmed = active !== null && !isActive;

              return (
                <ValueCard
                  key={value.title}
                  as="li"
                  value={value}
                  isActive={isActive}
                  isDimmed={isDimmed}
                  onActivate={() => setActive(index)}
                  onDeactivate={() => setActive(null)}
                />
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
