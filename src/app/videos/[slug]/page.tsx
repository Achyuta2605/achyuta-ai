import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { publishedVideos, series, MEDIA_BASE } from "@/lib/videos";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return publishedVideos.map((v) => ({ slug: v.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = publishedVideos.find((x) => x.slug === slug);
  return v ? { title: v.title, description: v.summary, alternates: { canonical: `/videos/${v.slug}` }, openGraph: { type: "video.other", images: [`${MEDIA_BASE}/${v.cover}`] } } : {};
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const v = publishedVideos.find((x) => x.slug === slug);
  if (!v) notFound();
  const abs = (f: string) => (MEDIA_BASE.startsWith("http") ? `${MEDIA_BASE}/${f}` : `${site.url}${MEDIA_BASE}/${f}`);
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", name: v.title, description: v.summary, thumbnailUrl: abs(v.cover), contentUrl: abs(v.file), uploadDate: v.date, duration: `PT${Math.floor(v.seconds / 60)}M${Math.round(v.seconds % 60)}S`, creator: { "@type": "Person", name: site.name } }} />
      <p className="text-xs uppercase tracking-wider text-accent">{series[v.seriesKey].name}{v.part ? ` · Part ${v.part}` : ""}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{v.title}</h1>
      <p className="mt-3 text-muted">{v.summary}</p>
      <video className="mx-auto mt-8 max-h-[80vh] w-auto rounded-xl border border-line bg-black" controls playsInline preload="metadata" poster={`${MEDIA_BASE}/${v.cover}`} src={`${MEDIA_BASE}/${v.file}`} />
      <div className="mt-8 flex flex-wrap gap-3">
        {v.article && <Link href={`/blog/${v.article}`} className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent">Read the full breakdown</Link>}
        {v.linkedin && <a href={v.linkedin} className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent">Discuss on LinkedIn</a>}
      </div>
    </div>
  );
}
