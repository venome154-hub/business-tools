import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <div className="hero">
        <span className="badge">FREE BUSINESS TOOLS</span>
        <h1>Simple tools for your business.</h1>
        <p>Create useful business documents without registration. Build an invoice or prepare a project quote in minutes.</p>
        <div className="tool-cards">
          <Link className="tool-card" href="/invoice-generator"><strong>Free Invoice Generator</strong><span>Create and download a PDF invoice →</span></Link>
          <Link className="tool-card" href="/quote-generator"><strong>Free Quote Generator</strong><span>Prepare and download a project estimate →</span></Link>
        </div>
      </div>
      <section className="home-section">
        <h2>Business documents, made simple</h2>
        <p>BusinessTools helps freelancers and small businesses prepare everyday client documents. Create a project quote before work begins, then make an invoice when it is time to request payment. Your details stay in your browser while you work, and you can download a PDF when the document is ready.</p>
        <div className="home-columns">
          <article><h3>1. Prepare a quote</h3><p>Describe the work, quantities, prices, optional tax, and how long your estimate is valid. Share the PDF with your client for review.</p><Link href="/quote-generator">Make a free quote →</Link></article>
          <article><h3>2. Send an invoice</h3><p>After the client approves the work, list the completed products or services, set the invoice date, and download a payment request.</p><Link href="/invoice-generator">Make a free invoice →</Link></article>
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
      <footer className="home-footer"><Link href="/guides">Guides</Link><span>Free tools and straightforward guidance for small businesses.</span></footer>
    </main>
  );
}
