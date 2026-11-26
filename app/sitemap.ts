import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { invoiceCountries } from "@/content/countries";
import { industries } from "@/content/industries";
import { receiptTypes } from "@/content/receipt-types";
import { getSiteUrl } from "@/lib/site";

const grown = "2026-11-26";

const datedPaths: [string, string][] = [
  ["/", grown],
  ["/invoice-generator", grown],
  ["/quote-generator", grown],
  ["/receipt-generator", grown],
  ["/payment-reminder-generator", grown],
  ["/csv-cleaner", grown],
  ["/csv-merger", grown],
  ["/duplicate-sku-finder", grown],
  ["/guides", grown],
  ["/guides/invoice-vs-quote", "2026-10-08"],
  ["/guides/how-to-write-an-invoice", "2026-10-08"],
  ["/about", grown],
  ["/contact", grown],
  ["/privacy", grown],
  ["/terms", grown],
  ["/my-documents", grown],
  ["/purchase-order", grown],
  ["/credit-note", grown],
  ["/delivery-note", grown],
  ["/timesheet-invoice", grown],
  ["/rent-receipt", grown],
  ["/donation-receipt", grown],
  ["/profit-margin-calculator", grown],
  ["/markup-calculator", grown],
  ["/sales-tax-calculator", grown],
  ["/freelance-rate-calculator", grown],
  ["/late-fee-calculator", grown],
  ["/break-even-calculator", grown],
  ["/discount-calculator", grown],
  ["/invoice-due-date-calculator", grown],
  ["/csv-excel", grown],
  ["/csv-to-json", grown],
  ["/split-csv", grown],
  ["/csv-columns", grown],
  ["/csv-find-replace", grown],
  ["/csv-join", grown],
  ["/product-csv-checker", grown],
  ["/invoice-template", grown],
  ["/quote-template", grown],
  ["/receipt-template", grown],
  ["/invoice-requirements", grown],
  ...industries.flatMap((item) => [
    [`/invoice-template/${item.slug}`, grown] as [string, string],
    [`/quote-template/${item.slug}`, grown] as [string, string],
  ]),
  ...receiptTypes.map((item) => [`/receipt-template/${item.slug}`, grown] as [string, string]),
  ...invoiceCountries.map((item) => [`/invoice-requirements/${item.slug}`, grown] as [string, string]),
  ...articles.map((item) => [`/guides/${item.slug}`, grown] as [string, string]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return datedPaths.map(([path, date]) => ({
    url: path === "/" ? site : `${site}${path}`,
    lastModified: date,
  }));
}
