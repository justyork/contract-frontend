"use client";

import { Building2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

interface QuickSummaryProps {
  contractType?: string;
  parties?: string[];
  /** Optional tooltip for Contract Type. */
  contractTypeTooltip?: string;
  /** Optional tooltip for Parties. */
  partiesTooltip?: string;
}

export function QuickSummary({
  contractType,
  parties,
  contractTypeTooltip,
  partiesTooltip,
}: QuickSummaryProps) {
  if (!contractType && !parties?.length) {
    return null;
  }

  return (
    <div className="mb-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {contractType && (
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[var(--foreground-muted)]" />
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-muted)]">
                Contract Type
                {contractTypeTooltip && (
                  <InfoTooltip
                    content={contractTypeTooltip}
                    ariaLabel="About contract type"
                  />
                )}
              </div>
              <div className="mt-1">
                <Badge variant="brand">{contractType}</Badge>
              </div>
            </div>
          </div>
        )}
        {parties && parties.length > 0 && (
          <div className="flex items-start gap-2">
            <Building2 size={18} className="mt-0.5 text-[var(--foreground-muted)]" />
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-muted)]">
                Parties
                {partiesTooltip && (
                  <InfoTooltip
                    content={partiesTooltip}
                    ariaLabel="About parties"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {parties.map((party, index) => (
                  <Badge key={index} variant="neutral">
                    {party}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
