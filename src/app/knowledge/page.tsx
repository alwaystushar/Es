import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/home";
import { PageIntro } from "@/components/pages/PageIntro";
import { LocalizedImage, T } from "@/i18n/locale";

export const metadata: Metadata = { title: "Knowledge Hub" };

export default function KnowledgePage() {
  return (
    <PageIntro title="Insights for Better Decisions and Growth" lede="Practical writing for professionals who want learning to change the way they work.">
      <div className="card-list">
        {articles.map((article) => (
          <article key={article.slug} className="plain-card detail-grid">
            <div>
              <p>
                <T>{article.category}</T>
              </p>
              <h2>
                <T>{article.title}</T>
              </h2>
              <p>
                <T>{article.excerpt}</T>
              </p>
              <div style={{ marginTop: "1.5rem" }}>
                <Link href={`/knowledge/${article.slug}`}>
                  <T>Read Article</T>
                </Link>
              </div>
            </div>
            <LocalizedImage src={article.image} alt={article.alt} width={1536} height={1024} quality={90} sizes="(max-width: 48rem) 100vw, 40rem" style={{ width: "100%", height: "auto", borderRadius: "0.75rem" }} />
          </article>
        ))}
      </div>
    </PageIntro>
  );
}
