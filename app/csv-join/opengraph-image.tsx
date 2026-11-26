import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Join Two CSVs by Key";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Join Two CSVs by Key", "Combine two CSV files by a shared key, like VLOOKUP.");
}
