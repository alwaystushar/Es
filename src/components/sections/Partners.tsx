import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";

export function Partners() {
  return (
    <section className="partners" id="partners" aria-labelledby="partners-title">
      <div className="section-container">
        <div className="partners__top">
          <div>
            <Eyebrow>Partners</Eyebrow>
            <RevealLines id="partners-title" as="h2" className="section-title partners__title">
              Our Global Partners
            </RevealLines>
          </div>
          <RevealLines as="p" className="section-copy" duration={0.7} stagger={0.08}>
            We collaborate with specialist organizations to deliver programs grounded in global methodologies and standards.
          </RevealLines>
        </div>
      </div>

      <PartnerMarquee />

      <div className="section-container partners__action">
        <Button href="/partners" variant="outline">
          Meet Our Partners
        </Button>
      </div>
    </section>
  );
}
