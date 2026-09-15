// Minimal solver API — calls backend /api/solver endpoints
import { api } from "@/lib/api";

export interface SolverVisual {
  type?: string;
  data?: Record<string, any>;
}

export interface SolverStep {
  title?: string;
  text?: string;
  explanation?: string;
  math_expression?: string;
  hint?: string;
  is_key_step?: boolean;
  visual?: SolverVisual;
}

export interface SolverResponse {
  steps?: SolverStep[];
  final_answer?: string;
  error?: string;
  success?: boolean;
  visual?: SolverVisual;
}

export interface SolveRequest {
  problem_type: string;
  expression: string;
  variables?: Record<string, string>;
}

export async function solveProblem(req: SolveRequest): Promise<SolverResponse> {
  try {
    const res = await api.post<SolverResponse>("/api/solver/solve", req);
    return res;
  } catch (err: any) {
    // Fallback: try fetch directly
    try {
      const r = await fetch("http://localhost:8001/api/solver/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (r.ok) return await r.json();
      return { error: `Solver error: ${r.status}`, success: false };
    } catch (e: any) {
      return { error: e.message || "Failed to solve", success: false };
    }
  }
}

export async function getProblemTypes(subject?: string, classLevel?: number) {
  try {
    const params = new URLSearchParams();
    if (subject) params.append("subject", subject);
    if (classLevel) params.append("class", String(classLevel));
    const res = await api.get(`/api/solver/types?${params.toString()}`);
    return res;
  } catch {
    return { problem_types: [] };
  }
}
