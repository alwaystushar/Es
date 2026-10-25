import { stats } from "@/data/home";
import { LocalizedImage, T } from "@/i18n/locale";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealImage } from "@/components/animation/RevealImage";
import { Odometer } from "@/components/animation/Odometer";
import { RevealLines } from "@/components/animation/RevealLines";

export function Impact() {
  return (
    <section className="impact" id="about" aria-labelledby="impact-title">
      <div className="section-container">
        <div className="impact__intro">
          <RevealLines as="p" className="impact__label">
            A growing record of impact
          </RevealLines>
          <div className="stat-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>
                  <Odometer value={stat.value} />
                </strong>
                <span>
                  <T>{stat.label}</T>
                </span>
              </article>
            ))}
          </div>
        </div>

        <div className="impact__story">
          <RevealImage className="impact__photo">
            <LocalizedImage
              src="/assets/images/impact-session.webp"
              alt="A facilitator speaking with learners during a training session"
              width={1600}
              height={1531}
              quality={90}
              sizes="80vw"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                maxWidth: "none",
                objectFit: "cover",
              }}
            />
          </RevealImage>
          <div className="impact__copy">
            <div>
              <Eyebrow>ES Learning</Eyebrow>
              <RevealLines id="impact-title" as="p" className="impact__text">
                At ES Learning, we believe the true value of training is reflected in how knowledge is applied. Our programs bring learning and practice together, equipping professionals and teams with the skills and tools to work more effectively, make better decisions, and create lasting impact.
              </RevealLines>
            </div>
            <div>
              <Button href="/about" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
