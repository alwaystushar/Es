import { HeroAudience } from "@/components/sections/HeroAudience";
import { Button } from "@/components/ui/Button";
import { LocalizedImage, T } from "@/i18n/locale";
import { Stars } from "@/components/ui/Stars";
import { RevealImage } from "@/components/animation/RevealImage";
import { Odometer } from "@/components/animation/Odometer";
import { RevealLines } from "@/components/animation/RevealLines";

type HeroProps = {
  variant?: "individual" | "organization";
  title?: string;
  titleLines?: readonly string[];
  body?: string;
  image?: string;
  alt?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showReviews?: boolean;
};

export function Hero({
  variant = "individual",
  title = "From learning to impact you can see",
  titleLines,
  body = "Enhance your capabilities to embrace new opportunities, deepen your knowledge, & advance your professional journey.",
  image = "/assets/images/hero-classroom.webp",
  alt = "Learners and a facilitator working together in a classroom",
  primaryLabel = "Explore Programs",
  primaryHref,
  secondaryLabel,
  secondaryHref,
  showReviews = variant === "individual",
}: HeroProps) {
  const organization = variant === "organization";

  return (
    <section
      className={["hero", organization ? "hero--organization" : ""].filter(Boolean).join(" ")}
      data-header-tone="light"
      aria-labelledby="hero-title"
    >
      <RevealImage className="hero__media" immediate>
        <LocalizedImage src={image} alt={alt} fill priority quality={90} sizes="100vw" />
      </RevealImage>
      <div className="hero__shade" />
      <div className="hero__layout">
        <div className="hero__copy">
          <HeroAudience />
          <div className="hero__stack">
            {titleLines ? (
              <h1 id="hero-title" className="hero__title">
                <span className="loc-en">
                  {titleLines.map((line) => (
                    <span key={line} className="hero__title-line">
                      {line}
                    </span>
                  ))}
                </span>
                <span className="loc-ar">
                  <T>{title}</T>
                </span>
              </h1>
            ) : (
              <RevealLines id="hero-title" as="h1" className="hero__title" playOnMount>
                {title}
              </RevealLines>
            )}
            <RevealLines as="p" className="hero__body" playOnMount duration={0.7} stagger={0.08}>
              {body}
            </RevealLines>
            <div className="hero__actions">
              <Button href={primaryHref}>{primaryLabel}</Button>
              {secondaryLabel ? (
                <Button href={secondaryHref} variant="outline-light" dot="none">
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        {showReviews ? (
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
        ) : null}
      </div>
    </section>
  );
}
