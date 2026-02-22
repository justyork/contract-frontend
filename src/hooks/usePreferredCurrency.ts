"use client";

import { useCallback, useEffect, useState } from "react";

export type SupportedCurrency = "eur" | "usd";

const STORAGE_KEY = "preferred_currency";

const normalizeCurrency = (value: string | null | undefined): SupportedCurrency => {
  const normalized = (value ?? "").toLowerCase();
  return normalized === "usd" ? "usd" : "eur";
};

export function currencySymbol(currency: SupportedCurrency): string {
  return currency === "usd" ? "$" : "€";
}

/** Default used for SSR and initial client render to avoid hydration mismatch. */
function getDefaultCurrency(profileCurrency?: string | null): SupportedCurrency {
  return normalizeCurrency(profileCurrency);
}

export function usePreferredCurrency(profileCurrency?: string | null) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() =>
    getDefaultCurrency(profileCurrency)
  );

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const next = stored ? normalizeCurrency(stored) : getDefaultCurrency(profileCurrency);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, next);
    }
    const id = setTimeout(() => setCurrencyState(next), 0);
    return () => clearTimeout(id);
  }, [profileCurrency]);

  const setCurrency = useCallback((next: SupportedCurrency) => {
    const normalized = normalizeCurrency(next);
    setCurrencyState(normalized);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, normalized);
    }
  }, []);

  return { currency, setCurrency };
}
