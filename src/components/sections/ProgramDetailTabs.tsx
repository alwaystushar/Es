"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { T } from "@/i18n/locale";
import { faqItems } from "@/data/contact";
import type { Expert } from "@/data/experts";

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

const learningOutcomes = [
  "Understand BPM fundamentals and identify gaps between the current and desired states.",
  "Model processes and use data to identify problems and their root causes.",
  "Redesign processes and build a practical To-Be model.",
  "Develop recommendations and an implementation plan, complete an applied project and prepare for the BPT-PS exam.",
];

const courseOutline = [
  { step: "01", title: "BPM Foundations", description: "Understand the principles of business process management and how it applies to your organization." },
  { step: "02", title: "Process Discovery & Mapping", description: "Identify, document, and visualize current-state processes using standard notation." },
  { step: "03", title: "Process Analysis", description: "Use data and structured techniques to find root causes and opportunities for improvement." },
  { step: "04", title: "Process Redesign", description: "Design future-state processes and develop a roadmap for implementation." },
  { step: "05", title: "Recommendations & Implementation", description: "Prepare recommendations and an implementation plan, applying the learning through the final project." },
];

const reviews = [
  { author: "Mohammed A.", rating: 5, comment: "Highly practical program. I applied the frameworks directly in my next project." },
  { author: "Sarah K.", rating: 5, comment: "Imran brings the content to life with real-world examples. Excellent trainer." },
  { author: "Ahmad M.", rating: 4, comment: "Solid content and well-structured delivery. I would recommend this to any process professional." },
];

export function ProgramDetailTabs({ title, price, compareAt, expert }: ProgramDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("learning-outcomes");
  const [openFaq, setOpenFaq] = useState<string>(faqItems[0].id);

  return (
    <div className="program-tabs-section">
      <div className="section-container">
        <div className="program-tabs-layout">
          {/* Main column */}
          <div className="program-tabs-main">
            {/* Tab bar */}
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

            {/* Tab panels */}
            <div className="program-tab-panel" role="tabpanel" aria-label={tabs.find((t) => t.id === activeTab)?.label}>
              {activeTab === "overview" && (
                <div className="program-tab-overview">
                  <h2 className="program-tab-overview__title">
                    <T>Program Overview</T>
                  </h2>
                  <p className="program-tab-overview__body">
                    <T>This program builds the skills to understand, analyze and redesign business processes and develop actionable recommendations. Participants will work through a structured methodology used by process professionals globally.</T>
                  </p>
                  <ul className="program-checklist" role="list">
                    {learningOutcomes.map((outcome) => (
                      <li key={outcome} className="program-checklist__item">
                        <span className="program-checklist__icon" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <T>{outcome}</T>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "learning-outcomes" && (
                <div className="program-tab-outcomes">
                  <p className="program-tab-eyebrow">
                    <T>Learning Outcomes</T>
                  </p>
                  <h2 className="program-tab-outcomes__title">
                    <T>What will you learn?</T>
                  </h2>
                  <ul className="program-checklist" role="list">
                    {learningOutcomes.map((outcome) => (
                      <li key={outcome} className="program-checklist__item">
                        <span className="program-checklist__icon" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <T>{outcome}</T>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "course-outline" && (
                <div className="program-tab-outline">
                  <h2 className="program-tab-outcomes__title">
                    <T>Course Outline</T>
                  </h2>
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
                      <h2 className="program-trainer-card__name">{expert.name}</h2>
                      <p className="program-trainer-card__role">
                        <T>{expert.role}</T>
                      </p>
                      <Button variant="outline" href={`/experts/${expert.slug}`} dot="start">
                        View Profile
                      </Button>
                    </div>
                  </div>
                  <p className="program-trainer-bio">
                    <T>Brings hands-on process management and improvement expertise, connecting program concepts to workplace examples.</T>
                  </p>
                </div>
              )}

              {activeTab === "faqs" && (
                <div className="program-tab-faqs">
                  <h2 className="program-tab-outcomes__title">
                    <T>Frequently Asked Questions</T>
                  </h2>
                  <dl className="faq-list">
                    {faqItems.map((item) => {
                      const isOpen = openFaq === item.id;
                      return (
                        <div key={item.id} className={["faq-item", isOpen ? "faq-item--open" : ""].filter(Boolean).join(" ")}>
                          <dt>
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
                                {isOpen ? "−" : "+"}
                              </span>
                            </button>
                          </dt>
                          <dd id={`prog-faq-answer-${item.id}`} className="faq-item__answer" hidden={!isOpen}>
                            <p><T>{item.answer}</T></p>
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="program-tab-reviews">
                  <h2 className="program-tab-outcomes__title">
                    <T>Participant Reviews</T>
                  </h2>
                  <div className="program-reviews-list">
                    {reviews.map((review) => (
                      <div key={review.author} className="program-review-card">
                        <div className="program-review-card__meta">
                          <strong className="program-review-card__author">{review.author}</strong>
                          <span className="stars stars--small" role="img" aria-label={`${review.rating} out of 5 stars`}>
                            {Array.from({ length: review.rating }, (_, i) => (
                              <img key={i} src="/assets/icons/star.svg" alt="" width={12} height={12} />
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

              {/* Previous / Next navigation */}
              <div className="program-tab-nav">
                <button
                  type="button"
                  className="program-tab-nav__btn"
                  onClick={() => {
                    const idx = tabs.findIndex((t) => t.id === activeTab);
                    if (idx > 0) setActiveTab(tabs[idx - 1].id);
                  }}
                  disabled={activeTab === tabs[0].id}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <T>Previous</T>
                </button>
                <button
                  type="button"
                  className="program-tab-nav__btn program-tab-nav__btn--next"
                  onClick={() => {
                    const idx = tabs.findIndex((t) => t.id === activeTab);
                    if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
                  }}
                  disabled={activeTab === tabs[tabs.length - 1].id}
                >
                  <T>Next</T>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
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
                      <img
                        src="/assets/icons/riyal.svg"
                        alt="SAR"
                        width={22}
                        height={22}
                        style={{ filter: "invert(37%) sepia(44%) saturate(571%) hue-rotate(103deg) brightness(89%) contrast(90%)" }}
                      />
                      <span className="program-register-fee__amount">{price}</span>
                    </div>
                    {compareAt && (
                      <div className="program-register-fee__compare">
                        <img
                          src="/assets/icons/riyal.svg"
                          alt=""
                          width={10}
                          height={10}
                          aria-hidden="true"
                        />
                        <span>{compareAt}</span>
                      </div>
                    )}
                  </div>
                  <p className="program-register-fee__note">
                    <T>HRDF Tax Refund Request.</T>
                  </p>
                </div>

                <div className="program-register-selects">
                  <label className="program-register-select">
                    <span className="program-register-select__label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <T>Select Date</T>
                    </span>
                    <select className="program-register-select__control" aria-label="Select program date">
                      <option value="">—</option>
                      <option value="jan-2025">Jan 15–19, 2025</option>
                      <option value="mar-2025">Mar 10–14, 2025</option>
                      <option value="may-2025">May 5–9, 2025</option>
                    </select>
                    <svg className="program-register-select__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </label>

                  <label className="program-register-select">
                    <span className="program-register-select__label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <T>Select Location</T>
                    </span>
                    <select className="program-register-select__control" aria-label="Select program location">
                      <option value="">—</option>
                      <option value="riyadh">Riyadh</option>
                      <option value="online">Online</option>
                      <option value="jeddah">Jeddah</option>
                    </select>
                    <svg className="program-register-select__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </label>
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
