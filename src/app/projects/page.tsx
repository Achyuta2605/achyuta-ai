import type { Metadata } from "next";
import { ProjectCard } from "@/components/Cards";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects", description: "AI products and systems I have built: agent security, healthcare AI and more.", alternates: { canonical: "/projects" } };

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted">Real systems, with the problem, what I built and what it measured.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">{projects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
    </div>
  );
}
