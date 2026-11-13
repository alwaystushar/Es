import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seminarCatalog } from "@/data/seminars";
import { Journey } from "@/components/sections/Journey";
import { SeminarDetail } from "@/components/sections/SeminarDetail";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seminarCatalog.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seminar = seminarCatalog.find((s) => s.slug === slug);
  return {
    title: seminar ? `${seminar.title} — Seminars` : "Seminar",
    description: seminar?.description,
  };
}

export default async function SeminarPage({ params }: PageProps) {
  const { slug } = await params;
  const seminar = seminarCatalog.find((s) => s.slug === slug);
  if (!seminar) notFound();

  return (
    <main id="main">
      <SeminarDetail seminar={seminar} />
      <Journey />
    </main>
  );
}
