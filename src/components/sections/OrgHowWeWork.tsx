import { orgProcessSteps } from "@/data/organization";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

export function OrgHowWeWork() {
  return (
    <section className="org-process" aria-labelledby="org-process-title">
      <div className="section-container">
        <div className="org-process__intro">
          <Eyebrow>How We Work with You</Eyebrow>
          <RevealLines id="org-process-title" as="h2" className="section-title">
            From needs analysis to impact measurement
          </RevealLines>
        </div>

        <div className="org-process__list">
          {orgProcessSteps.map((item) => (
            <article key={item.step} className="org-process__card">
              <span className="org-process__step" aria-hidden="true">
                {item.step}
              </span>
              <div className="org-process__copy">
                <h3>
                  <T>{item.title}</T>
                </h3>
                <p>
                  <T>{item.description}</T>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="org-process__action">
          <Button href="/programs" variant="outline">
            View all programs
          </Button>
        </div>
      </div>
    </section>
  );
}
