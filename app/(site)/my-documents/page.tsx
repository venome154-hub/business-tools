import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MyDocuments from "@/components/MyDocuments";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "My Documents",
  description: "Open, duplicate, or delete the latest documents saved in this browser.",
  alternates: { canonical: "/my-documents" },
  openGraph: { title: "My Documents", description: "Documents saved on this device.", type: "website", url: "/my-documents" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "My documents", path: "/my-documents" }])} />
      <MyDocuments />
    </main>
  );
}
