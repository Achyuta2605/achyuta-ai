import Link from "next/link";
import { site } from "@/lib/site";

const items = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">{site.name}</Link>
        <ul className="flex items-center gap-4 text-sm text-muted sm:gap-6">
          {items.map((i) => (
            <li key={i.href}><Link className="hover:text-fg" href={i.href}>{i.label}</Link></li>
          ))}
          <li className="hidden sm:block">
            <Link href="/resume" className="rounded-full border border-line px-3 py-1.5 text-fg hover:border-accent">Resume</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} {site.name}. {site.role}.</p>
        <div className="flex gap-5">
          {site.links.linkedin && <a href={site.links.linkedin} rel="me">LinkedIn</a>}
          <a href={site.links.github} rel="me">GitHub</a>
          <a href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
}
