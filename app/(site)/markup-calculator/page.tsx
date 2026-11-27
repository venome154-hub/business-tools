import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";
import EmbedPanel from "@/components/EmbedPanel";

export const metadata: Metadata = {
  title: "Markup Calculator",
  description: "Free markup calculator: enter cost and selling price to see the markup percentage. Markup divides profit by cost, which is not the same as margin. No sign-up.",
  alternates: { canonical: "/markup-calculator" },
  openGraph: { title: "Markup Calculator", description: "Free markup calculator: enter cost and selling price to see the markup percentage. Markup divides profit by cost, which is not the same as margin. No sign-up.", type: "website", url: "/markup-calculator" },
};

const faqs = [
    { question: "What is markup?", answer: "Markup is (selling price − cost) ÷ cost." },
    { question: "Can markup and margin be the same number?", answer: "Only in special cases. A 100% markup is a 50% margin." },
    { question: "Do I need an account?", answer: "No. The calculator runs in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Markup Calculator" path="/markup-calculator" description="Free markup calculator: enter cost and selling price to see the markup percentage. Markup divides profit by cost, which is not the same as margin. No sign-up." intro="Markup is the amount added to cost, divided by that cost. A 50% markup on a 100 cost is a 150 selling price." faqs={faqs} headingAbove>
      <CalculatorTool slug="markup" />
      <EmbedPanel slug="markup" />
    </ToolArticle>
  );
}
