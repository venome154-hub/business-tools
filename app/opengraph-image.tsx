import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "BizToolsBox free business tools";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Free business tools", "Invoices, quotes, receipts, and CSV utilities in your browser.");
}
