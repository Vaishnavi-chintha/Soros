"use client";

import { useStackStore } from "@/store/stack-store";
import { TECH_CATALOG } from "@/lib/tech-catalog";
import StackBuilder from "@/components/StackBuilder";
import AnalysisReport from "@/components/AnalysisReport";
import { Layers } from "lucide-react";

export default function Home() {
  const selected = useStackStore((s) => s.selected);
  const result = useStackStore((s) => s.result);
  const status = useStackStore((s) => s.status);
  const setResult = useStackStore((s) => s.setResult);
  const setStatus = useStackStore((s) => s.setStatus);

  const handleAnalyze = async () => {
    setStatus("loading");

    // Build name map from tech IDs
    const stack: Record<string, string> = {};
    for (const [category, techId] of Object.entries(selected)) {
      const tech = TECH_CATALOG[category as keyof typeof TECH_CATALOG]?.find(
        (t) => t.id === techId
      );
      if (tech) stack[category] = tech.name;
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stack }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="flex flex-col items-center gap-3 pt-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FA5D19]/20 bg-[#FA5D19]/5 px-4 py-1.5">
          <Layers size={16} className="text-[#FA5D19]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FA5D19]">
            Soros
          </span>
        </div>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Build your stack.
          <br />
          <span className="text-[#FA5D19]">Get an AI verdict.</span>
        </h1>
        <p className="max-w-lg text-sm leading-relaxed text-zinc-500">
          Select at minimum a frontend and a backend, optionally add more layers, then hit <strong>Analyze</strong>. You&apos;ll — compatibility scores, pairing
          pros &amp; cons, and a production readiness verdict.
        </p>
      </header>

      {/* Builder + Report Layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_480px]">
        {/* Left: Builder */}
        <section>
          <StackBuilder onAnalyze={handleAnalyze} />
        </section>

        {/* Right: Report */}
        <section className="lg:sticky lg:top-10 lg:self-start">
          <AnalysisReport result={result} status={status} />
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] pt-6 text-center text-xs text-zinc-600">
        Soros &copy; {new Date().getFullYear()} &mdash; AI-powered stack
        analysis for production teams.
      </footer>
    </div>
  );
}      
