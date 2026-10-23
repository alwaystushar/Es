"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
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
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h2>
        <T>Sign in</T>
      </h2>
      <p>
        <T>Use your ES Learning account details. Authentication can be connected here later.</T>
      </p>
      <label className="field">
        <span>
          <T>Email</T>
        </span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="field">
        <span>
          <T>Password</T>
        </span>
        <input name="password" type="password" autoComplete="current-password" required minLength={8} />
      </label>
      {error ? <p className="form-error">{tr(locale, error)}</p> : null}
      {ready ? (
        <p className="form-success">
          <T>Your details look valid and are ready for sign-in.</T>
        </p>
      ) : null}
      <Button type="submit" dot="none">
        Sign In
      </Button>
    </form>
  );
}
