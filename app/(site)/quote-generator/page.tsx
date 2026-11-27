import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import QuoteGenerator from "@/components/QuoteGenerator";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webApplicationLd, type FaqItem } from "@/lib/schema";

const quoteFaqs: FaqItem[] = [
  { question: "Is this quote generator free?", answer: "Yes. Create and download a quote as PDF, Word, or Excel for free without an account." },
  { question: "Can I include tax or a discount?", answer: "Yes. Add optional tax and discount percentages; the preview and estimate total update automatically." },
  { question: "Can I set an expiry date?", answer: "Yes. Add an optional valid-until date to show when the estimate expires." },
  { question: "Is a quote the same as an invoice?", answer: "No. A quote is a proposed price for approval. An invoice requests payment. You can create one after the client approves the quote." },
];

export const metadata: Metadata = {
  title: "Free Quote Generator — Create Project Estimates",
  description: "Create a professional project quote online for free. Add services, quantities, tax, and discounts, then download a PDF estimate. No signup required.",
  alternates: { canonical: "/quote-generator" },
  openGraph: {
    title: "Free Quote Generator — Create Project Estimates",
    description: "Prepare a clear project estimate and download it as a PDF for free.",
    type: "website",
    url: "/quote-generator",
  },
};

export default function QuotePage() {
  return (
    <main className="page">
      <JsonLd data={[webApplicationLd("Free Quote Generator", "/quote-generator", "Create a project quote PDF in your browser."), faqLd(quoteFaqs), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Quote generator", path: "/quote-generator" }])]} />
      <QuoteGenerator />
      <section className="seo-content" aria-labelledby="quote-guide-title">
        <h2 id="quote-guide-title">Create a free project quote online</h2>
        <p>Prepare a simple, professional estimate before work begins. Add your business and client details, list products or services, and set quantities and prices. The quote generator calculates the estimated total, including optional tax and discount, and creates a PDF you can review and share.</p>

        <h2>How to make a project estimate</h2>
        <ol>
          <li>Enter your business name, client, quote number, and date.</li>
          <li>Add each service or product with its quantity and price.</li>
          <li>Set an optional expiry date, tax, or discount.</li>
          <li>Review the estimate and select <strong>Download PDF</strong>, <strong>Download Word</strong>, or <strong>Download Excel</strong>.</li>
        </ol>
        <p>A quote describes proposed work and an estimated price for client approval. After the work is agreed or completed, use the <Link href="/invoice-generator">free invoice generator</Link> to request payment.</p>

        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details><summary>Is this quote generator free?</summary><p>Yes. Create and download a quote as PDF, Word, or Excel for free without an account.</p></details>
          <details><summary>Can I include tax or a discount?</summary><p>Yes. Add optional tax and discount percentages; the preview and estimate total update automatically.</p></details>
          <details><summary>Can I set an expiry date?</summary><p>Yes. Add an optional valid-until date to show when the estimate expires.</p></details>
          <details><summary>Is a quote the same as an invoice?</summary><p>No. A quote is a proposed price for approval. An invoice requests payment. You can create one after the client approves the quote.</p></details>
        </div>
      </section>
      <ContextualLinks path="/quote-generator" />
    </main>
  );
}
