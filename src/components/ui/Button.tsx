"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";
import { T } from "@/i18n/locale";
import { cn } from "@/lib/utils";
import type { ButtonVariant } from "@/types/components";

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  dot?: "start" | "end" | "none";
  /** Keep the pointer-origin wrap, and leave the visual style to `className`. */
  plain?: boolean;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function placeRipple(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--ripple-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--ripple-y", `${event.clientY - bounds.top}px`);
}

export function Button({
  href,
  variant = "solid",
  dot,
  plain = false,
  className,
  children,
  type = "button",
  onPointerEnter,
  onPointerMove,
  ...props
}: ButtonProps) {
  const classes = cn("btn", plain ? undefined : `btn--${variant}`, className);
  const marker = dot ?? (plain ? "none" : "start");
  const content = (
    <>
      <span className="btn__ripple" aria-hidden="true" />
      {marker === "start" ? <span className="btn__dot" aria-hidden="true" /> : null}
      <span className="btn__label">{typeof children === "string" ? <T>{children}</T> : children}</span>
      {marker === "end" ? <span className="btn__dot" aria-hidden="true" /> : null}
    </>
  );

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    placeRipple(event);
  };

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onPointerEnter={(event) => {
          trackPointer(event);
          onPointerEnter?.(event as unknown as PointerEvent<HTMLButtonElement>);
        }}
        onPointerMove={(event) => {
          trackPointer(event);
          onPointerMove?.(event as unknown as PointerEvent<HTMLButtonElement>);
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      {...props}
      onPointerEnter={(event) => {
        trackPointer(event);
        onPointerEnter?.(event);
      }}
      onPointerMove={(event) => {
        trackPointer(event);
        onPointerMove?.(event);
      }}
    >
      {content}
    </button>
  );
}
