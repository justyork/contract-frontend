/**
 * Analytics for Google Tag Manager (GTM).
 * Pushes events to window.dataLayer; configure tags in GTM to send to GA4 or other tools.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function getDataLayer(): Record<string, unknown>[] {
  if (typeof window === "undefined") return [];
  if (!window.dataLayer) window.dataLayer = [];
  return window.dataLayer;
}

/**
 * Push an object to the GTM dataLayer. GTM can use the event name as trigger.
 */
export function pushToDataLayer(
  event: string,
  params?: Record<string, unknown>
): void {
  const layer = getDataLayer();
  layer.push({ event, ...params });
}

/** User completed registration (product spec: event_user_registred) */
export function trackEventUserRegistered(): void {
  pushToDataLayer("event_user_registred");
}

/** User logged in successfully (product spec: event_user_logged_in) */
export function trackEventUserLoggedIn(): void {
  pushToDataLayer("event_user_logged_in");
}

/** Payment confirmed — money received (product spec: event_payment_received) */
export function trackEventPaymentReceived(): void {
  pushToDataLayer("event_payment_received");
}

/** Tokens purchased; pass count for reporting (product spec: event_tokens_purchased) */
export function trackEventTokensPurchased(tokens: number): void {
  pushToDataLayer("event_tokens_purchased", { tokens });
}

/** User submitted contract for analysis (product spec: event_analyze_started) */
export function trackEventAnalyzeStarted(): void {
  pushToDataLayer("event_analyze_started");
}

/** Analysis completed successfully (product spec: event_analyze_completed) */
export function trackEventAnalyzeCompleted(contractId: number, tokens: number): void {
  pushToDataLayer("event_analyze_completed", { contract_id: contractId, tokens });
}

/** Analysis failed (product spec: event_analyze_failed) */
export function trackEventAnalyzeFailed(reason?: string): void {
  pushToDataLayer("event_analyze_failed", reason ? { reason } : undefined);
}

/**
 * Generic engagement event for elements with data-analytics-event (e.g. hero_cta_click).
 * Use in GTM for conversion or engagement tracking.
 */
export function trackEngagement(eventName: string, extra?: Record<string, unknown>): void {
  pushToDataLayer(eventName, { event_category: "engagement", ...extra });
}
