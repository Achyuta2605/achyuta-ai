import type { Metadata } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Resume", description: `${site.name}, ${site.role}: experience, projects, education and skills.`, alternates: { canonical: "/resume" } };

export default function Resume() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div><h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1><p className="text-muted">{site.role} · {site.location}</p></div>
        {/* TODO: link /resume.pdf once generated */}
      </header>
      <section className="mt-8"><h2 className="mb-4 text-sm uppercase tracking-wider text-accent">Experience</h2>
        {site.experience.map((e) => (
          <div key={e.company} className="mb-6">
            <div className="flex justify-between"><p className="font-medium">{e.title}, {e.company}</p><p className="text-sm text-muted">{e.start} – {e.end}</p></div>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </section>
      <section className="mt-8"><h2 className="mb-4 text-sm uppercase tracking-wider text-accent">Projects</h2>
        {projects.map((p) => (<div key={p.slug} className="mb-4"><p className="font-medium">{p.name}</p><p className="text-sm text-muted">{p.tagline}</p></div>))}
      </section>
      <section className="mt-8"><h2 className="mb-4 text-sm uppercase tracking-wider text-accent">Education</h2>
        {site.education.map((e) => (<div key={e.school}><p className="font-medium">{e.degree}</p><p className="text-sm text-muted">{e.school}</p></div>))}
      </section>
      <section className="mt-8"><h2 className="mb-4 text-sm uppercase tracking-wider text-accent">Skills</h2><p className="text-sm text-muted">{site.skills.join(", ")}</p></section>
    </div>
  );
}
