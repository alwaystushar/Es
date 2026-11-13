"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";
import { faqItems } from "@/data/contact";

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-container">
        <div className="faq-section__intro">
          <Eyebrow>FAQs</Eyebrow>
          <RevealLines id="faq-title" as="h2" className="faq-section__title">
            Frequently Asked Questions
          </RevealLines>
        </div>

        <dl className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={["faq-item", isOpen ? "faq-item--open" : ""].filter(Boolean).join(" ")}>
                <dt>
                  <button
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() => toggle(item.id)}
                  >
                    <span className="faq-item__question">
                      <T>{item.question}</T>
                    </span>
                    <span className="faq-item__icon" aria-hidden="true">
                      {isOpen ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${item.id}`}
                  className="faq-item__answer"
                  hidden={!isOpen}
                >
                  <p>
                    <T>{item.answer}</T>
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
