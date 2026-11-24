import { getPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
export const dynamic = "force-static";
export function GET() {
  const body = `# ${site.name}, ${site.role}

> ${site.summary}

Open to: ${site.openTo}.

## Projects
${projects.map((p) => `- [${p.name}](${site.url}/projects/${p.slug}): ${p.tagline}`).join("\n")}

## Articles
${getPosts().map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`).join("\n")}

## Contact
- GitHub: ${site.links.github}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
