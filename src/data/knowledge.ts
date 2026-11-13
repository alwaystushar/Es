export const knowledgeCategories = [
  { slug: "all", label: "All" },
  { slug: "articles-insights", label: "Articles & Insights" },
  { slug: "es-learning-news", label: "ES Learning News" },
  { slug: "events-participation", label: "Events & Participation" },
  { slug: "resources", label: "Resources" },
] as const;

export type KnowledgeCategorySlug = (typeof knowledgeCategories)[number]["slug"];

export type KnowledgeArticle = {
  slug: string;
  category: Exclude<KnowledgeCategorySlug, "all">;
  categoryLabel: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
  alt: string;
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "choose-your-career-path",
    category: "articles-insights",
    categoryLabel: "Articles & Insights",
    title: "Choose Your Career Path",
    date: "08/05/2026",
    excerpt: "Identify skill gaps and find the right learning for your next step.",
    body: "Whether you're stepping into a new role or deepening your expertise, understanding your learning direction is essential. The right path is not always obvious, but with the right tools and guidance, you can make confident choices that align with your strengths and ambitions.\n\nStart by assessing where you are today and where you want to be in three to five years. Map out the skills and knowledge required, then look for structured learning that bridges that gap. ES Learning programs are designed with this progression in mind.",
    image: "/assets/images/article-career.webp",
    alt: "Learners seated in a training room",
  },
  {
    slug: "turn-strategy-into-results",
    category: "articles-insights",
    categoryLabel: "Articles & Insights",
    title: "Turn Strategy into Results",
    date: "12/06/2026",
    excerpt: "Align goals, track progress, and improve performance.",
    body: "Organizations that succeed in translating strategy into measurable results share a commitment to clear objectives and disciplined follow-through. Setting strategy is only the beginning — the real challenge is execution.\n\nThis means defining meaningful indicators, building accountability into your team's processes, and creating a culture where performance conversations are regular and constructive. Our Strategy & Performance Measurement programs give you the tools to do exactly this.",
    image: "/assets/images/article-strategy.webp",
    alt: "Professional working on a laptop in a blue-lit workspace",
  },
  {
    slug: "make-work-more-efficient",
    category: "resources",
    categoryLabel: "Resources",
    title: "Make Work More Efficient",
    date: "21/07/2026",
    excerpt: "Improve processes, reduce complexity, and work smarter.",
    body: "Process improvement starts with understanding how work actually flows through your organization. Many inefficiencies are invisible to the people who work within them every day — they become normalized until someone maps them out clearly.\n\nUse process documentation, stakeholder interviews, and value stream analysis to identify where time and effort are wasted. Then design simpler, smarter ways of working that your team will actually adopt.",
    image: "/assets/images/article-process.webp",
    alt: "Two professionals shaking hands in an office",
  },
  {
    slug: "boosting-productivity-with-ai",
    category: "es-learning-news",
    categoryLabel: "ES Learning News",
    title: "Boosting productivity with artificial intelligence: Why do some people work 8 hours and accomplish more than you?",
    date: "05/08/2026",
    excerpt: "Explore how AI tools can reshape productivity in the modern workplace.",
    body: "The rise of AI-assisted workflows has changed how professionals organize their time and manage their output. High performers aren't necessarily working harder — they are working with better systems, and AI is becoming a central part of those systems.\n\nFrom automating repetitive tasks to surfacing insights faster, AI tools allow individuals and teams to focus their attention where it truly matters. Understanding how to integrate these tools into your daily workflow is now a core professional skill.",
    image: "/assets/images/knowledge/article-cover.png",
    alt: "Professional working with AI tools in a modern office",
  },
  {
    slug: "workshop-facilitation-essentials",
    category: "resources",
    categoryLabel: "Resources",
    title: "Workshop Facilitation Essentials",
    date: "10/08/2026",
    excerpt: "Practical tools to lead workshops that generate real outcomes.",
    body: "Effective facilitation is both a skill and a mindset. The best facilitators create environments where ideas surface naturally and decisions emerge from genuine consensus rather than dominant voices.\n\nLearn how to design an agenda that moves a group forward, manage energy in the room, handle difficult dynamics, and document outputs in a way participants can actually act on. Our facilitation programs are rooted in internationally recognized methodologies.",
    image: "/assets/images/article-career.webp",
    alt: "Workshop group discussing in a meeting room",
  },
  {
    slug: "saudi-workplace-learning-trends",
    category: "es-learning-news",
    categoryLabel: "ES Learning News",
    title: "Saudi Workplace Learning Trends in 2026",
    date: "02/09/2026",
    excerpt: "What professionals across the Kingdom are prioritizing this year.",
    body: "Learning investment in the Kingdom continues to rise, with organizations increasingly focused on building capability from within. This year, three themes stand out: leadership development, digital skills, and process excellence.\n\nES Learning has seen growing demand for programs that connect global methodologies to the Saudi workplace context — practical, structured learning that professionals can apply the moment they return to their desks.",
    image: "/assets/images/article-strategy.webp",
    alt: "Professionals in a modern office setting",
  },
  {
    slug: "policy-writing-that-works",
    category: "articles-insights",
    categoryLabel: "Articles & Insights",
    title: "Policy Writing That Actually Works",
    date: "15/09/2026",
    excerpt: "Design policies that people understand, follow, and find useful.",
    body: "Many organizational policies fail not because of bad content, but because of poor structure and inaccessible language. A policy no one reads or understands is effectively no policy at all.\n\nGood policy writing is a design challenge as much as a writing one. It requires understanding your audience, structuring information logically, and testing clarity with real users before publication. Our policy development programs teach exactly this approach.",
    image: "/assets/images/article-process.webp",
    alt: "Person reviewing a policy document",
  },
  {
    slug: "es-learning-annual-event-2026",
    category: "events-participation",
    categoryLabel: "Events & Participation",
    title: "ES Learning Annual Learning Summit 2026",
    date: "20/10/2026",
    excerpt: "Join us for a day of insights, connections, and practical learning.",
    body: "The ES Learning Annual Learning Summit brings together professionals, practitioners, and organizational leaders for a focused day of learning and dialogue. This year's theme is Building Organizations That Learn — exploring how teams can embed continuous development into their culture.\n\nExpect keynote sessions, breakout workshops, and genuine conversation with peers who share your commitment to growth. Spaces are limited.",
    image: "/assets/images/article-career.webp",
    alt: "Conference attendees at an annual summit",
  },
  {
    slug: "governance-essentials-for-teams",
    category: "resources",
    categoryLabel: "Resources",
    title: "Governance Essentials for Project Teams",
    date: "28/10/2026",
    excerpt: "Practical frameworks for oversight, accountability, and decision-making.",
    body: "Project governance is not about adding bureaucracy — it's about creating clarity. When a team knows who makes which decisions, how progress is reported, and what happens when things go off track, they can focus energy on delivery rather than politics.\n\nThis guide walks you through the core governance structures every project team should have in place, drawing on frameworks from our Technology Governance and Project Management programs.",
    image: "/assets/images/article-strategy.webp",
    alt: "Team reviewing governance documents",
  },
];
