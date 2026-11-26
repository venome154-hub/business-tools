import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";

export const metadata: Metadata = {
  title: "Invoice Due Date Calculator",
  description: "Add net days to an invoice issue date.",
  alternates: { canonical: "/invoice-due-date-calculator" },
  openGraph: { title: "Invoice Due Date Calculator", description: "Add net days to an invoice issue date.", type: "website", url: "/invoice-due-date-calculator" },
};

const faqs = [
    { question: "What does net 30 mean?", answer: "It means payment is due 30 days after the invoice date, unless the agreement says otherwise." },
    { question: "Does the count include the issue date?", answer: "The due date is the issue date plus the number of days you enter." },
    { question: "Can the invoice generator do this?", answer: "Yes. Net 7, Net 15, and Net 30 on the invoice set the due date from the issue date." },
];

export default function Page() {
  return (
    <ToolArticle name="Invoice Due Date Calculator" path="/invoice-due-date-calculator" description="Add net days to an invoice issue date." intro="Choose the issue date and the number of days, such as 7, 15, or 30. The due date is that many days later on the calendar." faqs={faqs}>
      <CalculatorTool slug="due-date" />
    </ToolArticle>
  );
}
