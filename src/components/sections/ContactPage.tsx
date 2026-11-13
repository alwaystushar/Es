"use client";

import { useState, type FormEvent } from "react";
import { contactFaqs, contactHero, contactIntro } from "@/data/contact";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { RevealLines } from "@/components/animation/RevealLines";
import { T, tr, useLocale } from "@/i18n/locale";

export function ContactPageSection() {
  const { locale } = useLocale();
  const [openFaq, setOpenFaq] = useState(0);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || !email.includes("@") || mobile.length < 8 || message.length < 12) {
      setSent(false);
      setError("Add your name, a valid email, mobile number, and a message of at least 12 characters.");
      return;
    }
    setError("");
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <FieldWash />
        <div className="section-container contact-hero__content">
          <Eyebrow>{contactHero.eyebrow}</Eyebrow>
          <RevealLines id="contact-hero-title" as="h1" className="contact-hero__title" playOnMount>
            {contactHero.title}
          </RevealLines>
          <Button href={contactHero.ctaHref}>{contactHero.cta}</Button>
        </div>
      </section>

      <section className="contact-panel" aria-labelledby="contact-panel-title">
        <div className="section-container contact-panel__grid">
          <div className="contact-panel__info">
            <Eyebrow>{contactIntro.eyebrow}</Eyebrow>
            <RevealLines id="contact-panel-title" as="h2" className="contact-panel__title">
              {contactIntro.title}
            </RevealLines>
            <p>
              <T>{contactIntro.body}</T>
            </p>
            <ul className="contact-panel__details">
              <li>
                <a href={siteConfig.emailHref}>{siteConfig.email}</a>
              </li>
              <li>
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </li>
              <li>
                <T>Riyadh, Saudi Arabia</T>
              </li>
            </ul>
          </div>

          <form className="contact-panel__form" onSubmit={onSubmit} noValidate>
            <label className="field">
              <span>
                <T>I am contacting you as</T>
              </span>
              <select name="audience" defaultValue="">
                <option value="" disabled>
                  Select: Individual / Professional or Organization
                </option>
                <option value="individual">Individual / Professional</option>
                <option value="organization">Organization</option>
              </select>
            </label>
            <label className="field">
              <span>
                <T>Full name</T>
              </span>
              <input name="name" autoComplete="name" placeholder="Enter your full name" required />
            </label>
            <label className="field">
              <span>
                <T>Email address</T>
              </span>
              <input name="email" type="email" autoComplete="email" placeholder="Enter your email address" required />
            </label>
            <label className="field">
              <span>
                <T>Mobile number</T>
              </span>
              <input name="mobile" type="tel" autoComplete="tel" placeholder="Enter your mobile number" required />
            </label>
            <label className="field">
              <span>
                <T>Organization (Optional)</T>
              </span>
              <input name="organization" autoComplete="organization" placeholder="Enter your organization" />
            </label>
            <label className="field">
              <span>
                <T>How can we help?</T>
              </span>
              <textarea name="message" placeholder="Describe your enquiry or requirements" required />
            </label>
            {error ? <p className="form-error">{tr(locale, error)}</p> : null}
            {sent ? (
              <p className="form-success">
                <T>Thank you. Your message is ready for the ES Learning team.</T>
              </p>
            ) : null}
            <Button type="submit">Submit Request</Button>
          </form>
        </div>
      </section>

      <section className="contact-faq" aria-labelledby="contact-faq-title">
        <div className="section-container">
          <RevealLines id="contact-faq-title" as="h2" className="contact-faq__title">
            Frequently Asked Questions
          </RevealLines>
          <div className="contact-faq__list">
            {contactFaqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.id} className={["contact-faq__item", open ? "is-open" : ""].filter(Boolean).join(" ")}>
                  <button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)}>
                    <T>{item.question}</T>
                  </button>
                  {open ? (
                    <p>
                      <T>{item.answer}</T>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
