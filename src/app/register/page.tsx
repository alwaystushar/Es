import type { Metadata } from "next";
import { Suspense } from "react";
import { RegistrationPage } from "@/components/sections/RegistrationPage";

export const metadata: Metadata = {
  title: "Complete Your Registration",
  description: "Enter your details to complete the ES Learning program registration process.",
};

export default function RegisterPage() {
  return (
    <main id="main">
      <Suspense fallback={<div className="registration registration--loading" />}>
        <RegistrationPage />
      </Suspense>
    </main>
  );
}
