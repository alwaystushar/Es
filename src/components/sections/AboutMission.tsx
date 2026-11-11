"use client";

import { useRef } from "react";
import { aboutMission } from "@/data/about";
import { T } from "@/i18n/locale";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

export function AboutMission() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const globe = useRef<HTMLDivElement>(null);
  const stageA = useRef<HTMLDivElement>(null);
  const stageB = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = section.current;
    const pinEl = pin.current;
    const globeEl = globe.current;
    const a = stageA.current;
    const b = stageB.current;
    if (!root || !pinEl || !globeEl || !a || !b || reduced) return;
    if (window.matchMedia("(max-width: 48rem)").matches) return;

    registerGsap();
    const context = gsap.context(() => {
      const titleA = a.querySelector<HTMLElement>(".about-mission__title");
      const bodyA = a.querySelector<HTMLElement>(".about-mission__body");
      const titleB = b.querySelector<HTMLElement>(".about-mission__title");
      const bodyB = b.querySelector<HTMLElement>(".about-mission__body");

      gsap.set(a, { autoAlpha: 1 });
      gsap.set(b, { autoAlpha: 0 });
      gsap.set([titleA, bodyA], { autoAlpha: 1, xPercent: 0 });
      gsap.set([titleB, bodyB], { autoAlpha: 0, xPercent: 0 });
      gsap.set(globeEl, { left: "25.56%", scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=180%",
          pin: pinEl,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      // Hold Mission, then flip to Vision (Figma Property 1: Default → Variant2)
      tl.to(globeEl, { scale: 1.06, ease: "none", duration: 0.35 }, 0)
        .to(titleA, { autoAlpha: 0, xPercent: 18, ease: "none", duration: 0.4 }, 0.35)
        .to(bodyA, { autoAlpha: 0, xPercent: -18, ease: "none", duration: 0.4 }, 0.35)
        .to(a, { autoAlpha: 0, ease: "none", duration: 0.15 }, 0.6)
        .to(globeEl, { left: "74.44%", scale: 1, ease: "none", duration: 0.55 }, 0.35)
        .to(b, { autoAlpha: 1, ease: "none", duration: 0.15 }, 0.6)
        .fromTo(titleB, { autoAlpha: 0, xPercent: -18 }, { autoAlpha: 1, xPercent: 0, ease: "none", duration: 0.4 }, 0.6)
        .fromTo(bodyB, { autoAlpha: 0, xPercent: 18 }, { autoAlpha: 1, xPercent: 0, ease: "none", duration: 0.4 }, 0.6);
    }, root);

    return () => context.revert();
  }, [reduced]);

  return (
    <section ref={section} className="about-mission" data-header-tone="light" aria-labelledby="about-mission-title">
      <div ref={pin} className="about-mission__pin">
        <div ref={globe} className="about-mission__globe" aria-hidden="true">
          <img src={aboutMission.globe} alt="" width={704} height={725} />
        </div>

        <div ref={stageA} className="about-mission__stage about-mission__stage--mission">
          <h2 id="about-mission-title" className="about-mission__title">
            <T>{aboutMission.mission.title}</T>
          </h2>
          <p className="about-mission__body">
            <T>{aboutMission.mission.body}</T>
          </p>
        </div>

        <div ref={stageB} className="about-mission__stage about-mission__stage--vision" aria-hidden="true">
          <h2 className="about-mission__title">
            <T>{aboutMission.vision.title}</T>
          </h2>
          <p className="about-mission__body">
            <T>{aboutMission.vision.body}</T>
          </p>
        </div>
      </div>
    </section>
  );
}
