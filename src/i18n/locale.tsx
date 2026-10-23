"use client";

import Image, { type ImageProps } from "next/image";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { dictionary } from "@/i18n/dictionary";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export type Locale = "en" | "ar";

type LocaleContextValue = {
  locale: Locale;
  ready: boolean;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const localeBootScript = `(function(){try{var l=localStorage.getItem("es-locale");var r=document.documentElement;if(l==="ar"){r.lang="ar";r.dir="rtl";}else{r.lang="en";r.dir="ltr";}}catch(e){}})();`;

function readLocale(): Locale {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("es-locale") === "ar" ? "ar" : "en";
}

function applyLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale === "ar" ? "ar" : "en";
  root.dir = locale === "ar" ? "rtl" : "ltr";
  window.localStorage.setItem("es-locale", locale);
}

export function tr(locale: Locale, value: string) {
  if (locale !== "ar" || !value) return value;
  return dictionary[value] ?? value;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    applyLocale(next);
  };

  useIsomorphicLayoutEffect(() => {
    const saved = readLocale();
    setLocaleState(saved);
    applyLocale(saved);
    setReady(true);
  }, []);

  const value = useMemo(() => ({ locale, ready, setLocale }), [locale, ready]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used within LocaleProvider");
  return value;
}

export function T({ children }: { children: string }) {
  const english = children.replace(/\s+/g, " ").trim();
  const arabic = dictionary[english];
  if (!arabic || arabic === english) return english;

  return (
    <>
      <span className="loc-en">{english}</span>
      <span className="loc-ar">{arabic}</span>
    </>
  );
}

export function LocalizedImage({ alt, ...props }: ImageProps) {
  const { locale } = useLocale();
  return <Image {...props} alt={tr(locale, alt)} />;
}
