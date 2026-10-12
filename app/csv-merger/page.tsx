import type { Metadata } from "next";
import Link from "next/link";
import CsvUtility, { CsvOutputNote } from "@/components/CsvUtility";

export const metadata: Metadata = {
  title: "Free CSV Merger — Combine CSV Files Online",
  description: "Merge multiple CSV files into one spreadsheet. Match columns by header name, preview the combined rows, and download the result in your browser.",
  alternates: { canonical: "/csv-merger" },
  openGraph: { title: "Free CSV Merger — Combine CSV Files Online", description: "Combine CSV exports by column name and download one merged file for free.", type: "website", url: "/csv-merger" },
};

export default function CsvMergerPage() {
  return <main className="page csv-page">
    <CsvUtility mode="merger" />
    <CsvOutputNote />
    <section className="seo-content" aria-labelledby="csv-merger-guide">
      <h2 id="csv-merger-guide">Combine CSV files into one table</h2>
      <p>Use the CSV merger to bring together exports from different dates, stores, or systems. It combines rows and aligns columns by their header names, even when the columns appear in a different order. If a file does not contain a column, its cells are left blank in the merged output.</p>
      <h2>How to merge CSV files</h2>
      <ol>
        <li>Select two or more UTF-8 CSV files.</li>
        <li>Check that the column names in the preview line up as expected.</li>
        <li>Download the merged CSV and open it in your spreadsheet app.</li>
      </ol>
      <h2>Frequently asked questions</h2>
      <div className="faq-list">
        <details><summary>Do the columns need to be in the same order?</summary><p>No. The merger matches columns by their names in the header row and arranges them into one shared set of columns.</p></details>
        <details><summary>What if a file is missing a column?</summary><p>Rows from that file receive an empty value in the missing column.</p></details>
        <details><summary>Are my files sent to BizToolsBox?</summary><p>No. Files are read and combined in your browser. They are not uploaded or saved to an account.</p></details>
      </div>
      <p>Clean one of the input files with the <Link href="/csv-cleaner">CSV cleaner</Link> or look for repeated product codes with the <Link href="/duplicate-sku-finder">duplicate SKU finder</Link>.</p>
    </section>
  </main>;
}
