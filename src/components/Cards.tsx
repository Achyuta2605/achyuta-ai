import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import { topics } from "@/lib/site";
import { MEDIA_BASE, type Video } from "@/lib/videos";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export function PostCard({ p }: { p: PostMeta }) {
  return (
    <Link href={`/blog/${p.slug}`} className="group block rounded-xl border border-line bg-surface p-5 transition hover:border-accent/60">
      <p className="text-xs uppercase tracking-wider text-accent">{topics[p.topic]?.name}</p>
      <h3 className="mt-2 font-semibold leading-snug group-hover:text-accent">{p.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
      <p className="mt-4 text-xs text-muted">{fmt(p.date)} · {p.minutes} min read</p>
    </Link>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:border-accent/60">
      {p.image && (
        <div className="relative aspect-[16/9] border-b border-line">
          <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover object-top" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold group-hover:text-accent">{p.name}</h3>
          <span className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{p.status}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{p.tagline}</p>
        <p className="mt-4 font-mono text-xs text-muted">{p.stack.slice(0, 4).join(" · ")}</p>
      </div>
    </Link>
  );
}

export function VideoCard({ v }: { v: Video }) {
  return (
    <Link href={`/videos/${v.slug}`} className="group block">
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-line bg-surface">
        <Image src={`${MEDIA_BASE}/${v.cover}`} alt={v.title} fill sizes="(min-width: 768px) 240px, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-xs">
          {Math.floor(v.seconds / 60)}:{String(Math.round(v.seconds % 60)).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-medium leading-snug group-hover:text-accent">{v.part ? `Part ${v.part}: ` : ""}{v.title}</h3>
    </Link>
  );
}

export function SectionHeader({ title, href, label }: { title: string; href?: string; label?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {href && <Link href={href} className="text-sm text-muted hover:text-accent">{label ?? "View all"} →</Link>}
    </div>
  );
}
