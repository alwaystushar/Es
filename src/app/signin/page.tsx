import type { Metadata } from "next";
import { SignInForm } from "@/components/forms/SignInForm";
import { PageIntro } from "@/components/pages/PageIntro";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <PageIntro title="Sign In" lede="Access your ES Learning programs and continue your development journey.">
      <div style={{ maxWidth: "32rem", marginTop: "3rem" }}>
        <SignInForm />
      </div>
    </PageIntro>
  );
}
