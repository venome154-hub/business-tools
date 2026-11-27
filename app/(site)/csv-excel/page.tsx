import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "CSV and Excel Converter",
  description: "Convert CSV to Excel (XLSX) or Excel to CSV online for free. Files are processed in your browser and never uploaded to a server. No sign-up needed.",
  alternates: { canonical: "/csv-excel" },
  openGraph: { title: "CSV and Excel Converter", description: "Convert CSV to Excel (XLSX) or Excel to CSV online for free. Files are processed in your browser and never uploaded to a server. No sign-up needed.", type: "website", url: "/csv-excel" },
};

const faqs = [
    { question: "Is the spreadsheet uploaded?", answer: "No. SheetJS reads and writes the file in your browser." },
    { question: "Which Excel files work?", answer: "The tool reads .xlsx and .xls and writes .xlsx." },
    { question: "What if the CSV is not UTF-8?", answer: "If the bytes are not valid UTF-8, the file is read as Windows-1252." },
];

export default function Page() {
  return (
    <ToolArticle name="CSV and Excel Converter" path="/csv-excel" description="Convert CSV to Excel (XLSX) or Excel to CSV online for free. Files are processed in your browser and never uploaded to a server. No sign-up needed." intro="Open a CSV or an .xlsx file. Download the other format without uploading the spreadsheet." faqs={faqs}>
      <CsvWorkbench mode="excel" />
    </ToolArticle>
  );
}
