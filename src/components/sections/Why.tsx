"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { whyItems } from "@/data/home";
import { dictionary } from "@/i18n/dictionary";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { Icon } from "@/components/ui/Icon";
import { RevealLines } from "@/components/animation/RevealLines";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MQ_PHONE } from "@/lib/breakpoints";
import { T, tr, useLocale } from "@/i18n/locale";
import "swiper/css";

const whyTitleLines: Record<string, readonly [string, string]> = {
  "Rooted in the Local Context": ["Rooted in the", "Local Context"],
  "Learning Tailored to Your Needs": ["Learning Tailored", "to Your Needs"],
  "Established Global Methodologies": ["Established Global", "Methodologies"],
  "Expertise Shaped by Practice": ["Expertise Shaped", "by Practice"],
  "Knowledge Made Practical": ["Knowledge Made", "Practical"],
};

type WhyItem = {
  title: string;
  description: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
};

type WhyProps = {
  eyebrow?: string;
  title?: string;
  copy?: string | null;
  items?: readonly WhyItem[] | WhyItem[];
};

function WhyCard({
  item,
  expandable = false,
  open = false,
  onToggle,
}: {
  item: WhyItem;
  expandable?: boolean;
  open?: boolean;
  onToggle?: () => void;
}) {
  const lines = whyTitleLines[item.title] ?? [item.title, ""];
  const pointer = useRef<{ x: number; y: number } | null>(null);

  return (
    <article
      className={["why-card", open ? "is-open" : ""].filter(Boolean).join(" ")}
      tabIndex={0}
      aria-expanded={expandable ? open : undefined}
      onPointerDown={
        expandable
          ? (event) => {
              pointer.current = { x: event.clientX, y: event.clientY };
            }
          : undefined
      }
      onClick={
        expandable
          ? (event) => {
              const start = pointer.current;
              pointer.current = null;
              /* Ignore swipe gestures — only toggle on a real tap */
              if (start) {
                const dx = Math.abs(event.clientX - start.x);
                const dy = Math.abs(event.clientY - start.y);
                if (dx >= 10 || dy >= 10) return;
              }
              onToggle?.();
            }
          : undefined
      }
      onKeyDown={
        expandable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle?.();
              }
            }
          : undefined
      }
    >
      <div className="why-card__icon">
        <Icon className="why-card__glyph" src={item.icon} width={item.iconWidth} height={item.iconHeight} />
      </div>
      <div className="why-card__copy">
        <h3>
          <span className="loc-en">
            {lines[0]}
            {lines[1] ? (
              <>
                <br />
                {lines[1]}
              </>
            ) : null}
          </span>
          <span className="loc-ar">{dictionary[item.title] ?? item.title}</span>
        </h3>
        <p>
          <span className="why-card__detail">
            <T>{item.description}</T>
          </span>
        </p>
      </div>
    </article>
  );
}

export function Why({
  eyebrow = "Why ES Learning?",
  title = "Learning you can put to work",
  copy = "The value of a program lies not in how much information it covers, but in how it strengthens the way you think, work, and apply what you learn.",
  items = whyItems,
}: WhyProps) {
  const swiper = useRef<SwiperInstance | null>(null);
  const direction = useDocumentDirection();
  const isPhone = useMediaQuery(MQ_PHONE);
  const { locale } = useLocale();
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const toggleCard = (titleKey: string) => {
    setOpenTitle((current) => (current === titleKey ? null : titleKey));
    requestAnimationFrame(() => swiper.current?.update());
  };

  return (
    <section className="why" aria-labelledby="why-title">
      <FieldWash />
      <div className="section-container">
        <div className="why__intro">
          <Eyebrow>{eyebrow}</Eyebrow>
          <RevealLines id="why-title" as="h2" className="section-title">
            {title}
          </RevealLines>
          {copy ? (
            <RevealLines as="p" className="section-copy" duration={0.7} stagger={0.08}>
              {copy}
            </RevealLines>
          ) : null}
        </div>

        {isPhone ? (
          <>
            <div className="why__stage">
              <Swiper
                key={direction}
                className="why-swiper"
                slidesPerView="auto"
                spaceBetween={12}
                dir={direction}
                watchOverflow
                preventClicks={false}
                preventClicksPropagation={false}
                onSwiper={(instance) => {
                  swiper.current = instance;
                }}
              >
                {items.map((item) => (
                  <SwiperSlide key={item.title} className="why-swiper__slide">
                    <WhyCard
                      item={item}
                      expandable
                      open={openTitle === item.title}
                      onToggle={() => toggleCard(item.title)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="why__arrows">
              <Button
                plain
                dot="none"
                className="icon-button"
                aria-label={tr(locale, "Previous reason")}
                onClick={() => swiper.current?.slidePrev()}
              >
                <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
              </Button>
              <Button
                plain
                dot="none"
                className="icon-button icon-button--next"
                aria-label={tr(locale, "Next reason")}
                onClick={() => swiper.current?.slideNext()}
              >
                <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
              </Button>
            </div>
          </>
        ) : (
          <div className="why-grid">
            {items.map((item) => (
              <WhyCard key={item.title} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
