import { T } from "@/i18n/locale";

export function HeroAudience() {
  return (
    <div className="hero-audience">
      <span className="is-active" aria-current="page">
        <T>Individual</T>
      </span>
      <span>
        <T>Organization</T>
      </span>
    </div>
  );
}
