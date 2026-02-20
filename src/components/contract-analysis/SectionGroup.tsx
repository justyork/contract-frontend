"use client";

import { type ReactNode } from "react";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

interface SectionGroupProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  totalCount?: number;
  id?: string;
  /** Optional description for the info tooltip next to the title. */
  tooltip?: string;
}

export function SectionGroup({
  title,
  icon,
  children,
  totalCount,
  id,
  tooltip,
}: SectionGroupProps) {
  return (
    <div id={id} className="mb-6 scroll-mt-20">
      <div className="mb-4 flex items-center gap-3 rounded-[var(--radius-lg)] p-1">
        <div className="shrink-0 text-[var(--primary)]">{icon}</div>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          {title}
        </h2>
        {totalCount !== undefined && (
          <span className="text-sm font-normal text-[var(--foreground-muted)]">
            ({totalCount} items)
          </span>
        )}
        {tooltip && (
          <InfoTooltip content={tooltip} ariaLabel={`About ${title}`} />
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
