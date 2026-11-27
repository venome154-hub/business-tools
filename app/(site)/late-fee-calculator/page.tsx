import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CalculatorTool from "@/components/CalculatorTool";
import EmbedPanel from "@/components/EmbedPanel";

export const metadata: Metadata = {
  title: "Late Payment Fee Calculator",
  description: "Free late fee calculator for unpaid invoices: enter amount, annual rate and days overdue to estimate a simple late payment fee. No sign-up needed.",
  alternates: { canonical: "/late-fee-calculator" },
  openGraph: { title: "Late Payment Fee Calculator", description: "Free late fee calculator for unpaid invoices: enter amount, annual rate and days overdue to estimate a simple late payment fee. No sign-up needed.", type: "website", url: "/late-fee-calculator" },
};

const faqs = [
    { question: "How is the fee calculated?", answer: "Amount × annual rate × days ÷ 365." },
    { question: "Does this apply a legal interest rate?", answer: "No. You enter the rate. Check the contract and the rules that apply before you charge a fee." },
    { question: "Can I put the note on an invoice?", answer: "The invoice generator has a late-fee note field. This page only calculates a figure." },
];

export default function Page() {
  return (
    <ToolArticle name="Late Payment Fee Calculator" path="/late-fee-calculator" description="Free late fee calculator for unpaid invoices: enter amount, annual rate and days overdue to estimate a simple late payment fee. No sign-up needed." intro="The fee is the unpaid amount times the annual rate times days late, divided by 365. It is a simple estimate, not a statutory interest calculation." faqs={faqs} headingAbove>
      <CalculatorTool slug="late-fee" />
      <EmbedPanel slug="late-fee" />
    </ToolArticle>
  );
}
