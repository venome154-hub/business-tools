import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Markup Calculator",
  description: "Calculate markup from cost and selling price.",
  alternates: { canonical: "/markup-calculator" },
  openGraph: { title: "Markup Calculator", description: "Calculate markup from cost and selling price.", type: "website", url: "/markup-calculator" },
};

const faqs = [
    { question: "What is markup?", answer: "Markup is (selling price − cost) ÷ cost." },
    { question: "Can markup and margin be the same number?", answer: "Only in special cases. A 100% markup is a 50% margin." },
    { question: "Do I need an account?", answer: "No. The calculator runs in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Markup Calculator" path="/markup-calculator" description="Calculate markup from cost and selling price." intro="Markup is the amount added to cost, divided by that cost. A 50% markup on a 100 cost is a 150 selling price." faqs={faqs} headingAbove>
      <CalculatorTool slug="markup" />
    </ToolArticle>
  );
}
