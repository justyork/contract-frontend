"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-xl font-bold text-slate-900">Payment cancelled</h1>
        <p className="mt-2 text-slate-600">
          You left the payment page. No charges were made.
        </p>
        <Link
          href="/ai/tokens"
          className="mt-6 inline-block rounded-lg bg-slate-800 px-6 py-2.5 font-medium text-white hover:bg-slate-700"
        >
          Back to token packages
        </Link>
      </div>
    </div>
  );
}
