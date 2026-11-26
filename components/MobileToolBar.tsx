"use client";

export default function MobileToolBar({
  primaryLabel,
  onPrimary,
  previewOpen,
  onPreview,
  disabled = false,
}: {
  primaryLabel: string;
  onPrimary: () => void;
  previewOpen: boolean;
  onPreview: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mobile-doc-bar">
      <button type="button" className="secondary" onClick={onPreview}>{previewOpen ? "Close preview" : "Preview"}</button>
      <button type="button" className="download" onClick={onPrimary} disabled={disabled}>{primaryLabel}</button>
    </div>
  );
}
