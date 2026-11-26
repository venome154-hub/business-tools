import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "Split CSV by Rows",
  description: "Split a CSV into smaller files that keep the header row.",
  alternates: { canonical: "/split-csv" },
  openGraph: { title: "Split CSV by Rows", description: "Split a CSV into smaller files that keep the header row.", type: "website", url: "/split-csv" },
};

const faqs = [
    { question: "Does each file include the header?", answer: "Yes. The first row is copied onto every part." },
    { question: "Why is there a button per part?", answer: "Browsers often block a burst of automatic downloads, so each part has its own button." },
    { question: "Can I split an Excel file?", answer: "Yes. An .xlsx file is read in the browser first." },
];

export default function Page() {
  return (
    <ToolArticle name="Split CSV by Rows" path="/split-csv" description="Split a CSV into smaller files that keep the header row." intro="Choose how many data rows each file should hold. Every part keeps the original header. Download each part separately." faqs={faqs}>
      <CsvWorkbench mode="split" />
    </ToolArticle>
  );
}
