import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { publishedVideos } from "@/lib/videos";
import { site, topics } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  return [
    ...["", "/projects", "/blog", "/videos", "/about", "/resume"].map((p) => ({ url: u(p), priority: p === "" ? 1 : 0.8 })),
    ...Object.keys(topics).map((t) => ({ url: u(`/blog/topic/${t}`), priority: 0.5 })),
    ...getPosts().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: p.date, priority: 0.7 })),
    ...projects.map((p) => ({ url: u(`/projects/${p.slug}`), priority: 0.8 })),
    ...publishedVideos.map((v) => ({ url: u(`/videos/${v.slug}`), lastModified: v.date, priority: 0.6 })),
  ];
}
