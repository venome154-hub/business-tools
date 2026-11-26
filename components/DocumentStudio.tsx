"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import CurrencyField from "@/components/CurrencyField";
import MobileToolBar from "@/components/MobileToolBar";
import { KIND_CONFIG } from "@/lib/document-kinds";
import { blankDocument, blankLine, DOC_PATHS, takeHandoff, writeHandoff, type DocumentKind, type DocumentState, type LineItem } from "@/lib/document-model";
import { saveDocument } from "@/lib/drafts";
import { acceptDecimal, decimalLabel, displayDate, formatMoney, localDate, parseDecimal, roundMoney } from "@/lib/format";
import { addDays, LOCALES } from "@/lib/locales";
import { readLogoFile } from "@/lib/logo";
import { commitNumber, peekNumber } from "@/lib/numbers";
import { downloadBusinessPdf } from "@/lib/pdf";
import { clearProfile, readProfile, writeProfile, type BusinessProfile } from "@/lib/profile";

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
    const amount = roundMoney(quantity * price);
    const taxRate = state.perLineTax ? Math.min(100, parseDecimal(item.tax)) : 0;
    return { description: item.description, quantityLabel: decimalLabel(item.quantity), quantity, price, amount, taxRate };
  });
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.amount, 0));
  const discountRate = Math.min(100, parseDecimal(state.discount));
  const discountAmount = roundMoney(subtotal * (discountRate / 100));
  const net = roundMoney(Math.max(0, subtotal - discountAmount));
  const taxAmount = state.perLineTax
    ? roundMoney(lines.reduce((sum, line) => sum + roundMoney(line.amount * (1 - discountRate / 100) * (line.taxRate / 100)), 0))
    : roundMoney(net * (Math.min(100, parseDecimal(state.tax)) / 100));
  const shipping = roundMoney(parseDecimal(state.shipping));
  const total = roundMoney(net + taxAmount + shipping);
  return { lines, subtotal, discountRate, discountAmount, taxAmount, shipping, total };
}

export default function DocumentStudio({
  kind,
  defaults,
  headingLevel = 1,
}: {
  kind: DocumentKind;
  defaults?: { currency?: string; locale?: string; notes?: string; items?: { description: string; quantity: string; price: string }[] };
  headingLevel?: 1 | 2;
}) {
  const config = KIND_CONFIG[kind];
  const router = useRouter();
  const [state, setState] = useState<DocumentState>(() => blankDocument(kind));
  const [draftId, setDraftId] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
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
    if (preset?.items?.length) next.items = preset.items.map((item) => ({ ...item, tax: "" }));
    const handoff = takeHandoff(kind);
    if (handoff?.payload) {
      Object.assign(next, handoff.payload);
      next.previouslyPaid = handoff.payload.previouslyPaid ?? "";
    }
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

  async function downloadPDF() {
    if (pdfBusy) return;
    setPdfBusy(true);
    setError("");
    try {
      const money = (amount: number) => formatMoney(amount, state.currency, state.locale);
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
          ? [line.description, line.quantityLabel, money(line.price), ...(state.perLineTax ? [decimalLabel(state.items[index]?.tax || "0")] : []), money(line.amount)]
          : [line.description, line.quantityLabel]),
        totals: config.prices ? [
          { label: "Subtotal", value: money(figures.subtotal) },
          ...(figures.discountRate > 0 ? [{ label: `Discount (${decimalLabel(state.discount)}%)`, value: `-${money(figures.discountAmount)}` }] : []),
          ...(figures.taxAmount > 0 ? [{ label: "Tax", value: money(figures.taxAmount) }] : []),
          ...(figures.shipping > 0 ? [{ label: "Shipping", value: money(figures.shipping) }] : []),
          { label: kind === "credit-note" ? "Amount credited" : "Total", value: money(figures.total), emphasize: true },
          ...(prior > 0 ? [{ label: "Previously paid", value: money(prior) }] : []),
          ...(paidSpecified ? [{ label: config.paidLabel, value: money(paid) }, { label: "Balance", value: money(balance), emphasize: true }] : []),
        ] : [],
        notes: [
          ...(config.paymentInfo && state.paymentInfo ? [{ title: "Payment instructions", text: state.paymentInfo }] : []),
          ...(config.lateFee && state.lateFee ? [{ title: "Late fee", text: state.lateFee }] : []),
          ...(config.termsBlock && state.terms ? [{ title: "Terms and conditions", text: state.terms }] : []),
          ...(state.notes ? [{ title: "Notes", text: state.notes }] : []),
          ...(config.note ? [{ title: "Note", text: config.note }] : []),
          ...(config.method && state.paymentMethod ? [{ title: "Payment method", text: [state.paymentMethod, state.paymentReference].filter(Boolean).join(" · ") }] : []),
        ],
        footer: "Prepared in your browser. You are responsible for the content of this document.",
        madeWith,
      });
      await persistDraft();
      trackEvent("document_download", { tool_name: kind });
      setNotice("PDF downloaded. A copy of this document is saved on this device.");
    } catch {
      setError("The PDF could not be created. Check the details and try again.");
    } finally {
      setPdfBusy(false);
    }
  }

  function sendTo(target: string) {
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
      const payload: Partial<DocumentState> = { ...state, number: "", date: "" };
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
      if (target === "invoice") {
        payload.validUntil = "";
        payload.acceptedBy = "";
      }
      writeHandoff({ to: target, payload });
    }
    router.push(DOC_PATHS[target]);
  }

  const dateLabel = displayDate(state.date, state.locale);

  return (
    <section className="invoice-layout">
      <div className="editor">
        <div className="heading">
          <div>
            <span className="badge">100% FREE</span>
            <HeadingTag>{config.heading}</HeadingTag>
            <p>{config.lede}</p>
          </div>
          <button className="download" type="button" onClick={downloadPDF} disabled={pdfBusy}>{pdfBusy ? "Preparing PDF…" : "Download PDF"}</button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {notice && <p className="field-note">{notice}</p>}

        <h2>Your business</h2>
        <div className="grid two">
          <label>Business or name<input value={state.company} onChange={(event) => patch({ company: event.target.value })} /></label>
          <label>Business email<input type="email" value={state.companyEmail} onChange={(event) => patch({ companyEmail: event.target.value })} /></label>
          <label className="full-field">Business address<textarea rows={2} value={state.companyAddress} onChange={(event) => patch({ companyAddress: event.target.value })} /></label>
        </div>
        <div className="profile-actions">
          <button type="button" className="secondary" onClick={() => { writeProfile(profileFromState()); setNotice("Business details saved in this browser."); }}>Save business details</button>
          <button type="button" className="secondary" onClick={() => { clearProfile(); setNotice("Saved business details were removed from this browser."); }}>Clear saved details</button>
        </div>

        <h2>{config.party}</h2>
        <div className="grid two">
          <label>Name<input value={state.client} onChange={(event) => patch({ client: event.target.value })} /></label>
          <label>Email<input type="email" value={state.clientEmail} onChange={(event) => patch({ clientEmail: event.target.value })} /></label>
          <label className="full-field">Address<textarea rows={2} value={state.clientAddress} onChange={(event) => patch({ clientAddress: event.target.value })} /></label>
          {config.property && <label className="full-field">Property<textarea rows={2} value={state.property} onChange={(event) => patch({ property: event.target.value })} /></label>}
          {config.property && <label>Rent period<input value={state.period} onChange={(event) => patch({ period: event.target.value })} placeholder="March 2026" /></label>}
        </div>

        <h2>Document</h2>
        <div className="grid two">
          <label>{config.numberLabel}<input value={state.number} onChange={(event) => patch({ number: event.target.value })} /></label>
          <label>Date<input type="date" value={state.date} onChange={(event) => patch({ date: event.target.value })} /></label>
          {config.due && <label>Due date<input type="date" value={state.dueDate} onChange={(event) => patch({ dueDate: event.target.value })} /></label>}
          {config.validity && <label>Valid until<input type="date" value={state.validUntil} onChange={(event) => patch({ validUntil: event.target.value })} /></label>}
          {config.related && <label>Related invoice<input value={state.relatedNumber} onChange={(event) => patch({ relatedNumber: event.target.value })} /></label>}
          {config.po && <label>PO number<input value={state.poNumber} onChange={(event) => patch({ poNumber: event.target.value })} /></label>}
          <CurrencyField value={state.currency} onChange={(currency) => patch({ currency })} />
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

        <h2>Appearance</h2>
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
          <label className="check-line"><input type="checkbox" checked={madeWith} onChange={(event) => { setMadeWith(event.target.checked); localStorage.setItem("biztoolsbox-made-with", event.target.checked ? "on" : "off"); }} /> Made with BizToolsBox on the PDF</label>
        </div>

        <h2>{config.lines ? "Line items" : "Amount"}</h2>
        {config.lines ? (
          <>
            <div className="items">
              {state.items.map((item, index) => (
                <div className={`item${state.perLineTax ? " with-tax" : ""}`} key={index}>
                  <input aria-label={`Description for item ${index + 1}`} value={item.description} onChange={(event) => updateLine(index, "description", event.target.value)} />
                  <input aria-label={`${config.qty} for item ${index + 1}`} inputMode="decimal" value={item.quantity} onChange={(event) => updateLine(index, "quantity", event.target.value)} />
                  {config.prices && <input aria-label={`${config.price} for item ${index + 1}`} inputMode="decimal" value={item.price} onChange={(event) => updateLine(index, "price", event.target.value)} />}
                  {state.perLineTax && <input aria-label={`Tax percent for item ${index + 1}`} inputMode="decimal" value={item.tax} placeholder="Tax %" onChange={(event) => updateLine(index, "tax", event.target.value)} />}
                  <button className="icon" type="button" onClick={() => patch({ items: state.items.filter((_, itemIndex) => itemIndex !== index) })} aria-label="Remove item">×</button>
                </div>
              ))}
            </div>
            <button className="secondary" type="button" onClick={() => patch({ items: [...state.items, blankLine("New item")] })}>+ Add item</button>
          </>
        ) : (
          <label>{config.price}<input inputMode="decimal" value={state.items[0]?.price || ""} onChange={(event) => updateLine(0, "price", event.target.value)} /></label>
        )}
        {config.perLine && <label className="check-line"><input type="checkbox" checked={state.perLineTax} onChange={(event) => patch({ perLineTax: event.target.checked })} /> Tax each line separately</label>}
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
        <div className="grid two">
          {config.paymentInfo && <label className="full-field">Payment instructions<textarea rows={3} value={state.paymentInfo} onChange={(event) => patch({ paymentInfo: event.target.value })} /></label>}
          {config.paymentLink && <label className="full-field">Payment link<textarea rows={2} value={state.paymentLink} onChange={(event) => patch({ paymentLink: event.target.value })} placeholder="https://" /></label>}
          {config.lateFee && <label className="full-field">Late-fee note<textarea rows={2} value={state.lateFee} onChange={(event) => patch({ lateFee: event.target.value })} /></label>}
          {config.termsBlock && <label className="full-field">Terms and conditions<textarea rows={3} value={state.terms} onChange={(event) => patch({ terms: event.target.value })} /></label>}
          <label className="full-field">Notes<textarea rows={3} value={state.notes} onChange={(event) => patch({ notes: event.target.value })} /></label>
          {config.signature && <label>Signature name<input value={state.signature} onChange={(event) => patch({ signature: event.target.value })} /></label>}
          {config.accepted && <label>Accepted by<input value={state.acceptedBy} onChange={(event) => patch({ acceptedBy: event.target.value })} /></label>}
        </div>
        {config.note && <p className="quote-note">{config.note}</p>}
        <div className="profile-actions">
          <button type="button" className="secondary" onClick={async () => { await persistDraft(); setNotice("Saved in My documents on this device."); }}>Save on this device</button>
          {config.chain.map((link) => <button key={link.to} type="button" className="secondary" onClick={() => sendTo(link.to)}>{link.label}</button>)}
        </div>
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
              {config.prices && <b>{formatMoney(line.amount, state.currency, state.locale)}</b>}
            </div>
          ))}
          {config.prices && (
            <div className="summary">
              <div>Subtotal <span>{formatMoney(figures.subtotal, state.currency, state.locale)}</span></div>
              {figures.discountRate > 0 && <div>Discount <span>-{formatMoney(figures.discountAmount, state.currency, state.locale)}</span></div>}
              {figures.taxAmount > 0 && <div>Tax <span>{formatMoney(figures.taxAmount, state.currency, state.locale)}</span></div>}
              {figures.shipping > 0 && <div>Shipping <span>{formatMoney(figures.shipping, state.currency, state.locale)}</span></div>}
              <div className="grand">{kind === "credit-note" ? "Amount credited" : "Total"} <span>{formatMoney(figures.total, state.currency, state.locale)}</span></div>
              {prior > 0 && <div>Previously paid <span>{formatMoney(prior, state.currency, state.locale)}</span></div>}
              {paidSpecified && <div>{config.paidLabel} <span>{formatMoney(paid, state.currency, state.locale)}</span></div>}
              {paidSpecified && <div>Balance <span>{formatMoney(balance, state.currency, state.locale)}</span></div>}
            </div>
          )}
          {qr && <LocalImage className="paper-qr" src={qr} alt="Payment link QR code" />}
          {(state.signature || state.acceptedBy) && <p className="sign-line">{state.acceptedBy ? "Accepted by" : "Signature"}: {state.signature || state.acceptedBy}</p>}
        </div>
      </aside>
      <MobileToolBar primaryLabel={pdfBusy ? "Preparing PDF…" : "Download PDF"} onPrimary={downloadPDF} previewOpen={previewOpen} onPreview={() => setPreviewOpen((open) => !open)} disabled={pdfBusy} />
    </section>
  );
}
