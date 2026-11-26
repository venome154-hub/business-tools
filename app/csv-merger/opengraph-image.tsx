import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free CSV merger";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("CSV merger", "Combine CSV files by column name in your browser.");
}
