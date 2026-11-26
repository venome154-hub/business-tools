"use client";

import Link from "next/link";
import { useState } from "react";
import LogoMark from "@/components/LogoMark";

const documents = [
  { href: "/invoice-generator", label: "Invoice" },
  { href: "/quote-generator", label: "Quote" },
  { href: "/estimate-generator", label: "Estimate" },
  { href: "/receipt-generator", label: "Receipt" },
  { href: "/payment-reminder-generator", label: "Payment reminder" },
  { href: "/purchase-order", label: "Purchase order" },
  { href: "/credit-note", label: "Credit note" },
  { href: "/delivery-note", label: "Delivery note" },
  { href: "/timesheet-invoice", label: "Timesheet invoice" },
  { href: "/rent-receipt", label: "Rent receipt" },
  { href: "/donation-receipt", label: "Donation receipt" },
  { href: "/my-documents", label: "My documents" },
];

const csvTools = [
  { href: "/csv-cleaner", label: "Cleaner" },
  { href: "/csv-merger", label: "Merger" },
  { href: "/duplicate-sku-finder", label: "Duplicate SKU finder" },
  { href: "/csv-excel", label: "CSV and Excel" },
  { href: "/csv-to-json", label: "CSV to JSON" },
  { href: "/split-csv", label: "Split CSV" },
  { href: "/csv-columns", label: "Remove columns" },
  { href: "/csv-find-replace", label: "Find and replace" },
  { href: "/csv-join", label: "Join by key" },
  { href: "/product-csv-checker", label: "Product CSV checker" },
];

const calculators = [
  { href: "/profit-margin-calculator", label: "Profit margin" },
  { href: "/markup-calculator", label: "Markup" },
  { href: "/sales-tax-calculator", label: "Sales tax" },
  { href: "/freelance-rate-calculator", label: "Freelance rate" },
  { href: "/late-fee-calculator", label: "Late fee" },
  { href: "/break-even-calculator", label: "Break-even" },
  { href: "/discount-calculator", label: "Discount" },
  { href: "/invoice-due-date-calculator", label: "Invoice due date" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState<"documents" | "csv" | "calculators" | "templates" | "mobile" | null>(null);

  function toggle(next: "documents" | "csv" | "calculators" | "templates" | "mobile") {
    setOpen((current) => current === next ? null : next);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" onClick={() => setOpen(null)}><LogoMark /><span>BizToolsBox</span></Link>
        <nav className="site-nav" aria-label="Main navigation">
          <div className="nav-drop">
            <button type="button" aria-expanded={open === "documents"} onClick={() => toggle("documents")}>Documents</button>
            {open === "documents" && (
              <div className="nav-menu" role="menu">
                {documents.map((item) => <Link key={item.href} href={item.href} rel={item.href === "/my-documents" ? "nofollow" : undefined} onClick={() => setOpen(null)}>{item.label}</Link>)}
              </div>
            )}
          </div>
          <div className="nav-drop">
            <button type="button" aria-expanded={open === "csv"} onClick={() => toggle("csv")}>CSV tools</button>
            {open === "csv" && (
              <div className="nav-menu" role="menu">
                {csvTools.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(null)}>{item.label}</Link>)}
              </div>
            )}
          </div>
          <div className="nav-drop">
            <button type="button" aria-expanded={open === "calculators"} onClick={() => toggle("calculators")}>Calculators</button>
            {open === "calculators" && (
              <div className="nav-menu" role="menu">
                {calculators.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(null)}>{item.label}</Link>)}
              </div>
            )}
          </div>
          <div className="nav-drop">
            <button type="button" aria-expanded={open === "templates"} onClick={() => toggle("templates")}>Templates</button>
            {open === "templates" && (
              <div className="nav-menu" role="menu">
                <Link href="/invoice-template" onClick={() => setOpen(null)}>Invoice templates</Link>
                <Link href="/quote-template" onClick={() => setOpen(null)}>Quote templates</Link>
                <Link href="/estimate-template" onClick={() => setOpen(null)}>Estimate templates</Link>
                <Link href="/receipt-template" onClick={() => setOpen(null)}>Receipt templates</Link>
                <Link href="/invoice-requirements" onClick={() => setOpen(null)}>Invoice requirements</Link>
              </div>
            )}
          </div>
          <Link href="/guides">Guides</Link>
        </nav>
        <button className="menu-button" type="button" aria-expanded={open === "mobile"} aria-label="Open menu" onClick={() => toggle("mobile")}>Menu</button>
      </div>
      {open === "mobile" && (
        <nav className="mobile-sheet" aria-label="Mobile navigation">
          <strong>Documents</strong>
          {documents.map((item) => <Link key={item.href} href={item.href} rel={item.href === "/my-documents" ? "nofollow" : undefined} onClick={() => setOpen(null)}>{item.label}</Link>)}
          <strong>CSV tools</strong>
          {csvTools.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(null)}>{item.label}</Link>)}
          <strong>Calculators</strong>
          {calculators.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(null)}>{item.label}</Link>)}
          <strong>Templates</strong>
          <Link href="/invoice-template" onClick={() => setOpen(null)}>Invoice templates</Link>
          <Link href="/quote-template" onClick={() => setOpen(null)}>Quote templates</Link>
          <Link href="/estimate-template" onClick={() => setOpen(null)}>Estimate templates</Link>
          <Link href="/receipt-template" onClick={() => setOpen(null)}>Receipt templates</Link>
          <Link href="/invoice-requirements" onClick={() => setOpen(null)}>Invoice requirements</Link>
          <Link href="/guides" onClick={() => setOpen(null)}>Guides</Link>
          <Link href="/pricing" onClick={() => setOpen(null)}>Pricing</Link>
        </nav>
      )}
    </header>
  );
}
