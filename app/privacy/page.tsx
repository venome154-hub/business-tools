import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & Data Practices",
  description: "Learn how BizToolsBox handles information entered into its free invoice and quote generators.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="page">
      <nav className="topbar" aria-label="Main navigation"><Link href="/" className="brand">BizToolsBox</Link><Link href="/guides">Guides</Link></nav>
      <article className="seo-content">
        <span className="badge">PRIVACY & DATA</span>
        <h1>How BizToolsBox handles your information</h1>
        <p><strong>Last updated: October 8, 2026</strong></p>
        <p>This page describes the current behavior of the invoice and quote tools on BizToolsBox. The tools do not require an account.</p>

        <h2>Information you enter into a document</h2>
        <p>Business, client, line item, tax, discount, and payment details are used in your browser to update the preview and generate a PDF. The current tools do not send those document fields to a BizToolsBox database or account, and do not save them on our application server. The PDF is created in your browser and downloaded through your browser.</p>
        <p>Because the details remain visible in the browser while you use the tool, avoid entering information you do not need in the document. Once downloaded, the file is handled by your device and browser.</p>

        <h2>Information processed to host the website</h2>
        <p>The site is hosted by Vercel. Like other hosting providers, Vercel may process technical request information such as IP addresses, log data, and device or usage information to operate and protect its services. Read the <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel Privacy Notice</a> for details about Vercel’s processing.</p>

        <h2>Analytics, advertising, and accounts</h2>
        <p>BizToolsBox currently does not offer user accounts, accept payments, or include an advertising pixel or a site analytics script. We do not use the document contents to create an advertising profile.</p>

        <h2>Third-party services</h2>
        <p>The site links to external services and resources, including Vercel. When you follow an external link, that service’s privacy practices apply to your visit there.</p>

        <h2>Changes to this page</h2>
        <p>If the tools begin storing document data, adding accounts, analytics, or other data uses, this page will be updated to describe the change.</p>
        <p>Return to the <Link href="/">BizToolsBox home page</Link> or open the <Link href="/invoice-generator">invoice generator</Link>.</p>
      </article>
      <footer className="home-footer"><Link href="/">Home</Link><Link href="/guides">Guides</Link></footer>
    </main>
  );
}
