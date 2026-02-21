"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { trackEventPaymentReceived, trackEventTokensPurchased } from "@/lib/analytics";
import type { PaymentConfirmResponse } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";

function paymentErrorMessage(code: string | undefined): string {
  switch (code) {
    case "payment_not_completed":
      return "Payment was not completed. Please try again or contact support if you were charged.";
    case "session_already_processed":
      return "This payment was already applied. Your tokens should be in your balance.";
    case "session_owner_mismatch":
      return "This payment session doesn’t belong to your account.";
    case "invalid_session":
    case "invalid_metadata":
      return "Invalid payment session. Please start again from the token purchase page.";
    case "session_id_required":
      return "Missing payment session. Please return from Stripe using the link provided after payment.";
    case "service_unavailable":
      return "Payment service is temporarily unavailable. Please try again later.";
    default:
      return "We couldn’t confirm your payment. Please contact support if you were charged.";
  }
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { refreshProfile } = useAuth();
  const [status, setStatus] = useState<"loading" | "ok" | "error">(
    sessionId ? "loading" : "error"
  );
  const [tokens, setTokens] = useState<number | null>(null);
  const [errorCode, setErrorCode] = useState<string | undefined>(
    sessionId ? undefined : "session_id_required"
  );

  useEffect(() => {
    if (!sessionId) return;
    api
      .post<PaymentConfirmResponse>("/payments/confirm", { session_id: sessionId })
      .then((data) => {
        refreshProfile();
        setTokens(data.tokens);
        setStatus("ok");
        trackEventPaymentReceived();
        trackEventTokensPurchased(data.tokens);
      })
      .catch((err: unknown) => {
        const code =
          err && typeof err === "object" && "code" in err && typeof (err as { code: unknown }).code === "string"
            ? (err as { code: string }).code
            : undefined;
        setErrorCode(code);
        setStatus("error");
      });
  }, [sessionId, refreshProfile]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center">
        {status === "loading" && <p className="text-slate-600">Confirming payment…</p>}
        {status === "ok" && (
          <>
            <h1 className="text-xl font-bold text-slate-900">Payment successful</h1>
            <p className="mt-2 text-slate-600">
              {tokens != null && tokens > 0
                ? `You received ${tokens.toLocaleString()} tokens. They have been added to your balance.`
                : "Your tokens have been added to your balance."}
            </p>
            <Link
              href="/ai/dashboard"
              className="mt-6 inline-block rounded-lg bg-slate-800 px-6 py-2.5 font-medium text-white hover:bg-slate-700"
            >
              Go to dashboard
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-2 text-slate-600">{paymentErrorMessage(errorCode)}</p>
            <Link
              href="/ai/tokens"
              className="mt-6 inline-block text-slate-700 hover:underline"
            >
              Back to tokens
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">Confirming payment…</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
