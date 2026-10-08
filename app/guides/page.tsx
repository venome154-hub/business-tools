import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Small Business Guides — Quotes and Invoices",
  description: "Straightforward guides to preparing client quotes and invoices, understanding the difference, and keeping business paperwork clear.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <main className="page">
      <nav className="topbar" aria-label="Main navigation"><Link href="/" className="brand">BizToolsBox</Link><Link href="/invoice-generator">Invoice Generator</Link></nav>
      <section className="guide-index">
        <span className="badge">SMALL BUSINESS GUIDES</span>
        <h1>Clear paperwork for client work</h1>
        <p>Short, practical explanations for freelancers and small businesses preparing estimates and payment requests.</p>
        <Link className="guide-card" href="/guides/invoice-vs-quote">
          <h2>Invoice vs. quote: when to use each</h2>
          <p>Understand the purpose of each document and how they fit into a client project.</p>
        </Link>
        <Link className="guide-card" href="/guides/how-to-write-an-invoice">
          <h2>How to write an invoice</h2>
          <p>Use a simple checklist to make payment requests clear and easy to review.</p>
        </Link>
        <p>Ready to create a document? Try the <Link href="/quote-generator">free quote generator</Link> or <Link href="/invoice-generator">free invoice generator</Link>.</p>
      </section>
      <footer className="home-footer"><Link href="/">Home</Link><Link href="/privacy">Privacy & data</Link></footer>
    </main>
  );
}
