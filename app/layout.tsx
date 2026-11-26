import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Free Business Tools | BizToolsBox",
    template: "%s | BizToolsBox",
  },
  description: "Free online tools for business documents and spreadsheets. No account required.",
  openGraph: { siteName: "BizToolsBox", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SiteHeader />
        <Breadcrumbs />
        {children}
        <RelatedLinks />
        <SiteFooter />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
