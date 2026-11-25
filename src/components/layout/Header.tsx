"use client";

import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/home";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T, tr, useLocale } from "@/i18n/locale";
import { dictionary } from "@/i18n/dictionary";
import { gsap, registerGsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AUTH_PATHS = new Set(["/signin", "/join"]);

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const NavLabel = memo(function NavLabel({
  label,
  href,
  current = false,
}: {
  label: string;
  href: string;
  current?: boolean;
}) {
  const root = useRef<HTMLAnchorElement | null>(null);
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
    /* SplitText chars breaks Arabic joining/order — keep plain text in AR */
    if (reduced || locale === "ar") return;

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
    <Link ref={root} href={href} className="nav-link" aria-current={current ? "page" : undefined}>
      <span className="nav-link__mask">
        <span className="nav-link__line">{label}</span>
        <span className="nav-link__line" aria-hidden="true">
          {label}
        </span>
      </span>
    </Link>
  );
});

export function Header() {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.has(pathname);
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  /* White header chrome — delayed until the panel has started sliding in */
  const [menuChrome, setMenuChrome] = useState(false);
  const { locale, setLocale } = useLocale();
  const arabic = locale === "ar";
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(pathname === "/");
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toneRef = useRef(pathname === "/");
  const [menuPath, setMenuPath] = useState(pathname);
  const reduced = useReducedMotion();
  const timelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  if (!isAuth && menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
    setMenuChrome(false);
  }

  if (!isAuth && open && hidden) setHidden(false);

  useEffect(() => {
    if (isAuth) return;

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
  }, [isAuth, open, pathname]);

  useEffect(() => {
    if (open) setMenuMounted(true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (!menuMounted) return;
    const panel = panelRef.current;
    const nav = navRef.current;
    if (!panel || !nav) return;

    registerGsap();
    timelineRef.current?.kill();

    const links = [...nav.querySelectorAll<HTMLElement>(".mobile-nav__link")];
    const actions = [...nav.querySelectorAll<HTMLElement>(".mobile-nav__actions > *")];
    const items = [...links, ...actions];
    const rtl = document.documentElement.getAttribute("dir") === "rtl";
    const fromX = rtl ? 40 : -40;
    const hiddenX = rtl ? 100 : -100;

    if (reduced) {
      gsap.set(panel, { xPercent: open ? 0 : hiddenX, visibility: open ? "visible" : "hidden" });
      gsap.set(items, { clearProps: "opacity,x,filter" });
      setMenuChrome(open);
      if (!open) setMenuMounted(false);
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        if (!open) {
          gsap.set(panel, { visibility: "hidden" });
          setMenuChrome(false);
          setMenuMounted(false);
        }
      },
    });
    timelineRef.current = timeline;

    if (open) {
      setMenuChrome(false);
      gsap.set(panel, { xPercent: hiddenX, visibility: "visible" });
      gsap.set(items, { opacity: 0, x: fromX, filter: "blur(6px)" });
      timeline.to(panel, {
        xPercent: 0,
        duration: 0.65,
        ease: "power3.inOut",
      });
      /* Panel slides first; white header chrome follows once the slide is underway */
      timeline.call(() => setMenuChrome(true), [], 0.32);
      timeline.to(
        items,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: { each: 0.05, from: "start" },
          ease: "power3.out",
        },
        0.16,
      );
    } else {
      /* Drop white chrome as the panel starts leaving, so the bar matches the slide out */
      timeline.call(() => setMenuChrome(false), [], 0.12);
      timeline.to(
        items,
        {
          opacity: 0,
          x: fromX * 0.4,
          filter: "blur(4px)",
          duration: 0.24,
          stagger: { each: 0.028, from: "end" },
          ease: "power2.in",
        },
        0,
      );
      timeline.to(
        panel,
        {
          xPercent: hiddenX,
          duration: 0.45,
          ease: "power3.inOut",
        },
        0.06,
      );
    }

    return () => {
      timeline.kill();
    };
  }, [menuMounted, open, reduced]);

  if (isAuth) {
    return <AuthHeader />;
  }

  return (
    <header
      ref={headerRef}
      className={[
        "site-header",
        hidden && !open ? "is-hidden" : "",
        onDark && !menuChrome ? "is-on-dark" : "",
        menuMounted ? "is-menu-active" : "",
        menuChrome ? "is-menu-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-container site-header__bar">
        <div className="brand-cluster">
          <Link href="/" className="brand" aria-label={tr(locale, "ES Learning home")}>
            <Icon src={onDark && !menuChrome ? "/assets/logos/logo-white.svg" : "/assets/logos/logo.svg"} width={48} height={48} />
          </Link>
        </div>

        <nav className="desktop-nav" aria-label="Primary">
          <div className="desktop-nav__links">
            {navigation.map((item) => (
              <NavLabel key={item.label} label={item.label} href={item.href} current={isNavActive(pathname, item.href)} />
            ))}
          </div>
          <div className="desktop-nav__actions">
            <Button plain dot="none" className="lang-button" aria-pressed={arabic} onClick={() => setLocale(arabic ? "en" : "ar")}>
              <Icon src="/assets/icons/language.svg" width={18} height={18} />
              {arabic ? "EN" : "AR"}
            </Button>
            <Button href="/signin">Sign In</Button>
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
          <span className="menu-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="menu-toggle__text" aria-hidden="true">
            {tr(locale, open ? "Close" : "Menu")}
          </span>
          <span className="sr-only">{tr(locale, open ? "Close menu" : "Open menu")}</span>
        </Button>
      </div>

      {menuMounted && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={panelRef}
              className={["mobile-nav-panel", open ? "is-interactive" : ""].filter(Boolean).join(" ")}
              aria-hidden={!open}
            >
              <nav ref={navRef} id="mobile-navigation" className="mobile-nav" aria-label="Mobile">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="mobile-nav__link"
                    aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <T>{item.label}</T>
                  </Link>
                ))}
                <div className="mobile-nav__actions">
                  <Button
                    plain
                    dot="none"
                    className="lang-button mobile-nav__action"
                    aria-pressed={arabic}
                    onClick={() => setLocale(arabic ? "en" : "ar")}
                  >
                    <Icon src="/assets/icons/language.svg" width={18} height={18} />
                    {arabic ? "EN" : "AR"}
                  </Button>
                  <Button href="/signin" className="mobile-nav__action" onClick={() => setOpen(false)}>
                    Sign In
                  </Button>
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
