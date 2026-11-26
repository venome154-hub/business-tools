import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/schema";
import { AnalyticsSettingsButton } from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: "Privacy & Data Practices",
  description: "Learn how BizToolsBox handles information entered into its free document and CSV tools.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
      <article className="seo-content">
        <span className="badge">PRIVACY & DATA</span>
        <h1>How BizToolsBox handles your information</h1>
        <p><strong>Last updated: November 26, 2026</strong></p>
        <p>This page describes the current behavior of the invoice, quote, receipt, payment reminder, and CSV tools on BizToolsBox. The tools do not require an account.</p>

        <h2>Information you enter into a document or draft</h2>
        <p>Business, client, line item, tax, discount, payment, and reminder details are processed in your browser to update a preview, generate a PDF, or prepare an email draft. The current tools do not send those fields to a BizToolsBox database or account, and do not save them on our application server. PDFs are created in your browser; reminder emails are copied by you into your email app.</p>
        <p>Because the details remain visible in the browser while you use the tool, avoid entering information you do not need in the document. Once downloaded, the file is handled by your device and browser.</p>

        <h2>Saved on this device</h2>
        <p>If you choose Save business details, the business name, email, address, logo, currency, payment instructions, accent color, template, page size, and locale are stored in localStorage in this browser. Clear saved details removes that profile. If you save a document or download a PDF, the latest 20 documents are stored in IndexedDB on this device so you can open, duplicate, or delete them from My documents. None of that content is sent to a BizToolsBox server.</p>

        <h2>CSV files</h2>
        <p>The CSV cleaner, CSV merger, duplicate SKU finder, and the other spreadsheet tools read the file you choose inside your browser. That file is not uploaded to BizToolsBox and is not saved to an account. A cleaned, merged, converted, or duplicate report is created on your device only when you download it.</p>

        <h2>Information processed to host the website</h2>
        <p>The site is hosted by Vercel. Like other hosting providers, Vercel may process technical request information such as IP addresses, log data, and device or usage information to operate and protect its services. Read the <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel Privacy Notice</a> for details about Vercel’s processing.</p>

        <h2>Google Analytics</h2>
        <p>If you allow analytics, Google Analytics collects information about site visits and usage, including page views as you move between pages, browser and device information, approximate location, and whether a visitor downloads a tool PDF, downloads a CSV result, or copies a reminder draft. The event records only the tool type; it does not include the information entered into the tool or the contents of a CSV. Analytics uses first-party cookies, such as the _ga cookie, to distinguish visits. Analytics is not loaded unless you select “Allow analytics.” You can change your choice at any time below. Google explains its default data collection in the <a href="https://support.google.com/analytics/answer/11593727" target="_blank" rel="noreferrer">Google Analytics data collection guide</a>.</p>
        <p><AnalyticsSettingsButton /></p>

        <h2>Advertising</h2>
        <p>BizToolsBox does not currently serve advertisements. The site has no advertising publisher ID, and it does not load an advertising script or a consent platform for ads. Document and CSV contents are not used to build an advertising profile.</p>
        <p>If advertising is added later, Google or another advertising company may use cookies to show and measure ads. You can review ad controls at <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">Google ad settings</a> and <a href="https://www.aboutads.info" target="_blank" rel="noreferrer">aboutads.info</a>. This page will be updated before any advertising script is added.</p>
        <h2>Accounts and payments</h2>
        <p>BizToolsBox does not offer user accounts and does not accept payments. There is no paid plan to buy.</p>

        <h2>Third-party services</h2>
        <p>The site links to external services and resources, including Vercel. When you follow an external link, that service’s privacy practices apply to your visit there.</p>

        <h2>Changes to this page</h2>
        <p>If the tools begin storing document data, adding accounts, or changing other data uses, this page will be updated to describe the change.</p>
        <p>Return to the <Link href="/">BizToolsBox home page</Link> or open the <Link href="/invoice-generator">invoice generator</Link>.</p>
      </article>
    </main>
  );
}
