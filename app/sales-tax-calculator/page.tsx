import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Sales Tax Calculator",
  description: "Free sales tax, VAT and GST calculator: add tax to a net price or remove it from a gross price. Shows net, tax and total. Works in your browser.",
  alternates: { canonical: "/sales-tax-calculator" },
  openGraph: { title: "Sales Tax Calculator", description: "Free sales tax, VAT and GST calculator: add tax to a net price or remove it from a gross price. Shows net, tax and total. Works in your browser.", type: "website", url: "/sales-tax-calculator" },
};

const faqs = [
    { question: "Can I remove tax from a gross price?", answer: "Yes. Choose Remove tax. The net amount is the gross price divided by 1 plus the rate." },
    { question: "Which tax does this use?", answer: "It uses the rate you type. It does not look up a VAT or GST rate for you." },
    { question: "Is this tax advice?", answer: "No. It is arithmetic. Confirm the rate with the rules that apply to the sale." },
];

export default function Page() {
  return (
    <ToolArticle name="Sales Tax Calculator" path="/sales-tax-calculator" description="Free sales tax, VAT and GST calculator: add tax to a net price or remove it from a gross price. Shows net, tax and total. Works in your browser." intro="Enter an amount and a rate to add tax on top, or to pull tax back out of a tax-inclusive price. The rate is capped at 100%." faqs={faqs} headingAbove>
      <CalculatorTool slug="sales-tax" />
    </ToolArticle>
  );
}
