"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealLines } from "@/components/animation/RevealLines";
import { T } from "@/i18n/locale";
import { faqItems } from "@/data/contact";

type FaqItemProps = {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function FaqItem({ id, question, answer, open, onOpen, onClose }: FaqItemProps) {
  return (
    <div
      className={["faq-item", open ? "faq-item--open" : ""].filter(Boolean).join(" ")}
      onMouseEnter={onOpen}
      onFocus={onOpen}
    >
      <button
        type="button"
        className="faq-item__trigger"
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        onClick={() => (open ? onClose() : onOpen())}
      >
        <span className="faq-item__question">
          <T>{question}</T>
        </span>
        <span className="faq-item__icon" aria-hidden="true">
          <span className="faq-item__icon-bar faq-item__icon-bar--h" />
          <span className="faq-item__icon-bar faq-item__icon-bar--v" />
        </span>
      </button>
      <div id={`faq-answer-${id}`} className="faq-item__answer" role="region">
        <div className="faq-item__answer-inner">
          <p>
            <T>{answer}</T>
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-container faq-section__inner">
        <div className="faq-section__intro">
          <Eyebrow>FAQs</Eyebrow>
          <RevealLines id="faq-title" as="h2" className="faq-section__title">
            Frequently Asked Questions
          </RevealLines>
        </div>

        <div
          className="faq-list"
          role="list"
          onMouseLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setOpenId("");
            }
          }}
        >
          {faqItems.map((item) => (
            <FaqItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              open={openId === item.id}
              onOpen={() => setOpenId(item.id)}
              onClose={() => setOpenId("")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
