import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { T } from "@/i18n/locale";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PageIntro
      title="Privacy Policy"
      lede="ES Learning uses the details you submit, such as your name, email, organization, and message, only to respond to enquiries and program requests."
    >
      <p className="interior__lede">
        <T>Questions about privacy can be sent to</T> <a href={siteConfig.emailHref}>{siteConfig.email}</a>.
      </p>
    </PageIntro>
  );
}
