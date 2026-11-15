import { Button } from "@/components/ui/Button";
import { T } from "@/i18n/locale";
import type { Expert } from "@/data/experts";

type ExpertProfileDetailProps = {
  expert: Expert;
};

function Icon({ src, size = 28 }: { src: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} className="expert-detail__icon-img" />
  );
}

export function ExpertProfileDetail({ expert }: ExpertProfileDetailProps) {
  return (
    <section className="expert-detail" aria-label="Expert profile details">
      <div className="section-container expert-detail__layout">
        <div className="expert-detail__main">
          <div className="expert-detail__about-block">
            <h2 className="expert-detail__heading">About the Expert</h2>
            <p className="expert-detail__lede">
              <T>{expert.about}</T>
            </p>
          </div>

          <div className="expert-detail__panels">
            <article className="expert-panel">
              <div className="expert-panel__head">
                <Icon src="/assets/icons/expert-grad.svg" />
                <h3 className="expert-panel__title">Qualifications &amp; Credentials</h3>
              </div>
              <div className="expert-panel__rule" aria-hidden="true" />
              <p className="expert-panel__body">
                <T>{expert.qualifications}</T>
              </p>
            </article>

            <article className="expert-panel">
              <div className="expert-panel__head">
                <Icon src="/assets/icons/expert-book.svg" />
                <h3 className="expert-panel__title">Areas of Expertise</h3>
              </div>
              <div className="expert-panel__rule" aria-hidden="true" />
              <ul className="expert-areas" role="list">
                {expert.areasOfExpertise.map((area) => (
                  <li key={area.title} className="expert-area">
                    <div className="expert-area__header">
                      <Icon src="/assets/icons/expert-arrow.svg" size={24} />
                      <strong className="expert-area__title">
                        <T>{area.title}</T>
                      </strong>
                    </div>
                    <p className="expert-area__desc">
                      <T>{area.description}</T>
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <aside className="expert-detail__sidebar">
          <div className="expert-programs">
            <div className="expert-programs__top">
              <div className="expert-programs__head">
                <Icon src="/assets/icons/expert-book.svg" />
                <h2 className="expert-programs__title">Programs Delivered</h2>
              </div>
              <ul className="expert-programs__list" role="list">
                {expert.programsDelivered.map((program) => (
                  <li key={program.title} className="expert-programs__item">
                    <strong className="expert-programs__item-title">
                      <T>{program.title}</T>
                    </strong>
                    <p className="expert-programs__item-desc">
                      <T>{program.description}</T>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="expert-programs-cta">
              <div className="expert-programs-cta__field" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/experts/profile-cta-field.svg" alt="" width={1535} height={1509} />
              </div>
              <div className="expert-programs-cta__shade" aria-hidden="true" />
              <div className="expert-programs-cta__content">
                <p className="expert-programs-cta__label">
                  <T>Explore programs led by our experts</T>
                </p>
                <p className="expert-programs-cta__sub">
                  <T>Discover professional training programs designed to strengthen your expertise and support your career development.</T>
                </p>
                <Button variant="white" href="/programs">
                  Explore Programs
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
