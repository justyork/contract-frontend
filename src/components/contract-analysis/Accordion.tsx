"use client";

import { type ReactNode } from "react";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

interface AccordionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  count?: number;
  variant?: "default" | "danger" | "warning";
  /** Optional description for the info tooltip next to the title. */
  tooltip?: string;
}

const variantBorderStyles = {
  default: "border-[var(--border)]",
  danger: "border-red-200/60",
  warning: "border-amber-200/60",
};

export function Accordion({
  title,
  icon,
  children,
  count,
  variant = "default",
  tooltip,
}: AccordionProps) {
  return (
    <div
      className={`overflow-visible rounded-[var(--radius-lg)] border bg-[var(--surface)] ${variantBorderStyles[variant]}`}
    >
      <div className="flex w-full items-center gap-3 p-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {icon && <div className="shrink-0">{icon}</div>}
          <span className="text-base font-semibold text-[var(--foreground)]">
            {title}
          </span>
          {count !== undefined && (
            <span className="text-sm text-[var(--foreground-muted)]">
              ({count})
            </span>
          )}
        </div>
        {tooltip && (
          <InfoTooltip content={tooltip} ariaLabel={`About ${title}`} />
        )}
      </div>
      <div className="px-4 pb-4 pt-0">
        {children}
      </div>
    </div>
  );
}
