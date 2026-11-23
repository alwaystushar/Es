import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";
import type { Expert } from "@/data/experts";

type ExpertGridProps = {
  experts: Expert[];
};

export function ExpertGrid({ experts }: ExpertGridProps) {
  return (
    <section className="expert-grid" aria-labelledby="expert-grid-title">
      <div className="expert-grid__wash" aria-hidden="true" />
      <div className="section-container">
        <div className="expert-grid__intro">
          <RevealLines id="expert-grid-title" as="h2" className="expert-grid__title">
            Meet our experts
          </RevealLines>
          <p className="expert-grid__lede">
            <T>Explore experts by discipline, discover their professional backgrounds and see the programs they deliver.</T>
          </p>
        </div>

        <ul className="expert-cards" role="list">
          {experts.map((expert, index) => (
            <li key={expert.slug}>
              <Link href={`/experts/${expert.slug}`} className="expert-card">
                <div className="expert-card__media">
                  <div className="expert-card__backdrop" aria-hidden="true" />
                  {index > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="expert-card__glow"
                      src="/assets/images/experts/card-glow.svg"
                      alt=""
                      width={680}
                      height={779}
                    />
                  ) : null}
                  <div className={`expert-card__photo expert-card__photo--${index + 1}`}>
                    <Image
                      src={expert.photo}
                      alt={expert.photoAlt}
                      fill
                      quality={95}
                      sizes="(max-width: 48rem) 50vw, 25vw"
                      className="expert-card__img"
                    />
                    <div className="expert-card__shade" aria-hidden="true" />
                  </div>
                </div>
                <div className="expert-card__body">
                  <div className="expert-card__stack">
                    <div className="expert-card__copy">
                      <p className="expert-card__name">
                        <T>{expert.name}</T>
                      </p>
                      <p className="expert-card__role">
                        <T>{expert.role}</T>
                      </p>
                    </div>
                    <span className="expert-card__link">
                      <T>View Profile</T>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="expert-grid__action">
          <Button variant="solid" href="/programs">
            Load More Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
