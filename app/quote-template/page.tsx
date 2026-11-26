import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { industries } from "@/content/industries";
import { breadcrumbLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quote templates by trade",
  description: "Free quote templates with example lines for estimates before the work starts. Adjust the quantities and prices, then download a PDF. No sign-up needed.",
  alternates: { canonical: "/quote-template" },
  openGraph: { title: "Quote templates by trade", description: "Free quote templates with example lines for estimates before the work starts. Adjust the quantities and prices, then download a PDF. No sign-up needed.", type: "website", url: "/quote-template" },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Quote templates", path: "/quote-template" }])} />
      <article className="seo-content">
        <h1>Quote templates before the invoice</h1>
        <p>A quote prices work the client has not accepted yet. Each page explains what that trade usually includes, excludes, or prices separately, then opens the quote generator with sample lines.</p>
        <div className="guide-links">
          {industries.map((item) => <Link key={item.slug} href={`/quote-template/${item.slug}`}>{titled(item.name)} →</Link>)}
        </div>
      </article>
    </main>
  );
}
