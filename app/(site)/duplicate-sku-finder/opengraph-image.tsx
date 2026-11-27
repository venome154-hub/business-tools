import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free duplicate SKU finder";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Duplicate SKU finder", "Find repeated product codes in a CSV export.");
}
