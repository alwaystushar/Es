"use client";

import { useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { stats } from "@/data/home";
import { LocalizedImage, T } from "@/i18n/locale";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealImage } from "@/components/animation/RevealImage";
import { Odometer } from "@/components/animation/Odometer";
import { RevealLines } from "@/components/animation/RevealLines";
import { useDocumentDirection } from "@/hooks/useDocumentDirection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MQ_PHONE } from "@/lib/breakpoints";
import "swiper/css";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="stat-card">
      <strong>
        <Odometer value={value} />
      </strong>
      <span>
        <T>{label}</T>
      </span>
    </article>
  );
}

export function Impact() {
  const swiper = useRef<SwiperInstance | null>(null);
  const direction = useDocumentDirection();
  const isPhone = useMediaQuery(MQ_PHONE);

  return (
    <section className="impact" id="about" aria-labelledby="impact-title">
      <div className="section-container">
        <div className="impact__intro">
          <p className="impact__label">
            <T>A growing record of impact</T>
          </p>
          {isPhone ? (
            <div className="impact__stats-stage">
              <Swiper
                key={direction}
                className="impact-stats-swiper"
                slidesPerView="auto"
                spaceBetween={12}
                slidesOffsetAfter={12}
                dir={direction}
                watchOverflow
                onSwiper={(instance) => {
                  swiper.current = instance;
                }}
              >
                {stats.map((stat) => (
                  <SwiperSlide key={stat.label} className="impact-stats-swiper__slide">
                    <StatCard label={stat.label} value={stat.value} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="stat-grid">
              {stats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          )}
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
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
