import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { invoiceCountries } from "@/content/countries";
import { industries } from "@/content/industries";
import { receiptTypes } from "@/content/receipt-types";
import { getSiteUrl } from "@/lib/site";

const updated = new Date("2026-11-26");

const paths = [
  "/",
  "/invoice-generator",
  "/quote-generator",
  "/receipt-generator",
  "/payment-reminder-generator",
  "/csv-cleaner",
  "/csv-merger",
  "/duplicate-sku-finder",
  "/guides",
  "/guides/invoice-vs-quote",
  "/guides/how-to-write-an-invoice",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/my-documents",
  "/purchase-order",
  "/credit-note",
  "/delivery-note",
  "/timesheet-invoice",
  "/rent-receipt",
  "/donation-receipt",
  "/profit-margin-calculator",
  "/markup-calculator",
  "/sales-tax-calculator",
  "/freelance-rate-calculator",
  "/late-fee-calculator",
  "/break-even-calculator",
  "/discount-calculator",
  "/invoice-due-date-calculator",
  "/csv-excel",
  "/csv-to-json",
  "/split-csv",
  "/csv-columns",
  "/csv-find-replace",
  "/csv-join",
  "/product-csv-checker",
  "/invoice-template",
  "/quote-template",
  "/receipt-template",
  "/invoice-requirements",
  "/pricing",
  "/refund-policy",
  ...industries.flatMap((item) => [`/invoice-template/${item.slug}`, `/quote-template/${item.slug}`]),
  ...receiptTypes.map((item) => `/receipt-template/${item.slug}`),
  ...invoiceCountries.map((item) => `/invoice-requirements/${item.slug}`),
  ...articles.map((item) => `/guides/${item.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return paths.map((path) => ({
    url: path === "/" ? site : `${site}${path}`,
    lastModified: updated,
  }));
}
