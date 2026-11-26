import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the free BizToolsBox document and CSV tools.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms of Use", description: "Free use, your responsibility for document content, and limits on liability.", type: "website", url: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <article className="seo-content">
        <h1>Terms of use</h1>
        <p>Last updated November 26, 2026. These terms cover the free tools on BizToolsBox. By using the site you agree to them.</p>
        <h2>Free use</h2>
        <p>The invoice, quote, receipt, payment reminder, calculator, and CSV tools are free. You do not need an account. You may use the files you create for your own business records and for the clients those records describe.</p>
        <h2>Paid plans</h2>
        <p>A paid plan is not offered. There is no checkout, subscription, or price to accept. These terms will be updated before any paid plan is sold. Until then, nothing on the site is a purchase.</p>
        <h2>No warranty on tax or legal correctness</h2>
        <p>The tools format the details you enter. They do not check whether an invoice, quote, receipt, or reminder meets the tax, accounting, or legal rules that apply to you. Totals are calculated from the numbers you type. You are responsible for the content of every document, including names, amounts, tax, and payment instructions.</p>
        <h2>Acceptable use</h2>
        <p>Do not use the tools to create fake or fraudulent receipts or invoices, or to mislead someone about a payment, a debt, or a business relationship. Do not use the site to interfere with the service or with other people&apos;s use of it.</p>
        <h2>Limitation of liability</h2>
        <p>The tools are provided as available, without a warranty of accuracy, fitness for a particular purpose, or uninterrupted access. To the extent the law allows, Georgiy T. is not liable for lost payments, tax assessments, or other losses that come from using a document or CSV you created here.</p>
        <h2>Changes</h2>
        <p>These terms can change when the site changes. The date at the top of this page is the latest revision. Continued use after a change means you accept the revised terms.</p>
      </article>
    </main>
  );
}
