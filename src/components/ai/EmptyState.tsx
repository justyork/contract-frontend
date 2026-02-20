import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="text-center">
      <p className="text-base font-semibold text-[var(--foreground)]">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--foreground-muted)]">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </Card>
  );
}
