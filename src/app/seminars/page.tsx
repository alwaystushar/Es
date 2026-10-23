import type { Metadata } from "next";
import { programAreas } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/pages/PageIntro";
import { T } from "@/i18n/locale";

export const metadata: Metadata = { title: "Seminars" };

export default function SeminarsPage() {
  return (
    <PageIntro
      title="Seminars"
      lede="Explore specialized learning areas designed to build skills and knowledge directly relevant to your work."
    >
      <div className="card-list">
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
        <Button href="/contact">Contact Us</Button>
      </div>
    </PageIntro>
  );
}
