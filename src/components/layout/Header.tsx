"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T, tr, useLocale } from "@/i18n/locale";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const arabic = locale === "ar";
  const [hidden, setHidden] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
    setAudienceOpen(false);
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
      last = y;
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  return (
    <header className={hidden && !open ? "site-header is-hidden" : "site-header"}>
      <div className="section-container site-header__bar">
        <div className="brand-cluster">
          <Link href="/" className="brand" aria-label={tr(locale, "ES Learning home")}>
            <Icon src="/assets/logos/logo.svg" width={46} height={47} />
          </Link>
          <div className="audience">
            <Button
              plain
              dot="none"
              className="audience__trigger"
              aria-expanded={audienceOpen}
              aria-haspopup="menu"
              onClick={() => setAudienceOpen((value) => !value)}
            >
              <T>{pathname.startsWith("/organization") ? "For Organization" : "For Individual"}</T>
              <Icon src="/assets/icons/chevron.svg" width={24} height={24} />
            </Button>
            {audienceOpen ? (
              <div className="audience__menu" role="menu">
                <Link href="/" aria-current={pathname === "/" ? "page" : undefined} role="menuitem">
                  <T>For Individual</T>
                </Link>
                <Link
                  href="/organization"
                  aria-current={pathname.startsWith("/organization") ? "page" : undefined}
                  role="menuitem"
                >
                  <T>For Organization</T>
                </Link>
              </div>
            ) : null}
          </div>
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
