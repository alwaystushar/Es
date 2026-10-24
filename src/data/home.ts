export const navigation = [
  { label: "About Us", href: "/about" },
  { label: "Training Programs", href: "/programs" },
  { label: "Seminars", href: "/seminars" },
  { label: "Knowledge Hub", href: "/knowledge" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const stats = [
  { value: "10k+", label: "Specialists trained" },
  { value: "80+", label: "Organizations" },
  { value: "4,100+", label: "Learning Hours" },
  { value: "300+", label: "Programs" },
  { value: "95%", label: "Satisfaction rate" },
] as const;

export const whyItems = [
  {
    title: "Rooted in the Local Context",
    description:
      "We bring global knowledge into the context of the Saudi workplace, addressing the needs of professionals and organizations.",
    icon: "/assets/icons/why-frame.svg",
    iconWidth: 40,
    iconHeight: 40,
  },
  {
    title: "Established Global Methodologies",
    description: "Our programs draw on internationally recognized methodologies relevant to each field.",
    icon: "/assets/icons/why-group-a.svg",
    iconWidth: 36,
    iconHeight: 36,
  },
  {
    title: "Expertise Shaped by Practice",
    description:
      "Our programs are led by experienced practitioners who connect specialist knowledge with the realities of the workplace.",
    icon: "/assets/icons/why-group-c.svg",
    iconWidth: 34,
    iconHeight: 32,
  },
  {
    title: "Knowledge Made Practical",
    description: "We turn ideas into practical tools and exercises you can use directly in your role.",
    icon: "/assets/icons/why-group-b.svg",
    iconWidth: 35,
    iconHeight: 35,
  },
] as const;

export const programAreas = [
  {
    slug: "meeting-workshop-facilitation",
    title: "Meeting & Workshop Facilitation",
    description:
      "Lead productive discussions, encourage participation, and turn meetings and workshops into meaningful outcomes.",
    image: "/assets/images/area-facilitation.webp",
    alt: "Professionals collaborating around a laptop during a workshop",
  },
  {
    slug: "strategy-performance-measurement",
    title: "Strategy & Performance Measurement",
    description:
      "Set clear objectives and develop meaningful indicators to track performance and guide decisions.",
    image: "/assets/images/area-strategy.webp",
    alt: "Professional working on a laptop in a bright office",
  },
  {
    slug: "process-policy-management",
    title: "Process & Policy Management",
    description:
      "Understand how work gets done, document and improve processes, and develop clearer, more effective policies.",
    image: "/assets/images/area-process.webp",
    alt: "Two colleagues reviewing work together",
  },
  {
    slug: "technology-governance",
    title: "Technology Governance",
    description:
      "Develop expertise in governance, risk, information security, and specialized technology disciplines.",
    image: "/assets/images/area-technology.webp",
    alt: "Team reviewing technology governance materials",
  },
  {
    slug: "innovation-entrepreneurship",
    title: "Innovation & Entrepreneurship",
    description:
      "Understand user needs, develop new ideas, and design better services and solutions.",
    image: "/assets/images/area-innovation.webp",
    alt: "Two professionals reviewing a laptop outdoors at night",
  },
  {
    slug: "excellence-quality",
    title: "Excellence & Quality",
    description:
      "Improve performance and efficiency through practical quality and excellence tools.",
    image: "/assets/images/area-excellence.webp",
    alt: "Professional using a tablet with a coastal view behind him",
  },
] as const;

export const featuredPrograms = [
  {
    slug: "developing-internal-policies",
    title: "Developing internal policies for organizations",
    image: "/assets/images/program-policies.webp",
    alt: "Two professionals reviewing documents together",
  },
  {
    slug: "project-governance",
    title: "Project Governance",
    image: "/assets/images/program-governance.webp",
    alt: "Presenter speaking in front of a highway analytics display",
  },
  {
    slug: "data-analysis-power-bi",
    title: "Data analysis using Power BI software",
    image: "/assets/images/program-powerbi.webp",
    alt: "Colleagues discussing a report in a modern office",
  },
  {
    slug: "rapid-business-process-improvement",
    title: "Rapid Improvement of Business Processes...",
    image: "/assets/images/program-improvement.webp",
    alt: "Professional reviewing work at a desk",
  },
] as const;

export const articles = [
  {
    slug: "choose-your-career-path",
    category: "Career Development",
    title: "Choose Your Career Path",
    excerpt: "Identify skill gaps and find the right learning for your next step.",
    image: "/assets/images/article-career.webp",
    alt: "Learners seated in a training room",
  },
  {
    slug: "turn-strategy-into-results",
    category: "Strategic Planning",
    title: "Turn Strategy into Results",
    excerpt: "Align goals, track progress, and improve performance.",
    image: "/assets/images/article-strategy.webp",
    alt: "Professional working on a laptop in a blue-lit workspace",
  },
  {
    slug: "make-work-more-efficient",
    category: "Process Management",
    title: "Make Work More Efficient",
    excerpt: "Improve processes, reduce complexity, and work smarter.",
    image: "/assets/images/article-process.webp",
    alt: "Two professionals shaking hands in an office",
  },
] as const;

export const partners = [
  { name: "INIFAC", src: "/assets/logos/partner-inifac.webp", width: 1630, height: 614, logoWidth: "7.2737rem", logoHeight: "3.4278rem" },
  { name: "IAF", src: "/assets/logos/partner-iaf.webp", width: 853, height: 228, logoWidth: "11.0263rem", logoHeight: "4.0682rem" },
  { name: "TregearBPM", src: "/assets/logos/partner-tregear.webp", width: 288, height: 174, logoWidth: "5.6253rem", logoHeight: "3.3751rem" },
  { name: "Leadership Strategies", src: "/assets/logos/partner-leadership.webp", width: 360, height: 140, logoWidth: "7.1439rem", logoHeight: "2.7782rem" },
  { name: "The Grove", src: "/assets/logos/partner-grove.webp", width: 1000, height: 230, logoWidth: "8.4609rem", logoHeight: "1.946rem" },
  { name: "DETECON Consulting", src: "/assets/logos/partner-detecon.webp", width: 685, height: 211, logoWidth: "9.2867rem", logoHeight: "5.2191rem" },
] as const;

export const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Training Programs", href: "/programs" },
  { label: "Seminars", href: "/seminars" },
  { label: "Knowledge Hub", href: "/knowledge" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Terms & Condition", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Quality Policy", href: "/quality" },
] as const;
