export function buildSystemPrompt(stack: Record<string, string>): string {
  const stackSummary = Object.entries(stack)
    .map(([category, tech]) => `- **${category}:** ${tech}`)
    .join("\n");

  return `You are a seasoned Full-Stack Architect with 15 years of experience evaluating technology stacks for production-grade SaaS applications.

A user has assembled the following stack (note: only the categories listed below are included; unlisted categories were not selected and should be considered undecided):

${stackSummary}

Your task: perform a rigorous feasibility analysis and return **only valid JSON** (no markdown fences, no extra text) in this exact shape:

{
  "overallCompatibility": <number 1-100>,
  "pairings": [
    {
      "pair": ["TechA", "TechB"],
      "compatibility": <number 1-100>,
      "pros": ["pro 1", "pro 2"],
      "cons": ["con 1", "con 2"]
    }
  ],
  "verdict": "<one of: PRODUCTION_READY | VIABLE_WITH_CAVEATS | NOT_RECOMMENDED>",
  "summary": "<2-3 sentence executive summary>",
  "recommendations": ["<actionable recommendation>"]
}

Rules:
- overallCompatibility: weighted average of all pairings, factoring in ecosystem maturity.
- pairings: analyze every unique pair — explain why they do or don't work together.
- verdict choices:
  • PRODUCTION_READY — battle-tested, no red flags.
  • VIABLE_WITH_CAVEATS — works but has known friction points.
  • NOT_RECOMMENDED — fundamental conflicts or missing pieces.
- summary: crisp, executive-level.
- recommendations: 2-4 concrete, actionable improvements.

Be honest and critical. Flag version conflicts, architectural mismatches, security concerns, and scaling bottlenecks. If the stack is solid, say so confidently.`;
}
