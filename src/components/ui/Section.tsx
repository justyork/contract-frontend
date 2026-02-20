import type { ElementType, ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  background?: "default" | "surface";
  spacing?: "md" | "lg";
  containerSize?: "sm" | "md" | "lg" | "xl";
  as?: ElementType;
  className?: string;
  "data-animate"?: boolean;
}

export function Section({
  children,
  id,
  background = "default",
  spacing = "lg",
  containerSize = "lg",
  as: Tag = "section",
  className = "",
  "data-animate": dataAnimate,
}: SectionProps) {
  const backgroundClass =
    background === "surface" ? "bg-[var(--surface)]" : "bg-transparent";
  const spacingClass = spacing === "md" ? "py-12" : "py-20";

  return (
    <Tag
      id={id}
      className={`${backgroundClass} ${spacingClass} ${className}`}
      {...(dataAnimate ? { "data-animate": "" } : {})}
    >
      <Container size={containerSize}>{children}</Container>
    </Tag>
  );
}
