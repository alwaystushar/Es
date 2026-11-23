export const orgHero = {
  title: "Learning designed to strengthen capabilities and performance",
  titleLines: ["Learning designed to", "strengthen capabilities", "and performance"] as const,
  body: "We design learning around your organization's needs, building the skills required to improve performance and achieve its goals.",
  image: "/assets/images/organization/hero.webp",
  alt: "Professionals studying together on amphitheater seating",
  primaryLabel: "Request a Tailored Solution",
  primaryHref: "#contact-enquiry",
  secondaryLabel: "Talk to Our Experts",
  secondaryHref: "/experts",
} as const;

export const orgProgramAreas = [
  {
    slug: "talent-capability-development",
    title: "Talent & Capability Development",
    description: "Programs that develop essential skills and create clearer pathways for professional growth.",
    image: "/assets/images/organization/area-talent.webp",
    alt: "Professionals collaborating during a capability workshop",
    crop: { left: "-10%", top: "0%", width: "130%", height: "142%" },
  },
  {
    slug: "customized-learning-journeys",
    title: "Customized Learning Journeys",
    description: "We create integrated learning journeys tailored to your audience and organizational objectives.",
    image: "/assets/images/organization/area-journeys.webp",
    alt: "Team reviewing a customized learning plan together",
    crop: { left: "-10%", top: "-5%", width: "147%", height: "174%" },
  },
  {
    slug: "training-needs-analysis",
    title: "Training Needs Analysis",
    description: "We identify training needs and prioritize capability gaps before developing the plan.",
    image: "/assets/images/organization/area-needs.webp",
    alt: "Facilitator presenting during a needs analysis session",
    crop: { left: "0%", top: "0%", width: "104%", height: "114%" },
  },
  {
    slug: "training-impact-measurement",
    title: "Training Impact Measurement",
    description: "We evaluate what has been achieved and how learning translates into workplace performance.",
    image: "/assets/images/organization/area-impact.webp",
    alt: "Professionals reviewing training outcomes on a laptop",
    crop: { left: "-15%", top: "-3%", width: "133%", height: "156%" },
  },
  {
    slug: "coaching-mentoring",
    title: "Coaching & Mentoring",
    description: "One-to-one coaching helps leaders and professionals develop and navigate workplace challenges.",
    image: "/assets/images/organization/area-coaching.webp",
    alt: "Coach and professional in a mentoring conversation",
    crop: { left: "-5%", top: "-2%", width: "114%", height: "124%" },
  },
  {
    slug: "leadership-development",
    title: "Leadership Development",
    description: "We help leaders strengthen the skills needed to guide teams and make effective decisions.",
    image: "/assets/images/organization/area-leadership.webp",
    alt: "Leaders collaborating in a development workshop",
    crop: { left: "-8%", top: "-5%", width: "116%", height: "127%" },
  },
] as const;

export const orgAreasIntro = {
  eyebrow: "Program areas",
  title: "Learning solutions built around your organization",
  titleLines: ["Learning solutions built around", "your organization"] as const,
  copy: "From needs analysis to solution design and impact measurement, we tailor the approach to your organization and audience.",
} as const;

export const orgWhyItems = [
  {
    title: "Learning Tailored to Your Needs",
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

export const orgWhyIntro = {
  eyebrow: "Why ES Learning?",
  title: "Why choose ES Learning for your team?",
} as const;

export const orgProcessSteps = [
  {
    step: "01",
    title: "Identify the Need",
    description: "We identify the gap between current capabilities and desired performance.",
  },
  {
    step: "02",
    title: "Design the Solution",
    description: "We design the right program or integrated learning journey.",
  },
  {
    step: "03",
    title: "Deliver the learning",
    description: "Practical training delivered by experienced specialists.",
  },
  {
    step: "04",
    title: "Measure impact",
    description: "We review workplace application and training outcomes.",
  },
] as const;

export const orgEnquiryTypes = [
  "Custom Learning Program",
  "Training Needs Analysis",
  "Leadership Development",
  "Coaching & Mentoring",
  "Other",
] as const;
