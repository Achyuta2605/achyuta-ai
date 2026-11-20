import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: `${p.tagline} ${p.problem}`.slice(0, 160), alternates: { canonical: `/projects/${p.slug}` }, openGraph: { images: p.image ? [p.image] : undefined } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: p.name, description: p.tagline, applicationCategory: "DeveloperApplication", author: { "@type": "Person", name: site.name, url: site.url } }} />
      <p className="font-mono text-sm text-accent">{p.status}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{p.name}</h1>
      <p className="mt-3 text-lg text-muted">{p.tagline}</p>
      {p.image && <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-line"><Image src={p.image} alt={`${p.name} dashboard`} fill priority sizes="768px" className="object-cover object-top" /></div>}
      <div className="prose-article mt-8">
        <h2>The problem</h2><p>{p.problem}</p>
        <h2>What I built</h2><ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
        {p.results.length > 0 && (<><h2>Results</h2><ul>{p.results.map((r) => <li key={r}>{r}</li>)}</ul></>)}
        <h2>Stack</h2><p className="font-mono text-sm">{p.stack.join(" · ")}</p>
        {p.repo && <p><a href={p.repo}>View the code on GitHub</a></p>}
      </div>
    </article>
  );
}
