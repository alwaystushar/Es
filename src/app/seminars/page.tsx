import type { Metadata } from "next";
import { SeminarsHero } from "@/components/sections/SeminarsHero";
import { SeminarsCatalog } from "@/components/sections/SeminarsCatalog";
import { Journey } from "@/components/sections/Journey";

export const metadata: Metadata = {
  title: "Seminars",
  description: "Expert conversations that broaden your perspective. Join industry experts for in-depth discussions on leadership, strategy, and professional development.",
};

export default function SeminarsPage() {
  return (
    <main id="main">
      <SeminarsHero />
      <SeminarsCatalog />
      <Journey
        title="Keep building your knowledge"
        body="Explore our training programs or stay informed about upcoming seminars and professional events."
        primaryLabel="Explore Programs"
        primaryHref="/programs"
        secondaryLabel="View Upcoming Seminars"
        secondaryHref="/seminars#catalog"
      />
    </main>
  );
}
