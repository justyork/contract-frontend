"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/ai/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { api } from "@/lib/api";
import {
  trackEventAnalyzeCompleted,
  trackEventAnalyzeFailed,
  trackEventAnalyzeStarted,
} from "@/lib/analytics";
import type { AnalyseResponse } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";

const MIN_LEN = 1000;
const MAX_LEN = 100000;
const LANGUAGES = [
  { value: "", label: "Auto (contract language)" },
  { value: "ru", label: "Russian" },
  { value: "en", label: "English" },
  { value: "de", label: "German" },
  { value: "fr", label: "French" },
];

function tokenCost(len: number): number {
  if (len < MIN_LEN) return 0;
  return Math.ceil(Math.min(len, MAX_LEN) / 1000);
}

export default function AnalysePage() {
  const router = useRouter();
  const { profile, refreshProfile } = useAuth();
  const [tab, setTab] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [legalConfirmed, setLegalConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const len = text.length;
  const cost = tokenCost(len);
  const canSubmitText =
    len >= MIN_LEN &&
    len <= MAX_LEN &&
    (profile?.tokens ?? 0) >= cost &&
    legalConfirmed;

  const handleAnalyseText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitText || !legalConfirmed) return;
    setError("");
    setLoading(true);
    trackEventAnalyzeStarted();
    try {
      const body: { text: string; language?: string; legal_confirmed: boolean } = {
        text,
        legal_confirmed: legalConfirmed,
      };
      if (language) body.language = language;
      const res = await api.post<AnalyseResponse>("/documents/text", body);
      trackEventAnalyzeCompleted(res.id, res.tokens);
      await refreshProfile();
      router.push(`/ai/contract/${res.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      trackEventAnalyzeFailed(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyseFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || (profile?.tokens ?? 0) < 1 || !legalConfirmed) return;
    setError("");
    setLoading(true);
    trackEventAnalyzeStarted();
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("legal_confirmed", legalConfirmed ? "true" : "false");
      if (language) form.append("language", language);
      const res = await api.postFormData<AnalyseResponse>("/documents/upload", form);
      trackEventAnalyzeCompleted(res.id, res.tokens);
      await refreshProfile();
      router.push(`/ai/contract/${res.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      trackEventAnalyzeFailed(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Analyse contract"
        description={`Paste text or upload a PDF (min ${MIN_LEN.toLocaleString()} chars, max ${MAX_LEN.toLocaleString()}).`}
      />

      <Card>
        <div className="flex gap-2 border-b border-[var(--border)]">
          <button
            type="button"
            onClick={() => {
              setTab("text");
              setLegalConfirmed(false);
            }}
            className={`focus-ring border-b-2 px-4 py-2 text-sm font-medium ${
              tab === "text"
                ? "border-[var(--primary)] text-[var(--foreground)]"
                : "border-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Paste text
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("file");
              setLegalConfirmed(false);
            }}
            className={`focus-ring border-b-2 px-4 py-2 text-sm font-medium ${
              tab === "file"
                ? "border-[var(--primary)] text-[var(--foreground)]"
                : "border-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Upload PDF
          </button>
        </div>
{/* 
        <div className="mt-5">
          <label className="block text-sm font-medium text-[var(--foreground)]">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="focus-ring mt-1 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)]"
          >
            {LANGUAGES.map((opt) => (
              <option key={opt.value || "auto"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div> */}

        {error && (
          <p className="mt-4 rounded-[var(--radius-md)] bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {tab === "text" && (
          <form onSubmit={handleAnalyseText} className="mt-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your contract text here..."
              rows={14}
              className="focus-ring w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-sm text-[var(--foreground)]"
            />
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              {len.toLocaleString()} characters · Cost: {cost} tokens
              {len > 0 && len < MIN_LEN && ` (need ${MIN_LEN - len} more)`}
              {len > MAX_LEN && ` (max ${MAX_LEN})`}
            </p>
            <label className="mt-4 flex items-start gap-2 text-sm text-[var(--foreground-muted)]">
              <input
                type="checkbox"
                checked={legalConfirmed}
                onChange={(e) => setLegalConfirmed(e.target.checked)}
                className="focus-ring mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--primary)]"
              />
              <span>
                I confirm I have the legal right to upload and process this
                document
              </span>
            </label>
            <button
              type="submit"
              disabled={!canSubmitText || loading}
              className={`${buttonClassName("primary", "md")} mt-4 disabled:opacity-50`}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner className="h-4 w-4 border-white/40 border-t-white" />
                  Sending for analysis…
                </span>
              ) : (
                "Analyse"
              )}
            </button>
          </form>
        )}

        {tab === "file" && (
          <form onSubmit={handleAnalyseFile} className="mt-6">
            <label className="block">
              <span className="block text-sm font-medium text-[var(--foreground)]">
                PDF file (max 10MB)
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1 block w-full text-sm text-[var(--foreground-muted)] file:mr-4 file:rounded-[var(--radius-md)] file:border-0 file:bg-[var(--surface-muted)] file:px-4 file:py-2 file:text-[var(--foreground)]"
              />
            </label>
            <label className="mt-4 flex items-start gap-2 text-sm text-[var(--foreground-muted)]">
              <input
                type="checkbox"
                checked={legalConfirmed}
                onChange={(e) => setLegalConfirmed(e.target.checked)}
                className="focus-ring mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--primary)]"
              />
              <span>
                I confirm I have the legal right to upload and process this
                document
              </span>
            </label>
            <button
              type="submit"
              disabled={
                !file ||
                loading ||
                (profile?.tokens ?? 0) < 1 ||
                !legalConfirmed
              }
              className={`${buttonClassName("primary", "md")} mt-4 disabled:opacity-50`}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner className="h-4 w-4 border-white/40 border-t-white" />
                  Sending for analysis…
                </span>
              ) : (
                "Upload and analyse"
              )}
            </button>
          </form>
        )}

        {(profile?.tokens ?? 0) < 1 && (
          <p className="mt-6 text-sm text-amber-700">
            You need tokens to analyse.{" "}
            <Link href="/ai/tokens" className="font-medium underline">
              Buy tokens
            </Link>
            .
          </p>
        )}
      </Card>
    </>
  );
}
