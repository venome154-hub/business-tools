import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Free Invoice, Quote & Payment Tools | BizToolsBox",
    template: "%s | BizToolsBox",
  },
  description: "Create a client-ready quote, invoice, payment receipt, or reminder email for free. No account required.",
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
