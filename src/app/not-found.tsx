import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/pages/PageIntro";

export default function NotFound() {
  return (
    <PageIntro title="Page not found" lede="That page is not part of the ES Learning site.">
      <div style={{ marginTop: "2rem" }}>
        <Button href="/">Back to home</Button>
      </div>
    </PageIntro>
  );
}
