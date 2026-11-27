import type { Metadata } from "next";
import FormatTemplatePage from "@/components/FormatTemplatePage";
import { getFormatPage } from "@/content/format-pages";

const page = getFormatPage("invoice", "word");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: { title: page.title, description: page.description, type: "website", url: page.path },
};

export default function Page() {
  return <FormatTemplatePage hub="invoice" format="word" />;
}
