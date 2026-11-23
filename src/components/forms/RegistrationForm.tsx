"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { T, tr, useLocale } from "@/i18n/locale";

type RegistrationFormProps = {
  programTitle?: string;
};

export function RegistrationForm({ programTitle }: RegistrationFormProps) {
  const { locale } = useLocale();
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const fullNameEn = String(data.get("fullNameEn") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();

    if (fullName.length < 2) {
      setReady(false);
      setError("Please enter your full name.");
      return;
    }
    if (fullNameEn.length < 2) {
      setReady(false);
      setError("Please enter your full name in English.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setReady(false);
      setError("Please enter a valid email address.");
      return;
    }
    if (mobile.length < 8) {
      setReady(false);
      setError("Please enter a valid mobile number.");
      return;
    }
    if (!agreed) {
      setReady(false);
      setError("Please agree to the Privacy Policy to continue.");
      return;
    }

    setError("");
    setReady(true);
  };

  return (
    <form className="registration-form" onSubmit={onSubmit} noValidate>
      <div className="registration-form__intro">
        <p className="registration-form__eyebrow">
          <T>Participant Details</T>
        </p>
        <h2 className="registration-form__title">
          <T>Registration Information</T>
        </h2>
        {programTitle ? (
          <p className="registration-form__program">
            <T>Program</T>: <strong>{programTitle}</strong>
          </p>
        ) : null}
      </div>

      <div className="registration-form__fields">
        <label className="registration-field">
          <span className="registration-field__label">
            <T>Full Name</T> <span aria-hidden="true">*</span>
          </span>
          <input
            name="fullName"
            className="registration-field__input"
            type="text"
            autoComplete="name"
            placeholder={tr(locale, "Enter your full name in Arabic")}
            required
          />
        </label>

        <label className="registration-field">
          <span className="registration-field__label">
            <T>Full Name in English</T> <span aria-hidden="true">*</span>
          </span>
          <input
            name="fullNameEn"
            className="registration-field__input"
            type="text"
            autoComplete="name"
            placeholder={tr(locale, "Full Name in English")}
            required
          />
          <span className="registration-field__hint">
            <T>Your English name will be printed on your certificate exactly as entered.</T>
          </span>
        </label>

        <label className="registration-field">
          <span className="registration-field__label">
            <T>Email Address</T> <span aria-hidden="true">*</span>
          </span>
          <input
            name="email"
            className="registration-field__input"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            required
          />
        </label>

        <label className="registration-field">
          <span className="registration-field__label">
            <T>Mobile Number</T> <span aria-hidden="true">*</span>
          </span>
          <input
            name="mobile"
            className="registration-field__input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="05XXXXXXXX"
            required
          />
        </label>

        <label className="registration-field">
          <span className="registration-field__label">
            <T>Employer</T>
          </span>
          <input
            name="employer"
            className="registration-field__input"
            type="text"
            autoComplete="organization"
            placeholder={tr(locale, "Organization Name")}
          />
        </label>
      </div>

      <label className="registration-agree">
        <span className="registration-agree__copy">
          <T>I agree to the use of my information for registration and related services in accordance with the</T>{" "}
          <Link href="/privacy" className="registration-agree__link">
            <T>Privacy Policy</T>
          </Link>
          .
        </span>
        <input
          type="checkbox"
          className="registration-agree__check"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          required
        />
      </label>

      {error ? <p className="form-error">{tr(locale, error)}</p> : null}
      {ready ? (
        <p className="form-success">
          <T>Your registration details look valid and are ready for the next step.</T>
        </p>
      ) : null}

      <Button type="submit" variant="solid" className="registration-form__submit" dot="none">
        Continue Registration
      </Button>

      <p className="registration-form__note">
        <T>After submitting your details, you will proceed to the next step in the current registration process.</T>
      </p>
    </form>
  );
}
