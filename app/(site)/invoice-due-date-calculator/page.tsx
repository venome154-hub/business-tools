import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";
import EmbedPanel from "@/components/EmbedPanel";

export const metadata: Metadata = {
  title: "Invoice Due Date Calculator",
  description: "Free invoice due date calculator: add net 7, net 15, net 30 or custom days to an invoice date to find the exact payment due date. No sign-up.",
  alternates: { canonical: "/invoice-due-date-calculator" },
  openGraph: { title: "Invoice Due Date Calculator", description: "Free invoice due date calculator: add net 7, net 15, net 30 or custom days to an invoice date to find the exact payment due date. No sign-up.", type: "website", url: "/invoice-due-date-calculator" },
};

const faqs = [
    { question: "What does net 30 mean?", answer: "It means payment is due 30 days after the invoice date, unless the agreement says otherwise." },
    { question: "Does the count include the issue date?", answer: "The due date is the issue date plus the number of days you enter." },
    { question: "Can the invoice generator do this?", answer: "Yes. Net 7, Net 15, and Net 30 on the invoice set the due date from the issue date." },
];

export default function Page() {
  return (
    <ToolArticle name="Invoice Due Date Calculator" path="/invoice-due-date-calculator" description="Free invoice due date calculator: add net 7, net 15, net 30 or custom days to an invoice date to find the exact payment due date. No sign-up." intro="Choose the issue date and the number of days, such as 7, 15, or 30. The due date is that many days later on the calendar." faqs={faqs} headingAbove>
      <CalculatorTool slug="due-date" />
      <EmbedPanel slug="due-date" />
    </ToolArticle>
  );
}
