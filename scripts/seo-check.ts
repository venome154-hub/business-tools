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

const routes = Object.keys(updatedAt);
const htmlFor = new Map<string, string>();
for (const route of routes) {
  const suffix = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const candidates = [
    `.next/server/app/${suffix}`,
    `.next/server/app${route}/index.html`,
  ];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  if (!file) {
    problems.push(`built HTML missing for ${route}; run next build before seo:check`);
    continue;
  }
  htmlFor.set(route, fs.readFileSync(file, "utf8"));
}

function pathsInMain(html: string) {
  const mains = [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main>/g)].map((match) => match[1] ?? "");
  const hrefs = mains.flatMap((main) => [...main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => match[1] ?? ""));
  const paths = new Set<string>();
  for (const href of hrefs) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = href.split(/[?#]/)[0] ?? href;
    paths.add(path.length > 1 ? path.replace(/\/$/, "") : path);
  }
  return paths;
}

const inbound = new Map(routes.map((route) => [route, 0]));
if (htmlFor.size === routes.length) {
  for (const [source, html] of htmlFor) {
    for (const target of pathsInMain(html)) {
      if (target !== source && inbound.has(target)) inbound.set(target, (inbound.get(target) ?? 0) + 1);
    }
  }
  const home = htmlFor.get("/") ?? "";
  const outsideMain = home.replace(/<main\b[\s\S]*?<\/main>/g, "");
  for (const path of ["/about", "/contact", "/terms"]) {
    if (!outsideMain.includes(`href="${path}"`)) problems.push(`${path} is not linked from the footer`);
  }
  const needThree = [
    "/csv-columns", "/csv-excel", "/csv-find-replace", "/csv-join", "/csv-to-json", "/split-csv",
    "/break-even-calculator", "/discount-calculator", "/markup-calculator",
    "/donation-receipt", "/rent-receipt", "/receipt-template", "/invoice-requirements",
  ];
  console.log("contextual inbound links");
  console.log("inbound  url");
  for (const route of [...routes].sort()) {
    const count = inbound.get(route) ?? 0;
    console.log(`${String(count).padStart(7)}  ${route}`);
  }
  for (const path of needThree) {
    const count = inbound.get(path) ?? 0;
    if (count < 3) problems.push(`${path} has ${count} contextual inbound links`);
  }

  const samples = [
    "/invoice-template/freelance-designer", "/invoice-template/photographer", "/invoice-template/plumber",
    "/quote-template/consulting", "/quote-template/baker", "/quote-template/architect",
    "/receipt-template/rent-payment", "/receipt-template/freelance-payment", "/receipt-template/security-deposit",
    "/invoice-requirements/united-states", "/invoice-requirements/germany", "/invoice-requirements/india",
    "/guides/what-net-30-means", "/guides/how-to-write-an-invoice", "/guides/invoice-vs-quote",
  ];
  for (const route of samples) {
    const html = htmlFor.get(route);
    if (!html) continue;
    const nav = html.match(/<nav[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/);
    if (!nav?.[1]) {
      problems.push(`${route} has no visible breadcrumb`);
      continue;
    }
    const visible = [...nav[1].matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>|<span>([^<]+)<\/span>/g)].map((match) => ({
      path: match[1],
      name: (match[2] ?? match[3] ?? "").trim(),
    }));
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    let list: { name?: string; item?: string }[] | null = null;
    for (const script of scripts) {
      const data = JSON.parse(script[1] ?? "{}") as unknown;
      const nodes = Array.isArray(data) ? data : [data];
      const found = nodes.find((node) => node && typeof node === "object" && (node as { "@type"?: string })["@type"] === "BreadcrumbList") as { itemListElement?: { name?: string; item?: string }[] } | undefined;
      if (found?.itemListElement) list = found.itemListElement;
    }
    if (!list) {
      problems.push(`${route} has no BreadcrumbList JSON-LD`);
      continue;
    }
    const json = list.map((item) => {
      const itemUrl = item.item ?? "";
      const path = itemUrl.startsWith("http") ? new URL(itemUrl).pathname.replace(/\/$/, "") || "/" : itemUrl;
      return { name: item.name ?? "", path };
    });
    if (visible.length !== json.length) problems.push(`${route} breadcrumb has ${visible.length} labels and JSON-LD has ${json.length}`);
    json.forEach((item, index) => {
      const shown = visible[index];
      if (!shown || shown.name !== item.name) problems.push(`${route} breadcrumb label ${index + 1} is "${shown?.name ?? ""}" in HTML and "${item.name}" in JSON-LD`);
      if (index < json.length - 1 && shown?.path !== item.path) problems.push(`${route} breadcrumb URL ${index + 1} is "${shown?.path ?? ""}" in HTML and "${item.path}" in JSON-LD`);
      if (index === json.length - 1 && item.path !== route) problems.push(`${route} JSON-LD breadcrumb ends at ${item.path}`);
    });
    const hub = json[1];
    if (!hub || hub.path === route || visible[1]?.path !== hub?.path) problems.push(`${route} hub crumb is not a link`);
  }
}

if (problems.length) {
  for (const problem of problems) console.error(problem);
  process.exit(1);
}
console.log(`seo:check ok (${routes.length} indexable URLs)`);
