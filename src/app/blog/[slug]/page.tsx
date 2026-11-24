import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/Mdx";
import remarkGfm from "remark-gfm";
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
    keywords: meta.keywords,
    openGraph: { type: "article", title: meta.title, description: meta.description, publishedTime: meta.date, modifiedTime: meta.updated ?? meta.date, authors: [site.name], images: meta.cover ? [meta.cover] : undefined },
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
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: meta.title, description: meta.description, datePublished: meta.date, dateModified: meta.updated ?? meta.date, image: meta.cover ? `${site.url}${meta.cover}` : undefined, keywords: meta.keywords?.join(", "), author: { "@type": "Person", name: site.name, url: `${site.url}/about`, jobTitle: site.role, sameAs: [site.links.linkedin, site.links.github].filter(Boolean) }, mainEntityOfPage: `${site.url}/blog/${meta.slug}` }} />
      {meta.faq && meta.faq.length > 0 && (
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: meta.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      )}
      <Link href={`/blog/topic/${meta.topic}`} className="text-xs uppercase tracking-wider text-accent">{topics[meta.topic]?.name}</Link>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{meta.title}</h1>
      <p className="mt-4 text-sm text-muted">{new Date(meta.date).toLocaleDateString("en-US", { dateStyle: "long" })} · {meta.minutes} min read</p>
      {video && (
        <video className="mx-auto mt-8 max-h-[70vh] w-auto rounded-xl border border-line bg-black" controls preload="none" playsInline poster={`${MEDIA_BASE}/${video.cover}`} src={`${MEDIA_BASE}/${video.file}`} />
      )}
      {meta.tldr && (
        <div className="mt-8 rounded-xl border border-accent/40 bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Short answer</p>
          <p className="mt-2 leading-relaxed">{meta.tldr}</p>
        </div>
      )}
      <div className="prose-article mt-8"><MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} /></div>
      {meta.faq && meta.faq.length > 0 && (
        <section className="mt-14 border-t border-line pt-10">
          <h2 className="text-xl font-semibold">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">{meta.faq.map((f) => (<div key={f.q}><dt className="font-medium">{f.q}</dt><dd className="mt-2 text-muted">{f.a}</dd></div>))}</dl>
        </section>
      )}
      <section className="mt-14 flex items-center gap-4 rounded-xl border border-line bg-surface p-5">
        <Image src="/images/headshot.jpg" alt={site.name} width={56} height={56} className="rounded-full" />
        <div><p className="font-medium">Written by {site.name}</p><p className="text-sm text-muted">{site.role}. {site.summary.split(". ")[0]}.</p></div>
      </section>
      {related.length > 0 && (
        <aside className="mt-16 border-t border-line pt-10">
          <h2 className="mb-5 font-semibold">Related</h2>
          <div className="grid gap-4">{related.map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </aside>
      )}
    </article>
  );
}
