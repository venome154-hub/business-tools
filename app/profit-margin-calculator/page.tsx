import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Profit Margin Calculator",
  description: "Free profit margin calculator: enter cost and selling price to see the gross margin percentage. The formula is (price - cost) / price. No sign-up needed.",
  alternates: { canonical: "/profit-margin-calculator" },
  openGraph: { title: "Profit Margin Calculator", description: "Free profit margin calculator: enter cost and selling price to see the gross margin percentage. The formula is (price - cost) / price. No sign-up needed.", type: "website", url: "/profit-margin-calculator" },
};

const faqs = [
    { question: "What is profit margin?", answer: "It is the profit divided by the selling price, shown as a percentage." },
    { question: "How is this different from markup?", answer: "Margin uses the selling price as the base. Markup uses the cost as the base." },
    { question: "Are the numbers saved?", answer: "No. The calculation runs in this browser and is not sent to a server." },
];

export default function Page() {
  return (
    <ToolArticle name="Profit Margin Calculator" path="/profit-margin-calculator" description="Free profit margin calculator: enter cost and selling price to see the gross margin percentage. The formula is (price - cost) / price. No sign-up needed." intro="Margin is the share of the selling price that is left after cost. Enter cost and selling price. The percentage is (price − cost) ÷ price." faqs={faqs} headingAbove>
      <CalculatorTool slug="profit-margin" />
    </ToolArticle>
  );
}
