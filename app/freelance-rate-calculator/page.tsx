import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Freelance Hourly Rate Calculator",
  description: "Estimate an hourly rate from an income goal, expenses, weeks, and hours.",
  alternates: { canonical: "/freelance-rate-calculator" },
  openGraph: { title: "Freelance Hourly Rate Calculator", description: "Estimate an hourly rate from an income goal, expenses, weeks, and hours.", type: "website", url: "/freelance-rate-calculator" },
};

const faqs = [
    { question: "What does the hourly rate include?", answer: "It spreads your income goal and business expenses across the billable hours you enter." },
    { question: "Should I include vacation weeks?", answer: "Enter only the weeks you expect to bill. Unpaid weeks lower the hour count and raise the rate." },
    { question: "Does this set my client price?", answer: "No. It is a planning figure. Your quote can still differ by project." },
];

export default function Page() {
  return (
    <ToolArticle name="Freelance Hourly Rate Calculator" path="/freelance-rate-calculator" description="Estimate an hourly rate from an income goal, expenses, weeks, and hours." intro="Add the yearly income you want to the yearly business expenses, then divide by billable hours. Billable hours are working weeks times hours per week." faqs={faqs}>
      <CalculatorTool slug="freelance-rate" />
    </ToolArticle>
  );
}
