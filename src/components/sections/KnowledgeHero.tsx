import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";
import type { KnowledgeCategorySlug } from "@/data/knowledge";
import { knowledgeCategories } from "@/data/knowledge";

type KnowledgeHeroProps = {
  activeFilter: KnowledgeCategorySlug;
  searchQuery: string;
  onFilterChange: (slug: KnowledgeCategorySlug) => void;
  onSearchChange: (value: string) => void;
};

export function KnowledgeHero({ activeFilter, searchQuery, onFilterChange, onSearchChange }: KnowledgeHeroProps) {
  return (
    <section className="knowledge-page-hero" aria-labelledby="knowledge-page-title">
      <div className="knowledge-page-hero__glows" aria-hidden="true" />
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
                placeholder="Search the Knowledge Hub"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search the Knowledge Hub"
              />
            </div>
            <button
              type="button"
              className="knowledge-page-search__submit"
              aria-label="Submit search"
            >
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="knowledge-page-filters" role="group" aria-label="Filter articles by category">
            {knowledgeCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={`knowledge-page-filter${activeFilter === cat.slug ? " is-active" : ""}`}
                onClick={() => onFilterChange(cat.slug)}
                aria-pressed={activeFilter === cat.slug}
              >
                <T>{cat.label}</T>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
