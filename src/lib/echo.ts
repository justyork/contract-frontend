/**
 * Laravel Echo client for WebSocket (Reverb) — contract analysis progress.
 * Uses Pusher protocol; auth via API broadcasting/auth with JWT.
 * If Reverb is not configured, subscribeContractProgress no-ops and polling is used.
 *
 * Progress source priority on the page: WebSocket (this) > fallback timer > polling (status only).
 */

import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

const getApiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
  return url.replace(/\/api\/?$/, "") || url;
};

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

let echoInstance: Echo<"reverb"> | null = null;

function getEcho(): Echo<"reverb"> | null {
  if (typeof window === "undefined") return null;
  const key = process.env.NEXT_PUBLIC_REVERB_APP_KEY;
  if (!key) return null;
  if (echoInstance) return echoInstance;
  window.Pusher = Pusher;
  const apiBase = getApiBaseUrl();
  echoInstance = new Echo({
    broadcaster: "reverb",
    key,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST ?? new URL(apiBase).hostname,
    wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? "8081", 10),
    wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? "8081", 10),
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "http") === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: `${apiBase}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  });
  return echoInstance;
}

export interface ContractProgressPayload {
  contract_id: number;
  stage: number;
  stage_label: string;
  progress_percent: number;
  /** True when backend sent the final 100% event (after DB update). */
  is_finalizing?: boolean;
}

export interface ContractCompletedPayload {
  contract_id: number;
}

export interface ContractFailedPayload {
  contract_id: number;
  message: string;
}

export type ProgressHandler = (payload: ContractProgressPayload) => void;
export type CompletedHandler = (payload: ContractCompletedPayload) => void;
export type FailedHandler = (payload: ContractFailedPayload) => void;

/**
 * Subscribe to contract analysis progress (WebSocket). Returns unsubscribe function.
 * If Reverb is not configured, returns a no-op unsubscribe and handlers are not used.
 */
export function subscribeContractProgress(
  contractId: number,
  onProgress: ProgressHandler,
  onCompleted: CompletedHandler,
  onFailed: FailedHandler
): () => void {
  const echo = getEcho();
  if (!echo) return () => {};

  const channel = echo.private(`contract.${contractId}`);

  channel.listen(".analysis.progress", (e: { contract_id: number; stage: number; stage_label: string; progress_percent: number; is_finalizing?: boolean }) => {
    onProgress({
      contract_id: e.contract_id,
      stage: e.stage,
      stage_label: e.stage_label,
      progress_percent: e.progress_percent,
      is_finalizing: e.is_finalizing,
    });
  });
  channel.listen(".analysis.completed", (e: { contract_id: number }) => {
    onCompleted({ contract_id: e.contract_id });
  });
  channel.listen(".analysis.failed", (e: { contract_id: number; message: string }) => {
    onFailed({ contract_id: e.contract_id, message: e.message });
  });

  return () => {
    echo.leave(`contract.${contractId}`);
  };
}

/**
 * Whether WebSocket (Echo/Reverb) is configured and can be used.
 */
export function isEchoConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_REVERB_APP_KEY);
}

/**
 * Check if Echo instance is connected and ready.
 * Returns true if Echo is initialized and connected, false otherwise.
 */
export function isEchoConnected(): boolean {
  if (typeof window === "undefined") return false;
  const echo = getEcho();
  if (!echo) return false;
  return echo.connectionStatus() === "connected";
}
