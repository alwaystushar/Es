import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageIntro } from "@/components/pages/PageIntro";
import { T } from "@/i18n/locale";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <PageIntro
      title="Contact Us"
      lede="Tell us what your organization wants to achieve, and we'll help you design a learning solution aligned with your goals."
    >
      <div className="detail-grid">
        <div className="plain-card">
          <h2>
            <T>Talk to ES Learning</T>
          </h2>
          <p>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </p>
          <p>
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
          </p>
        </div>
        <ContactForm />
      </div>
    </PageIntro>
  );
}
