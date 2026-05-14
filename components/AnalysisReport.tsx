"use client";

import { AnalysisResult, AnalysisStatus } from "@/lib/types";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronRight,
} from "lucide-react";

interface AnalysisReportProps {
  result: AnalysisResult | null;
  status: AnalysisStatus;
}

export default function AnalysisReport({ result, status }: AnalysisReportProps) {
  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-[#FA5D19]/10" />
        <p className="text-sm text-zinc-500">
          Crunching compatibility data…
        </p>
      </div>
    );
  }

  if (status === "error" || !result) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-6 text-center">
        <XCircle size={28} className="mx-auto mb-2 text-red-400" />
        <p className="text-sm text-red-300">Analysis failed. Please try again.</p>
      </div>
    );
  }

  /** Map verdict to colors */
  const verdictConfig = {
    PRODUCTION_READY: {
      icon: <CheckCircle2 size={20} />,
      label: "Production Ready",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
    },
    VIABLE_WITH_CAVEATS: {
      icon: <AlertTriangle size={20} />,
      label: "Viable with Caveats",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
    },
    NOT_RECOMMENDED: {
      icon: <XCircle size={20} />,
      label: "Not Recommended",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
    },
  }[result.verdict] ?? {
    icon: <AlertTriangle size={20} />,
    label: "Unknown",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
  };

  /** Score gauge color */
  const scoreColor =
    result.overallCompatibility >= 80
      ? "text-emerald-400"
      : result.overallCompatibility >= 50
        ? "text-amber-400"
        : "text-red-400";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Score + Verdict Header */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Compatibility Score
            </p>
            <p className={`mt-1 text-5xl font-bold tracking-tight ${scoreColor}`}>
              {result.overallCompatibility}
              <span className="text-lg text-zinc-600">/100</span>
            </p>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2 ${verdictConfig.bg} ${verdictConfig.border} ${verdictConfig.text}`}
          >
            {verdictConfig.icon}
            <span className="text-sm font-semibold">{verdictConfig.label}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          {result.summary}
        </p>
      </div>

      {/* Pairings */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-300">
          <TrendingUp size={16} className="text-[#FA5D19]" />
          Pairing Analysis
        </h3>
        <div className="flex flex-col gap-3">
          {result.pairings.map((p, i) => {
            const pairScoreColor =
              p.compatibility >= 80
                ? "text-emerald-400"
                : p.compatibility >= 50
                  ? "text-amber-400"
                  : "text-red-400";
            return (
              <div
                key={i}
                className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-200">
                    {p.pair[0]} + {p.pair[1]}
                  </span>
                  <span className={`text-sm font-bold ${pairScoreColor}`}>
                    {p.compatibility}%
                  </span>
                </div>
                <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                  <div>
                    <p className="mb-1 font-medium text-emerald-500">Pros</p>
                    <ul className="space-y-0.5 text-zinc-400">
                      {p.pros.map((pro, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <CheckCircle2
                            size={12}
                            className="mt-0.5 shrink-0 text-emerald-600"
                          />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-red-400">Cons</p>
                    <ul className="space-y-0.5 text-zinc-400">
                      {p.cons.map((con, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <XCircle
                            size={12}
                            className="mt-0.5 shrink-0 text-red-600"
                          />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-300">
            <Lightbulb size={16} className="text-[#FA5D19]" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-zinc-400"
              >
                <ChevronRight size={16} className="mt-0.5 shrink-0 text-[#FA5D19]" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
