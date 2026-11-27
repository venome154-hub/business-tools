import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import ReceiptGenerator from "@/components/ReceiptGenerator";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webApplicationLd, type FaqItem } from "@/lib/schema";

const receiptFaqs: FaqItem[] = [
  { question: "Is this receipt generator free?", answer: "Yes. Create and download a receipt as PDF, Word, or Excel for free without creating an account." },
  { question: "Can I record a partial payment?", answer: "Yes. Enter the amount received; the receipt shows any remaining balance against the listed total." },
  { question: "Does the tool process or verify payments?", answer: "No. It creates a receipt document for a payment you report as received. It does not collect or verify payment." },
  { question: "Can I link the receipt to an invoice?", answer: "Yes. Enter the related invoice number so it appears on the receipt." },
];

export const metadata: Metadata = {
  title: "Free Receipt Generator — Create Payment Receipt PDFs",
  description: "Record a payment received and create a professional receipt PDF for free. Add payment method, reference, and related invoice number. No signup required.",
  alternates: { canonical: "/receipt-generator" },
  openGraph: {
    title: "Free Receipt Generator — Create Payment Receipt PDFs",
    description: "Create a clear payment receipt PDF online for free. No signup required.",
    type: "website",
    url: "/receipt-generator",
  },
};

export default function ReceiptPage() {
  return (
    <main className="page">
      <JsonLd data={[webApplicationLd("Free Receipt Generator", "/receipt-generator", "Create a payment receipt PDF in your browser."), faqLd(receiptFaqs), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Receipt generator", path: "/receipt-generator" }])]} />
      <ReceiptGenerator />
      <section className="seo-content" aria-labelledby="receipt-guide-title">
        <h2 id="receipt-guide-title">Create a free payment receipt online</h2>
        <p>Use this receipt generator after a customer has paid. Enter who received and made the payment, add the amount and payment method, and download a PDF, Word, or Excel file for your records or your customer. You can include a related invoice number and payment reference, and record a partial payment with the remaining balance shown.</p>
        <h2>How to write a payment receipt</h2>
        <ol>
          <li>Enter your business and customer names, receipt number, and payment date.</li>
          <li>Describe what the payment covers and enter the amount received.</li>
          <li>Choose the payment method and optionally add an invoice number or transaction reference.</li>
          <li>Review the receipt preview and select Download PDF, Download Word, or Download Excel.</li>
        </ol>
        <p>A receipt confirms that a payment was received; an invoice requests payment. If you still need to bill your client, use the <Link href="/invoice-generator">free invoice generator</Link>.</p>
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details><summary>Is this receipt generator free?</summary><p>Yes. Create and download a receipt as PDF, Word, or Excel for free without creating an account.</p></details>
          <details><summary>Can I record a partial payment?</summary><p>Yes. Enter the amount received; the receipt shows any remaining balance against the listed total.</p></details>
          <details><summary>Does the tool process or verify payments?</summary><p>No. It creates a receipt document for a payment you report as received. It does not collect or verify payment.</p></details>
          <details><summary>Can I link the receipt to an invoice?</summary><p>Yes. Enter the related invoice number so it appears on the receipt.</p></details>
        </div>
      </section>
      <ContextualLinks path="/receipt-generator" />
    </main>
  );
}
