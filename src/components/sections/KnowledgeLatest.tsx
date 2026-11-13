import Image from "next/image";
import Link from "next/link";
import { RevealImage } from "@/components/animation/RevealImage";
import { T } from "@/i18n/locale";
import type { KnowledgeArticle } from "@/data/knowledge";

type KnowledgeLatestProps = {
  articles: KnowledgeArticle[];
  title?: string;
};

export function KnowledgeLatest({ articles, title = "Latest Content" }: KnowledgeLatestProps) {
  if (articles.length === 0) {
    return (
      <section className="kh-section">
        <div className="section-container">
          <p className="kh-empty">
            <T>No articles match your search. Try a different keyword or filter.</T>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="kh-section" aria-labelledby="kh-latest-title">
      <div className="section-container">
        <div className="kh-divider" aria-hidden="true" />
        <h2 id="kh-latest-title" className="kh-section__title">
          <T>{title}</T>
        </h2>

        <div className="kh-grid">
          {articles.map((article) => (
            <Link key={article.slug} href={`/knowledge/${article.slug}`} className="kh-card">
              <RevealImage className="kh-card__image">
                <Image
                  src={article.image}
                  alt={article.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 40rem) 100vw, (max-width: 56rem) 50vw, 33vw"
                />
                <span className="kh-badge" aria-label={article.categoryLabel}>
                  <T>{article.categoryLabel}</T>
                </span>
              </RevealImage>
              <div className="kh-card__body">
                <span className="kh-card__date">{article.date}</span>
                <h3 className="kh-card__title">
                  <T>{article.title}</T>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
