import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { formatPageCopy, formatPages } from "../content/format-pages.ts";
import { updatedAt } from "../content/updated-at.ts";
import { RESERVED_TEMPLATE_SLUGS } from "../lib/reserved-slugs.ts";

function slugs(file: string) {
  return [...fs.readFileSync(file, "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1] ?? "");
}

test("reserved format slugs do not collide with a trade or receipt type", () => {
  const used = new Set([...slugs("content/industries.ts"), ...slugs("content/receipt-types.ts")]);
  const hits = RESERVED_TEMPLATE_SLUGS.filter((slug) => used.has(slug));
  assert.deepEqual(hits, [], `reserved slugs already used: ${hits.join(", ")}`);
  assert.ok(RESERVED_TEMPLATE_SLUGS.includes("google-sheets"));
});

test("format pages have unique copy, sitemap dates, and descriptions in range", () => {
  assert.equal(formatPages.length, 12);
  const bodies = new Set<string>();
  const titles = new Set<string>();
  for (const page of formatPages) {
    assert.equal(updatedAt[page.path], "2026-11-26", page.path);
    assert.ok(page.description.length >= 140 && page.description.length <= 160, `${page.path} description is ${page.description.length}`);
    const words = formatPageCopy(page).trim().split(/\s+/).length;
    assert.ok(words >= 400 && words <= 700, `${page.path} has ${words} words`);
    assert.equal(bodies.has(formatPageCopy(page)), false, page.path);
    bodies.add(formatPageCopy(page));
    assert.equal(titles.has(page.title), false, page.title);
    titles.add(page.title);
    assert.ok(page.faqs.length >= 4 && page.faqs.length <= 6, page.path);
    assert.equal(fs.existsSync(`app/(site)${page.path}/page.tsx`) || fs.existsSync(`app${page.path}/page.tsx`), true, page.path);
  }
  assert.match(fs.readFileSync("lib/site.ts", "utf8"), /export const GOOGLE_DOCS_COPY_URL = ""/);
});

test("blank templates exist and the download control does not post the form", async () => {
  for (const name of ["invoice", "quote", "receipt"]) {
    for (const ext of ["docx", "xlsx", "pdf"]) {
      const file = `public/templates/${name}-blank.${ext}`;
      const size = fs.statSync(file).size;
      assert.ok(size > 500, `${file} is ${size} bytes`);
      const bytes = fs.readFileSync(file);
      if (ext === "pdf") {
        assert.equal(bytes.subarray(0, 4).toString(), "%PDF");
        if (name === "receipt") assert.equal(bytes.includes(Buffer.from("Unit amount")), true, file);
      } else assert.equal(bytes[0], 0x50);
      if (name === "receipt" && ext === "docx") {
        const JSZip = (await import("jszip")).default;
        const zip = await JSZip.loadAsync(bytes);
        const xml = await zip.file("word/document.xml")?.async("string");
        assert.match(xml ?? "", /Unit amount/);
        assert.match(xml ?? "", />Qty</);
      }
      if (name === "receipt" && ext === "xlsx") {
        const ExcelJS = (await import("exceljs")).default;
        const book = new ExcelJS.Workbook();
        await book.xlsx.load(bytes);
        const values: string[] = [];
        book.eachSheet((sheet) => sheet.eachRow((row) => row.eachCell((cell) => values.push(String(cell.value ?? "")))));
        assert.ok(values.includes("Unit amount"), file);
        assert.ok(values.includes("Qty"), file);
      }
    }
  }
  const button = fs.readFileSync("components/BlankTemplateButton.tsx", "utf8");
  assert.match(button, /fetch\(href\)/);
  assert.doesNotMatch(button, /method:\s*["']POST["']/);
  assert.doesNotMatch(button, /JSON\.stringify/);
});
