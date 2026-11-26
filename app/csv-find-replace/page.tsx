import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "Find and Replace in a CSV",
  description: "Find and replace text in a CSV file, in one column or in every column, then download the result. Free, private, runs in your browser. No sign-up.",
  alternates: { canonical: "/csv-find-replace" },
  openGraph: { title: "Find and Replace in a CSV", description: "Find and replace text in a CSV file, in one column or in every column, then download the result. Free, private, runs in your browser. No sign-up.", type: "website", url: "/csv-find-replace" },
};

const faqs = [
    { question: "Does find and replace change the header?", answer: "No. Only data rows are changed." },
    { question: "Can I match case?", answer: "Yes. Turn on Match case when the capital letters matter." },
    { question: "Is the sheet uploaded?", answer: "No. The replacement runs in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Find and Replace in a CSV" path="/csv-find-replace" description="Find and replace text in a CSV file, in one column or in every column, then download the result. Free, private, runs in your browser. No sign-up." intro="Search the data rows, optionally in a single column, and write the replacement into a new CSV. The header row is left as it is." faqs={faqs}>
      <CsvWorkbench mode="replace" />
    </ToolArticle>
  );
}
