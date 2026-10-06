import type { Metadata } from "next";
import InvoiceGenerator from "@/components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create & Download PDF Invoices",
  description: "Create a professional invoice online for free. Add line items, tax, and a discount, then download a polished PDF. No signup required.",
  alternates: { canonical: "/invoice-generator" },
  openGraph: {
    title: "Free Invoice Generator — Create & Download PDF Invoices",
    description: "Create a professional invoice online for free and download it as a PDF. No signup required.",
    type: "website",
    url: "/invoice-generator",
  },
};

export default function InvoicePage() {
  return (
    <main className="page">
      <div className="topbar">
        <a href="/" className="brand">BusinessTools</a>
        <span>Free Invoice Generator</span>
      </div>
      <InvoiceGenerator />
      <section className="seo-content" aria-labelledby="invoice-guide-title">
        <h2 id="invoice-guide-title">Create a free invoice online</h2>
        <p>Use this free invoice generator to prepare a clear, professional invoice for your client. Enter your business and client details, add the services or products you supplied, choose a currency, and include tax or a discount when needed. Your totals update automatically as you edit.</p>

        <h2>How to make an invoice</h2>
        <ol>
          <li>Enter your company name, client name, invoice number, and date.</li>
          <li>Add each product or service with its quantity and price.</li>
          <li>Select a currency and enter any applicable tax or discount.</li>
          <li>Review the invoice preview, then select <strong>Download PDF</strong>.</li>
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
            <summary>Do I need to sign up?</summary>
            <p>No account or signup is required to use the generator.</p>
          </details>
        </div>
      </section>
    </main>
  );
}
