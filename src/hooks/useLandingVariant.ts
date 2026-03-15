"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_VARIANT,
  getLandingContent,
  getStoredVariant,
  PERSIST_VARIANT_IN_SESSION,
  setStoredVariant,
  SOURCE_TO_VARIANT,
} from "@/config/landings";
import type { LandingContent } from "@/config/landings";

export interface UseLandingVariantResult {
  variant: string;
  content: LandingContent;
}

/**
 * Resolves landing variant from query (landing=) and UTM params.
 * SessionStorage is only read after mount to avoid server/client hydration mismatch.
 */
export function useLandingVariant(): UseLandingVariantResult {
  const searchParams = useSearchParams();
  const [storedVariant, setStoredVariantState] = useState<string | null>(null);

  const { variant: fromParams, fromQuery } = useMemo(() => {
    let variant: string | null = null;
    let fromQuery = false;
    const landingParam = searchParams.get("landing");
    if (landingParam?.trim()) {
      variant =
        SOURCE_TO_VARIANT[landingParam.trim()] ?? landingParam.trim();
      fromQuery = true;
    }
    if (!variant) {
      const utmCampaign = searchParams.get("utm_campaign");
      const utmSource = searchParams.get("utm_source");
      const utmMedium = searchParams.get("utm_medium");
      for (const val of [utmCampaign, utmSource, utmMedium]) {
        if (val?.trim() && SOURCE_TO_VARIANT[val.trim()]) {
          variant = SOURCE_TO_VARIANT[val.trim()];
          fromQuery = true;
          break;
        }
      }
    }
    return { variant, fromQuery };
  }, [searchParams]);

  useEffect(() => {
    if (fromParams != null) {
      if (
        PERSIST_VARIANT_IN_SESSION &&
        fromQuery &&
        fromParams !== DEFAULT_VARIANT
      ) {
        setStoredVariant(fromParams);
      }
      return;
    }
    if (PERSIST_VARIANT_IN_SESSION) {
      // Defer setState to avoid synchronous setState in effect (cascading renders).
      const value = getStoredVariant();
      queueMicrotask(() => setStoredVariantState(value));
    }
  }, [fromParams, fromQuery]);

  const resolvedVariant = fromParams ?? storedVariant ?? DEFAULT_VARIANT;
  const content = useMemo(
    () => getLandingContent(resolvedVariant),
    [resolvedVariant]
  );
  return { variant: resolvedVariant, content };
}
