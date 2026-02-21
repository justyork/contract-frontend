"use client";

import { useEffect, useRef, useState } from "react";
import { trackEngagement } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim();

/** localStorage key for cookie consent; must match CookieBanner. */
const COOKIE_CONSENT_KEY = "clealex_cookie_consent";

/** Custom event name fired when user updates consent (e.g. Accept all). */
const CONSENT_UPDATED_EVENT = "clealex_consent_updated";

/**
 * Injects Google Tag Manager only when user has accepted analytics cookies
 * (clealex_cookie_consent === "all"). Delegates clicks on [data-analytics-event]
 * to the dataLayer.
 */
export function GTMAndAnalytics() {
  const [consentAllowed, setConsentAllowed] = useState<boolean | null>(null);
  const gtmInjectedRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    queueMicrotask(() => setConsentAllowed(stored === "all"));

    const onConsentUpdated = (e: Event) => {
      const detail = (e as CustomEvent<{ consent?: string }>).detail;
      if (detail?.consent === "all") setConsentAllowed(true);
    };

    window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
  }, []);

  useEffect(() => {
    if (!GTM_ID || consentAllowed !== true || gtmInjectedRef.current) return;

    gtmInjectedRef.current = true;
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer ?? [];

    const script = document.createElement("script");
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID.replace(/'/g, "\\'")}');`;
    document.head.appendChild(script);
  }, [consentAllowed]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const el = target.closest?.("[data-analytics-event]") as
        | (HTMLElement & { dataset: { analyticsEvent?: string } })
        | null;
      if (!el?.dataset?.analyticsEvent) return;
      trackEngagement(el.dataset.analyticsEvent);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!GTM_ID || consentAllowed !== true) return null;
  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
