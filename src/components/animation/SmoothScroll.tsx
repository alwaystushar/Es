"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    registerGsap();

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!(target instanceof HTMLElement)) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [reduced]);

  return children;
}
