import Link from "next/link";
import { ParticlePortrait } from "@/components/ParticlePortrait";
import { PostCard, ProjectCard, VideoCard, SectionHeader } from "@/components/Cards";
import { getPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { publishedVideos } from "@/lib/videos";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getPosts();
  const featuredPosts = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestVideos = [...publishedVideos].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <section className="grid items-center gap-8 py-14 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <p className="font-mono text-sm text-accent">{site.role} · Healthcare & life sciences AI</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{site.headline}</h1>
          <p className="mt-6 max-w-xl text-muted">{site.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent">See my work</Link>
            <Link href="/resume" className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent">Resume</Link>
            <a href={site.links.linkedin} className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent">LinkedIn</a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            <div><dt className="text-xs text-muted">Projects</dt><dd className="text-2xl font-semibold">{projects.length}</dd></div>
            <div><dt className="text-xs text-muted">Articles</dt><dd className="text-2xl font-semibold">{posts.length}</dd></div>
            <div><dt className="text-xs text-muted">Videos</dt><dd className="text-2xl font-semibold">{publishedVideos.length}</dd></div>
          </dl>
        </div>
        <ParticlePortrait className="aspect-square w-full max-w-[460px] justify-self-center" />
      </section>

      <section className="py-10">
        <SectionHeader title="Selected projects" href="/projects" />
        <div className="grid gap-5 md:grid-cols-2">{featuredProjects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="py-10">
        <SectionHeader title="Writing" href="/blog" />
        <div className="grid gap-5 md:grid-cols-3">{featuredPosts.map((p) => <PostCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="py-10">
        <SectionHeader title="Latest videos" href="/videos" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">{latestVideos.map((v) => <VideoCard key={v.slug} v={v} />)}</div>
      </section>

      <section className="grid gap-8 py-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Experience</h2>
          {site.experience.map((e) => (
            <div key={e.company} className="border-l border-line pl-4">
              <p className="font-medium">{e.title} · {e.company}</p>
              <p className="text-sm text-muted">{e.start} – {e.end}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Education</h2>
          {site.education.map((e) => (
            <div key={e.school} className="border-l border-line pl-4">
              <p className="font-medium">{e.degree}</p>
              <p className="text-sm text-muted">{e.school}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
