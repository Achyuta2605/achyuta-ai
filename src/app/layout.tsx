import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav, Footer } from "@/components/Nav";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.summary,
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { type: "website", siteName: site.name, url: "/", title: `${site.name} | ${site.role}`, description: site.headline },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/headshot.jpg`,
  jobTitle: site.role,
  description: site.summary,
  worksFor: { "@type": "Organization", name: "Cognizant" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "SASTRA University" },
  knowsAbout: site.skills,
  sameAs: [site.links.linkedin, site.links.github].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} min-h-screen`}>
        <JsonLd data={person} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
