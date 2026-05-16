export type Framework = {
  slug: string;
  title: string;
  version: string;
  publicationDate: string;
  author: string;
  copyright: string;
  citation: string;
  summary: string;
  classroomUseCase: string;
  downloadHref: string;
  body: string[];
};

export const frameworks: Framework[] = [
  {
    slug: "sail-to-classroom-decision-framework",
    title: "SAIL-to-Classroom Decision Framework",
    version: "1.0",
    publicationDate: "2026-05-16",
    author: "Andrew Cajina",
    copyright: "Copyright © 2026 Andrew Cajina. All rights reserved.",
    citation:
      "Cajina, A. (2026). SAIL-to-Classroom Decision Framework (Version 1.0). Andrew Cajina.",
    summary:
      "A decision framework for translating school AI principles into classroom-level choices and routines.",
    classroomUseCase:
      "Use during department planning to evaluate whether a proposed AI activity aligns with learning goals, student agency, and school expectations.",
    downloadHref: "/downloads/sail-to-classroom-decision-framework.txt",
    body: [
      "This framework helps educators move from broad AI policy statements to concrete classroom decisions.",
      "It is designed for planning meetings, curriculum review, and professional learning sessions where teachers need shared language for AI use.",
    ],
  },
  {
    slug: "ethical-ai-use-decision-protocol",
    title: "Ethical AI Use Decision Protocol",
    version: "1.0",
    publicationDate: "2026-05-16",
    author: "Andrew Cajina",
    copyright: "Copyright © 2026 Andrew Cajina. All rights reserved.",
    citation:
      "Cajina, A. (2026). Ethical AI Use Decision Protocol (Version 1.0). Andrew Cajina.",
    summary:
      "A concise protocol for deciding when AI use is appropriate, transparent, and educationally meaningful.",
    classroomUseCase:
      "Use before introducing an AI-supported task to clarify purpose, disclosure, student role, and boundaries.",
    downloadHref: "/downloads/ethical-ai-use-decision-protocol.txt",
    body: [
      "The protocol asks teachers to define the learning purpose, identify possible risks, and decide what students must disclose.",
      "It supports consistent ethical decision-making without reducing professional judgment to a checklist.",
    ],
  },
  {
    slug: "human-ai-mathematical-reasoning-reflection-tool",
    title: "Human-AI Mathematical Reasoning Reflection Tool",
    version: "1.0",
    publicationDate: "2026-05-16",
    author: "Andrew Cajina",
    copyright: "Copyright © 2026 Andrew Cajina. All rights reserved.",
    citation:
      "Cajina, A. (2026). Human-AI Mathematical Reasoning Reflection Tool (Version 1.0). Andrew Cajina.",
    summary:
      "A reflection tool that helps students distinguish between AI output, mathematical reasoning, and their own understanding.",
    classroomUseCase:
      "Use after students compare an AI-generated solution with their own reasoning or a peer explanation.",
    downloadHref: "/downloads/human-ai-mathematical-reasoning-reflection-tool.txt",
    body: [
      "This tool positions AI output as something to inspect, question, and revise rather than something to accept.",
      "It supports metacognition by asking students to explain what they understood, what they questioned, and what they changed.",
    ],
  },
  {
    slug: "ai-resilient-assessment-design-checklist",
    title: "AI-Resilient Assessment Design Checklist",
    version: "1.0",
    publicationDate: "2026-05-16",
    author: "Andrew Cajina",
    copyright: "Copyright © 2026 Andrew Cajina. All rights reserved.",
    citation:
      "Cajina, A. (2026). AI-Resilient Assessment Design Checklist (Version 1.0). Andrew Cajina.",
    summary:
      "A checklist for designing assessments that foreground reasoning, transfer, reflection, and defensible evidence of learning.",
    classroomUseCase:
      "Use while revising quizzes, projects, performance tasks, or written explanations in AI-rich learning environments.",
    downloadHref: "/downloads/ai-resilient-assessment-design-checklist.txt",
    body: [
      "AI-resilient assessment focuses on evidence that is hard to outsource because it is personal, contextual, oral, iterative, or process-based.",
      "The checklist helps teachers redesign assessment conditions without turning the classroom into a surveillance environment.",
    ],
  },
];
