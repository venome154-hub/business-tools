import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Invoice requirements";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Invoice requirements", "Common invoice fields and a link to the official source.");
}
