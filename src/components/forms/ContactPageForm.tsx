"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { T, tr, useLocale } from "@/i18n/locale";
import { audienceOptions } from "@/data/contact";

export function ContactPageForm() {
  const { locale } = useLocale();
  const [audience, setAudience] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (firstName.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (mobile.length > 0 && mobile.length < 7) {
      setError("Please enter a valid mobile number.");
      return;
    }
    if (message.length < 10) {
      setError("Please describe how we can help (at least 10 characters).");
      return;
    }

    setError("");
    setSent(true);
    event.currentTarget.reset();
    setAudience("");
  };

  return (
    <form className="contact-page-form" onSubmit={onSubmit} noValidate aria-label={tr(locale, "Get in touch form")}>
      <h2 className="contact-page-form__title">
        <T>Get in touch</T>
      </h2>

      <label className="contact-field">
        <span className="contact-field__label">
          <T>I am contacting you as</T>
        </span>
        <div className="contact-field__select-wrap">
          <select
            name="audience"
            className="contact-field__select"
            value={audience}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setAudience(e.target.value)}
            aria-label={tr(locale, "Select: Individual / Professional or Organization")}
          >
            <option value="" disabled>
              {tr(locale, "Select: Individual / Professional or Organization")}
            </option>
            {audienceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {tr(locale, opt)}
              </option>
            ))}
          </select>
          <span className="contact-field__chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </label>

      <div className="contact-field-row">
        <label className="contact-field">
          <span className="contact-field__label">
            <T>First name</T>
          </span>
          <input
            name="firstName"
            className="contact-field__input"
            type="text"
            autoComplete="given-name"
            placeholder={tr(locale, "Enter your full name")}
            required
          />
        </label>
        <label className="contact-field">
          <span className="contact-field__label">
            <T>Email address</T>
          </span>
          <input
            name="email"
            className="contact-field__input"
            type="email"
            autoComplete="email"
            placeholder={tr(locale, "Enter your email address")}
            required
          />
        </label>
      </div>

      <div className="contact-field-row">
        <label className="contact-field">
          <span className="contact-field__label">
            <T>Mobile number</T>
          </span>
          <input
            name="mobile"
            className="contact-field__input"
            type="tel"
            autoComplete="tel"
            placeholder={tr(locale, "Enter your mobile number")}
          />
        </label>
        <label className="contact-field">
          <span className="contact-field__label">
            <T>Organization</T>{" "}
            <span className="contact-field__optional">
              <T>(Optional)</T>
            </span>
          </span>
          <input
            name="organization"
            className="contact-field__input"
            type="text"
            autoComplete="organization"
            placeholder={tr(locale, "Enter your organization")}
          />
        </label>
      </div>

      <label className="contact-field contact-field--full">
        <span className="contact-field__label">
          <T>How can we help?</T>
        </span>
        <textarea
          name="message"
          className="contact-field__textarea"
          placeholder={tr(locale, "Describe your enquiry or requirements")}
          required
        />
      </label>

      {error ? (
        <p className="form-error" role="alert">
          {tr(locale, error)}
        </p>
      ) : null}
      {sent ? (
        <p className="form-success" role="status">
          <T>Thank you. Your message is ready for the ES Learning team.</T>
        </p>
      ) : null}

      <Button type="submit" variant="solid" dot="none" className="contact-page-form__submit">
        Submit Request
      </Button>
    </form>
  );
}
