import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Late Payment Fee Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Late Payment Fee Calculator", "Estimate a simple annual late fee for an unpaid invoice.");
}
