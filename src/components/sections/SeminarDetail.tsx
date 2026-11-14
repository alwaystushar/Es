"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Seminar } from "@/data/seminars";
import { seminarCatalog } from "@/data/seminars";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T, tr, useLocale } from "@/i18n/locale";

type SeminarDetailProps = {
  seminar: Seminar;
};

export function SeminarDetail({ seminar }: SeminarDetailProps) {
  const { locale } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const related = seminarCatalog.filter((item) => item.slug !== seminar.slug).slice(0, 2);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      setSent(false);
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
    setName("");
    setEmail("");
  };

  return (
    <>
      <section className="seminar-detail-hero" data-header-tone="light" aria-labelledby="seminar-detail-title">
        <div className="seminar-detail-hero__bg" aria-hidden="true">
          <LocalizedImage src={seminar.image} alt="" fill priority quality={90} sizes="100vw" />
        </div>
        <div className="seminar-detail-hero__shade" aria-hidden="true" />

        <div className="seminar-detail-hero__inner">
          <div className="section-container">
            <div className="seminar-detail-hero__content">
              <Eyebrow light>Seminars</Eyebrow>
              <RevealLines id="seminar-detail-title" as="h1" className="seminar-detail-hero__title" playOnMount>
                {seminar.title}
              </RevealLines>
              <p className="seminar-detail-hero__body">
                <T>{seminar.description}</T>
              </p>
              <Button href="/programs" variant="solid" className="seminar-detail-hero__cta" dot="start">
                Explore Programs
              </Button>
            </div>

            <div className="seminar-detail-hero__meta">
              <div className="seminar-detail-hero__meta-bar">
                <span className="seminar-detail-hero__meta-item">
                  <Icon src="/assets/icons/person.svg" width={20} height={20} />
                  <T>{seminar.trainer}</T>
                </span>
                <span className="seminar-detail-hero__meta-item">
                  <Icon src="/assets/icons/calendar.svg" width={20} height={20} />
                  <T>{seminar.date}</T>
                </span>
                <span className="seminar-detail-hero__meta-item">
                  <Icon src="/assets/icons/clock.svg" width={20} height={20} />
                  <T>{seminar.time}</T>
                </span>
                <span className="seminar-detail-hero__meta-item">
                  <Icon src="/assets/icons/globe.svg" width={20} height={20} />
                  <T>{seminar.location}</T>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seminar-detail-body" aria-labelledby="seminar-about-title">
        <div className="section-container seminar-detail-body__grid">
          <div className="seminar-detail-body__left">
            <div className="seminar-detail-body__about">
              <RevealLines id="seminar-about-title" as="h2" className="seminar-detail-body__about-title">
                About the Seminar
              </RevealLines>
              <p className="seminar-detail-body__about-text">
                <T>{seminar.about}</T>
              </p>
            </div>

            <div className="seminar-detail-after">
              <h3 className="seminar-detail-after__title">
                <T>After the Seminar</T>
              </h3>
              <p className="seminar-detail-after__text">
                <T>{seminar.afterSeminar}</T>
              </p>
            </div>
          </div>

          <aside className="seminar-register-card" aria-label="Register to attend">
            <h2 className="seminar-register-card__title">
              <T>Register to Attend</T>
            </h2>
            <form className="seminar-register-card__form" onSubmit={onSubmit} noValidate>
              <label className="seminar-register-card__field">
                <span className="seminar-register-card__label">
                  <T>Name</T>
                </span>
                <input
                  className="seminar-register-card__input"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={tr(locale, "Enter your full name")}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="seminar-register-card__field">
                <span className="seminar-register-card__label">
                  <T>Email Address</T>
                </span>
                <input
                  className="seminar-register-card__input"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={tr(locale, "Enter your email address")}
                  autoComplete="email"
                  required
                />
              </label>
              {error ? <p className="seminar-register-card__error">{tr(locale, error)}</p> : null}
              {sent ? (
                <p className="seminar-register-card__confirm">
                  <T>Thank you. Your registration request is ready for the ES Learning team.</T>
                </p>
              ) : null}
              <Button type="submit" variant="solid" dot="none" className="seminar-register-card__submit">
                Register Now
              </Button>
            </form>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="seminar-related" aria-labelledby="seminar-related-title">
          <div className="section-container">
            <div className="seminar-related__header">
              <RevealLines id="seminar-related-title" as="h2" className="seminar-related__title">
                Explore upcoming seminars
              </RevealLines>
              <Button href="/seminars" variant="outline" dot="none">
                View All
              </Button>
            </div>

            <div className="seminar-related__grid">
              {related.map((item) => (
                <article key={item.slug} className="seminar-list-card">
                  <div className="seminar-list-card__media">
                    <LocalizedImage
                      src={item.image}
                      alt={item.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 48rem) 100vw, 22rem"
                    />
                    <span className="seminar-list-card__fade" aria-hidden="true" />
                  </div>
                  <div className="seminar-list-card__panel">
                    <div className="seminar-list-card__body">
                      <div className="seminar-list-card__content">
                        <div className="seminar-list-card__heading">
                          <h3 className="seminar-list-card__title">
                            <T>{item.title}</T>
                          </h3>
                          <div className="seminar-list-card__meta">
                            <div className="seminar-list-card__meta-row">
                              <span className="seminar-list-card__meta-item">
                                <Icon src="/assets/icons/person.svg" width={16} height={16} />
                                <T>{item.trainer}</T>
                              </span>
                            </div>
                            <div className="seminar-list-card__meta-row seminar-list-card__meta-row--details">
                              <span className="seminar-list-card__meta-item">
                                <Icon src="/assets/icons/clock.svg" width={16} height={16} />
                                <T>{item.time}</T>
                              </span>
                              <span className="seminar-list-card__meta-item">
                                <Icon src="/assets/icons/calendar.svg" width={16} height={16} />
                                <T>{item.date}</T>
                              </span>
                              <span className="seminar-list-card__meta-item">
                                <Icon src="/assets/icons/program-detail/meta-globe.svg" width={16} height={16} />
                                <T>{item.location}</T>
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="seminar-list-card__description">
                          <T>{item.description}</T>
                        </p>
                      </div>
                      <Link href={`/seminars/${item.slug}`} className="btn btn--solid seminar-list-card__cta">
                        <span className="btn__ripple" aria-hidden="true" />
                        <span className="btn__label">
                          <T>Register Now</T>
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
