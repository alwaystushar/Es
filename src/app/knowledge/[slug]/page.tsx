import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { knowledgeArticles } from "@/data/knowledge";
import { ArticleDetail } from "@/components/sections/ArticleDetail";

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

  const related = knowledgeArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main id="main">
      <ArticleDetail article={article} related={related} />
    </main>
  );
}
