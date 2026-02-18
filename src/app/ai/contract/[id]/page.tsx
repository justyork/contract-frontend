"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Contract } from "@/types/api";

function Section({
  title,
  items,
}: {
  title: string;
  items: string[] | undefined;
}) {
  if (!items?.length) return null;
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function SectionText({
  title,
  text,
}: {
  title: string;
  text: string | undefined;
}) {
  if (!text) return null;
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{text}</p>
    </section>
  );
}

export default function ContractPage() {
  const params = useParams();
  const id = params.id as string;
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Contract>(`/contracts/${id}`)
      .then(setContract)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [id]);

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-red-600">{error}</p>
        <Link href="/ai/dashboard" className="mt-4 inline-block text-slate-600 hover:underline">
          ← Dashboard
        </Link>
      </div>
    );
  }
  if (!contract) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  const r = contract.result;
  const score = r.signing_recommendation ?? 0;
  const scoreColor =
    score >= 7 ? "text-green-600" : score >= 4 ? "text-amber-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/ai/dashboard" className="text-slate-600 hover:text-slate-900">
            ← Dashboard
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Analysis result</h1>
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center">
            <p className="text-xs font-medium uppercase text-slate-500">Signing recommendation</p>
            <p className={`text-3xl font-bold ${scoreColor}`}>{score}/10</p>
          </div>
        </div>

        <div className="space-y-6">
          <SectionText title="Contract type" text={r.contract_type} />
          <Section title="Parties" items={r.parties} />
          <Section title="Key points" items={r.key_points} />
          <Section title="Risks" items={r.risks} />
          <Section title="Hidden clauses" items={r.hidden_clauses} />
          <Section title="Suggestions" items={r.suggestions} />
          <SectionText title="Legal perspective" text={r.legal_perspective} />
          <SectionText title="Financial perspective" text={r.financial_perspective} />
          <SectionText title="Operational perspective" text={r.operational_perspective} />
          <SectionText title="Strategic perspective" text={r.strategic_perspective} />
          <Section title="Termination conditions" items={r.termination_conditions} />
          <Section title="Compliance issues" items={r.compliance_issues} />
          <Section title="Negotiation priorities" items={r.negotiation_priorities} />
        </div>
      </main>
    </div>
  );
}
