"use client";

import { T } from "@/i18n/locale";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: string;
  light?: boolean;
  small?: boolean;
};

export function Eyebrow({ children, light = false, small = false }: EyebrowProps) {
  return (
    <p className={cn("eyebrow", small && "eyebrow--small")} style={light ? { color: "var(--color-text-soft)" } : undefined}>
      <span className="eyebrow__dot" aria-hidden="true" />
      <T>{children}</T>
    </p>
  );
}
