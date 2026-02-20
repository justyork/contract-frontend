"use client";

import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

type RiskSeverity = "low" | "medium" | "high" | "critical";

interface RiskBadgeProps {
  severity: RiskSeverity;
  label?: string;
  showIcon?: boolean;
}

const severityStyles: Record<RiskSeverity, string> = {
  low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  critical: "bg-red-50 text-red-700 border-red-200",
};

const severityLabels: Record<RiskSeverity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function RiskBadge({
  severity,
  label,
  showIcon = false,
}: RiskBadgeProps) {
  const displayLabel = label ?? severityLabels[severity];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 py-1.5 text-sm font-semibold ${severityStyles[severity]}`}
    >
      {showIcon && <AlertCircle size={16} />}
      {displayLabel}
    </span>
  );
}
