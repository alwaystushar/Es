import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/data/home";
import { PageIntro } from "@/components/pages/PageIntro";
import { LocalizedImage, T } from "@/i18n/locale";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: article?.title ?? "Article" };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <PageIntro title={article.title} lede={article.excerpt}>
      <div className="card-list">
        <LocalizedImage src={article.image} alt={article.alt} width={1536} height={1024} quality={90} sizes="(max-width: 48rem) 100vw, 82rem" style={{ width: "100%", height: "auto", borderRadius: "1rem" }} />
        <article className="plain-card">
          <p>
            <T>{article.category}</T>
          </p>
          <p style={{ marginTop: "1rem" }}>
            <T>{article.excerpt}</T>
          </p>
        </article>
      </div>
    </PageIntro>
  );
}
