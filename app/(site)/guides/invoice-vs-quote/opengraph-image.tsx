import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Invoice vs quote";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Invoice vs. quote", "When to send an estimate and when to request payment.");
}
