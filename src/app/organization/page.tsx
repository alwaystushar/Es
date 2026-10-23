import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageIntro } from "@/components/pages/PageIntro";
import { T } from "@/i18n/locale";

export const metadata: Metadata = { title: "For Organization" };

export default function OrganizationPage() {
  return (
    <PageIntro
      title="Learning for your organization"
      lede="Tell us what your organization wants to achieve, and we'll help you design a learning solution aligned with your goals."
    >
      <div className="detail-grid">
        <article className="plain-card">
          <h2>
            <T>Programs grounded in practice</T>
          </h2>
          <p>
            <T>
              ES Learning brings global methodologies into the Saudi workplace, helping teams apply what they learn and create lasting impact.
            </T>
          </p>
        </article>
        <ContactForm intent="Design a learning solution" />
      </div>
    </PageIntro>
  );
}
