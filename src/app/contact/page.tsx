import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Journey } from "@/components/sections/Journey";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ES Learning. Start a conversation about training for yourself or your organization.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <ContactHero />
      <ContactSection />
      <FAQAccordion />
      <Journey />
    </main>
  );
}
