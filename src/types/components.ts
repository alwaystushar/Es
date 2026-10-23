import type { ElementType, ReactNode } from "react";

export type RevealTag = "h1" | "h2" | "h3" | "p" | "span";

export type ButtonVariant = "solid" | "outline" | "outline-light" | "outline-dark" | "white";

export type PolymorphicProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};
