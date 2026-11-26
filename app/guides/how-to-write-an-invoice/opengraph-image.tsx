import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "How to write an invoice";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("How to write an invoice", "A short checklist before you send a client invoice.");
}
