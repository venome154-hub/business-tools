import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "CSV and Excel Converter";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("CSV and Excel Converter", "Convert CSV to Excel or Excel to CSV in your browser.");
}
