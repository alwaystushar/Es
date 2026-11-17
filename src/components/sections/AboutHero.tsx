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
    if (!root || !pinEl || !contentEl || !fieldEl || !mediaEl || reduced || isPhone) return;

    registerGsap();
    const context = gsap.context(() => {
      const wrap = mediaEl.parentElement as HTMLElement;

      const startSize = () => {
        const ideal = pinEl.clientWidth * (408.301 / 1440);
        const styles = getComputedStyle(pinEl);
        const padY =
          (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
        const gap = pinEl.clientWidth * (40 / 1440);
        const room = pinEl.clientHeight - contentEl.offsetHeight - padY - gap;
        return Math.round(Math.min(ideal, Math.max(room, 0)));
      };
      const endWidth = () => Math.round(pinEl.clientWidth - pinEl.clientWidth * (64 / 1440));
      const endHeight = () => Math.round(pinEl.clientHeight * 0.92);

      const applyStart = () => {
        wrap.classList.remove("is-expanded");
        mediaEl.classList.add("is-masked");
        gsap.set(contentEl, { y: 0, opacity: 1, clearProps: "x" });
        gsap.set(wrap, { alignItems: "flex-end" });
        const size = startSize();
        gsap.set(mediaEl, {
          width: size,
          height: size,
          borderRadius: 0,
          clearProps: "maxWidth,maxHeight",
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
          onRefresh: (self) => {
            if (self.progress < 0.01) applyStart();
          },
          onUpdate: (self) => {
            mediaEl.classList.toggle("is-masked", self.progress < 0.38);
            wrap.classList.toggle("is-expanded", self.progress > 0.4);
            wrap.style.alignItems = self.progress > 0.42 ? "center" : "flex-end";
          },
        },
      });

      /* 1) Text leaves — 2) then the same image opens to cover the stage */
      tl.to(
        contentEl,
        {
          y: () => -pinEl.clientHeight * 0.85,
          opacity: 0,
          ease: "none",
          duration: 0.38,
        },
        0,
      )
        .to(fieldEl, { scale: 1.18, ease: "none", duration: 1 }, 0)
        .fromTo(
          mediaEl,
          {
            width: () => startSize(),
            height: () => startSize(),
            borderRadius: 0,
          },
          {
            width: endWidth,
            height: endHeight,
            borderRadius: 28,
            ease: "none",
            duration: 0.62,
          },
          0.38,
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
