"use client";

import { useMemo, useState } from "react";
import { KnowledgeHero } from "@/components/sections/KnowledgeHero";
import { KnowledgeFeatured } from "@/components/sections/KnowledgeFeatured";
import { KnowledgeLatest } from "@/components/sections/KnowledgeLatest";
import { Journey } from "@/components/sections/Journey";
import { knowledgeArticles } from "@/data/knowledge";
import type { KnowledgeCategorySlug } from "@/data/knowledge";

export function KnowledgeContent() {
  const [activeFilter, setActiveFilter] = useState<KnowledgeCategorySlug>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const isFiltered = activeFilter !== "all" || searchQuery.trim() !== "";

  const filteredArticles = useMemo(() => {
    return knowledgeArticles.filter((article) => {
      const matchesCategory = activeFilter === "all" || article.category === activeFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const featuredMain = knowledgeArticles[0];
  const featuredSide = [knowledgeArticles[1], knowledgeArticles[2]] as [
    (typeof knowledgeArticles)[number],
    (typeof knowledgeArticles)[number],
  ];
  const latestArticles = knowledgeArticles.slice(3);

  return (
    <main id="main">
      <div className="knowledge-page">
        <div className="knowledge-page__wash" aria-hidden="true" />
        <KnowledgeHero
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchQuery}
        />

        {isFiltered ? (
          <KnowledgeLatest
            articles={filteredArticles}
            title={filteredArticles.length > 0 ? "Search Results" : undefined}
          />
        ) : (
          <>
            <KnowledgeFeatured main={featuredMain} side={featuredSide} />
            <KnowledgeLatest articles={latestArticles} />
          </>
        )}
      </div>

      <Journey
        title="Turn insight into your next step"
        body="Explore training programs or discover our organizational learning solutions."
      />
    </main>
  );
}
