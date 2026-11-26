import fs from "node:fs";
import { articles } from "../content/articles.ts";
import { countryDescription, invoiceCountries } from "../content/countries.ts";
import { industries } from "../content/industries.ts";
import { receiptTypes } from "../content/receipt-types.ts";
import { updatedAt } from "../content/updated-at.ts";
import { titled } from "../lib/site.ts";

function unescape(value: string) {
  return JSON.parse(`"${value}"`) as string;
}

function readMeta(file: string) {
  const text = fs.readFileSync(file, "utf8");
  const description = text.match(/description:\s*"((?:\\.|[^"\\])*)"/);
  const absolute = text.match(/absolute:\s*"((?:\\.|[^"\\])*)"/);
  const title = text.match(/title:\s*"((?:\\.|[^"\\])*)"/);
  return {
    description: description ? unescape(description[1]) : "",
    title: absolute ? unescape(absolute[1]) : title ? unescape(title[1]) : "",
  };
}

function metaFor(path: string) {
  const article = articles.find((item) => path === `/guides/${item.slug}`);
  if (article) return { title: article.title, description: article.description };
  const industry = path.match(/^\/(invoice|quote)-template\/([^/]+)$/);
  if (industry) {
    const item = industries.find((entry) => entry.slug === industry[2]);
    if (!item) return { title: "", description: "" };
    const intro = industry[1] === "invoice" ? item.invoiceIntro : item.quoteIntro;
    return { title: `${titled(item.name)} ${industry[1]} template`, description: intro.slice(0, 155) };
  }
  const receipt = path.match(/^\/receipt-template\/([^/]+)$/);
  if (receipt && receipt[1] !== undefined && !fs.existsSync(`app${path}/page.tsx`)) {
    const item = receiptTypes.find((entry) => entry.slug === receipt[1]);
    if (!item) return { title: "", description: "" };
    return { title: `${titled(item.name)} receipt template`, description: item.intro.slice(0, 155) };
  }
  const country = path.match(/^\/invoice-requirements\/([^/]+)$/);
  if (country && !fs.existsSync(`app${path}/page.tsx`)) {
    const item = invoiceCountries.find((entry) => entry.slug === country[1]);
    if (!item) return { title: "", description: "" };
    return { title: `Common invoice fields for ${item.name}`, description: countryDescription(item.name) };
  }
  const file = path === "/" ? "app/page.tsx" : `app${path}/page.tsx`;
  return readMeta(file);
}

const problems: string[] = [];
const titles = new Map<string, string>();
for (const path of Object.keys(updatedAt)) {
  const meta = metaFor(path);
  const length = meta.description.length;
  if (length < 120 || length > 160) problems.push(`${path} description is ${length} characters`);
  if (!meta.title) problems.push(`${path} has no title`);
  const previous = titles.get(meta.title);
  if (previous) problems.push(`title "${meta.title}" is used by ${previous} and ${path}`);
  else titles.set(meta.title, path);
}

const refund = readMeta("app/refund-policy/page.tsx").description;
if (refund.length < 140 || refund.length > 160) problems.push(`/refund-policy description is ${refund.length} characters`);

if (problems.length) {
  for (const problem of problems) console.error(problem);
  process.exit(1);
}
console.log(`seo:check ok (${Object.keys(updatedAt).length} indexable URLs)`);
