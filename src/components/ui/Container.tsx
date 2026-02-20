import type { ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl";

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}

const maxWidthClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({
  children,
  size = "lg",
  className = "",
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-4 ${maxWidthClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
