"use client";

import { useMemo, useState } from "react";
import { programCatalog, programFilters, programSubjectAreas } from "@/data/programs";
import { Button } from "@/components/ui/Button";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";

const subjectOptions = programSubjectAreas.map((label) => ({
  value: label,
  label,
}));

export function ProgramsCatalog() {
  const [filter, setFilter] = useState<(typeof programFilters)[number]>("All Programs");
  const [subject, setSubject] = useState<(typeof programSubjectAreas)[number]>("All Subject Areas");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return programCatalog.filter((program) => {
      const matchesFilter = filter === "All Programs" || program.badge === filter;
      const matchesSubject = subject === "All Subject Areas" || program.category === subject;
      const matchesQuery =
        needle === "" ||
        program.title.toLowerCase().includes(needle) ||
        program.description.toLowerCase().includes(needle) ||
        program.category.toLowerCase().includes(needle);
      return matchesFilter && matchesSubject && matchesQuery;
    });
  }, [filter, query, subject]);

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

        <div className="programs-catalog__filters" role="tablist" aria-label="Program filters">
          {programFilters.map((item) => (
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
          ))}
        </div>

        <div className="programs-catalog__grid">
          {visible.map((program) => (
            <article key={program.slug} className="program-list-card card-hover">
              <div className="program-list-card__media">
                <LocalizedImage
                  src={program.image}
                  alt={program.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 48rem) 100vw, 24rem"
                />
                <span className="program-list-card__overlay" aria-hidden="true" />
                <span className="program-list-card__badge">
                  <T>{program.badge}</T>
                </span>
              </div>
              <div className="program-list-card__body">
                <div className="program-list-card__content">
                  <div className="program-list-card__heading">
                    <p className="program-list-card__category">
                      <T>{program.category}</T>
                    </p>
                    <h2>
                      <T>{program.title}</T>
                    </h2>
                    <p className="program-list-card__copy">
                      <T>{program.description}</T>
                    </p>
                  </div>
                  <div className="program-list-card__meta">
                    <div className="program-list-card__reviews">
                      <span>{program.rating}</span>
                      <Stars small />
                      <span className="review-dot" aria-hidden="true" />
                      <span>
                        <T>{program.reviews}</T>
                      </span>
                    </div>
                    <div className="program-list-card__duration">
                      <Icon src="/assets/icons/clock.svg" width={16} height={16} />
                      <span>
                        <T>Duration</T>
                      </span>
                      <span className="review-dot" aria-hidden="true" />
                      <span>
                        <T>{program.duration}</T>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="program-list-card__footer">
                  <div className="program-list-card__fees">
                    <span>
                      <T>Fees</T>
                    </span>
                    <div className="program-list-card__price">
                      <Icon src="/assets/icons/riyal.svg" width={21} height={22} />
                      <strong>{program.price}</strong>
                      <span className="program-list-card__compare">
                        <Icon src="/assets/icons/riyal.svg" width={11} height={11} />
                        {program.compareAt}
                      </span>
                    </div>
                  </div>
                  <Button href={`/programs/${program.slug}`} plain className="program-list-card__cta" dot="none">
                    View Program
                  </Button>
                </div>
              </div>
            </article>
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
