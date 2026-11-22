"use client";

import { FormEvent, useState } from "react";
import { orgEnquiryTypes } from "@/data/organization";
import { Button } from "@/components/ui/Button";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldWash } from "@/components/ui/FieldWash";
import { RevealLines } from "@/components/animation/RevealLines";
import { T, tr, useLocale } from "@/i18n/locale";

const enquiryOptions = orgEnquiryTypes.map((label) => ({ value: label, label }));

export function OrgEnquiry() {
  const { locale } = useLocale();
  const [enquiryType, setEnquiryType] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const organization = String(data.get("organization") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const need = String(data.get("need") ?? "").trim();

    if (organization.length < 2 || name.length < 2 || !email.includes("@") || need.length < 12) {
      setSent(false);
      setError("Add your organization, name, a valid business email, and a training need of at least 12 characters.");
      return;
    }

    setError("");
    setSent(true);
    setEnquiryType("");
    event.currentTarget.reset();
  }

  return (
    <section className="org-enquiry" id="contact-enquiry" aria-labelledby="org-enquiry-title">
      <FieldWash />
      <div className="section-container">
        <div className="org-enquiry__panel">
          <div className="org-enquiry__intro">
            <Eyebrow light>Contact us</Eyebrow>
            <RevealLines id="org-enquiry-title" as="h2" className="org-enquiry__title">
              What does your organization need to develop?
            </RevealLines>
            <RevealLines as="p" className="org-enquiry__lede" duration={0.7} stagger={0.08}>
              Tell us about your need or challenge and our team will discuss the right next step.
            </RevealLines>
          </div>

          <form className="org-enquiry__form" onSubmit={onSubmit} noValidate>
            <p className="org-enquiry__note">
              <T>Select your enquiry type and describe your main development needs.</T>
            </p>

            <div className="org-enquiry__grid">
              <label className="org-enquiry__field">
                <span>
                  <T>Organization Name</T>
                </span>
                <input name="organization" autoComplete="organization" placeholder={tr(locale, "Enter organization name")} required />
              </label>
              <label className="org-enquiry__field">
                <span>
                  <T>Full Name</T>
                </span>
                <input name="name" autoComplete="name" placeholder={tr(locale, "Enter full name")} required />
              </label>
              <label className="org-enquiry__field">
                <span>
                  <T>Job Title</T>
                </span>
                <input name="jobTitle" autoComplete="organization-title" placeholder={tr(locale, "Enter job title")} />
              </label>
              <label className="org-enquiry__field">
                <span>
                  <T>Business Email</T>
                </span>
                <input name="email" type="email" autoComplete="email" placeholder={tr(locale, "Enter business email")} required />
              </label>
              <label className="org-enquiry__field">
                <span>
                  <T>Contact Number</T>
                </span>
                <input name="phone" type="tel" autoComplete="tel" placeholder={tr(locale, "Enter contact number")} />
              </label>
              <div className="org-enquiry__field">
                <span>
                  <T>Select Enquiry Type</T>
                </span>
                <CustomSelect
                  name="enquiryType"
                  value={enquiryType}
                  options={enquiryOptions}
                  placeholder="Select Enquiry Type"
                  ariaLabel="Select Enquiry Type"
                  className="org-enquiry__select"
                  onChange={setEnquiryType}
                />
              </div>
            </div>

            <label className="org-enquiry__field org-enquiry__field--full">
              <span>
                <T>Training Need or Challenge</T>
              </span>
              <textarea
                name="need"
                rows={4}
                placeholder={tr(locale, "Enter Training Need or Challenge")}
                required
              />
            </label>

            {error ? <p className="org-enquiry__error">{tr(locale, error)}</p> : null}
            {sent ? (
              <p className="org-enquiry__success">
                <T>Thank you. Your message is ready for the ES Learning team.</T>
              </p>
            ) : null}

            <Button type="submit" plain className="org-enquiry__submit" dot="none">
              Submit Enquiry
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
