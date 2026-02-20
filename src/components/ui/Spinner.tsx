interface SpinnerProps {
  className?: string;
}

export function Spinner({ className = "" }: SpinnerProps) {
  return (
    <span
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)] ${className}`}
      aria-hidden="true"
    />
  );
}
