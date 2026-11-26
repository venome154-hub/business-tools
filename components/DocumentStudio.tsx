"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, FileText, Landmark, Lock, Palette, Receipt, Trash2, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import AdSlot from "@/components/AdSlot";
import CurrencyField from "@/components/CurrencyField";
import MobileToolBar from "@/components/MobileToolBar";
import { KIND_CONFIG } from "@/lib/document-kinds";
import { blankDocument, blankLine, DOC_PATHS, handoffDocument, takeHandoff, writeHandoff, type DocumentKind, type DocumentState, type LineItem } from "@/lib/document-model";
import { saveDocument } from "@/lib/drafts";
import { acceptDecimal, decimalLabel, displayDate, formatMoney, localDate, parseDecimal, roundMoney } from "@/lib/format";
import { addDays, isCurrencyCode, LOCALES } from "@/lib/locales";
import { readLogoFile } from "@/lib/logo";
import { commitNumber, peekNumber } from "@/lib/numbers";
import type { OfficeDocument } from "@/lib/office-export";
import { downloadBusinessPdf } from "@/lib/pdf";
import { clearProfile, readProfile, writeProfile, type BusinessProfile } from "@/lib/profile";
import { getSiteUrl } from "@/lib/site";

function LocalImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    // Local logos and QR codes are data URLs created in the browser.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}

function moneyOf(state: DocumentState) {
  const lines = state.items.map((item) => {
    const quantity = parseDecimal(item.quantity);
    const price = parseDecimal(item.price);
    const highRaw = (item.priceHigh ?? "").trim() ? parseDecimal(item.priceHigh ?? "") : price;
    const priceHigh = highRaw > price ? highRaw : price;
    const amount = roundMoney(quantity * price);
    const amountHigh = roundMoney(quantity * priceHigh);
    const taxRate = state.perLineTax ? Math.min(100, parseDecimal(item.tax)) : 0;
    return { description: item.description, quantityLabel: decimalLabel(item.quantity), quantity, price, priceHigh, amount, amountHigh, taxRate };
  });
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.amount, 0));
  const subtotalHigh = roundMoney(lines.reduce((sum, line) => sum + line.amountHigh, 0));
  const discountRate = Math.min(100, parseDecimal(state.discount));
  const discountAmount = roundMoney(subtotal * (discountRate / 100));
  const discountHigh = roundMoney(subtotalHigh * (discountRate / 100));
  const net = roundMoney(Math.max(0, subtotal - discountAmount));
  const netHigh = roundMoney(Math.max(0, subtotalHigh - discountHigh));
  const taxAmount = state.perLineTax
    ? roundMoney(lines.reduce((sum, line) => sum + roundMoney(line.amount * (1 - discountRate / 100) * (line.taxRate / 100)), 0))
    : roundMoney(net * (Math.min(100, parseDecimal(state.tax)) / 100));
  const taxHigh = state.perLineTax
    ? roundMoney(lines.reduce((sum, line) => sum + roundMoney(line.amountHigh * (1 - discountRate / 100) * (line.taxRate / 100)), 0))
    : roundMoney(netHigh * (Math.min(100, parseDecimal(state.tax)) / 100));
  const shipping = roundMoney(parseDecimal(state.shipping));
  const total = roundMoney(net + taxAmount + shipping);
  const totalHigh = roundMoney(netHigh + taxHigh + shipping);
  return { lines, subtotal, subtotalHigh, discountRate, discountAmount, discountHigh, taxAmount, taxHigh, shipping, total, totalHigh };
}

export default function DocumentStudio({
  kind,
  defaults,
  headingLevel = 1,
  preferredFormat,
}: {
  kind: DocumentKind;
  defaults?: { currency?: string; locale?: string; notes?: string; terms?: string; items?: { description: string; quantity: string; price: string; priceHigh?: string }[] };
  headingLevel?: 1 | 2;
  preferredFormat?: "pdf" | "docx" | "xlsx";
}) {
  const config = KIND_CONFIG[kind];
  const router = useRouter();
  const [state, setState] = useState<DocumentState>(() => blankDocument(kind));
  const [draftId, setDraftId] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [exporting, setExporting] = useState<"" | "pdf" | "docx" | "xlsx">("");
  const [currencyValid, setCurrencyValid] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [qr, setQr] = useState("");
  const [madeWith, setMadeWith] = useState(true);
  const defaultsKey = JSON.stringify(defaults ?? null);

  useEffect(() => {
    setMadeWith(localStorage.getItem("biztoolsbox-made-with") !== "off");
  }, []);

  useEffect(() => {
    const next = blankDocument(kind);
    const profile = readProfile();
    if (profile) {
      next.company = profile.name;
      next.companyEmail = profile.email;
      next.companyAddress = profile.address;
      next.logoDataUrl = profile.logoDataUrl;
      next.currency = profile.currency || next.currency;
      next.paymentInfo = profile.paymentInstructions;
      next.accent = profile.accent || next.accent;
      next.locale = profile.locale || next.locale;
      next.template = profile.template;
      next.pageSize = profile.pageSize;
    }
    const preset = defaultsKey ? JSON.parse(defaultsKey) as NonNullable<typeof defaults> : null;
    if (preset?.currency) next.currency = preset.currency;
    if (preset?.locale) next.locale = preset.locale;
    if (preset?.notes) next.notes = preset.notes;
    if (preset?.terms) next.terms = preset.terms;
    if (preset?.items?.length) next.items = preset.items.map((item) => ({ ...item, tax: "", priceHigh: item.priceHigh ?? "" }));
    const handoff = takeHandoff(kind);
    if (handoff?.payload) {
      Object.assign(next, handoff.payload);
      next.previouslyPaid = handoff.payload.previouslyPaid ?? "";
    }
    if (!isCurrencyCode(next.currency)) next.currency = "USD";
    if (!next.date) next.date = localDate();
    if (!next.number) next.number = peekNumber(config.prefix);
    if (handoff?.draftId) setDraftId(handoff.draftId);
    setState(next);
  }, [kind, config.prefix, defaultsKey]);

  useEffect(() => {
    const link = state.paymentLink.trim();
    if (!config.paymentLink || !link) {
      setQr("");
      return;
    }
    let cancel = false;
    import("qrcode").then((QR) => QR.toDataURL(link, { margin: 1, width: 256 })).then((url) => {
      if (!cancel) setQr(url);
    }).catch(() => { if (!cancel) setQr(""); });
    return () => { cancel = true; };
  }, [config.paymentLink, state.paymentLink]);

  const figures = useMemo(() => moneyOf(state), [state]);
  const paidSpecified = config.paid && state.amountPaid.trim() !== "";
  const paid = paidSpecified ? roundMoney(parseDecimal(state.amountPaid)) : 0;
  const prior = roundMoney(parseDecimal(state.previouslyPaid || ""));
  const balance = roundMoney(figures.total - prior - paid);
  const HeadingTag = headingLevel === 2 ? "h2" : "h1";

  function patch(partial: Partial<DocumentState>) {
    setState((current) => ({ ...current, ...partial }));
  }

  function updateLine(index: number, field: keyof LineItem, value: string) {
    setState((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        if (field === "description") return { ...item, description: value };
        const max = field === "tax" ? 100 : undefined;
        const next = acceptDecimal(value, max);
        if (next.value === undefined) { setError(next.error); return item; }
        setError(next.error);
        return { ...item, [field]: next.value };
      }),
    }));
  }

  function updateAmount(field: "tax" | "discount" | "shipping" | "amountPaid", value: string) {
    const next = acceptDecimal(value, field === "tax" || field === "discount" ? 100 : undefined);
    if (next.value === undefined) { setError(next.error); return; }
    setError(next.error);
    patch({ [field]: next.value });
  }

  async function onLogo(file: File | undefined) {
    if (!file) return;
    try {
      patch({ logoDataUrl: await readLogoFile(file) });
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The logo could not be read.");
    }
  }

  function profileFromState(): BusinessProfile {
    return {
      name: state.company,
      email: state.companyEmail,
      address: state.companyAddress,
      logoDataUrl: state.logoDataUrl,
      currency: state.currency,
      paymentInstructions: state.paymentInfo,
      accent: state.accent,
      locale: state.locale,
      template: state.template,
      pageSize: state.pageSize,
    };
  }

  async function persistDraft() {
    if (!currencyValid) return "";
    const id = draftId || crypto.randomUUID();
    await saveDocument({
      id,
      kind,
      label: state.client || state.company || config.heading,
      number: state.number,
      updatedAt: Date.now(),
      payload: state,
    });
    commitNumber(config.prefix, state.number);
    setDraftId(id);
    return id;
  }

  const office = kind === "invoice" || kind === "quote" || kind === "receipt" || kind === "estimate";

  function noteList() {
    return [
      ...(config.paymentInfo && state.paymentInfo ? [{ title: "Payment instructions", text: state.paymentInfo }] : []),
      ...(config.lateFee && state.lateFee ? [{ title: "Late fee", text: state.lateFee }] : []),
      ...(config.termsBlock && state.terms ? [{ title: config.termsLabel || "Terms and conditions", text: state.terms }] : []),
      ...(state.notes ? [{ title: "Notes", text: state.notes }] : []),
      ...(config.note ? [{ title: "Note", text: config.note }] : []),
      ...(config.method && state.paymentMethod ? [{ title: "Payment method", text: [state.paymentMethod, state.paymentReference].filter(Boolean).join(" · ") }] : []),
    ];
  }

  function officeModel(): OfficeDocument {
    return {
      filename: state.number || config.prefix,
      title: config.pdfTitle,
      template: state.template,
      accent: state.accent,
      currency: state.currency,
      locale: state.locale,
      meta: [
        `${config.numberLabel}: ${state.number || "—"}`,
        `Date: ${displayDate(state.date, state.locale) || "—"}`,
        ...(config.due && state.dueDate ? [`Due: ${displayDate(state.dueDate, state.locale)}`] : []),
        ...(config.validity && state.validUntil ? [`Valid until: ${displayDate(state.validUntil, state.locale)}`] : []),
        ...(config.po && state.poNumber ? [`PO: ${state.poNumber}`] : []),
        ...(config.related && state.relatedNumber ? [`Related: ${state.relatedNumber}`] : []),
      ],
      fromTitle: "From",
      fromLines: [state.company, state.companyAddress, state.companyEmail].filter(Boolean),
      toTitle: config.party,
      toLines: [state.client, state.clientAddress, state.clientEmail, state.property, state.period].filter(Boolean),
      qtyHeader: config.qty,
      priceHeader: config.price,
      lines: figures.lines.map((line) => ({
        description: line.description,
        quantity: line.quantity,
        price: line.price,
        priceHigh: line.priceHigh,
        taxRate: line.taxRate,
      })),
      perLineTax: state.perLineTax,
      discountRate: figures.discountRate,
      taxRate: state.perLineTax ? 0 : Math.min(100, parseDecimal(state.tax)),
      shipping: config.shipping ? figures.shipping : null,
      previouslyPaid: prior > 0 ? prior : null,
      amountPaid: paidSpecified ? paid : null,
      paidLabel: config.paidLabel,
      totalLabel: kind === "credit-note" ? "Amount credited" : "Total",
      notes: noteList(),
      signature: state.signature || state.acceptedBy,
      signatureLabel: state.acceptedBy ? "Accepted by" : "Signature",
      madeWith,
      madeWithUrl: getSiteUrl(),
    };
  }

  async function downloadPDF() {
    if (exporting || !currencyValid) return;
    setExporting("pdf");
    setError("");
    try {
      const money = (amount: number) => formatMoney(amount, state.currency, state.locale);
      const span = (low: number, high: number) => high > low ? `${money(low)} – ${money(high)}` : money(low);
      const columns = config.prices
        ? [
            { header: "Description", width: state.perLineTax ? 0.4 : 0.52, align: "left" as const },
            { header: config.qty, width: 0.12, align: "right" as const },
            { header: config.price, width: 0.18, align: "right" as const },
            ...(state.perLineTax ? [{ header: "Tax %", width: 0.12, align: "right" as const }] : []),
            { header: "Amount", width: 0.18, align: "right" as const },
          ]
        : [
            { header: "Description", width: 0.72, align: "left" as const },
            { header: config.qty, width: 0.28, align: "right" as const },
          ];
      await downloadBusinessPdf({
        filename: state.number || config.prefix,
        title: config.pdfTitle,
        template: state.template,
        pageSize: state.pageSize,
        accent: state.accent,
        logoDataUrl: state.logoDataUrl,
        qrDataUrl: qr,
        signature: state.signature || state.acceptedBy,
        signatureLabel: state.acceptedBy ? "Accepted by" : "Signature",
        meta: [
          `${config.numberLabel}: ${state.number || "—"}`,
          `Date: ${displayDate(state.date, state.locale) || "—"}`,
          ...(config.due && state.dueDate ? [`Due: ${displayDate(state.dueDate, state.locale)}`] : []),
          ...(config.validity && state.validUntil ? [`Valid until: ${displayDate(state.validUntil, state.locale)}`] : []),
          ...(config.po && state.poNumber ? [`PO: ${state.poNumber}`] : []),
          ...(config.related && state.relatedNumber ? [`Related: ${state.relatedNumber}`] : []),
        ],
        blocks: [
          { title: "FROM", lines: [state.company, state.companyAddress, state.companyEmail] },
          { title: config.party.toUpperCase(), lines: [state.client, state.clientAddress, state.clientEmail, state.property, state.period] },
        ],
        columns,
        rows: figures.lines.map((line, index) => config.prices
          ? [line.description, line.quantityLabel, span(line.price, line.priceHigh), ...(state.perLineTax ? [decimalLabel(state.items[index]?.tax || "0")] : []), span(line.amount, line.amountHigh)]
          : [line.description, line.quantityLabel]),
        totals: config.prices ? [
          { label: "Subtotal", value: span(figures.subtotal, figures.subtotalHigh) },
          ...(figures.discountRate > 0 ? [{ label: `Discount (${decimalLabel(state.discount)}%)`, value: `-${span(figures.discountAmount, figures.discountHigh)}` }] : []),
          ...(figures.taxAmount > 0 || figures.taxHigh > 0 ? [{ label: "Tax", value: span(figures.taxAmount, figures.taxHigh) }] : []),
          ...(figures.shipping > 0 ? [{ label: "Shipping", value: money(figures.shipping) }] : []),
          { label: kind === "credit-note" ? "Amount credited" : "Total", value: span(figures.total, figures.totalHigh), emphasize: true },
          ...(prior > 0 ? [{ label: "Previously paid", value: money(prior) }] : []),
          ...(paidSpecified ? [{ label: config.paidLabel, value: money(paid) }, { label: "Balance", value: money(balance), emphasize: true }] : []),
        ] : [],
        notes: noteList(),
        footer: "Prepared in your browser. You are responsible for the content of this document.",
        madeWith,
      });
      await persistDraft();
      trackEvent("document_download", { tool_name: kind });
      setNotice("PDF downloaded. A copy of this document is saved on this device.");
    } catch {
      setError("The PDF could not be created. Check the details and try again.");
    } finally {
      setExporting("");
    }
  }

  async function downloadOffice(format: "docx" | "xlsx") {
    if (exporting || !currencyValid) return;
    setExporting(format);
    setError("");
    try {
      const { downloadOfficeDocument } = await import("@/lib/office-export");
      await downloadOfficeDocument(format, officeModel());
      await persistDraft();
      trackEvent("document_download", { tool_name: kind, file_format: format });
      setNotice(format === "docx"
        ? "Word document downloaded. A copy of this document is saved on this device."
        : "Excel workbook downloaded. A copy of this document is saved on this device.");
    } catch {
      setError(format === "docx"
        ? "The Word document could not be created. Check the details and try again."
        : "The Excel workbook could not be created. Check the details and try again.");
    } finally {
      setExporting("");
    }
  }

  function sendTo(target: string) {
    if (!currencyValid) return;
    if (target === "reminder") {
      writeHandoff({
        to: "reminder",
        reminder: {
          business: state.company,
          client: state.client,
          invoiceNo: state.number,
          amount: String(Math.max(0, balance)),
          currency: state.currency,
          dueDate: state.dueDate,
        },
      });
    } else {
      const payload: DocumentState = handoffDocument(state, target);
      if (target === "receipt") {
        const priorText = state.amountPaid.trim();
        const priorAmount = priorText ? roundMoney(parseDecimal(priorText)) : 0;
        const stillDue = roundMoney(Math.max(0, figures.total - priorAmount));
        payload.relatedNumber = state.number;
        payload.previouslyPaid = priorText ? String(priorAmount) : "";
        payload.amountPaid = String(stillDue);
        payload.dueDate = "";
        payload.validUntil = "";
        payload.paymentTerms = "";
      }
      writeHandoff({ to: target, payload });
    }
    router.push(DOC_PATHS[target]);
  }

  const dateLabel = displayDate(state.date, state.locale);
  const preferred = preferredFormat ?? "pdf";
  const pdfLabel = exporting === "pdf" ? "Preparing PDF…" : "Download PDF";
  const wordLabel = exporting === "docx" ? "Preparing Word…" : "Download Word";
  const excelLabel = exporting === "xlsx" ? "Preparing Excel…" : "Download Excel";
  const fillLine = preferred === "docx" ? "Fill it online, then download as Word." : preferred === "xlsx" ? "Fill it online, then download as Excel." : "Fill it online, then download as PDF.";
  const downloadClass = (format: "pdf" | "docx" | "xlsx") => (format === preferred ? "download" : "secondary");

  return (
    <section className="invoice-layout">
      <div className="editor">
        <div className="heading">
          <div>
            <span className="badge"><Lock size={14} aria-hidden="true" /> Stays in your browser</span>
            <HeadingTag>{config.heading}</HeadingTag>
            <p>{config.lede}</p>
          </div>
          <div className="download-actions">
            {office && preferred === "docx" && <button className={downloadClass("docx")} type="button" onClick={() => downloadOffice("docx")} disabled={Boolean(exporting) || !currencyValid}><Download size={18} aria-hidden="true" />{wordLabel}</button>}
            {office && preferred === "xlsx" && <button className={downloadClass("xlsx")} type="button" onClick={() => downloadOffice("xlsx")} disabled={Boolean(exporting) || !currencyValid}><Download size={18} aria-hidden="true" />{excelLabel}</button>}
            <button className={downloadClass("pdf")} type="button" onClick={downloadPDF} disabled={Boolean(exporting) || !currencyValid}>{preferred === "pdf" && <Download size={18} aria-hidden="true" />}{pdfLabel}</button>
            {office && preferred !== "docx" && <button className={downloadClass("docx")} type="button" onClick={() => downloadOffice("docx")} disabled={Boolean(exporting) || !currencyValid}>{wordLabel}</button>}
            {office && preferred !== "xlsx" && <button className={downloadClass("xlsx")} type="button" onClick={() => downloadOffice("xlsx")} disabled={Boolean(exporting) || !currencyValid}>{excelLabel}</button>}
          </div>
          {preferredFormat && <p className="field-note">{fillLine}</p>}
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {notice && <p className="field-note">{notice}</p>}

        <details className="field-card" open>
        <summary><span className="tool-icon"><UserRound size={20} /></span><h2>Your business</h2></summary>
        <div className="grid two">
          <label>Business or name<input value={state.company} onChange={(event) => patch({ company: event.target.value })} /></label>
          <label>Business email<input type="email" value={state.companyEmail} onChange={(event) => patch({ companyEmail: event.target.value })} /></label>
          <label className="full-field">Business address<textarea rows={2} value={state.companyAddress} onChange={(event) => patch({ companyAddress: event.target.value })} /></label>
        </div>
        <div className="profile-actions">
          <button type="button" className="secondary" onClick={() => { writeProfile(profileFromState()); setNotice("Business details saved in this browser."); }}>Save business details</button>
          <button type="button" className="btn-ghost" onClick={() => { clearProfile(); setNotice("Saved business details were removed from this browser."); }}>Clear saved details</button>
        </div>

        </details>
        <details className="field-card" open>
        <summary><span className="tool-icon"><FileText size={20} /></span><h2>{config.party}</h2></summary>
        <div className="grid two">
          <label>Name<input value={state.client} onChange={(event) => patch({ client: event.target.value })} /></label>
          <label>Email<input type="email" value={state.clientEmail} onChange={(event) => patch({ clientEmail: event.target.value })} /></label>
          <label className="full-field">Address<textarea rows={2} value={state.clientAddress} onChange={(event) => patch({ clientAddress: event.target.value })} /></label>
          {config.property && <label className="full-field">Property<textarea rows={2} value={state.property} onChange={(event) => patch({ property: event.target.value })} /></label>}
          {config.property && <label>Rent period<input value={state.period} onChange={(event) => patch({ period: event.target.value })} placeholder="March 2026" /></label>}
        </div>

        </details>
        <details className="field-card" open>
        <summary><span className="tool-icon"><Receipt size={20} /></span><h2>Document details</h2></summary>
        <div className="grid two">
          <label>{config.numberLabel}<input value={state.number} onChange={(event) => patch({ number: event.target.value })} /></label>
          <label>Date<input type="date" value={state.date} onChange={(event) => patch({ date: event.target.value })} /></label>
          {config.due && <label>Due date<input type="date" value={state.dueDate} onChange={(event) => patch({ dueDate: event.target.value })} /></label>}
          {config.validity && <label>Valid until<input type="date" value={state.validUntil} onChange={(event) => patch({ validUntil: event.target.value })} /></label>}
          {config.related && <label>Related invoice<input value={state.relatedNumber} onChange={(event) => patch({ relatedNumber: event.target.value })} /></label>}
          {config.po && <label>PO number<input value={state.poNumber} onChange={(event) => patch({ poNumber: event.target.value })} /></label>}
          <CurrencyField value={state.currency} onChange={(currency) => patch({ currency })} onValidChange={setCurrencyValid} />
          <label>Number and date format
            <select value={state.locale} onChange={(event) => patch({ locale: event.target.value })}>
              {LOCALES.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
          </label>
          {config.termsSelect && (
            <label>Payment terms
              <select value={state.paymentTerms} onChange={(event) => {
                const paymentTerms = event.target.value as DocumentState["paymentTerms"];
                const days = paymentTerms === "due" ? 0 : Number(paymentTerms);
                patch({ paymentTerms, dueDate: paymentTerms && state.date && Number.isFinite(days) ? addDays(state.date, days) : state.dueDate });
              }}>
                <option value="">Custom due date</option>
                <option value="due">Due on receipt</option>
                <option value="7">Net 7</option>
                <option value="15">Net 15</option>
                <option value="30">Net 30</option>
              </select>
            </label>
          )}
          {config.method && (
            <label>Payment method
              <select value={state.paymentMethod} onChange={(event) => patch({ paymentMethod: event.target.value })}>
                {["Bank transfer", "Cash", "Card", "PayPal", "Check", "Other"].map((method) => <option key={method}>{method}</option>)}
              </select>
            </label>
          )}
          {config.method && <label>Payment reference<input value={state.paymentReference} onChange={(event) => patch({ paymentReference: event.target.value })} /></label>}
        </div>

        </details>
        <details className="field-card" open>
        <summary><span className="tool-icon"><Palette size={20} /></span><h2>Appearance</h2></summary>
        <div className="grid two">
          <label>Template
            <select value={state.template} onChange={(event) => patch({ template: event.target.value as DocumentState["template"] })}>
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
            </select>
          </label>
          <label>Page size
            <select value={state.pageSize} onChange={(event) => patch({ pageSize: event.target.value as DocumentState["pageSize"] })}>
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
          </label>
          <label>Accent color<input type="color" value={state.accent} onChange={(event) => patch({ accent: event.target.value })} /></label>
          <label>Logo (PNG, JPG, or SVG)<input type="file" accept="image/png,image/jpeg,image/svg+xml,.png,.jpg,.jpeg,.svg" onChange={(event) => onLogo(event.target.files?.[0])} /></label>
          <label className="check-line"><input type="checkbox" checked={madeWith} onChange={(event) => { setMadeWith(event.target.checked); localStorage.setItem("biztoolsbox-made-with", event.target.checked ? "on" : "off"); }} /> Made with BizToolsBox on the download</label>
        </div>

        </details>
        <details className="field-card" open>
        <summary><span className="tool-icon"><FileText size={20} /></span><h2>{config.lines ? "Line items" : "Amount"}</h2></summary>
        {config.lines ? (
          <>
            <div className="items">
              <div className={`line-head${state.perLineTax ? " with-tax" : ""}${config.range ? " with-range" : ""}`} aria-hidden="true"><span>Description</span><span>Qty</span>{config.prices && <span>{config.range ? "Low" : "Price"}</span>}{config.range && <span>High</span>}{state.perLineTax && <span>Tax</span>}{config.prices && <span>Amount</span>}<span /></div>
              {state.items.map((item, index) => (
                <div className={`item${state.perLineTax ? " with-tax" : ""}${config.range ? " with-range" : ""}`} key={index}>
                  <input aria-label={`Description for item ${index + 1}`} value={item.description} onChange={(event) => updateLine(index, "description", event.target.value)} />
                  <input aria-label={`${config.qty} for item ${index + 1}`} inputMode="decimal" value={item.quantity} onChange={(event) => updateLine(index, "quantity", event.target.value)} />
                  {config.prices && <input aria-label={`${config.range ? "Low price" : config.price} for item ${index + 1}`} inputMode="decimal" value={item.price} onChange={(event) => updateLine(index, "price", event.target.value)} />}
                  {config.range && <input aria-label={`High price for item ${index + 1}`} inputMode="decimal" value={item.priceHigh || ""} onChange={(event) => updateLine(index, "priceHigh", event.target.value)} />}
                  {state.perLineTax && <input aria-label={`Tax percent for item ${index + 1}`} inputMode="decimal" value={item.tax} placeholder="Tax %" onChange={(event) => updateLine(index, "tax", event.target.value)} />}
                  {config.prices && <span className="line-amount">{(figures.lines[index]?.amountHigh || 0) > (figures.lines[index]?.amount || 0) ? `${formatMoney(figures.lines[index]?.amount || 0, state.currency, state.locale)} – ${formatMoney(figures.lines[index]?.amountHigh || 0, state.currency, state.locale)}` : formatMoney(figures.lines[index]?.amount || 0, state.currency, state.locale)}</span>}
                  <button className="icon" type="button" onClick={() => patch({ items: state.items.filter((_, itemIndex) => itemIndex !== index) })} aria-label="Remove item"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <button className="secondary" type="button" onClick={() => patch({ items: [...state.items, blankLine("New item")] })}>+ Add item</button>
          </>
        ) : (
          <label>{config.price}<input inputMode="decimal" value={state.items[0]?.price || ""} onChange={(event) => updateLine(0, "price", event.target.value)} /></label>
        )}
        {config.perLine && <label className="check-line"><input type="checkbox" checked={state.perLineTax} onChange={(event) => patch({ perLineTax: event.target.checked })} /> Tax each line separately</label>}
        </details>
        <details className="field-card" open>
        <summary><span className="tool-icon"><Landmark size={20} /></span><h2>Totals</h2></summary>
        <div className="grid two totals-inputs">
          {config.tax && !state.perLineTax && <label>Tax %<input inputMode="decimal" value={state.tax} onChange={(event) => updateAmount("tax", event.target.value)} /></label>}
          {config.discount && <label>Discount %<input inputMode="decimal" value={state.discount} onChange={(event) => updateAmount("discount", event.target.value)} /></label>}
          {config.shipping && <label>Shipping<input inputMode="decimal" value={state.shipping} onChange={(event) => updateAmount("shipping", event.target.value)} /></label>}
          {kind === "receipt" && <label>Previously paid<input inputMode="decimal" value={state.previouslyPaid || ""} onChange={(event) => {
            const next = acceptDecimal(event.target.value);
            if (next.value === undefined) { setError(next.error); return; }
            setError(next.error);
            patch({ previouslyPaid: next.value });
          }} /></label>}
          {config.paid && <label>{config.paidLabel}<input inputMode="decimal" value={state.amountPaid} onChange={(event) => updateAmount("amountPaid", event.target.value)} /></label>}
        </div>
        {config.prices && (
          <div className="totals-readout">
            <div>Subtotal <span>{formatMoney(figures.subtotal, state.currency, state.locale)}</span></div>
            <div>Discount <span>{formatMoney(figures.discountAmount, state.currency, state.locale)}</span></div>
            <div>Tax <span>{formatMoney(figures.taxAmount, state.currency, state.locale)}</span></div>
            <div>Shipping <span>{formatMoney(figures.shipping, state.currency, state.locale)}</span></div>
            <div className="grand">Total <span>{figures.totalHigh > figures.total ? `${formatMoney(figures.total, state.currency, state.locale)} – ${formatMoney(figures.totalHigh, state.currency, state.locale)}` : formatMoney(figures.total, state.currency, state.locale)}</span></div>
            <div className="balance-due">Balance due <span>{formatMoney(Math.max(0, balance), state.currency, state.locale)}</span></div>
          </div>
        )}
        </details>
        <details className="field-card" open>
        <summary><span className="tool-icon"><Receipt size={20} /></span><h2>{config.detailsHeading || "Payment"}</h2></summary>
        <div className="grid two">
          {config.paymentInfo && <label className="full-field">Payment instructions<textarea rows={3} value={state.paymentInfo} onChange={(event) => patch({ paymentInfo: event.target.value })} /></label>}
          {config.paymentLink && <label className="full-field">Payment link<textarea rows={2} value={state.paymentLink} onChange={(event) => patch({ paymentLink: event.target.value })} placeholder="https://" /></label>}
          {config.lateFee && <label className="full-field">Late-fee note<textarea rows={2} value={state.lateFee} onChange={(event) => patch({ lateFee: event.target.value })} /></label>}
          {config.termsBlock && <label className="full-field">{config.termsLabel || "Terms and conditions"}<textarea rows={3} value={state.terms} onChange={(event) => patch({ terms: event.target.value })} /></label>}
          <label className="full-field">Notes<textarea rows={3} value={state.notes} onChange={(event) => patch({ notes: event.target.value })} /></label>
          {config.signature && <label>Signature name<input value={state.signature} onChange={(event) => patch({ signature: event.target.value })} /></label>}
          {config.accepted && <label>Accepted by<input value={state.acceptedBy} onChange={(event) => patch({ acceptedBy: event.target.value })} /></label>}
        </div>
        {config.note && <p className="quote-note">{config.note}</p>}
        <div className="profile-actions">
          <button type="button" className="secondary" onClick={async () => { if (!currencyValid) return; await persistDraft(); setNotice("Saved in My documents on this device."); }} disabled={!currencyValid}>Save on this device</button>
          {config.chain.map((link) => <button key={link.to} type="button" className="secondary" onClick={() => sendTo(link.to)} disabled={!currencyValid}>{link.label}</button>)}
        </div>
        </details>
      </div>

      <aside className={`preview${previewOpen ? " is-open" : ""}`}>
        <div className={`paper template-${state.template}`} style={{ borderTopColor: state.accent }}>
          {state.logoDataUrl && <LocalImage className="paper-logo" src={state.logoDataUrl} alt="" />}
          <div className="paper-top"><strong style={{ color: state.accent }}>{config.pdfTitle}</strong><span>{state.number || "—"}</span></div>
          <div className="paper-meta">
            <div><b>{state.company || "Your business"}</b></div>
            {state.companyAddress && <div className="pre-line">{state.companyAddress}</div>}
            {state.companyEmail && <div>{state.companyEmail}</div>}
            <div className="invoice-preview-client"><b>{config.party}</b><br />{state.client || "Name"}</div>
            {state.clientAddress && <div className="pre-line">{state.clientAddress}</div>}
            <div>Date: {dateLabel || "—"}</div>
            {config.due && state.dueDate && <div>Due: {displayDate(state.dueDate, state.locale)}</div>}
            {config.validity && state.validUntil && <div>Valid until: {displayDate(state.validUntil, state.locale)}</div>}
          </div>
          <hr />
          {figures.lines.map((line, index) => (
            <div className="paper-row" key={index}>
              <span>{line.description || "Item"}{config.prices ? ` × ${line.quantityLabel}` : ` · ${line.quantityLabel}`}</span>
              {config.prices && <b>{line.amountHigh > line.amount ? `${formatMoney(line.amount, state.currency, state.locale)} – ${formatMoney(line.amountHigh, state.currency, state.locale)}` : formatMoney(line.amount, state.currency, state.locale)}</b>}
            </div>
          ))}
          {config.prices && (
            <div className="summary">
              <div>Subtotal <span>{formatMoney(figures.subtotal, state.currency, state.locale)}</span></div>
              {figures.discountRate > 0 && <div>Discount <span>-{formatMoney(figures.discountAmount, state.currency, state.locale)}</span></div>}
              {figures.taxAmount > 0 && <div>Tax <span>{formatMoney(figures.taxAmount, state.currency, state.locale)}</span></div>}
              {figures.shipping > 0 && <div>Shipping <span>{formatMoney(figures.shipping, state.currency, state.locale)}</span></div>}
              <div className="grand">{kind === "credit-note" ? "Amount credited" : "Total"} <span>{figures.totalHigh > figures.total ? `${formatMoney(figures.total, state.currency, state.locale)} – ${formatMoney(figures.totalHigh, state.currency, state.locale)}` : formatMoney(figures.total, state.currency, state.locale)}</span></div>
              {prior > 0 && <div>Previously paid <span>{formatMoney(prior, state.currency, state.locale)}</span></div>}
              {paidSpecified && <div>{config.paidLabel} <span>{formatMoney(paid, state.currency, state.locale)}</span></div>}
              {paidSpecified && <div>Balance <span>{formatMoney(balance, state.currency, state.locale)}</span></div>}
            </div>
          )}
          {qr && <LocalImage className="paper-qr" src={qr} alt="Payment link QR code" />}
          {(state.signature || state.acceptedBy) && <p className="sign-line">{state.acceptedBy ? "Accepted by" : "Signature"}: {state.signature || state.acceptedBy}</p>}
        </div>
      </aside>
      <AdSlot place="after-result" />
      <MobileToolBar
        primaryLabel={preferred === "docx" ? wordLabel : preferred === "xlsx" ? excelLabel : pdfLabel}
        onPrimary={preferred === "docx" ? () => downloadOffice("docx") : preferred === "xlsx" ? () => downloadOffice("xlsx") : downloadPDF}
        previewOpen={previewOpen}
        onPreview={() => setPreviewOpen((open) => !open)}
        disabled={Boolean(exporting) || !currencyValid}
        wordLabel={office && preferred !== "docx" ? wordLabel : undefined}
        onWord={office && preferred !== "docx" ? () => downloadOffice("docx") : undefined}
        excelLabel={office && preferred !== "xlsx" ? excelLabel : undefined}
        onExcel={office && preferred !== "xlsx" ? () => downloadOffice("xlsx") : undefined}
        pdfLabel={preferred !== "pdf" ? pdfLabel : undefined}
        onPdf={preferred !== "pdf" ? downloadPDF : undefined}
      />
    </section>
  );
}
