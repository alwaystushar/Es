"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthPanel } from "@/components/forms/AuthPanel";
import { T, tr, useLocale } from "@/i18n/locale";

export function JoinForm() {
  const { locale } = useLocale();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const usernameOk = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    const fullName = String(data.get("fullName") ?? "").trim();
    const user = String(data.get("username") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (phone.length < 8 || fullName.length < 2 || !/^[a-zA-Z0-9_]{3,20}$/.test(user)) {
      setReady(false);
      setError("Complete phone, full name, and a valid username (3–20 characters).");
      return;
    }
    if (password.length < 12 || password.length > 20) {
      setReady(false);
      setError("Password must be 12–20 characters with mixed case, numbers, and symbols.");
      return;
    }

    setError("");
    setReady(true);
  };

  return (
    <div className="signin">
      <div className="signin__wash" aria-hidden="true">
        <img className="signin__glow signin__glow--a" src="/assets/images/auth/glow-a.svg" alt="" width={756} height={755} />
        <img className="signin__glow signin__glow--b" src="/assets/images/auth/glow-b.svg" alt="" width={1015} height={897} />
        <img className="signin__glow signin__glow--c" src="/assets/images/auth/glow-c.svg" alt="" width={1307} height={668} />
        <img className="signin__glow signin__glow--d" src="/assets/images/auth/glow-d.svg" alt="" width={756} height={707} />
      </div>

      <div className="signin__card">
        <div className="signin__form-side">
          <form className="signin__form" onSubmit={onSubmit} noValidate>
            <div className="signin__heading">
              <h1 className="signin__title">
                <T>Join Us</T>
              </h1>
              <p className="signin__lede">
                <T>Create your account to access programs, session dates and certificates.</T>
              </p>
            </div>

            <div className="signin__fields">
              <label className="signin-field">
                <span className="signin-field__label">
                  <T>Phone number</T>
                </span>
                <span className="signin-field__phone">
                  <span className="signin-field__dial" aria-hidden="true">
                    <span className="signin-field__flag">🇸🇦</span>
                    <span>+966</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="5X XXX XXXX"
                    required
                  />
                </span>
              </label>

              <div className="signin-field-row">
                <label className="signin-field">
                  <span className="signin-field__label">
                    <T>Full Name</T>
                  </span>
                  <input
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder={tr(locale, "Your full name")}
                    required
                  />
                </label>
                <label className="signin-field">
                  <span className="signin-field__label">
                    <T>Username</T>
                  </span>
                  <span className="signin-field__with-icon">
                    <input
                      name="username"
                      type="text"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      required
                    />
                    {usernameOk ? (
                      <span className="signin-field__check" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                          <circle cx="10" cy="10" r="9" fill="#1f6f4e" />
                          <path
                            d="M6 10.2 8.6 12.8 14 7.4"
                            stroke="#fff"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </span>
                </label>
              </div>

              <label className="signin-field">
                <span className="signin-field__label">
                  <T>Password</T>
                </span>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  minLength={12}
                  maxLength={20}
                />
              </label>

              <p className="signin__hint">
                <T>
                  At least 12 characters, no more than 20 characters. Uppercase letters, lowercase letters, numbers, and
                  symbols.
                </T>
              </p>
            </div>

            {error ? <p className="form-error">{tr(locale, error)}</p> : null}
            {ready ? (
              <p className="form-success">
                <T>Your details look valid and are ready to create your account.</T>
              </p>
            ) : null}

            <button type="submit" className="signin__submit">
              <T>Continue</T>
            </button>

            <p className="signin__switch">
              <T>Already have an account?</T>{" "}
              <Link href="/signin" className="signin__link">
                <T>Log in</T>
              </Link>
            </p>
          </form>
        </div>

        <AuthPanel title="Start your Journey" />
      </div>
    </div>
  );
}
