import { parseCsv, stringifyCsv, type CsvRow } from "@/lib/csv";

export async function readTableFile(file: File) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
    const XLSX = await import("xlsx");
    const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<CsvRow>(sheet, { header: 1, raw: false, defval: "" });
    return { rows: rows.map((row) => (Array.isArray(row) ? row : []).map((cell) => String(cell ?? ""))), delimiter: "," as const };
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    text = new TextDecoder("windows-1252").decode(bytes);
  }
  return parseCsv(text);
}

export async function downloadXlsx(filename: string, rows: CsvRow[]) {
  const XLSX = await import("xlsx");
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(rows), "Sheet1");
  XLSX.writeFile(book, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}

export function rowsToJson(rows: CsvRow[]) {
  const [header = [], ...data] = rows;
  return data.filter((row) => row.some((cell) => cell.trim())).map((row) => {
    const record: Record<string, string> = {};
    header.forEach((name, index) => { record[name || `column_${index + 1}`] = row[index] ?? ""; });
    return record;
  });
}

export function downloadJson(filename: string, rows: CsvRow[]) {
  const blob = new Blob([JSON.stringify(rowsToJson(rows), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".json") ? filename : `${filename}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function splitRows(rows: CsvRow[], size: number) {
  const header = rows[0] ?? [];
  const data = rows.slice(1);
  const chunks: CsvRow[][] = [];
  const step = Math.max(1, Math.floor(size));
  for (let index = 0; index < data.length; index += step) chunks.push([header, ...data.slice(index, index + step)]);
  return chunks;
}

export function reorderColumns(rows: CsvRow[], order: number[]) {
  return rows.map((row) => order.map((index) => row[index] ?? ""));
}

export function replaceCells(rows: CsvRow[], find: string, replace: string, column: number | "all", matchCase: boolean) {
  const needle = matchCase ? find : find.toLowerCase();
  return rows.map((row, rowIndex) => row.map((cell, index) => {
    if (rowIndex === 0 || (column !== "all" && index !== column) || !find) return cell;
    const haystack = matchCase ? cell : cell.toLowerCase();
    if (!haystack.includes(needle)) return cell;
    return matchCase ? cell.split(find).join(replace) : cell.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), replace);
  }));
}

export function joinByKey(left: CsvRow[], right: CsvRow[], leftKey: number, rightKey: number) {
  const leftHeader = left[0] ?? [];
  const rightHeader = right[0] ?? [];
  const extra = rightHeader.map((name, index) => ({ name, index })).filter((column) => column.index !== rightKey);
  const lookup = new Map<string, CsvRow>();
  right.slice(1).forEach((row) => lookup.set((row[rightKey] ?? "").trim().toLowerCase(), row));
  const header = [...leftHeader, ...extra.map((column) => column.name || `column_${column.index + 1}`)];
  const rows = left.slice(1).map((row) => {
    const match = lookup.get((row[leftKey] ?? "").trim().toLowerCase());
    return [...leftHeader.map((_, index) => row[index] ?? ""), ...extra.map((column) => match?.[column.index] ?? "")];
  });
  return [header, ...rows];
}

export function checkProductCsv(rows: CsvRow[]) {
  const header = (rows[0] ?? []).map((cell) => cell.trim().toLowerCase());
  const indexOf = (...names: string[]) => header.findIndex((cell) => names.includes(cell));
  const sku = indexOf("variant sku", "sku");
  const price = indexOf("variant price", "regular price", "price");
  const handle = indexOf("handle");
  const issues: CsvRow[] = [["row", "issue", "value"]];
  const seenHandles = new Map<string, number>();
  rows.slice(1).forEach((row, index) => {
    const rowNumber = String(index + 2);
    if (sku >= 0 && !(row[sku] ?? "").trim()) issues.push([rowNumber, "Missing SKU", ""]);
    if (price >= 0 && !(row[price] ?? "").trim()) issues.push([rowNumber, "Missing price", ""]);
    if (handle >= 0) {
      const value = (row[handle] ?? "").trim().toLowerCase();
      if (value) {
        const first = seenHandles.get(value);
        if (first) issues.push([rowNumber, "Duplicate handle", `${value} (also row ${first})`]);
        else seenHandles.set(value, index + 2);
      }
    }
  });
  if (sku < 0) issues.push(["header", "Missing SKU column", "Expected SKU or Variant SKU"]);
  if (price < 0) issues.push(["header", "Missing price column", "Expected Price, Variant Price, or Regular price"]);
  return { issues, sku, price, handle };
}

export function csvName(filename: string, suffix: string) {
  return `${filename.replace(/\.(csv|xlsx|xls)$/i, "")}-${suffix}.csv`;
}

export { stringifyCsv };
