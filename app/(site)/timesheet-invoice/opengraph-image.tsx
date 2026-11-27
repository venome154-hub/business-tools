import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free Timesheet Invoice Generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Free Timesheet Invoice Generator", "Bill hours times a rate and download a timesheet invoice PDF.");
}
