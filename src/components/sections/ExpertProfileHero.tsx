import Image from "next/image";
import Link from "next/link";
import { T } from "@/i18n/locale";
import type { Expert } from "@/data/experts";

type ExpertProfileHeroProps = {
  expert: Expert;
};

export function ExpertProfileHero({ expert }: ExpertProfileHeroProps) {
  return (
    <section className="expert-profile-hero" aria-labelledby="expert-profile-name">
      <div className="expert-profile-hero__photo-wrap" aria-hidden="true">
        <Image
          src={expert.photo}
          alt={expert.photoAlt}
          fill
          priority
          sizes="(max-width: 48rem) 100vw, 40vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <div className="expert-profile-hero__content section-container">
        <div className="expert-profile-hero__copy">
          <p className="expert-profile-hero__breadcrumb">
            <Link href="/experts">
              <T>ES Learning Experts</T>
            </Link>
          </p>
          <h1 id="expert-profile-name" className="expert-profile-hero__name">
            {expert.name}
          </h1>
          <p className="expert-profile-hero__role">
            <T>{expert.role}</T>
          </p>
        </div>
      </div>
    </section>
  );
}
