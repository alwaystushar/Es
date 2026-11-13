import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

export function ExpertsHero() {
  return (
    <section className="experts-hero" data-header-tone="light" aria-labelledby="experts-hero-title">
      <div className="experts-hero__media" aria-hidden="true">
        <Image
          src="/assets/images/experts/imran-alt.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="experts-hero__photo"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <div className="experts-hero__shade" />
      </div>
      <div className="experts-hero__layout section-container">
        <div className="experts-hero__copy">
          <RevealLines id="experts-hero-title" as="h1" className="experts-hero__title" playOnMount>
            Practitioner expertise at the heart of learning
          </RevealLines>
          <p className="experts-hero__body">
            <T>Our experts combine specialist knowledge with professional practice to create learning experiences grounded in real workplace challenges.</T>
          </p>
          <div className="experts-hero__actions">
            <Button variant="solid" href="/programs">Explore Programs</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
