import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { T } from "@/i18n/locale";

type ProgramDetailHeroProps = {
  badge?: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  rating?: string;
  reviews?: string;
  duration?: string;
  hours?: string;
  trainerName?: string;
  trainerRole?: string;
};

export function ProgramDetailHero({
  badge = "Professional Program",
  title,
  description,
  image,
  rating,
  reviews,
  trainerName = "Imran Al-Mikhlafi",
}: ProgramDetailHeroProps) {
  return (
    <section className="program-detail-hero" data-header-tone="light" aria-labelledby="program-detail-title">
      <div className="program-detail-hero__media" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="program-detail-hero__shade" />
      </div>

      <div className="program-detail-hero__layout section-container">
        <div className="program-detail-hero__copy">
          <div className="program-detail-hero__copy-main">
            <div className="program-detail-hero__heading">
              <div className="program-detail-hero__heading-text">
                <Eyebrow light>{badge}</Eyebrow>
                <RevealLines id="program-detail-title" as="h1" className="program-detail-hero__title" playOnMount>
                  {title}
                </RevealLines>
              </div>
              <p className="program-detail-hero__body">
                <T>{description}</T>
              </p>
            </div>
            <div className="program-detail-hero__actions">
              <Button variant="solid" href="/programs" dot="start">
                Explore Programs
              </Button>
            </div>
          </div>

          {(rating || reviews) && (
            <div className="program-detail-hero__reviews">
              <span className="program-detail-hero__score">{rating}</span>
              <Stars />
              <span className="review-dot program-detail-hero__dot" aria-hidden="true" />
              <span className="program-detail-hero__review-count">({reviews})</span>
            </div>
          )}
        </div>

        <div className="program-detail-hero__info">
          {trainerName ? (
            <div className="program-detail-meta-item">
              <Icon src="/assets/icons/program-detail/meta-person.svg" width={16} height={16} />
              <span>{trainerName}</span>
            </div>
          ) : null}
          <div className="program-detail-meta-item">
            <Icon src="/assets/icons/program-detail/meta-calendar.svg" width={16} height={16} />
            <span>
              <T>Dec 2nd, 2026</T>
            </span>
          </div>
          <div className="program-detail-meta-item">
            <Icon src="/assets/icons/program-detail/meta-clock.svg" width={16} height={16} />
            <span>4 Pm</span>
          </div>
          <div className="program-detail-meta-item">
            <Icon src="/assets/icons/program-detail/meta-globe.svg" width={16} height={16} />
            <span>
              <T>Online</T>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
