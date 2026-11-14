import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";

export function ContactHero() {
  return (
    <section className="contact-hero" data-header-tone="default" aria-labelledby="contact-hero-title">
      <div className="contact-hero__wash" aria-hidden="true" />
      {/* Figma 3047:58731 — 2054.93×2019.99 field, rotate 133.14°, wrapper 2879×2880 */}
      <div className="contact-hero__field" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/contact/hero-field.svg"
          alt=""
          width={2055}
          height={2020}
        />
      </div>
      <div className="section-container contact-hero__layout">
        <Eyebrow>Contact</Eyebrow>
        <RevealLines id="contact-hero-title" as="h1" className="contact-hero__title" playOnMount>
          Let&apos;s start learning something together
        </RevealLines>
        <div className="contact-hero__action">
          <Button variant="solid" href="/signin">
            Sign In
          </Button>
        </div>
      </div>
    </section>
  );
}
