import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import DocumentStudio from "@/components/DocumentStudio";

export const metadata: Metadata = {
  title: "Free Timesheet Invoice Generator",
  description: "Turn hours worked into an invoice: enter dates, hours and an hourly rate, then download a timesheet invoice PDF. Free, no account, runs in your browser.",
  alternates: { canonical: "/timesheet-invoice" },
  openGraph: { title: "Free Timesheet Invoice Generator", description: "Turn hours worked into an invoice: enter dates, hours and an hourly rate, then download a timesheet invoice PDF. Free, no account, runs in your browser.", type: "website", url: "/timesheet-invoice" },
};

const faqs = [
    { question: "How is the line total calculated?", answer: "Each line is hours multiplied by the rate you enter." },
    { question: "Can I add tax?", answer: "Yes. Use one tax rate for the invoice, or tax each line separately." },
    { question: "Is this a payroll system?", answer: "No. It creates an invoice PDF from the hours and rates you type." },
];

export default function Page() {
  return (
    <ToolArticle name="Free Timesheet Invoice Generator" path="/timesheet-invoice" description="Turn hours worked into an invoice: enter dates, hours and an hourly rate, then download a timesheet invoice PDF. Free, no account, runs in your browser." intro="Enter the hours and the rate for each piece of work. The line amount is hours multiplied by the rate, then tax, discount, and balance are calculated in the browser." faqs={faqs}>
      <DocumentStudio kind="timesheet" />
    </ToolArticle>
  );
}
