"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { sanitizeDecimal } from "@/lib/format";

type Tone = "friendly" | "professional" | "firm";

const localDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const displayDate = (value: string) => {
  if (!value) return "[due date]";
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
};

export default function PaymentReminderGenerator() {
  const [business, setBusiness] = useState("Your Business");
  const [client, setClient] = useState("Client Name");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [amount, setAmount] = useState("250.00");
  const [currency, setCurrency] = useState("USD");
  const [dueDate, setDueDate] = useState(() => localDate(-7));
  const [tone, setTone] = useState<Tone>("friendly");
  const [paymentLink, setPaymentLink] = useState("");
  const [note, setNote] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const email = useMemo(() => {
    const due = displayDate(dueDate);
    const today = localDate(0);
    const timing = !dueDate ? "has the due date shown on the invoice" : dueDate === today ? "is due today" : dueDate > today ? `will be due on ${due}` : `was due on ${due}`;
    const overdue = Boolean(dueDate && dueDate < today);
    const balance = Number(amount);
    const formattedAmount = Number.isFinite(balance)
      ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Math.max(0, balance))
      : new Intl.NumberFormat("en-US", { style: "currency", currency }).format(0);
    const invoice = invoiceNo.trim() || "[invoice number]";
    const recipient = client.trim() || "there";
    const sender = business.trim() || "[your business]";
    const linkLine = paymentLink.trim() ? `\n\nYou can make the payment here: ${paymentLink.trim()}` : "";
    const noteLine = note.trim() ? `\n\n${note.trim()}` : "";

    if (tone === "professional") {
      return {
        subject: `Payment reminder: invoice ${invoice}`,
        body: `Hello ${recipient},\n\nOur records show that invoice ${invoice} for ${formattedAmount} ${timing}. Please arrange payment when convenient.${linkLine}${noteLine}\n\nIf you have already paid, please disregard this reminder. Let me know if you need another copy of the invoice.\n\nKind regards,\n${sender}`,
      };
    }
    if (tone === "firm") {
      return {
        subject: `${overdue ? "Action requested: overdue invoice" : "Payment reminder: invoice"} ${invoice}`,
        body: `Hello ${recipient},\n\nInvoice ${invoice} for ${formattedAmount} ${overdue ? `was due on ${due} and is still outstanding according to our records` : timing}. Please arrange payment or contact us to discuss the balance.${linkLine}${noteLine}\n\nIf payment has already been sent, please reply with the payment date or reference so we can update our records.\n\nRegards,\n${sender}`,
      };
    }
    return {
      subject: `Friendly reminder about invoice ${invoice}`,
      body: `Hi ${recipient},\n\nI hope you're doing well. Just a friendly reminder that invoice ${invoice} for ${formattedAmount} ${timing}.${linkLine}${noteLine}\n\nIf you've already sent payment, please ignore this message. Let me know if you have any questions or need me to resend the invoice.\n\nThanks,\n${sender}`,
    };
  }, [amount, business, client, currency, dueDate, invoiceNo, note, paymentLink, tone]);

  function copyWithTextarea(text: string) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  }

  async function copyEmail() {
    const text = `Subject: ${email.subject}\n\n${email.body}`;
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }
    if (!copied) copied = copyWithTextarea(text);
    if (!copied) {
      setCopyState("failed");
      return;
    }
    trackEvent("reminder_copy", { tool_name: "payment_reminder" });
    setCopyState("copied");
    window.setTimeout(() => setCopyState("idle"), 2200);
  }

  return (
    <section className="invoice-layout">
      <div className="editor">
        <div className="heading">
          <div>
            <span className="badge">100% FREE</span>
            <h1>Payment Reminder Generator</h1>
            <p>Draft a courteous email about an unpaid invoice. Review it, then copy it into your email app.</p>
          </div>
          <button className="download" type="button" onClick={copyEmail}>{copyState === "copied" ? "Copied!" : "Copy email"}</button>
        </div>
        {copyState === "failed" && <p className="form-error" role="alert">The email could not be copied. Select the preview and copy it manually.</p>}

        <div className="grid two">
          <label>Your business name<input value={business} onChange={e => setBusiness(e.target.value)} /></label>
          <label>Client name<input value={client} onChange={e => setClient(e.target.value)} /></label>
          <label>Invoice number<input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} /></label>
          <label>Outstanding amount<input inputMode="decimal" value={amount} onChange={e => setAmount(sanitizeDecimal(e.target.value))} /></label>
          <label>Currency<select value={currency} onChange={e => setCurrency(e.target.value)}><option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option></select></label>
          <label>Due date<input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></label>
          <label>Email tone<select value={tone} onChange={e => setTone(e.target.value as Tone)}><option value="friendly">Friendly</option><option value="professional">Professional</option><option value="firm">Firm</option></select></label>
          <label>Payment link (optional)<input type="url" value={paymentLink} onChange={e => setPaymentLink(e.target.value)} placeholder="https://..." /></label>
          <label className="full-field">Optional personal note<textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Add context or a short message for this client" /></label>
        </div>
        <p className="quote-note">This tool drafts text only. It does not send email or contact your client. Details stay in your browser until you copy the message.</p>
      </div>

      <aside className="preview">
        <div className="paper reminder-paper">
          <span className="badge">EMAIL PREVIEW</span>
          <div className="reminder-subject"><strong>Subject</strong><div>{email.subject}</div></div>
          <hr />
          <pre className="reminder-body">{email.body}</pre>
        </div>
      </aside>
    </section>
  );
}
