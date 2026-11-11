"use client";

import { useRef } from "react";
import { aboutHero } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { FieldWash } from "@/components/ui/FieldWash";
import { LocalizedImage } from "@/i18n/locale";
import { RevealLines } from "@/components/animation/RevealLines";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

export function AboutHero() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = section.current;
    const pinEl = pin.current;
    const fieldEl = field.current;
    const mediaEl = media.current;
    if (!root || !pinEl || !fieldEl || !mediaEl || reduced) return;
    if (window.matchMedia("(max-width: 48rem)").matches) return;

    registerGsap();
    const context = gsap.context(() => {
      const wrap = mediaEl.parentElement;
      const startSize = () => {
        const room = wrap?.clientHeight || pinEl.clientHeight * 0.45;
        return Math.min(room * 0.98, pinEl.clientWidth * 0.3, 408);
      };
      const endWidth = () => Math.min(pinEl.clientWidth * 0.86, 1152);
      const endHeight = () => Math.min((wrap?.clientHeight || pinEl.clientHeight * 0.55) * 0.98, 640);

      gsap.set(fieldEl, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(mediaEl, {
        y: Math.min(startSize() * 0.12, 40),
        width: startSize(),
        height: startSize(),
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
            pin: pinEl,
            invalidateOnRefresh: true,
          },
        })
        .to(fieldEl, { scale: 1.35, ease: "none", duration: 1 }, 0)
        .to(
          mediaEl,
          {
            y: 0,
            width: endWidth,
            height: endHeight,
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
        <FieldWash />
        <div className="about-hero__field" aria-hidden="true">
          <div ref={field} className="about-hero__field-scale">
            <img src={aboutHero.field} alt="" width={2055} height={2020} />
          </div>
        </div>

        <div className="about-hero__content">
          <div className="about-hero__copy">
            <RevealLines id="about-hero-title" as="h1" className="about-hero__title" playOnMount>
              {aboutHero.title}
            </RevealLines>
            <RevealLines as="p" className="about-hero__body" playOnMount duration={0.7} stagger={0.08}>
              {aboutHero.body}
            </RevealLines>
          </div>
          <div className="about-hero__action">
            <Button>Explore Programs</Button>
          </div>
        </div>

        <div className="about-hero__media-wrap">
          <div ref={media} className="about-hero__media">
            <LocalizedImage
              src={aboutHero.image}
              alt={aboutHero.imageAlt}
              fill
              priority
              quality={90}
              sizes="(max-width: 48rem) 90vw, 72rem"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
