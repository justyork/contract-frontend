"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ContractSummaryCard } from "@/components/ai/ContractSummaryCard";
import { EmptyState } from "@/components/ai/EmptyState";
import { PageHeader } from "@/components/ai/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { api } from "@/lib/api";
import type { Contract } from "@/types/api";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const showWelcome = searchParams.get("welcome") === "1";
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissedWelcome, setDismissedWelcome] = useState(false);

  useEffect(() => {
    api
      .get<Contract[]>("/contracts")
      .then(setContracts)
      .catch(() => setContracts([]))
      .finally(() => setLoading(false));
  }, []);

  const showWelcomeBanner = showWelcome && !dismissedWelcome;

  return (
    <>
      {showWelcomeBanner && (
        <div
          className="mb-6 flex items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-3 text-sm text-[var(--foreground)]"
          role="status"
          aria-live="polite"
        >
          <span>
            Welcome! You have 10 free tokens to get started (about one contract).
            Run your first analysis or buy more tokens when you need them.
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/ai/analyse"
              className={buttonClassName("primary", "sm")}
            >
              Analyse contract
            </Link>
            <button
              type="button"
              onClick={() => setDismissedWelcome(true)}
              className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              aria-label="Dismiss welcome message"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <PageHeader
        title="My contracts"
        description="Review previous analyses and open any contract report in one click."
        action={
          <Link href="/ai/analyse" className={buttonClassName("primary", "md")}>
            New analysis
          </Link>
        }
      />

      {loading ? (
        <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-5 text-sm text-[var(--foreground-muted)]">
          <Spinner />
          Loading contracts...
        </div>
      ) : contracts.length === 0 ? (
        <EmptyState
          title="No analyses yet"
          description="Run your first contract analysis to see risks, key points, and a signing recommendation."
          action={
            <Link href="/ai/analyse" className={buttonClassName("primary", "md")}>
              Analyse your first contract
            </Link>
          }
        />
      ) : (
        <ul className="space-y-4">
          {contracts.map((contract) => (
            <li key={contract.id}>
              <ContractSummaryCard contract={contract} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
