export type Video = {
  slug: string;
  title: string;
  series?: string;
  part?: number;
  seconds: number;
  summary: string;
  file: string; // file name under MEDIA_BASE
  cover: string;
  article?: string; // blog slug with the full write-up
  linkedin?: string;
  date: string;
  draft?: boolean; // hidden until posted on LinkedIn
};

export const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE ?? "/media";

export const series = {
  "ai-adoption": {
    name: "10 problems companies face adopting AI",
    blurb: "One real problem per episode, and how real teams solve it.",
  },
  "agent-explainers": {
    name: "How agents work",
    blurb: "Short visual explainers of what happens inside an AI agent.",
  },
} as const;

export const videos: (Video & { seriesKey: keyof typeof series })[] = [
  { slug: "ai-adoption-trailer", seriesKey: "ai-adoption", part: 0, title: "Trailer: the 10 problems", seconds: 92, summary: "The 10 problems that stop companies from getting value out of AI.", file: "trailer.mp4", cover: "trailer.jpg", date: "2026-11-02" },
  { slug: "data-readiness", seriesKey: "ai-adoption", part: 1, title: "Is your data AI-ready?", seconds: 95, summary: "Why most company data is not ready for AI, and 4 fixes from JPMorgan, Airbnb, Uber and LinkedIn.", file: "part1-data-readiness.mp4", cover: "part1-data-readiness.jpg", article: "is-your-data-ai-ready", date: "2026-11-10" },
  { slug: "legacy-systems", seriesKey: "ai-adoption", part: 2, title: "AI vs 40-year-old systems", seconds: 92, summary: "How banks and hospitals connect AI to legacy systems without breaking them.", file: "part2-legacy-systems.mp4", cover: "part2-legacy-systems.jpg", article: "connecting-ai-to-legacy-systems", date: "2026-11-13" }, // TODO confirm post date,
  { slug: "inference-cost", draft: true, seriesKey: "ai-adoption", part: 3, title: "Why AI bills keep exploding", seconds: 93, summary: "Tokens get cheaper but bills grow. Agents are why, and 4 ways teams cut cost.", file: "part3-inference-cost.mp4", cover: "part3-inference-cost.jpg", article: "why-ai-bills-explode", date: "2026-11-17" },
  { slug: "ai-roi", draft: true, seriesKey: "ai-adoption", part: 4, title: "Proving AI pays off", seconds: 72, summary: "Only 12% of companies check AI's value against its cost. How the rest can.", file: "part4-roi.mp4", cover: "part4-roi.jpg", article: "proving-ai-roi", date: "2026-11-20" },
  { slug: "inside-an-agent", seriesKey: "agent-explainers", title: "Inside an agent", seconds: 45, summary: "Nodes, edges and state: what actually runs inside an AI agent.", file: "inside-agent.mp4", cover: "inside-agent.jpg", date: "2026-10-27" },
  { slug: "is-every-node-an-agent", seriesKey: "agent-explainers", title: "Is every node an agent?", seconds: 43, summary: "Graphs inside nodes inside graphs: how multi-agent systems are really built.", file: "multi-agent.mp4", cover: "multi-agent.jpg", date: "2026-10-29" },
  { slug: "agentic-patterns", draft: true, seriesKey: "agent-explainers", title: "5 agentic patterns", seconds: 44, summary: "The five patterns behind most production agent systems.", file: "agentic-patterns.mp4", cover: "agentic-patterns.jpg", date: "2026-10-31" },
];

export const publishedVideos = videos.filter((v) => !v.draft || process.env.SHOW_DRAFTS === "1");
