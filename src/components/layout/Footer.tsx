"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNavPrimary, footerNavSecondary, legalLinks } from "@/data/home";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { LocalizedImage, T, tr, useLocale } from "@/i18n/locale";

const socials = [
  { label: "ES Learning on X", href: "https://x.com", icon: "/assets/icons/social-x.svg" },
  { label: "ES Learning on LinkedIn", href: "https://www.linkedin.com", icon: "/assets/icons/social-linkedin.svg" },
  { label: "ES Learning on Instagram", href: "https://www.instagram.com", icon: "/assets/icons/social-instagram.svg" },
];

const AUTH_PATHS = new Set(["/signin", "/join"]);

export function Footer() {
  const { locale } = useLocale();
  const pathname = usePathname();

  if (AUTH_PATHS.has(pathname)) return null;

  return (
    <footer className="site-footer" id="footer">
      <div className="section-container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link href="/" aria-label={tr(locale, "ES Learning home")} className="site-footer__logo">
              <Icon src="/assets/logos/logo.svg" width={72} height={72} />
            </Link>
            <p className="site-footer__tagline">
              <span className="loc-en">
                <span className="site-footer__tagline-line">From learning to impact</span>
                <span className="site-footer__tagline-line">you can see</span>
              </span>
              <span className="loc-ar">
                <T>From learning to impact you can see</T>
              </span>
            </p>
          </div>

          <div className="site-footer__columns">
            <nav className="site-footer__nav" aria-label={tr(locale, "Company")}>
              {footerNavPrimary.map((item) => (
                <Link key={item.label} href={item.href}>
                  <T>{item.label}</T>
                </Link>
              ))}
            </nav>

            <nav className="site-footer__nav" aria-label={tr(locale, "For Organization")}>
              {footerNavSecondary.map((item) => (
                <Link key={item.label} href={item.href}>
                  <T>{item.label}</T>
                </Link>
              ))}
            </nav>

            <div className="site-footer__contact">
              <a href={siteConfig.phoneHref}>{siteConfig.phone.replace(/\s/g, "")}</a>
              <a href={siteConfig.emailHref}>{siteConfig.email}</a>
              <div className="socials">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={tr(locale, item.label)}
                  >
                    <Icon src={item.icon} width={20} height={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer__badges">
          <LocalizedImage
            className="license"
            src="/assets/images/footer/tvtc.png"
            alt="Technical and Vocational Training Corporation"
            width={248}
            height={140}
          />
          <div className="payment-badges">
            <Icon src="/assets/images/footer/badge-iso.svg" alt="ISO 9001" width={46} height={57} />
            <Icon src="/assets/images/footer/badge-iqnet.svg" alt="IQNET" width={49} height={49} />
            <Icon src="/assets/images/footer/badge-mada.svg" alt="mada" width={77} height={25} />
            <Icon src="/assets/images/footer/badge-visa.svg" alt="Visa" width={64} height={23} />
          </div>
        </div>
      </div>

      <div className="site-footer__legal">
        <div className="section-container site-footer__legal-inner">
          <p>
            <T>© ES Learning 2026 All rights reserved.</T>
          </p>
          <nav aria-label={tr(locale, "Legal")}>
            {legalLinks.map((item) => (
              <Link key={item.label} href={item.href}>
                <T>{item.label}</T>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
