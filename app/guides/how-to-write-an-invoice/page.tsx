import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write an Invoice: A Simple Checklist",
  description: "A practical invoice checklist for freelancers and small businesses, from invoice numbers and item descriptions to totals and payment details.",
  alternates: { canonical: "/guides/how-to-write-an-invoice" },
};

export default function HowToWriteInvoicePage() {
  return (
    <main className="page">
      <nav className="topbar" aria-label="Main navigation"><Link href="/" className="brand">BusinessTools</Link><Link href="/guides">All guides</Link></nav>
      <article className="seo-content">
        <span className="badge">INVOICING BASICS</span>
        <h1>How to write an invoice: a simple checklist</h1>
        <p>A good invoice makes it easy for a client to understand the charge and what to do next. Before you send one, check that the document clearly identifies both parties, describes the work, shows the amount due, and includes payment instructions that match your agreement.</p>

        <h2>1. Identify the invoice and its dates</h2>
        <p>Give each invoice a unique reference, such as INV-001, and use it consistently in your records and payment follow-up. Include the issue date. If payment is due by a particular day, show the due date as well as any agreed payment terms.</p>

        <h2>2. Add business and client details</h2>
        <p>Show the name of the business or person sending the invoice and the client being billed. Add the contact, address, tax, or registration details required for your situation. Requirements vary by location and business type, so verify the rules that apply to you.</p>

        <h2>3. Describe what you are charging for</h2>
        <p>List each product or service in language the client will recognize. For each line, show the quantity or hours, unit price, and line total. If an amount relates to a milestone, project, or approved extra work, make that clear in the description.</p>

        <h2>4. Check the calculation</h2>
        <p>Confirm the subtotal, any agreed discount, tax, and final amount due. Check the currency and make sure it matches what you discussed with the client. If tax applies, show it separately when required and use the correct rate for your circumstances.</p>

        <h2>5. Explain how to pay</h2>
        <p>Include the payment methods you accept and the details the client needs to use them. For a bank transfer, for example, provide the appropriate account information and ask the client to include the invoice reference. Share payment details through a channel you consider suitable.</p>

        <h2>Before you send it</h2>
        <ul>
          <li>Check the client name, invoice reference, and dates.</li>
          <li>Compare line items and totals with the approved scope or agreement.</li>
          <li>Confirm the currency, taxes, discount, and amount due.</li>
          <li>Make sure payment instructions and due date are visible.</li>
          <li>Save a copy and send the invoice to the right client contact.</li>
        </ul>
        <p>Use the <Link href="/invoice-generator">free invoice generator</Link> to add items, calculate the total, review the preview, and download a PDF. If the client has not approved the work or its price yet, prepare a <Link href="/quote-generator">quote first</Link>.</p>
      </article>
    </main>
  );
}
