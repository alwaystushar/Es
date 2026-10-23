import type { ReactNode } from "react";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";

type PageIntroProps = {
  title: string;
  lede: string;
  children?: ReactNode;
};

export function PageIntro({ title, lede, children }: PageIntroProps) {
  return (
    <main id="main" className="interior">
      <div className="section-container">
        <RevealLines as="h1" className="interior__title" playOnMount>
          {title}
        </RevealLines>
        <p className="interior__lede">
          <T>{lede}</T>
        </p>
        {children}
      </div>
    </main>
  );
}
