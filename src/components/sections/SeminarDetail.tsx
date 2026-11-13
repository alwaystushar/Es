import Link from "next/link";
import type { Seminar } from "@/data/seminars";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";

type SeminarDetailProps = {
  seminar: Seminar;
};

export function SeminarDetail({ seminar }: SeminarDetailProps) {
  return (
    <>
      <section className="seminar-detail-hero" aria-labelledby="seminar-detail-title">
        <FieldWash />
        <div className="section-container">
          <Eyebrow>Seminars</Eyebrow>
          <div className="seminar-detail-hero__meta">
            <span>
              <T>{seminar.trainer}</T>
            </span>
            <span>
              <T>{seminar.date}</T>
            </span>
            <span>
              <T>{seminar.time}</T>
            </span>
            <span>
              <T>{seminar.location}</T>
            </span>
          </div>
          <RevealLines id="seminar-detail-title" as="h1" className="seminar-detail-hero__title" playOnMount>
            {seminar.title}
          </RevealLines>
          <p className="seminar-detail-hero__body">
            <T>{seminar.description}</T>
          </p>
          <div className="seminar-detail-hero__media">
            <LocalizedImage src={seminar.image} alt={seminar.alt} fill quality={90} sizes="(max-width: 48rem) 100vw, 70rem" />
          </div>
        </div>
      </section>

      <section className="seminar-detail" aria-labelledby="seminar-about-title">
        <div className="section-container seminar-detail__grid">
          <div className="seminar-detail__main">
            <h2 id="seminar-about-title">
              <T>About the Seminar</T>
            </h2>
            <p>
              <T>{seminar.about}</T>
            </p>
            <div className="seminar-detail__after">
              <h3>
                <T>After the Seminar</T>
              </h3>
              <p>
                <T>{seminar.afterSeminar}</T>
              </p>
            </div>
            <div className="seminar-detail__nav">
              <Link href="/seminars">
                <T>Previous</T>
              </Link>
              <Link href="/seminars">
                <T>Next</T>
              </Link>
            </div>
          </div>
          <aside className="seminar-detail__aside">
            <h2>
              <T>Register to Attend</T>
            </h2>
            <Button href="/contact">Register Now</Button>
            <Button href="/organization" variant="outline">
              Request a Team Proposal
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
