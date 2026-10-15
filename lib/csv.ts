export type CsvRow = string[];
export type CsvDelimiter = "," | ";" | "\t";

export type ParsedCsv = {
  rows: CsvRow[];
  delimiter: CsvDelimiter;
};

const DELIMITERS: CsvDelimiter[] = [",", ";", "\t"];

function detectDelimiter(text: string): CsvDelimiter {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const counts = new Map(DELIMITERS.map((delimiter) => [delimiter, 0]));
  let quoted = false;

  for (let index = 0; index < firstLine.length; index += 1) {
    const character = firstLine[index];
    if (character === '"') {
      if (quoted && firstLine[index + 1] === '"') index += 1;
      else quoted = !quoted;
    } else if (!quoted && counts.has(character as CsvDelimiter)) {
      const delimiter = character as CsvDelimiter;
      counts.set(delimiter, (counts.get(delimiter) ?? 0) + 1);
    }
  }

  return DELIMITERS.reduce((best, candidate) =>
    (counts.get(candidate) ?? 0) > (counts.get(best) ?? 0) ? candidate : best,
  ",");
}

export function parseCsv(input: string): ParsedCsv {
  const text = input.replace(/^\uFEFF/, "");
  if (!text) return { rows: [], delimiter: "," };

  const delimiter = detectDelimiter(text);
  const rows: CsvRow[] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (!quoted && character === delimiter) {
      row.push(cell);
      cell = "";
    } else if (!quoted && (character === "\n" || character === "\r")) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (character === "\r" && text[index + 1] === "\n") index += 1;
    } else {
      cell += character;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return { rows, delimiter };
}

function cellNeedsQuotes(cell: string, delimiter: CsvDelimiter) {
  return cell.includes(delimiter) || cell.includes('"') || cell.includes("\n") || cell.includes("\r");
}

export function stringifyCsv(rows: CsvRow[], delimiter: CsvDelimiter = ",") {
  return rows
    .map((row) => row.map((value) => {
      const cell = String(value ?? "");
      return cellNeedsQuotes(cell, delimiter) ? `"${cell.replace(/"/g, '""')}"` : cell;
    }).join(delimiter))
    .join("\r\n");
}

export function preferredDelimiter(delimiters: CsvDelimiter[]): CsvDelimiter {
  if (delimiters.length === 0) return ",";
  const counts = new Map<CsvDelimiter, number>();
  for (const delimiter of delimiters) counts.set(delimiter, (counts.get(delimiter) ?? 0) + 1);
  return [...counts.entries()].sort((left, right) =>
    right[1] - left[1] || delimiters.indexOf(left[0]) - delimiters.indexOf(right[0]),
  )[0][0];
}

export function downloadCsv(filename: string, rows: CsvRow[], delimiter: CsvDelimiter = ",") {
  const blob = new Blob([`\uFEFF${stringifyCsv(rows, delimiter)}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function isBlankRow(row: CsvRow) {
  return row.every((cell) => !cell.trim());
}

function duplicateKey(row: CsvRow) {
  let end = row.length;
  while (end > 0 && !(row[end - 1] ?? "").trim()) end -= 1;
  return JSON.stringify(row.slice(0, end));
}

export function uniqueColumnNames(headers: string[]) {
  const seen = new Map<string, number>();
  return headers.map((header) => {
    const name = header.trim() || "Untitled column";
    const count = (seen.get(name.toLowerCase()) ?? 0) + 1;
    seen.set(name.toLowerCase(), count);
    return count === 1 ? name : `${name} (${count})`;
  });
}

export function cleanCsvRows(
  inputRows: CsvRow[],
  options: { trimSpaces: boolean; removeBlankRows: boolean; removeEmptyColumns: boolean; removeDuplicateRows: boolean },
) {
  let rows = inputRows.map((row) => row.map((cell) => options.trimSpaces ? cell.trim() : cell));
  if (options.removeBlankRows) rows = rows.filter((row) => !isBlankRow(row));
  if (options.removeEmptyColumns && rows.length > 0) {
    const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
    const keep = Array.from({ length: width }, (_, column) => rows.some((row) => Boolean(row[column]?.trim())));
    rows = rows.map((row) => keep.flatMap((shouldKeep, column) => shouldKeep ? [row[column] ?? ""] : []));
  }
  if (options.removeDuplicateRows && rows.length > 1) {
    const header = rows[0];
    const seen = new Set<string>();
    const data = rows.slice(1).filter((row) => {
      const key = duplicateKey(row);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    rows = [header, ...data];
  }
  return rows;
}

export function mergeCsvFiles(files: CsvRow[][]) {
  if (files.length === 0) return [] as CsvRow[];
  const columnNames = new Map<string, string>();
  for (const rows of files) {
    for (const column of uniqueColumnNames(rows[0] ?? [])) {
      const key = column.trim().toLowerCase();
      if (key && !columnNames.has(key)) columnNames.set(key, column);
    }
  }
  const keys = [...columnNames.keys()];
  const output: CsvRow[] = [[...columnNames.values()]];
  for (const rows of files) {
    const headers = uniqueColumnNames(rows[0] ?? []);
    const sourceKeys = headers.map((header) => header.trim().toLowerCase());
    for (const row of rows.slice(1)) {
      if (isBlankRow(row)) continue;
      const values = new Map(sourceKeys.map((key, index) => [key, row[index] ?? ""]));
      output.push(keys.map((key) => values.get(key) ?? ""));
    }
  }
  return output;
}

export function findDuplicateSkus(rows: CsvRow[], column: number, normalize: boolean) {
  const headers = rows[0] ?? [];
  const empty = { rows: [] as CsvRow[], summary: [] as CsvRow[], duplicates: [] as { id: string; sku: string; count: number }[], blankSkus: 0 };
  if (rows.length < 2) return empty;

  const skuRows = new Map<string, { id: string; label: string; rows: CsvRow[] }>();
  let blankSkus = 0;
  for (const row of rows.slice(1)) {
    const original = row[column] ?? "";
    const key = normalize ? original.trim().toLowerCase() : original;
    if (!original.trim()) {
      blankSkus += 1;
      continue;
    }
    const found = skuRows.get(key);
    if (found) found.rows.push(row);
    else skuRows.set(key, { id: key, label: normalize ? original.trim() : original, rows: [row] });
  }

  const duplicateEntries = [...skuRows.values()].filter((entry) => entry.rows.length > 1);
  return {
    rows: [headers, ...duplicateEntries.flatMap((entry) => entry.rows)],
    summary: [[headers[column] || "SKU", "Occurrences"], ...duplicateEntries.map((entry) => [entry.label, String(entry.rows.length)])],
    duplicates: duplicateEntries.map((entry) => ({ id: entry.id, sku: entry.label, count: entry.rows.length })),
    blankSkus,
  };
}
