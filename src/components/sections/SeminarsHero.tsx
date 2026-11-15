import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";
import { seminarHero } from "@/data/seminars";

export function SeminarsHero() {
  return (
    <section className="seminars-hero" data-header-tone="default" aria-labelledby="seminars-hero-title">
      <div className="seminars-hero__wash" aria-hidden="true" />
      <div className="seminars-hero__field" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/seminars/hero-field.svg" alt="" width={1390} height={1619} />
      </div>

      <div className="section-container seminars-hero__inner">
        <div className="seminars-hero__copy">
          <div className="seminars-hero__text">
            <RevealLines id="seminars-hero-title" as="h1" className="seminars-hero__title" playOnMount>
              {seminarHero.title}
            </RevealLines>
            <p className="seminars-hero__body">
              <T>{seminarHero.body}</T>
            </p>
          </div>
          <div className="seminars-hero__action">
            <Button href="/programs" variant="solid">
              Explore Programs
            </Button>
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
          <span className="seminars-hero__media-shade" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
