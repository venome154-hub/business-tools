import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { buildEmbedSnippet } from "../lib/embed-snippet.ts";

test("buildEmbedSnippet adds a followed attribution link", () => {
  const snippet = buildEmbedSnippet("sales-tax", "Sales tax calculator", "/sales-tax-calculator", "https://www.biztoolsbox.online");
  assert.equal(snippet, `<iframe src="https://www.biztoolsbox.online/embed/sales-tax" title="Sales tax calculator" loading="lazy" style="width:100%;max-width:480px;height:460px;border:0"></iframe>
<p style="font-size:13px;margin:4px 0 0">
  <a href="https://www.biztoolsbox.online/sales-tax-calculator">Sales tax calculator</a> by BizToolsBox
</p>`);
  assert.equal(snippet.includes("rel="), false);
  const page = fs.readFileSync("app/embed/[tool]/page.tsx", "utf8");
  const config = fs.readFileSync("next.config.ts", "utf8");
  assert.match(page, /Powered by BizToolsBox/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noopener"/);
  assert.match(page, /index:\s*false/);
  assert.match(config, /X-Robots-Tag/);
});
