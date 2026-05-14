"use client";

import { useState } from "react";
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
  const [popping, setPopping] = useState(false);

  const handleClick = () => {
    if (!selected) {
      setPopping(true);
      setTimeout(() => setPopping(false), 300);
    }
    onClick();
  };

  if (variant === "active") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-[#FA5D19]/40 
                      bg-[#FA5D19]/10 px-3 py-1 text-sm font-medium text-[#FA5D19]
                      transition-all duration-300 hover:border-[#FA5D19]/60 hover:scale-105"
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
      onClick={handleClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200
        hover:scale-105 active:scale-95
        ${popping ? "animate-chip-pop" : ""}
        ${
          selected
            ? "border-[#FA5D19] bg-[#FA5D19] text-white shadow-[0_0_12px_rgba(250,93,25,0.3)] hover:shadow-[0_0_20px_rgba(250,93,25,0.45)]"
            : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200 hover:bg-white/[0.06] hover:shadow-[0_0_8px_rgba(255,255,255,0.03)]"
        }`}
    >
      {name}
    </button>
  );
}
