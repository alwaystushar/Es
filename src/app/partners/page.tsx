import type { Metadata } from "next";
import { partners } from "@/data/home";
import { PageIntro } from "@/components/pages/PageIntro";
import { LocalizedImage } from "@/i18n/locale";

export const metadata: Metadata = { title: "Partners" };

export default function PartnersPage() {
  return (
    <PageIntro
      title="Our Global Partners"
      lede="We collaborate with specialist organizations to deliver programs grounded in global methodologies and standards."
    >
      <div className="card-list" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(11.25rem, 1fr))" }}>
        {partners.map((partner) => (
          <article key={partner.name} className="plain-card" style={{ display: "grid", placeItems: "center", minHeight: "8rem" }}>
            <LocalizedImage src={partner.src} alt={partner.name} width={partner.width} height={partner.height} className="partner-logo" style={{ width: partner.logoWidth, height: partner.logoHeight }} />
          </article>
        ))}
      </div>
    </PageIntro>
  );
}
