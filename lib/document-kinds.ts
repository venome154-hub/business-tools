import type { DocumentKind } from "@/lib/document-model";

export type KindConfig = {
  heading: string;
  lede: string;
  pdfTitle: string;
  prefix: string;
  party: string;
  numberLabel: string;
  prices: boolean;
  tax: boolean;
  discount: boolean;
  shipping: boolean;
  paid: boolean;
  paidLabel: string;
  po: boolean;
  termsSelect: boolean;
  lateFee: boolean;
  paymentLink: boolean;
  paymentInfo: boolean;
  signature: boolean;
  accepted: boolean;
  validity: boolean;
  due: boolean;
  method: boolean;
  related: boolean;
  perLine: boolean;
  termsBlock: boolean;
  property: boolean;
  qty: string;
  price: string;
  lines: boolean;
  note: string;
  range?: boolean;
  termsLabel?: string;
  detailsHeading?: string;
  chain: { to: string; label: string }[];
};

export const KIND_CONFIG: Record<DocumentKind, KindConfig> = {
  invoice: {
    heading: "Invoice Generator",
    lede: "Create a detailed invoice and download PDF, Word, or Excel. Your entries stay in this browser.",
    pdfTitle: "INVOICE",
    prefix: "INV",
    party: "Bill to",
    numberLabel: "Invoice number",
    prices: true, tax: true, discount: true, shipping: true, paid: true, paidLabel: "Amount paid",
    po: true, termsSelect: true, lateFee: true, paymentLink: true, paymentInfo: true,
    signature: true, accepted: false, validity: false, due: true, method: false, related: false,
    perLine: true, termsBlock: true, property: false, qty: "Qty", price: "Price", lines: true, note: "",
    chain: [
      { to: "receipt", label: "Create a receipt for this invoice" },
      { to: "reminder", label: "Draft a payment reminder" },
    ],
  },
  quote: {
    heading: "Quote Generator",
    lede: "Create a clear project estimate and download it as PDF, Word, or Excel. No signup.",
    pdfTitle: "QUOTE",
    prefix: "QUO",
    party: "Prepared for",
    numberLabel: "Quote number",
    prices: true, tax: true, discount: true, shipping: false, paid: false, paidLabel: "",
    po: false, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: false,
    signature: false, accepted: true, validity: true, due: false, method: false, related: false,
    perLine: false, termsBlock: true, property: false, qty: "Qty", price: "Price", lines: true,
    note: "A quote is an estimate for approval. It does not request payment.",
    chain: [{ to: "invoice", label: "Turn this quote into an invoice" }],
  },
  estimate: {
    heading: "Estimate Generator",
    lede: "Price a job as a low and high range, then download PDF, Word, or Excel. This is an estimate, not a fixed quote.",
    pdfTitle: "ESTIMATE",
    prefix: "EST",
    party: "Prepared for",
    numberLabel: "Estimate number",
    prices: true, tax: true, discount: true, shipping: false, paid: false, paidLabel: "",
    po: false, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: false,
    signature: false, accepted: false, validity: true, due: false, method: false, related: false,
    perLine: false, termsBlock: true, property: false, qty: "Qty", price: "Price", lines: true,
    range: true,
    termsLabel: "Assumptions and exclusions",
    detailsHeading: "Assumptions",
    note: "This is an estimate, not a fixed quote.",
    chain: [
      { to: "quote", label: "Convert to quote" },
      { to: "invoice", label: "Convert to invoice" },
    ],
  },
  receipt: {
    heading: "Receipt Generator",
    lede: "Record a payment you have received and download a receipt as PDF, Word, or Excel.",
    pdfTitle: "PAYMENT RECEIPT",
    prefix: "RCP",
    party: "Received from",
    numberLabel: "Receipt number",
    prices: true, tax: true, discount: true, shipping: true, paid: true, paidLabel: "Amount received",
    po: false, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: false,
    signature: true, accepted: false, validity: false, due: false, method: true, related: true,
    perLine: true, termsBlock: true, property: false, qty: "Qty", price: "Unit amount", lines: true,
    note: "This records a payment you report as received. It does not collect or verify payment.",
    chain: [],
  },
  "purchase-order": {
    heading: "Purchase Order",
    lede: "Prepare a purchase order for a supplier and download it as a PDF.",
    pdfTitle: "PURCHASE ORDER",
    prefix: "PO",
    party: "Vendor",
    numberLabel: "PO number",
    prices: true, tax: true, discount: false, shipping: true, paid: false, paidLabel: "",
    po: false, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: true,
    signature: true, accepted: false, validity: false, due: true, method: false, related: false,
    perLine: false, termsBlock: true, property: false, qty: "Qty", price: "Price", lines: true, note: "",
    chain: [],
  },
  "credit-note": {
    heading: "Credit Note",
    lede: "Record an amount credited against an invoice and download a PDF.",
    pdfTitle: "CREDIT NOTE",
    prefix: "CN",
    party: "Credit to",
    numberLabel: "Credit note number",
    prices: true, tax: true, discount: false, shipping: false, paid: false, paidLabel: "",
    po: false, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: false,
    signature: true, accepted: false, validity: false, due: false, method: false, related: true,
    perLine: false, termsBlock: false, property: false, qty: "Qty", price: "Price", lines: true,
    note: "A credit note reduces the amount owed. It is not a payment receipt.",
    chain: [],
  },
  "delivery-note": {
    heading: "Delivery Note",
    lede: "List what you are sending. This packing slip shows quantities, not a request for payment.",
    pdfTitle: "DELIVERY NOTE",
    prefix: "DN",
    party: "Deliver to",
    numberLabel: "Delivery note number",
    prices: false, tax: false, discount: false, shipping: false, paid: false, paidLabel: "",
    po: true, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: false,
    signature: true, accepted: false, validity: false, due: false, method: false, related: true,
    perLine: false, termsBlock: false, property: false, qty: "Qty", price: "Price", lines: true, note: "",
    chain: [],
  },
  timesheet: {
    heading: "Timesheet Invoice",
    lede: "Bill hours at a rate and download an invoice PDF.",
    pdfTitle: "TIMESHEET INVOICE",
    prefix: "TS",
    party: "Bill to",
    numberLabel: "Invoice number",
    prices: true, tax: true, discount: true, shipping: false, paid: true, paidLabel: "Amount paid",
    po: true, termsSelect: true, lateFee: true, paymentLink: true, paymentInfo: true,
    signature: true, accepted: false, validity: false, due: true, method: false, related: false,
    perLine: true, termsBlock: false, property: false, qty: "Hours", price: "Rate", lines: true, note: "",
    chain: [{ to: "receipt", label: "Create a receipt for this invoice" }],
  },
  "rent-receipt": {
    heading: "Rent Receipt",
    lede: "Write a receipt for rent you received and download a PDF.",
    pdfTitle: "RENT RECEIPT",
    prefix: "RR",
    party: "Received from",
    numberLabel: "Receipt number",
    prices: true, tax: false, discount: false, shipping: false, paid: false, paidLabel: "",
    po: false, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: true,
    signature: true, accepted: false, validity: false, due: false, method: true, related: false,
    perLine: false, termsBlock: false, property: true, qty: "Qty", price: "Rent", lines: false,
    note: "This records rent you report as received.",
    chain: [],
  },
  "donation-receipt": {
    heading: "Donation Receipt",
    lede: "Record a donation you received. Tax rules differ by place, and this PDF does not decide whether a gift is deductible.",
    pdfTitle: "DONATION RECEIPT",
    prefix: "DR",
    party: "Received from",
    numberLabel: "Receipt number",
    prices: true, tax: false, discount: false, shipping: false, paid: false, paidLabel: "",
    po: false, termsSelect: false, lateFee: false, paymentLink: false, paymentInfo: false,
    signature: true, accepted: false, validity: false, due: false, method: true, related: false,
    perLine: false, termsBlock: false, property: false, qty: "Qty", price: "Unit amount", lines: false,
    note: "Tax treatment of donations depends on local rules. This receipt does not certify that a gift is tax-deductible.",
    chain: [],
  },
};
