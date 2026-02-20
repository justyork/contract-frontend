"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContractSummaryCard } from "@/components/ai/ContractSummaryCard";
import { EmptyState } from "@/components/ai/EmptyState";
import { PageHeader } from "@/components/ai/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { api } from "@/lib/api";
import type { Contract } from "@/types/api";

export default function DashboardPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Contract[]>("/contracts")
      .then(setContracts)
      .catch(() => setContracts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
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
