"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
                      <span className="about-expert__bg" aria-hidden="true" />
                      <img
                        className="about-expert__glow"
                        src="/assets/images/experts/card-glow.svg"
                        alt=""
                        width={680}
                        height={779}
                      />
                      <div
                        className={`about-expert__photo about-expert__photo--${index + 1}`}
                        style={
                          {
                            "--expert-pos-x": expert.imagePosition.x,
                            "--expert-pos-y": expert.imagePosition.y,
                            "--expert-offset-x": expert.imagePosition.offsetX,
                            "--expert-offset-y": expert.imagePosition.offsetY,
                          } as CSSProperties
                        }
                      >
                        <LocalizedImage
                          src={expert.image}
                          alt={expert.name}
                          fill
                          quality={95}
                          sizes="(max-width: 48rem) 70vw, 22rem"
                        />
                      </div>
                      <span className="about-expert__shade" aria-hidden="true" />
                    </div>
                    <div className="about-expert__panel" aria-hidden={!open}>
                      {/* Figma glove 1 — 408,-463 on card → 88,-463 inside panel @ 320 */}
                      <span className="about-expert__dots" aria-hidden="true" />
                      <div className="about-expert__copy">
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
          <Button href="/experts" variant="outline">
            Meet Our Experts
          </Button>
        </div>
      </div>
    </section>
  );
}
