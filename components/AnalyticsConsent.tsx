"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

const MEASUREMENT_ID = "G-MT1MLMCTYY";
const CONSENT_KEY = "biztoolsbox-analytics-consent";

type ConsentChoice = "accepted" | "declined" | null;

function readConsent(): ConsentChoice {
  try {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") return saved;
  } catch {
    return null;
  }
  return null;
}

function startAnalytics() {
  if (typeof window === "undefined") return;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  if (window.biztoolsboxAnalyticsConfigured) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
  window.biztoolsboxAnalyticsConfigured = true;

  if (!document.querySelector(`script[data-google-analytics="${MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.dataset.googleAnalytics = MEASUREMENT_ID;
    document.head.appendChild(script);
  }
}

function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (name?.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.biztoolsbox.online; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  }
}

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) setChoice(saved);
    else setShowSettings(true);
    setReady(true);

    const openSettings = () => setShowSettings(true);
    window.addEventListener("biztoolsbox:analytics-settings", openSettings);
    return () => window.removeEventListener("biztoolsbox:analytics-settings", openSettings);
  }, []);

  useEffect(() => {
    if (choice === "accepted") startAnalytics();
    if (choice === "declined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    }
  }, [choice]);

  useEffect(() => {
    if (choice === "accepted") trackPageView(pathname);
  }, [choice, pathname]);

  function saveChoice(nextChoice: Exclude<ConsentChoice, null>) {
    try {
      window.localStorage.setItem(CONSENT_KEY, nextChoice);
    } catch {
      // The choice still applies for this visit when storage is blocked.
    }
    setChoice(nextChoice);
    setShowSettings(false);
  }

  if (!ready || !showSettings) return null;

  return (
    <aside className="analytics-consent" aria-label="Analytics settings">
      <div>
        <strong>Help us improve BizToolsBox</strong>
        <p>Optional Google Analytics helps us understand site visits and usage. It uses cookies and collects general browser, device, and approximate location information. You can change this choice later in Privacy &amp; data.</p>
      </div>
      <div className="analytics-consent-actions">
        <button className="analytics-button analytics-button-secondary" type="button" onClick={() => saveChoice("declined")}>Decline</button>
        <button className="analytics-button" type="button" onClick={() => saveChoice("accepted")}>Allow analytics</button>
      </div>
    </aside>
  );
}

export function AnalyticsSettingsButton() {
  return (
    <button
      className="analytics-settings-link"
      type="button"
      onClick={() => window.dispatchEvent(new Event("biztoolsbox:analytics-settings"))}
    >
      Analytics settings
    </button>
  );
}
