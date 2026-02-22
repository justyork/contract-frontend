"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getToken } from "@/lib/api";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationUrlRaw = searchParams.get("verification_url");
  const verificationUrl =
    verificationUrlRaw != null ? decodeURIComponent(verificationUrlRaw) : null;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status !== "idle" || verificationUrl == null || verificationUrl === "") {
      return;
    }

    const token = getToken();
    if (!token) {
      const returnUrl =
        "/email/verify?" + searchParams.toString();
      router.replace("/login?redirect=" + encodeURIComponent(returnUrl));
      return;
    }

    let cancelled = false;
    const tid = setTimeout(() => {
      if (!cancelled) setStatus("loading");
    }, 0);

    fetch(verificationUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setStatus("success");
          return;
        }
        return res
          .json()
          .then((data: { error?: string }) => {
            if (cancelled) return;
            setErrorMessage(data?.error ?? "Link invalid or expired.");
            setStatus("error");
          })
          .catch(() => {
            if (cancelled) return;
            setErrorMessage("Link invalid or expired.");
            setStatus("error");
          });
      })
      .catch(() => {
        if (cancelled) return;
        setErrorMessage("Link invalid or expired.");
        setStatus("error");
      });

    return () => {
      cancelled = true;
      clearTimeout(tid);
    };
  }, [verificationUrl, searchParams, router, status]);

  if (verificationUrl == null || verificationUrl === "") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Invalid or expired link
          </h1>
          <p className="mt-2 text-slate-600">
            This verification link is invalid or has expired. Please request a
            new one or try logging in.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-slate-800 px-4 py-2.5 font-medium text-white hover:bg-slate-700"
          >
            Go to log in
          </Link>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800"
            aria-hidden
          />
          <p className="mt-4 text-slate-600">Verifying your email…</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Email verified
          </h1>
          <p className="mt-2 text-slate-600">
            Your email has been verified. You can now log in.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-slate-800 px-4 py-2.5 font-medium text-white hover:bg-slate-700"
          >
            Go to log in
          </Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Verification failed
          </h1>
          <p className="mt-2 text-slate-600">
            {errorMessage || "Link invalid or expired."}
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-slate-800 px-4 py-2.5 font-medium text-white hover:bg-slate-700"
          >
            Go to log in
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div
              className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800"
              aria-hidden
            />
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
