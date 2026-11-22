"use client";

import { FormEvent, useMemo, useState } from "react";
import { homeFeaturedPrograms } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { Icon } from "@/components/ui/Icon";
import { ProgramListCard } from "@/components/ui/ProgramListCard";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

export function HomePrograms() {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return homeFeaturedPrograms;
    return homeFeaturedPrograms.filter((program) => {
      return (
        program.title.toLowerCase().includes(needle) ||
        program.description.toLowerCase().includes(needle) ||
        program.category.toLowerCase().includes(needle) ||
        program.badge.toLowerCase().includes(needle)
      );
    });
  }, [query]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="home-programs" id="programs" aria-labelledby="home-programs-title">
      <FieldWash />
      <div className="section-container">
        <div className="home-programs__intro">
          <Eyebrow>Featured Programs</Eyebrow>
          <RevealLines id="home-programs-title" as="h2" className="home-programs__title">
            Find your next program
          </RevealLines>
          <RevealLines as="p" className="home-programs__copy" duration={0.7} stagger={0.08}>
            Browse upcoming programs to find the right fit for your development goals.
          </RevealLines>
        </div>

        <form className="home-programs__search" onSubmit={onSubmit} role="search">
          <label className="home-programs__field">
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
          <button type="submit" className="home-programs__search-btn" aria-label="Search programs">
            <Icon src="/assets/icons/search.svg" width={32} height={32} />
          </button>
        </form>

        <div className="home-programs__grid">
          {visible.map((program) => (
            <ProgramListCard key={program.slug} program={program} heading="h3" />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="programs-catalog__empty">
            <T>No programs match your search. Try adjusting the filters.</T>
          </p>
        ) : null}

        <div className="home-programs__action">
          <Button href="/programs" variant="outline">
            View all programs
          </Button>
        </div>
      </div>
    </section>
  );
}
