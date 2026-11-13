import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programCatalog } from "@/data/programs";
import { featuredPrograms, programAreas } from "@/data/home";
import { expertCatalog } from "@/data/experts";
import { ProgramDetailHero } from "@/components/sections/ProgramDetailHero";
import { ProgramDetailTabs } from "@/components/sections/ProgramDetailTabs";
import { Journey } from "@/components/sections/Journey";

type PageProps = { params: Promise<{ slug: string }> };

// Combine all program sources
function getAllPrograms() {
  const catalog = programCatalog.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
    alt: p.alt,
    rating: p.rating,
    reviews: p.reviews,
    duration: p.duration,
    hours: undefined as string | undefined,
    price: p.price,
    compareAt: p.compareAt,
    badge: p.badge as string,
  }));

  const featured = featuredPrograms.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: `A practical program delivering skills in ${p.title.toLowerCase()}. Build expertise through applied learning, real-world cases and guided practice.`,
    image: p.image,
    alt: p.alt,
    rating: p.rating,
    reviews: p.reviews,
    duration: p.duration,
    hours: p.hours,
    price: p.price,
    compareAt: p.compareAt,
    badge: "Professional Program",
  }));

  const areas = programAreas.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
    alt: p.alt,
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "5 days",
    hours: "25h",
    price: "1,500",
    compareAt: "2,000",
    badge: "Professional Program",
  }));

  return [...catalog, ...featured, ...areas];
}

export function generateStaticParams() {
  return getAllPrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getAllPrograms().find((p) => p.slug === slug);
  return {
    title: program?.title ?? "Program",
    description: program?.description,
  };
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const programs = getAllPrograms();
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  // Use first expert as default trainer
  const trainer = expertCatalog[0];

  return (
    <main id="main">
      <ProgramDetailHero
        badge={program.badge}
        title={program.title}
        description={program.description}
        image={program.image}
        alt={program.alt}
        rating={program.rating}
        reviews={program.reviews}
        duration={program.duration}
        hours={program.hours}
        trainerName={trainer.name}
        trainerRole={trainer.role}
      />
      <ProgramDetailTabs
        title={program.title}
        price={program.price}
        compareAt={program.compareAt}
        expert={trainer}
      />
      <Journey
        title="Two Development Paths. One Goal: Stronger Performance."
        body="Choose the path that fits — whether you're developing your own skills or seeking training for your organization."
      />
    </main>
  );
}
