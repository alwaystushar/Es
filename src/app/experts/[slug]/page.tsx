import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { expertCatalog } from "@/data/experts";
import { ExpertProfileHero } from "@/components/sections/ExpertProfileHero";
import { ExpertProfileDetail } from "@/components/sections/ExpertProfileDetail";
import { Journey } from "@/components/sections/Journey";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return expertCatalog.map((expert) => ({ slug: expert.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const expert = expertCatalog.find((e) => e.slug === slug);
  return {
    title: expert ? `${expert.name} — ES Learning Expert` : "Expert Profile",
    description: expert?.about,
  };
}

export default async function ExpertPage({ params }: PageProps) {
  const { slug } = await params;
  const expert = expertCatalog.find((e) => e.slug === slug);
  if (!expert) notFound();

  return (
    <main id="main">
      <ExpertProfileHero expert={expert} />
      <ExpertProfileDetail expert={expert} />
      <Journey
        title="Looking for training for your team?"
        body="We can tailor learning objectives, content and activities to your organization's needs and target audience."
      />
    </main>
  );
}
