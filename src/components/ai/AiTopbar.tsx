"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { buttonClassName } from "@/components/ui/Button";

interface AiTopbarProps {
  onMenuClick: () => void;
}

export function AiTopbar({ onMenuClick }: AiTopbarProps) {
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] md:hidden"
            aria-label="Open navigation"
          >
            <span aria-hidden="true">☰</span>
          </button>
          <Link
            href="/ai/dashboard"
            className="focus-ring rounded-sm text-lg font-semibold tracking-tight text-[var(--foreground)]"
          >
            Contralytic
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-[var(--foreground-muted)] sm:inline">
            {profile?.tokens ?? 0} tokens
          </span>
          <Link href="/ai/tokens" className={buttonClassName("secondary", "sm")}>
            Buy tokens
          </Link>
        </div>
      </div>
    </header>
  );
}
