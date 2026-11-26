import assert from "node:assert/strict";
import test from "node:test";
import { estimateArticleText, estimateSlugs, estimateTrades, getEstimate } from "../content/estimates.ts";
import { getIndustry } from "../content/industries.ts";
import { ESTIMATE_TRADE_SLUGS_FOR_TEST } from "../lib/related.ts";

const sharedEditor = [
  "Business or name", "Business email", "Name", "Email", "Address", "Valid until",
  "Number and date format", "Template", "Page size", "Accent color", "Logo",
  "Line items", "Description", "Qty", "Amount", "Add item", "Tax", "Discount",
  "Notes", "Save on this device", "Download PDF", "Download Word", "Download Excel",
  "Made with BizToolsBox on the download", "Subtotal", "Total", "Prepared for",
].join(" ");

function titled(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function words(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
}

function shingles(text: string) {
  const tokens = words(text);
  const grams = new Set<string>();
  for (let index = 0; index < tokens.length - 2; index += 1) {
    grams.add(`${tokens[index]} ${tokens[index + 1]} ${tokens[index + 2]}`);
  }
  return grams;
}

function quoteMain(slug: string) {
  const industry = getIndustry(slug);
  assert.ok(industry);
  const related = industry.related.map((item) => `${titled(getIndustry(item)?.name ?? item)} quote template`);
  return [
    `${titled(industry.name)} quote template`,
    industry.quoteIntro,
    "This estimate is not an invoice. It proposes the scope and the price before the work is billed. The sample lines are a draft you can edit.",
    "While the scope can still move, use the range page for this trade.",
    `Questions about ${industry.name} quotes`,
    ...industry.quoteFaqs.flatMap((faq) => [faq.question, faq.answer]),
    ...related,
    `Invoice template for a ${industry.name}`,
    "Quote generator",
    "Invoice generator",
    ...industry.items.flatMap((item) => [item.description, item.quantity, item.price]),
    "A quote is an estimate for approval. It does not request payment.",
    "Turn this quote into an invoice",
    "Terms and conditions",
    "Accepted by",
    sharedEditor,
  ].join(" ");
}

function estimateMain(slug: string) {
  const trade = getEstimate(slug);
  const industry = getIndustry(slug);
  assert.ok(trade && industry);
  return [
    estimateArticleText(industry.name, trade),
    `${titled(industry.name)} quote template`,
    "Convert to quote",
    "Convert to invoice",
    "Low price",
    "High price",
    "Assumptions and exclusions",
    sharedEditor,
  ].join(" ");
}

test("estimate trade pages share under half of their 3-word sequences with the quote page", () => {
  for (const slug of estimateSlugs) {
    const estimate = shingles(estimateMain(slug));
    const quote = shingles(quoteMain(slug));
    let shared = 0;
    for (const gram of estimate) if (quote.has(gram)) shared += 1;
    const ratio = shared / estimate.size;
    assert.ok(ratio < 0.5, `${slug} shares ${(ratio * 100).toFixed(1)}% of 3-word sequences with /quote-template/${slug}`);
  }
});

test("shipped estimate slugs match the quote-page links", () => {
  assert.deepEqual([...estimateSlugs].sort(), [...ESTIMATE_TRADE_SLUGS_FOR_TEST].sort());
  for (const trade of estimateTrades) {
    assert.ok(trade.description.length >= 140 && trade.description.length <= 160, `${trade.slug} description is ${trade.description.length}`);
  }
});
