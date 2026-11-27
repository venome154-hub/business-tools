import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Invoice templates";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Invoice templates", "Example lines for specific kinds of work.");
}
