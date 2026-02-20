"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  DollarSign,
  EyeOff,
  FileCheck,
  FileText,
  Handshake,
  Lightbulb,
  List,
  Scale,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/ai/PageHeader";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import {
  Accordion,
  AnalysisSection,
  QuickSummary,
  ScoreCard,
  SectionGroup,
} from "@/components/contract-analysis";
import {
  subscribeContractProgress,
  type ContractProgressPayload,
  isEchoConfigured,
} from "@/lib/echo";
import { api } from "@/lib/api";
import type { Contract } from "@/types/api";

const POLL_INTERVAL_MS = 2500;
/** * Duration to show 100% "Complete" before switching to result (smooth UX). */
const COMPLETING_DURATION_MS = 600;
/** * If no progress events for this long while >= 85%, trigger status check. */
const STUCK_HIGH_PROGRESS_MS = 30_000;
/** * If at 100% but no completed event for this long, trigger status check. */
const STUCK_AT_100_MS = 10_000;
/** * Interval for stuck-guard checks. */
const STUCK_CHECK_INTERVAL_MS = 5000;

/** * Info tooltip texts for each analysis field (for accessibility and clarity). */
const FIELD_TOOLTIPS = {
  signingRecommendation:
    "Overall recommendation to sign the contract from 1 to 10, based on risks and balance of terms.",
  contractType: "The kind of agreement (e.g. service agreement, NDA, lease).",
  parties:
    "The parties named in the contract (e.g. company names, roles).",
  risksAndIssues:
    "Identified risks, hidden or one-sided clauses, and compliance issues.",
  risks: "Explicit and implicit risks that may affect you if you sign.",
  hiddenClauses:
    "Clauses that create non-obvious obligations or restrictions.",
  hiddenObligations: "Obligations that are not clearly stated in the contract.",
  hiddenFinancialObligations:
    "Financial commitments that are easy to miss when reading.",
  oneSidedClauses:
    "Terms that favour the other party and may be unfair to you.",
  complianceIssues:
    "Potential breaches of law or regulation (e.g. data protection).",
  analysisPerspectives:
    "Detailed analysis from legal, financial, operational and strategic angles.",
  legalPerspective:
    "Assessment of liability, enforceability and legal balance.",
  financialPerspective:
    "Hidden costs, payment terms and financial risks.",
  operationalPerspective:
    "Impact on day-to-day operations and resources.",
  strategicPerspective:
    "Long-term business and strategic implications.",
  contractDetails:
    "Key points, termination, suggestions and negotiation priorities.",
  keyPoints: "Main takeaways and important terms of the contract.",
  terminationConditions:
    "How and when the contract can be ended by either party.",
  suggestions: "Recommended changes or clarifications before signing.",
  negotiationPriorities:
    "Issues to prioritise in negotiations, ordered by impact.",
} as const;

function AnalysisProgressView({
  progressPercent,
  stageLabel,
}: {
  progressPercent: number;
  stageLabel: string;
}) {
  return (
    <>
      <PageHeader
        title="Analysing contract"
        description="This usually takes one to two minutes. You can stay on this page."
      />
      <Card>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-[var(--foreground-muted)]">
            <span>{stageLabel}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default function ContractPage() {
  const params = useParams();
  const id = params.id as string;
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<ContractProgressPayload | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const fallbackProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasWebSocketProgressRef = useRef<boolean>(false);
  const lastProgressEventTimeRef = useRef<number>(0);
  const progressPercentRef = useRef<number>(0);
  const stuckCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchContract = useCallback(() => {
    return api.get<Contract>(`/contracts/${id}`).then(setContract).catch((err) => {
      setError(err instanceof Error ? err.message : "Failed to load");
    });
  }, [id]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  useEffect(() => {
    progressPercentRef.current = progress?.progress_percent ?? 0;
  }, [progress]);

  // * When contract is pending: subscribe to WebSocket and start polling fallback.
  // * Progress source priority: (1) WebSocket .analysis.progress, (2) fallback timer only when no WS yet, (3) polling for status only.
  useEffect(() => {
    if (!contract || contract.status !== "pending") {
      startTimeRef.current = null;
      return;
    }
    const contractId = contract.id;

    // * Track start time for fallback progress
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      hasWebSocketProgressRef.current = false;
      lastProgressEventTimeRef.current = Date.now();
    }

    const onProgress = (payload: ContractProgressPayload) => {
      hasWebSocketProgressRef.current = true;
      lastProgressEventTimeRef.current = Date.now();
      setProgress((prev) => {
        const currentPercent = prev?.progress_percent ?? 0;
        if (payload.progress_percent < currentPercent) return prev;
        return payload;
      });
      // * Stop polling when WebSocket receives progress events
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
    const enterCompletingThenFetch = () => {
      if (stuckCheckRef.current) {
        clearInterval(stuckCheckRef.current);
        stuckCheckRef.current = null;
      }
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      if (fallbackProgressRef.current) {
        clearInterval(fallbackProgressRef.current);
        fallbackProgressRef.current = null;
      }
      startTimeRef.current = null;
      hasWebSocketProgressRef.current = false;
      setProgress((prev) =>
        prev
          ? { ...prev, progress_percent: 100, stage_label: "Complete", is_finalizing: true }
          : { contract_id: contractId, stage: 7, stage_label: "Complete", progress_percent: 100, is_finalizing: true }
      );
      setIsCompleting(true);
      setTimeout(() => {
        fetchContract().finally(() => setIsCompleting(false));
      }, COMPLETING_DURATION_MS);
    };

    const onCompleted = () => {
      enterCompletingThenFetch();
    };
    const enterCompletingThenSetContract = (c: Contract) => {
      if (stuckCheckRef.current) {
        clearInterval(stuckCheckRef.current);
        stuckCheckRef.current = null;
      }
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      if (fallbackProgressRef.current) {
        clearInterval(fallbackProgressRef.current);
        fallbackProgressRef.current = null;
      }
      startTimeRef.current = null;
      hasWebSocketProgressRef.current = false;
      setProgress((prev) =>
        prev
          ? { ...prev, progress_percent: 100, stage_label: "Complete", is_finalizing: true }
          : { contract_id: contractId, stage: 7, stage_label: "Complete", progress_percent: 100, is_finalizing: true }
      );
      setIsCompleting(true);
      setTimeout(() => {
        setContract(c);
        setIsCompleting(false);
        if (c.status === "failed" && c.error_message) {
          setError(c.error_message);
        }
      }, COMPLETING_DURATION_MS);
    };

    const onFailed = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      if (fallbackProgressRef.current) {
        clearInterval(fallbackProgressRef.current);
        fallbackProgressRef.current = null;
      }
      startTimeRef.current = null;
      hasWebSocketProgressRef.current = false;
      fetchContract();
    };

    // * Subscribe to WebSocket events
    unsubscribeRef.current = subscribeContractProgress(
      contractId,
      onProgress,
      onCompleted,
      onFailed
    );

    // * Update fallback progress based on elapsed time (if WebSocket not available)
    const updateFallbackProgress = () => {
      if (startTimeRef.current === null) return;
      const elapsed = Date.now() - startTimeRef.current;
      const elapsedSeconds = elapsed / 1000;
      // * Estimate: 0-30s = 0-30%, 30-60s = 30-60%, 60-90s = 60-85%, 90+ = 85-95% (never 100% until completed)
      let estimatedPercent = 0;
      let stageLabel = "Starting...";
      if (elapsedSeconds < 5) {
        estimatedPercent = Math.min(14, (elapsedSeconds / 5) * 14);
        stageLabel = "Clause segmentation";
      } else if (elapsedSeconds < 10) {
        estimatedPercent = 14 + ((elapsedSeconds - 5) / 5) * 15;
        stageLabel = "Clause classification";
      } else if (elapsedSeconds < 20) {
        estimatedPercent = 29 + ((elapsedSeconds - 10) / 10) * 14;
        stageLabel = "Hidden obligation detection";
      } else if (elapsedSeconds < 35) {
        estimatedPercent = 43 + ((elapsedSeconds - 20) / 15) * 14;
        stageLabel = "Compliance analysis";
      } else if (elapsedSeconds < 50) {
        estimatedPercent = 57 + ((elapsedSeconds - 35) / 15) * 14;
        stageLabel = "Risk scoring";
      } else if (elapsedSeconds < 80) {
        estimatedPercent = 71 + ((elapsedSeconds - 50) / 30) * 14;
        stageLabel = "LLM analysis";
      } else {
        estimatedPercent = Math.min(95, 85 + ((elapsedSeconds - 80) / 40) * 10);
        stageLabel = "Finalising";
      }
      // * Only update if no WebSocket progress received; keep progress monotonic
      if (!hasWebSocketProgressRef.current) {
        lastProgressEventTimeRef.current = Date.now();
        const percent = Math.floor(estimatedPercent);
        setProgress((prev) => {
          const currentPercent = prev?.progress_percent ?? 0;
          if (percent < currentPercent) return prev;
          return {
            contract_id: contractId,
            stage: Math.floor(percent / 14.3) + 1,
            stage_label: stageLabel,
            progress_percent: percent,
          };
        });
      }
    };

    // * Update fallback progress every second (only if WebSocket not receiving events)
    fallbackProgressRef.current = setInterval(updateFallbackProgress, 1000);
    updateFallbackProgress(); // * Initial update

    // * Anti-stuck: if progress is high but no events for a while, or at 100% without completed, check status
    stuckCheckRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastProgressEventTimeRef.current;
      const percent = progressPercentRef.current;
      const shouldCheck =
        (percent >= 85 && elapsed > STUCK_HIGH_PROGRESS_MS) ||
        (percent >= 100 && elapsed > STUCK_AT_100_MS);
      if (!shouldCheck) return;
      api.get<Contract>(`/contracts/${id}`).then((c) => {
        if (c.status !== "pending") enterCompletingThenSetContract(c);
      }).catch(() => {});
    }, STUCK_CHECK_INTERVAL_MS);

    // * Only start polling if WebSocket is not configured or as fallback
    // * Polling will be stopped when WebSocket receives progress events
    const shouldUsePolling = !isEchoConfigured();
    let pollingFallbackTimeout: ReturnType<typeof setTimeout> | null = null;

    if (shouldUsePolling) {
      // * WebSocket not configured - use polling immediately
      pollRef.current = setInterval(() => {
        api.get<Contract>(`/contracts/${id}`).then((c) => {
          if (c.status !== "pending") {
            enterCompletingThenSetContract(c);
          }
        }).catch(() => {});
      }, POLL_INTERVAL_MS);
    } else {
      // * WebSocket is configured - use polling only as fallback if no progress received after timeout
      // * Set a timeout to start polling if WebSocket doesn't receive events within reasonable time
      pollingFallbackTimeout = setTimeout(() => {
        // * Only start polling if WebSocket still hasn't received any progress
        if (!hasWebSocketProgressRef.current && !pollRef.current) {
          pollRef.current = setInterval(() => {
            api.get<Contract>(`/contracts/${id}`).then((c) => {
              if (c.status !== "pending") {
                enterCompletingThenSetContract(c);
              }
            }).catch(() => {});
          }, POLL_INTERVAL_MS);
        }
      }, 5000); // * Wait 5 seconds before starting polling fallback
    }

    return () => {
      if (stuckCheckRef.current) {
        clearInterval(stuckCheckRef.current);
        stuckCheckRef.current = null;
      }
      if (pollingFallbackTimeout) {
        clearTimeout(pollingFallbackTimeout);
      }
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      if (fallbackProgressRef.current) {
        clearInterval(fallbackProgressRef.current);
        fallbackProgressRef.current = null;
      }
    };
  }, [contract?.id, contract?.status, id, fetchContract]);

  if (error) {
    return (
      <Card>
        <p className="text-red-700">{error}</p>
        <Link
          href="/ai/dashboard"
          className="focus-ring mt-3 inline-block rounded-sm text-sm text-[var(--foreground-muted)] underline"
        >
          Back to dashboard
        </Link>
      </Card>
    );
  }
  if (!contract) {
    return (
      <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-5 text-sm text-[var(--foreground-muted)]">
        <Spinner />
        Loading...
      </div>
    );
  }

  if (contract.status === "pending" || isCompleting) {
    const displayProgress = isCompleting ? 100 : (progress?.progress_percent ?? 0);
    const displayStage = isCompleting ? "Complete" : (progress?.stage_label ?? "Starting...");
    return (
      <AnalysisProgressView
        progressPercent={displayProgress}
        stageLabel={displayStage}
      />
    );
  }

  if (contract.status === "failed") {
    return (
      <Card>
        <p className="text-red-700">
          {contract.error_message ?? "Analysis failed."}
        </p>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Tokens have been refunded to your account.
        </p>
        <Link
          href="/ai/dashboard"
          className="focus-ring mt-3 inline-block rounded-sm text-sm text-[var(--foreground-muted)] underline"
        >
          Back to dashboard
        </Link>
      </Card>
    );
  }

  const r = contract.result;
  if (!r) {
    return (
      <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-5 text-sm text-[var(--foreground-muted)]">
        <Spinner />
        Loading result...
      </div>
    );
  }

  const score = r.signing_recommendation ?? 0;

  // Calculate total counts for section groups
  const risksCount =
    (r.risks?.length ?? 0) +
    (r.hidden_clauses?.length ?? 0) +
    (r.hidden_obligations?.length ?? 0) +
    (r.hidden_financial_obligations?.length ?? 0) +
    (r.one_sided_clauses?.length ?? 0) +
    (r.compliance_issues?.length ?? 0);

  return (
    <div className="animate-contract-result-in">
      <PageHeader
        title="Analysis result"
        description="Review the high-level score and detailed risk breakdown before signing."
      />

      <ScoreCard
        score={score}
        tooltip={FIELD_TOOLTIPS.signingRecommendation}
      />

      <QuickSummary
        contractType={r.contract_type}
        parties={r.parties}
        contractTypeTooltip={FIELD_TOOLTIPS.contractType}
        partiesTooltip={FIELD_TOOLTIPS.parties}
      />

      {/* Risks & Issues Section */}
      {(r.risks?.length ||
        r.hidden_clauses?.length ||
        r.hidden_obligations?.length ||
        r.hidden_financial_obligations?.length ||
        r.one_sided_clauses?.length ||
        r.compliance_issues?.length) > 0 && (
        <SectionGroup
          id="risks-issues"
          title="Risks & Issues"
          icon={<ShieldAlert size={20} />}
          totalCount={risksCount}
          tooltip={FIELD_TOOLTIPS.risksAndIssues}
        >
          {r.risks && r.risks.length > 0 && (
            <Accordion
              title="Risks"
              icon={<AlertCircle size={18} className="text-red-600" />}
              count={r.risks.length}
              variant="danger"
              tooltip={FIELD_TOOLTIPS.risks}
            >
              <AnalysisSection items={r.risks} />
            </Accordion>
          )}

          {r.hidden_clauses && r.hidden_clauses.length > 0 && (
            <Accordion
              title="Hidden Clauses"
              icon={<EyeOff size={18} className="text-red-600" />}
              count={r.hidden_clauses.length}
              variant="danger"
              tooltip={FIELD_TOOLTIPS.hiddenClauses}
            >
              <AnalysisSection items={r.hidden_clauses} />
            </Accordion>
          )}

          {r.hidden_obligations && r.hidden_obligations.length > 0 && (
            <Accordion
              title="Hidden Obligations"
              icon={<EyeOff size={18} className="text-orange-600" />}
              count={r.hidden_obligations.length}
              variant="warning"
              tooltip={FIELD_TOOLTIPS.hiddenObligations}
            >
              <AnalysisSection items={r.hidden_obligations} />
            </Accordion>
            )}

          {r.hidden_financial_obligations &&
            r.hidden_financial_obligations.length > 0 && (
              <Accordion
                title="Hidden Financial Obligations"
                icon={<DollarSign size={18} className="text-orange-600" />}
                count={r.hidden_financial_obligations.length}
                variant="warning"
                tooltip={FIELD_TOOLTIPS.hiddenFinancialObligations}
              >
                <AnalysisSection items={r.hidden_financial_obligations} />
              </Accordion>
            )}

          {r.one_sided_clauses && r.one_sided_clauses.length > 0 && (
            <Accordion
              title="One-Sided Clauses"
              icon={<AlertCircle size={18} className="text-amber-600" />}
              count={r.one_sided_clauses.length}
              variant="warning"
              tooltip={FIELD_TOOLTIPS.oneSidedClauses}
            >
              <AnalysisSection items={r.one_sided_clauses} />
            </Accordion>
          )}

          {r.compliance_issues && r.compliance_issues.length > 0 && (
            <Accordion
              title="Compliance Issues"
              icon={<ShieldCheck size={18} className="text-orange-600" />}
              count={r.compliance_issues.length}
              variant="warning"
              tooltip={FIELD_TOOLTIPS.complianceIssues}
            >
              <AnalysisSection items={r.compliance_issues} />
            </Accordion>
            )}
        </SectionGroup>
      )}

      {/* Analysis Perspectives Section */}
      {(r.legal_perspective ||
        r.financial_perspective ||
        r.operational_perspective ||
        r.strategic_perspective) && (
        <SectionGroup
          id="perspectives"
          title="Analysis Perspectives"
          icon={<FileText size={20} />}
          totalCount={
            [
              r.legal_perspective,
              r.financial_perspective,
              r.operational_perspective,
              r.strategic_perspective,
            ].filter(Boolean).length
          }
          tooltip={FIELD_TOOLTIPS.analysisPerspectives}
        >
          {r.legal_perspective && (
            <Accordion
              title="Legal Perspective"
              icon={<Scale size={18} className="text-purple-600" />}
              tooltip={FIELD_TOOLTIPS.legalPerspective}
            >
              <AnalysisSection text={r.legal_perspective} />
            </Accordion>
          )}

          {r.financial_perspective && (
            <Accordion
              title="Financial Perspective"
              icon={<DollarSign size={18} className="text-blue-600" />}
              tooltip={FIELD_TOOLTIPS.financialPerspective}
            >
              <AnalysisSection text={r.financial_perspective} />
            </Accordion>
          )}

          {r.operational_perspective && (
            <Accordion
              title="Operational Perspective"
              icon={<Settings size={18} className="text-teal-600" />}
              tooltip={FIELD_TOOLTIPS.operationalPerspective}
            >
              <AnalysisSection text={r.operational_perspective} />
            </Accordion>
          )}

          {r.strategic_perspective && (
            <Accordion
              title="Strategic Perspective"
              icon={<Target size={18} className="text-indigo-600" />}
              tooltip={FIELD_TOOLTIPS.strategicPerspective}
            >
              <AnalysisSection text={r.strategic_perspective} />
            </Accordion>
          )}
        </SectionGroup>
      )}

      {/* Contract Details Section */}
      {(r.key_points?.length ||
        r.termination_conditions?.length ||
        r.suggestions?.length ||
        r.negotiation_priorities?.length) > 0 && (
        <SectionGroup
          id="contract-details"
          title="Contract Details"
          icon={<FileCheck size={20} />}
          totalCount={
            (r.key_points?.length ?? 0) +
            (r.termination_conditions?.length ?? 0) +
            (r.suggestions?.length ?? 0) +
            (r.negotiation_priorities?.length ?? 0)
          }
          tooltip={FIELD_TOOLTIPS.contractDetails}
        >
          {r.key_points && r.key_points.length > 0 && (
            <Accordion
              title="Key Points"
              icon={<List size={18} className="text-[var(--foreground-muted)]" />}
              count={r.key_points.length}
              tooltip={FIELD_TOOLTIPS.keyPoints}
            >
              <AnalysisSection items={r.key_points} />
            </Accordion>
          )}

          {r.termination_conditions && r.termination_conditions.length > 0 && (
            <Accordion
              title="Termination Conditions"
              icon={<X size={18} className="text-[var(--foreground-muted)]" />}
              count={r.termination_conditions.length}
              tooltip={FIELD_TOOLTIPS.terminationConditions}
            >
              <AnalysisSection items={r.termination_conditions} />
            </Accordion>
          )}

          {r.suggestions && r.suggestions.length > 0 && (
            <Accordion
              title="Suggestions"
              icon={<Lightbulb size={18} className="text-amber-600" />}
              count={r.suggestions.length}
              tooltip={FIELD_TOOLTIPS.suggestions}
            >
              <AnalysisSection items={r.suggestions} />
            </Accordion>
          )}

          {r.negotiation_priorities && r.negotiation_priorities.length > 0 && (
            <Accordion
              title="Negotiation Priorities"
              icon={
                <Handshake size={18} className="text-[var(--foreground-muted)]" />
              }
              count={r.negotiation_priorities.length}
              tooltip={FIELD_TOOLTIPS.negotiationPriorities}
            >
              <AnalysisSection items={r.negotiation_priorities} />
            </Accordion>
          )}
        </SectionGroup>
      )}

      <div className="mt-6">
        <Link
          href="/ai/dashboard"
          className="focus-ring rounded-sm text-sm text-[var(--foreground-muted)] underline"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
