import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

export function ExpertsHero() {
  return (
    <section className="experts-hero" data-header-tone="light" aria-labelledby="experts-hero-title">
      {/* Figma 3047:46588 — full-bleed green + stipple SVG */}
      <div className="experts-hero__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/experts/hero-bg.svg" alt="" width={1440} height={900} />
      </div>

      {/* Figma 3047:46591 — lime ring + circular masked photo */}
      <div className="experts-hero__stage" aria-hidden="true">
        <div className="experts-hero__ring" />
        <div className="experts-hero__photo">
          <Image
            src="/assets/images/experts/hero-photo.webp"
            alt=""
            fill
            priority
            sizes="70vw"
            className="experts-hero__photo-img"
          />
          <div className="experts-hero__photo-shade" />
        </div>
      </div>

      <div className="experts-hero__layout section-container">
        <div className="experts-hero__copy">
          <div className="experts-hero__text">
            <RevealLines id="experts-hero-title" as="h1" className="experts-hero__title" playOnMount>
              Practitioner expertise at the heart of learning
            </RevealLines>
            <p className="experts-hero__body">
              <T>Our experts combine specialist knowledge with professional practice to create learning experiences grounded in real workplace challenges.</T>
            </p>
          </div>
          <div className="experts-hero__actions">
            <Button variant="white" href="/programs">
              Explore Programs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
