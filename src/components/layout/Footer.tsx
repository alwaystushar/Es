"use client";

import Link from "next/link";
import { companyLinks, legalLinks } from "@/data/home";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { LocalizedImage, T, tr, useLocale } from "@/i18n/locale";

const socials = [
  { label: "ES Learning on X", href: "https://x.com", icon: "/assets/icons/social-x.svg", width: 20, height: 20 },
  { label: "ES Learning on LinkedIn", href: "https://www.linkedin.com", icon: "/assets/icons/social-linkedin.svg", width: 20, height: 20 },
  { label: "ES Learning on Instagram", href: "https://www.instagram.com", icon: "/assets/icons/social-instagram.svg", width: 45, height: 45 },
];

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="site-footer__main">
          <Link href="/" className="site-footer__brand" aria-label={tr(locale, "ES Learning home")}>
            <Icon src="/assets/logos/logo.svg" width={92} height={92} />
          </Link>
          <nav aria-label={tr(locale, "Company")}>
            <p className="footer-title">
              <T>Company</T>
            </p>
            <div className="footer-links">
              {companyLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  <T>{item.label}</T>
                </Link>
              ))}
            </div>
          </nav>
          <div>
            <p className="footer-title">
              <T>Contact</T>
            </p>
            <div className="footer-contact">
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              <a href={siteConfig.emailHref}>{siteConfig.email}</a>
              <div className="socials">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={item.width === 45 ? "socials__instagram" : undefined}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={tr(locale, item.label)}
                  >
                    <Icon src={item.icon} width={item.width} height={item.height} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer__badges">
          <LocalizedImage
            className="license"
            src="/assets/images/license-tvtc.png"
            alt="Technical and Vocational Training Corporation"
            width={195}
            height={101}
          />
          <div className="payment-badges">
            <Icon src="/assets/logos/badge-iso.svg" alt="ISO 9001" width={46} height={57} />
            <Icon src="/assets/logos/badge-iqnet.svg" alt="IQNET" width={49} height={49} />
            <Icon src="/assets/logos/badge-mada.svg" alt="mada" width={77} height={25} />
            <Icon src="/assets/logos/badge-visa.svg" alt="Visa" width={64} height={23} />
          </div>
        </div>

        <div className="site-footer__legal">
          <p>
            <T>© ES Learning 2026 All rights reserved.</T>
          </p>
          <nav aria-label={tr(locale, "Legal")}>
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <T>{item.label}</T>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
