"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/i18n/locale";

export function HeroAudience() {
  const pathname = usePathname();
  const isOrganization = pathname === "/organization" || pathname.startsWith("/organization/");

  return (
    <div className="hero-audience" role="tablist" aria-label="Audience">
      <Link
        href="/"
        className={!isOrganization ? "is-active" : undefined}
        aria-current={!isOrganization ? "page" : undefined}
        role="tab"
        aria-selected={!isOrganization}
      >
        <T>Individual</T>
      </Link>
      <Link
        href="/organization"
        className={isOrganization ? "is-active" : undefined}
        aria-current={isOrganization ? "page" : undefined}
        role="tab"
        aria-selected={isOrganization}
      >
        <T>Organization</T>
      </Link>
    </div>
  );
}
