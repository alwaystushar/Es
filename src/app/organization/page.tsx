import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { OrgEnquiry } from "@/components/sections/OrgEnquiry";
import { OrgHowWeWork } from "@/components/sections/OrgHowWeWork";
import { Partners } from "@/components/sections/Partners";
import { ProgramAreas } from "@/components/sections/ProgramAreas";
import { Why } from "@/components/sections/Why";
import {
  orgAreasIntro,
  orgHero,
  orgProgramAreas,
  orgWhyIntro,
  orgWhyItems,
} from "@/data/organization";

export const metadata: Metadata = {
  title: "For Organizations",
  description:
    "Learning designed to strengthen capabilities and performance. ES Learning designs tailored solutions around your organization's needs.",
};

export default function OrganizationPage() {
  return (
    <main id="main">
      <Hero
        variant="organization"
        title={orgHero.title}
        titleLines={orgHero.titleLines}
        body={orgHero.body}
        image={orgHero.image}
        alt={orgHero.alt}
        primaryLabel={orgHero.primaryLabel}
        primaryHref={orgHero.primaryHref}
        secondaryLabel={orgHero.secondaryLabel}
        secondaryHref={orgHero.secondaryHref}
        showReviews={false}
      />
      <ProgramAreas
        eyebrow={orgAreasIntro.eyebrow}
        title={orgAreasIntro.title}
        titleLines={orgAreasIntro.titleLines}
        copy={orgAreasIntro.copy}
        areas={orgProgramAreas}
      />
      <Why eyebrow={orgWhyIntro.eyebrow} title={orgWhyIntro.title} copy={null} items={orgWhyItems} />
      <OrgHowWeWork />
      <Partners />
      <OrgEnquiry />
    </main>
  );
}
