import { T } from "@/i18n/locale";
import { ContactPageForm } from "@/components/forms/ContactPageForm";
import { siteConfig } from "@/config/site";

export function ContactSection() {
  return (
    <section className="contact-section" aria-label="Contact information and form">
      <div className="section-container">
        <div className="contact-section__layout">
          <div className="contact-section__info">
            <div className="contact-section__eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              <T>Get in touch</T>
            </div>
            <h2 className="contact-section__heading">
              <T>Let&apos;s begin with one conversation</T>
            </h2>

            <ul className="contact-details" role="list">
              <li className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="m2 7 10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <a href={siteConfig.emailHref} className="contact-detail__value">
                  {siteConfig.email}
                </a>
              </li>
              <li className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <a href={siteConfig.phoneHref} className="contact-detail__value">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                <span className="contact-detail__value">
                  <T>Riyadh, Saudi Arabia</T>
                </span>
              </li>
            </ul>
          </div>

          <ContactPageForm />
        </div>
      </div>
    </section>
  );
}
