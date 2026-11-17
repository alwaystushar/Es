"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { T, tr, useLocale } from "@/i18n/locale";

type Mode = "join" | "signin";

const STEPS = [
  { n: 1, label: "Register your account" },
  { n: 2, label: "Set up your profile information" },
  { n: 3, label: "Choose your learning path" },
] as const;

export function SignInForm() {
  const { locale } = useLocale();
  const [mode, setMode] = useState<Mode>("join");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const usernameOk = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");

    if (mode === "signin") {
      const email = String(data.get("email") ?? "").trim();
      if (!email.includes("@") || password.length < 8) {
        setReady(false);
        setError("Enter a valid email and a password of at least 8 characters.");
        return;
      }
    } else {
      const phone = String(data.get("phone") ?? "").trim();
      const fullName = String(data.get("fullName") ?? "").trim();
      const user = String(data.get("username") ?? "").trim();
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
    }

    setError("");
    setReady(true);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setReady(false);
    setShowPassword(false);
  };

  return (
    <div className="signin">
      <div className="signin__card">
        <aside className="signin__panel" aria-hidden={false}>
          <Link href="/" className="signin__brand" aria-label={tr(locale, "ES Learning home")}>
            <Icon src="/assets/logos/logo-white.svg" width={40} height={40} />
            <span>ES Learning</span>
          </Link>

          <div className="signin__panel-copy">
            <span className="signin__badge">
              <T>Join Us to Build</T>
            </span>
            <h2 className="signin__panel-title">
              <T>Start your Journey</T>
            </h2>
            <p className="signin__panel-lede">
              <T>Follow these simple steps to set up your account.</T>
            </p>
          </div>

          <ol className="signin__steps">
            {STEPS.map((step, index) => (
              <li
                key={step.n}
                className={["signin__step", index === 0 ? "is-active" : ""].filter(Boolean).join(" ")}
              >
                <span className="signin__step-num" aria-hidden="true">
                  {step.n}
                </span>
                <span className="signin__step-label">
                  <T>{step.label}</T>
                </span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="signin__form-side">
          <form className="signin__form" onSubmit={onSubmit} noValidate>
            <h1 className="signin__title">
              <T>{mode === "join" ? "Join Us" : "Sign In"}</T>
            </h1>

            {mode === "join" ? (
              <>
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
              </>
            ) : (
              <label className="signin-field">
                <span className="signin-field__label">
                  <T>Email</T>
                </span>
                <input name="email" type="email" autoComplete="email" placeholder="name@company.com" required />
              </label>
            )}

            <label className="signin-field">
              <span className="signin-field__label">
                <T>Password</T>
              </span>
              <span className="signin-field__with-icon">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "join" ? "new-password" : "current-password"}
                  required
                  minLength={mode === "join" ? 12 : 8}
                  maxLength={mode === "join" ? 20 : undefined}
                />
                <button
                  type="button"
                  className="signin-field__eye"
                  aria-label={showPassword ? tr(locale, "Hide password") : tr(locale, "Show password")}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A10 10 0 0 1 12 5c5 0 9.3 3.1 11 7.5a12.4 12.4 0 0 1-4.2 5.1M6.1 6.1A12.5 12.5 0 0 0 1 12.5C2.7 16.9 7 20 12 20a10 10 0 0 0 4.4-1"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                      <path
                        d="M1 12.5C2.7 8.1 7 5 12 5s9.3 3.1 11 7.5C21.3 16.9 17 20 12 20S2.7 16.9 1 12.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              </span>
            </label>

            {mode === "join" ? (
              <p className="signin__hint">
                <T>
                  At least 12 characters, no more than 20 characters. Uppercase letters, lowercase letters, numbers, and
                  symbols.
                </T>
              </p>
            ) : null}

            {error ? <p className="form-error">{tr(locale, error)}</p> : null}
            {ready ? (
              <p className="form-success">
                <T>
                  {mode === "join"
                    ? "Your details look valid and are ready to create your account."
                    : "Your details look valid and are ready for sign-in."}
                </T>
              </p>
            ) : null}

            <button type="submit" className="signin__submit">
              <T>{mode === "join" ? "Continue" : "Sign In"}</T>
            </button>

            <p className="signin__switch">
              {mode === "join" ? (
                <>
                  <T>Already have an account?</T>{" "}
                  <button type="button" className="signin__link" onClick={() => switchMode("signin")}>
                    <T>Log in</T>
                  </button>
                </>
              ) : (
                <>
                  <T>{"Don't have an account?"}</T>{" "}
                  <button type="button" className="signin__link" onClick={() => switchMode("join")}>
                    <T>Join Us</T>
                  </button>
                </>
              )}
            </p>

            <div className="signin__divider" role="separator">
              <span>
                <T>Or</T>
              </span>
            </div>

            <button type="button" className="signin__google" disabled>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <T>{mode === "join" ? "Sign up with Google" : "Sign in with Google"}</T>
            </button>

            <p className="signin__legal">
              <T>By signing up I confirm that I carefully have read and agree to the ES Learning</T>{" "}
              <Link href="/privacy">
                <T>Privacy Policy</T>
              </Link>{" "}
              <T>and</T>{" "}
              <Link href="/terms">
                <T>Terms & Condition</T>
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
