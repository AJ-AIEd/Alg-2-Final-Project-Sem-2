export type Resource = {
  slug: string;
  title: string;
  courseCategory: string;
  type: string;
  version: string;
  date: string;
  description: string;
  useNotice: string;
  downloadHref: string;
};

export const resourceCategories = [
  "Algebra 2",
  "Statistics",
  "AI Literacy",
  "Assessment Design",
  "Teacher Reflection",
  "Student Reflection",
];

export const resources: Resource[] = [
  {
    slug: "ai-critique-routine-for-mathematical-explanations",
    title: "AI Critique Routine for Mathematical Explanations",
    courseCategory: "Student Reflection",
    type: "Classroom Routine",
    version: "1.0",
    date: "2026-05-16",
    description:
      "A routine for helping students evaluate, revise, and explain AI-generated mathematical responses.",
    useNotice:
      "For classroom and professional learning use with attribution. Commercial reproduction requires permission.",
    downloadHref: "/downloads/ai-critique-routine-for-mathematical-explanations.txt",
  },
  {
    slug: "algebra-2-ai-resilient-task-template",
    title: "Algebra 2 AI-Resilient Task Template",
    courseCategory: "Algebra 2",
    type: "Task Template",
    version: "1.0",
    date: "2026-05-16",
    description:
      "A planning template for creating Algebra 2 tasks that require explanation, representation, and transfer.",
    useNotice:
      "May be adapted for non-commercial classroom use with attribution to Andrew Cajina.",
    downloadHref: "/downloads/algebra-2-ai-resilient-task-template.txt",
  },
  {
    slug: "statistics-misleading-graphs-discussion-guide",
    title: "Statistics Misleading Graphs Discussion Guide",
    courseCategory: "Statistics",
    type: "Discussion Guide",
    version: "1.0",
    date: "2026-05-16",
    description:
      "A discussion guide for analyzing scale, context, claims, and uncertainty in graphs and AI-generated summaries.",
    useNotice:
      "For educational use with attribution. Do not resell or commercially redistribute.",
    downloadHref: "/downloads/statistics-misleading-graphs-discussion-guide.txt",
  },
  {
    slug: "teacher-ai-planning-reflection",
    title: "Teacher AI Planning Reflection",
    courseCategory: "Teacher Reflection",
    type: "Reflection Tool",
    version: "1.0",
    date: "2026-05-16",
    description:
      "A short planning reflection for deciding whether an AI-supported activity protects student thinking.",
    useNotice:
      "For teacher reflection, coaching, and department planning with attribution.",
    downloadHref: "/downloads/teacher-ai-planning-reflection.txt",
  },
];
