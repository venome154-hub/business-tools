import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "CSV to JSON Converter",
  description: "Free CSV to JSON converter: turn the header row into JSON keys and rows into objects. Runs in your browser, so your file is never uploaded. No sign-up.",
  alternates: { canonical: "/csv-to-json" },
  openGraph: { title: "CSV to JSON Converter", description: "Free CSV to JSON converter: turn the header row into JSON keys and rows into objects. Runs in your browser, so your file is never uploaded. No sign-up.", type: "website", url: "/csv-to-json" },
};

const faqs = [
    { question: "Are the values strings?", answer: "Yes. Cells are written as text, including numbers." },
    { question: "What if two columns share a name?", answer: "The later column overwrites the earlier one in that object." },
    { question: "Is the file uploaded?", answer: "No. Conversion happens on your device." },
];

export default function Page() {
  return (
    <ToolArticle name="CSV to JSON Converter" path="/csv-to-json" description="Free CSV to JSON converter: turn the header row into JSON keys and rows into objects. Runs in your browser, so your file is never uploaded. No sign-up." intro="The first row becomes the keys. Each following row becomes an object. Empty rows are left out of the JSON file." faqs={faqs}>
      <CsvWorkbench mode="json" />
    </ToolArticle>
  );
}
