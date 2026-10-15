import Link from "next/link";
import type { Metadata } from "next";
import { AnalyticsSettingsButton } from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: { absolute: "Free Business Tools: Invoices, Quotes & CSV Utilities | BizToolsBox" },
  description: "Create business documents, clean and merge CSV files, or find duplicate SKUs with free online tools. No account required.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="landing">
      <div className="hero">
        <span className="badge">FREE BUSINESS TOOLS</span>
        <h1>Simple tools for documents and spreadsheets.</h1>
        <p>Create client-ready paperwork or tidy a CSV export in your browser. Free to use. No account needed.</p>
        <div className="tool-cards">
          <Link className="tool-card" href="/invoice-generator"><strong>Free Invoice Generator</strong><span>Create and download a PDF invoice →</span></Link>
          <Link className="tool-card" href="/quote-generator"><strong>Free Quote Generator</strong><span>Prepare and download a project estimate →</span></Link>
          <Link className="tool-card" href="/receipt-generator"><strong>Free Receipt Generator</strong><span>Record a payment and download a PDF receipt →</span></Link>
          <Link className="tool-card" href="/payment-reminder-generator"><strong>Free Payment Reminder</strong><span>Write and copy a reminder email →</span></Link>
        </div>
      </div>
      <section className="home-section csv-tools-section">
        <h2>Free CSV and spreadsheet tools</h2>
        <p>Clean up spreadsheet exports, combine CSV files, or check product data for repeated SKUs. Your files stay on your device while you work.</p>
        <div className="csv-home-cards">
          <Link className="tool-card" href="/csv-cleaner"><strong>CSV Cleaner</strong><span>Remove blank rows, empty columns, and repeated records →</span></Link>
          <Link className="tool-card" href="/csv-merger"><strong>CSV Merger</strong><span>Combine CSV files and match columns by header name →</span></Link>
          <Link className="tool-card" href="/duplicate-sku-finder"><strong>Duplicate SKU Finder</strong><span>Find repeated product codes in a CSV export →</span></Link>
        </div>
      </section>
      <section className="home-section">
        <h2>Business documents, made simple</h2>
        <p>BizToolsBox helps freelancers and small businesses prepare everyday client documents. Create a project quote before work begins, make an invoice when it is time to request payment, send a reminder if payment is late, then issue a receipt after payment. Details entered into the tools are processed in your browser and are not saved to an account on this site.</p>
        <div className="home-columns">
          <article><h3>1. Prepare a quote</h3><p>Describe the work, quantities, prices, optional tax, and how long your estimate is valid. Share the PDF with your client for review.</p><Link href="/quote-generator">Make a free quote →</Link></article>
          <article><h3>2. Send an invoice</h3><p>After the client approves the work, list the completed products or services, set the invoice date, and download a payment request.</p><Link href="/invoice-generator">Make a free invoice →</Link></article>
          <article><h3>3. Follow up if needed</h3><p>If an invoice is still unpaid, prepare a clear reminder that matches the situation and copy it into your email app.</p><Link href="/payment-reminder-generator">Write a free reminder →</Link></article>
          <article><h3>4. Record a payment</h3><p>After payment arrives, create a receipt showing the amount received, payment method, and any remaining balance.</p><Link href="/receipt-generator">Make a free receipt →</Link></article>
        </div>
      </section>
      <section className="home-section">
        <h2>Practical guides for client paperwork</h2>
        <p>Learn what to include in a quote or invoice and how the two documents fit into a typical client project.</p>
        <div className="guide-links">
          <Link href="/guides/invoice-vs-quote">Invoice vs. quote: when to use each document →</Link>
          <Link href="/guides/how-to-write-an-invoice">How to write an invoice: a simple checklist →</Link>
          <Link href="/guides">Browse all business guides →</Link>
        </div>
      </section>
      <footer className="home-footer"><div><Link href="/guides">Guides</Link><Link href="/privacy">Privacy & data</Link><AnalyticsSettingsButton /></div><span>Free tools and straightforward guidance for small businesses.</span></footer>
    </main>
  );
}
