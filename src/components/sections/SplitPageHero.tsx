import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";

type SplitPageHeroProps = {
  id: string;
  className?: string;
  eyebrow?: string;
  title: string;
  body: string;
  cta?: string;
  ctaHref?: string;
  image: string;
  imageAlt: string;
  align?: "start" | "center";
};

export function SplitPageHero({
  id,
  className = "split-hero",
  eyebrow,
  title,
  body,
  cta,
  ctaHref,
  image,
  imageAlt,
  align = "start",
}: SplitPageHeroProps) {
  return (
    <section className={[className, align === "center" ? `${className}--center` : ""].filter(Boolean).join(" ")} aria-labelledby={id}>
      <FieldWash />
      <div className="section-container">
        <div className={`${className}__grid`}>
          <div className={`${className}__copy`}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <RevealLines id={id} as="h1" className={`${className}__title`} playOnMount>
              {title}
            </RevealLines>
            <p className={`${className}__body`}>
              <T>{body}</T>
            </p>
            {cta ? (
              <div className={`${className}__actions`}>
                <Button href={ctaHref}>{cta}</Button>
              </div>
            ) : null}
          </div>
          <div className={`${className}__media`}>
            <LocalizedImage src={image} alt={imageAlt} fill quality={90} sizes="(max-width: 48rem) 100vw, 42rem" />
          </div>
        </div>
      </div>
    </section>
  );
}
