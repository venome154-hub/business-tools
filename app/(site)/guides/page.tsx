import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getArticle } from "@/content/articles";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { guideCard, guideGroups } from "@/lib/related";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Small Business Guides — Quotes and Invoices",
  description: "Straightforward guides to preparing client quotes and invoices, understanding the difference, and keeping business paperwork clear.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd(breadcrumbItems("/guides") ?? [])} />
      <section className="guide-index">
        <span className="badge">SMALL BUSINESS GUIDES</span>
        <h1>Clear paperwork for client work</h1>
        <p>Short, practical explanations for freelancers and small businesses preparing estimates, invoices, receipts, and spreadsheet files.</p>
        {guideGroups.map((group) => (
          <section key={group.heading}>
            <h2>{group.heading}</h2>
            {group.slugs.map((slug) => {
              const card = guideCard(slug, getArticle(slug));
              return (
                <Link className="guide-card" key={slug} href={card.href}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Link>
              );
            })}
          </section>
        ))}
        <p>Ready to create a document? Try the <Link href="/quote-generator">free quote generator</Link> or <Link href="/invoice-generator">free invoice generator</Link>.</p>
      </section>
    </main>
  );
}
