"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { T, tr, useLocale } from "@/i18n/locale";

type ContactFormProps = {
  intent?: string;
};

export function ContactForm({ intent = "General enquiry" }: ContactFormProps) {
  const { locale } = useLocale();
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || !email.includes("@") || message.length < 12) {
      setSent(false);
      setError("Add your name, a valid email, and a message of at least 12 characters.");
      return;
    }
    setError("");
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h2>
        <T>{intent}</T>
      </h2>
      <p>
        <T>This form checks your details in the browser and is ready to connect to a submission service later.</T>
      </p>
      <label className="field">
        <span>
          <T>Name</T>
        </span>
        <input name="name" autoComplete="name" required />
      </label>
      <label className="field">
        <span>
          <T>Email</T>
        </span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="field">
        <span>
          <T>Organization</T>
        </span>
        <input name="organization" autoComplete="organization" />
      </label>
      <label className="field">
        <span>
          <T>Message</T>
        </span>
        <textarea name="message" required />
      </label>
      {error ? <p className="form-error">{tr(locale, error)}</p> : null}
      {sent ? (
        <p className="form-success">
          <T>Thank you. Your message is ready for the ES Learning team.</T>
        </p>
      ) : null}
      <Button type="submit" dot="none">
        Send message
      </Button>
    </form>
  );
}
