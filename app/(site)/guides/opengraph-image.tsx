import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "BizToolsBox guides";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Guides", "Plain-language help for quotes, invoices, and client paperwork.");
}
