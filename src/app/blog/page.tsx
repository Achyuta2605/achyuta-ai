import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/Cards";
import { getPosts } from "@/lib/posts";
import { topics, type TopicSlug } from "@/lib/site";

export const metadata: Metadata = { title: "Writing", description: "Articles on AI agents, enterprise AI adoption and AI security, with sources.", alternates: { canonical: "/blog" } };

export default function Blog() {
  const posts = getPosts();
  const used = (Object.keys(topics) as TopicSlug[]).filter((t) => posts.some((p) => p.topic === t));
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-3 max-w-2xl text-muted">Deep dives on how AI works in real companies. Every claim links to its source.</p>
      {used.map((t) => (
        <section key={t} className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div><h2 className="text-xl font-semibold">{topics[t].name}</h2><p className="text-sm text-muted">{topics[t].blurb}</p></div>
            <Link href={`/blog/topic/${t}`} className="text-sm text-muted hover:text-accent">All →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">{posts.filter((p) => p.topic === t).map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </section>
      ))}
    </div>
  );
}
