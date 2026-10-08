import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Free Invoice & Quote Generators | BizToolsBox",
    template: "%s | BizToolsBox",
  },
  description: "Create a client-ready invoice or project quote, preview it, and download a PDF for free. No account required.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
