import type { PageSize, PdfTemplate } from "@/lib/profile";

export type LineItem = { description: string; quantity: string; price: string; tax: string };

export type DocumentKind =
  | "invoice"
  | "quote"
  | "receipt"
  | "purchase-order"
  | "credit-note"
  | "delivery-note"
  | "timesheet"
  | "rent-receipt"
  | "donation-receipt";

export type DocumentState = {
  company: string;
  companyEmail: string;
  companyAddress: string;
  client: string;
  clientEmail: string;
  clientAddress: string;
  number: string;
  date: string;
  dueDate: string;
  validUntil: string;
  currency: string;
  locale: string;
  template: PdfTemplate;
  pageSize: PageSize;
  accent: string;
  logoDataUrl: string;
  tax: string;
  discount: string;
  shipping: string;
  amountPaid: string;
  poNumber: string;
  paymentTerms: "" | "due" | "7" | "15" | "30";
  lateFee: string;
  paymentLink: string;
  paymentInfo: string;
  notes: string;
  terms: string;
  signature: string;
  acceptedBy: string;
  paymentMethod: string;
  paymentReference: string;
  relatedNumber: string;
  property: string;
  period: string;
  perLineTax: boolean;
  items: LineItem[];
};

export type ReminderSeed = {
  business: string;
  client: string;
  invoiceNo: string;
  amount: string;
  currency: string;
  dueDate: string;
};

export type Handoff = {
  to: string;
  draftId?: string;
  payload?: Partial<DocumentState>;
  reminder?: ReminderSeed;
};

const HANDOFF_KEY = "biztoolsbox-handoff";

export const DOC_PATHS: Record<string, string> = {
  invoice: "/invoice-generator",
  quote: "/quote-generator",
  receipt: "/receipt-generator",
  reminder: "/payment-reminder-generator",
  "purchase-order": "/purchase-order",
  "credit-note": "/credit-note",
  "delivery-note": "/delivery-note",
  timesheet: "/timesheet-invoice",
  "rent-receipt": "/rent-receipt",
  "donation-receipt": "/donation-receipt",
};

export function blankLine(description = "Service"): LineItem {
  return { description, quantity: "1", price: "100", tax: "" };
}

export function blankDocument(kind: DocumentKind): DocumentState {
  const rent = kind === "rent-receipt";
  const donation = kind === "donation-receipt";
  return {
    company: "",
    companyEmail: "",
    companyAddress: "",
    client: "",
    clientEmail: "",
    clientAddress: "",
    number: "",
    date: "",
    dueDate: "",
    validUntil: "",
    currency: "USD",
    locale: "en-US",
    template: "classic",
    pageSize: "a4",
    accent: "#111827",
    logoDataUrl: "",
    tax: "0",
    discount: "0",
    shipping: "",
    amountPaid: "",
    poNumber: "",
    paymentTerms: "",
    lateFee: "",
    paymentLink: "",
    paymentInfo: "",
    notes: "",
    terms: "",
    signature: "",
    acceptedBy: "",
    paymentMethod: "Bank transfer",
    paymentReference: "",
    relatedNumber: "",
    property: "",
    period: "",
    perLineTax: false,
    items: [blankLine(rent ? "Rent" : donation ? "Donation" : kind === "timesheet" ? "Project work" : "Service")],
  };
}

export function writeHandoff(handoff: Handoff) {
  localStorage.setItem(HANDOFF_KEY, JSON.stringify(handoff));
}

export function takeHandoff(target: string): Handoff | null {
  try {
    const raw = localStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Handoff;
    if (parsed.to !== target) return null;
    localStorage.removeItem(HANDOFF_KEY);
    return parsed;
  } catch {
    return null;
  }
}
