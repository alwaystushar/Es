import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage } from "@/i18n/locale";
import { seminarHero } from "@/data/seminars";

export function SeminarsHero() {
  return (
    <section className="seminars-hero" aria-labelledby="seminars-hero-title">
      <FieldWash />

      <div className="section-container seminars-hero__inner">
        <div className="seminars-hero__copy">
          <Eyebrow>Seminars</Eyebrow>
          <RevealLines id="seminars-hero-title" as="h1" className="seminars-hero__title" playOnMount>
            {seminarHero.title}
          </RevealLines>
          <RevealLines as="p" className="seminars-hero__body" playOnMount duration={0.7} stagger={0.08}>
            {seminarHero.body}
          </RevealLines>
          <div className="seminars-hero__action">
            <Button href="/seminars#catalog">Explore Seminars</Button>
          </div>
        </div>

        <div className="seminars-hero__media">
          <LocalizedImage
            src={seminarHero.image}
            alt={seminarHero.imageAlt}
            fill
            priority
            quality={90}
            sizes="(max-width: 48rem) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
