"use client";

export default function MobileToolBar({
  primaryLabel,
  onPrimary,
  previewOpen,
  onPreview,
  disabled = false,
  wordLabel,
  onWord,
  excelLabel,
  onExcel,
  pdfLabel,
  onPdf,
}: {
  primaryLabel: string;
  onPrimary: () => void;
  previewOpen: boolean;
  onPreview: () => void;
  disabled?: boolean;
  wordLabel?: string;
  onWord?: () => void;
  excelLabel?: string;
  onExcel?: () => void;
  pdfLabel?: string;
  onPdf?: () => void;
}) {
  return (
    <div className={`mobile-doc-bar${onWord || onExcel || onPdf ? " has-office" : ""}`}>
      <button type="button" className="secondary" onClick={onPreview}>{previewOpen ? "Close preview" : "Preview"}</button>
      <button type="button" className="download" onClick={onPrimary} disabled={disabled}>{primaryLabel}</button>
      {onWord && <button type="button" className="secondary" onClick={onWord} disabled={disabled}>{wordLabel}</button>}
      {onExcel && <button type="button" className="secondary" onClick={onExcel} disabled={disabled}>{excelLabel}</button>}
      {onPdf && <button type="button" className="secondary" onClick={onPdf} disabled={disabled}>{pdfLabel}</button>}
    </div>
  );
}
