"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  seminarCatalog,
  seminarFilters,
  seminarSubjectAreas,
  type SeminarFilter,
} from "@/data/seminars";
import { Button } from "@/components/ui/Button";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Icon } from "@/components/ui/Icon";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";

const subjectOptions = seminarSubjectAreas.map((label) => ({
  value: label,
  label,
}));

function subjectForSeminar(slug: string) {
  if (slug.includes("strategy") || slug.includes("performance")) return "Strategy & Performance";
  if (slug.includes("leadership")) return "Leadership";
  if (slug.includes("policy")) return "Policy Design";
  if (slug.includes("bpm") || slug.includes("process")) return "Process Management";
  if (slug.includes("data")) return "Data & Analytics";
  if (slug.includes("communication")) return "Communication";
  return "All Subject Areas";
}

export function SeminarsCatalog() {
  const [filter, setFilter] = useState<SeminarFilter>("Upcoming");
  const [subject, setSubject] = useState<(typeof seminarSubjectAreas)[number]>("All Subject Areas");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return seminarCatalog.filter((seminar) => {
      const matchesFilter = seminar.filter === filter;
      const matchesSubject = subject === "All Subject Areas" || subjectForSeminar(seminar.slug) === subject;
      const matchesQuery =
        needle === "" ||
        seminar.title.toLowerCase().includes(needle) ||
        seminar.trainer.toLowerCase().includes(needle) ||
        seminar.description.toLowerCase().includes(needle);
      return matchesFilter && matchesSubject && matchesQuery;
    });
  }, [filter, query, subject]);

  return (
    <section id="catalog" className="seminars-catalog" aria-labelledby="seminars-catalog-title">
      <div className="section-container">
        <div className="seminars-catalog__topbar">
          <RevealLines id="seminars-catalog-title" as="h2" className="seminars-catalog__title" playOnMount>
            Seminars
          </RevealLines>

          <div className="seminars-catalog__search">
            <label className="seminars-catalog__field">
              <Icon src="/assets/icons/search.svg" width={24} height={24} className="catalog-search-icon" />
              <span className="sr-only">
                <T>Find your perfect course.</T>
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your perfect course."
              />
            </label>
            <CustomSelect
              value={subject}
              options={subjectOptions}
              placeholder="All Subject Areas"
              ariaLabel="All Subject Areas"
              className="seminars-catalog__subject-select"
              onChange={(value) => setSubject(value as (typeof seminarSubjectAreas)[number])}
            />
          </div>
        </div>

        <div className="seminars-catalog__filters" role="tablist" aria-label="Seminar filters">
          {seminarFilters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={["seminars-catalog__chip", filter === item ? "is-active" : ""].filter(Boolean).join(" ")}
              onClick={() => setFilter(item)}
            >
              <T>{item}</T>
            </button>
          ))}
        </div>

        <div className="seminars-catalog__grid">
          {visible.map((seminar) => (
            <article key={seminar.slug} className="seminar-list-card">
              <div className="seminar-list-card__media">
                <LocalizedImage
                  src={seminar.image}
                  alt={seminar.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 48rem) 100vw, 22rem"
                />
                <span className="seminar-list-card__fade" aria-hidden="true" />
              </div>

              <div className="seminar-list-card__panel">
                <div className="seminar-list-card__body">
                  <div className="seminar-list-card__content">
                    <div className="seminar-list-card__heading">
                      <h3 className="seminar-list-card__title">
                        <T>{seminar.title}</T>
                      </h3>

                      <div className="seminar-list-card__meta">
                        <div className="seminar-list-card__meta-row">
                          <span className="seminar-list-card__meta-item">
                            <Icon src="/assets/icons/person.svg" width={16} height={16} />
                            <T>{seminar.trainer}</T>
                          </span>
                        </div>
                        <div className="seminar-list-card__meta-row seminar-list-card__meta-row--details">
                          <span className="seminar-list-card__meta-item">
                            <Icon src="/assets/icons/clock.svg" width={16} height={16} />
                            <T>{seminar.time}</T>
                          </span>
                          <span className="seminar-list-card__meta-item">
                            <Icon src="/assets/icons/calendar.svg" width={16} height={16} />
                            <T>{seminar.date}</T>
                          </span>
                          <span className="seminar-list-card__meta-item">
                            <Icon src="/assets/icons/program-detail/meta-globe.svg" width={16} height={16} />
                            <T>{seminar.location}</T>
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="seminar-list-card__description">
                      <T>{seminar.description}</T>
                    </p>
                  </div>

                  <Link href={`/seminars/${seminar.slug}`} className="btn btn--solid seminar-list-card__cta">
                    <span className="btn__ripple" aria-hidden="true" />
                    <span className="btn__label">
                      <T>Register Now</T>
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="seminars-catalog__empty">
            <T>No seminars match your search. Try adjusting the filters.</T>
          </p>
        )}

        <div className="seminars-catalog__more">
          <Button>Load More</Button>
        </div>
      </div>
    </section>
  );
}
