import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featuredPrograms, programAreas } from "@/data/home";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageIntro } from "@/components/pages/PageIntro";
import { LocalizedImage } from "@/i18n/locale";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...featuredPrograms, ...programAreas].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = [...featuredPrograms, ...programAreas].find((entry) => entry.slug === slug);
  return { title: item?.title ?? "Program" };
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const featured = featuredPrograms.find((item) => item.slug === slug);
  const area = programAreas.find((item) => item.slug === slug);
  const item = featured ?? area;
  if (!item) notFound();

  return (
    <PageIntro title={item.title} lede={"description" in item ? item.description : "15 days · 64 hours · SAR 2,000, reduced from SAR 2,500."}>
      <div className="detail-grid">
        <LocalizedImage src={item.image} alt={item.alt} width={1600} height={1067} quality={90} sizes="(max-width: 48rem) 100vw, 82rem" style={{ width: "100%", height: "auto", borderRadius: "1rem" }} />
        <ContactForm intent="Enroll in this program" />
      </div>
    </PageIntro>
  );
}
