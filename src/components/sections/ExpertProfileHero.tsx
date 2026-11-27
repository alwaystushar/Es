import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { T } from "@/i18n/locale";
import type { Expert } from "@/data/experts";

type ExpertProfileHeroProps = {
  expert: Expert;
};

export function ExpertProfileHero({ expert }: ExpertProfileHeroProps) {
  return (
    <section className="expert-profile-hero" data-header-tone="default" aria-labelledby="expert-profile-name">
      <div className="expert-profile-hero__wash" aria-hidden="true" />

      {/* Figma 3047:47530 — stipple field behind portrait */}
      <div className="expert-profile-hero__field" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/experts/profile-field.svg" alt="" width={1536} height={1788} />
      </div>

      {/* Figma 3047:47533 — portrait 550.79×660.95 @ 97.21, 117.82 */}
      <div className="expert-profile-hero__photo">
        <Image
          src="/assets/images/experts/profile-hero.webp"
          alt={expert.photoAlt}
          fill
          priority
          sizes="(max-width: 48rem) 80vw, 40vw"
          className="expert-profile-hero__photo-img"
        />
      </div>

      {/* Figma 3047:47534 — bottom fade */}
      <div className="expert-profile-hero__fade" aria-hidden="true" />

      <div className="expert-profile-hero__copy">
        <div className="expert-profile-hero__heading">
          <Link href="/experts" className="expert-profile-hero__eyebrow-link">
            <Eyebrow>ES Learning Experts</Eyebrow>
          </Link>
          <h1 id="expert-profile-name" className="expert-profile-hero__name">
            {expert.name}
          </h1>
        </div>
        <p className="expert-profile-hero__role">
          <T>{expert.role}</T>
        </p>
      </div>
    </section>
  );
}
