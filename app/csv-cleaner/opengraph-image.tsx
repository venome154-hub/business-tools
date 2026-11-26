import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free CSV cleaner";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("CSV cleaner", "Remove blank rows, empty columns, and duplicate records.");
}
