import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Free Business Tools | BizToolsBox",
    template: "%s | BizToolsBox",
  },
  description: "Free online tools for business documents and spreadsheets. No account required.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
