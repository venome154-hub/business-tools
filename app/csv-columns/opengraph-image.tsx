import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Remove and Reorder CSV Columns";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Remove and Reorder CSV Columns", "Drop columns and change their order, then download the CSV.");
}
