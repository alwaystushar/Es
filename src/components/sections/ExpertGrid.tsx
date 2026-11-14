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
          {experts.map((expert) => (
            <li key={expert.slug}>
              <Link href={`/experts/${expert.slug}`} className="expert-card card-hover">
                <div className="expert-card__media reveal-image">
                  <Image
                    src={expert.photo}
                    alt={expert.photoAlt}
                    fill
                    sizes="(max-width: 48rem) 50vw, 25vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <div className="expert-card__body">
                  <div className="expert-card__info">
                    <p className="expert-card__name">{expert.name}</p>
                    <p className="expert-card__role">{expert.role}</p>
                  </div>
                  <span className="expert-card__link" aria-hidden="true">
                    <T>View Profile</T>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="expert-grid__action">
          <Button variant="outline" href="/experts">Load More Experts</Button>
        </div>
      </div>
    </section>
  );
}
