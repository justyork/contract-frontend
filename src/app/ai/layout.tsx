import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
