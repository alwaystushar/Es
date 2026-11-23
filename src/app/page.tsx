import { Hero } from "@/components/sections/Hero";
import { HomePrograms } from "@/components/sections/HomePrograms";
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
      <HomePrograms />
      <Impact />
      <Why />
      <ProgramAreas />
      <Partners />
      <KnowledgeHub />
      <Journey />
    </main>
  );
}
