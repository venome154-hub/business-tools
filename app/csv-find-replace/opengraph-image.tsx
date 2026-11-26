import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Find and Replace in a CSV";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Find and Replace in a CSV", "Replace text in one CSV column or in every column.");
}
