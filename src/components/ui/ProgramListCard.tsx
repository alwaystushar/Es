"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { LocalizedImage, T } from "@/i18n/locale";

export type ProgramListCardData = {
  slug: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  rating: string;
  reviews: string;
  duration: string;
  price: string;
  compareAt: string;
};

type ProgramListCardProps = {
  program: ProgramListCardData;
  heading?: "h2" | "h3";
  ctaLabel?: string;
};

function badgeTone(badge: string) {
  if (badge.toLowerCase().includes("exclusive")) return "exclusive";
  if (badge.toLowerCase().includes("public")) return "public";
  return "default";
}

export function ProgramListCard({ program, heading = "h2", ctaLabel = "View Program" }: ProgramListCardProps) {
  const Heading = heading;
  const tone = badgeTone(program.badge);

  return (
    <article className="program-list-card card-hover">
      <div className="program-list-card__media">
        <LocalizedImage
          src={program.image}
          alt={program.alt}
          fill
          quality={90}
          sizes="(max-width: 48rem) 100vw, 20rem"
        />
        <span className="program-list-card__overlay" aria-hidden="true" />
        <span className={["program-list-card__badge", `program-list-card__badge--${tone}`].join(" ")}>
          {tone === "exclusive" ? (
            <Icon src="/assets/icons/star.svg" width={12} height={12} className="program-list-card__badge-icon" />
          ) : null}
          <T>{program.badge}</T>
        </span>
      </div>
      <div className="program-list-card__body">
        <div className="program-list-card__content">
          <div className="program-list-card__heading">
            <p className="program-list-card__category">
              <T>{program.category}</T>
            </p>
            <Heading>
              <T>{program.title}</T>
            </Heading>
            <p className="program-list-card__copy">
              <T>{program.description}</T>
            </p>
          </div>
          <div className="program-list-card__meta">
            <div className="program-list-card__reviews">
              <span>{program.rating}</span>
              <Stars small />
              <span className="review-dot" aria-hidden="true" />
              <span>
                <T>{program.reviews}</T>
              </span>
            </div>
            <div className="program-list-card__duration">
              <Icon src="/assets/icons/clock.svg" width={16} height={16} />
              <span>
                <T>Duration</T>
              </span>
              <span className="review-dot" aria-hidden="true" />
              <span>
                <T>{program.duration}</T>
              </span>
            </div>
          </div>
        </div>
        <div className="program-list-card__footer">
          <div className="program-list-card__fees">
            <span>
              <T>Fees</T>
            </span>
            <div className="program-list-card__price">
              <Icon src="/assets/icons/riyal-green.svg" width={19} height={20} />
              <strong>{program.price}</strong>
              <span className="program-list-card__compare">
                <Icon src="/assets/icons/riyal-muted.svg" width={11} height={11} />
                <span>{program.compareAt}</span>
              </span>
            </div>
          </div>
          <Button href={`/programs/${program.slug}`} plain className="program-list-card__cta" dot="none">
            <T>{ctaLabel}</T>
          </Button>
        </div>
      </div>
    </article>
  );
}
