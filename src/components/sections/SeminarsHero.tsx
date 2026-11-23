import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";
import { seminarHero } from "@/data/seminars";

export function SeminarsHero() {
  return (
    <section className="seminars-hero" data-header-tone="light" aria-labelledby="seminars-hero-title">
      <div className="seminars-hero__stage" aria-hidden="true">
        <div className="seminars-hero__ring" />
        <div className="seminars-hero__photo">
          <Image
            src={seminarHero.image}
            alt=""
            fill
            priority
            quality={90}
            sizes="70vw"
            className="seminars-hero__photo-img"
          />
          <div className="seminars-hero__photo-shade" />
        </div>
      </div>

      <div className="seminars-hero__layout section-container">
        <div className="seminars-hero__copy">
          <div className="seminars-hero__text">
            <RevealLines id="seminars-hero-title" as="h1" className="seminars-hero__title" playOnMount>
              {seminarHero.title}
            </RevealLines>
            <p className="seminars-hero__body">
              <T>{seminarHero.body}</T>
            </p>
          </div>
          <div className="seminars-hero__actions">
            <Button variant="white" href={seminarHero.ctaHref}>
              {seminarHero.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
