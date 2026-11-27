import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { updatedAt } from "../content/updated-at.ts";
import { lastModifiedFor } from "../lib/sitemap-dates.ts";

test("lastmod values come from the page, not one clock stamp", () => {
  const counts = new Map<string, number>();
  for (const date of Object.values(updatedAt)) counts.set(date, (counts.get(date) ?? 0) + 1);
  const total = Object.keys(updatedAt).length;
  const top = Math.max(...counts.values());
  assert.ok(counts.size >= 3, `only ${counts.size} distinct dates`);
  assert.equal(updatedAt["/guides/invoice-vs-quote"], "2026-10-08");
  assert.equal(updatedAt["/guides/how-to-write-an-invoice"], "2026-10-08");
  assert.ok(updatedAt["/csv-cleaner"] < "2026-11-26");
  assert.ok(top / total <= 0.9, `${top} of ${total} share one lastmod`);
  assert.ok(top < total, "every URL shares one lastmod");
});

test("sitemap code does not clock lastmod", () => {
  const source = [fs.readFileSync("app/sitemap.ts", "utf8"), fs.readFileSync("lib/sitemap-dates.ts", "utf8"), fs.readFileSync("content/updated-at.ts", "utf8")].join("\n");
  assert.doesNotMatch(source, /new Date\s*\(/);
  assert.doesNotMatch(source, /Date\.now\s*\(/);
});

test("search console verification tags are omitted when unset", () => {
  const layout = fs.readFileSync("app/layout.tsx", "utf8");
  assert.match(layout, /process\.env\.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \|\| undefined/);
  assert.match(layout, /process\.env\.NEXT_PUBLIC_BING_SITE_VERIFICATION/);
  assert.match(layout, /"msvalidate\.01"/);
});

test("no lastmod is in the future", () => {
  const today = new Date().toISOString().slice(0, 10);
  for (const [path, date] of Object.entries(updatedAt)) {
    assert.match(date, /^\d{4}-\d{2}-\d{2}$/, path);
    assert.ok(date <= today, `${path} ${date}`);
  }
});

test("a route without a date omits lastmod and warns", () => {
  const warnings: string[] = [];
  assert.equal(lastModifiedFor("/missing", updatedAt, (message) => warnings.push(message)), undefined);
  assert.equal(warnings.length, 1);
});

test("my-documents is out of the sitemap and is not disallowed", () => {
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  const robots = fs.readFileSync("app/robots.ts", "utf8");
  const page = fs.readFileSync("app/(site)/my-documents/page.tsx", "utf8");
  assert.equal(Object.hasOwn(updatedAt, "/my-documents"), false);
  assert.doesNotMatch(sitemap, /my-documents/);
  assert.match(robots, /disallow:\s*"\/embed"/);
  assert.doesNotMatch(robots, /my-documents/);
  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*true/);
});
