export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  featured: boolean;
  stack: string[];
  problem: string;
  built: string[];
  results: string[];
  image?: string;
  repo?: string;
};

const allProjects: Project[] = [
  {
    slug: "agentoverwatch",
    name: "AgentOverwatch",
    tagline: "A security gateway between AI agents and their tools.",
    status: "Private beta",
    featured: true,
    stack: ["TypeScript", "Node 22", "MCP SDK", "Claude Haiku + Sonnet", "SQLite", "Hono", "React"],
    problem:
      "AI agents now call tools through MCP servers they did not write. A poisoned tool description or a web page with hidden instructions can make an agent read secrets or run up a huge bill, and nothing sits in between to stop it.",
    built: [
      "Pass-through gateway for stdio and remote MCP servers that logs every tool call to SQLite.",
      "Tool pinning: fingerprints each tool definition and blocks silent changes (rug pulls).",
      "YAML policy: allow and deny lists, path and regex argument rules, human approvals.",
      "Injection scanner in layers: fast rules first, then Claude Haiku, then Claude Sonnet for hard cases.",
      "Loop and budget guard: stops repeated identical calls, error streaks and runaway token spend.",
      "Local dashboard, plus a nightly red-team agent that keeps growing the attack test set.",
    ],
    results: [
      "About 0.4 ms median overhead per call in pass-through mode.",
      "In a live Claude Code test it hid a poisoned tool and blocked a read of ~/.ssh.",
      "Stopped a looping agent at call 4.",
    ],
    image: "/images/agentoverwatch-dashboard.png",
  },
  {
    slug: "amrdrugx",
    name: "AMRDrugX",
    tagline: "AI for antimicrobial resistance drug discovery.",
    status: "Open source",
    featured: true,
    stack: ["Python"],
    problem: "TODO: one-line problem statement from Achyuta.",
    built: ["TODO"],
    results: [],
    repo: "https://github.com/Achyuta2605/AMRDrugX",
  },
];

// Hide projects whose write-up is not ready yet.
export const projects = allProjects.filter((p) => !p.problem.startsWith("TODO"));
