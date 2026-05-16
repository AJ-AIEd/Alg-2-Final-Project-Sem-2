export type ArticleStatus =
  | "Draft"
  | "Published"
  | "Working Paper"
  | "Practitioner Article"
  | "Research Note";

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: ArticleStatus;
  description: string;
  citation: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "from-ai-policy-to-classroom-practice",
    title: "From AI Policy to Classroom Practice",
    date: "2026-05-16",
    category: "AI Policy",
    status: "Practitioner Article",
    description:
      "How schools can translate broad AI principles into clear classroom routines, teacher decisions, and student-facing expectations.",
    citation:
      "Cajina, A. (2026). From AI Policy to Classroom Practice. Andrew Cajina.",
    body: [
      "School AI policy matters, but teachers need more than general principles. They need classroom language, decision routines, examples, and boundaries that fit the subject they teach.",
      "The shift from policy to practice begins with a simple question: what should students still do for themselves, and what support can AI responsibly provide?",
      "In mathematics classrooms, this means protecting reasoning, explanation, representation, and critique while using AI to support planning, feedback, and reflection.",
    ],
  },
  {
    slug: "why-ethical-ai-use-must-be-subject-specific",
    title: "Why Ethical AI Use Must Be Subject-Specific",
    date: "2026-05-16",
    category: "Ethical AI",
    status: "Research Note",
    description:
      "A short argument for treating ethical AI integration as a discipline-specific design problem, not a generic technology policy.",
    citation:
      "Cajina, A. (2026). Why Ethical AI Use Must Be Subject-Specific. Andrew Cajina.",
    body: [
      "Ethical AI use changes across subjects because learning goals change across subjects. What counts as useful assistance in one discipline may weaken the central thinking of another.",
      "Mathematics education requires particular care because the visible answer is often less important than the reasoning path, representation choice, and justification.",
      "Subject-specific AI guidance helps teachers preserve what is intellectually essential in their classrooms.",
    ],
  },
  {
    slug: "ai-tpack-and-the-mathematics-classroom",
    title: "AI-TPACK and the Mathematics Classroom",
    date: "2026-05-16",
    category: "AI-TPACK",
    status: "Working Paper",
    description:
      "A planning lens for aligning AI tools with mathematical content, pedagogical choices, student needs, and ethical constraints.",
    citation:
      "Cajina, A. (2026). AI-TPACK and the Mathematics Classroom. Andrew Cajina.",
    body: [
      "AI-TPACK helps teachers move beyond tool excitement and toward instructional judgment. It asks how technology interacts with content knowledge, pedagogy, learners, and context.",
      "In mathematics, the framework is especially useful for evaluating whether AI helps students reason more deeply or merely produces polished answers more quickly.",
      "A strong AI-TPACK decision keeps the mathematical goal, teacher expertise, and student agency at the center.",
    ],
  },
  {
    slug: "designing-ai-resilient-assessments",
    title: "Designing AI-Resilient Assessments",
    date: "2026-05-16",
    category: "Assessment",
    status: "Draft",
    description:
      "A practical note on assessment designs that value reasoning, process, oral explanation, and authentic transfer.",
    citation:
      "Cajina, A. (2026). Designing AI-Resilient Assessments. Andrew Cajina.",
    body: [
      "AI-resilient assessment is not about trying to make every task impossible for AI. It is about designing evidence of learning that remains meaningful in an AI-rich environment.",
      "Useful strategies include process documentation, personal explanation, transfer tasks, live critique, and revision histories.",
      "The goal is not surveillance. The goal is better evidence of student thinking.",
    ],
  },
  {
    slug: "critical-data-literacy-in-the-age-of-generative-ai",
    title: "Critical Data Literacy in the Age of Generative AI",
    date: "2026-05-16",
    category: "Data Literacy",
    status: "Published",
    description:
      "Why students need stronger habits for reading charts, claims, uncertainty, and AI-generated explanations.",
    citation:
      "Cajina, A. (2026). Critical Data Literacy in the Age of Generative AI. Andrew Cajina.",
    body: [
      "Generative AI can produce confident explanations of data, but confidence is not the same as statistical care.",
      "Students need routines for checking scale, context, sample size, comparison groups, uncertainty, and the relationship between data and claims.",
      "Critical data literacy is a civic skill as much as a mathematical one.",
    ],
  },
];
