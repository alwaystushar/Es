import Link from "next/link";
import { T } from "@/i18n/locale";

export function HeroAudience() {
  return (
    <div className="hero-audience">
      <Link href="#main" className="is-active" aria-current="page">
        <T>Individual</T>
      </Link>
      <Link href="#contact">
        <T>Organization</T>
      </Link>
    </div>
  );
}
