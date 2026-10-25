import { HeroAudience } from "@/components/sections/HeroAudience";
import { Button } from "@/components/ui/Button";
import { LocalizedImage, T } from "@/i18n/locale";
import { Stars } from "@/components/ui/Stars";
import { RevealImage } from "@/components/animation/RevealImage";
import { Odometer } from "@/components/animation/Odometer";
import { RevealLines } from "@/components/animation/RevealLines";

export function Hero() {
  return (
    <section className="hero" data-header-tone="light" aria-labelledby="hero-title">
      <RevealImage className="hero__media" immediate>
        <LocalizedImage
          src="/assets/images/hero-classroom.webp"
          alt="Learners and a facilitator working together in a classroom"
          fill
          priority
          quality={90}
          sizes="100vw"
        />
      </RevealImage>
      <div className="hero__shade" />
      <div className="hero__layout">
        <div className="hero__copy">
          <HeroAudience />
          <div className="hero__stack">
            <RevealLines id="hero-title" as="h1" className="hero__title" playOnMount>
              From learning to impact you can see
            </RevealLines>
            <RevealLines as="p" className="hero__body" playOnMount duration={0.7} stagger={0.08}>
              Enhance your capabilities to embrace new opportunities, deepen your knowledge, & advance your professional journey.
            </RevealLines>
            <div className="hero__actions">
              <Button>Explore Programs</Button>
            </div>
          </div>
        </div>
        <div className="hero__reviews">
          <strong className="hero__score">
            <Odometer value="4.8" playOnMount />
          </strong>
          <Stars />
          <span className="review-dot" aria-hidden="true" />
          <span>
            <T>320 Total Reviews</T>
          </span>
        </div>
      </div>
    </section>
  );
}
