"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { api } from "@/lib/api";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const len = text.length;
  const cost = tokenCost(len);
  const canSubmitText = len >= MIN_LEN && len <= MAX_LEN && (profile?.tokens ?? 0) >= cost;

  const handleAnalyseText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitText) return;
    setError("");
    setLoading(true);
    try {
      const body: { text: string; language?: string } = { text };
      if (language) body.language = language;
      const res = await api.post<AnalyseResponse>("/documents/text", body);
      await refreshProfile();
      router.push(`/ai/contract/${res.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyseFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || (profile?.tokens ?? 0) < 1) return;
    setError("");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      if (language) form.append("language", language);
      const res = await api.postFormData<AnalyseResponse>("/documents/upload", form);
      await refreshProfile();
      router.push(`/ai/contract/${res.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/ai/dashboard" className="text-slate-600 hover:text-slate-900">
            ← Dashboard
          </Link>
          <span className="font-medium text-slate-800">
            Balance: {profile?.tokens ?? 0} tokens
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Analyse contract</h1>
        <p className="mt-1 text-slate-600">
          Paste text or upload a PDF (min {MIN_LEN.toLocaleString()} chars, max {MAX_LEN.toLocaleString()})
        </p>

        <div className="mt-6 flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setTab("text")}
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              tab === "text"
                ? "border-slate-800 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Paste text
          </button>
          <button
            type="button"
            onClick={() => setTab("file")}
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              tab === "file"
                ? "border-slate-800 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Upload PDF
          </button>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="shrink-0">
            <label className="block text-sm font-medium text-slate-700">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            >
              {LANGUAGES.map((opt) => (
                <option key={opt.value || "auto"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {tab === "text" && (
          <form onSubmit={handleAnalyseText} className="mt-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your contract text here..."
              rows={14}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <p className="mt-2 text-sm text-slate-500">
              {len.toLocaleString()} characters · Cost: {cost} tokens
              {len > 0 && len < MIN_LEN && ` (need ${MIN_LEN - len} more)`}
              {len > MAX_LEN && ` (max ${MAX_LEN})`}
            </p>
            <button
              type="submit"
              disabled={!canSubmitText || loading}
              className="mt-4 rounded-lg bg-slate-800 px-6 py-2.5 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {loading ? "Analysing…" : "Analyse"}
            </button>
          </form>
        )}

        {tab === "file" && (
          <form onSubmit={handleAnalyseFile} className="mt-6">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700">PDF file (max 10MB)</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-slate-800"
              />
            </label>
            <button
              type="submit"
              disabled={!file || loading || (profile?.tokens ?? 0) < 1}
              className="mt-4 rounded-lg bg-slate-800 px-6 py-2.5 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {loading ? "Uploading & analysing…" : "Upload and analyse"}
            </button>
          </form>
        )}

        {(profile?.tokens ?? 0) < 1 && (
          <p className="mt-6 text-sm text-amber-700">
            You need tokens to analyse. <Link href="/ai/tokens" className="font-medium underline">Buy tokens</Link>.
          </p>
        )}
      </main>
    </div>
  );
}
