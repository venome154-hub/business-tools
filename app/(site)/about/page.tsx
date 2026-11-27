import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About BizToolsBox",
  description: "BizToolsBox is a set of free browser-only business tools built by Georgiy T. for invoices, quotes, receipts, and CSV files.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About BizToolsBox", description: "Free browser-only business tools built by Georgiy T.", type: "website", url: "/about" },
};

export default function AboutPage() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <article className="seo-content">
        <h1>About BizToolsBox</h1>
        <p>BizToolsBox is a small set of free tools for invoices, quotes, receipts, payment reminders, and CSV files. Georgiy T. builds and maintains the site so a freelancer or small business can prepare a document or tidy a spreadsheet without creating an account.</p>
        <p>The tools run in your browser. The text you type into a generator, and the CSV you open, stay on your device while you work. Creating a PDF or downloading a cleaned file does not send that content to a BizToolsBox server.</p>
        <p>The site is free to use. It does not claim to be accounting, tax, or legal software. You can keep a business profile and the latest documents in this browser. That copy is not a library on the BizToolsBox server. Download a PDF or CSV if you want a file of your own.</p>
        <p>Optional analytics loads only after you choose Allow analytics. You can change that choice from Cookie / Analytics settings in the footer.</p>
      </article>
    </main>
  );
}
