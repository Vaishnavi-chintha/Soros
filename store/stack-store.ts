"use client";

import { create } from "zustand";
import { AnalysisResult, AnalysisStatus, TechCategory } from "@/lib/types";

import { REQUIRED_CATEGORIES } from "@/lib/types";

interface StackState {
  /** Map of category -> technology id */
  selected: Partial<Record<TechCategory, string>>;
  /** Analysis result */
  result: AnalysisResult | null;
  /** Analysis loading state */
  status: AnalysisStatus;

  /** Select a tech for a category (replaces any existing) */
  select: (category: TechCategory, techId: string) => void;
  /** Remove a tech from a category */
  remove: (category: TechCategory) => void;
  /** Clear all selections */
  clearAll: () => void;
  /** Set analysis result */
  setResult: (result: AnalysisResult) => void;
  /** Set analysis status */
  setStatus: (status: AnalysisStatus) => void;
  /** How many categories have a selection */
  selectionCount: () => number;
  /** Are the required minimum categories (Frontend + Backend) selected? */
  hasMinimum: () => boolean;
}

export const useStackStore = create<StackState>((set, get) => ({
  selected: {},
  result: null,
  status: "idle",

  select: (category, techId) =>
    set((s) => ({
      selected: { ...s.selected, [category]: techId },
      result: null,
      status: "idle",
    })),

  remove: (category) =>
    set((s) => {
      const next = { ...s.selected };
      delete next[category];
      return { selected: next, result: null, status: "idle" };
    }),

  clearAll: () => set({ selected: {}, result: null, status: "idle" }),

  setResult: (result) => set({ result, status: "success" }),

  setStatus: (status) => set({ status }),

  selectionCount: () => Object.keys(get().selected).length,

  hasMinimum: () =>
    REQUIRED_CATEGORIES.every((cat) => cat in get().selected),
}));
