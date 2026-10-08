"use client";

import { useEffect, useState } from "react";

const MEASUREMENT_ID = "G-MT1MLMCTYY";
const CONSENT_KEY = "biztoolsbox-analytics-consent";

type ConsentChoice = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    biztoolsboxAnalyticsConfigured?: boolean;
  }
}

function startAnalytics() {
  if (typeof window === "undefined") return;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
  if (window.biztoolsboxAnalyticsConfigured) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);
  window.biztoolsboxAnalyticsConfigured = true;

  if (!document.querySelector(`script[data-google-analytics="${MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.dataset.googleAnalytics = MEASUREMENT_ID;
    document.head.appendChild(script);
  }
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") {
      setChoice(saved);
      setShowSettings(false);
    }

    const openSettings = () => setShowSettings(true);
    window.addEventListener("biztoolsbox:analytics-settings", openSettings);
    return () => window.removeEventListener("biztoolsbox:analytics-settings", openSettings);
  }, []);

  useEffect(() => {
    if (choice === "accepted") startAnalytics();
    if (choice === "declined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0]?.trim();
        if (name?.startsWith("_ga")) {
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.biztoolsbox.online; SameSite=Lax`;
          document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        }
      }
    }
  }, [choice]);

  function saveChoice(nextChoice: Exclude<ConsentChoice, null>) {
    window.localStorage.setItem(CONSENT_KEY, nextChoice);
    setChoice(nextChoice);
    setShowSettings(false);
  }

  if (!showSettings) return null;

  return (
    <aside className="analytics-consent" aria-label="Analytics settings">
      <div>
        <strong>Help us improve BizToolsBox</strong>
        <p>Optional Google Analytics helps us understand site visits and usage. It uses cookies and collects general browser, device, and approximate location information. You can change this choice later in Privacy &amp; data.</p>
      </div>
      <div className="analytics-consent-actions">
        <button className="analytics-button analytics-button-secondary" onClick={() => saveChoice("declined")}>Decline</button>
        <button className="analytics-button" onClick={() => saveChoice("accepted")}>Allow analytics</button>
      </div>
    </aside>
  );
}

export function AnalyticsSettingsButton() {
  return (
    <button
      className="analytics-settings-link"
      onClick={() => window.dispatchEvent(new Event("biztoolsbox:analytics-settings"))}
    >
      Analytics settings
    </button>
  );
}
