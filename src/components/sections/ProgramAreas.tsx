"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { programAreas } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { RevealImage } from "@/components/animation/RevealImage";
import { RevealLines } from "@/components/animation/RevealLines";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { T, tr, useLocale } from "@/i18n/locale";
import "swiper/css";

export function ProgramAreas() {
  const swiper = useRef<SwiperInstance | null>(null);
  const direction = useDocumentDirection();
  const { locale } = useLocale();
  const [gap, setGap] = useState(36);

  useEffect(() => {
    const apply = () => {
      const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      setGap(Math.round(root * 2.25));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return (
    <section className="areas" id="areas" aria-labelledby="areas-title">
      <div className="section-container">
        <div className="areas__heading">
          <Eyebrow small>Program areas</Eyebrow>
          <div className="areas__split">
            <RevealLines id="areas-title" as="h2" className="section-title section-title--display">
              Build the Skills to Perform Better
            </RevealLines>
            <RevealLines as="p" className="section-copy" duration={0.7} stagger={0.08}>
              Explore specialized learning areas designed to build skills and knowledge directly relevant to your work.
            </RevealLines>
          </div>
        </div>

        <Swiper
          key={direction}
          className="areas-swiper"
          dir={direction}
          slidesPerView="auto"
          spaceBetween={gap}
          watchOverflow
          onSwiper={(instance) => {
            swiper.current = instance;
          }}
        >
          {programAreas.map((area) => (
            <SwiperSlide key={area.slug}>
              <article className="area-card">
                <RevealImage className="area-card__media">
                  <Image src={area.image} alt={tr(locale, area.alt)} fill sizes="(max-width: 800px) 86vw, 564px" />
                </RevealImage>
                <div>
                  <h3>
                    <T>{area.title}</T>
                  </h3>
                  <p>
                    <T>{area.description}</T>
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="areas__footer">
          <Button href="/programs" dot="end">
            View All Programs
          </Button>
          <div className="areas__arrows">
            <Button plain dot="none" className="icon-button" aria-label={tr(locale, "Previous program area")} onClick={() => swiper.current?.slidePrev()}>
              <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
            </Button>
            <Button plain dot="none" className="icon-button icon-button--next" aria-label={tr(locale, "Next program area")} onClick={() => swiper.current?.slideNext()}>
              <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
