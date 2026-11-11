import type { Metadata } from "next";
import { AboutExperts } from "@/components/sections/AboutExperts";
import { AboutFoundations } from "@/components/sections/AboutFoundations";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutValues } from "@/components/sections/AboutValues";
import { Journey } from "@/components/sections/Journey";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main id="main">
      <AboutHero />
      <AboutFoundations />
      <AboutMission />
      <AboutValues />
      <AboutExperts />
      <Journey variant="about" />
    </main>
  );
}
