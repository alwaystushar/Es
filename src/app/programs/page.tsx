import type { Metadata } from "next";
import { ProgramsCatalog } from "@/components/sections/ProgramsCatalog";
import { ProgramsTeamCta } from "@/components/sections/ProgramsTeamCta";

export const metadata: Metadata = { title: "Training Programs" };

export default function ProgramsPage() {
  return (
    <main id="main">
      <ProgramsCatalog />
      <ProgramsTeamCta />
    </main>
  );
}
