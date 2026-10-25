"use client";

import { FramedPhoto } from "@/components/ui/FramedPhoto";
import Link from "next/link";
import { useRef } from "react";
import { featuredPrograms } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { FieldWash } from "@/components/ui/FieldWash";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { RevealImage } from "@/components/animation/RevealImage";
import { Odometer } from "@/components/animation/Odometer";
import { RevealLines } from "@/components/animation/RevealLines";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { T, tr, useLocale } from "@/i18n/locale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

const programTitleLines = {
  "Developing internal policies for organizations": ["Developing internal", "policies for organizations"],
  "Project Governance": ["Project", "Governance"],
  "Data analysis using Power BI software": ["Data analysis using", "Power BI software"],
  "Rapid Improvement of Business Processes...": ["Rapid Improvement of", "Business Processes..."],
} as const;

export function FeaturedPrograms() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const direction = useDocumentDirection();
  const { locale } = useLocale();

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const sectionEl = section.current;
    const viewportEl = viewport.current;
    const rowEl = row.current;
    if (!sectionEl || !viewportEl || !rowEl) return;
    registerGsap();

    const context = gsap.context(() => {
      gsap.to(rowEl, {
        x: () => {
          const distance = rowEl.scrollWidth - viewportEl.clientWidth;
          return direction === "rtl" ? distance : -distance;
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${Math.max(rowEl.scrollWidth - viewportEl.clientWidth, 1)}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, sectionEl);

    return () => context.revert();
  }, [reduced, direction]);

  return (
    <section className="programs" id="programs" aria-labelledby="programs-title" ref={section}>
      <FieldWash />
      <div className="section-container">
        <div className="programs__intro">
          <Eyebrow>Featured Programs</Eyebrow>
          <RevealLines id="programs-title" as="h2" className="section-title">
            Find your next program
          </RevealLines>
          <RevealLines as="p" className="section-copy" duration={0.7} stagger={0.08}>
            Browse upcoming programs to find the right fit for your development goals.
          </RevealLines>
        </div>
      </div>

      <div className={reduced ? "program-viewport is-free" : "program-viewport"} ref={viewport}>
        <div className="program-row" ref={row}>
          {featuredPrograms.map((program) => (
            <article key={program.slug} className="program-card">
              <RevealImage className="program-card__media">
                <FramedPhoto
                  src={program.image}
                  alt={tr(locale, program.alt)}
                  crop={program.crop}
                  width={1600}
                  height={1100}
                  sizes="(max-width: 48rem) 84vw, 60vw"
                />
              </RevealImage>
              <div className="program-card__body">
                <div>
                  <h3>
                    <span className="loc-en">
                      {programTitleLines[program.title][0]}
                      <br />
                      {programTitleLines[program.title][1]}
                    </span>
                    <span className="loc-ar">{tr("ar", program.title)}</span>
                  </h3>
                  <div className="program-meta">
                    <div className="program-meta__row">
                      <span className="program-meta__cluster">
                        <Odometer value={program.rating} />
                        <Stars small />
                      </span>
                      <span className="review-dot" aria-hidden="true" />
                      <span>
                        <T>{program.reviews}</T>
                      </span>
                    </div>
                    <div className="program-meta__row">
                      <span className="program-meta__cluster">
                        <Icon src="/assets/icons/clock.svg" width={14} height={14} />
                        <T>{program.duration}</T>
                      </span>
                      <span className="review-dot" aria-hidden="true" />
                      <span>
                        <T>{program.hours}</T>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="price-row">
                  <div className="price">
                    <span className="price__current">
                      <Icon src="/assets/icons/riyal.svg" width={22} height={23} />
                      <Odometer value={program.price} />
                    </span>
                    <span className="price__old">
                      <Icon src="/assets/icons/riyal.svg" width={13} height={13} />
                      <Odometer value={program.compareAt} />
                    </span>
                  </div>
                  <Button href={`/programs/${program.slug}`} variant="white" dot="none">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="section-container">
        <div className="programs__action">
          <Button href="/programs" variant="outline">
            View all programs
          </Button>
        </div>
        <p className="sr-only">
          <T>Prices are shown in Saudi Riyals.</T>{" "}
          <Link href="/programs">
            <T>Open the full program list.</T>
          </Link>
        </p>
      </div>
    </section>
  );
}
