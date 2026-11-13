import type { Metadata } from "next";
import { KnowledgeContent } from "@/components/sections/KnowledgeContent";

export const metadata: Metadata = {
  title: "Knowledge Hub — Insights that bring workplace challenges into focus",
  description:
    "Explore ES Learning articles, updates and resources that help build capabilities and strengthen performance.",
};

export default function KnowledgePage() {
  return <KnowledgeContent />;
}
