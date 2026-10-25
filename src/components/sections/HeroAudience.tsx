"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/i18n/locale";

export function HeroAudience() {
  const pathname = usePathname();
  const organization = pathname.startsWith("/organization");

  return (
    <div className="hero-audience">
      <Link href="/" className={organization ? undefined : "is-active"} aria-current={organization ? undefined : "page"}>
        <T>Individual</T>
      </Link>
      <Link
        href="/organization"
        className={organization ? "is-active" : undefined}
        aria-current={organization ? "page" : undefined}
      >
        <T>Organization</T>
      </Link>
    </div>
  );
}
