import type { Metadata } from "next";
import { ExpertsHero } from "@/components/sections/ExpertsHero";
import { ExpertGrid } from "@/components/sections/ExpertGrid";
import { Journey } from "@/components/sections/Journey";
import { expertCatalog } from "@/data/experts";

export const metadata: Metadata = {
  title: "Our Experts",
  description: "Explore ES Learning's practitioner experts — discover their professional backgrounds and the programs they deliver.",
};

export default function ExpertsPage() {
  return (
    <main id="main">
      <ExpertsHero />
      <ExpertGrid experts={expertCatalog} />
      <Journey
        title="Interested in Training with ES Learning?"
        body="If you bring practical and training experience in one of our specialist areas, we'd be pleased to hear from you."
      />
    </main>
  );
}
