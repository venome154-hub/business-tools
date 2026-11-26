import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOg(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#111827", color: "#ffffff", padding: "72px" }}>
        <div style={{ fontSize: 24, letterSpacing: 3, color: "#cbd5e1" }}>BIZTOOLSBOX</div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, marginTop: 28, maxWidth: 980 }}>{title}</div>
        <div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 22, color: "#e2e8f0", maxWidth: 860 }}>{subtitle}</div>
      </div>
    ),
    { ...ogSize },
  );
}
