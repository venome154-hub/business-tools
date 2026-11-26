import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Discount Calculator",
  description: "Take a percentage off a price.",
  alternates: { canonical: "/discount-calculator" },
  openGraph: { title: "Discount Calculator", description: "Take a percentage off a price.", type: "website", url: "/discount-calculator" },
};

const faqs = [
    { question: "Can the discount be more than 100%?", answer: "No. A discount above 100% is reduced to 100%." },
    { question: "Does this stack discounts?", answer: "No. It applies one percentage to the original price." },
    { question: "Where can I put this on an invoice?", answer: "The invoice and quote generators have a discount percent that applies to the subtotal." },
];

export default function Page() {
  return (
    <ToolArticle name="Discount Calculator" path="/discount-calculator" description="Take a percentage off a price." intro="Enter the original price and a discount percent from 0 to 100. The result is the amount off and the price after the discount." faqs={faqs} headingAbove>
      <CalculatorTool slug="discount" />
    </ToolArticle>
  );
}
