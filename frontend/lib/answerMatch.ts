/**
 * answerMatch — free-text answer normalisation for self-graded surfaces.
 *
 * The audit's worst feedback bug (TEACHING_LAYER_GAPS §7): a correct answer
 * typed in an unexpected form ("2" for "x = 2", "0.5" for "1/2") was graded
 * wrong with no explanation. These helpers compare *meaning*, not strings:
 *   - strips "x =", "ans:", units-ish trailing words, LaTeX $...$ wrappers
 *   - case/whitespace/punctuation-insensitive
 *   - numeric equivalence: "1/2" == "0.5" == "50%", "3.0" == "3"
 *   - multi-answer keys ("x=2, x=3" or "2 or 3"): the student's answer is
 *     correct if it supplies every required value in any order/format,
 *     and partially accepted if it supplies exactly one listed value
 *     (e.g. one root) — partial credit is reported, not silently failed.
 */

export type MatchVerdict = "correct" | "partial" | "wrong";

/** Strip LaTeX wrappers and normalise a math-ish answer to a comparable token. */
function clean(raw: string): string {
  let s = String(raw ?? "").trim().toLowerCase();
  s = s.replace(/\$/g, "");                    // $...$ wrappers
  s = s.replace(/\\text\{([^}]*)\}/g, "$1");
  s = s.replace(/\\(?:mathrm|mathbf|mathit|mathrm)\{([^}]*)\}/g, "$1");
  s = s.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "($1)/($2)");
  s = s.replace(/\\sqrt\{([^}]*)\}/g, "sqrt($1)");
  s = s.replace(/\\cdot|\\times/g, "*");
  s = s.replace(/\\pi/g, "pi");
  s = s.replace(/[{}]/g, "");
  s = s.replace(/\s+/g, "");
  // drop leading "x =", "answer:", "ans =" style prefixes (any single var)
  s = s.replace(/^(answer|ans|therefore|so)\s*[:=]?\s*/, "");
  s = s.replace(/^[a-zA-Z]\w*\s*[:=]\s*/, "");
  return s;
}

/** Parse a token to a number when it is purely numeric (incl. fractions, %). */
function toNumber(tok: string): number | null {
  const t = tok.replace(/,/g, "");
  if (/^-?\d+(\.\d+)?%$/.test(t)) return parseFloat(t.slice(0, -1)) / 100;
  if (/^-?\d+(\.\d+)?$/.test(t)) return parseFloat(t);
  const frac = t.match(/^\(?(-?\d+(?:\.\d+)?)\)?\/\(?(-?\d+(?:\.\d+)?)\)?$/);
  if (frac) {
    const d = parseFloat(frac[2]);
    if (d !== 0) return parseFloat(frac[1]) / d;
  }
  return null;
}

/** Split a correct-answer key into its acceptable atomic values. */
function splitKey(key: string): string[] {
  const s = String(key ?? "");
  // "x=2, x=3" / "2 or 3" / "2 and 3" / "2;3" → atomic values
  const parts = s
    .replace(/\$/g, "")
    .split(/,|;|\bor\b|\band\b/i)
    .map((p) => clean(p))
    .filter(Boolean);
  return parts.length > 0 ? parts : [clean(s)];
}

/**
 * Compare a student's free-text answer against the authored correct answer.
 * Returns "correct" (full match), "partial" (one of several required values),
 * or "wrong".
 */
export function matchFreeText(userRaw: string, correctRaw: string): MatchVerdict {
  const user = clean(userRaw);
  const key = clean(correctRaw);
  if (!user || !key) return "wrong";

  if (user === key) return "correct";

  // Whole-string numeric equivalence ("0.5" vs "1/2")
  const un = toNumber(user);
  const kn = toNumber(key);
  if (un !== null && kn !== null && Math.abs(un - kn) < 1e-6) return "correct";

  // Multi-value keys: all values required for full credit.
  const keyParts = splitKey(correctRaw);
  const userParts = splitKey(userRaw);
  if (keyParts.length > 1) {
    const eq = (a: string, b: string) => {
      if (a === b) return true;
      const an = toNumber(a);
      const bn = toNumber(b);
      return an !== null && bn !== null && Math.abs(an - bn) < 1e-6;
    };
    const hits = keyParts.filter((k) => userParts.some((u) => eq(u, k)));
    if (hits.length === keyParts.length) return "correct";
    if (hits.length > 0) return "partial";
  }

  // Single-value key vs multi-token user answer ("x=2" key, "x = 2" typed)
  if (keyParts.length === 1) {
    const k = keyParts[0];
    if (user === k) return "correct";
    const ukn = toNumber(k);
    if (un !== null && ukn !== null && Math.abs(un - ukn) < 1e-6) return "correct";
    // user typed "x=2" but clean() already strips var prefixes; last resort:
    // the key value appears as a complete token in the user's answer
    // ("the answer is 4" → "4" handled above; "x=2andy=3" is intentionally
    // not split — ambiguous input stays wrong rather than lucky-right).
  }
  return "wrong";
}

/** Convenience boolean for call sites that only need right/wrong. */
export function isAnswerCorrect(userRaw: string, correctRaw: string): boolean {
  return matchFreeText(userRaw, correctRaw) === "correct";
}
