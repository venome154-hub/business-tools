import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Freelance Hourly Rate Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Freelance Hourly Rate Calculator", "Estimate an hourly rate from an income goal, expenses, weeks, and hours.");
}
