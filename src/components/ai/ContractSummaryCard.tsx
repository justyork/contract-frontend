import Link from "next/link";
import type { Contract } from "@/types/api";
import { Card } from "@/components/ui/Card";

interface ContractSummaryCardProps {
  contract: Contract;
}

function getScoreClasses(score: number): string {
  if (score >= 7) return "bg-emerald-50 text-emerald-700";
  if (score >= 4) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

export function ContractSummaryCard({ contract }: ContractSummaryCardProps) {
  const score = contract.result?.signing_recommendation;
  const contractType = contract.result?.contract_type ?? "Contract";
  const status = contract.status ?? "completed";

  return (
    <Link href={`/ai/contract/${contract.id}`} className="focus-ring block rounded-[var(--radius-xl)]">
      <Card className="hover:border-[var(--primary)]/30">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold text-[var(--foreground)]">
            {contractType} · {contract.tokens} tokens
          </p>
          {status === "pending" && (
            <span className="rounded-[var(--radius-pill)] bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
              Analysing…
            </span>
          )}
          {status === "failed" && (
            <span className="rounded-[var(--radius-pill)] bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
              Failed
            </span>
          )}
          {status === "completed" && typeof score === "number" && (
            <span
              className={`rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold ${getScoreClasses(score)}`}
            >
              Score: {score}/10
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          {new Date(contract.created_at).toLocaleString()}
        </p>
      </Card>
    </Link>
  );
}
