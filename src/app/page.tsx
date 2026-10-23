import { FeaturedPrograms } from "@/components/sections/FeaturedPrograms";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Journey } from "@/components/sections/Journey";
import { KnowledgeHub } from "@/components/sections/KnowledgeHub";
import { Partners } from "@/components/sections/Partners";
import { ProgramAreas } from "@/components/sections/ProgramAreas";
import { Why } from "@/components/sections/Why";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Impact />
      <Why />
      <ProgramAreas />
      <FeaturedPrograms />
      <KnowledgeHub />
      <Partners />
      <Journey />
    </main>
  );
}
