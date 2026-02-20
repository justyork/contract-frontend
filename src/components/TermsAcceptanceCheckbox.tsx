"use client";

import Link from "next/link";

interface TermsAcceptanceCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function TermsAcceptanceCheckbox({
  checked,
  onChange,
  error,
}: TermsAcceptanceCheckboxProps) {
  return (
    <div>
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
        />
        <span className="text-sm text-slate-700">
          I accept the{" "}
          <Link href="/terms" className="font-medium text-slate-800 underline hover:no-underline">
            Terms of Use
          </Link>
          ,{" "}
          <Link href="/privacy" className="font-medium text-slate-800 underline hover:no-underline">
            Privacy Policy
          </Link>
          , and{" "}
          <Link
            href="/cookie-policy"
            className="font-medium text-slate-800 underline hover:no-underline"
          >
            Cookie Policy
          </Link>
        </span>
      </label>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
