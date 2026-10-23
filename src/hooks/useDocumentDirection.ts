"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function useDocumentDirection() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const read = () => setDirection(root.dir === "rtl" ? "rtl" : "ltr");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);

  return direction;
}
