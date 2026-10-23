"use client";

import { useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { dictionary } from "@/i18n/dictionary";
import { useLocale } from "@/i18n/locale";
import { afterPageAppear } from "@/lib/page-appear";
import { cn } from "@/lib/utils";
import type { RevealTag } from "@/types/components";

type RevealLinesProps = {
  as?: RevealTag;
  id?: string;
  className?: string;
  children: string;
  triggerStart?: string;
  duration?: number;
  stagger?: number;
  playOnMount?: boolean;
};

export function RevealLines({
  as: Tag = "p",
  id,
  className,
  children,
  triggerStart = "top 85%",
  duration = 0.9,
  stagger = 0.12,
  playOnMount = false,
}: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const playedRef = useRef(false);
  const reduced = useReducedMotion();
  const { locale, ready } = useLocale();
  const arabic = dictionary[children] ?? children;
  const active = locale === "ar" ? arabic : children;

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || !ready) return;

    const prefersReduced = reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      element.classList.add("is-ready");
      return;
    }

    registerGsap();
    let frame = 0;
    let cancelled = false;
    let observer: ResizeObserver | undefined;

    const split = (animate: boolean) => {
      gsap.killTweensOf(element.querySelectorAll(".line-inner"));
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.trigger === element)
        .forEach((trigger) => trigger.kill());

      element.textContent = "";
      const wordNodes = active.split(/(\s+)/).filter(Boolean).map((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline";
        element.appendChild(span);
        return span;
      });

      const lines: HTMLSpanElement[][] = [];
      let currentTop: number | null = null;
      wordNodes.forEach((node) => {
        const top = node.offsetTop;
        if (currentTop === null || Math.abs(top - currentTop) > 2) {
          lines.push([]);
          currentTop = top;
        }
        lines[lines.length - 1]?.push(node);
      });

      element.textContent = "";
      const inners: HTMLSpanElement[] = [];
      lines.forEach((line) => {
        const mask = document.createElement("span");
        mask.className = "line-mask";
        const inner = document.createElement("span");
        inner.className = "line-inner";
        inner.textContent = line.map((node) => node.textContent).join("");
        mask.appendChild(inner);
        element.appendChild(mask);
        inners.push(inner);
      });
      element.classList.add("is-ready");

      if (!animate) {
        gsap.set(inners, { yPercent: 0 });
        playedRef.current = true;
        return;
      }

      gsap.set(inners, { yPercent: 110 });
      const tween = {
        yPercent: 0,
        duration,
        stagger,
        ease: "power3.out",
        onComplete: () => {
          playedRef.current = true;
        },
      };
      if (playOnMount) {
        gsap.to(inners, tween);
        return;
      }
      gsap.to(inners, {
        ...tween,
        scrollTrigger: {
          trigger: element,
          start: triggerStart,
          once: true,
        },
      });
    };

    const begin = async () => {
      await Promise.all([document.fonts?.ready ?? Promise.resolve(), afterPageAppear()]);
      if (cancelled || ref.current !== element) return;
      split(!playedRef.current);
      observer = new ResizeObserver(() => {
        if (!playedRef.current) return;
        window.clearTimeout(frame);
        frame = window.setTimeout(() => {
          if (!cancelled) split(false);
        }, 180);
      });
      observer.observe(element);
    };

    begin();

    return () => {
      cancelled = true;
      window.clearTimeout(frame);
      observer?.disconnect();
      gsap.killTweensOf(element.querySelectorAll(".line-inner"));
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.trigger === element)
        .forEach((trigger) => trigger.kill());
    };
  }, [active, duration, playOnMount, ready, reduced, stagger, triggerStart]);

  return (
    <Tag ref={ref as never} id={id} className={cn("reveal-lines", className)}>
      {arabic === children ? (
        children
      ) : (
        <>
          <span className="loc-en">{children}</span>
          <span className="loc-ar">{arabic}</span>
        </>
      )}
    </Tag>
  );
}
