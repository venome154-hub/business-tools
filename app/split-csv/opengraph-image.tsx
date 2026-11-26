import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Split CSV by Rows";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Split CSV by Rows", "Split a CSV into smaller files that keep the header row.");
}
