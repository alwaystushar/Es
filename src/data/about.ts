export const aboutHero = {
  title: "Building capabilities for better performance",
  body: "ES Learning is a Saudi company dedicated to capability development and stronger performance. Our practical programs draw on global methodologies",
  image: "/assets/images/about/hero-classroom.png",
  imageAlt: "Learners in a classroom workshop",
  field: "/assets/images/about/hero-field.svg",
  mask: "/assets/images/about/hero-mask.svg",
} as const;

export const aboutFoundations = [
  {
    title: "Global Methodologies",
    description: "Specialist methodologies underpin structured, practical learning experiences.",
    image: "/assets/images/about/foundations/global-methodologies.webp",
    alt: "Participants in traditional attire seated in a workshop amphitheatre",
  },
  {
    title: "Practical Tools",
    description: "Knowledge translated into tools for everyday work.",
    image: "/assets/images/about/foundations/practical-tools.webp",
    alt: "Two professionals reviewing books together in a modern library",
  },
  {
    title: "Practitioner-Led Expertise",
    description: "Specialist knowledge grounded in real-world experience.",
    image: "/assets/images/about/foundations/practitioner-expertise.webp",
    alt: "Facilitator presenting at a whiteboard to colleagues around a table",
  },
  {
    title: "Local Understanding",
    description: "Learning aligned with the needs of Saudi workplaces.",
    image: "/assets/images/about/foundations/local-understanding.webp",
    alt: "Kingdom Centre tower illuminated over Riyadh at night",
  },
] as const;

export const aboutMission = {
  globe: "/assets/images/about/mission-globe.svg",
  mission: {
    title: "Our Mission",
    body: "To deliver programs that combine knowledge, application and experience building skills with lasting workplace value.",
  },
  vision: {
    title: "Our Vision",
    body: "To help build the skills and capabilities that enable professionals and organizations to perform better.",
  },
} as const;

export const aboutValues = [
  {
    title: "Innovation",
    description: "We adapt our programs to evolving workplace needs.",
    icon: "/assets/images/about/values/icon-innovation.svg",
  },
  {
    title: "Integrity",
    description: "We deliver learning with honesty, clarity, and accountability.",
    icon: "/assets/images/about/values/icon-integrity.svg",
  },
  {
    title: "Excellence",
    description: "We hold every experience to a high standard of quality.",
    icon: "/assets/images/about/values/icon-excellence.svg",
  },
  {
    title: "Collaboration",
    description: "We learn with our partners to create stronger outcomes.",
    icon: "/assets/images/about/values/icon-collaboration.svg",
  },
] as const;

/**
 * imagePosition — tweak framing here only.
 *   x / y     → object-position (left/right, top/bottom)
 *   offsetX / offsetY → extra nudge in px/rem (use when x/y alone don’t move enough)
 * Examples: { x: "50%", y: "20%" }  |  { x: "center", y: "top", offsetY: "1rem" }
 */
export const aboutExperts = [
  {
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    image: "/assets/images/experts/expert-about-1.webp",
    imagePosition: { x: "50%", y: "50%", offsetX: "0px", offsetY: "2.25rem" },
  },
  {
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    image: "/assets/images/experts/expert-2.webp",
    imagePosition: { x: "50%", y: "14%", offsetX: "0px", offsetY: "0px" },
  },
  {
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    image: "/assets/images/experts/expert-3.webp",
    imagePosition: { x: "50%", y: "12%", offsetX: "0px", offsetY: "0px" },
  },
  {
    name: "Imran Al-Mikhlafi",
    role: "Certified business process management expert",
    image: "/assets/images/experts/expert-about-4.webp",
    imagePosition: { x: "50%", y: "14%", offsetX: "0px", offsetY: "0px" },
  },
] as const;

export const aboutJourney = {
  title: "Two Development Paths. One Goal: Stronger Performance.",
  body: "Choose the path that fits—whether you're developing your own skills or seeking training for your organization.",
} as const;
