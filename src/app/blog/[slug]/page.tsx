import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/Cards";
import { getPost, getPosts } from "@/lib/posts";
import { site, topics } from "@/lib/site";
import { videos, MEDIA_BASE } from "@/lib/videos";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getPosts().map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title, description: meta.description,
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: { type: "article", title: meta.title, description: meta.description, publishedTime: meta.date, authors: [site.name] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta, content } = post;
  const video = videos.find((v) => v.slug === meta.video && !v.draft);
  const related = getPosts().filter((p) => p.topic === meta.topic && p.slug !== meta.slug).slice(0, 3);
  return (
    <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: meta.title, description: meta.description, datePublished: meta.date, author: { "@type": "Person", name: site.name, url: site.url }, mainEntityOfPage: `${site.url}/blog/${meta.slug}` }} />
      <Link href={`/blog/topic/${meta.topic}`} className="text-xs uppercase tracking-wider text-accent">{topics[meta.topic]?.name}</Link>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{meta.title}</h1>
      <p className="mt-4 text-sm text-muted">{new Date(meta.date).toLocaleDateString("en-US", { dateStyle: "long" })} · {meta.minutes} min read</p>
      {video && (
        <video className="mx-auto mt-8 max-h-[70vh] w-auto rounded-xl border border-line bg-black" controls preload="none" playsInline poster={`${MEDIA_BASE}/${video.cover}`} src={`${MEDIA_BASE}/${video.file}`} />
      )}
      <div className="prose-article mt-8"><MDXRemote source={content} /></div>
      {related.length > 0 && (
        <aside className="mt-16 border-t border-line pt-10">
          <h2 className="mb-5 font-semibold">Related</h2>
          <div className="grid gap-4">{related.map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </aside>
      )}
    </article>
  );
}
