import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";
import { partnerBodies, partnersPageHero } from "@/data/partners-page";

function PartnerClientStrip() {
  return (
    <div className="partners-row__logos">
      <LocalizedImage
        src="/assets/logos/clients/logo-strip.webp"
        alt="Partner organisations including Aramco, Saudi Customs, SABIC, SCHS, Bank Albilad, and MHRSD"
        width={2382}
        height={204}
        className="partners-row__strip"
      />
    </div>
  );
}

/**
 * Figma 3047:57715 — one continuous Section (1440×2257), not a 100vh hero.
 * Shared wash + field + white overlay sit behind hero copy and partner rows.
 */
export function PartnersSection() {
  return (
    <section className="partners-page" data-header-tone="default" aria-labelledby="partners-hero-title">
      {/* Soft lime/green blobs — Figma 3047:57718 */}
      <div className="partners-page__wash" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="partners-page__glow partners-page__glow--a" src="/assets/images/partners-page/glow-a.svg" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="partners-page__glow partners-page__glow--b" src="/assets/images/partners-page/glow-b.svg" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="partners-page__glow partners-page__glow--c" src="/assets/images/partners-page/glow-c.svg" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="partners-page__glow partners-page__glow--d" src="/assets/images/partners-page/glow-d.svg" alt="" />
      </div>

      {/* Stipple field — Figma 3047:57716 @ y≈1489 of 2257 */}
      <div className="partners-page__field" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/partners-page/hero-field.svg"
          alt=""
          width={2055}
          height={2020}
        />
      </div>

      {/* White fade over field into partner list — Figma 3047:57717 */}
      <div className="partners-page__overlay" aria-hidden="true" />

      {/* Hero copy — Figma Container 3084:114088 @ y=180, h=464, w=796 */}
      <div className="partners-page__hero">
        <div className="section-container partners-page__hero-layout">
          <div className="partners-page__hero-copy">
            <div className="partners-page__hero-heading">
              <Eyebrow>{partnersPageHero.eyebrow}</Eyebrow>
              <RevealLines id="partners-hero-title" as="h1" className="partners-page__title" playOnMount>
                {partnersPageHero.title}
              </RevealLines>
            </div>
            <p className="partners-page__body">
              <T>{partnersPageHero.body}</T>
            </p>
          </div>
          <div className="partners-page__action">
            <Button variant="solid" href={partnersPageHero.ctaHref} dot="start">
              {partnersPageHero.ctaLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Bodies — title @ y=988, list @ y=1206 */}
      <div className="partners-page__bodies" aria-labelledby="partners-accrediting-title">
        <div className="partners-page__inset">
          <RevealLines id="partners-accrediting-title" as="h2" className="partners-page__bodies-title" playOnMount>
            Our partners & accrediting bodies
          </RevealLines>
        </div>

        <div className="partners-page__list">
          {partnerBodies.map((body) => (
            <article key={body.name} className="partners-row">
              <div className="partners-page__inset">
                <div className="partners-row__header">
                  <h3 className="partners-row__name">
                    <T>{body.name}</T>
                  </h3>
                  <p className="partners-row__role">
                    <T>{body.description}</T>
                  </p>
                </div>
                <PartnerClientStrip />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

