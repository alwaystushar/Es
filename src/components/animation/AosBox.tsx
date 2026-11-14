"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type AosBoxProps = {
  as?: "div" | "article" | "li" | "section";
  className?: string;
  animation?: string;
  delay?: number;
  children: ReactNode;
  style?: CSSProperties;
};

export function AosBox({
  as: Tag = "div",
  className,
  animation = "fade-up",
  delay = 0,
  children,
  style,
}: AosBoxProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <Tag
      className={className}
      style={style}
      {...(ready
        ? {
            "data-aos": animation,
            "data-aos-delay": delay ? String(delay) : undefined,
          }
        : {})}
    >
      {children}
    </Tag>
  );
}
