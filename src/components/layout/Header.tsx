"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T, tr, useLocale } from "@/i18n/locale";

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
          <Link href="/" className="brand" aria-label={tr(locale, "ES Learning home")}>
            <Icon src={onDark && !open ? "/assets/logos/logo-white.svg" : "/assets/logos/logo.svg"} width={58} height={59} />
          </Link>
        </div>

        <nav className="desktop-nav" aria-label="Primary">
          <div className="desktop-nav__links">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              >
                <T>{item.label}</T>
              </Link>
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
          <span />
          <span />
          <span />
          <span className="sr-only">{tr(locale, open ? "Close menu" : "Open menu")}</span>
        </Button>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <T>{item.label}</T>
            </Link>
          ))}
          <div className="mobile-nav__actions">
            <Button plain dot="none" className="lang-button" aria-pressed={arabic} onClick={() => setLocale(arabic ? "en" : "ar")}>
              <Icon src="/assets/icons/language.svg" width={18} height={18} />
              {arabic ? "EN" : "AR"}
            </Button>
            <Button href="/signin">Sign In</Button>
            <Button href="/organization" variant="outline">
              For Organization
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
