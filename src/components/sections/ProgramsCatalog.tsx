"use client";

import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { programCatalog, programFilters, programSubjectAreas } from "@/data/programs";
import { Button } from "@/components/ui/Button";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { ProgramListCard } from "@/components/ui/ProgramListCard";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MQ_PHONE } from "@/lib/breakpoints";
import "swiper/css";

const subjectOptions = programSubjectAreas.map((label) => ({
  value: label,
  label,
}));

export function ProgramsCatalog() {
  const [filter, setFilter] = useState<(typeof programFilters)[number]>("All Programs");
  const [subject, setSubject] = useState<(typeof programSubjectAreas)[number]>("All Subject Areas");
  const [query, setQuery] = useState("");
  const direction = useDocumentDirection();
  const isPhone = useMediaQuery(MQ_PHONE);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return programCatalog.filter((program) => {
      const matchesFilter =
        filter === "All Programs" ||
        (filter === "Public Programs" && program.badge.toLowerCase().includes("public")) ||
        (filter === "Exclusive to ES Learning" &&
          program.badge.toLowerCase().includes("exclusive")) ||
        (filter === "Supported by Hadaf" && program.badge.toLowerCase().includes("hadaf")) ||
        program.badge === filter;
      const matchesSubject = subject === "All Subject Areas" || program.category === subject;
      const matchesQuery =
        needle === "" ||
        program.title.toLowerCase().includes(needle) ||
        program.description.toLowerCase().includes(needle) ||
        program.category.toLowerCase().includes(needle);
      return matchesFilter && matchesSubject && matchesQuery;
    });
  }, [filter, query, subject]);

  const filterChips = programFilters.map((item) => (
    <button
      key={item}
      type="button"
      role="tab"
      aria-selected={filter === item}
      className={["programs-catalog__chip", filter === item ? "is-active" : ""].filter(Boolean).join(" ")}
      onClick={() => setFilter(item)}
    >
      <T>{item}</T>
    </button>
  ));

  return (
    <section className="programs-catalog" aria-labelledby="programs-catalog-title">
      <div className="programs-catalog__wash" aria-hidden="true" />
      <div className="section-container">
        <div className="programs-catalog__intro">
          <Eyebrow>Training Programs</Eyebrow>
          <RevealLines id="programs-catalog-title" as="h1" className="programs-catalog__title" playOnMount>
            Find Your Next Program
          </RevealLines>
        </div>

        <div className="programs-catalog__search">
          <label className="programs-catalog__field">
            <Icon src="/assets/icons/search.svg" width={24} height={24} className="catalog-search-icon" />
            <span className="sr-only">
              <T>Find your perfect course.</T>
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find your perfect course."
            />
          </label>
          <CustomSelect
            value={subject}
            options={subjectOptions}
            placeholder="All Subject Areas"
            ariaLabel="All Subject Areas"
            className="programs-catalog__subject-select"
            onChange={(value) => setSubject(value as (typeof programSubjectAreas)[number])}
          />
        </div>

        {isPhone ? (
          <div className="programs-catalog__filters-track" role="tablist" aria-label="Program filters">
            <Swiper
              key={direction}
              className="programs-catalog-filters-swiper"
              slidesPerView="auto"
              spaceBetween={8}
              dir={direction}
              watchOverflow
            >
              {programFilters.map((item) => (
                <SwiperSlide key={item} className="programs-catalog-filters-swiper__slide">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={filter === item}
                    className={["programs-catalog__chip", filter === item ? "is-active" : ""].filter(Boolean).join(" ")}
                    onClick={() => setFilter(item)}
                  >
                    <T>{item}</T>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="programs-catalog__filters" role="tablist" aria-label="Program filters">
            {filterChips}
          </div>
        )}

        <div className="programs-catalog__grid">
          {visible.map((program) => (
            <ProgramListCard key={program.slug} program={program} />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="programs-catalog__empty">
            <T>No programs match your search. Try adjusting the filters.</T>
          </p>
        ) : null}

        <div className="programs-catalog__more">
          <Button>Load More Programs</Button>
        </div>
      </div>
    </section>
  );
}
