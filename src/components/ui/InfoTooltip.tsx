"use client";

import { Info } from "lucide-react";
import { useId, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface InfoTooltipProps {
  /** Short description shown on hover/focus. */
  content: string;
  /** Optional label for screen readers (default: "More information"). */
  ariaLabel?: string;
  className?: string;
}

export function InfoTooltip({
  content,
  ariaLabel = "More information",
  className = "",
}: InfoTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipId = useId();

  const show = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  const cancelHide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!visible || !triggerRef.current || typeof document === "undefined")
      return;
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 6;
    setPosition({
      left: rect.left + rect.width / 2,
      top: rect.top - gap,
    });
  }, [visible]);

  const tooltipContent =
    visible &&
    createPortal(
      <span
        id={tooltipId}
        role="tooltip"
        className="fixed z-[100] w-64 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs font-normal leading-relaxed text-[var(--foreground)] shadow-[var(--shadow-card)]"
        style={{
          left: position.left,
          top: position.top,
          transform: "translate(-50%, -100%)",
        }}
        onMouseEnter={cancelHide}
        onMouseLeave={hide}
      >
        {content}
      </span>,
      document.body
    );

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="focus-ring inline-flex shrink-0 rounded-full p-0.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] focus:outline-none"
        aria-label={ariaLabel}
        aria-describedby={visible ? tooltipId : undefined}
      >
        <Info size={16} />
      </button>
      {typeof document !== "undefined" && tooltipContent}
    </span>
  );
}
