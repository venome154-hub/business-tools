import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOg(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#F6F8FB", color: "#0F172A", padding: "72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#2563EB", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700 }}>B</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>BizToolsBox</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, marginTop: 28, maxWidth: 980 }}>{title}</div>
        <div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 22, color: "#334155", maxWidth: 860 }}>{subtitle}</div>
      </div>
    ),
    { ...ogSize },
  );
}
