import type { ReactNode } from "react";

type BadgeVariant = "neutral" | "brand" | "success";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClassNames: Record<BadgeVariant, string> = {
  neutral: "bg-[var(--surface-muted)] text-[var(--foreground-muted)]",
  brand: "bg-blue-50 text-[var(--primary)]",
  success: "bg-emerald-50 text-emerald-700",
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold ${variantClassNames[variant]}`}
    >
      {children}
    </span>
  );
}
