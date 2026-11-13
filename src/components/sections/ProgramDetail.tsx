"use client";

import { useState } from "react";
import type { programCatalog } from "@/data/programs";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { Stars } from "@/components/ui/Stars";
import { RevealLines } from "@/components/animation/RevealLines";
import { LocalizedImage, T } from "@/i18n/locale";

type Program = (typeof programCatalog)[number];

const tabs = ["Overview", "Learning Outcomes", "Course Outline", "Trainer", "FAQs", "Reviews"] as const;

const outcomes = [
  "Understand BPM fundamentals and identify gaps between the current and desired states.",
  "Model processes and use data to identify problems and their root causes.",
  "Redesign processes and build a practical To-Be model.",
  "Develop recommendations and an implementation plan, complete an applied project and prepare for the BPT-PS exam.",
] as const;

type ProgramDetailProps = {
  program: Program;
};

export function ProgramDetail({ program }: ProgramDetailProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <>
      <section className="program-detail-hero" aria-labelledby="program-detail-title">
        <FieldWash />
        <div className="section-container">
          <div className="program-detail-hero__top">
            <Eyebrow>Professional Program</Eyebrow>
            <div className="program-detail-hero__rating">
              <span>{program.rating}</span>
              <Stars small />
            </div>
          </div>
          <RevealLines id="program-detail-title" as="h1" className="program-detail-hero__title" playOnMount>
            {program.title}
          </RevealLines>
          <p className="program-detail-hero__body">
            <T>{program.description}</T>
          </p>
          <div className="program-detail-hero__media">
            <LocalizedImage src={program.image} alt={program.alt} fill quality={90} sizes="(max-width: 48rem) 100vw, 70rem" />
          </div>
        </div>
      </section>

      <section className="program-detail" aria-labelledby="program-detail-panel-title">
        <div className="section-container program-detail__grid">
          <div>
            <div className="program-detail__tabs" role="tablist" aria-label="Program sections">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={tab === item}
                  className={["program-detail__tab", tab === item ? "is-active" : ""].filter(Boolean).join(" ")}
                  onClick={() => setTab(item)}
                >
                  <T>{item}</T>
                </button>
              ))}
            </div>

            <div className="program-detail__panel" id="program-detail-panel-title">
              {tab === "Overview" ? (
                <>
                  <h2>
                    <T>What will you learn?</T>
                  </h2>
                  <p>
                    <T>{program.description}</T>
                  </p>
                </>
              ) : null}
              {tab === "Learning Outcomes" ? (
                <>
                  <h2>
                    <T>Learning Outcomes</T>
                  </h2>
                  <ul>
                    {outcomes.map((item) => (
                      <li key={item}>
                        <T>{item}</T>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {tab === "Course Outline" ? (
                <>
                  <h2>
                    <T>Course Outline</T>
                  </h2>
                  <p>
                    <T>Session topics, workshops and applied project milestones will appear here.</T>
                  </p>
                </>
              ) : null}
              {tab === "Trainer" ? (
                <>
                  <h2>
                    <T>Trainer</T>
                  </h2>
                  <p>
                    <T>Programs are delivered by experienced practitioners who connect specialist knowledge with workplace realities.</T>
                  </p>
                </>
              ) : null}
              {tab === "FAQs" ? (
                <>
                  <h2>
                    <T>FAQs</T>
                  </h2>
                  <p>
                    <T>Common questions about enrollment, schedules and certification will appear here.</T>
                  </p>
                </>
              ) : null}
              {tab === "Reviews" ? (
                <>
                  <h2>
                    <T>Reviews</T>
                  </h2>
                  <p>
                    <T>{program.reviews}</T> · {program.rating}
                  </p>
                </>
              ) : null}
            </div>
          </div>

          <aside className="program-detail__aside">
            <p className="program-detail__fee-label">
              <T>Program Fee</T>
            </p>
            <p className="program-detail__fee">
              <span>{program.price}</span>
              <s>{program.compareAt}</s>
            </p>
            <h2>
              <T>Choose Your Session</T>
            </h2>
            <label className="field">
              <span>
                <T>Select Date</T>
              </span>
              <select defaultValue="">
                <option value="" disabled>
                  Select Date
                </option>
                <option>Coming soon</option>
              </select>
            </label>
            <label className="field">
              <span>
                <T>Select Location</T>
              </span>
              <select defaultValue="">
                <option value="" disabled>
                  Select Location
                </option>
                <option>Riyadh</option>
                <option>Online</option>
              </select>
            </label>
            <Button href="/contact">Register Now</Button>
            <Button href="/organization" variant="outline">
              Request a Team Proposal
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
