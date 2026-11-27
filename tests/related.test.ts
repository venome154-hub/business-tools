import assert from "node:assert/strict";
import test from "node:test";
import { estimateMetaTitle } from "../content/estimates.ts";
import { updatedAt } from "../content/updated-at.ts";
import { guideGroups, guidePaths, linksFor, toolPaths, type RelatedBlock } from "../lib/related.ts";

const known = new Set(Object.keys(updatedAt));

function hrefs(block: RelatedBlock) {
  return [...block.guides, ...block.tools, ...block.templates, ...block.moreCsv].map((item) => item.href);
}

test("related paths exist and never point at the current page", () => {
  for (const path of known) {
    const block = linksFor(path);
    if (!block) continue;
    for (const href of hrefs(block)) {
      assert.notEqual(href, path, `${path} links to itself`);
      assert.ok(known.has(href), `${path} links to missing ${href}`);
    }
  }
});

test("every tool links to a guide and three tools, and every guide links onward", () => {
  for (const path of toolPaths) {
    const block = linksFor(path);
    assert.ok(block, path);
    assert.ok(block.guides.length >= 1, `${path} needs a guide`);
    assert.ok(block.tools.length + block.moreCsv.length >= 3, `${path} needs 3 tools`);
    assert.ok(known.has(path), path);
  }
  for (const path of guidePaths) {
    const block = linksFor(path);
    assert.ok(block, path);
    assert.ok(block.tools.length >= 1, `${path} needs a tool`);
    assert.ok(block.guides.length >= 2, `${path} needs 2 guides`);
    assert.ok(known.has(path), path);
  }
});

test("minimum tool and guide pairs are linked both ways", () => {
  const has = (path: string, href: string) => {
    const block = linksFor(path);
    assert.ok(block, path);
    assert.ok(hrefs(block).includes(href), `${path} should link to ${href}`);
  };
  const pairs: [string, string][] = [
    ["/sales-tax-calculator", "/guides/adding-or-removing-sales-tax"],
    ["/profit-margin-calculator", "/guides/profit-margin-and-markup"],
    ["/markup-calculator", "/guides/profit-margin-and-markup"],
    ["/profit-margin-calculator", "/markup-calculator"],
    ["/freelance-rate-calculator", "/guides/setting-a-freelance-hourly-rate"],
    ["/freelance-rate-calculator", "/timesheet-invoice"],
    ["/late-fee-calculator", "/guides/late-fees-on-an-invoice"],
    ["/late-fee-calculator", "/payment-reminder-generator"],
    ["/late-fee-calculator", "/guides/how-to-write-a-late-payment-email"],
    ["/invoice-due-date-calculator", "/guides/what-net-30-means"],
    ["/csv-merger", "/guides/merging-csv-files"],
    ["/csv-merger", "/csv-join"],
    ["/duplicate-sku-finder", "/guides/finding-duplicate-skus"],
    ["/duplicate-sku-finder", "/guides/how-to-clean-a-shopify-product-csv"],
    ["/product-csv-checker", "/guides/finding-duplicate-skus"],
    ["/product-csv-checker", "/guides/how-to-clean-a-shopify-product-csv"],
    ["/receipt-generator", "/guides/how-to-write-a-receipt"],
    ["/receipt-generator", "/guides/partial-payments-on-a-receipt"],
    ["/receipt-generator", "/receipt-template"],
    ["/rent-receipt", "/guides/how-to-write-a-receipt"],
    ["/donation-receipt", "/guides/how-to-write-a-receipt"],
    ["/purchase-order", "/guides/purchase-order-basics"],
    ["/credit-note", "/guides/credit-note-or-refund"],
    ["/delivery-note", "/guides/delivery-note-and-packing-slip"],
    ["/timesheet-invoice", "/guides/billing-hours-on-a-timesheet-invoice"],
    ["/quote-generator", "/guides/what-belongs-on-a-quote"],
    ["/quote-generator", "/guides/quote-vs-estimate-vs-proposal"],
    ["/quote-generator", "/quote-template"],
    ["/invoice-generator", "/guides/how-to-write-an-invoice"],
    ["/invoice-generator", "/guides/how-invoice-numbers-work"],
    ["/invoice-generator", "/invoice-template"],
    ["/invoice-generator", "/invoice-requirements"],
  ];
  for (const [left, right] of pairs) {
    has(left, right);
    has(right, left);
  }
  has("/guides/setting-a-freelance-hourly-rate", "/break-even-calculator");
  has("/guides/setting-a-freelance-hourly-rate", "/discount-calculator");
  has("/guides/setting-a-freelance-hourly-rate", "/markup-calculator");
  has("/guides/profit-margin-and-markup", "/break-even-calculator");
  has("/guides/profit-margin-and-markup", "/discount-calculator");
  has("/guides/merging-csv-files", "/csv-columns");
  has("/guides/how-to-clean-a-shopify-product-csv", "/csv-excel");
  has("/receipt-template/rent-payment", "/rent-receipt");
  has("/receipt-template/security-deposit", "/donation-receipt");
  has("/receipt-template/rent-payment", "/receipt-template");
  has("/invoice-requirements/united-states", "/invoice-requirements");
  has("/invoice-template/plumber", "/quote-template/plumber");
  has("/quote-template/plumber", "/invoice-template/plumber");
  has("/invoice-template/plumber", "/invoice-generator");
  has("/quote-template/plumber", "/quote-generator");
});

test("estimate titles use title case for each word of the trade", () => {
  assert.equal(estimateMetaTitle("dog walker"), "Free Dog Walker Estimate Template — PDF, Word & Excel");
  assert.equal(estimateMetaTitle("social media manager"), "Free Social Media Manager Estimate Template — PDF, Word & Excel");
});

test("guide topics cover each guide once", () => {
  const slugs = guideGroups.flatMap((group) => group.slugs);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual([...slugs].map((slug) => `/guides/${slug}`).sort(), [...guidePaths].sort());
});
