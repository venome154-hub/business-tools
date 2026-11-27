import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Invoice Due Date Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Invoice Due Date Calculator", "Add net days to an invoice issue date.");
}
