"use client";

import Link from "next/link";
import { T, tr, useLocale } from "@/i18n/locale";

type AuthPanelProps = {
  title: string;
  titleLines?: readonly string[];
};

export function AuthPanel({ title, titleLines }: AuthPanelProps) {
  const { locale } = useLocale();
  const lines = titleLines ?? [title];

  return (
    <aside className="signin__panel">
      <div className="signin__panel-wave" aria-hidden="true">
        <div className="signin__panel-wave-rotate">
          <img src="/assets/images/auth/panel-wave.svg" alt="" width={1459} height={1434} />
        </div>
      </div>

      <div className="signin__panel-inner">
        <Link href="/" className="signin__brand" aria-label={tr(locale, "ES Learning home")}>
          <img src="/assets/images/auth/logo-white.svg" alt="" width={70} height={70} />
        </Link>

        <div className="signin__panel-foot">
          <div className="signin__rating">
            <div className="signin__rating-score-row">
              <span className="signin__rating-score">4.8</span>
              <span className="signin__rating-stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <img key={i} src="/assets/images/auth/star.svg" alt="" width={20} height={20} />
                ))}
              </span>
            </div>
            <img className="signin__rating-dot" src="/assets/images/auth/dot.svg" alt="" width={4} height={4} />
            <span className="signin__rating-count">
              <T>320 Total Reviews</T>
            </span>
          </div>
          <p className="signin__panel-title">
            <span className="loc-en">
              {lines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </span>
            <span className="loc-ar">
              <T>{title}</T>
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}
