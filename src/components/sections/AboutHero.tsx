"use client";

import { useRef } from "react";
import { aboutHero } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { LocalizedImage } from "@/i18n/locale";
import { RevealLines } from "@/components/animation/RevealLines";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

export function AboutHero() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = section.current;
    const pinEl = pin.current;
    const contentEl = content.current;
    const fieldEl = field.current;
    const mediaEl = media.current;
    if (!root || !pinEl || !contentEl || !fieldEl || !mediaEl || reduced) return;
    if (window.matchMedia("(max-width: 48rem)").matches) return;

    registerGsap();
    const context = gsap.context(() => {
      const wrap = mediaEl.parentElement as HTMLElement;
      const startSize = () => {
        /* Figma resting square 408.301 @ 1440 — shrink on short viewports, keep air under CTA */
        const ideal = pinEl.clientWidth * (408.301 / 1440);
        const pinTop = pinEl.getBoundingClientRect().top;
        const contentBottom = contentEl.getBoundingClientRect().bottom - pinTop;
        const padBottom = parseFloat(getComputedStyle(pinEl).paddingBottom) || 0;
        const minGap = pinEl.clientWidth * (56 / 1440);
        const room = pinEl.clientHeight - contentBottom - padBottom - minGap;
        return Math.min(Math.max(room, ideal * 0.55), ideal);
      };
      const endWidth = () => wrap.clientWidth;
      const endHeight = () => Math.min(pinEl.clientHeight * 0.78, wrap.clientHeight);

      gsap.set(fieldEl, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(contentEl, { y: 0, opacity: 1, clearProps: "x" });
      gsap.set(mediaEl, {
        width: startSize(),
        height: startSize(),
        borderRadius: 0,
      });
      mediaEl.classList.add("is-masked");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          pin: pinEl,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            mediaEl.classList.toggle("is-masked", self.progress < 0.22);
          },
        },
      });

      tl.to(
        contentEl,
        {
          y: () => -pinEl.clientHeight * 0.72,
          opacity: 0,
          ease: "none",
          duration: 0.7,
        },
        0,
      )
        .to(
          fieldEl,
          {
            scale: 1.18,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          mediaEl,
          {
            width: endWidth,
            height: endHeight,
            borderRadius: 24,
            ease: "none",
            duration: 1,
          },
          0,
        );
    }, root);

    return () => context.revert();
  }, [reduced]);

  return (
    <section ref={section} className="about-hero" aria-labelledby="about-hero-title">
      <div ref={pin} className="about-hero__pin">
        <div className="about-hero__wash" aria-hidden="true" />
        {/* Figma 3062:71282 — white stipple field, rotate 133.14° */}
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
              sizes="(max-width: 48rem) 90vw, 82rem"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
