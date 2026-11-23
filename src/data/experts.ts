export type Expert = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  about: string;
  qualifications: string;
  areasOfExpertise: { title: string; description: string }[];
  programsDelivered: { title: string; description: string }[];
};

/** Figma 3129:55295 — four team cards on the Experts page */
export const expertCatalog: Expert[] = [
  {
    slug: "imran-al-mikhlafi",
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    photo: "/assets/images/experts/card-1.webp",
    photoAlt: "Imran Al-Mikhlafi portrait",
    about:
      "Imran Al-Mikhlafi focuses on connecting strategic thinking with practical business performance. His proposed expert profile highlights the importance of translating organizational objectives into actionable plans, meaningful performance indicators, and measurable outcomes.",
    qualifications:
      "Add verified academic qualifications, professional certifications, and relevant institutional affiliations here.",
    areasOfExpertise: [
      {
        title: "Strategic Planning",
        description: "Developing clear objectives and aligning strategic priorities.",
      },
      {
        title: "KPI & Performance Management",
        description: "Establishing meaningful indicators and monitoring organizational performance.",
      },
      {
        title: "Strategy Execution",
        description: "Translating organizational strategies into practical initiatives.",
      },
    ],
    programsDelivered: [
      {
        title: "Strategic Management",
        description:
          "Develop and execute organizational strategies with clear objectives and practical implementation approaches.",
      },
      {
        title: "KPI Management",
        description:
          "Build effective performance indicators that connect strategic goals with measurable results.",
      },
      {
        title: "Strategic Planning & Corporate Performance Management",
        description:
          "Strengthen strategic alignment, performance monitoring, and organizational decision-making.",
      },
    ],
  },
  {
    slug: "imran-al-mikhlafi-2",
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    photo: "/assets/images/experts/card-2.webp",
    photoAlt: "Imran Al-Mikhlafi portrait",
    about: "Expert in business process management with years of practical experience.",
    qualifications: "Certified Business Process Professional (CBPP).",
    areasOfExpertise: [
      { title: "Process Management", description: "Understanding and improving organizational processes." },
    ],
    programsDelivered: [
      { title: "BPM Professional", description: "Comprehensive business process management training." },
    ],
  },
  {
    slug: "imran-al-mikhlafi-3",
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    photo: "/assets/images/experts/card-3.webp",
    photoAlt: "Imran Al-Mikhlafi portrait",
    about: "Specialist in process improvement and organizational excellence.",
    qualifications: "Advanced Process Improvement Certification.",
    areasOfExpertise: [
      { title: "Process Improvement", description: "Identifying and implementing process efficiencies." },
    ],
    programsDelivered: [
      { title: "Rapid Process Improvement", description: "Fast-track process improvement techniques." },
    ],
  },
  {
    slug: "imran-al-mikhlafi-4",
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    photo: "/assets/images/experts/card-4.webp",
    photoAlt: "Imran Al-Mikhlafi portrait",
    about: "Experienced facilitator specializing in team performance.",
    qualifications: "Certified Facilitator, International Association of Facilitators.",
    areasOfExpertise: [
      { title: "Facilitation", description: "Leading productive workshops and meetings." },
    ],
    programsDelivered: [
      { title: "Meeting & Workshop Facilitation", description: "Professional facilitation skills program." },
    ],
  },
];

export const experts = expertCatalog;

export const expertsHero = {
  title: "Practitioner expertise at the heart of learning",
  body: "Our experts combine specialist knowledge with professional practice to create learning experiences grounded in real workplace challenges.",
  image: "/assets/images/experts/hero-photo.webp",
} as const;

export function getExpert(slug: string) {
  return expertCatalog.find((item) => item.slug === slug);
}
