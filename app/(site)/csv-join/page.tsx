import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "Join Two CSVs by Key",
  description: "Join two CSV files by a shared key column, like VLOOKUP, and download the combined file. Free, private, runs in your browser, nothing is uploaded.",
  alternates: { canonical: "/csv-join" },
  openGraph: { title: "Join Two CSVs by Key", description: "Join two CSV files by a shared key column, like VLOOKUP, and download the combined file. Free, private, runs in your browser, nothing is uploaded.", type: "website", url: "/csv-join" },
};

const faqs = [
    { question: "Which file keeps all of its rows?", answer: "The first file. Rows that do not match still appear, with empty cells from the second file." },
    { question: "Is the match case-sensitive?", answer: "No. Keys are compared after trimming spaces and ignoring letter case." },
    { question: "Do both files need the same headers?", answer: "No. You choose the key column in each file." },
];

export default function Page() {
  return (
    <ToolArticle name="Join Two CSVs by Key" path="/csv-join" description="Join two CSV files by a shared key column, like VLOOKUP, and download the combined file. Free, private, runs in your browser, nothing is uploaded." intro="Every row from the first file is kept. Matching rows from the second file add their other columns. A missing key leaves those cells blank." faqs={faqs}>
      <CsvWorkbench mode="join" />
    </ToolArticle>
  );
}
