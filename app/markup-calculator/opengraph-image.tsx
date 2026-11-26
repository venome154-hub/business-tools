import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Markup Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Markup Calculator", "Calculate markup from cost and selling price.");
}
