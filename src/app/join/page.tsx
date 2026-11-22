import type { Metadata } from "next";
import { JoinForm } from "@/components/forms/JoinForm";

export const metadata: Metadata = { title: "Join Us" };

export default function JoinPage() {
  return (
    <main id="main" className="signin-page">
      <JoinForm />
    </main>
  );
}
