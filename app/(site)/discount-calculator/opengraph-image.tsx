import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Discount Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Discount Calculator", "Take a percentage off a price.");
}
