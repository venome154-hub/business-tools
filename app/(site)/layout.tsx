import AnalyticsConsent from "@/components/AnalyticsConsent";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs />
      {children}
      <SiteFooter />
      <AnalyticsConsent />
    </>
  );
}
