import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Break-even Calculator",
  description: "Estimate how many units cover fixed costs.",
  alternates: { canonical: "/break-even-calculator" },
  openGraph: { title: "Break-even Calculator", description: "Estimate how many units cover fixed costs.", type: "website", url: "/break-even-calculator" },
};

const faqs = [
    { question: "What is a break-even point?", answer: "It is the number of units where revenue covers fixed costs and the variable cost of those units." },
    { question: "What if price is below variable cost?", answer: "The calculator does not return a unit count, because each sale would add to the loss." },
    { question: "Does it include tax?", answer: "No. Enter figures on the same basis you want to compare." },
];

export default function Page() {
  return (
    <ToolArticle name="Break-even Calculator" path="/break-even-calculator" description="Estimate how many units cover fixed costs." intro="Break-even units equal fixed costs divided by the amount left from the price after variable cost. If the price is not higher than the variable cost, there is no break-even point." faqs={faqs} headingAbove>
      <CalculatorTool slug="break-even" />
    </ToolArticle>
  );
}
