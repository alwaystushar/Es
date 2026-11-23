"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { programCatalog } from "@/data/programs";
import { featuredPrograms, programAreas } from "@/data/home";
import { T } from "@/i18n/locale";

function findProgramTitle(slug: string | null) {
  if (!slug) return undefined;
  const catalog = programCatalog.find((item) => item.slug === slug);
  if (catalog) return catalog.title;
  const featured = featuredPrograms.find((item) => item.slug === slug);
  if (featured) return featured.title;
  const area = programAreas.find((item) => item.slug === slug);
  return area?.title;
}

export function RegistrationPage() {
  const searchParams = useSearchParams();
  const programSlug = searchParams.get("program");
  const programTitle = useMemo(() => findProgramTitle(programSlug), [programSlug]);

  return (
    <section className="registration" aria-labelledby="registration-title">
      <div className="section-container registration__inner">
        <nav className="registration__crumbs" aria-label="Breadcrumb">
          <a href="/">
            <T>Home</T>
          </a>
          <span aria-hidden="true">/</span>
          <span>
            <T>Registration</T>
          </span>
        </nav>

        <div className="registration__header">
          <Eyebrow>Registration</Eyebrow>
          <RevealLines id="registration-title" as="h1" className="registration__title" playOnMount>
            Complete Your Registration
          </RevealLines>
          <p className="registration__lede">
            <T>Enter your details to complete the registration process.</T>
          </p>
        </div>

        <RegistrationForm programTitle={programTitle} />
      </div>
    </section>
  );
}
