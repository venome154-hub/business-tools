import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "Remove and Reorder CSV Columns",
  description: "Drop columns and change their order, then download the CSV.",
  alternates: { canonical: "/csv-columns" },
  openGraph: { title: "Remove and Reorder CSV Columns", description: "Drop columns and change their order, then download the CSV.", type: "website", url: "/csv-columns" },
};

const faqs = [
    { question: "Does this edit the original file?", answer: "No. The download is a new file. The file on your device is unchanged." },
    { question: "Can I reorder columns?", answer: "Yes. Up and Down move the selected column." },
    { question: "Are empty headers kept?", answer: "A column stays available until you uncheck it, even if the header cell is blank." },
];

export default function Page() {
  return (
    <ToolArticle name="Remove and Reorder CSV Columns" path="/csv-columns" description="Drop columns and change their order, then download the CSV." intro="Uncheck a column to remove it. Use Up and Down to change the order, then download the sheet." faqs={faqs}>
      <CsvWorkbench mode="columns" />
    </ToolArticle>
  );
}
