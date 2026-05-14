"use client";

import { CATEGORY_ORDER, TECH_CATALOG, CATEGORY_LABELS } from "@/lib/tech-catalog";
import { useStackStore } from "@/store/stack-store";
import CategoryPanel from "./CategoryPanel";
import TechChip from "./TechChip";
import { Sparkles, Trash2, Layers } from "lucide-react";

interface StackBuilderProps {
  onAnalyze: () => void;
}

export default function StackBuilder({ onAnalyze }: StackBuilderProps) {
  const selected = useStackStore((s) => s.selected);
  const remove = useStackStore((s) => s.remove);
  const clearAll = useStackStore((s) => s.clearAll);
  const status = useStackStore((s) => s.status);
  const selectionCount = useStackStore((s) => s.selectionCount());
  const hasMinimum = useStackStore((s) => s.hasMinimum());

  const isLoading = status === "loading";
  const isAnalyzing = status !== "idle";

  /** Build a human-readable label for each selected tech */
  const resolveName = (category: string, techId: string) =>
    TECH_CATALOG[category as keyof typeof TECH_CATALOG]?.find(
      (t) => t.id === techId
    )?.name ?? techId;

  return (
    <div className="flex flex-col gap-5">
      {/* Active Stack Summary */}
      {selectionCount > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Your Stack ({selectionCount} selected)
            </span>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={13} />
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((cat) => {
              const techId = selected[cat];
              if (!techId) return null;
              return (
                <TechChip
                  key={cat}
                  name={`${CATEGORY_LABELS[cat]}: ${resolveName(cat, techId)}`}
                  selected
                  variant="active"
                  onRemove={() => remove(cat)}
                  onClick={() => {}}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Category Panels */}
      <div className={`grid gap-4 transition-all duration-700
                       ${isAnalyzing ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {CATEGORY_ORDER.map((cat, i) => (
          <CategoryPanel key={cat} category={cat} index={i} />
        ))}
      </div>

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={!hasMinimum || isLoading}
        className={`group relative mt-2 w-full overflow-hidden rounded-xl border py-4 font-semibold transition-all duration-500
                   ${
                     hasMinimum && !isLoading
                       ? "border-[#FA5D19]/40 bg-[#FA5D19]/10 text-[#FA5D19] animate-pulse-glow hover:border-[#FA5D19]/60 hover:bg-[#FA5D19]/15"
                       : "border-[#FA5D19]/30 bg-[#FA5D19]/10 text-[#FA5D19]"
                   }
                   disabled:border-white/[0.06] disabled:bg-white/[0.02] disabled:text-zinc-600
                   disabled:cursor-not-allowed disabled:animate-none
                   hover:scale-[1.01] active:scale-[0.99]`}
      >
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-[#FA5D19]/5 blur-xl transition-opacity group-hover:opacity-100 group-disabled:opacity-0" />

        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Layers size={18} className="animate-spin" />
            Analyzing your stack…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Sparkles size={18} />
            {hasMinimum
              ? "Analyze Stack"
              : `Select Frontend + Backend to continue (${selectionCount} selected)`}
          </span>
        )}
      </button>
    </div>
  );
}
