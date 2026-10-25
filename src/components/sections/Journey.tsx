import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";

export function Journey() {
  return (
    <section className="journey" id="contact" data-header-tone="light" aria-labelledby="journey-title">
      <div className="journey__field" aria-hidden="true">
        <img src="/assets/images/journey-field.svg" alt="" width={2055} height={2020} />
      </div>
      <div className="journey__shade" aria-hidden="true" />
      <div className="journey__glow" aria-hidden="true" />
      <div className="journey__content">
        <RevealLines id="journey-title" as="h2" className="section-title">
          Let&apos;s build your next learning journey
        </RevealLines>
        <div className="journey__actions">
          <Button href="#contact" variant="white">
            Sign In
          </Button>
          <Button href="#programs" variant="outline-light">
            View all programs
          </Button>
        </div>
      </div>
    </section>
  );
}
