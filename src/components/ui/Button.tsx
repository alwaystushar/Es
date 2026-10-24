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
  const marker = dot ?? (plain ? "none" : "start");
  const arrow = marker !== "none";
  const classes = cn("btn", plain ? undefined : `btn--${variant}`, arrow ? "btn--dot-arrow" : undefined, className);
  const dotMark = (
    <span className="btn__dot" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M3.4 8h5.8" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M8.1 4.35 12.5 8 8.1 11.65" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
  const content = (
    <>
      <span className="btn__ripple" aria-hidden="true" />
      {marker === "start" ? dotMark : null}
      <span className="btn__label">{typeof children === "string" ? <T>{children}</T> : children}</span>
      {marker === "end" ? dotMark : null}
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
