import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invoice vs. Quote: What's the Difference?",
  description: "Learn when to send a quote and when to issue an invoice, what each document includes, and how they work together in a client project.",
  alternates: { canonical: "/guides/invoice-vs-quote" },
};

export default function InvoiceVsQuotePage() {
  return (
    <main className="page">
      <nav className="topbar" aria-label="Main navigation"><Link href="/" className="brand">BizToolsBox</Link><Link href="/guides">All guides</Link></nav>
      <article className="seo-content">
        <span className="badge">CLIENT PAPERWORK</span>
        <h1>Invoice vs. quote: what is the difference?</h1>
        <p>A quote and an invoice can show similar details, such as services, quantities, and prices, but they serve different purposes. A quote proposes work and an estimated price before a client agrees. An invoice requests payment for work or products that have been agreed or supplied.</p>

        <h2>When to send a quote</h2>
        <p>Send a quote when a client needs to review the expected scope and cost before work starts. It is especially useful when the project has several tasks, optional services, or a price that depends on quantity or time. A clear quote helps both sides discuss assumptions before committing to the work.</p>
        <p>Include the date, your business and client names, a quote reference, a description of each item, quantities, prices, and the estimated total. You can also show a validity date, payment milestones, or assumptions that affect the estimate. Be explicit about whether taxes or other costs are included.</p>

        <h2>When to send an invoice</h2>
        <p>Send an invoice when payment is due under your agreement. Depending on the arrangement, that may be after delivery, at a project milestone, or before work begins if you agreed on a deposit. The invoice should identify what is being charged for and explain how and when the client should pay.</p>
        <p>Common details include an invoice number, issue date, seller and client details, a description of the supplied work, quantities, prices, taxes where applicable, total due, due date, and payment instructions. Local rules differ, so check the requirements that apply where your business operates.</p>

        <h2>How they work together</h2>
        <ol>
          <li>Discuss the client’s needs and prepare a quote with the proposed scope and estimated price.</li>
          <li>Get the client’s approval and confirm any changes before starting.</li>
          <li>Complete the agreed work and record any approved changes.</li>
          <li>Send an invoice for the amount due under your agreement.</li>
        </ol>
        <p>A quote is not automatically an invoice, and an invoice should not silently change the agreed price. If the scope changes, document the change and confirm it with the client first. For recurring or larger projects, keeping quote and invoice references consistent can make the paperwork easier to follow.</p>

        <h2>Create either document</h2>
        <p>Use the <Link href="/quote-generator">free quote generator</Link> to prepare a project estimate, or create a payment request with the <Link href="/invoice-generator">free invoice generator</Link>. Both tools let you review the document and download a PDF.</p>
      </article>
      <footer className="home-footer"><Link href="/guides">All guides</Link><Link href="/privacy">Privacy & data</Link></footer>
    </main>
  );
}
