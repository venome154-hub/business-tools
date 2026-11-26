import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import DocumentStudio from "@/components/DocumentStudio";

export const metadata: Metadata = {
  title: "Free Credit Note Generator",
  description: "Create a credit note PDF for an amount credited against an invoice.",
  alternates: { canonical: "/credit-note" },
  openGraph: { title: "Free Credit Note Generator", description: "Create a credit note PDF for an amount credited against an invoice.", type: "website", url: "/credit-note" },
};

const faqs = [
    { question: "Is a credit note a receipt?", answer: "No. A credit note records an amount credited. A receipt records a payment received." },
    { question: "Can I link it to an invoice?", answer: "Yes. Add the related invoice number so it appears on the PDF." },
    { question: "Is the credit note uploaded?", answer: "No. The PDF is created in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Free Credit Note Generator" path="/credit-note" description="Create a credit note PDF for an amount credited against an invoice." intro="Use a credit note when you reduce what a customer owes. Enter the related invoice number, the credited items, and download the PDF." faqs={faqs}>
      <DocumentStudio kind="credit-note" />
    </ToolArticle>
  );
}
