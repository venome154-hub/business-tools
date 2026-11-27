import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Sales Tax Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Sales Tax Calculator", "Add or remove VAT, GST, or sales tax from an amount.");
}
