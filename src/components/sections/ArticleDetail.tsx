import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { RevealImage } from "@/components/animation/RevealImage";
import { Journey } from "@/components/sections/Journey";
import { ArticleShare } from "@/components/sections/ArticleShare";
import { LocalizedImage, T } from "@/i18n/locale";
import type { KnowledgeArticle } from "@/data/knowledge";

type ArticleDetailProps = {
  article: KnowledgeArticle;
  related: KnowledgeArticle[];
};

function publishedText(article: KnowledgeArticle) {
  return article.publishedLabel ?? article.date;
}

export function ArticleDetail({ article, related }: ArticleDetailProps) {
  const heroImage = article.heroImage ?? article.image;
  const sections = article.sections ?? [];
  const bodyFallback = article.body.split("\n\n").filter(Boolean);

  return (
    <>
      <section className="article-hero" data-header-tone="default" aria-labelledby="article-title">
        <div className="article-hero__wash" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="article-hero__glow article-hero__glow--a" src="/assets/images/knowledge/detail/glow-a.svg" alt="" width={756} height={755} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="article-hero__glow article-hero__glow--b" src="/assets/images/knowledge/detail/glow-b.svg" alt="" width={1015} height={897} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="article-hero__glow article-hero__glow--c" src="/assets/images/knowledge/detail/glow-c.svg" alt="" width={1307} height={668} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="article-hero__glow article-hero__glow--d" src="/assets/images/knowledge/detail/glow-d.svg" alt="" width={756} height={707} />
        </div>

        <div className="article-hero__stage" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="article-hero__ring" src="/assets/images/knowledge/detail/hero-ring.svg" alt="" width={1081} height={1081} />
          <div className="article-hero__photo">
            <LocalizedImage
              src={heroImage}
              alt={article.alt}
              fill
              priority
              quality={90}
              sizes="(max-width: 48rem) 90vw, 60vw"
              className="article-hero__photo-img"
            />
            <span className="article-hero__photo-shade" />
          </div>
        </div>

        <div className="section-container article-hero__layout">
          <div className="article-hero__copy">
            <Eyebrow>{article.categoryLabel}</Eyebrow>
            <RevealLines id="article-title" as="h1" className="article-hero__title" playOnMount>
              {article.title}
            </RevealLines>
            {article.lead ? (
              <p className="article-hero__lead">
                <T>{article.lead}</T>
              </p>
            ) : (
              <p className="article-hero__lead">
                <T>{article.excerpt}</T>
              </p>
            )}
            <div className="article-hero__meta">
              <p>
                <T>Published:</T>{" "}
                <span>
                  <T>{publishedText(article)}</T>
                </span>
              </p>
              {article.readTime ? (
                <p>
                  <T>Read time:</T>{" "}
                  <span>
                    <T>{article.readTime}</T>
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="article-body" aria-label="Article">
        <div className="section-container article-body__grid">
          <aside className="article-sidebar">
            {article.contentType ? (
              <div className="article-sidebar__block">
                <h2 className="article-sidebar__label">
                  <T>Content Type</T>
                </h2>
                <p className="article-sidebar__value">
                  <T>{article.contentType}</T>
                </p>
              </div>
            ) : null}
            {article.topic ? (
              <div className="article-sidebar__block">
                <h2 className="article-sidebar__label">
                  <T>Topic</T>
                </h2>
                <p className="article-sidebar__value">
                  <T>{article.topic}</T>
                </p>
              </div>
            ) : null}
            <div className="article-sidebar__block">
              <h2 className="article-sidebar__label">
                <T>Published</T>
              </h2>
              <p className="article-sidebar__value">
                <T>{publishedText(article)}</T>
              </p>
            </div>
            <div className="article-sidebar__block">
              <h2 className="article-sidebar__label">
                <T>Share</T>
              </h2>
              <ArticleShare title={article.title} />
            </div>
          </aside>

          <article className="article-content">
            {article.intro ? (
              <p className="article-content__intro">
                <T>{article.intro}</T>
              </p>
            ) : null}

            {sections.length > 0 ? (
              sections.map((section, index) => (
                <div key={section.heading} className="article-content__section">
                  <h2 className="article-content__heading">
                    <T>{section.heading}</T>
                  </h2>
                  <p className="article-content__text">
                    <T>{section.body}</T>
                  </p>
                  {index === 0 && article.figure ? (
                    <figure className="article-content__figure">
                      <RevealImage className="article-content__figure-media">
                        <LocalizedImage
                          src={article.figure.image}
                          alt={article.figure.alt}
                          fill
                          quality={90}
                          sizes="(max-width: 48rem) 100vw, 46rem"
                        />
                      </RevealImage>
                      <figcaption>
                        <T>{article.figure.caption}</T>
                      </figcaption>
                    </figure>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="article-content__section">
                {bodyFallback.map((para) => (
                  <p key={para.slice(0, 24)} className="article-content__text">
                    <T>{para}</T>
                  </p>
                ))}
              </div>
            )}

            {article.takeaway ? (
              <aside className="article-takeaway">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="article-takeaway__field" src="/assets/images/journey-field.svg" alt="" width={1535} height={1509} />
                <div className="article-takeaway__shade" aria-hidden="true" />
                <div className="article-takeaway__content">
                  <p className="article-takeaway__label">
                    <span className="article-takeaway__dot" aria-hidden="true" />
                    <T>Key takeaway</T>
                  </p>
                  <p className="article-takeaway__text">
                    <T>{article.takeaway}</T>
                  </p>
                </div>
              </aside>
            ) : null}
          </article>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="article-related" aria-labelledby="article-related-title">
          <div className="section-container">
            <div className="article-related__head">
              <RevealLines id="article-related-title" as="h2" className="article-related__title">
                Related Content
              </RevealLines>
              <Button href="/knowledge" className="article-related__cta">
                Knowledge Hub
              </Button>
            </div>
            <div className="article-related__grid">
              {related.map((item) => (
                <Link key={item.slug} href={`/knowledge/${item.slug}`} className="kh-card card-hover">
                  <RevealImage className="kh-card__image">
                    <LocalizedImage
                      src={item.image}
                      alt={item.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 40rem) 100vw, (max-width: 56rem) 50vw, 33vw"
                    />
                    <span className="kh-badge">
                      <T>{item.categoryLabel}</T>
                    </span>
                  </RevealImage>
                  <div className="kh-card__body">
                    <span className="kh-card__date">
                      <T>{item.date}</T>
                    </span>
                    <h3 className="kh-card__title">
                      <T>{item.title}</T>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Journey secondaryHref="/programs" />
    </>
  );
}
