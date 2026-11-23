"use client";

import { useRef } from "react";
import { aboutHero } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { LocalizedImage } from "@/i18n/locale";
import { RevealLines } from "@/components/animation/RevealLines";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MQ_PHONE } from "@/lib/breakpoints";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

export function AboutHero() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  /* CSS unpins hero at 48rem — keep pin scroll desktop-only */
  const isPhone = useMediaQuery(MQ_PHONE);

  useIsomorphicLayoutEffect(() => {
    const root = section.current;
    const pinEl = pin.current;
    const contentEl = content.current;
    const fieldEl = field.current;
    const mediaEl = media.current;
    /* Wait until MQ is known so we never mount pin GSAP on phone, then tear it down */
    if (!root || !pinEl || !contentEl || !fieldEl || !mediaEl || reduced || isPhone !== false) {
      return;
    }

    registerGsap();
    const context = gsap.context(() => {
      const wrap = mediaEl.parentElement as HTMLElement;

      const startSize = () => Math.round(pinEl.clientWidth * (408.301 / 1440));
      const endWidth = () => Math.round(pinEl.clientWidth - pinEl.clientWidth * (64 / 1440));
      const endHeight = () => Math.round(pinEl.clientHeight * 0.92);
      /*
       * Cold start: sit fully under the centered copy (not overlapping),
       * then rise to the pin center before the scale opens.
       * Media is absolute at 50%/50% with xPercent/yPercent -50, so `y` is
       * an offset from the true center.
       */
      const startY = () => {
        const size = startSize();
        const gap = pinEl.clientWidth * (40 / 1440);
        /* Park just under the copy — slight lift from the previous lower rest pose */
        return Math.round(contentEl.offsetHeight / 2 + gap + size / 2);
      };

      const applyStart = () => {
        mediaEl.classList.add("is-masked");
        wrap.classList.remove("is-expanded");
        const size = startSize();
        gsap.set(contentEl, { y: 0, opacity: 1, clearProps: "x" });
        gsap.set(mediaEl, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: startY(),
          width: size,
          height: size,
          borderRadius: 0,
          opacity: 1,
          clearProps: "maxWidth,maxHeight,margin",
        });
      };

      gsap.set(fieldEl, { scale: 1, transformOrigin: "50% 45%" });
      applyStart();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          pin: pinEl,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: (self) => {
            if (self.progress < 0.02) applyStart();
          },
          onUpdate: (self) => {
            /* Keep the notch until the image has risen and begun opening */
            mediaEl.classList.toggle("is-masked", self.progress < 0.52);
            wrap.classList.toggle("is-expanded", self.progress >= 0.42);
          },
        },
      });

      /*
       * Cold pose is keyed at t=0. fromTo immediateRender was wiping `y`
       * before the rise tween, which caused flicker / stuck overlap.
       * 1) Copy leaves  2) Image rises to center  3) Same image opens wide
       */
      tl.fromTo(
        mediaEl,
        {
          y: () => startY(),
          width: () => startSize(),
          height: () => startSize(),
          borderRadius: 0,
          opacity: 1,
        },
        {
          y: 0,
          width: () => startSize(),
          height: () => startSize(),
          borderRadius: 0,
          opacity: 1,
          ease: "none",
          duration: 0.4,
          immediateRender: true,
        },
        0,
      )
        .to(
          contentEl,
          {
            y: () => -pinEl.clientHeight * 0.85,
            opacity: 0,
            ease: "none",
            duration: 0.34,
          },
          0,
        )
        .to(fieldEl, { scale: 1.18, ease: "none", duration: 1 }, 0)
        .to(
          mediaEl,
          {
            width: endWidth,
            height: endHeight,
            borderRadius: 28,
            ease: "none",
            duration: 0.6,
          },
          0.4,
        );

      requestAnimationFrame(() => {
        applyStart();
        ScrollTrigger.refresh();
      });
    }, root);

    return () => context.revert();
  }, [reduced, isPhone]);

  return (
    <section ref={section} className="about-hero" aria-labelledby="about-hero-title">
      <div ref={pin} className="about-hero__pin">
        <div className="about-hero__wash" aria-hidden="true" />
        <div className="about-hero__field" aria-hidden="true">
          <div ref={field} className="about-hero__field-scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={aboutHero.field} alt="" width={2055} height={2020} />
          </div>
        </div>

        <div ref={content} className="about-hero__content">
          <div className="about-hero__copy">
            <RevealLines id="about-hero-title" as="h1" className="about-hero__title" playOnMount>
              {aboutHero.title}
            </RevealLines>
            <RevealLines as="p" className="about-hero__body" playOnMount duration={0.7} stagger={0.08}>
              {aboutHero.body}
            </RevealLines>
          </div>
          <div className="about-hero__action">
            <Button href="/programs">Explore Programs</Button>
          </div>
        </div>

        <div className="about-hero__media-wrap">
          <div ref={media} className="about-hero__media is-masked">
            <LocalizedImage
              src={aboutHero.image}
              alt={aboutHero.imageAlt}
              fill
              priority
              quality={90}
              sizes="(max-width: 48rem) 90vw, 90vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
