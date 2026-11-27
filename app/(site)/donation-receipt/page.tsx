import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import DocumentStudio from "@/components/DocumentStudio";

export const metadata: Metadata = {
  title: "Free Donation Receipt Generator",
  description: "Create a free donation receipt PDF with donor, amount, date and a thank-you note. Check local tax rules. Runs in your browser, no account needed.",
  alternates: { canonical: "/donation-receipt" },
  openGraph: { title: "Free Donation Receipt Generator", description: "Create a free donation receipt PDF with donor, amount, date and a thank-you note. Check local tax rules. Runs in your browser, no account needed.", type: "website", url: "/donation-receipt" },
};

const faqs = [
    { question: "Does this prove a donation is tax-deductible?", answer: "No. Deductibility depends on local rules and on the organization. Check the authority that applies to you." },
    { question: "Who is the receipt for?", answer: "It is a record of a donation you report as received." },
    { question: "Is donor information uploaded?", answer: "No. The receipt is created in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Free Donation Receipt Generator" path="/donation-receipt" description="Create a free donation receipt PDF with donor, amount, date and a thank-you note. Check local tax rules. Runs in your browser, no account needed." intro="Record the donor, the amount, and the date. The PDF includes a note that tax rules vary and that this document does not decide whether a gift is deductible." faqs={faqs}>
      <DocumentStudio kind="donation-receipt" />
    </ToolArticle>
  );
}
