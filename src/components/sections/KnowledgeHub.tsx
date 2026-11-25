"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { articles } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { RevealImage } from "@/components/animation/RevealImage";
import { RevealLines } from "@/components/animation/RevealLines";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MQ_PHONE } from "@/lib/breakpoints";
import { T, tr, useLocale, type Locale } from "@/i18n/locale";
import "swiper/css";

function ArticleCard({
  article,
  locale,
}: {
  article: (typeof articles)[number];
  locale: Locale;
}) {
  return (
    <article className="article-card">
      <RevealImage className="article-card__media">
        <Image
          src={article.image}
          alt={tr(locale, article.alt)}
          fill
          quality={90}
          sizes="(max-width: 48rem) 100vw, 42vw"
        />
        <span className="article-card__tag">
          <span className="review-dot" aria-hidden="true" />
          <T>{article.category}</T>
        </span>
      </RevealImage>
      <h3>
        <T>{article.title}</T>
      </h3>
      <p>
        <T>{article.excerpt}</T>
      </p>
      <span className="article-card__link">
        <T>Read Article</T>
      </span>
    </article>
  );
}

export function KnowledgeHub() {
  const swiper = useRef<SwiperInstance | null>(null);
  const direction = useDocumentDirection();
  const { locale } = useLocale();
  const isPhone = useMediaQuery(MQ_PHONE);
  const [gap, setGap] = useState(28);

  useEffect(() => {
    const apply = () => {
      const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      setGap(Math.round(root * 1.35));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return (
    <section className="knowledge" id="knowledge" aria-labelledby="knowledge-title">
      <div className="section-container">
        <div className="knowledge__top">
          <div className="knowledge__heading">
            <Eyebrow>Knowledge Hub</Eyebrow>
            <RevealLines id="knowledge-title" as="h2" className="section-title">
              Insights for better decisions and growth
            </RevealLines>
          </div>
          {isPhone === false ? (
            <div className="knowledge__arrows">
              <Button plain dot="none" className="icon-button" aria-label={tr(locale, "Previous article")} onClick={() => swiper.current?.slidePrev()}>
                <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
              </Button>
              <Button plain dot="none" className="icon-button icon-button--next" aria-label={tr(locale, "Next article")} onClick={() => swiper.current?.slideNext()}>
                <Icon src="/assets/icons/arrow-a.svg" width={20} height={20} />
              </Button>
            </div>
          ) : null}
        </div>

        {isPhone === true ? (
          <div className="knowledge__list">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <Swiper
            key={direction}
            className="knowledge-swiper"
            dir={direction}
            modules={[Navigation]}
            spaceBetween={gap}
            watchOverflow
            slidesPerView={1.15}
            breakpoints={{
              768: { slidesPerView: 2 },
              1152: { slidesPerView: 3 },
            }}
            onSwiper={(instance) => {
              swiper.current = instance;
            }}
          >
            {articles.map((article) => (
              <SwiperSlide key={article.slug}>
                <ArticleCard article={article} locale={locale} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="knowledge__action">
          <Button variant="outline">
            Explore the Knowledge Hub
          </Button>
        </div>
      </div>
    </section>
  );
}
