declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    biztoolsboxAnalyticsConfigured?: boolean;
  }
}

export function trackEvent(eventName: string, parameters: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

export {};
