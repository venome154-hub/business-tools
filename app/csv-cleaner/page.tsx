import type { Metadata } from "next";
import Link from "next/link";
import CsvUtility, { CsvOutputNote } from "@/components/CsvUtility";

export const metadata: Metadata = {
  title: "Free CSV Cleaner — Remove Blank Rows and Duplicates",
  description: "Clean a CSV online by trimming cell spaces and removing blank rows, empty columns, and duplicate records. Your file stays in your browser.",
  alternates: { canonical: "/csv-cleaner" },
  openGraph: { title: "Free CSV Cleaner — Clean a CSV File Online", description: "Tidy CSV files in your browser and download a clean copy for free.", type: "website", url: "/csv-cleaner" },
};

export default function CsvCleanerPage() {
  return <main className="page csv-page">
    <CsvUtility mode="cleaner" />
    <CsvOutputNote />
    <section className="seo-content" aria-labelledby="csv-cleaner-guide">
      <h2 id="csv-cleaner-guide">Clean CSV files in a few clicks</h2>
      <p>CSV exports often contain blank lines, spaces around values, unused columns, or repeated records. This free CSV cleaner lets you choose which cleanup steps to apply, inspect a preview, and download the resulting file.</p>
      <h2>How to use the CSV cleaner</h2>
      <ol>
        <li>Choose a UTF-8 CSV file from your device.</li>
        <li>Select whether to trim spaces, remove blank rows or empty columns, and remove duplicate data rows.</li>
        <li>Review the row count and preview, then download the cleaned CSV.</li>
      </ol>
      <h2>Frequently asked questions</h2>
      <div className="faq-list">
        <details><summary>Is my CSV uploaded to a server?</summary><p>No. The file is processed in your browser and is not uploaded to or saved by BizToolsBox.</p></details>
        <details><summary>Does the cleaner keep the header row?</summary><p>Yes. The first row is treated as the column header. Duplicate removal applies to data rows below it.</p></details>
        <details><summary>Can I undo cleanup after downloading?</summary><p>The original file on your device is unchanged. You can adjust the options and create another copy at any time.</p></details>
      </div>
      <p>Need to combine exports? Try the <Link href="/csv-merger">free CSV merger</Link>. To check product identifiers, use the <Link href="/duplicate-sku-finder">duplicate SKU finder</Link>.</p>
    </section>
  </main>;
}
