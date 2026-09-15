"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lightbulb, Loader2 } from "lucide-react";
import {
  sanitizeTutorText,
  tutorHeaders,
  tutorStudentId,
  type Hint,
} from "./tutorShared";

/**
 * HintLadder — the 3-level hint ladder (level 1 -> 2 -> 3, strictly in
 * order, never the bare answer).  Level 1 may come back as the authored
 * simple/Hinglish explanation (simple_hint) and is labelled as such.
 * One button reveals one rung at a time: "Nudge" -> "Method" -> "Full steps".
 */

const RUNGS: { level: number; label: string }[] = [
  { level: 1, label: "Nudge" },
  { level: 2, label: "Method" },
  { level: 3, label: "Full steps" },
];

export default function HintLadder({
  questionId,
  disabled = false,
}: {
  questionId: string;
  disabled?: boolean;
}) {
  const [hints, setHints] = useState<Hint[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const nextLevel =
    RUNGS.find((r) => !hints.some((h) => h.level === r.level))?.level ?? null;

  const askNext = useCallback(async () => {
    if (!questionId || nextLevel === null || loading) return;
    setLoading(true);
    setFailed(false);
    try {
      const r = await fetch(
        `/api/tutor-graph/hint?student_id=${encodeURIComponent(tutorStudentId())}` +
          `&question_id=${encodeURIComponent(questionId)}&level=${nextLevel}`,
        { headers: tutorHeaders() }
      );
      if (r.ok) {
        const h: Hint = await r.json();
        setHints((prev) =>
          [...prev.filter((x) => x.level !== h.level), h].sort(
            (a, b) => a.level - b.level
          )
        );
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [questionId, nextLevel, loading]);

  const exhausted = nextLevel === null;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={askNext}
          disabled={disabled || exhausted || loading}
          className="flex min-h-11 items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-300 transition-all hover:bg-gold-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="h-4 w-4" />
          )}
          {exhausted
            ? "All hints shown"
            : hints.length === 0
              ? "I need a hint"
              : `Give me more (hint ${nextLevel})`}
        </button>
        {hints.length > 0 && !exhausted && (
          <span className="text-xs text-white/40">
            rung {hints.length} of 3 · the answer never shows up here
          </span>
        )}
        {failed && (
          <span className="text-xs text-rose-300/80">
            hint didn&apos;t load — try once more
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hints.map((h) => {
          const text = sanitizeTutorText(h.hint || "");
          if (!text) return null;
          const isSimple = !!h.simple_hint;
          return (
            <motion.div
              key={h.level}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2.5 rounded-2xl border border-gold-500/25 bg-gold-500/[0.07] px-4 py-3"
            >
              <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                <Lightbulb className="h-3 w-3" />
                Hint {h.level} · {RUNGS[h.level - 1]?.label}
                {isSimple && (
                  <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] normal-case tracking-normal text-gold-200">
                    in simple words
                  </span>
                )}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-amber-100/90">
                {text}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {exhausted && hints.length > 0 && (
        <p className="mt-2 flex items-center gap-1 text-xs text-white/35">
          <ChevronDown className="h-3 w-3" />
          That is the whole method — try it on paper, then type your answer.
        </p>
      )}
    </div>
  );
}
