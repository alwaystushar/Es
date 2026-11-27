import { aboutJourney } from "@/data/about";
import { programsTeamCta } from "@/data/programs";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

type JourneyVariant = "home" | "about" | "programs";

type JourneyProps = {
  title?: string;
  body?: string;
  variant?: JourneyVariant;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function Journey({
  title = "Let's build your next learning journey",
  body,
  variant = "home",
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: JourneyProps) {
  const isAbout = variant === "about";
  const isPrograms = variant === "programs";

  const heading = isAbout ? aboutJourney.title : isPrograms ? programsTeamCta.title : title;
  const copy = isAbout ? aboutJourney.body : isPrograms ? programsTeamCta.body : body;

  const actionLabel = primaryLabel ?? (isPrograms ? programsTeamCta.action : "Sign In");
  const actionHref = primaryHref ?? (isPrograms ? "/organization" : "/signin");
  const secondLabel = secondaryLabel ?? (isPrograms ? "" : "View all programs");
  const secondHref = secondaryHref ?? "/programs";
  const showSecondary = Boolean(secondLabel);

  return (
    <section
      className={[
        "journey",
        isAbout ? "journey--about" : "",
        isPrograms ? "journey--programs" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id={isPrograms ? undefined : "contact"}
      data-header-tone="light"
      aria-labelledby="journey-title"
    >
      <div className="journey__field" aria-hidden="true">
        <img
          className="journey__field-img journey__field-img--desktop"
          src="/assets/images/journey-field.svg"
          alt=""
          width={2055}
          height={2020}
        />
        <img
          className="journey__field-img journey__field-img--mobile"
          src="/assets/images/journey-field-mobile.svg"
          alt=""
          width={1178}
          height={1158}
        />
      </div>
      <div className="journey__shade" aria-hidden="true" />
      <div className="journey__glow" aria-hidden="true" />
      <div
        className={[
          "journey__content",
          isAbout ? "journey__content--wide" : "",
          isPrograms ? "journey__content--programs" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <RevealLines id="journey-title" as="h2" className="section-title">
          {heading}
        </RevealLines>
        {copy ? (
          <p className="journey__body">
            <T>{copy}</T>
          </p>
        ) : null}
        <div className="journey__actions">
          <Button variant="white" href={actionHref} dot="start">
            {actionLabel}
          </Button>
          {showSecondary ? (
            <Button variant="outline-light" href={secondHref} dot="start">
              {secondLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
