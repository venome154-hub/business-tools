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

function excelCell(header: string, value: string): string | number {
  const name = header.trim().toLowerCase();
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (name.includes("sku") || name === "id" || name.endsWith(" id") || name === "handle") return value;
  if (/^0\d+$/.test(trimmed)) return value;
  const digits = trimmed.replace(/^[+-]/, "").split(".")[0] ?? "";
  if (/^\d+$/.test(digits) && digits.length > 15) return value;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return value;
}

export async function downloadXlsx(filename: string, rows: CsvRow[]) {
  const XLSX = await import("xlsx");
  const header = rows[0] ?? [];
  const data = rows.map((row, rowIndex) => (
    rowIndex === 0 ? row : row.map((cell, index) => excelCell(header[index] ?? "", cell ?? ""))
  ));
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(data), "Sheet1");
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

function numericPrice(value: string) {
  return /^-?\d+(\.\d+)?$/.test(value.trim());
}

export function checkProductCsv(rows: CsvRow[]) {
  const header = (rows[0] ?? []).map((cell) => cell.trim().toLowerCase());
  const indexOf = (...names: string[]) => header.findIndex((cell) => names.includes(cell));
  const sku = indexOf("variant sku", "sku");
  const price = indexOf("variant price", "regular price", "price");
  const handle = indexOf("handle");
  const title = indexOf("title");
  const options = ["option1 value", "option2 value", "option3 value"].map((name) => indexOf(name)).filter((index) => index >= 0);
  const issues: CsvRow[] = [["row", "issue", "value"]];
  const skuRows = new Map<string, number[]>();
  const handles = new Map<string, { rows: number[]; titled: number[]; options: string[] }>();

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const skuValue = sku >= 0 ? (row[sku] ?? "").trim() : "";
    const priceValue = price >= 0 ? (row[price] ?? "").trim() : "";
    if (sku >= 0 && !skuValue) issues.push([String(rowNumber), "Missing SKU", ""]);
    if (price >= 0 && !priceValue) issues.push([String(rowNumber), "Missing price", ""]);
    else if (price >= 0 && priceValue && !numericPrice(priceValue)) issues.push([String(rowNumber), "Invalid price", priceValue]);
    if (skuValue) {
      const key = skuValue.toLowerCase();
      skuRows.set(key, [...(skuRows.get(key) ?? []), rowNumber]);
    }
    if (handle >= 0) {
      const value = (row[handle] ?? "").trim().toLowerCase();
      if (!value) return;
      const group = handles.get(value) ?? { rows: [], titled: [], options: [] };
      group.rows.push(rowNumber);
      if (title >= 0 && (row[title] ?? "").trim()) group.titled.push(rowNumber);
      if (options.length) group.options.push(options.map((column) => (row[column] ?? "").trim().toLowerCase()).join("|"));
      handles.set(value, group);
    }
  });

  skuRows.forEach((rowNumbers, key) => {
    if (rowNumbers.length < 2) return;
    const sample = rows[rowNumbers[0] - 1]?.[sku] ?? key;
    const listed = rowNumbers.join(rowNumbers.length === 2 ? " and " : ", ");
    issues.push([rowNumbers.join(", "), "Duplicate SKU", `${String(sample).trim()} (rows ${listed})`]);
  });

  handles.forEach((group, value) => {
    if (group.rows.length < 2) return;
    const sameOptions = group.options.length >= 2 && group.options.every((option) => option && option === group.options[0]);
    if (group.titled.length > 1) {
      const listed = group.titled.join(group.titled.length === 2 ? " and " : ", ");
      issues.push([group.titled.join(", "), "Possible duplicate product", `${value} (rows ${listed}): more than one row has a title. Variant rows usually leave Title empty.`]);
    } else if (sameOptions) {
      issues.push([group.rows.join(", "), "Possible duplicate product", `${value} (rows ${group.rows.join(" and ")}): option values are identical.`]);
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
