"use client";

import { companyLinks, legalLinks } from "@/data/home";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { LocalizedImage, T, tr, useLocale } from "@/i18n/locale";

const socials = [
  { label: "ES Learning on X", href: "https://x.com", icon: "/assets/icons/social-x.svg" },
  { label: "ES Learning on LinkedIn", href: "https://www.linkedin.com", icon: "/assets/icons/social-linkedin.svg" },
  { label: "ES Learning on Instagram", href: "https://www.instagram.com", icon: "/assets/icons/social-instagram.svg" },
];

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="site-footer" id="footer">
      <div className="section-container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Icon src="/assets/logos/logo.svg" width={48} height={48} />
          </div>
          <nav aria-label={tr(locale, "Company")}>
            <p className="footer-title">
              <T>Company</T>
            </p>
            <div className="footer-links">
              {companyLinks.map((item) => (
                <span key={item.label}>
                  <T>{item.label}</T>
                </span>
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
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={tr(locale, item.label)}>
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
              <span key={item.label}>
                <T>{item.label}</T>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
