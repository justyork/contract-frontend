"use client";

import { useCallback, useState } from "react";

export type SupportedCurrency = "eur" | "usd";

const STORAGE_KEY = "preferred_currency";

const normalizeCurrency = (value: string | null | undefined): SupportedCurrency => {
  const normalized = (value ?? "").toLowerCase();
  return normalized === "usd" ? "usd" : "eur";
};

export function currencySymbol(currency: SupportedCurrency): string {
  return currency === "usd" ? "$" : "€";
}

export function usePreferredCurrency(profileCurrency?: string | null) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    if (typeof window === "undefined") {
      return normalizeCurrency(profileCurrency);
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return normalizeCurrency(stored);
    }

    const normalized = normalizeCurrency(profileCurrency);
    localStorage.setItem(STORAGE_KEY, normalized);
    return normalized;
  });

  const setCurrency = useCallback((next: SupportedCurrency) => {
    const normalized = normalizeCurrency(next);
    setCurrencyState(normalized);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, normalized);
    }
  }, []);

  return { currency, setCurrency };
}
