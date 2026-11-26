import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { articles } from "@/content/articles";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Small Business Guides — Quotes and Invoices",
  description: "Straightforward guides to preparing client quotes and invoices, understanding the difference, and keeping business paperwork clear.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }])} />
      <section className="guide-index">
        <span className="badge">SMALL BUSINESS GUIDES</span>
        <h1>Clear paperwork for client work</h1>
        <p>Short, practical explanations for freelancers and small businesses preparing estimates, invoices, receipts, and spreadsheet files.</p>
        <Link className="guide-card" href="/guides/invoice-vs-quote">
          <h2>Invoice vs. quote: when to use each</h2>
          <p>Understand the purpose of each document and how they fit into a client project.</p>
        </Link>
        <Link className="guide-card" href="/guides/how-to-write-an-invoice">
          <h2>How to write an invoice</h2>
          <p>Use a simple checklist to make payment requests clear and easy to review.</p>
        </Link>
        {articles.map((article) => (
          <Link className="guide-card" key={article.slug} href={`/guides/${article.slug}`}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </Link>
        ))}
        <p>Ready to create a document? Try the <Link href="/quote-generator">free quote generator</Link> or <Link href="/invoice-generator">free invoice generator</Link>.</p>
      </section>
    </main>
  );
}
