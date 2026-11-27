import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlarmClock, BellRing, Braces, CalendarClock, Check, Clock, Columns, FileSignature, FileSpreadsheet,
  ClipboardList, FileText, HeartHandshake, Home as HomeIcon, Landmark, Link2, Merge, PackageCheck, Percent, Receipt, Replace,
  RotateCcw, Scale, ScanSearch, Scissors, Sheet, ShoppingCart, Timer, Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Free Business Tools: Invoices, Quotes & CSV Utilities | BizToolsBox" },
  description: "Create business documents, clean and merge CSV files, or find duplicate SKUs with free online tools. No account required.",
  alternates: { canonical: "/" },
};

const documents: [LucideIcon, string, string, string][] = [
  [FileText, "Invoice", "Request payment for finished work.", "/invoice-generator"],
  [FileSignature, "Quote", "Send a project estimate for approval.", "/quote-generator"],
  [ClipboardList, "Estimate", "Price a job as a low and high range.", "/estimate-generator"],
  [Receipt, "Receipt", "Record a payment you have received.", "/receipt-generator"],
  [BellRing, "Payment reminder", "Draft a reminder email for an unpaid invoice.", "/payment-reminder-generator"],
  [ShoppingCart, "Purchase order", "Tell a supplier what you want to buy.", "/purchase-order"],
  [RotateCcw, "Credit note", "Record an amount credited against an invoice.", "/credit-note"],
  [Truck, "Delivery note", "List what you sent with a shipment.", "/delivery-note"],
  [Clock, "Timesheet invoice", "Bill hours times a rate.", "/timesheet-invoice"],
  [HomeIcon, "Rent receipt", "Record rent you received.", "/rent-receipt"],
  [HeartHandshake, "Donation receipt", "Record a donation you received.", "/donation-receipt"],
];

const sheets: [LucideIcon, string, string, string][] = [
  [Sheet, "CSV cleaner", "Remove blank rows, empty columns, and repeats.", "/csv-cleaner"],
  [Merge, "CSV merger", "Combine files and match columns by header.", "/csv-merger"],
  [ScanSearch, "Duplicate SKU finder", "Find repeated product codes.", "/duplicate-sku-finder"],
  [FileSpreadsheet, "CSV and Excel", "Turn a CSV into Excel, or Excel into CSV.", "/csv-excel"],
  [Braces, "CSV to JSON", "Convert the first row into JSON keys.", "/csv-to-json"],
  [Scissors, "Split CSV", "Break a large sheet into smaller files.", "/split-csv"],
  [Columns, "CSV columns", "Remove columns and change their order.", "/csv-columns"],
  [Replace, "Find and replace", "Replace text in one column or the whole sheet.", "/csv-find-replace"],
  [Link2, "Join CSVs", "Match two files by a shared key.", "/csv-join"],
  [PackageCheck, "Product CSV checker", "Flag missing prices, SKUs, and duplicate products.", "/product-csv-checker"],
];

const calculators: [LucideIcon, string, string, string][] = [
  [Percent, "Profit margin", "See the margin between cost and selling price.", "/profit-margin-calculator"],
  [Percent, "Markup", "Turn a cost and a markup into a selling price.", "/markup-calculator"],
  [Landmark, "Sales tax", "Add or remove a sales-tax rate.", "/sales-tax-calculator"],
  [Timer, "Freelance rate", "Turn an income goal into an hourly rate.", "/freelance-rate-calculator"],
  [AlarmClock, "Late fee", "Estimate a fee from an amount, rate, and days.", "/late-fee-calculator"],
  [Scale, "Break-even", "Find how many units cover your fixed costs.", "/break-even-calculator"],
  [Percent, "Discount", "See the price after a percentage off.", "/discount-calculator"],
  [CalendarClock, "Invoice due date", "Add a number of days to an issue date.", "/invoice-due-date-calculator"],
];

function Cards({ items }: { items: [LucideIcon, string, string, string][] }) {
  return (
    <div className="tool-grid">
      {items.map(([Icon, name, line, href]) => (
        <Link className="tool-card" href={href} key={href}>
          <span className="tool-icon"><Icon size={20} strokeWidth={1.75} /></span>
          <strong>{name}</strong>
          <span>{line}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="landing">
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <section className="hero">
        <div>
          <span className="badge">Free business tools</span>
          <h1>Free invoices, quotes and spreadsheet tools</h1>
          <p>Create client paperwork or tidy a spreadsheet in your browser.</p>
          <div className="hero-actions">
            <Link className="btn-primary" href="/invoice-generator">Create an invoice</Link>
            <a className="btn-secondary" href="#tools">Browse all tools</a>
          </div>
          <div className="trust-row">
            <span><Check size={16} /> Free</span>
            <span><Check size={16} /> No sign-up</span>
            <span><Check size={16} /> Files stay in your browser</span>
          </div>
        </div>
        <div className="hero-art">
          <Image src="/invoice-sample.png" alt="Sample invoice from Northwind Studio to Sample Client LLC" width={920} height={640} priority />
        </div>
      </section>
      <section id="tools" className="tool-groups">
        <div><h2>Documents</h2><Cards items={documents} /></div>
        <div><h2>Spreadsheets</h2><Cards items={sheets} /></div>
        <div><h2>Calculators</h2><Cards items={calculators} /></div>
      </section>
      <section className="home-section">
        <h2>How it works</h2>
        <div className="steps">
          <article><span className="step-no">1</span><h3>Prepare a quote</h3><p>Describe the work, quantities, and prices, then share the PDF.</p></article>
          <article><span className="step-no">2</span><h3>Send an invoice</h3><p>List the finished work and download a payment request.</p></article>
          <article><span className="step-no">3</span><h3>Follow up if needed</h3><p>Draft a reminder and copy it into your email app.</p></article>
          <article><span className="step-no">4</span><h3>Record a payment</h3><p>Create a receipt for the amount you received.</p></article>
        </div>
      </section>
      <section className="home-section">
        <h2>Guides</h2>
        <div className="tool-grid">
          <Link className="tool-card" href="/guides/invoice-vs-quote"><span className="tool-icon"><FileSignature size={20} /></span><strong>Invoice vs. quote</strong><span>When to use each document.</span></Link>
          <Link className="tool-card" href="/guides/how-to-write-an-invoice"><span className="tool-icon"><FileText size={20} /></span><strong>How to write an invoice</strong><span>A short checklist before you send it.</span></Link>
          <Link className="tool-card" href="/guides"><span className="tool-icon"><Sheet size={20} /></span><strong>All guides</strong><span>Answers for invoices, quotes, and CSV files.</span></Link>
        </div>
      </section>
    </main>
  );
}
