import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { TopicSlug } from "./site";

const DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: TopicSlug;
  featured?: boolean;
  video?: string;
  draft?: boolean;
  tldr?: string;
  updated?: string;
  cover?: string;
  faq?: { q: string; a: string }[];
  keywords?: string[];
  minutes: number;
};

export function getPosts(): PostMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as Omit<PostMeta, "slug" | "minutes">),
        slug: f.replace(/\.mdx$/, ""),
        minutes: Math.max(1, Math.round(readingTime(content).minutes)),
      };
    })
    .filter((p) => !p.draft || process.env.SHOW_DRAFTS === "1")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: { ...(data as PostMeta), slug, minutes: Math.max(1, Math.round(readingTime(content).minutes)) }, content };
}
