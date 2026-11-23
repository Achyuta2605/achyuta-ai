/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

/** Diagram or chart with a caption. SVGs live in /public/blog/<slug>/. */
function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} loading="lazy" className="w-full rounded-xl border border-line bg-white" />
      {caption && <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Highlighted note: a key fact, warning or definition. */
function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-6 rounded-xl border-l-4 border-accent bg-surface p-4">
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-[0.95rem]">{children}</div>
    </aside>
  );
}

export const mdxComponents = { Figure, Callout };
