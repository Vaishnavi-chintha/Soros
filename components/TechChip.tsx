"use client";

import { X } from "lucide-react";

interface TechChipProps {
  name: string;
  selected: boolean;
  onClick: () => void;
  onRemove?: () => void;
  variant?: "select" | "active";
}

export default function TechChip({
  name,
  selected,
  onClick,
  onRemove,
  variant = "select",
}: TechChipProps) {
  if (variant === "active") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-[#FA5D19]/40 
                      bg-[#FA5D19]/10 px-3 py-1 text-sm font-medium text-[#FA5D19]
                      transition-colors hover:border-[#FA5D19]/60"
      >
        {name}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-0.5 rounded-full p-0.5 hover:bg-[#FA5D19]/20 transition-colors"
            aria-label={`Remove ${name}`}
          >
            <X size={12} />
          </button>
        )}
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200
        ${
          selected
            ? "border-[#FA5D19] bg-[#FA5D19] text-white shadow-[0_0_12px_rgba(250,93,25,0.3)]"
            : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200 hover:bg-white/[0.06]"
        }`}
    >
      {name}
    </button>
  );
}
