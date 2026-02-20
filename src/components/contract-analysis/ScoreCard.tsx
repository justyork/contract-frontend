"use client";

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

interface ScoreCardProps {
  score: number; // 1-10
  /** Optional description for the info tooltip. */
  tooltip?: string;
}

function getScoreConfig(score: number) {
  if (score >= 8) {
    return {
      colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
      label: "Safe to sign",
    };
  }
  if (score >= 5) {
    return {
      colorClass: "bg-amber-50 text-amber-700 border-amber-200",
      icon: AlertTriangle,
      label: "Review carefully",
    };
  }
  return {
    colorClass: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
    label: "High risk",
  };
}

export function ScoreCard({ score, tooltip }: ScoreCardProps) {
  const scoreConfig = getScoreConfig(score);
  const Icon = scoreConfig.icon;

  return (
    <div
      className={`mb-6 flex flex-col rounded-[var(--radius-xl)] border px-6 py-5 ${scoreConfig.colorClass}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium opacity-90">
          Signing recommendation
        </span>
        {tooltip && (
          <InfoTooltip
            content={tooltip}
            ariaLabel="About signing recommendation"
          />
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-bold">{score}</span>
        <span className="text-sm font-medium opacity-90">out of 10</span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <Icon size={18} className="opacity-80" />
        <span className="text-xs opacity-90">{scoreConfig.label}</span>
      </div>
    </div>
  );
}
