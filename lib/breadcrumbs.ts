import { articles } from "@/content/articles";
import { invoiceCountries } from "@/content/countries";
import { industries } from "@/content/industries";
import { receiptTypes } from "@/content/receipt-types";
import { titled } from "@/lib/site";

const labels: Record<string, string> = {
  "invoice-generator": "Invoice generator",
  "quote-generator": "Quote generator",
  "receipt-generator": "Receipt generator",
  "payment-reminder-generator": "Payment reminder",
  "csv-cleaner": "CSV cleaner",
  "csv-merger": "CSV merger",
  "duplicate-sku-finder": "Duplicate SKU finder",
  "purchase-order": "Purchase order",
  "credit-note": "Credit note",
  "delivery-note": "Delivery note",
  "timesheet-invoice": "Timesheet invoice",
  "rent-receipt": "Rent receipt",
  "donation-receipt": "Donation receipt",
  "my-documents": "My documents",
  guides: "Guides",
  about: "About",
  contact: "Contact",
  privacy: "Privacy",
  terms: "Terms",
  pricing: "Pricing",
  "refund-policy": "Refund policy",
  "invoice-template": "Invoice templates",
  "quote-template": "Quote templates",
  "receipt-template": "Receipt templates",
  "invoice-requirements": "Invoice requirements",
  "profit-margin-calculator": "Profit margin",
  "markup-calculator": "Markup",
  "sales-tax-calculator": "Sales tax",
  "freelance-rate-calculator": "Freelance rate",
  "late-fee-calculator": "Late fee",
  "break-even-calculator": "Break-even",
  "discount-calculator": "Discount",
  "invoice-due-date-calculator": "Due date",
  "csv-excel": "CSV and Excel",
  "csv-to-json": "CSV to JSON",
  "split-csv": "Split CSV",
  "csv-columns": "CSV columns",
  "csv-find-replace": "Find and replace",
  "csv-join": "Join CSVs",
  "product-csv-checker": "Product CSV checker",
  "invoice-vs-quote": "Invoice vs. quote",
  "how-to-write-an-invoice": "How to write an invoice",
};

function titleFor(segment: string, previous: string) {
  if (previous === "invoice-template" || previous === "quote-template") return titled(industries.find((item) => item.slug === segment)?.name ?? segment);
  if (previous === "receipt-template") return titled(receiptTypes.find((item) => item.slug === segment)?.name ?? segment);
  if (previous === "invoice-requirements") return invoiceCountries.find((item) => item.slug === segment)?.name ?? segment;
  if (previous === "guides") return articles.find((item) => item.slug === segment)?.title ?? labels[segment] ?? segment;
  return labels[segment] ?? segment;
}

export function breadcrumbItems(pathname: string) {
  if (pathname.startsWith("/embed") || pathname === "/") return null;
  const parts = pathname.split("/").filter(Boolean);
  return [
    { name: "Home", path: "/" },
    ...parts.map((part, index) => ({
      name: titleFor(part, parts[index - 1] ?? ""),
      path: `/${parts.slice(0, index + 1).join("/")}`,
    })),
  ];
}
