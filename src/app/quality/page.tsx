import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";

export const metadata: Metadata = { title: "Quality Policy" };

export default function QualityPage() {
  return (
    <PageIntro
      title="Quality Policy"
      lede="ES Learning is committed to practical programs, recognized methodologies, and a learning experience that holds up in the workplace. The institute displays ISO 9001 and IQNET recognition in the site footer."
    />
  );
}
