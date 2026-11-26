export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://achyuta-ai.vercel.app",
  name: "Achyuta",
  role: "AI Engineer",
  headline: "I build production AI agents, and the guardrails that keep them safe.",
  summary:
    "AI developer at Cognizant building healthcare and life sciences AI use cases. I build agent systems end to end, from retrieval and tool use to evaluation, cost control and security, and I explain how they work in a weekly video series.",
  location: "India",
  openTo: "AI engineer and forward deployed engineer roles (India, US, Europe, UAE, remote)",
  links: {
    linkedin: "https://www.linkedin.com/in/achyuta-m-51b823224/",
    github: "https://github.com/Achyuta2605",
    email: "", // TODO: public contact email
  },
  experience: [
    {
      company: "Cognizant",
      title: "AI Developer",
      start: "2025",
      end: "Present",
      points: [
        "Build generative AI use cases for healthcare and life sciences teams.",
        // TODO: 2-3 measurable, client-safe outcomes from Achyuta
      ],
    },
  ],
  education: [
    {
      school: "SASTRA University",
      degree: "B.Tech, Biotechnology",
      note: "Biology plus AI: the edge I bring to healthcare and pharma AI work.",
    },
  ],
  skills: [
    "LLM agents", "RAG and retrieval", "MCP", "Claude Agent SDK", "LangGraph",
    "Evals", "Prompt injection defense", "Python", "TypeScript", "Next.js", "SQL",
  ],
} as const;

export const topics = {
  "enterprise-ai": { name: "AI in the enterprise", blurb: "Why companies struggle to adopt AI, and how the teams that succeed do it." },
  agents: { name: "Agents", blurb: "How agents work inside: nodes, tools, loops and multi-agent systems." },
  "ai-security": { name: "AI security", blurb: "Prompt injection, poisoned tools and runaway agents." },
  "healthcare-ai": { name: "Healthcare AI", blurb: "AI in healthcare and life sciences." },
} as const;
export type TopicSlug = keyof typeof topics;
