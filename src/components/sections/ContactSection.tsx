import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { ContactPageForm } from "@/components/forms/ContactPageForm";
import { siteConfig } from "@/config/site";
import { T } from "@/i18n/locale";

function ContactIcon({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={32} height={32} style={{ width: "2rem", height: "2rem" }} />
  );
}

export function ContactSection() {
  return (
    <section className="contact-section" aria-label="Contact information and form">
      <div className="section-container">
        <div className="contact-section__layout">
          <div className="contact-section__info">
            <div className="contact-section__heading-block">
              <Eyebrow>Get in touch</Eyebrow>
              <RevealLines as="h2" className="contact-section__heading">
                Let&apos;s begin with one conversation
              </RevealLines>
            </div>

            <ul className="contact-details" role="list">
              <li className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">
                  <ContactIcon src="/assets/icons/contact-mail.svg" />
                </span>
                <a href={siteConfig.emailHref} className="contact-detail__value">
                  {siteConfig.email}
                </a>
              </li>
              <li className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">
                  <ContactIcon src="/assets/icons/contact-phone.svg" />
                </span>
                <a href={siteConfig.phoneHref} className="contact-detail__value">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">
                  <ContactIcon src="/assets/icons/contact-pin.svg" />
                </span>
                <span className="contact-detail__value">
                  <T>Riyadh, Saudi Arabia</T>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <ContactPageForm />
          </div>
        </div>
      </div>
    </section>
  );
}
