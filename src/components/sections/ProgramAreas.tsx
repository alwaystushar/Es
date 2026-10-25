"use client";

import { FramedPhoto } from "@/components/ui/FramedPhoto";
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
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { T, tr, useLocale } from "@/i18n/locale";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import "swiper/css";

export function ProgramAreas() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const swiper = useRef<SwiperInstance | null>(null);
  const direction = useDocumentDirection();
  const reduced = useReducedMotion();
  const { locale } = useLocale();
  const [forced, setForced] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const apply = () => {
      setForced(!reduced && !window.matchMedia("(max-width: 48rem)").matches);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [reduced]);

  useIsomorphicLayoutEffect(() => {
    if (!forced || generation === 0) return;
    const stageEl = stage.current;
    const instance = swiper.current;
    if (!stageEl || !instance || instance.destroyed) return;
    registerGsap();
    instance.update();

    const travel = () => {
      if (instance.destroyed || !instance.snapGrid?.length) return 1;
      return Math.abs(instance.maxTranslate() - instance.minTranslate());
    };
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stageEl,
        start: "center center",
        end: () => `+=${Math.max(travel(), 1)}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onUpdate: (self) => {
          if (instance.destroyed || !instance.snapGrid?.length) return;
          const start = instance.minTranslate();
          const end = instance.maxTranslate();
          const x = start + (end - start) * self.progress;
          instance.setTransition(0);
          instance.setTranslate(x);
          instance.updateProgress(x);
          instance.updateActiveIndex();
          instance.updateSlidesClasses();
        },
      });
    }, stageEl);

    return () => context.revert();
  }, [forced, generation, direction]);

  const nudge = (step: 1 | -1) => {
    const instance = swiper.current;
    if (!instance) return;
    if (!forced) {
      if (step > 0) instance.slideNext();
      else instance.slidePrev();
      return;
    }
    const slide = instance.slides[0];
    const margin = slide ? Number.parseFloat(getComputedStyle(slide).marginInlineEnd) || 0 : 0;
    window.scrollBy({ top: step * ((slide?.offsetWidth || 0) + margin), behavior: "smooth" });
  };

  return (
    <section className="areas" id="areas" aria-labelledby="areas-title" ref={section}>
      <div className="section-container">
        <div className="areas__heading">
          <Eyebrow small>Program areas</Eyebrow>
          <div className="areas__split">
            <RevealLines id="areas-title" as="h2" className="section-title section-title--display">
              Build the skills to perform better
            </RevealLines>
            <RevealLines as="p" className="section-copy" duration={0.7} stagger={0.08}>
              Explore specialized learning areas designed to build skills and knowledge directly relevant to your work.
            </RevealLines>
          </div>
        </div>
      </div>

      <div className="areas__stage" ref={stage}>
        <div className="section-container">
          <Swiper
            key={direction}
            className="areas-swiper"
            dir={direction}
            slidesPerView="auto"
            spaceBetween={0}
            watchOverflow
            allowTouchMove={!forced}
            onSwiper={(instance) => {
              swiper.current = instance;
              setGeneration((value) => value + 1);
            }}
          >
            {programAreas.map((area) => (
              <SwiperSlide key={area.slug}>
                <article className="area-card">
                  <RevealImage className="area-card__media">
                    <FramedPhoto
                      src={area.image}
                      alt={tr(locale, area.alt)}
                      crop={area.crop}
                      width={1536}
                      height={1024}
                      sizes="(max-width: 48rem) 100vw, 70vw"
                    />
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
        </div>
      </div>

      <div className="section-container">
        <div className="areas__footer">
          <Button href="#programs" dot="end">
            View All Programs
          </Button>
          <div className="areas__arrows">
            <Button plain dot="none" className="icon-button" aria-label={tr(locale, "Previous program area")} onClick={() => nudge(-1)}>
              <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
            </Button>
            <Button plain dot="none" className="icon-button icon-button--next" aria-label={tr(locale, "Next program area")} onClick={() => nudge(1)}>
              <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
