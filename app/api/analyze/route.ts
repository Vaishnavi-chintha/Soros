import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/system-prompt";

/**
 * POST /api/analyze
 *
 * Expects JSON body: { stack: Record<string, string> }
 * e.g. { Frontend: "Next.js", Backend: "FastAPI", ... }
 *
 * Returns a mocked AI analysis so the UI works end-to-end
 * without an API key. Replace the mock logic below with your
 * actual LLM call (OpenAI / Anthropic / Groq / etc.).
 */
export async function POST(request: NextRequest) {
  try {
    const { stack } = (await request.json()) as {
      stack: Record<string, string>;
    };

    if (!stack || Object.keys(stack).length === 0) {
      return NextResponse.json(
        { error: "Stack is required" },
        { status: 400 }
      );
    }

    // Build the system prompt (ready to send to an LLM)
    const systemPrompt = buildSystemPrompt(stack);

    // ------------------------------------------------------------------
    // 👇 Replace this block with your real LLM call
    // ------------------------------------------------------------------
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [{ role: "system", content: systemPrompt }],
    //   response_format: { type: "json_object" },
    // });
    // const result = JSON.parse(completion.choices[0].message.content!);

    // For now, generate a deterministic mock based on the stack
    const result = generateMockAnalysis(stack);
    // ------------------------------------------------------------------

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze stack" },
      { status: 500 }
    );
  }
}

/** Deterministic mock analysis so the UI works out of the box */
function generateMockAnalysis(stack: Record<string, string>) {
  const entries = Object.entries(stack);
  const techs = entries.map(([, name]) => name);

  // Pair all techs
  const pairings = [];
  for (let i = 0; i < techs.length; i++) {
    for (let j = i + 1; j < techs.length; j++) {
      const seed = (techs[i] + techs[j]).length;
      const score = 55 + (seed % 40);
      pairings.push({
        pair: [techs[i], techs[j]] as [string, string],
        compatibility: score,
        pros: [
          `${techs[i]} and ${techs[j]} are both actively maintained.`,
          `Strong community support and documentation available.`,
        ],
        cons: [
          score < 70
            ? `Minor integration overhead between ${techs[i]} and ${techs[j]}.`
            : `No significant issues found.`,
          `Ensure version alignment for long-term stability.`,
        ],
      });
    }
  }

  const avgScore = Math.round(
    pairings.reduce((sum, p) => sum + p.compatibility, 0) / pairings.length
  );

  const verdict =
    avgScore >= 80
      ? "PRODUCTION_READY"
      : avgScore >= 55
        ? "VIABLE_WITH_CAVEATS"
        : "NOT_RECOMMENDED";

  const summary =
    verdict === "PRODUCTION_READY"
      ? `Your stack of ${techs.join(", ")} is a battle-tested, production-grade combination. Each layer complements the others well with mature ecosystems and proven patterns.`
      : verdict === "VIABLE_WITH_CAVEATS"
        ? `Your stack of ${techs.join(", ")} works but has a few friction points to be aware of. With careful integration and version management, it can serve production traffic reliably.`
        : `Your stack of ${techs.join(", ")} has fundamental compatibility concerns that make it risky for production. Consider swapping one or more components.`;

  return {
    overallCompatibility: avgScore,
    pairings,
    verdict: verdict as
      | "PRODUCTION_READY"
      | "VIABLE_WITH_CAVEATS"
      | "NOT_RECOMMENDED",
    summary,
    recommendations: [
      "Pin all dependency versions in package.json / requirements.txt.",
      "Set up CI with integration tests covering each layer boundary.",
      "Use Docker Compose for local development parity with production.",
      avgScore < 70
        ? "Consider replacing the weakest pairing for better synergy."
        : "Add monitoring (Sentry, Datadog) before going live.",
    ],
  };
}
