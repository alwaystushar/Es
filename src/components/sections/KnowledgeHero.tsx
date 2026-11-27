"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { T, tr, useLocale } from "@/i18n/locale";
import type { KnowledgeCategorySlug } from "@/data/knowledge";
import { knowledgeCategories } from "@/data/knowledge";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MQ_PHONE } from "@/lib/breakpoints";
import "swiper/css";

type KnowledgeHeroProps = {
  activeFilter: KnowledgeCategorySlug;
  searchQuery: string;
  onFilterChange: (slug: KnowledgeCategorySlug) => void;
  onSearchChange: (value: string) => void;
};

export function KnowledgeHero({ activeFilter, searchQuery, onFilterChange, onSearchChange }: KnowledgeHeroProps) {
  const { locale } = useLocale();
  const direction = useDocumentDirection();
  const isPhone = useMediaQuery(MQ_PHONE);
  const filterLabel = tr(locale, "Filter articles by category");

  const filterButtons = knowledgeCategories.map((cat) => (
    <button
      key={cat.slug}
      type="button"
      className={`knowledge-page-filter${activeFilter === cat.slug ? " is-active" : ""}`}
      onClick={() => onFilterChange(cat.slug)}
      aria-pressed={activeFilter === cat.slug}
    >
      <T>{cat.label}</T>
    </button>
  ));

  return (
    <section className="knowledge-page-hero" aria-labelledby="knowledge-page-title">
      <div className="section-container knowledge-page-hero__inner">
        <div className="knowledge-page-hero__heading">
          <Eyebrow>Knowledge Hub</Eyebrow>
          <RevealLines id="knowledge-page-title" as="h1" className="knowledge-page-hero__title" playOnMount>
            Insights that bring workplace challenges into focus
          </RevealLines>
          <p className="knowledge-page-hero__body">
            <T>Explore ES Learning articles, updates and resources that help build capabilities and strengthen performance.</T>
          </p>
        </div>

        <div className="knowledge-page-search">
          <div className="knowledge-page-search__bar">
            <div className="knowledge-page-search__input-group">
              <svg className="knowledge-page-search__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                className="knowledge-page-search__input"
                type="search"
                placeholder={tr(locale, "Search the Knowledge Hub")}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label={tr(locale, "Search the Knowledge Hub")}
              />
            </div>
            <button
              type="button"
              className="knowledge-page-search__submit"
              aria-label={tr(locale, "Submit search")}
            >
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {isPhone ? (
            <div className="knowledge-page-filters-track" role="group" aria-label={filterLabel}>
              <Swiper
                key={direction}
                className="knowledge-page-filters-swiper"
                slidesPerView="auto"
                spaceBetween={8}
                dir={direction}
                watchOverflow
              >
                {knowledgeCategories.map((cat) => (
                  <SwiperSlide key={cat.slug} className="knowledge-page-filters-swiper__slide">
                    <button
                      type="button"
                      className={`knowledge-page-filter${activeFilter === cat.slug ? " is-active" : ""}`}
                      onClick={() => onFilterChange(cat.slug)}
                      aria-pressed={activeFilter === cat.slug}
                    >
                      <T>{cat.label}</T>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="knowledge-page-filters" role="group" aria-label={filterLabel}>
              {filterButtons}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
