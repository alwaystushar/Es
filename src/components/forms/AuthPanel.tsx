"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
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
      <span className="signin__panel-wave" aria-hidden="true" />
      <Link href="/" className="signin__brand" aria-label={tr(locale, "ES Learning home")}>
        <Icon src="/assets/logos/logo-white.svg" width={70} height={70} />
      </Link>
      <div className="signin__panel-foot">
        <div className="signin__rating">
          <span className="signin__rating-score">4.8</span>
          <span className="signin__rating-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <img key={i} src="/assets/images/auth/star.svg" alt="" width={20} height={20} />
            ))}
          </span>
          <span className="signin__rating-dot" aria-hidden="true" />
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
    </aside>
  );
}
