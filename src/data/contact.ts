export const contactHero = {
  eyebrow: "Contact",
  title: "Let’s start learning something together",
  cta: "Sign In",
  ctaHref: "/signin",
} as const;

export const contactIntro = {
  eyebrow: "Get in touch",
  title: "Let's begin with one conversation",
  body: "A practical program that builds the skills to understand, analyze and redesign business processes and develop actionable recommendations.",
} as const;

export const faqItems = [
  {
    id: "faq-1",
    question: "How long is the program?",
    answer:
      "ES learning is dedicated for the moment. Programs range from 2 to 15 days depending on the subject and level. Each program page lists the exact duration and scheduled hours.",
  },
  {
    id: "faq-2",
    question: "Where is the program held?",
    answer:
      "Programs are held at our training facilities in Riyadh, Saudi Arabia, or delivered online via our virtual classroom platform. The delivery mode is listed on each program page.",
  },
  {
    id: "faq-3",
    question: "Is practical work included?",
    answer:
      "Yes. All ES Learning programs are built around applied exercises, real-world case studies, and hands-on activities so participants can use what they learn immediately in their roles.",
  },
  {
    id: "faq-4",
    question: "Is there an exam and Certificate?",
    answer:
      "Many programs include an assessment and award a recognized certificate upon completion. Specific certification requirements and accrediting bodies are listed on each program's detail page.",
  },
] as const;

export const contactFaqs = faqItems;

export const audienceOptions = ["Individual", "Professional", "Organization"] as const;
