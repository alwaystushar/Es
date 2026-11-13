export const seminarFilters = [
  "Upcoming",
  "Past Seminars",
  "Supported by Hadaf",
  "Exclusive to ES Learning",
] as const;

export type SeminarFilter = (typeof seminarFilters)[number];

export const seminarHero = {
  title: "Expert conversations that broaden your perspective",
  body: "Join industry experts for in-depth conversations on leadership, strategy, and professional development.",
  image: "/assets/images/seminars/hero.png",
  imageAlt: "Seminar presenter speaking at an industry event",
} as const;

export const seminarCatalog = [
  {
    slug: "strategy-to-performance",
    title: "From strategy to measurable performance",
    description: "Discover how to turn strategic objectives into actionable plans, and measurable business results.",
    trainer: "Imran Al-Mikhlafi",
    date: "Dec 2nd, 2026",
    time: "4 Pm",
    location: "Online",
    image: "/assets/images/seminars/card-a.png",
    alt: "Seminar presenter speaking at an event",
    filter: "Upcoming" as SeminarFilter,
    about:
      "This seminar explores how organisations can align strategy with execution, building clear pathways from high-level objectives to actionable operational plans. Participants will gain frameworks to translate vision into measurable outcomes.",
    afterSeminar:
      "A summary, approved photos or a recording may be added when available. Registered attendees will be notified by email.",
  },
  {
    slug: "leadership-in-practice",
    title: "Leadership in practice: building high-performance teams",
    description: "Practical frameworks for developing leadership presence, communicating vision, and driving results.",
    trainer: "Imran Al-Mikhlafi",
    date: "Dec 9th, 2026",
    time: "2 Pm",
    location: "Online",
    image: "/assets/images/seminars/card-b.png",
    alt: "Leadership workshop participants collaborating",
    filter: "Upcoming" as SeminarFilter,
    about:
      "Effective leadership goes beyond authority. This seminar focuses on the behaviours, communication styles and decision-making approaches that distinguish high-impact leaders from managers.",
    afterSeminar:
      "A summary and selected slides will be shared with registered attendees after the session.",
  },
  {
    slug: "policy-design-essentials",
    title: "Policy design essentials for organisations",
    description: "Learn how to structure, write and implement organisational policies that drive real behavioural change.",
    trainer: "Imran Al-Mikhlafi",
    date: "Dec 16th, 2026",
    time: "3 Pm",
    location: "Online",
    image: "/assets/images/seminars/card-a.png",
    alt: "Professionals reviewing policy documents",
    filter: "Supported by Hadaf" as SeminarFilter,
    about:
      "Policies are the backbone of organisational governance. This seminar introduces a structured approach to drafting, reviewing and communicating policies that employees understand and follow.",
    afterSeminar:
      "A recording and resource pack will be made available to all registered attendees within five business days.",
  },
  {
    slug: "bpm-for-decision-makers",
    title: "Business process management for decision makers",
    description: "An executive introduction to BPM: how to identify inefficiencies, model processes, and drive continuous improvement.",
    trainer: "Imran Al-Mikhlafi",
    date: "Jan 6th, 2027",
    time: "10 Am",
    location: "Online",
    image: "/assets/images/seminars/card-b.png",
    alt: "Executive team reviewing process maps",
    filter: "Exclusive to ES Learning" as SeminarFilter,
    about:
      "Business Process Management gives organisations a systematic way to improve how work gets done. This seminar is designed for decision-makers who want to champion BPM without getting lost in technical detail.",
    afterSeminar:
      "Session notes and a curated reading list will be shared after the seminar.",
  },
  {
    slug: "data-driven-performance",
    title: "Data-driven performance management",
    description: "Using KPIs, dashboards and analytics to build a culture of accountability and continuous improvement.",
    trainer: "Imran Al-Mikhlafi",
    date: "Nov 10th, 2026",
    time: "11 Am",
    location: "Online",
    image: "/assets/images/seminars/card-a.png",
    alt: "Professional reviewing performance dashboards",
    filter: "Past Seminars" as SeminarFilter,
    about:
      "Performance data is only valuable when it drives decisions. This seminar covers how to design meaningful KPIs, build dashboards that inform rather than overwhelm, and use data to have better performance conversations.",
    afterSeminar:
      "A recording of this past seminar is available to registered attendees on request.",
  },
  {
    slug: "communication-for-impact",
    title: "Communication for impact: influencing without authority",
    description: "How to communicate complex ideas, navigate difficult conversations, and build influence across your organisation.",
    trainer: "Imran Al-Mikhlafi",
    date: "Oct 28th, 2026",
    time: "2 Pm",
    location: "Online",
    image: "/assets/images/seminars/card-b.png",
    alt: "Professionals in a communication skills workshop",
    filter: "Past Seminars" as SeminarFilter,
    about:
      "Influence is a skill that can be developed. This seminar equips professionals with practical communication tools: structuring a compelling message, adapting your style to your audience, and driving action without direct authority.",
    afterSeminar:
      "Session summary and participant resources were distributed by email after this seminar.",
  },
] as const;

export type Seminar = (typeof seminarCatalog)[number];

export const seminars = seminarCatalog;

export function getSeminar(slug: string) {
  return seminarCatalog.find((item) => item.slug === slug);
}
