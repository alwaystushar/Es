export const navigation = [
  { label: "About Us", href: "/about" },
  { label: "Training Programs", href: "/programs" },
  { label: "Seminars", href: "/seminars" },
  { label: "Knowledge Hub", href: "/knowledge" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const stats = [
  { value: "10,000+", label: "Participants trained" },
  { value: "86+", label: "Public & private organizations" },
  { value: "300+", label: "Training program" },
  { value: "4,100", label: "Hours of applied learning" },
  { value: "95%", label: "Participant satisfaction" },
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
    crop: { left: "-9.11%", top: "-6.88%", width: "113.9%", height: "124.37%" },
  },
  {
    slug: "strategy-performance-measurement",
    title: "Strategy & Performance Measurement",
    description:
      "Set clear objectives and develop meaningful indicators to track performance and guide decisions.",
    image: "/assets/images/area-strategy.webp",
    alt: "Professional working on a laptop in a bright office",
    crop: { left: "-4.62%", top: "-18.22%", width: "129.45%", height: "143.71%" },
  },
  {
    slug: "process-policy-management",
    title: "Process & Policy Management",
    description:
      "Understand how work gets done, document and improve processes, and develop clearer, more effective policies.",
    image: "/assets/images/area-process.webp",
    alt: "Two colleagues reviewing work together",
    crop: { left: "-10.74%", top: "-8.8%", width: "110.74%", height: "154.02%" },
  },
  {
    slug: "technology-governance",
    title: "Technology Governance",
    description:
      "Develop expertise in governance, risk, information security, and specialized technology disciplines.",
    image: "/assets/images/area-technology.webp",
    alt: "Team reviewing technology governance materials",
    crop: { left: "-9.11%", top: "-6.88%", width: "150.34%", height: "164.16%" },
  },
  {
    slug: "innovation-entrepreneurship",
    title: "Innovation & Entrepreneurship",
    description:
      "Understand user needs, develop new ideas, and design better services and solutions.",
    image: "/assets/images/area-innovation.webp",
    alt: "Two professionals reviewing a laptop outdoors at night",
    crop: { left: "-21.62%", top: "-4.55%", width: "143.23%", height: "156.4%" },
  },
  {
    slug: "excellence-quality",
    title: "Excellence & Quality",
    description:
      "Improve performance and efficiency through practical quality and excellence tools.",
    image: "/assets/images/area-excellence.webp",
    alt: "Professional using a tablet with a coastal view behind him",
    crop: { left: "-9.11%", top: "-6.88%", width: "109.11%", height: "119.14%" },
  },
] as const;

export const featuredPrograms = [
  {
    slug: "developing-internal-policies",
    title: "Developing internal policies for organizations",
    image: "/assets/images/program-policies.webp",
    alt: "Two professionals reviewing documents together",
    crop: { left: "-64.17%", top: "-43.92%", width: "276.82%", height: "138.17%" },
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "15 days",
    hours: "64h",
    price: "2,000",
    compareAt: "2,500",
  },
  {
    slug: "project-governance",
    title: "Developing internal policies for organizations",
    image: "/assets/images/program-governance.webp",
    alt: "Presenter speaking in front of a highway analytics display",
    crop: { left: "-15.16%", top: "-2.99%", width: "126.26%", height: "71.21%" },
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "15 days",
    hours: "64h",
    price: "2,000",
    compareAt: "2,500",
  },
  {
    slug: "data-analysis-power-bi",
    title: "Developing internal policies for organizations",
    image: "/assets/images/program-powerbi.webp",
    alt: "Colleagues discussing a report in a modern office",
    crop: { left: "-5.56%", top: "-17.65%", width: "186.58%", height: "105.23%" },
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "15 days",
    hours: "64h",
    price: "2,000",
    compareAt: "2,500",
  },
  {
    slug: "rapid-business-process-improvement",
    title: "Developing internal policies for organizations",
    image: "/assets/images/program-improvement.webp",
    alt: "Professional reviewing work at a desk",
    crop: { left: "-56.22%", top: "-42.36%", width: "212.59%", height: "119.9%" },
    rating: "4.8",
    reviews: "61 Reviews",
    duration: "15 days",
    hours: "64h",
    price: "2,000",
    compareAt: "2,500",
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
