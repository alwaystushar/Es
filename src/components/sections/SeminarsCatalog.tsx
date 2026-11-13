"use client";

import { useState } from "react";
import Link from "next/link";
import { seminarCatalog, seminarFilters, type SeminarFilter } from "@/data/seminars";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";

export function SeminarsCatalog() {
  const [filter, setFilter] = useState<SeminarFilter>("Upcoming");
  const [query, setQuery] = useState("");

  const visible = seminarCatalog.filter((s) => {
    const matchesFilter = filter === "Upcoming" ? true : s.filter === filter;
    const matchesQuery =
      query.trim() === "" ||
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.trainer.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <section id="catalog" className="seminars-catalog" aria-labelledby="seminars-catalog-title">
      <div className="seminars-catalog__wash" aria-hidden="true" />
      <div className="section-container">
        <div className="seminars-catalog__topbar">
          <div className="seminars-catalog__intro">
            <Eyebrow>Browse</Eyebrow>
            <RevealLines id="seminars-catalog-title" as="h2" className="seminars-catalog__title" playOnMount>
              Seminars
            </RevealLines>
          </div>

          <div className="seminars-catalog__search">
            <label className="seminars-catalog__field">
              <Icon src="/assets/icons/why-frame.svg" width={24} height={24} />
              <span className="sr-only">
                <T>Find your perfect seminar.</T>
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your perfect seminar."
              />
            </label>
            <button type="button" className="seminars-catalog__subject" aria-haspopup="listbox">
              <T>All Subject Areas</T>
              <Icon src="/assets/icons/chevron.svg" width={24} height={24} />
            </button>
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
              <div className="seminar-list-card__photo">
                <LocalizedImage
                  src={seminar.image}
                  alt={seminar.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 48rem) 100vw, 36rem"
                />
                <span className="seminar-list-card__photo-fade" aria-hidden="true" />
              </div>

              <div className="seminar-list-card__body">
                <div className="seminar-list-card__content">
                  <h3 className="seminar-list-card__title">
                    <T>{seminar.title}</T>
                  </h3>

                  <div className="seminar-list-card__meta">
                    <span className="seminar-list-card__meta-item">
                      <Icon src="/assets/icons/person.svg" width={16} height={16} />
                      <T>{seminar.trainer}</T>
                    </span>
                    <span className="seminar-list-card__meta-item">
                      <Icon src="/assets/icons/clock.svg" width={16} height={16} />
                      <T>{seminar.time}</T>
                    </span>
                    <span className="seminar-list-card__meta-item">
                      <Icon src="/assets/icons/calendar.svg" width={16} height={16} />
                      <T>{seminar.date}</T>
                    </span>
                    <span className="seminar-list-card__meta-item">
                      <Icon src="/assets/icons/globe.svg" width={16} height={16} />
                      <T>{seminar.location}</T>
                    </span>
                  </div>

                  <p className="seminar-list-card__description">
                    <T>{seminar.description}</T>
                  </p>
                </div>

                <Link href={`/seminars/${seminar.slug}`} className="btn btn--solid btn--dot-arrow seminar-list-card__cta">
                  <span className="btn__ripple" aria-hidden="true" />
                  <span className="btn__dot" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m12 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="btn__label">
                    <T>Register Now</T>
                  </span>
                </Link>
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
