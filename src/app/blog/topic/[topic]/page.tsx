import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/Cards";
import { getPosts } from "@/lib/posts";
import { topics, type TopicSlug } from "@/lib/site";

type Props = { params: Promise<{ topic: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(topics).map((topic) => ({ topic })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = topics[(await params).topic as TopicSlug];
  return t ? { title: t.name, description: t.blurb, alternates: { canonical: `/blog/topic/${(await params).topic}` } } : {};
}

export default async function Topic({ params }: Props) {
  const slug = (await params).topic as TopicSlug;
  const t = topics[slug];
  if (!t) notFound();
  const posts = getPosts().filter((p) => p.topic === slug);
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t.name}</h1>
      <p className="mt-3 text-muted">{t.blurb}</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} p={p} />)}</div>
      {posts.length === 0 && <p className="mt-10 text-muted">Articles coming soon.</p>}
    </div>
  );
}
