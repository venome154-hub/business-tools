import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Profit Margin Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Profit Margin Calculator", "Calculate profit margin from cost and selling price in your browser.");
}
