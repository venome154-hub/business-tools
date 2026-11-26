export type RelatedLink = { href: string; label: string };

export type RelatedBlock = {
  guides: RelatedLink[];
  tools: RelatedLink[];
  templates: RelatedLink[];
  moreCsv: RelatedLink[];
};

function link(href: string, label: string): RelatedLink {
  return { href, label };
}

export const csvTools: RelatedLink[] = [
  link("/csv-cleaner", "CSV cleaner"),
  link("/csv-merger", "CSV merger"),
  link("/csv-excel", "CSV and Excel"),
  link("/csv-to-json", "CSV to JSON"),
  link("/split-csv", "Split CSV"),
  link("/csv-columns", "CSV columns"),
  link("/csv-find-replace", "Find and replace"),
  link("/csv-join", "Join CSVs"),
  link("/duplicate-sku-finder", "Duplicate SKU finder"),
  link("/product-csv-checker", "Product CSV checker"),
];

const merging = link("/guides/merging-csv-files", "How to merge CSV files");
const cleanShopify = link("/guides/how-to-clean-a-shopify-product-csv", "How to clean a Shopify product CSV");
const duplicateSkus = link("/guides/finding-duplicate-skus", "Finding duplicate SKUs");
const salesTaxGuide = link("/guides/adding-or-removing-sales-tax", "Adding or removing sales tax");
const marginGuide = link("/guides/profit-margin-and-markup", "Profit margin and markup");
const rateGuide = link("/guides/setting-a-freelance-hourly-rate", "Setting a freelance hourly rate");
const lateFeeGuide = link("/guides/late-fees-on-an-invoice", "Late fees on an invoice");
const lateEmail = link("/guides/how-to-write-a-late-payment-email", "How to write a late payment email");
const net30 = link("/guides/what-net-30-means", "What net 30 means");
const writeReceipt = link("/guides/how-to-write-a-receipt", "How to write a receipt");
const partialPayment = link("/guides/partial-payments-on-a-receipt", "How to record a partial payment");
const poGuide = link("/guides/purchase-order-basics", "What a purchase order is for");
const creditGuide = link("/guides/credit-note-or-refund", "Credit note or refund");
const deliveryGuide = link("/guides/delivery-note-and-packing-slip", "Delivery note and packing slip");
const timesheetGuide = link("/guides/billing-hours-on-a-timesheet-invoice", "Billing hours on a timesheet invoice");
const quoteBelongs = link("/guides/what-belongs-on-a-quote", "What belongs on a quote");
const quoteCompare = link("/guides/quote-vs-estimate-vs-proposal", "Quote vs estimate vs proposal");
const invoiceVsQuote = link("/guides/invoice-vs-quote", "Invoice vs. quote");
const writeInvoice = link("/guides/how-to-write-an-invoice", "How to write an invoice");
const invoiceNumbers = link("/guides/how-invoice-numbers-work", "How invoice numbers work");
const freelanceInvoice = link("/guides/how-to-invoice-as-a-freelancer", "How to invoice as a freelancer");

const invoiceTool = link("/invoice-generator", "Invoice generator");
const quoteTool = link("/quote-generator", "Quote generator");
const receiptTool = link("/receipt-generator", "Receipt generator");
const reminderTool = link("/payment-reminder-generator", "Payment reminder");
const poTool = link("/purchase-order", "Purchase order");
const creditTool = link("/credit-note", "Credit note");
const deliveryTool = link("/delivery-note", "Delivery note");
const timesheetTool = link("/timesheet-invoice", "Timesheet invoice");
const rentTool = link("/rent-receipt", "Rent receipt");
const donationTool = link("/donation-receipt", "Donation receipt");
const marginTool = link("/profit-margin-calculator", "Profit margin calculator");
const markupTool = link("/markup-calculator", "Markup calculator");
const salesTaxTool = link("/sales-tax-calculator", "Sales tax calculator");
const rateTool = link("/freelance-rate-calculator", "Freelance rate calculator");
const lateFeeTool = link("/late-fee-calculator", "Late fee calculator");
const breakEvenTool = link("/break-even-calculator", "Break-even calculator");
const discountTool = link("/discount-calculator", "Discount calculator");
const dueDateTool = link("/invoice-due-date-calculator", "Invoice due date calculator");
const mergerTool = link("/csv-merger", "CSV merger");
const joinTool = link("/csv-join", "Join CSVs");
const cleanerTool = link("/csv-cleaner", "CSV cleaner");
const skuTool = link("/duplicate-sku-finder", "Duplicate SKU finder");
const productTool = link("/product-csv-checker", "Product CSV checker");
const invoiceTemplates = link("/invoice-template", "Invoice templates");
const quoteTemplates = link("/quote-template", "Quote templates");
const receiptTemplates = link("/receipt-template", "Receipt templates");
const requirements = link("/invoice-requirements", "Invoice requirements");

type Draft = { guides: RelatedLink[]; tools: RelatedLink[]; templates?: RelatedLink[] };

const pages: Record<string, Draft> = {
  "/sales-tax-calculator": { guides: [salesTaxGuide], tools: [marginTool, markupTool, discountTool, invoiceTool] },
  "/profit-margin-calculator": { guides: [marginGuide], tools: [markupTool, breakEvenTool, discountTool, salesTaxTool] },
  "/markup-calculator": { guides: [marginGuide], tools: [marginTool, breakEvenTool, discountTool, salesTaxTool] },
  "/break-even-calculator": { guides: [marginGuide, rateGuide], tools: [marginTool, markupTool, discountTool, rateTool] },
  "/discount-calculator": { guides: [marginGuide, salesTaxGuide], tools: [markupTool, breakEvenTool, marginTool, salesTaxTool] },
  "/freelance-rate-calculator": { guides: [rateGuide], tools: [timesheetTool, breakEvenTool, marginTool, invoiceTool] },
  "/late-fee-calculator": { guides: [lateFeeGuide, lateEmail], tools: [reminderTool, dueDateTool, invoiceTool] },
  "/invoice-due-date-calculator": { guides: [net30], tools: [invoiceTool, lateFeeTool, reminderTool] },
  "/receipt-generator": { guides: [writeReceipt, partialPayment], tools: [rentTool, donationTool, invoiceTool, creditTool], templates: [receiptTemplates] },
  "/rent-receipt": { guides: [writeReceipt, partialPayment], tools: [receiptTool, donationTool, invoiceTool], templates: [receiptTemplates, link("/receipt-template/rent-payment", "Rent payment receipt template")] },
  "/donation-receipt": { guides: [writeReceipt], tools: [receiptTool, rentTool, invoiceTool], templates: [receiptTemplates] },
  "/purchase-order": { guides: [poGuide], tools: [invoiceTool, deliveryTool, quoteTool] },
  "/credit-note": { guides: [creditGuide], tools: [invoiceTool, receiptTool, quoteTool] },
  "/delivery-note": { guides: [deliveryGuide], tools: [poTool, invoiceTool, quoteTool] },
  "/timesheet-invoice": { guides: [timesheetGuide, rateGuide], tools: [rateTool, invoiceTool, quoteTool] },
  "/quote-generator": { guides: [quoteBelongs, quoteCompare, invoiceVsQuote], tools: [invoiceTool, receiptTool, poTool], templates: [quoteTemplates] },
  "/invoice-generator": { guides: [writeInvoice, invoiceNumbers, freelanceInvoice], tools: [quoteTool, receiptTool, reminderTool, timesheetTool], templates: [invoiceTemplates, requirements] },
  "/payment-reminder-generator": { guides: [lateEmail, lateFeeGuide, net30], tools: [invoiceTool, lateFeeTool, dueDateTool] },
  "/csv-cleaner": { guides: [merging, cleanShopify], tools: [] },
  "/csv-merger": { guides: [merging, cleanShopify], tools: [] },
  "/csv-excel": { guides: [merging, cleanShopify], tools: [] },
  "/csv-to-json": { guides: [merging, cleanShopify], tools: [] },
  "/split-csv": { guides: [merging, cleanShopify], tools: [] },
  "/csv-columns": { guides: [merging, cleanShopify], tools: [] },
  "/csv-find-replace": { guides: [merging, cleanShopify], tools: [] },
  "/csv-join": { guides: [merging, duplicateSkus], tools: [] },
  "/duplicate-sku-finder": { guides: [duplicateSkus, cleanShopify], tools: [] },
  "/product-csv-checker": { guides: [cleanShopify, duplicateSkus], tools: [] },
  "/guides/adding-or-removing-sales-tax": { guides: [marginGuide, net30, writeInvoice], tools: [salesTaxTool, marginTool, markupTool] },
  "/guides/profit-margin-and-markup": { guides: [rateGuide, salesTaxGuide, lateFeeGuide], tools: [marginTool, markupTool, breakEvenTool, discountTool] },
  "/guides/setting-a-freelance-hourly-rate": { guides: [marginGuide, timesheetGuide, freelanceInvoice], tools: [rateTool, timesheetTool, breakEvenTool, discountTool, markupTool] },
  "/guides/late-fees-on-an-invoice": { guides: [lateEmail, net30, writeInvoice], tools: [lateFeeTool, reminderTool, invoiceTool] },
  "/guides/how-to-write-a-late-payment-email": { guides: [lateFeeGuide, net30, writeInvoice], tools: [reminderTool, lateFeeTool, dueDateTool] },
  "/guides/what-net-30-means": { guides: [lateFeeGuide, writeInvoice, invoiceNumbers], tools: [dueDateTool, invoiceTool, lateFeeTool] },
  "/guides/merging-csv-files": { guides: [duplicateSkus, cleanShopify, writeInvoice], tools: [mergerTool, joinTool, cleanerTool, link("/csv-columns", "CSV columns"), link("/csv-excel", "CSV and Excel"), link("/csv-to-json", "CSV to JSON"), link("/split-csv", "Split CSV"), link("/csv-find-replace", "Find and replace")] },
  "/guides/how-to-clean-a-shopify-product-csv": { guides: [duplicateSkus, merging], tools: [productTool, skuTool, cleanerTool, link("/csv-columns", "CSV columns"), link("/csv-excel", "CSV and Excel"), link("/csv-find-replace", "Find and replace"), joinTool, link("/csv-to-json", "CSV to JSON"), link("/split-csv", "Split CSV")] },
  "/guides/finding-duplicate-skus": { guides: [cleanShopify, merging], tools: [skuTool, productTool, cleanerTool] },
  "/guides/how-to-write-a-receipt": { guides: [partialPayment, writeInvoice, poGuide], tools: [receiptTool, rentTool, donationTool], templates: [receiptTemplates] },
  "/guides/partial-payments-on-a-receipt": { guides: [writeReceipt, writeInvoice, creditGuide], tools: [receiptTool, invoiceTool, rentTool] },
  "/guides/purchase-order-basics": { guides: [deliveryGuide, creditGuide, writeInvoice], tools: [poTool, deliveryTool, invoiceTool] },
  "/guides/credit-note-or-refund": { guides: [poGuide, writeReceipt, partialPayment], tools: [creditTool, invoiceTool, receiptTool] },
  "/guides/delivery-note-and-packing-slip": { guides: [poGuide, writeInvoice, creditGuide], tools: [deliveryTool, poTool, invoiceTool] },
  "/guides/billing-hours-on-a-timesheet-invoice": { guides: [rateGuide, freelanceInvoice, writeInvoice], tools: [timesheetTool, rateTool, invoiceTool] },
  "/guides/what-belongs-on-a-quote": { guides: [quoteCompare, invoiceVsQuote, writeInvoice], tools: [quoteTool, invoiceTool], templates: [quoteTemplates] },
  "/guides/quote-vs-estimate-vs-proposal": { guides: [quoteBelongs, invoiceVsQuote, writeInvoice], tools: [quoteTool, invoiceTool], templates: [quoteTemplates] },
  "/guides/how-to-write-an-invoice": { guides: [invoiceNumbers, net30, invoiceVsQuote, freelanceInvoice], tools: [invoiceTool, quoteTool], templates: [invoiceTemplates, requirements] },
  "/guides/invoice-vs-quote": { guides: [quoteBelongs, quoteCompare, writeInvoice], tools: [invoiceTool, quoteTool], templates: [invoiceTemplates, quoteTemplates] },
  "/guides/how-invoice-numbers-work": { guides: [writeInvoice, freelanceInvoice, creditGuide], tools: [invoiceTool, creditTool, quoteTool] },
  "/guides/how-to-invoice-as-a-freelancer": { guides: [writeInvoice, invoiceNumbers, rateGuide], tools: [invoiceTool, rateTool, timesheetTool] },
  "/receipt-template": { guides: [writeReceipt, partialPayment], tools: [receiptTool, rentTool, donationTool] },
  "/invoice-template": { guides: [writeInvoice, invoiceNumbers], tools: [invoiceTool, quoteTool, receiptTool] },
  "/quote-template": { guides: [quoteBelongs, quoteCompare], tools: [quoteTool, invoiceTool, receiptTool] },
  "/invoice-requirements": { guides: [writeInvoice, invoiceNumbers], tools: [invoiceTool, quoteTool, salesTaxTool] },
};

export const toolPaths = [
  "/invoice-generator", "/quote-generator", "/receipt-generator", "/payment-reminder-generator",
  "/purchase-order", "/credit-note", "/delivery-note", "/timesheet-invoice", "/rent-receipt", "/donation-receipt",
  "/profit-margin-calculator", "/markup-calculator", "/sales-tax-calculator", "/freelance-rate-calculator",
  "/late-fee-calculator", "/break-even-calculator", "/discount-calculator", "/invoice-due-date-calculator",
  ...csvTools.map((item) => item.href),
];

export const guidePaths = [
  "/guides/how-to-write-an-invoice", "/guides/invoice-vs-quote",
  "/guides/how-to-invoice-as-a-freelancer", "/guides/what-net-30-means", "/guides/how-to-write-a-late-payment-email",
  "/guides/quote-vs-estimate-vs-proposal", "/guides/how-to-clean-a-shopify-product-csv", "/guides/how-to-write-a-receipt",
  "/guides/how-invoice-numbers-work", "/guides/what-belongs-on-a-quote", "/guides/partial-payments-on-a-receipt",
  "/guides/purchase-order-basics", "/guides/credit-note-or-refund", "/guides/delivery-note-and-packing-slip",
  "/guides/billing-hours-on-a-timesheet-invoice", "/guides/profit-margin-and-markup", "/guides/adding-or-removing-sales-tax",
  "/guides/setting-a-freelance-hourly-rate", "/guides/merging-csv-files", "/guides/finding-duplicate-skus",
  "/guides/late-fees-on-an-invoice",
];

export const guideGroups: { heading: string; slugs: string[] }[] = [
  { heading: "Invoicing & payments", slugs: ["how-to-write-an-invoice", "how-to-invoice-as-a-freelancer", "how-invoice-numbers-work", "what-net-30-means", "how-to-write-a-late-payment-email", "late-fees-on-an-invoice", "billing-hours-on-a-timesheet-invoice"] },
  { heading: "Quotes", slugs: ["invoice-vs-quote", "what-belongs-on-a-quote", "quote-vs-estimate-vs-proposal"] },
  { heading: "Receipts", slugs: ["how-to-write-a-receipt", "partial-payments-on-a-receipt"] },
  { heading: "Documents", slugs: ["purchase-order-basics", "credit-note-or-refund", "delivery-note-and-packing-slip"] },
  { heading: "Pricing & calculators", slugs: ["profit-margin-and-markup", "adding-or-removing-sales-tax", "setting-a-freelance-hourly-rate"] },
  { heading: "CSV & e-commerce", slugs: ["merging-csv-files", "finding-duplicate-skus", "how-to-clean-a-shopify-product-csv"] },
];

export const footerGuides: RelatedLink[] = [
  writeInvoice,
  invoiceVsQuote,
  net30,
  marginGuide,
  writeReceipt,
  merging,
  lateFeeGuide,
];

const specialGuides: Record<string, { title: string; description: string }> = {
  "how-to-write-an-invoice": {
    title: "How to write an invoice",
    description: "A practical invoice checklist for freelancers and small businesses, from invoice numbers and item descriptions to totals and payment details.",
  },
  "invoice-vs-quote": {
    title: "Invoice vs. quote",
    description: "Learn when to send a quote and when to issue an invoice, what each document includes, and how they work together in a client project.",
  },
};

export function guideCard(slug: string, article?: { title: string; description: string }) {
  const special = specialGuides[slug];
  return {
    href: `/guides/${slug}`,
    title: article?.title ?? special?.title ?? slug,
    description: article?.description ?? special?.description ?? "",
  };
}

function withoutSelf(path: string, links: RelatedLink[]) {
  return links.filter((item) => item.href !== path);
}

export function linksFor(path: string): RelatedBlock | null {
  const invoiceTemplate = path.match(/^\/invoice-template\/([^/]+)$/);
  if (invoiceTemplate) {
    const slug = invoiceTemplate[1];
    return {
      guides: [writeInvoice, invoiceNumbers],
      tools: [invoiceTool, quoteTool],
      templates: [link(`/quote-template/${slug}`, "Matching quote template"), invoiceTemplates],
      moreCsv: [],
    };
  }
  const quoteTemplate = path.match(/^\/quote-template\/([^/]+)$/);
  if (quoteTemplate) {
    const slug = quoteTemplate[1];
    return {
      guides: [quoteBelongs, quoteCompare],
      tools: [quoteTool, invoiceTool],
      templates: [link(`/invoice-template/${slug}`, "Matching invoice template"), quoteTemplates],
      moreCsv: [],
    };
  }
  const receiptTemplate = path.match(/^\/receipt-template\/([^/]+)$/);
  if (receiptTemplate) {
    return {
      guides: [writeReceipt, partialPayment],
      tools: [receiptTool, rentTool, donationTool],
      templates: [link("/receipt-template", "All receipt templates")],
      moreCsv: [],
    };
  }
  const country = path.match(/^\/invoice-requirements\/([^/]+)$/);
  if (country) {
    return {
      guides: [writeInvoice],
      tools: [invoiceTool, salesTaxTool, dueDateTool],
      templates: [link("/invoice-requirements", "All countries")],
      moreCsv: [],
    };
  }
  const draft = pages[path];
  if (!draft) return null;
  const moreCsv = csvTools.some((item) => item.href === path) ? withoutSelf(path, csvTools) : [];
  return {
    guides: withoutSelf(path, draft.guides),
    tools: withoutSelf(path, draft.tools),
    templates: withoutSelf(path, draft.templates ?? []),
    moreCsv,
  };
}
