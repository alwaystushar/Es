import type { Metadata } from "next";
import { ProgramsCatalog } from "@/components/sections/ProgramsCatalog";
import { Journey } from "@/components/sections/Journey";

export const metadata: Metadata = { title: "Training Programs" };

export default function ProgramsPage() {
  return (
    <main id="main">
      <ProgramsCatalog />
      <Journey variant="programs" />
    </main>
  );
}
