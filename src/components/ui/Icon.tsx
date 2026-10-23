"use client";

import { tr, useLocale } from "@/i18n/locale";

type IconProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
};

export function Icon({ src, width, height, alt = "", className }: IconProps) {
  const { locale } = useLocale();

  return (
    // Size follows the 1vw root. A raw pixel attribute stays tiny next to rem type.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={tr(locale, alt)}
      className={className}
      style={{ width: `${width / 16}rem`, height: `${height / 16}rem` }}
    />
  );
}
