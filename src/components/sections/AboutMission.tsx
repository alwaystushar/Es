"use client";

import { useRef } from "react";
import { aboutMission } from "@/data/about";
import { dictionary } from "@/i18n/dictionary";
import { useLocale } from "@/i18n/locale";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MQ_PHONE, MQ_TABLET } from "@/lib/breakpoints";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

function localize(text: string, locale: string) {
  if (locale !== "ar") return text;
  return dictionary[text] ?? text;
}

export function AboutMission() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const titleSlot = useRef<HTMLHeadingElement>(null);
  const bodySlot = useRef<HTMLParagraphElement>(null);
  const titleMission = useRef<HTMLSpanElement>(null);
  const titleVision = useRef<HTMLSpanElement>(null);
  const bodyMission = useRef<HTMLSpanElement>(null);
  const bodyVision = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  /* CSS stacks mission at tablet — never pin a stacked layout */
  const isTabletDown = useMediaQuery(MQ_TABLET);
  /* Phone: Figma 3129:86771 — pin + Mission→Vision swap on scroll */
  const isPhone = useMediaQuery(MQ_PHONE);
  const { locale } = useLocale();
  const pinActive = !reduced && (isPhone === true || isTabletDown === false);

  const missionTitle = localize(aboutMission.mission.title, locale);
  const missionBody = localize(aboutMission.mission.body, locale);
  const visionTitle = localize(aboutMission.vision.title, locale);
  const visionBody = localize(aboutMission.vision.body, locale);

  useIsomorphicLayoutEffect(() => {
    const root = section.current;
    const pinEl = pin.current;
    const titleSlotEl = titleSlot.current;
    const bodySlotEl = bodySlot.current;
    const titleA = titleMission.current;
    const titleB = titleVision.current;
    const bodyA = bodyMission.current;
    const bodyB = bodyVision.current;
    if (
      !root ||
      !pinEl ||
      !titleSlotEl ||
      !bodySlotEl ||
      !titleA ||
      !titleB ||
      !bodyA ||
      !bodyB ||
      !pinActive
    ) {
      return;
    }

    registerGsap();
    const context = gsap.context(() => {
      // Mission visible; Vision waits below (comes up on scroll down)
      gsap.set([titleA, bodyA], { yPercent: 0 });
      gsap.set([titleB, bodyB], { yPercent: 100 });

      if (isPhone) {
        /* Mobile keeps Figma positions fixed — only the copy swaps */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=140%",
            pin: pinEl,
            scrub: 0.65,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        tl.to({}, { duration: 0.22 })
          .to([titleA, bodyA], { yPercent: -100, ease: "none", duration: 0.56 }, 0.22)
          .to([titleB, bodyB], { yPercent: 0, ease: "none", duration: 0.56 }, 0.22)
          .to({}, { duration: 0.22 });
      } else {
        const rtl = document.documentElement.getAttribute("dir") === "rtl";
        const titleFrom = rtl ? "52.12%" : "28.23%";
        const titleTo = rtl ? "28.23%" : "52.12%";
        const bodyFrom = rtl ? "24.79%" : "42.71%";
        const bodyTo = rtl ? "42.71%" : "24.79%";

        gsap.set(titleSlotEl, { insetInlineStart: titleFrom });
        gsap.set(bodySlotEl, { insetInlineStart: bodyFrom });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=160%",
            pin: pinEl,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        // Scroll down: Mission ↑ out, Vision ↑ in. Scroll up reverses.
        tl.to({}, { duration: 0.18 })
          .to(titleSlotEl, { insetInlineStart: titleTo, ease: "none", duration: 0.82 }, 0.18)
          .to(bodySlotEl, { insetInlineStart: bodyTo, ease: "none", duration: 0.82 }, 0.18)
          .to(titleA, { yPercent: -100, ease: "none", duration: 0.7 }, 0.25)
          .to(titleB, { yPercent: 0, ease: "none", duration: 0.7 }, 0.25)
          .to(bodyA, { yPercent: -100, ease: "none", duration: 0.7 }, 0.28)
          .to(bodyB, { yPercent: 0, ease: "none", duration: 0.7 }, 0.28)
          .to({}, { duration: 0.18 });
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 120);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      context.revert();
    };
  }, [pinActive, isPhone, missionTitle, missionBody, visionTitle, visionBody]);

  return (
    <section ref={section} className="about-mission" data-header-tone="light" aria-labelledby="about-mission-title">
      <div ref={pin} className="about-mission__pin">
        <div className="about-mission__globe" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={aboutMission.globe} alt="" width={704} height={725} />
        </div>

        <h2 id="about-mission-title" ref={titleSlot} className="about-mission__title">
          <span className="about-mission__swap">
            <span ref={titleMission} className="about-mission__swap-item">
              {missionTitle}
            </span>
            <span ref={titleVision} className="about-mission__swap-item" aria-hidden="true">
              {visionTitle}
            </span>
          </span>
        </h2>

        <p ref={bodySlot} className="about-mission__body">
          <span className="about-mission__swap">
            <span ref={bodyMission} className="about-mission__swap-item">
              {missionBody}
            </span>
            <span ref={bodyVision} className="about-mission__swap-item" aria-hidden="true">
              {visionBody}
            </span>
          </span>
        </p>

        <div className="about-mission__static">
          <h2 className="about-mission__title">{visionTitle}</h2>
          <p className="about-mission__body">{visionBody}</p>
        </div>
      </div>
    </section>
  );
}
