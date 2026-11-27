import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import PaymentReminderGenerator from "@/components/PaymentReminderGenerator";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webApplicationLd, type FaqItem } from "@/lib/schema";

const reminderFaqs: FaqItem[] = [
  { question: "Is the payment reminder generator free?", answer: "Yes. You can draft and copy reminder emails for free without creating an account." },
  { question: "Does it send an email to my client?", answer: "No. It prepares text in your browser for you to review and send from your own email app." },
  { question: "Can I change the tone of the reminder?", answer: "Yes. Choose a friendly, professional, or firm version, then edit the copied draft as needed." },
  { question: "Are the details I enter saved?", answer: "No. The draft is generated in your browser and is not saved to a BizToolsBox account." },
];

export const metadata: Metadata = {
  title: "Free Payment Reminder Email Generator",
  description: "Write a friendly, professional, or firm payment reminder for an unpaid invoice. Customize the details and copy your email for free.",
  alternates: { canonical: "/payment-reminder-generator" },
  openGraph: {
    title: "Free Payment Reminder Email Generator",
    description: "Create and copy a polite payment reminder email for an unpaid invoice.",
    type: "website",
    url: "/payment-reminder-generator",
  },
};

export default function PaymentReminderPage() {
  return (
    <main className="page">
      <JsonLd data={[webApplicationLd("Free Payment Reminder Generator", "/payment-reminder-generator", "Draft a payment reminder email in your browser."), faqLd(reminderFaqs), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Payment reminder", path: "/payment-reminder-generator" }])]} />
      <PaymentReminderGenerator />
      <section className="seo-content" aria-labelledby="reminder-guide-title">
        <h2 id="reminder-guide-title">Write a clear payment reminder email</h2>
        <p>Follow up on an unpaid invoice with a message that fits your relationship with the client. Add the invoice number, remaining amount, and due date, choose a friendly, professional, or firm tone, and copy the draft into your email app. You can include a payment link or a short personal note.</p>

        <h2>How to write a payment reminder</h2>
        <ol>
          <li>Enter the client, invoice number, outstanding amount, and due date.</li>
          <li>Choose the tone that suits the situation.</li>
          <li>Add a payment link or personal note if helpful.</li>
          <li>Review the email and copy it into your email app before sending.</li>
        </ol>
        <p>This tool only drafts text; it does not send email or contact the client. If you need to create or resend the payment request, use the <Link href="/invoice-generator">free invoice generator</Link>. Once payment arrives, record it with the <Link href="/receipt-generator">receipt generator</Link>.</p>

        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details><summary>Is the payment reminder generator free?</summary><p>Yes. You can draft and copy reminder emails for free without creating an account.</p></details>
          <details><summary>Does it send an email to my client?</summary><p>No. It prepares text in your browser for you to review and send from your own email app.</p></details>
          <details><summary>Can I change the tone of the reminder?</summary><p>Yes. Choose a friendly, professional, or firm version, then edit the copied draft as needed.</p></details>
          <details><summary>Are the details I enter saved?</summary><p>No. The draft is generated in your browser and is not saved to a BizToolsBox account.</p></details>
        </div>
      </section>
      <ContextualLinks path="/payment-reminder-generator" />
    </main>
  );
}
