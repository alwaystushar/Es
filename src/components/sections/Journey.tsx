import { aboutJourney } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

type JourneyProps = {
  title?: string;
  body?: string;
  variant?: "home" | "about";
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function Journey({
  title = "Let's build your next learning journey",
  body,
  variant = "home",
  primaryLabel = "Sign In",
  primaryHref,
  secondaryLabel = "View all programs",
  secondaryHref,
}: JourneyProps) {
  const heading = variant === "about" ? aboutJourney.title : title;
  const copy = variant === "about" ? aboutJourney.body : body;

  return (
    <section className="journey" id="contact" data-header-tone="light" aria-labelledby="journey-title">
      <div className="journey__field" aria-hidden="true">
        <img src="/assets/images/journey-field.svg" alt="" width={2055} height={2020} />
      </div>
      <div className="journey__shade" aria-hidden="true" />
      <div className="journey__glow" aria-hidden="true" />
      <div className={["journey__content", variant === "about" ? "journey__content--wide" : ""].filter(Boolean).join(" ")}>
        <RevealLines id="journey-title" as="h2" className="section-title">
          {heading}
        </RevealLines>
        {copy ? (
          <p className="journey__body">
            <T>{copy}</T>
          </p>
        ) : null}
        <div className="journey__actions">
          <Button variant="white" href={primaryHref} dot="start">
            {primaryLabel}
          </Button>
          <Button variant="outline-light" href={secondaryHref} dot="start">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
