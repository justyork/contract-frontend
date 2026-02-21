"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { buttonClassName } from "@/components/ui/Button";

/**
 * Segment-level error boundary. Catches runtime errors in this segment and below.
 * Renders a fallback UI and reports the error to Sentry when DSN is set.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error, {
        extra: { digest: error.digest },
      });
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex max-w-md flex-col items-center gap-6 rounded-2xl border border-(--border) bg-(--surface) p-8 shadow-(--shadow-card)">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-7 w-7" aria-hidden />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm text-(--foreground-muted)">
            An unexpected error occurred. We’ve been notified and will look into
            it. You can try again or return to the home page.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className={buttonClassName("primary")}
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
            Try again
          </button>
          <a
            href="/"
            className={buttonClassName("secondary")}
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
