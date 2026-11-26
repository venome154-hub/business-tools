import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Break-even Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Break-even Calculator", "Estimate how many units cover fixed costs.");
}
