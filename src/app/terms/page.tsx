import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms & Condition" };

export default function TermsPage() {
  return (
    <PageIntro
      title="Terms & Condition"
      lede="Use of the ES Learning website and enrollment in programs are subject to the institute’s terms. For a copy of the current terms, contact the team."
    >
      <p className="interior__lede">
        <a href={siteConfig.emailHref}>{siteConfig.email}</a>
      </p>
    </PageIntro>
  );
}
