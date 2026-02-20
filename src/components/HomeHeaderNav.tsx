"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { buttonClassName } from "@/components/ui/Button";

export function HomeHeaderNav() {
  const { token, loading, logout } = useAuth();

  if (loading) {
    return (
      <nav className="flex items-center gap-6">
        <Link
          href="/#features"
          className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          Features
        </Link>
        <Link
          href="/#sample-report"
          className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          Sample report
        </Link>
        <Link
          href="/#pricing"
          className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          Pricing
        </Link>
        <Link
          href="/#faq"
          className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          FAQ
        </Link>
        <span className="text-sm text-[var(--foreground-muted)]">...</span>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-6">
      <Link
        href="/#features"
        className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
      >
        Features
      </Link>
      <Link
        href="/#sample-report"
        className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
      >
        Sample report
      </Link>
      <Link
        href="/#pricing"
        className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
      >
        Pricing
      </Link>
      <Link
        href="/#faq"
        className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
      >
        FAQ
      </Link>
      {token ? (
        <>
          <Link
            href="/ai/dashboard"
            className={buttonClassName("primary", "sm")}
            data-analytics-event="header_dashboard_click"
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={logout}
            className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="focus-ring rounded-sm text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className={buttonClassName("primary", "sm")}
            data-analytics-event="header_get_started_click"
          >
            Get started
          </Link>
        </>
      )}
    </nav>
  );
}
