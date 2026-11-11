import { programsTeamCta } from "@/data/programs";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

export function ProgramsTeamCta() {
  return (
    <section className="journey journey--programs" data-header-tone="light" aria-labelledby="programs-team-title">
      <div className="journey__field" aria-hidden="true">
        <img src="/assets/images/journey-field.svg" alt="" width={2055} height={2020} />
      </div>
      <div className="journey__shade" aria-hidden="true" />
      <div className="journey__glow" aria-hidden="true" />
      <div className="journey__content journey__content--wide">
        <RevealLines id="programs-team-title" as="h2" className="section-title">
          {programsTeamCta.title}
        </RevealLines>
        <p className="journey__body">
          <T>{programsTeamCta.body}</T>
        </p>
        <div className="journey__actions">
          <Button variant="white">{programsTeamCta.action}</Button>
        </div>
      </div>
    </section>
  );
}
