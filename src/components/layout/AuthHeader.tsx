"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { T, tr, useLocale } from "@/i18n/locale";

export function AuthHeader() {
  const { locale, setLocale } = useLocale();
  const arabic = locale === "ar";

  return (
    <header className="auth-header">
      <div className="auth-header__bar">
        <Link href="/" className="auth-header__brand" aria-label={tr(locale, "ES Learning home")}>
          <img src="/assets/images/auth/logo-dark.svg" alt="" width={60} height={60} />
        </Link>

        <div className="auth-header__actions">
          <Button
            plain
            dot="none"
            className="lang-button auth-header__lang"
            aria-pressed={arabic}
            onClick={() => setLocale(arabic ? "en" : "ar")}
          >
            <img src="/assets/images/auth/globe.svg" alt="" width={18} height={18} />
            {arabic ? "EN" : "AR"}
          </Button>
          <Button href="/signin">
            <T>Sign In</T>
          </Button>
        </div>
      </div>
    </header>
  );
}
