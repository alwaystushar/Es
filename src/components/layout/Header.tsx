"use client";

import { memo, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T, tr, useLocale } from "@/i18n/locale";
import { dictionary } from "@/i18n/dictionary";
import { gsap, registerGsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NavLabel = memo(function NavLabel({ label }: { label: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const { locale } = useLocale();
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const link = root.current;
    if (!link) return;
    const lines = [...link.querySelectorAll<HTMLElement>(".nav-link__line")];
    const text = locale === "ar" ? (dictionary[label] ?? label) : label;
    lines.forEach((line) => {
      line.textContent = text;
    });
    if (reduced) return;

    registerGsap();
    const splits = lines.map((line) =>
      SplitText.create(line, { type: "chars", tag: "span", charsClass: "nav-char", aria: "auto" }),
    );
    const [top, bottom] = splits;
    gsap.set(bottom.chars, { yPercent: 110 });

    const play = (enter: boolean) => {
      const tween = {
        stagger: enter ? 0.028 : 0.016,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto" as const,
      };
      gsap.to(top.chars, { ...tween, yPercent: enter ? -110 : 0 });
      gsap.to(bottom.chars, { ...tween, yPercent: enter ? 0 : 110 });
    };
    const onEnter = () => play(true);
    const onLeave = () => play(false);
    link.addEventListener("pointerenter", onEnter);
    link.addEventListener("pointerleave", onLeave);

    return () => {
      link.removeEventListener("pointerenter", onEnter);
      link.removeEventListener("pointerleave", onLeave);
      splits.forEach((split) => split.revert());
    };
  }, [label, locale, reduced]);

  return (
    <span ref={root} className="nav-link">
      <span className="nav-link__mask">
        <span className="nav-link__line">{label}</span>
        <span className="nav-link__line" aria-hidden="true">
          {label}
        </span>
      </span>
    </span>
  );
});

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const arabic = locale === "ar";
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(pathname === "/");
  const headerRef = useRef<HTMLElement>(null);
  const toneRef = useRef(pathname === "/");
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  if (open && hidden) setHidden(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (open || y < 72) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
      const probe = (headerRef.current?.getBoundingClientRect().height || 68) * 0.55;
      const dark = [...document.querySelectorAll<HTMLElement>("[data-header-tone='light']")].some((zone) => {
        const rect = zone.getBoundingClientRect();
        return rect.top <= probe && rect.bottom >= probe;
      });
      if (toneRef.current !== dark) {
        toneRef.current = dark;
        setOnDark(dark);
      }
      last = y;
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.cancelAnimationFrame(frame);
    };
  }, [open, pathname]);

  return (
    <header ref={headerRef} className={["site-header", hidden && !open ? "is-hidden" : "", onDark && !open ? "is-on-dark" : ""].filter(Boolean).join(" ")}>
      <div className="section-container site-header__bar">
        <div className="brand-cluster">
          <span className="brand">
            <Icon src={onDark && !open ? "/assets/logos/logo-white.svg" : "/assets/logos/logo.svg"} width={48} height={48} />
          </span>
        </div>

        <nav className="desktop-nav" aria-label="Primary">
          <div className="desktop-nav__links">
            {navigation.map((item) => (
              <NavLabel key={item.label} label={item.label} />
            ))}
          </div>
          <div className="desktop-nav__actions">
            <Button plain dot="none" className="lang-button" aria-pressed={arabic} onClick={() => setLocale(arabic ? "en" : "ar")}>
              <Icon src="/assets/icons/language.svg" width={18} height={18} />
              {arabic ? "EN" : "AR"}
            </Button>
            <Button>Sign In</Button>
          </div>
        </nav>

        <Button
          plain
          dot="none"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">{tr(locale, open ? "Close menu" : "Open menu")}</span>
        </Button>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile">
          {navigation.map((item) => (
            <span key={item.label}>
              <T>{item.label}</T>
            </span>
          ))}
          <div className="mobile-nav__actions">
            <Button plain dot="none" className="lang-button" aria-pressed={arabic} onClick={() => setLocale(arabic ? "en" : "ar")}>
              <Icon src="/assets/icons/language.svg" width={18} height={18} />
              {arabic ? "EN" : "AR"}
            </Button>
            <Button>Sign In</Button>
            <Button variant="outline">
              For Organization
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
