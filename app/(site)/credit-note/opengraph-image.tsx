import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free Credit Note Generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Free Credit Note Generator", "Create a credit note PDF for an amount credited against an invoice.");
}
