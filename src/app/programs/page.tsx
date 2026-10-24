import type { Metadata } from "next";
import { featuredPrograms, programAreas } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/pages/PageIntro";
import { LocalizedImage, T } from "@/i18n/locale";

export const metadata: Metadata = { title: "Training Programs" };

export default function ProgramsPage() {
  return (
    <PageIntro
      title="Find Your Next Program"
      lede="Browse upcoming programs to find the right fit for your development goals."
    >
      <div className="card-list">
        {featuredPrograms.map((program) => (
          <article key={program.slug} className="plain-card detail-grid">
            <div>
              <h2>
                <T>{program.title}</T>
              </h2>
              <p>
                <T>15 days · 64 hours · SAR 2,000</T>
              </p>
              <div style={{ marginTop: "1.5rem" }}>
                <Button href={`/programs/${program.slug}`}>Enroll Now</Button>
              </div>
            </div>
            <LocalizedImage src={program.image} alt={program.alt} width={1600} height={1067} quality={90} sizes="(max-width: 48rem) 100vw, 40rem" style={{ borderRadius: "0.75rem", width: "100%", height: "auto" }} />
          </article>
        ))}
        {programAreas.map((area) => (
          <article key={area.slug} className="plain-card">
            <h2>
              <T>{area.title}</T>
            </h2>
            <p>
              <T>{area.description}</T>
            </p>
          </article>
        ))}
      </div>
    </PageIntro>
  );
}
