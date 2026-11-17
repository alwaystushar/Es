import type { Metadata } from "next";
import { SignInForm } from "@/components/forms/SignInForm";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <main id="main" className="signin-page">
      <SignInForm />
    </main>
  );
}
