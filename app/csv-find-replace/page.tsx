import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "Find and Replace in a CSV",
  description: "Replace text in one CSV column or in every column.",
  alternates: { canonical: "/csv-find-replace" },
  openGraph: { title: "Find and Replace in a CSV", description: "Replace text in one CSV column or in every column.", type: "website", url: "/csv-find-replace" },
};

const faqs = [
    { question: "Does find and replace change the header?", answer: "No. Only data rows are changed." },
    { question: "Can I match case?", answer: "Yes. Turn on Match case when the capital letters matter." },
    { question: "Is the sheet uploaded?", answer: "No. The replacement runs in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Find and Replace in a CSV" path="/csv-find-replace" description="Replace text in one CSV column or in every column." intro="Search the data rows, optionally in a single column, and write the replacement into a new CSV. The header row is left as it is." faqs={faqs}>
      <CsvWorkbench mode="replace" />
    </ToolArticle>
  );
}
