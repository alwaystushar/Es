"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthPanel } from "@/components/forms/AuthPanel";
import { T, tr, useLocale } from "@/i18n/locale";

export function SignInForm() {
  const { locale } = useLocale();
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email.includes("@") || password.length < 8) {
      setReady(false);
      setError("Enter a valid email and a password of at least 8 characters.");
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
                <T>Log In</T>
              </h1>
              <p className="signin__lede">
                <T>Enter your details to access your programs, session dates and certificates.</T>
              </p>
            </div>

            <div className="signin__fields">
              <label className="signin-field">
                <span className="signin-field__label">
                  <T>Email address</T>
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  required
                />
              </label>

              <label className="signin-field">
                <span className="signin-field__label">
                  <T>Password</T>
                </span>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </label>

              <a href="#forgot" className="signin__forgot">
                <T>Forgot Password?</T>
              </a>
            </div>

            {error ? <p className="form-error">{tr(locale, error)}</p> : null}
            {ready ? (
              <p className="form-success">
                <T>Your details look valid and are ready for sign-in.</T>
              </p>
            ) : null}

            <button type="submit" className="signin__submit">
              <T>Login</T>
            </button>

            <p className="signin__switch">
              <T>{"Don't have an account?"}</T>{" "}
              <Link href="/join" className="signin__link">
                <T>Join Us</T>
              </Link>
            </p>
          </form>
        </div>

        <AuthPanel
          title="From learning to impact you can see"
          titleLines={["From learning to", "impact you can see"]}
        />
      </div>
    </div>
  );
}
