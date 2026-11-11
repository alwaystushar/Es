"use client";

import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { aboutExperts } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import "swiper/css";

export function AboutExperts() {
  const swiper = useRef<SwiperInstance | null>(null);
  const direction = useDocumentDirection();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const instance = swiper.current;
    if (!instance) return;

    instance.update();
    instance.slideTo(active, 550);

    const tick = window.setInterval(() => instance.update(), 32);
    const done = window.setTimeout(() => window.clearInterval(tick), 600);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [active]);

  return (
    <section className="about-experts" aria-labelledby="about-experts-title">
      <div className="section-container">
        <div className="about-experts__intro">
          <div>
            <Eyebrow>Our Experts</Eyebrow>
            <RevealLines id="about-experts-title" as="h2" className="about-experts__title">
              Real world expertise that shapes learning
            </RevealLines>
          </div>
          <p className="about-experts__lede">
            <T>We work with subject-matter experts and practitioners who combine professional knowledge with hands-on experience.</T>
          </p>
        </div>

        <div className="about-experts__stage">
          <Swiper
            key={direction}
            className="about-experts__swiper"
            slidesPerView="auto"
            spaceBetween={16}
            dir={direction}
            watchSlidesProgress
            onSwiper={(instance) => {
              swiper.current = instance;
            }}
          >
            {aboutExperts.map((expert, index) => {
              const open = index === active;
              const indexLabel = String(index + 1).padStart(2, "0");

              return (
                <SwiperSlide key={`${expert.name}-${index}`} className={open ? "is-open" : undefined}>
                  <article
                    className={["about-expert", open ? "is-open" : ""].filter(Boolean).join(" ")}
                    tabIndex={0}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    <div className="about-expert__media">
                      <LocalizedImage
                        src={expert.image}
                        alt={expert.name}
                        fill
                        quality={90}
                        sizes="(max-width: 48rem) 70vw, 22rem"
                      />
                    </div>
                    <div className="about-expert__panel" aria-hidden={!open}>
                      <img
                        className="about-expert__dots"
                        src="/assets/images/wash/dots.svg"
                        alt=""
                        width={607}
                        height={625}
                      />
                      <div className="about-expert__copy">
                        <span className="about-expert__index">{indexLabel}</span>
                        <h3>
                          <T>{expert.name}</T>
                        </h3>
                        <p>
                          <T>{expert.role}</T>
                        </p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="about-experts__action">
          <Button variant="outline">Meet Our Experts</Button>
        </div>
      </div>
    </section>
  );
}
