/**
 * tutorShared.ts — shared types, API plumbing and the metadata-leak
 * sanitizer for the competency tutor chat.
 *
 * Backend contract: /api/tutor-graph/* (see backend/api/competency_tutor.py).
 * Every string that gets RENDERED passes through `sanitizeTutorText`:
 * question ids, node ids, TOPIC_TAG / ANSWER style tags and pool-index
 * suffixes ("abc::3") must never reach the student's screen.
 */

import { getAuthToken } from "@/lib/api";

// ─── Backend response shapes ──────────────────────────────────

export type ServeVoice = {
  text: string;
  intent?: string;
  template_id?: string;
  hinglish?: boolean;
};

/**
 * Optional warm-up debate attached to a serve when the concept has an
 * authored COMMON_MISCONCEPTION (see backend/its/tutoring/discussion_moments.py).
 * Two claims, one correct — pick a side, then the reveal settles it.
 * Purely a warm-up: never affects marks.
 */
export type Discussion = {
  claimA: string;
  claimB: string;
  correctIndex: 0 | 1;
  reveal: string;
};

export type Served = {
  question_id: string;
  concept_id: string;
  concept_title: string;
  question: string;
  hints_available: number;
  tier?: string;
  micro_win?: boolean;
  retreated_from?: string;
  retreat_voice?: string;
  voice?: ServeVoice;
  /** verbal science items serve as multiple choice: pick an option */
  options?: string[];
  answer_mode?: "mcq" | string;
  /** warm-up debate — present only when a misconception is available */
  discussion?: Discussion;
};

export type SubmitOutcome =
  | "correct"
  | "correct_revealed"
  | "wrong"
  | "ungraded"
  | "self_check"
  | "lets_learn"
  | "micro_win"
  | "micro_win_miss";

export type SubmitResult = {
  outcome: SubmitOutcome;
  mastery: number;
  attempts: number;
  worked_solution: string;
  expected?: string;
  note?: string;
  retreat_to?: string;
  voice?: ServeVoice;
  micro_win?: boolean;
};

export type Hint = {
  level: number;
  hint: string;
  simple_hint?: boolean;
  topic?: string;
  style?: string;
};

export type TeachDiagnostic = {
  index: number;
  question: string;
  answer: string;
  misconception: string;
};

export type TeachCard = {
  node_id: string;
  concept_id?: string;
  class: number;
  subject: string;
  chapter: string;
  cognitive_level: string;
  definition: string;
  walkthrough: string;
  diagnostic: TeachDiagnostic | null;
};

export type AskResponse = {
  teach?: boolean;
  verified?: boolean;
  label?: string;
  answer: string;
  steps?: string[];
  refusal_reason?: string | null;
  socratic?: string | null;
  source?: string;
  topic?: string;
  /** Doubt→Story bridge: the question resolved to a real corpus node,
   *  so the answer carries its verified Story Mode deep link
   *  (/learn/<node>/story). Absent when nothing resolved — never fake. */
  story_url?: string | null;
};

export type SubjectProgress = {
  concepts: number;
  avg_mastery: number;
  mastered: number;
};

export type Progress = {
  per_subject: Record<string, SubjectProgress>;
  open_mistakes: number;
  total_attempts: number;
};

// ─── Auth-aware plumbing ──────────────────────────────────────

/** Bearer token the rest of the student app stores (practice/homework pages). */
export function tutorAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return (
      getAuthToken() ||
      localStorage.getItem("token") ||
      null
    );
  } catch {
    return null;
  }
}

/** JWT `sub` when signed in; a stable anonymous id otherwise. */
export function tutorStudentId(): string {
  const token = tutorAuthToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      if (payload && payload.sub) return String(payload.sub);
    } catch {
      /* not a JWT — fall through */
    }
  }
  return "guest";
}

/**
 * The signed-in student's class (1-12), or null when unknown.
 * Reads the persisted auth store ("dream-auth" — the same source the
 * auth hydration uses). Ask payloads carry this as class_level so the
 * backend's teach lane searches ONLY the student's own class — the
 * GRADE-MAP fix for cross-class doubt misrouting.
 */
export function tutorUserClassLevel(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("dream-auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      state?: { user?: { class_level?: unknown; classLevel?: unknown } | null };
      user?: { class_level?: unknown; classLevel?: unknown } | null;
    };
    const user = parsed?.state?.user ?? parsed?.user ?? null;
    const v = Number(user?.class_level ?? user?.classLevel);
    return Number.isFinite(v) && v >= 1 && v <= 12 ? v : null;
  } catch {
    return null;
  }
}

export function tutorHeaders(json = false): Record<string, string> {
  const headers: Record<string, string> = {};
  const token = tutorAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

// ─── Metadata-leak sanitizer ──────────────────────────────────

/**
 * Strip machine metadata from any string before it is rendered:
 *  - "concept_id::3" pool-index suffixes            -> drops " ::3"
 *  - knowledge-node ids (c10_math_012, jemh.103.3.1) -> dropped
 *  - TOPIC_TAG / ANSWER / HINT marker tags          -> dropped
 *  - "[answer: ...]" / "answer=..." field labels    -> label removed
 * Plain prose, maths and numbers are left untouched.
 */
export function sanitizeTutorText(raw: string): string {
  if (!raw) return "";
  // [object Object] guard (GRADE-MAP P1): backend fields rendered here
  // (socratic, answer, steps) can arrive as structured objects
  // (multi-hop verdicts, concept-guidance dicts) — String()-coercing
  // those put the literal "[object Object]" into student-visible
  // replies. Only genuine strings (or an object carrying a usable
  // text/hint string) survive; everything else renders as nothing.
  let value: unknown = raw;
  if (typeof value !== "string") {
    const obj = value as { text?: unknown; hint?: unknown } | null;
    const inner =
      obj && typeof obj === "object" ? obj.text ?? obj.hint : undefined;
    value = typeof inner === "string" ? inner : "";
  }
  if (!value) return "";
  let s = value as string;
  // explicit authoring tags
  s = s.replace(/\b(TOPIC_TAG|ANSWER_TAG|QUESTION_TAG|HINT_TAG)\b/g, "");
  // "ANSWER:" / "TOPIC:" style field labels at line starts
  s = s.replace(/^\s*(ANSWER|TOPIC|CONCEPT_ID|NODE_ID|QUESTION_ID)\s*[:=-]\s*/gim, "");
  // bracketed machine fields: [answer: 42], [topic: xyz]
  s = s.replace(/\[(answer|topic|concept_id|node_id|question_id)\s*:\s*[^\]]*\]/gi, "");
  // concept ids with pool index: "abc::3" / "abc#3"
  s = s.replace(/\b[a-z][a-z0-9]*(?:\.[a-z0-9]+)*::\s*\d+\b/gi, "");
  s = s.replace(/\b[a-z][a-z0-9]*(?:\.[a-z0-9]+)*#\d+\b/gi, "");
  // node-id shapes: c10_math_012 / c12_cs_045 / jemh.103.3.1 / ncert_7_sc_003
  s = s.replace(/\b[a-z]{1,6}\d{0,2}_[a-z0-9]{1,12}(_[a-z0-9]{1,12})*_\d{1,4}\b/gi, "");
  s = s.replace(/\b[a-z]{2,6}\.\d{1,4}(?:\.\d{1,4}){1,3}\b/g, "");
  // collapse whitespace artefacts left by removals
  s = s.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

/** Truthy when a string looks like a bare machine id (never render it). */
export function looksLikeMachineId(s: string): boolean {
  return /^(?:[a-z]{1,6}\d{0,2}_)+\d{1,4}$|^[a-z]{2,6}\.\d+(\.\d+)+$|^[a-z0-9]+::\d+$/i.test(
    s.trim()
  );
}

// ─── Small display helpers ────────────────────────────────────

export const TIER_LABEL: Record<string, string> = {
  easy: "Warm-up",
  grade: "Core",
  hard: "Challenge",
  grade12: "Board level",
};

export function tierLabel(tier?: string): string | null {
  if (!tier) return null;
  return TIER_LABEL[tier] ?? null;
}

export function subjectLabel(s: string): string {
  return (s || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
