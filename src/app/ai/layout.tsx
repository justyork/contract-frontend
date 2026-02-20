import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AiShell } from "@/components/ai/AiShell";

export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AiShell>{children}</AiShell>
    </ProtectedRoute>
  );
}
