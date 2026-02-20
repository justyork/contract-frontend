"use client";

import { type ReactNode } from "react";

interface AnalysisSectionProps {
  items?: string[];
  text?: string;
  /** @deprecated Prefer default list styling (dash bullets). Kept for backwards compatibility. */
  itemIcon?: ReactNode;
  className?: string;
}

export function AnalysisSection({
  items,
  text,
  className = "",
}: AnalysisSectionProps) {
  if (items && items.length > 0) {
    return (
      <ul
        className={`list-none space-y-2 ${className}`}
        style={{ listStyle: "none" }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm leading-relaxed text-[var(--foreground)]"
          >
            <span className="shrink-0 text-[var(--foreground-muted)]" aria-hidden>
              –
            </span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (text) {
    return (
      <p
        className={`whitespace-pre-wrap text-sm leading-relaxed text-[var(--foreground)] ${className}`}
      >
        {text}
      </p>
    );
  }

  return null;
}
