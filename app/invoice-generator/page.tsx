import type { Metadata } from "next";
import Link from "next/link";
import InvoiceGenerator from "@/components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create & Download PDF Invoices",
  description: "Create a detailed PDF invoice with client details, a due date, payment instructions, line items, tax, and discounts. Free and no signup.",
  alternates: { canonical: "/invoice-generator" },
  openGraph: {
    title: "Free Invoice Generator — Create & Download PDF Invoices",
    description: "Create a detailed invoice with payment instructions, then download a PDF for free. No signup required.",
    type: "website",
    url: "/invoice-generator",
  },
};

export default function InvoicePage() {
  return (
    <main className="page">
      <div className="topbar">
        <Link href="/" className="brand">BizToolsBox</Link>
        <Link href="/quote-generator">Preparing a quote first? Create an estimate →</Link>
      </div>
      <InvoiceGenerator />
      <section className="seo-content" aria-labelledby="invoice-guide-title">
        <h2 id="invoice-guide-title">Create a free invoice online</h2>
        <p>Use this free invoice generator to prepare a clear invoice for your client. Add business and client contact details, an issue date and optional due date, list the supplied products or services, and include payment instructions. Totals update as you edit, and the document is created as a PDF in your browser.</p>

        <h2>How to make an invoice</h2>
        <ol>
          <li>Enter your business and client names and optional contact details.</li>
          <li>Add the invoice number, issue date, and optional payment due date.</li>
          <li>Add each product or service with its quantity and price.</li>
          <li>Select a currency and enter any applicable tax or discount.</li>
          <li>Add optional payment instructions or a note, review the preview, and select <strong>Download PDF</strong>.</li>
        </ol>
        <p>The invoice is created in your browser and downloaded as a PDF. You can review the details before sharing it with your client.</p>

        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details>
            <summary>Is this invoice generator free?</summary>
            <p>Yes. You can create and download an invoice PDF for free, without creating an account.</p>
          </details>
          <details>
            <summary>How do I save my invoice as a PDF?</summary>
            <p>Fill in the invoice details, review the preview, and select the Download PDF button. The PDF will be saved through your browser.</p>
          </details>
          <details>
            <summary>Can I add tax and discounts?</summary>
            <p>Yes. Enter tax and discount percentages and the invoice preview will update the subtotal and total.</p>
          </details>
          <details>
            <summary>Can I add a due date and payment instructions?</summary>
            <p>Yes. Set an optional due date and include payment instructions in the invoice and PDF.</p>
          </details>
          <details>
            <summary>Are my invoice details uploaded?</summary>
            <p>The generator uses your entries in this browser to update the preview and create your PDF. See our <Link href="/privacy">privacy and data page</Link> for details.</p>
          </details>
          <details>
            <summary>Do I need to sign up?</summary>
            <p>No account or signup is required to use the generator.</p>
          </details>
        </div>
      </section>
      <footer className="home-footer"><Link href="/guides">Guides</Link><Link href="/privacy">Privacy & data</Link></footer>
    </main>
  );
}
