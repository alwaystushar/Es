"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n/locale";
import { faqItems } from "@/data/contact";
import type { Expert } from "@/data/experts";

const dateOptions = [
  { value: "jan-2025", label: "Jan 15–19, 2025" },
  { value: "mar-2025", label: "Mar 10–14, 2025" },
  { value: "may-2025", label: "May 5–9, 2025" },
] as const;

const locationOptions = [
  { value: "riyadh", label: "Riyadh" },
  { value: "online", label: "Online" },
  { value: "jeddah", label: "Jeddah" },
] as const;

type ProgramDetailTabsProps = {
  title: string;
  price: string;
  compareAt?: string;
  expert?: Expert;
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "learning-outcomes", label: "Learning Outcomes" },
  { id: "course-outline", label: "Course Outline" },
  { id: "trainer", label: "Trainer" },
  { id: "faqs", label: "FAQs" },
  { id: "reviews", label: "Reviews" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const overviewPoints = [
  "Understand the current process and identify gaps.",
  "Redesign processes and create an implementable To-Be model.",
  "Build recommendations and an actionable implementation plan.",
  "Complete an applied project and prepare for the BPT-PS exam.",
];

const learningOutcomes = [
  "Understand BPM fundamentals and identify gaps between the current and desired states.",
  "Model processes and use data to identify problems and their root causes.",
  "Redesign processes and build a practical To-Be model.",
  "Develop recommendations and an implementation plan, complete an applied project and prepare for the BPT-PS exam.",
];

const courseOutline = [
  {
    step: "01",
    title: "BPM Foundations",
    description: "Core BPM concepts, process types and how processes contribute to organizational performance.",
  },
  {
    step: "02",
    title: "Understanding the Current Process",
    description: "Assess the current state, collect information and identify gaps and opportunities.",
  },
  {
    step: "03",
    title: "Process Analysis",
    description: "Use data and structured techniques to find root causes and opportunities for improvement.",
  },
  {
    step: "04",
    title: "Process Redesign",
    description: "Design future-state processes and develop a roadmap for implementation.",
  },
  {
    step: "05",
    title: "Recommendations & Implementation",
    description: "Prepare recommendations and an implementation plan, applying the learning through the final project.",
  },
];

const reviews = [
  { author: "Mohammed A.", rating: 5, comment: "Highly practical program. I applied the frameworks directly in my next project." },
  { author: "Sarah K.", rating: 5, comment: "Imran brings the content to life with real-world examples. Excellent trainer." },
  { author: "Ahmad M.", rating: 4, comment: "Solid content and well-structured delivery. I would recommend this to any process professional." },
];

function CheckIcon() {
  return <Icon src="/assets/icons/program-detail/check.svg" width={20} height={20} className="program-checklist__glyph" />;
}

function TabEyebrow({ children }: { children: string }) {
  return (
    <p className="program-tab-eyebrow">
      <Icon src="/assets/icons/program-detail/eyebrow-dot.svg" width={8} height={8} />
      <T>{children}</T>
    </p>
  );
}

export function ProgramDetailTabs({ price, compareAt, expert }: ProgramDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("learning-outcomes");
  const [openFaq, setOpenFaq] = useState<string>(faqItems[0].id);
  const [sessionDate, setSessionDate] = useState("");
  const [sessionLocation, setSessionLocation] = useState("");

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className="program-tabs-section">
      <div className="program-tabs-nav">
        <div className="section-container">
          <div className="program-tabs-bar" role="tablist" aria-label="Program sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                className={["program-tab", activeTab === tab.id ? "program-tab--active" : ""].filter(Boolean).join(" ")}
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <T>{tab.label}</T>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="program-tabs-layout">
          <div className="program-tabs-main">
            <div className="program-tab-panel" role="tabpanel" aria-label={tabs.find((t) => t.id === activeTab)?.label}>
              {activeTab === "overview" && (
                <div className="program-tab-overview">
                  <div className="program-tab-panel__intro">
                    <TabEyebrow>Overview</TabEyebrow>
                    <h2 className="program-tab-panel__title">
                      <T>What Is the BPM Professional Program?</T>
                    </h2>
                    <p className="program-tab-panel__body">
                      <T>
                        Learn the fundamentals of BPM, then apply them to an end-to-end process improvement journey—from
                        current-state analysis and gap assessment to future-state design and actionable recommendations.
                      </T>
                    </p>
                  </div>
                  <ul className="program-checklist" role="list">
                    {overviewPoints.map((point) => (
                      <li key={point} className="program-checklist__item">
                        <span className="program-checklist__icon" aria-hidden="true">
                          <CheckIcon />
                        </span>
                        <T>{point}</T>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "learning-outcomes" && (
                <div className="program-tab-outcomes">
                  <div className="program-tab-panel__intro">
                    <TabEyebrow>Learning Outcomes</TabEyebrow>
                    <h2 className="program-tab-panel__title">
                      <T>What will you learn?</T>
                    </h2>
                  </div>
                  <ul className="program-checklist" role="list">
                    {learningOutcomes.map((outcome) => (
                      <li key={outcome} className="program-checklist__item">
                        <span className="program-checklist__icon" aria-hidden="true">
                          <CheckIcon />
                        </span>
                        <T>{outcome}</T>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "course-outline" && (
                <div className="program-tab-outline">
                  <div className="program-tab-panel__intro">
                    <TabEyebrow>Course Outline</TabEyebrow>
                    <h2 className="program-tab-panel__title">
                      <T>Program modules</T>
                    </h2>
                    <p className="program-tab-panel__body program-tab-panel__body--lg">
                      <T>Program modules follow the process improvement journey from understanding through implementation.</T>
                    </p>
                  </div>
                  <div className="program-outline-list">
                    {courseOutline.map((item) => (
                      <div key={item.step} className="program-outline-item">
                        <div className="program-outline-item__body">
                          <strong className="program-outline-item__title">
                            <T>{item.title}</T>
                          </strong>
                          <p className="program-outline-item__desc">
                            <T>{item.description}</T>
                          </p>
                        </div>
                        <span className="program-outline-item__step" aria-hidden="true">
                          {item.step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "trainer" && expert && (
                <div className="program-tab-trainer">
                  <div className="program-tab-panel__intro">
                    <TabEyebrow>Trainer</TabEyebrow>
                    <h2 className="program-tab-panel__title">
                      <T>Meet your trainer</T>
                    </h2>
                  </div>
                  <div className="program-trainer-card">
                    <div className="program-trainer-card__photo">
                      <Image
                        src={expert.photo}
                        alt={expert.photoAlt}
                        fill
                        sizes="12rem"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                      />
                    </div>
                    <div className="program-trainer-card__info">
                      <h3 className="program-trainer-card__name">{expert.name}</h3>
                      <p className="program-trainer-card__role">
                        <T>{expert.role}</T>
                      </p>
                      <Button variant="outline" href={`/experts/${expert.slug}`} dot="start">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "faqs" && (
                <div className="program-tab-faqs">
                  <div className="program-tab-panel__intro">
                    <TabEyebrow>FAQs</TabEyebrow>
                    <h2 className="program-tab-panel__title">
                      <T>Frequently Asked Questions</T>
                    </h2>
                  </div>
                  <div
                    className="faq-list"
                    role="list"
                    onMouseLeave={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                        setOpenFaq("");
                      }
                    }}
                  >
                    {faqItems.map((item) => {
                      const isOpen = openFaq === item.id;
                      return (
                        <div
                          key={item.id}
                          className={["faq-item", isOpen ? "faq-item--open" : ""].filter(Boolean).join(" ")}
                          onMouseEnter={() => setOpenFaq(item.id)}
                        >
                          <button
                            type="button"
                            className="faq-item__trigger"
                            aria-expanded={isOpen}
                            aria-controls={`prog-faq-answer-${item.id}`}
                            onClick={() => setOpenFaq(isOpen ? "" : item.id)}
                          >
                            <span className="faq-item__question">
                              <T>{item.question}</T>
                            </span>
                            <span className="faq-item__icon" aria-hidden="true">
                              <span className="faq-item__icon-bar faq-item__icon-bar--h" />
                              <span className="faq-item__icon-bar faq-item__icon-bar--v" />
                            </span>
                          </button>
                          <div id={`prog-faq-answer-${item.id}`} className="faq-item__answer" role="region">
                            <div className="faq-item__answer-inner">
                              <p>
                                <T>{item.answer}</T>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="program-tab-reviews">
                  <div className="program-tab-panel__intro">
                    <TabEyebrow>Reviews</TabEyebrow>
                    <h2 className="program-tab-panel__title">
                      <T>Participant Reviews</T>
                    </h2>
                  </div>
                  <div className="program-reviews-list">
                    {reviews.map((review) => (
                      <div key={review.author} className="program-review-card">
                        <div className="program-review-card__meta">
                          <strong className="program-review-card__author">{review.author}</strong>
                          <span className="stars stars--small" role="img" aria-label={`${review.rating} out of 5 stars`}>
                            {Array.from({ length: review.rating }, (_, i) => (
                              <img key={i} src="/assets/icons/program-detail/star.svg" alt="" width={12} height={12} />
                            ))}
                          </span>
                        </div>
                        <p className="program-review-card__comment">
                          <T>{review.comment}</T>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="program-tab-nav">
                <button
                  type="button"
                  className="program-tab-nav__btn"
                  onClick={() => {
                    if (activeIndex > 0) setActiveTab(tabs[activeIndex - 1].id);
                  }}
                  disabled={activeIndex <= 0}
                >
                  <Icon src="/assets/icons/program-detail/nav-prev.svg" width={20} height={20} className="program-tab-nav__chevron program-tab-nav__chevron--prev" />
                  <T>Previous</T>
                </button>
                <button
                  type="button"
                  className="program-tab-nav__btn program-tab-nav__btn--next"
                  onClick={() => {
                    if (activeIndex < tabs.length - 1) setActiveTab(tabs[activeIndex + 1].id);
                  }}
                  disabled={activeIndex >= tabs.length - 1}
                >
                  <T>Next</T>
                  <Icon src="/assets/icons/program-detail/nav-next.svg" width={20} height={20} className="program-tab-nav__chevron" />
                </button>
              </div>
            </div>
          </div>

          <aside className="program-register-sidebar" aria-label="Register for this program">
            <div className="program-register-card">
              <div className="program-register-card__header">
                <p className="program-register-card__label">
                  <T>Register Now</T>
                </p>
                <h2 className="program-register-card__title">
                  <T>Choose Your Session</T>
                </h2>
              </div>

              <div className="program-register-card__body">
                <div className="program-register-fee">
                  <p className="program-register-fee__label">
                    <T>Program Fee</T>
                  </p>
                  <div className="program-register-fee__price">
                    <div className="program-register-fee__current">
                      <Icon src="/assets/icons/program-detail/riyal-green.svg" width={27} height={28} />
                      <span className="program-register-fee__amount">{price}</span>
                    </div>
                    {compareAt ? (
                      <div className="program-register-fee__compare">
                        <Icon src="/assets/icons/program-detail/riyal-muted.svg" width={11} height={12} />
                        <span>{compareAt}</span>
                      </div>
                    ) : null}
                  </div>
                  <p className="program-register-fee__note">
                    <Icon src="/assets/icons/program-detail/info.svg" width={16} height={16} />
                    <T>HRDF Fee Refund Request.</T>
                  </p>
                </div>

                <div className="program-register-selects">
                  <div className="program-register-field">
                    <Icon
                      src="/assets/icons/program-detail/select-calendar.svg"
                      width={16}
                      height={18}
                      className="program-register-field__glyph"
                    />
                    <CustomSelect
                      value={sessionDate}
                      options={dateOptions}
                      placeholder="Select Date"
                      ariaLabel="Select program date"
                      className="program-register-field__select"
                      chevronSrc="/assets/icons/program-detail/select-chevron.svg"
                      onChange={setSessionDate}
                    />
                  </div>

                  <div className="program-register-field">
                    <Icon
                      src="/assets/icons/program-detail/select-pin.svg"
                      width={21}
                      height={25}
                      className="program-register-field__glyph program-register-field__glyph--pin"
                    />
                    <CustomSelect
                      value={sessionLocation}
                      options={locationOptions}
                      placeholder="Select Location"
                      ariaLabel="Select program location"
                      className="program-register-field__select"
                      chevronSrc="/assets/icons/program-detail/select-chevron.svg"
                      onChange={setSessionLocation}
                    />
                  </div>
                </div>
              </div>

              <div className="program-register-card__actions">
                <Button variant="solid" href="/signin" dot="none" className="program-register-card__btn-primary">
                  Register Now
                </Button>
                <Button variant="outline" href="/contact" dot="none" className="program-register-card__btn-secondary">
                  Request a Team Proposal
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
