"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  className?: string;
  children: ReactNode;
  immediate?: boolean;
};

export function RevealImage({ className, children, immediate = false }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const scope = ref.current;
    const image = scope?.querySelector("img");
    if (!scope || !image || reduced) return;
    registerGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.08, yPercent: 4 },
        {
          scale: 1,
          yPercent: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: immediate
            ? undefined
            : {
                trigger: scope,
                start: "top 86%",
                once: true,
              },
        },
      );
    }, scope);

    return () => context.revert();
  }, [immediate, reduced]);

  return (
    <div ref={ref} className={cn("reveal-image", className)}>
      {children}
    </div>
  );
}
