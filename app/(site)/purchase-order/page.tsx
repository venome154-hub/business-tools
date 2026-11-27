import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import DocumentStudio from "@/components/DocumentStudio";

export const metadata: Metadata = {
  title: "Free Purchase Order Generator",
  description: "Create a free purchase order PDF for a supplier in your browser. Add items, quantities, prices and delivery terms. No account or sign-up needed.",
  alternates: { canonical: "/purchase-order" },
  openGraph: { title: "Free Purchase Order Generator", description: "Create a free purchase order PDF for a supplier in your browser. Add items, quantities, prices and delivery terms. No account or sign-up needed.", type: "website", url: "/purchase-order" },
};

const faqs = [
    { question: "Is this purchase order free?", answer: "Yes. You can fill it in and download a PDF without an account." },
    { question: "Does it place the order with the vendor?", answer: "No. It only creates the document. You send the PDF yourself." },
    { question: "Where is the purchase order saved?", answer: "If you download or choose Save on this device, a copy stays in this browser. It is not uploaded." },
];

export default function Page() {
  return (
    <ToolArticle name="Free Purchase Order Generator" path="/purchase-order" description="Create a free purchase order PDF for a supplier in your browser. Add items, quantities, prices and delivery terms. No account or sign-up needed." intro="List what you are ordering, the vendor, quantities, and prices. The purchase order is built on this device and downloaded as a PDF." faqs={faqs}>
      <DocumentStudio kind="purchase-order" />
    </ToolArticle>
  );
}
