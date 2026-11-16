"use client";

import { forwardRef, memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T, tr, useLocale } from "@/i18n/locale";
import { dictionary } from "@/i18n/dictionary";
import { gsap, registerGsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DOT_SIZE = 5;

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const NavLabel = memo(
  forwardRef<
    HTMLAnchorElement,
    {
      label: string;
      href: string;
      current?: boolean;
    }
  >(function NavLabel({ label, href, current = false }, ref) {
    const root = useRef<HTMLAnchorElement | null>(null);
    const { locale } = useLocale();
    const reduced = useReducedMotion();

    const setRefs = (node: HTMLAnchorElement | null) => {
      root.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

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
      <Link ref={setRefs} href={href} className="nav-link" aria-current={current ? "page" : undefined}>
        <span className="nav-link__mask">
          <span className="nav-link__line">{label}</span>
          <span className="nav-link__line" aria-hidden="true">
            {label}
          </span>
        </span>
      </Link>
    );
  }),
);

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
  const linksRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const linkEls = useRef(new Map<string, HTMLAnchorElement>());
  const dotX = useRef(0);
  const dotReady = useRef(false);
  const routeForDot = useRef(pathname);
  const reduced = useReducedMotion();

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

  useIsomorphicLayoutEffect(() => {
    const links = linksRef.current;
    const dot = dotRef.current;
    if (!links || !dot) return;

    registerGsap();
    let tween: gsap.core.Tween | gsap.core.Timeline | null = null;
    let layoutFrame = 0;
    let animating = false;

    const measureX = () => {
      const active = navigation.find((item) => isNavActive(pathname, item.href));
      if (!active) return null;
      const link = linkEls.current.get(active.href);
      if (!link) return null;
      const box = links.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      const size = dot.offsetWidth || DOT_SIZE;
      return rect.left - box.left + rect.width / 2 - size / 2;
    };

    const snap = (x: number) => {
      animating = false;
      tween?.kill();
      gsap.set(dot, { x, y: 0, opacity: 1, scale: 1 });
      dotX.current = x;
      dotReady.current = true;
      routeForDot.current = pathname;
    };

    const bounce = (toX: number) => {
      const fromX = dotX.current;
      const travel = Math.abs(toX - fromX);
      if (travel < 0.5) {
        snap(toX);
        return;
      }

      const arc = Math.min(22, Math.max(10, travel * 0.22));
      const duration = gsap.utils.clamp(0.38, 0.72, 0.28 + travel / 520);
      const proxy = { t: 0 };

      animating = true;
      tween?.kill();
      tween = gsap
        .timeline({
          onComplete: () => {
            animating = false;
            dotX.current = toX;
            routeForDot.current = pathname;
          },
        })
        .to(proxy, {
          t: 1,
          duration,
          ease: "sine.inOut",
          onUpdate: () => {
            const t = proxy.t;
            const x = fromX + (toX - fromX) * t;
            const y = 4 * arc * t * (1 - t);
            gsap.set(dot, { x, y, opacity: 1 });
          },
        })
        .to(dot, { y: 3, duration: 0.1, ease: "power2.out" })
        .to(dot, { y: 0, duration: 0.32, ease: "bounce.out" });
    };

    const place = (animate: boolean) => {
      const x = measureX();
      if (x == null) {
        animating = false;
        tween?.kill();
        gsap.set(dot, { opacity: 0 });
        dotReady.current = false;
        return;
      }

      if (!dotReady.current || reduced || !animate) {
        snap(x);
        return;
      }

      bounce(x);
    };

    const scheduleSnap = () => {
      if (animating) return;
      window.cancelAnimationFrame(layoutFrame);
      layoutFrame = window.requestAnimationFrame(() => {
        layoutFrame = window.requestAnimationFrame(() => {
          if (!animating) place(false);
        });
      });
    };

    const routeChanged = routeForDot.current !== pathname;
    place(routeChanged && dotReady.current);

    const observer = new ResizeObserver(scheduleSnap);
    observer.observe(links);
    linkEls.current.forEach((link) => observer.observe(link));

    return () => {
      tween?.kill();
      observer.disconnect();
      window.cancelAnimationFrame(layoutFrame);
    };
  }, [pathname, locale, reduced]);

  return (
    <header ref={headerRef} className={["site-header", hidden && !open ? "is-hidden" : "", onDark && !open ? "is-on-dark" : ""].filter(Boolean).join(" ")}>
      <div className="section-container site-header__bar">
        <div className="brand-cluster">
          <Link href="/" className="brand" aria-label={tr(locale, "ES Learning home")}>
            <Icon src={onDark && !open ? "/assets/logos/logo-white.svg" : "/assets/logos/logo.svg"} width={48} height={48} />
          </Link>
        </div>

        <nav className="desktop-nav" aria-label="Primary">
          <div ref={linksRef} className="desktop-nav__links">
            {navigation.map((item) => (
              <NavLabel
                key={item.label}
                label={item.label}
                href={item.href}
                current={isNavActive(pathname, item.href)}
                ref={(node) => {
                  if (node) linkEls.current.set(item.href, node);
                  else linkEls.current.delete(item.href);
                }}
              />
            ))}
            <span ref={dotRef} className="desktop-nav__dot" aria-hidden="true" />
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
          <span />
          <span />
          <span />
          <span className="sr-only">{tr(locale, open ? "Close menu" : "Open menu")}</span>
        </Button>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} aria-current={isNavActive(pathname, item.href) ? "page" : undefined}>
              <T>{item.label}</T>
            </Link>
          ))}
          <div className="mobile-nav__actions">
            <Button plain dot="none" className="lang-button" aria-pressed={arabic} onClick={() => setLocale(arabic ? "en" : "ar")}>
              <Icon src="/assets/icons/language.svg" width={18} height={18} />
              {arabic ? "EN" : "AR"}
            </Button>
            <Button href="/signin">Sign In</Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
