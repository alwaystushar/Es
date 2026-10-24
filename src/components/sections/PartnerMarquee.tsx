"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { partners } from "@/data/home";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PartnerMarquee() {
  const reduced = useReducedMotion();
  const direction = useDocumentDirection();

  return (
    <Marquee
      className="partner-marquee"
      autoFill
      direction={direction === "rtl" ? "right" : "left"}
      pauseOnHover
      play={!reduced}
      speed={40}
      gradient
      gradientColor="var(--color-background)"
      gradientWidth="12rem"
    >
      {partners.map((partner) => (
        <Image
          key={partner.name}
          className="partner-logo"
          src={partner.src}
          alt={partner.name}
          width={partner.width}
          height={partner.height}
          style={{ width: partner.logoWidth, height: partner.logoHeight }}
        />
      ))}
    </Marquee>
  );
}
