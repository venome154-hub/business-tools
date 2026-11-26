import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { updatedAt } from "../content/updated-at.ts";
import { lastModifiedFor } from "../lib/sitemap-dates.ts";

test("sitemap code does not clock lastmod", () => {
  const source = [fs.readFileSync("app/sitemap.ts", "utf8"), fs.readFileSync("lib/sitemap-dates.ts", "utf8"), fs.readFileSync("content/updated-at.ts", "utf8")].join("\n");
  assert.doesNotMatch(source, /new Date\s*\(/);
  assert.doesNotMatch(source, /Date\.now\s*\(/);
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
  const page = fs.readFileSync("app/my-documents/page.tsx", "utf8");
  assert.equal(Object.hasOwn(updatedAt, "/my-documents"), false);
  assert.doesNotMatch(sitemap, /my-documents/);
  assert.match(robots, /disallow:\s*"\/embed"/);
  assert.doesNotMatch(robots, /my-documents/);
  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*true/);
});
