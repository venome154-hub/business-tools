import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "BizToolsBox pricing";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Pricing", "No paid plan is for sale. The tools are free.");
}
