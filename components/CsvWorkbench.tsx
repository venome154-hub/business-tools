"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { downloadCsv, type CsvDelimiter, type CsvRow } from "@/lib/csv";
import { trackEvent } from "@/lib/analytics";
import { checkProductCsv, csvName, downloadJson, downloadXlsx, joinByKey, readTableFile, reorderColumns, replaceCells, splitRows } from "@/lib/table-file";

export type CsvExtraMode = "excel" | "json" | "split" | "columns" | "replace" | "join" | "products";

const COPY: Record<CsvExtraMode, { title: string; description: string }> = {
  excel: { title: "CSV and Excel converter", description: "Turn a CSV into an Excel workbook, or an Excel sheet into a CSV. The file stays in this browser." },
  json: { title: "CSV to JSON", description: "Convert the first row into JSON keys and download an array of records." },
  split: { title: "Split a CSV by rows", description: "Break a large sheet into smaller CSV files with the same header." },
  columns: { title: "Remove or reorder columns", description: "Choose which columns to keep and move them up or down before downloading." },
  replace: { title: "Find and replace in a CSV", description: "Replace text in one column or across the whole sheet, then download the result." },
  join: { title: "Join two CSVs by a key", description: "Match rows the way a spreadsheet VLOOKUP does. The first file keeps every row." },
  products: { title: "Product CSV checker", description: "Look for a missing SKU, a missing price, or a repeated Shopify handle in a product export." },
};

export default function CsvWorkbench({ mode }: { mode: CsvExtraMode }) {
  const [tables, setTables] = useState<{ name: string; rows: CsvRow[]; delimiter: CsvDelimiter }[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [chunkSize, setChunkSize] = useState("500");
  const [order, setOrder] = useState<number[]>([]);
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [column, setColumn] = useState("all");
  const [matchCase, setMatchCase] = useState(false);
  const [leftKey, setLeftKey] = useState("0");
  const [rightKey, setRightKey] = useState("0");

  const first = tables[0];
  const header = first?.rows[0];

  const output = useMemo(() => {
    if (!first) return [] as CsvRow[];
    if (mode === "columns") return reorderColumns(first.rows, order.length ? order : (header ?? []).map((_, index) => index));
    if (mode === "replace") return replaceCells(first.rows, find, replace, column === "all" ? "all" : Number(column), matchCase);
    if (mode === "join" && tables[1]) return joinByKey(first.rows, tables[1].rows, Number(leftKey), Number(rightKey));
    if (mode === "products") return checkProductCsv(first.rows).issues;
    return first.rows;
  }, [column, find, first, header, leftKey, matchCase, mode, order, replace, rightKey, tables]);

  async function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setError("");
    try {
      const parsed = await Promise.all(files.map(async (file) => ({ name: file.name, ...(await readTableFile(file)) })));
      if (parsed.some((file) => file.rows.length === 0)) {
        setError("One of the files has no rows.");
        return;
      }
      const next = mode === "join" ? [...tables, ...parsed].slice(0, 2) : parsed.slice(0, 1);
      setTables(next);
      setOrder((next[0]?.rows[0] ?? []).map((_, index) => index));
    } catch {
      setError("The file could not be read. Use a CSV or Excel file.");
    } finally {
      setBusy(false);
    }
  }

  function move(index: number, direction: -1 | 1) {
    setOrder((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const parts = mode === "split" && first ? splitRows(first.rows, Number(chunkSize) || 500) : [];

  return (
    <div className="csv-tool-layout">
      <section className="csv-tool-panel">
        <span className="badge">FREE CSV TOOL · FILES STAY ON YOUR DEVICE</span>
        <h1>{COPY[mode].title}</h1>
        <p className="csv-tool-intro">{COPY[mode].description}</p>
        <label className="csv-upload">
          <span>{busy ? "Reading your file…" : mode === "join" ? "Choose two files" : "Choose a CSV or Excel file"}</span>
          <small>CSV, Excel, or Windows-1252 text. Nothing is uploaded.</small>
          <input type="file" accept=".csv,text/csv,.xlsx,.xls" multiple={mode === "join"} onChange={onFiles} />
        </label>
        {error && <p className="csv-error" role="alert">{error}</p>}
        {first && <p className="csv-privacy-note">{first.name}: {Math.max(first.rows.length - 1, 0)} data rows</p>}
        {mode === "split" && <label>Rows per file<input inputMode="numeric" value={chunkSize} onChange={(event) => setChunkSize(event.target.value.replace(/[^\d]/g, ""))} /></label>}
        {mode === "columns" && (
          <div className="column-list">
            {(header ?? []).map((name, columnIndex) => {
              const position = order.indexOf(columnIndex);
              return (
                <div key={columnIndex}>
                  <label><input type="checkbox" checked={position >= 0} onChange={() => setOrder(position >= 0 ? order.filter((item) => item !== columnIndex) : [...order, columnIndex])} /> {name || `Column ${columnIndex + 1}`}</label>
                  <button type="button" className="secondary" onClick={() => move(position, -1)} disabled={position <= 0}>Up</button>
                  <button type="button" className="secondary" onClick={() => move(position, 1)} disabled={position < 0 || position === order.length - 1}>Down</button>
                </div>
              );
            })}
          </div>
        )}
        {mode === "replace" && (
          <div className="grid two">
            <label>Find<input value={find} onChange={(event) => setFind(event.target.value)} /></label>
            <label>Replace with<input value={replace} onChange={(event) => setReplace(event.target.value)} /></label>
            <label>Column
              <select value={column} onChange={(event) => setColumn(event.target.value)}>
                <option value="all">All columns</option>
                {(header ?? []).map((name, index) => <option key={name + index} value={index}>{name || `Column ${index + 1}`}</option>)}
              </select>
            </label>
            <label className="check-line"><input type="checkbox" checked={matchCase} onChange={(event) => setMatchCase(event.target.checked)} /> Match case</label>
          </div>
        )}
        {mode === "join" && tables.length === 2 && (
          <div className="grid two">
            <label>Key in {tables[0].name}
              <select value={leftKey} onChange={(event) => setLeftKey(event.target.value)}>{(tables[0].rows[0] ?? []).map((name, index) => <option key={index} value={index}>{name || `Column ${index + 1}`}</option>)}</select>
            </label>
            <label>Key in {tables[1].name}
              <select value={rightKey} onChange={(event) => setRightKey(event.target.value)}>{(tables[1].rows[0] ?? []).map((name, index) => <option key={index} value={index}>{name || `Column ${index + 1}`}</option>)}</select>
            </label>
          </div>
        )}
        {mode === "split" ? (
          <div className="profile-actions">
            {parts.map((part, index) => (
              <button key={index} type="button" className="secondary" onClick={() => { downloadCsv(csvName(first?.name || "split", `part-${index + 1}`), part, first?.delimiter); trackEvent("csv_download", { tool_name: mode }); }}>Download part {index + 1}</button>
            ))}
          </div>
        ) : first && (mode !== "join" || tables.length === 2) && (
          <div className="profile-actions">
            {(mode === "excel" || mode === "json" || mode === "columns" || mode === "replace" || mode === "join" || mode === "products") && (
              <button type="button" className="download" onClick={() => { downloadCsv(csvName(first.name, mode), output, first.delimiter); trackEvent("csv_download", { tool_name: mode }); }}>Download CSV</button>
            )}
            {mode === "excel" && <button type="button" className="secondary" onClick={() => { void downloadXlsx(first.name.replace(/\.(csv|xlsx|xls)$/i, "") + ".xlsx", first.rows); trackEvent("csv_download", { tool_name: mode }); }}>Download Excel</button>}
            {mode === "json" && <button type="button" className="secondary" onClick={() => { downloadJson(first.name.replace(/\.(csv|xlsx|xls)$/i, "") + ".json", first.rows); trackEvent("csv_download", { tool_name: mode }); }}>Download JSON</button>}
          </div>
        )}
      </section>
      <aside className="csv-preview-panel">
        <p>{mode === "products" ? `${Math.max(output.length - 1, 0)} issue${output.length === 2 ? "" : "s"}` : `${Math.max(output.length - 1, 0)} data rows in the result`}</p>
      </aside>
    </div>
  );
}
