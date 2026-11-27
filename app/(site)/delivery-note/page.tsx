import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import DocumentStudio from "@/components/DocumentStudio";

export const metadata: Metadata = {
  title: "Free Delivery Note and Packing Slip",
  description: "Make a free delivery note or packing slip PDF that lists items and quantities in a shipment. Runs in your browser, no account or sign-up needed.",
  alternates: { canonical: "/delivery-note" },
  openGraph: { title: "Free Delivery Note and Packing Slip", description: "Make a free delivery note or packing slip PDF that lists items and quantities in a shipment. Runs in your browser, no account or sign-up needed.", type: "website", url: "/delivery-note" },
};

const faqs = [
    { question: "Does the packing slip show prices?", answer: "No. It lists the items and quantities so the recipient can check the shipment." },
    { question: "Can I add a purchase order number?", answer: "Yes. The PO number is printed with the delivery details." },
    { question: "Is the file uploaded?", answer: "No. The PDF is created on your device." },
];

export default function Page() {
  return (
    <ToolArticle name="Free Delivery Note and Packing Slip" path="/delivery-note" description="Make a free delivery note or packing slip PDF that lists items and quantities in a shipment. Runs in your browser, no account or sign-up needed." intro="A delivery note, sometimes called a packing slip, lists what is in a shipment. This version shows descriptions and quantities rather than a request for payment." faqs={faqs}>
      <DocumentStudio kind="delivery-note" />
    </ToolArticle>
  );
}
