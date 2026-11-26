import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Sales Tax Calculator",
  description: "Add or remove VAT, GST, or sales tax from an amount.",
  alternates: { canonical: "/sales-tax-calculator" },
  openGraph: { title: "Sales Tax Calculator", description: "Add or remove VAT, GST, or sales tax from an amount.", type: "website", url: "/sales-tax-calculator" },
};

const faqs = [
    { question: "Can I remove tax from a gross price?", answer: "Yes. Choose Remove tax. The net amount is the gross price divided by 1 plus the rate." },
    { question: "Which tax does this use?", answer: "It uses the rate you type. It does not look up a VAT or GST rate for you." },
    { question: "Is this tax advice?", answer: "No. It is arithmetic. Confirm the rate with the rules that apply to the sale." },
];

export default function Page() {
  return (
    <ToolArticle name="Sales Tax Calculator" path="/sales-tax-calculator" description="Add or remove VAT, GST, or sales tax from an amount." intro="Enter an amount and a rate to add tax on top, or to pull tax back out of a tax-inclusive price. The rate is capped at 100%." faqs={faqs}>
      <CalculatorTool slug="sales-tax" />
    </ToolArticle>
  );
}
