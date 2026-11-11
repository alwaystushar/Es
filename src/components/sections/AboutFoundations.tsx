"use client";

import { useRef, useState } from "react";
import { aboutFoundations } from "@/data/about";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LocalizedImage, T } from "@/i18n/locale";
import { RevealLines } from "@/components/animation/RevealLines";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

export function AboutFoundations() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const total = aboutFoundations.length;

  useIsomorphicLayoutEffect(() => {
    const root = section.current;
    const stageEl = stage.current;
    const cardsEl = cards.current;
    const bar = progress.current;
    if (!root || !stageEl || !cardsEl || reduced) return;
    if (window.matchMedia("(max-width: 48rem)").matches) return;

    const items = Array.from(cardsEl.querySelectorAll<HTMLElement>(".about-foundations__card"));
    if (!items.length) return;

    registerGsap();
    const context = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: 48 });
      gsap.set(items[0], { autoAlpha: 1, y: 0 });
      if (bar) gsap.set(bar, { scaleY: 1 / total });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.max(total, 1) * window.innerHeight}`,
          pin: stageEl,
          scrub: 0.55,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(total - 1, Math.floor(self.progress * total * 0.999));
            setIndex((current) => (current === next ? current : next));
          },
        },
      });

      items.forEach((card, i) => {
        if (i === 0) return;
        const prev = items[i - 1];
        const at = i - 1;
        tl.to(prev, { autoAlpha: 0, y: -36, ease: "none", duration: 1 }, at).to(
          card,
          { autoAlpha: 1, y: 0, ease: "none", duration: 1 },
          at,
        );
        if (bar) {
          tl.to(bar, { scaleY: (i + 1) / total, ease: "none", duration: 1 }, at);
        }
      });
    }, root);

    return () => context.revert();
  }, [reduced, total]);

  return (
    <section ref={section} className="about-foundations" aria-labelledby="about-foundations-title">
      <div ref={stage} className="about-foundations__stage section-container">
        <div className="about-foundations__rail" aria-hidden="true">
          <span className="about-foundations__rail-track" />
          <span ref={progress} className="about-foundations__rail-fill" />
        </div>

        <div className="about-foundations__copy">
          <div className="about-foundations__heading">
            <Eyebrow>What Sets ES Learning Apart?</Eyebrow>
            <RevealLines id="about-foundations-title" as="h2" className="about-foundations__title">
              Four foundations of our learning experience
            </RevealLines>
          </div>
          <div className="about-foundations__count" aria-live="polite">
            <span className="about-foundations__count-ring" aria-hidden="true" />
            <span className="about-foundations__count-current">{index + 1}</span>
            <span className="about-foundations__count-total">/ {total}</span>
          </div>
        </div>

        <div ref={cards} className="about-foundations__cards">
          {aboutFoundations.map((item, i) => (
            <article
              key={item.title}
              className="about-foundations__card"
              aria-hidden={i === index ? undefined : true}
            >
              <div className="about-foundations__media">
                <LocalizedImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 48rem) 100vw, 33rem"
                />
              </div>
              <div className="about-foundations__detail">
                <h3>
                  <T>{item.title}</T>
                </h3>
                <p>
                  <T>{item.description}</T>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
