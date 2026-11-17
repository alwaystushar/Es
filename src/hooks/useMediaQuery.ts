"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Live `matchMedia` flag — updates on viewport changes (orientation / resize).
 * Starts as `null` until measured so callers can skip GSAP until the MQ is known.
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [query]);

  return matches;
}
