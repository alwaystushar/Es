import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
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
  alt,
  rating,
  reviews,
  duration,
  hours,
  trainerName = "Imran Al-Mikhlafi",
  trainerRole = "Business Process Management Expert",
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
          <Eyebrow light>{badge}</Eyebrow>
          <RevealLines id="program-detail-title" as="h1" className="program-detail-hero__title" playOnMount>
            {title}
          </RevealLines>
          <p className="program-detail-hero__body">
            <T>{description}</T>
          </p>
          <div className="program-detail-hero__actions">
            <Button variant="solid" href="/programs" dot="start">Explore Programs</Button>
          </div>
        </div>

        {(rating || reviews) && (
          <div className="program-detail-hero__meta">
            <div className="program-detail-hero__reviews">
              <span className="program-detail-hero__score">{rating}</span>
              <Stars />
              <span className="program-detail-hero__review-count">· ({reviews})</span>
            </div>
            <div className="program-detail-hero__info">
              {trainerName && (
                <div className="program-detail-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{trainerName}</span>
                </div>
              )}
              {duration && (
                <div className="program-detail-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span><T>{duration}</T></span>
                </div>
              )}
              {hours && (
                <div className="program-detail-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>{hours}</span>
                </div>
              )}
              <div className="program-detail-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 12h4M18 12h4M12 2v4M12 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span><T>Online</T></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
