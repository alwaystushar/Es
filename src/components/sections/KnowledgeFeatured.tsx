import Image from "next/image";
import Link from "next/link";
import { RevealImage } from "@/components/animation/RevealImage";
import { T } from "@/i18n/locale";
import type { KnowledgeArticle } from "@/data/knowledge";

type KnowledgeFeaturedProps = {
  main: KnowledgeArticle;
  side: [KnowledgeArticle, KnowledgeArticle];
};

export function KnowledgeFeatured({ main, side }: KnowledgeFeaturedProps) {
  return (
    <section className="kh-section" aria-labelledby="kh-featured-title">
      <div className="section-container">
        <h2 id="kh-featured-title" className="kh-section__title">
          <T>Featured Content</T>
        </h2>

        <div className="kh-featured">
          {/* Main large card */}
          <Link href={`/knowledge/${main.slug}`} className="kh-featured__main">
            <RevealImage className="kh-featured__main-image">
              <Image
                src={main.image}
                alt={main.alt}
                fill
                quality={90}
                sizes="(max-width: 56rem) 100vw, 50vw"
              />
              <span className="kh-badge" aria-label={main.categoryLabel}>
                <T>{main.categoryLabel}</T>
              </span>
            </RevealImage>
            <div className="kh-featured__main-body">
              <span className="kh-featured__main-date">{main.date}</span>
              <h3 className="kh-featured__main-title">
                <T>{main.title}</T>
              </h3>
            </div>
          </Link>

          {/* Side cards column */}
          <div className="kh-featured__side">
            {side.map((article) => (
              <Link key={article.slug} href={`/knowledge/${article.slug}`} className="kh-side-card">
                <RevealImage className="kh-side-card__image">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 56rem) 100vw, 25vw"
                  />
                  <span className="kh-badge" aria-label={article.categoryLabel}>
                    <T>{article.categoryLabel}</T>
                  </span>
                </RevealImage>
                <div className="kh-side-card__body">
                  <span className="kh-side-card__date">{article.date}</span>
                  <h3 className="kh-side-card__title">
                    <T>{article.title}</T>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
