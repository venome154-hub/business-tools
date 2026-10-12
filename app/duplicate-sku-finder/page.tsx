import type { Metadata } from "next";
import Link from "next/link";
import CsvUtility, { CsvOutputNote } from "@/components/CsvUtility";

export const metadata: Metadata = {
  title: "Free Duplicate SKU Finder — Check Product Codes in CSV",
  description: "Find repeated SKUs in a CSV product export. Choose a column, review duplicate rows, and download a report without uploading your file.",
  alternates: { canonical: "/duplicate-sku-finder" },
  openGraph: { title: "Free Duplicate SKU Finder — Check a CSV File", description: "Find repeated product SKUs and download matching rows or a duplicate summary for free.", type: "website", url: "/duplicate-sku-finder" },
};

export default function DuplicateSkuFinderPage() {
  return <main className="page csv-page">
    <CsvUtility mode="sku-finder" />
    <CsvOutputNote />
    <section className="seo-content" aria-labelledby="duplicate-sku-guide">
      <h2 id="duplicate-sku-guide">Find duplicate SKU values in a product export</h2>
      <p>Repeated stock keeping units can make product listings, inventory counts, and marketplace uploads harder to manage. Upload a CSV product list, select the column containing SKUs, and review the repeated values before downloading a report.</p>
      <h2>How to find duplicate SKUs</h2>
      <ol>
        <li>Select a UTF-8 CSV product file. The tool will try to recognize a column named SKU.</li>
        <li>Choose the correct SKU column and decide whether to ignore case and surrounding spaces.</li>
        <li>Review the duplicate values, then download matching product rows or a summary of SKU counts.</li>
      </ol>
      <h2>Frequently asked questions</h2>
      <div className="faq-list">
        <details><summary>Does the finder change my original file?</summary><p>No. It reads the file in your browser and offers a separate download with matching rows or a summary.</p></details>
        <details><summary>Are blank SKU cells reported as duplicates?</summary><p>No. Blank values are skipped so empty cells do not appear as repeated product codes.</p></details>
        <details><summary>Can I choose a column with a different name?</summary><p>Yes. Select any column from the CSV header row, even if it is not labeled SKU.</p></details>
      </div>
      <p>Need to prepare or combine spreadsheet exports? Use the <Link href="/csv-cleaner">CSV cleaner</Link> or the <Link href="/csv-merger">CSV merger</Link>.</p>
    </section>
  </main>;
}
