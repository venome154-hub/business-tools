import Link from "next/link";
import { AnalyticsSettingsButton } from "@/components/AnalyticsConsent";
import LogoMark from "@/components/LogoMark";
import { SUPPORT_EMAIL } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <LogoMark />
          <p>Free browser tools for invoices, quotes, receipts, and spreadsheets.</p>
        </div>
        <div>
          <strong>Tools</strong>
          <details className="footer-group">
            <summary>Documents</summary>
            <Link href="/invoice-generator">Invoice generator</Link>
            <Link href="/quote-generator">Quote generator</Link>
            <Link href="/receipt-generator">Receipt generator</Link>
            <Link href="/payment-reminder-generator">Payment reminder</Link>
            <Link href="/purchase-order">Purchase order</Link>
            <Link href="/credit-note">Credit note</Link>
            <Link href="/delivery-note">Delivery note</Link>
            <Link href="/timesheet-invoice">Timesheet invoice</Link>
            <Link href="/rent-receipt">Rent receipt</Link>
            <Link href="/donation-receipt">Donation receipt</Link>
            <Link href="/my-documents" rel="nofollow">My documents</Link>
          </details>
          <details className="footer-group">
            <summary>CSV tools</summary>
            <Link href="/csv-cleaner">CSV cleaner</Link>
            <Link href="/csv-merger">CSV merger</Link>
            <Link href="/duplicate-sku-finder">Duplicate SKU finder</Link>
            <Link href="/csv-excel">CSV and Excel</Link>
            <Link href="/csv-to-json">CSV to JSON</Link>
            <Link href="/split-csv">Split CSV</Link>
            <Link href="/csv-columns">CSV columns</Link>
            <Link href="/csv-find-replace">Find and replace</Link>
            <Link href="/csv-join">Join CSVs</Link>
            <Link href="/product-csv-checker">Product CSV checker</Link>
          </details>
          <details className="footer-group">
            <summary>Calculators</summary>
            <Link href="/profit-margin-calculator">Profit margin</Link>
            <Link href="/markup-calculator">Markup</Link>
            <Link href="/sales-tax-calculator">Sales tax</Link>
            <Link href="/freelance-rate-calculator">Freelance rate</Link>
            <Link href="/late-fee-calculator">Late fee</Link>
            <Link href="/break-even-calculator">Break-even</Link>
            <Link href="/discount-calculator">Discount</Link>
            <Link href="/invoice-due-date-calculator">Due date</Link>
          </details>
        </div>
        <div>
          <strong>Templates</strong>
          <Link href="/invoice-template">Invoice templates</Link>
          <Link href="/quote-template">Quote templates</Link>
          <Link href="/receipt-template">Receipt templates</Link>
          <Link href="/invoice-requirements">Invoice requirements</Link>
          <Link href="/guides">All guides</Link>
          <Link href="/guides/invoice-vs-quote">Invoice vs. quote</Link>
          <Link href="/guides/how-to-write-an-invoice">How to write an invoice</Link>
        </div>
        <div>
          <strong>Company</strong>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <strong>Legal</strong>
          <Link href="/pricing">Pricing</Link>
          <Link href="/refund-policy">Refund policy</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <AnalyticsSettingsButton />
        </div>
        <p className="site-copy">© 2026 Georgiy T. · <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
      </div>
    </footer>
  );
}
