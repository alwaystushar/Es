import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/pages/PageIntro";
import { T } from "@/i18n/locale";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <PageIntro
      title="About ES Learning"
      lede="At ES Learning, we believe the true value of training is reflected in how knowledge is applied. Our programs bring learning and practice together, equipping professionals and teams with the skills and tools to work more effectively, make better decisions, and create lasting impact."
    >
      <div className="card-list">
        <article className="plain-card">
          <h2>
            <T>A growing record of impact</T>
          </h2>
          <p>
            <T>10k+ specialists trained, 80+ organizations, 4,100+ learning hours, 300+ programs, and a 95% satisfaction rate.</T>
          </p>
        </article>
        <Button href="/programs">Explore Programs</Button>
      </div>
    </PageIntro>
  );
}
