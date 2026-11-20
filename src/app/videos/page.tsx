import type { Metadata } from "next";
import { VideoCard } from "@/components/Cards";
import { publishedVideos, series } from "@/lib/videos";

export const metadata: Metadata = { title: "Videos", description: "Short visual explainers on AI agents and enterprise AI adoption.", alternates: { canonical: "/videos" } };

export default function Videos() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Videos</h1>
      <p className="mt-3 max-w-2xl text-muted">Animated explainers, organized by series. Each one has a full written version.</p>
      {(Object.keys(series) as (keyof typeof series)[]).map((k) => {
        const list = publishedVideos.filter((v) => v.seriesKey === k).sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
        if (!list.length) return null;
        return (
          <section key={k} className="mt-12">
            <h2 className="text-xl font-semibold">{series[k].name}</h2>
            <p className="mb-5 text-sm text-muted">{series[k].blurb}</p>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">{list.map((v) => <VideoCard key={v.slug} v={v} />)}</div>
          </section>
        );
      })}
    </div>
  );
}
