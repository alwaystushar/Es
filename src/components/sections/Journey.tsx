import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";

export function Journey() {
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="journey__stage" aria-hidden="true">
        <img className="journey__glow" src="/assets/images/journey-glow.png" alt="" width={1308} height={520} />
        <img className="journey__globe" src="/assets/images/journey-globe.svg" alt="" width={861} height={886} />
      </div>
      <div className="journey__content">
        <div>
          <RevealLines id="journey-title" as="h2" className="section-title">
            Let&apos;s build your next learning journey
          </RevealLines>
          <RevealLines as="p" duration={0.7} stagger={0.08}>
            Tell us what your organization wants to achieve, and we&apos;ll help you design a learning solution aligned with your goals.
          </RevealLines>
        </div>
        <div className="journey__actions">
          <Button href="/signin">Sign In</Button>
          <Button href="/programs" variant="outline-dark">
            View all programs
          </Button>
        </div>
      </div>
    </section>
  );
}
