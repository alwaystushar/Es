"use client";

import { useRef, useState } from "react";
import { aboutFoundations } from "@/data/about";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LocalizedImage, T } from "@/i18n/locale";
import { RevealLines } from "@/components/animation/RevealLines";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MQ_PHONE, MQ_TABLET } from "@/lib/breakpoints";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

function FoundationsCount({ index, total }: { index: number; total: number }) {
  return (
    <div className="about-foundations__count" aria-live="polite">
      <span className="about-foundations__count-ring" aria-hidden="true" />
      <span className="about-foundations__count-current">{index + 1}</span>
      <span className="about-foundations__count-total">/ {total}</span>
    </div>
  );
}

export function AboutFoundations() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  /* CSS stacks foundations at tablet — never pin a stacked layout */
  const isTabletDown = useMediaQuery(MQ_TABLET);
  /* Phone: Figma 3129:86751 — pin + scrub cards (same idea as desktop) */
  const isPhone = useMediaQuery(MQ_PHONE);
  const [index, setIndex] = useState(0);
  const total = aboutFoundations.length;
  const pinActive = !reduced && (isPhone === true || isTabletDown === false);

  useIsomorphicLayoutEffect(() => {
    const root = section.current;
    const stageEl = stage.current;
    const trackEl = track.current;
    const bar = progress.current;
    if (!root || !stageEl || !trackEl || !pinActive) return;

    const items = Array.from(trackEl.querySelectorAll<HTMLElement>(".about-foundations__card"));
    if (!items.length) return;

    registerGsap();
    const context = gsap.context(() => {
      const distance = () => {
        /* Use offsetTops so CSS gap between cards is included in the scrub */
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return 0;
        return Math.max(0, last.offsetTop - first.offsetTop);
      };

      const apply = (progress: number) => {
        const d = distance();
        gsap.set(trackEl, { y: -d * progress });
        if (bar) gsap.set(bar, { scaleY: 1 / total + progress * (1 - 1 / total) });
        const next = Math.min(total - 1, Math.floor(progress * total * 0.999));
        setIndex((current) => (current === next ? current : next));
      };

      gsap.set(trackEl, { y: 0 });
      if (bar) gsap.set(bar, { scaleY: 1 / total });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${Math.max(total, 1) * window.innerHeight}`,
        pin: stageEl,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 120);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, [pinActive, total]);

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
            <RevealLines id="about-foundations-title" as="h2" className="about-foundations__title" playOnMount>
              Four foundations of our learning experience
            </RevealLines>
          </div>
          {!isPhone ? <FoundationsCount index={index} total={total} /> : null}
        </div>

        <div className="about-foundations__cards">
          <div ref={track} className="about-foundations__track">
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
                    sizes="(max-width: 48rem) 90vw, 33rem"
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

        {isPhone ? <FoundationsCount index={index} total={total} /> : null}
      </div>
    </section>
  );
}
