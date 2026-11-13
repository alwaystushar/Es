import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { knowledgeArticles } from "@/data/knowledge";
import { Journey } from "@/components/sections/Journey";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = knowledgeArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} — ES Learning`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = knowledgeArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const bodyParagraphs = article.body.split("\n\n").filter(Boolean);

  return (
    <>
      <main id="main" className="article-detail">
        <div className="section-container">
          {/* Cover image */}
          <div className="article-detail__cover">
            <Image
              src={article.image}
              alt={article.alt}
              fill
              quality={90}
              sizes="(max-width: 48rem) 100vw, 92rem"
              priority
            />
          </div>

          {/* Meta row */}
          <div className="article-detail__meta">
            <span className="article-detail__category">
              <T>{article.categoryLabel}</T>
            </span>
            <span className="article-detail__date">{article.date}</span>
          </div>

          {/* Title */}
          <RevealLines as="h1" className="article-detail__title" playOnMount>
            {article.title}
          </RevealLines>

          {/* Body */}
          <div className="article-detail__body">
            {bodyParagraphs.map((para, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static content
              <p key={i}>
                <T>{para}</T>
              </p>
            ))}
          </div>

          {/* Back link */}
          <div className="article-detail__back">
            <Link href="/knowledge" className="article-detail__back-link">
              <T>← Back to Knowledge Hub</T>
            </Link>
          </div>
        </div>
      </main>

      <Journey
        title="Turn insight into your next step"
        body="Explore training programs or discover our organizational learning solutions."
      />
    </>
  );
}
