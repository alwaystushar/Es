import type { Metadata } from "next";
import { PartnersHero, PartnersAccrediting } from "@/components/sections/PartnersPage";
import { Journey } from "@/components/sections/Journey";

export const metadata: Metadata = {
  title: "Partners",
  description: "ES Learning partners and accrediting bodies — collaborating with specialist organizations to deliver programs grounded in global methodologies.",
};

export default function PartnersPage() {
  return (
    <main id="main">
      <PartnersHero />
      <PartnersAccrediting />
      <Journey />
    </main>
  );
}
