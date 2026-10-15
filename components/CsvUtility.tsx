"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import { cleanCsvRows, downloadCsv, findDuplicateSkus, mergeCsvFiles, parseCsv, preferredDelimiter, type CsvRow } from "@/lib/csv";
import { trackEvent } from "@/lib/analytics";

type ToolMode = "cleaner" | "merger" | "sku-finder";
type CsvDocument = { name: string; rows: CsvRow[]; delimiter: "," | ";" | "\t" };

const TOOL_COPY: Record<ToolMode, { title: string; description: string; button: string }> = {
  cleaner: {
    title: "Clean up a CSV file",
    description: "Remove blank rows, empty columns, extra spaces, and repeated records, then download a tidy CSV.",
    button: "Download cleaned CSV",
  },
  merger: {
    title: "Merge CSV files by column name",
    description: "Combine several exports into one file. Columns are matched by header name, so their order can differ between files.",
    button: "Download merged CSV",
  },
  "sku-finder": {
    title: "Find duplicate SKUs in a CSV",
    description: "Choose the SKU column, review repeated product codes, and download either the matching rows or a compact duplicate report.",
    button: "Download duplicate rows",
  },
};

const SKU_HEADER_NAMES = ["sku", "product sku", "product_sku", "seller sku", "seller_sku", "item sku", "item_sku", "stock keeping unit"];

export default function CsvUtility({ mode }: { mode: ToolMode }) {
  const [documents, setDocuments] = useState<CsvDocument[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [removeBlankRows, setRemoveBlankRows] = useState(true);
  const [removeEmptyColumns, setRemoveEmptyColumns] = useState(true);
  const [removeDuplicateRows, setRemoveDuplicateRows] = useState(true);
  const [skuColumn, setSkuColumn] = useState("");
  const [normalizeSku, setNormalizeSku] = useState(true);

  const copy = TOOL_COPY[mode];
  const firstDocument = documents[0];
  const firstHeaders = firstDocument?.rows[0] ?? [];

  const cleanedRows = useMemo(() => {
    if (mode !== "cleaner" || !firstDocument) return [];
    return cleanCsvRows(firstDocument.rows, { trimSpaces, removeBlankRows, removeEmptyColumns, removeDuplicateRows });
  }, [mode, firstDocument, trimSpaces, removeBlankRows, removeEmptyColumns, removeDuplicateRows]);

  const mergedRows = useMemo(() => {
    if (mode !== "merger" || documents.length < 2) return [];
    return mergeCsvFiles(documents.map((document) => document.rows));
  }, [mode, documents]);

  const selectedSkuColumn = skuColumn || String(Math.max(0, firstHeaders.findIndex((header) =>
    SKU_HEADER_NAMES.includes(header.trim().toLocaleLowerCase()),
  )));

  const duplicateData = useMemo(() => {
    if (mode !== "sku-finder" || !firstDocument || firstDocument.rows.length < 2) {
      return { rows: [] as CsvRow[], summary: [] as CsvRow[], duplicates: [] as { id: string; sku: string; count: number }[], blankSkus: 0 };
    }
    return findDuplicateSkus(firstDocument.rows, Number(selectedSkuColumn), normalizeSku);
  }, [mode, firstDocument, selectedSkuColumn, normalizeSku]);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setError("");
    try {
      const parsed = await Promise.all(files.map(async (file) => {
        const result = parseCsv(await file.text());
        return { name: file.name, rows: result.rows, delimiter: result.delimiter };
      }));
      if (parsed.some((document) => document.rows.length === 0)) {
        setError("At least one selected file is empty or could not be read as CSV. Please choose valid CSV files.");
        return;
      }
      const nextDocuments = mode === "merger" ? [...documents, ...parsed] : parsed.slice(0, 1);
      setDocuments(nextDocuments);
      if (mode === "sku-finder") {
        const headers = nextDocuments[0]?.rows[0] ?? [];
        const detected = headers.findIndex((header) => SKU_HEADER_NAMES.includes(header.trim().toLocaleLowerCase()));
        setSkuColumn(String(Math.max(0, detected)));
      }
    } catch {
      setError("The file could not be read. Try saving it as a UTF-8 CSV and upload it again.");
    } finally {
      setBusy(false);
    }
  }

  function removeDocument(index: number) {
    const next = documents.filter((_, documentIndex) => documentIndex !== index);
    setDocuments(next);
    if (mode === "sku-finder" && next[0]) {
      const detected = next[0].rows[0]?.findIndex((header) => SKU_HEADER_NAMES.includes(header.trim().toLocaleLowerCase())) ?? 0;
      setSkuColumn(String(Math.max(0, detected)));
    }
  }

  function save(rows: CsvRow[], filename: string, toolName: string) {
    const delimiter = mode === "merger"
      ? preferredDelimiter(documents.map((document) => document.delimiter))
      : (documents[0]?.delimiter ?? ",");
    downloadCsv(filename, rows, delimiter);
    trackEvent("csv_download", { tool_name: toolName });
  }

  const outputRows = mode === "cleaner" ? cleanedRows : mode === "merger" ? mergedRows : duplicateData.rows;
  const canDownload = mode === "merger" ? documents.length >= 2 : mode === "sku-finder" ? duplicateData.duplicates.length > 0 : Boolean(firstDocument && cleanedRows.length > 0);

  return (
    <>
      <nav className="topbar" aria-label="Main navigation">
        <Link href="/" className="brand">BizToolsBox</Link>
        <Link href="/">All free tools →</Link>
      </nav>
      <div className="csv-tool-layout">
        <section className="csv-tool-panel" aria-labelledby="csv-tool-title">
          <span className="badge">FREE CSV TOOL · FILES STAY ON YOUR DEVICE</span>
          <h1 id="csv-tool-title">{copy.title}</h1>
          <p className="csv-tool-intro">{copy.description}</p>

          <label className="csv-upload">
            <span>{busy ? "Reading your file…" : mode === "merger" ? "Choose CSV files" : "Choose a CSV file"}</span>
            <small>{mode === "merger" ? "Select two or more .csv files" : "UTF-8 .csv file · processed in this browser"}</small>
            <input type="file" accept=".csv,text/csv" multiple={mode === "merger"} onChange={handleFiles} disabled={busy} />
          </label>
          {error && <p className="csv-error" role="alert">{error}</p>}

          {documents.length > 0 && <div className="csv-file-list" aria-label="Selected files">
            {documents.map((document, index) => <div className="csv-file-row" key={`${document.name}-${index}`}>
              <span><strong>{document.name}</strong><small>{Math.max(document.rows.length - 1, 0).toLocaleString()} data rows · {document.rows[0]?.length ?? 0} columns</small></span>
              <button className="csv-remove" type="button" onClick={() => removeDocument(index)} aria-label={`Remove ${document.name}`}>Remove</button>
            </div>)}
          </div>}

          {mode === "cleaner" && firstDocument && <div className="csv-options">
            <strong>Cleaning options</strong>
            <label><input type="checkbox" checked={trimSpaces} onChange={(event) => setTrimSpaces(event.target.checked)} /> Trim spaces around cell values</label>
            <label><input type="checkbox" checked={removeBlankRows} onChange={(event) => setRemoveBlankRows(event.target.checked)} /> Remove blank rows</label>
            <label><input type="checkbox" checked={removeEmptyColumns} onChange={(event) => setRemoveEmptyColumns(event.target.checked)} /> Remove columns that are empty in every row</label>
            <label><input type="checkbox" checked={removeDuplicateRows} onChange={(event) => setRemoveDuplicateRows(event.target.checked)} /> Remove exact duplicate data rows</label>
          </div>}

          {mode === "merger" && documents.length > 0 && <div className="csv-note"><strong>How columns are matched</strong><p>Header names are compared without regard to capitalization or surrounding spaces. Columns that do not appear in a file are left blank in that file&apos;s rows.</p></div>}

          {mode === "sku-finder" && firstDocument && <div className="csv-options">
            <label className="csv-field-label" htmlFor="sku-column">SKU column</label>
            <select id="sku-column" value={selectedSkuColumn} onChange={(event) => setSkuColumn(event.target.value)}>
              {firstHeaders.map((header, index) => <option value={index} key={`${header}-${index}`}>{header.trim() || `Column ${index + 1}`}</option>)}
            </select>
            <label><input type="checkbox" checked={normalizeSku} onChange={(event) => setNormalizeSku(event.target.checked)} /> Ignore letter case and surrounding spaces</label>
          </div>}

          {mode === "cleaner" && firstDocument && <p className="csv-result-count">{Math.max(firstDocument.rows.length - 1, 0).toLocaleString()} rows before → {Math.max(cleanedRows.length - 1, 0).toLocaleString()} after cleaning</p>}
          {mode === "merger" && documents.length > 0 && <p className="csv-result-count">{documents.length < 2 ? "Add at least one more CSV file to merge." : `${Math.max(mergedRows.length - 1, 0).toLocaleString()} data rows ready to merge.`}</p>}
          {mode === "sku-finder" && firstDocument && <div className="csv-result-count" role="status">
            <strong>{duplicateData.duplicates.length.toLocaleString()} duplicate SKU{duplicateData.duplicates.length === 1 ? "" : "s"} found</strong>
            <span>{duplicateData.rows.length > 0 ? `${Math.max(duplicateData.rows.length - 1, 0).toLocaleString()} matching rows` : "No repeated values in this column."}{duplicateData.blankSkus ? ` ${duplicateData.blankSkus.toLocaleString()} blank SKU cells skipped.` : ""}</span>
          </div>}

          {canDownload && <div className="csv-download-actions">
            {mode !== "sku-finder" && <button className="primary" type="button" onClick={() => save(outputRows, mode === "cleaner" ? "cleaned.csv" : "merged.csv", mode === "cleaner" ? "csv_cleaner" : "csv_merger")}>{copy.button}</button>}
            {mode === "sku-finder" && <>
              <button className="primary" type="button" onClick={() => save(duplicateData.rows, "duplicate-sku-rows.csv", "duplicate_sku_rows")}>Download duplicate rows</button>
              <button className="secondary" type="button" onClick={() => save(duplicateData.summary, "duplicate-sku-summary.csv", "duplicate_sku_summary")}>Download SKU summary</button>
            </>}
          </div>}
        </section>

        {documents.length > 0 && <section className="csv-preview" aria-label="CSV preview">
          <div className="csv-preview-heading"><div><h2>{mode === "cleaner" ? "Cleaned preview" : mode === "merger" ? "Merged preview" : "Duplicate rows"}</h2><p>Showing up to 8 rows · preview stays in your browser</p></div><span>{Math.max(outputRows.length - 1, 0).toLocaleString()} rows</span></div>
          {mode === "sku-finder" && duplicateData.duplicates.length > 0 && <div className="csv-duplicate-list">
            <strong>Repeated SKU values</strong>
            <ul>{duplicateData.duplicates.slice(0, 8).map(({ id, sku, count }) => <li key={id}><code>{sku}</code><span>{count} rows</span></li>)}</ul>
            {duplicateData.duplicates.length > 8 && <p>Plus {(duplicateData.duplicates.length - 8).toLocaleString()} more. Download the SKU summary to see all duplicates.</p>}
          </div>}
          <div className="csv-table-wrap">
            <table><tbody>{outputRows.slice(0, 9).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, columnIndex) => rowIndex === 0 ? <th key={columnIndex} scope="col">{cell || `Column ${columnIndex + 1}`}</th> : <td key={columnIndex}>{cell}</td>)}</tr>)}</tbody></table>
            {outputRows.length <= 1 && mode !== "sku-finder" && <p className="csv-empty">No data rows to preview.</p>}
            {mode === "sku-finder" && duplicateData.duplicates.length === 0 && <p className="csv-empty">Your selected SKU column has no duplicate values.</p>}
          </div>
        </section>}
      </div>
    </>
  );
}

export function CsvOutputNote() {
  return <p className="csv-privacy-note">Your CSV is read and processed in this browser. BizToolsBox does not upload or save the file. Use the preview to check the output before downloading. The download keeps the separator from your file. When merged files use different separators, the most common one is used.</p>;
}
