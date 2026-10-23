"use client";

import { Button } from "@/components/ui/Button";
import { T } from "@/i18n/locale";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main" className="interior">
      <div className="section-container">
        <h1 className="interior__title">
          <T>Something went wrong</T>
        </h1>
        <p className="interior__lede">
          <T>The page could not be displayed. You can try again.</T>
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Button type="button" onClick={reset} dot="none">
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
