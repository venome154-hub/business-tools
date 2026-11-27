import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "CSV to JSON Converter";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("CSV to JSON Converter", "Turn a CSV header row into JSON keys in your browser.");
}
