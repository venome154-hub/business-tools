export type CsvRow = string[];

function detectDelimiter(text: string) {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const candidates = [",", ";", "\t"];
  const counts = new Map(candidates.map((delimiter) => [delimiter, 0]));
  let quoted = false;

  for (let index = 0; index < firstLine.length; index += 1) {
    const character = firstLine[index];
    if (character === '"') {
      if (quoted && firstLine[index + 1] === '"') index += 1;
      else quoted = !quoted;
    } else if (!quoted && counts.has(character)) {
      counts.set(character, (counts.get(character) ?? 0) + 1);
    }
  }

  return candidates.reduce((best, candidate) =>
    (counts.get(candidate) ?? 0) > (counts.get(best) ?? 0) ? candidate : best,
  ",");
}

export function parseCsv(input: string): CsvRow[] {
  const text = input.replace(/^\uFEFF/, "");
  if (!text) return [];

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

  return rows;
}

export function stringifyCsv(rows: CsvRow[]) {
  return rows
    .map((row) => row.map((value) => {
      const cell = String(value ?? "");
      return /[",\r\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell;
    }).join(","))
    .join("\r\n");
}

export function downloadCsv(filename: string, rows: CsvRow[]) {
  const blob = new Blob([`\uFEFF${stringifyCsv(rows)}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function isBlankRow(row: CsvRow) {
  return row.every((cell) => !cell.trim());
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
    const dataRows = rows.length > 1 ? rows.slice(1) : rows;
    const keep = rows[0].map((_, column) => dataRows.some((row) => Boolean(row[column]?.trim())));
    rows = rows.map((row) => row.filter((_, column) => keep[column]));
  }
  if (options.removeDuplicateRows && rows.length > 1) {
    const header = rows[0];
    const seen = new Set<string>();
    const data = rows.slice(1).filter((row) => {
      const key = JSON.stringify(row);
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
      const key = column.trim().toLocaleLowerCase();
      if (key && !columnNames.has(key)) columnNames.set(key, column);
    }
  }
  const keys = [...columnNames.keys()];
  const output: CsvRow[] = [[...columnNames.values()]];
  for (const rows of files) {
    const headers = uniqueColumnNames(rows[0] ?? []);
    const sourceKeys = headers.map((header) => header.trim().toLocaleLowerCase());
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
  if (rows.length < 2) {
    return { rows: [] as CsvRow[], summary: [] as CsvRow[], duplicates: [] as { sku: string; count: number }[], blankSkus: 0 };
  }
  const skuRows = new Map<string, { label: string; rows: CsvRow[] }>();
  let blankSkus = 0;
  for (const row of rows.slice(1)) {
    const original = row[column] ?? "";
    const key = normalize ? original.trim().toLocaleLowerCase() : original;
    if (!key.trim()) {
      blankSkus += 1;
      continue;
    }
    const found = skuRows.get(key);
    if (found) found.rows.push(row);
    else skuRows.set(key, { label: original.trim(), rows: [row] });
  }
  const duplicateEntries = [...skuRows.values()].filter((entry) => entry.rows.length > 1);
  return {
    rows: [headers, ...duplicateEntries.flatMap((entry) => entry.rows)],
    summary: [[headers[column] || "SKU", "Occurrences"], ...duplicateEntries.map((entry) => [entry.label, String(entry.rows.length)])],
    duplicates: duplicateEntries.map((entry) => ({ sku: entry.label, count: entry.rows.length })),
    blankSkus,
  };
}
