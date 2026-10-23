"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { afterPageAppear } from "@/lib/page-appear";
import { cn } from "@/lib/utils";

type OdometerProps = {
  value: string;
  className?: string;
  playOnMount?: boolean;
};

type Slot =
  | { kind: "mark"; key: string; char: string }
  | { kind: "digit"; key: string; end: number; column: number[] };

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function slotsFor(value: string): Slot[] {
  const glyphs = [...value];
  const digitIndexes = glyphs.flatMap((glyph, index) => (/\d/.test(glyph) ? [index] : []));

  return glyphs.map((glyph, index) => {
    const key = `${glyph}-${index}`;
    if (!/\d/.test(glyph)) return { kind: "mark", key, char: glyph };

    const fromRight = digitIndexes.length - 1 - digitIndexes.indexOf(index);
    const turns = fromRight === 0 ? 2 : 1;
    return {
      kind: "digit",
      key,
      end: turns * 10 + Number(glyph),
      column: Array.from({ length: turns + 1 }, () => DIGITS).flat(),
    };
  });
}

export function Odometer({ value, className, playOnMount = false }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const slots = slotsFor(value);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reels = [...root.querySelectorAll<HTMLElement>(".odometer__reel")];
    const prefersReduced = reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      reels.forEach((reel) => reel.style.setProperty("--digit", reel.dataset.end ?? "0"));
      return;
    }

    registerGsap();
    let alive = true;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        paused: playOnMount,
        ...(playOnMount
          ? {}
          : {
              scrollTrigger: {
                trigger: root,
                start: "top 82%",
                once: true,
              },
            }),
      });

      reels.forEach((reel, index) => {
        const end = Number(reel.dataset.end ?? 0);
        const fromEnd = reels.length - 1 - index;
        timeline.fromTo(
          reel,
          { "--digit": 0 },
          {
            "--digit": end,
            duration: 1.15 + fromEnd * 0.4,
            ease: "power3.out",
          },
          index * 0.07,
        );
      });
      if (playOnMount) {
        afterPageAppear().then(() => {
          if (alive) timeline.play();
        });
      }
    }, root);

    return () => {
      alive = false;
      context.revert();
    };
  }, [playOnMount, reduced, value]);

  return (
    <span ref={ref} className={cn("odometer", className)}>
      <span className="sr-only">{value}</span>
      <span className="odometer__visual" aria-hidden="true">
        {slots.map((slot) =>
          slot.kind === "mark" ? (
            <span className="odometer__mark" key={slot.key}>
              {slot.char}
            </span>
          ) : (
            <span className="odometer__digit" key={slot.key}>
              <span className="odometer__reel" data-end={slot.end} style={{ "--digit": slot.end } as CSSProperties}>
                {slot.column.map((digit, step) => (
                  <span key={step}>{digit}</span>
                ))}
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  );
}
