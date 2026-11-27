import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free Purchase Order Generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Free Purchase Order Generator", "Create a supplier purchase order PDF in your browser. No account.");
}
