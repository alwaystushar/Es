import { Button } from "@/components/ui/Button";
import { T } from "@/i18n/locale";
import type { Expert } from "@/data/experts";

type ExpertProfileDetailProps = {
  expert: Expert;
};

export function ExpertProfileDetail({ expert }: ExpertProfileDetailProps) {
  return (
    <section className="expert-detail" aria-label="Expert profile details">
      <div className="section-container">
        <div className="expert-detail__layout">
          {/* Left column */}
          <div className="expert-detail__main">
            <div className="expert-detail__block">
              <h2 className="expert-detail__block-title">About the Expert</h2>
              <p className="expert-detail__about">
                <T>{expert.about}</T>
              </p>
            </div>

            <div className="expert-detail__block expert-detail__block--bordered">
              <div className="expert-detail__block-header">
                <span className="expert-detail__block-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 12v5c3.33 1 6.67 1 10 0v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h2 className="expert-detail__block-title">Qualifications &amp; Credentials</h2>
              </div>
              <p className="expert-detail__about">
                <T>{expert.qualifications}</T>
              </p>
            </div>

            <div className="expert-detail__block expert-detail__block--bordered">
              <div className="expert-detail__block-header">
                <span className="expert-detail__block-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                <h2 className="expert-detail__block-title">Areas of Expertise</h2>
              </div>
              <ul className="expert-areas" role="list">
                {expert.areasOfExpertise.map((area) => (
                  <li key={area.title} className="expert-area">
                    <div className="expert-area__header">
                      <span className="expert-area__arrow" aria-hidden="true">→</span>
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
            </div>
          </div>

          {/* Right column */}
          <div className="expert-detail__sidebar">
            <div className="expert-programs-card">
              <div className="expert-programs-card__header">
                <span className="expert-programs-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h2 className="expert-programs-card__title">Programs Delivered</h2>
              </div>
              <ul className="expert-programs-list" role="list">
                {expert.programsDelivered.map((program) => (
                  <li key={program.title} className="expert-programs-item">
                    <strong className="expert-programs-item__title">
                      <T>{program.title}</T>
                    </strong>
                    <p className="expert-programs-item__desc">
                      <T>{program.description}</T>
                    </p>
                  </li>
                ))}
              </ul>
              <div className="expert-programs-cta">
                <p className="expert-programs-cta__label">
                  <T>Explore programs led by our experts</T>
                </p>
                <p className="expert-programs-cta__sub">
                  <T>Discover professional training programs designed to strengthen your expertise and support your career development.</T>
                </p>
                <Button variant="solid" href="/programs" dot="start">Explore Programs</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
