import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage } from "@/i18n/locale";
import { partners } from "@/data/home";

const accreditingBodies = [
  { name: "BPTrends Associates", src: "/assets/logos/partner-tregear.webp", width: 288, height: 174 },
  { name: "The Grove", src: "/assets/logos/partner-grove.webp", width: 1000, height: 230 },
  { name: "ISACA", src: "/assets/logos/partner-iaf.webp", width: 853, height: 228 },
  { name: "INIFAC", src: "/assets/logos/partner-inifac.webp", width: 1630, height: 614 },
  { name: "Leadership Strategies", src: "/assets/logos/partner-leadership.webp", width: 360, height: 140 },
  { name: "DETECON Consulting", src: "/assets/logos/partner-detecon.webp", width: 685, height: 211 },
] as const;

export function PartnersHero() {
  return (
    <section className="partners-page-hero" data-header-tone="default" aria-labelledby="partners-hero-title">
      <div className="partners-page-hero__bg" aria-hidden="true" />
      <div className="section-container partners-page-hero__layout">
        <Eyebrow>Partners</Eyebrow>
        <RevealLines id="partners-hero-title" as="h1" className="partners-page-hero__title" playOnMount>
          When expertise comes together, learning goes further
        </RevealLines>
        <p className="partners-page-hero__body">
          We collaborate with local and global specialist organizations to deliver programs informed by established expertise, methodologies and professional recognition.
        </p>
        <div className="partners-page-hero__action">
          <Button variant="solid" href="/programs">Explore Programs</Button>
        </div>
      </div>
    </section>
  );
}

type PartnerRowProps = {
  label: string;
  items: ReadonlyArray<{
    name: string;
    src: string;
    width: number;
    height: number;
  }>;
};

function PartnerRow({ label, items }: PartnerRowProps) {
  return (
    <div className="partners-row">
      <div className="partners-row__header">
        <span className="partners-row__label">{label}</span>
      </div>
      <div className="partners-row__logos">
        {items.map((p) => (
          <div key={p.name} className="partners-row__logo-wrap">
            <LocalizedImage
              src={p.src}
              alt={p.name}
              width={p.width}
              height={p.height}
              className="partner-logo partners-row__logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnersAccrediting() {
  return (
    <section className="partners-accrediting" aria-labelledby="partners-accrediting-title">
      <div className="section-container">
        <RevealLines id="partners-accrediting-title" as="h2" className="partners-accrediting__title">
          Our partners &amp; accrediting bodies
        </RevealLines>
        <div className="partners-accrediting__list">
          <PartnerRow label="Content Partners" items={partners} />
          <PartnerRow label="Accrediting Bodies" items={accreditingBodies} />
          <PartnerRow label="Delivery Partners" items={partners.slice(0, 4)} />
        </div>
      </div>
    </section>
  );
}
