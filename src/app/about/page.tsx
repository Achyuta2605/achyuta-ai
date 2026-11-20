import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: site.summary, alternates: { canonical: "/about" } };

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        <Image src="/images/headshot.jpg" alt={`${site.name}, ${site.role}`} width={160} height={160} className="rounded-2xl border border-line" priority />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">About me</h1>
          <p className="mt-3 text-muted">{site.summary}</p>
        </div>
      </div>
      <div className="prose-article mt-10">
        <h2>What I am looking for</h2>
        <p>{site.openTo}.</p>
        <h2>Skills</h2>
        <p className="font-mono text-sm">{site.skills.join(" · ")}</p>
      </div>
    </div>
  );
}
