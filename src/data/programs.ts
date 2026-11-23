export const programFilters = [
  "All Programs",
  "Public Programs",
  "Supported by Hadaf",
  "Exclusive to ES Learning",
] as const;

export const programSubjectAreas = [
  "All Subject Areas",
  "Meeting & Workshop Facilitation",
  "Strategy & Performance Measurement",
  "Process & Policy Management",
  "Technology Governance",
  "Innovation & Entrepreneurship",
  "Excellence & Quality",
] as const;

export const programCatalog = [
  {
    slug: "bpm-professional",
    badge: "Exclusive to ES Learning",
    category: "Process & Policy Management",
    title: "Business Process Management Professional",
    description:
      "From process management fundamentals to analysis, future-state design and actionable recommendations.",
    image: "/assets/images/programs/cards/bpm-professional.webp",
    alt: "Two professionals reviewing documents at a desk",
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "5 days",
    price: "8,400",
    compareAt: "10,000",
  },
  {
    slug: "advanced-bpm",
    badge: "Exclusive to ES Learning",
    category: "Process & Policy Management",
    title: "Advanced Business Process Management",
    description:
      "Advanced tools for process analysis, complex problem-solving and consulting project management.",
    image: "/assets/images/programs/cards/advanced-bpm.webp",
    alt: "Professionals collaborating around a laptop in a modern office",
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "5 days",
    price: "8,400",
    compareAt: "10,000",
  },
  {
    slug: "service-innovation-design",
    badge: "Public Program",
    category: "Innovation & Entrepreneurship",
    title: "Service Innovation & Design",
    description:
      "Understand market needs and develop stronger services through prototyping and testing.",
    image: "/assets/images/programs/cards/service-innovation.webp",
    alt: "Facilitator presenting to a team in a bright workshop space",
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "5 days",
    price: "1,500",
    compareAt: "2,000",
  },
  {
    slug: "lean-six-sigma-green-belt",
    badge: "Public Program",
    category: "Excellence & Quality",
    title: "Lean Six Sigma Green Belt",
    description:
      "Identify waste and improve outcomes through structured application of Lean Six Sigma tools.",
    image: "/assets/images/programs/cards/lean-six-sigma.webp",
    alt: "Professionals collaborating at a table during a workshop",
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "5 days",
    price: "1,500",
    compareAt: "2,000",
  },
  {
    slug: "strategic-visualization",
    badge: "Public Program",
    category: "Strategy & Performance Measurement",
    title: "Strategic Visualization",
    description:
      "Facilitate strategic planning workshops with visual tools that structure discussions and accelerate progress.",
    image: "/assets/images/programs/cards/strategic-visualization.webp",
    alt: "Team reviewing plans on a wall during a strategy session",
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "5 days",
    price: "1,500",
    compareAt: "2,000",
  },
  {
    slug: "professional-process-documentation",
    badge: "Public Program",
    category: "Process & Policy Management",
    title: "Professional Process Documentation (PDxel)",
    description:
      "A practical approach to capturing, documenting and modeling processes using BPMN 2.0 and EPC.",
    image: "/assets/images/programs/cards/process-documentation.webp",
    alt: "Professionals reviewing process documentation together",
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "5 days",
    price: "1,500",
    compareAt: "2,000",
  },
] as const;

export const programsTeamCta = {
  title: "Looking for training for your team?",
  body: "We can tailor learning objectives, content and activities to your organization's needs and target audience.",
  action: "Request a Team Proposal",
} as const;
