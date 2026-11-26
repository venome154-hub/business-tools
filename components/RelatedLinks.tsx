"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sets: Record<string, { tools: [string, string][]; guides: [string, string][] }> = {
  "/invoice-generator": {
    tools: [["/quote-generator", "Quote generator"], ["/receipt-generator", "Receipt generator"], ["/payment-reminder-generator", "Payment reminder"], ["/timesheet-invoice", "Timesheet invoice"]],
    guides: [["/guides/how-to-write-an-invoice", "How to write an invoice"], ["/guides/how-to-invoice-as-a-freelancer", "How to invoice as a freelancer"]],
  },
  "/quote-generator": {
    tools: [["/invoice-generator", "Invoice generator"], ["/receipt-generator", "Receipt generator"], ["/purchase-order", "Purchase order"], ["/credit-note", "Credit note"]],
    guides: [["/guides/invoice-vs-quote", "Invoice vs. quote"], ["/guides/what-belongs-on-a-quote", "What belongs on a quote"]],
  },
  "/receipt-generator": {
    tools: [["/invoice-generator", "Invoice generator"], ["/rent-receipt", "Rent receipt"], ["/donation-receipt", "Donation receipt"], ["/credit-note", "Credit note"]],
    guides: [["/guides/how-to-write-a-receipt", "How to write a receipt"], ["/guides/partial-payments-on-a-receipt", "Partial payments"]],
  },
  "/payment-reminder-generator": {
    tools: [["/invoice-generator", "Invoice generator"], ["/receipt-generator", "Receipt generator"], ["/late-fee-calculator", "Late fee calculator"], ["/invoice-due-date-calculator", "Due date calculator"]],
    guides: [["/guides/how-to-write-a-late-payment-email", "Late payment email"], ["/guides/what-net-30-means", "What net 30 means"]],
  },
};

const fallback = {
  tools: [["/invoice-generator", "Invoice generator"], ["/quote-generator", "Quote generator"], ["/csv-cleaner", "CSV cleaner"], ["/sales-tax-calculator", "Sales tax calculator"]] as [string, string][],
  guides: [["/guides/invoice-vs-quote", "Invoice vs. quote"], ["/guides/how-to-write-an-invoice", "How to write an invoice"]] as [string, string][],
};

export default function RelatedLinks() {
  const pathname = usePathname();
  const skip = ["/about", "/contact", "/privacy", "/terms", "/pricing", "/refund-policy", "/my-documents"];
  const ownLinks = ["/invoice-template", "/quote-template", "/receipt-template", "/invoice-requirements"];
  if (pathname.startsWith("/embed") || pathname === "/" || pathname.startsWith("/guides") || skip.includes(pathname) || ownLinks.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return null;
  const match = sets[pathname] ?? (pathname.split("/").length >= 2 ? fallback : null);
  if (!match) return null;
  return (
    <aside className="related-links">
      <div>
        <strong>Related tools</strong>
        {match.tools.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
      </div>
      <div>
        <strong>Related guides</strong>
        {match.guides.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
      </div>
    </aside>
  );
}
