declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    biztoolsboxAnalyticsConfigured?: boolean;
    biztoolsboxLastPageView?: string;
  }
}

export function trackEvent(eventName: string, parameters: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

export function trackPageView(pathname: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  if (window.biztoolsboxLastPageView === pathname) return;
  window.biztoolsboxLastPageView = pathname;
  window.gtag("event", "page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export {};
