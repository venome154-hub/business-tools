import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import DocumentStudio from "@/components/DocumentStudio";

export const metadata: Metadata = {
  title: "Free Rent Receipt Generator",
  description: "Write a rent receipt PDF for a payment you received.",
  alternates: { canonical: "/rent-receipt" },
  openGraph: { title: "Free Rent Receipt Generator", description: "Write a rent receipt PDF for a payment you received.", type: "website", url: "/rent-receipt" },
};

const faqs = [
    { question: "Does this collect rent?", answer: "No. It writes a receipt for rent you already received." },
    { question: "Can I name the property and period?", answer: "Yes. Both appear on the receipt." },
    { question: "Is the receipt stored online?", answer: "No. It stays in this browser unless you download the PDF." },
];

export default function Page() {
  return (
    <ToolArticle name="Free Rent Receipt Generator" path="/rent-receipt" description="Write a rent receipt PDF for a payment you received." intro="Record the tenant, the property, the rent period, and the amount you received. Download a PDF for your records." faqs={faqs}>
      <DocumentStudio kind="rent-receipt" />
    </ToolArticle>
  );
}
