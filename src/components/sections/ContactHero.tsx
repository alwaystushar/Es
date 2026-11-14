import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { FieldWash } from "@/components/ui/FieldWash";

export function ContactHero() {
  return (
    <section className="contact-hero" data-header-tone="default" aria-labelledby="contact-hero-title">
      <FieldWash />
      <div className="contact-hero__field" aria-hidden="true">
        <div className="contact-hero__field-scale">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/journey-field.svg" alt="" width={2055} height={2020} />
        </div>
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
