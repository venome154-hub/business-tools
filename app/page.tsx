import Link from "next/link";
import type { Metadata } from "next";
import { AnalyticsSettingsButton } from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: "Free Invoice, Quote & Receipt Generators for Small Business",
  description: "Create a project quote, invoice, or payment receipt and download it as a PDF. Free online business document tools with no signup.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="landing">
      <div className="hero">
        <span className="badge">FREE BUSINESS DOCUMENT TOOLS</span>
        <h1>Create a quote, invoice, or receipt in minutes.</h1>
        <p>Prepare a PDF for your client, check every line and total, then download it. Free to use. No account needed.</p>
        <div className="tool-cards">
          <Link className="tool-card" href="/invoice-generator"><strong>Free Invoice Generator</strong><span>Create and download a PDF invoice →</span></Link>
          <Link className="tool-card" href="/quote-generator"><strong>Free Quote Generator</strong><span>Prepare and download a project estimate →</span></Link>
          <Link className="tool-card" href="/receipt-generator"><strong>Free Receipt Generator</strong><span>Record a payment and download a PDF receipt →</span></Link>
        </div>
      </div>
      <section className="home-section">
        <h2>Business documents, made simple</h2>
        <p>BizToolsBox helps freelancers and small businesses prepare everyday client documents. Create a project quote before work begins, make an invoice when it is time to request payment, then issue a receipt after payment. Document details are processed in your browser by the generators and are not sent to an account on this site.</p>
        <div className="home-columns">
          <article><h3>1. Prepare a quote</h3><p>Describe the work, quantities, prices, optional tax, and how long your estimate is valid. Share the PDF with your client for review.</p><Link href="/quote-generator">Make a free quote →</Link></article>
          <article><h3>2. Send an invoice</h3><p>After the client approves the work, list the completed products or services, set the invoice date, and download a payment request.</p><Link href="/invoice-generator">Make a free invoice →</Link></article>
          <article><h3>3. Record a payment</h3><p>After payment arrives, create a receipt showing the amount received, payment method, and any remaining balance.</p><Link href="/receipt-generator">Make a free receipt →</Link></article>
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
