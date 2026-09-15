"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { sanitizeTutorText, subjectLabel } from "./tutorShared";

/**
 * TeachCard — renders a teaching node: definition, walkthrough and the
 * first diagnostic question with a reveal-me answer.  Used for the
 * "Teach me this" card (GET /teach) and for teach-style /ask answers.
 * All text passes the sanitizer; machine ids never render.
 */

export type TeachCardContent = {
  chapter?: string;
  subject?: string;
  definition: string;
  walkthrough?: string;
  diagnostic?: {
    question: string;
    answer: string;
    misconception?: string;
  } | null;
  sourceLabel?: string;
};

export default function TeachCard({ card }: { card: TeachCardContent }) {
  const [reveal, setReveal] = useState(false);

  const definition = sanitizeTutorText(card.definition || "");
  const walkthrough = sanitizeTutorText(card.walkthrough || "");
  const dq = card.diagnostic
    ? sanitizeTutorText(card.diagnostic.question || "")
    : "";
  const da = card.diagnostic
    ? sanitizeTutorText(card.diagnostic.answer || "")
    : "";
  const dm = card.diagnostic
    ? sanitizeTutorText(card.diagnostic.misconception || "")
    : "";

  if (!definition && !walkthrough && !dq) return null;

  const walkthroughLines = walkthrough
    ? walkthrough
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="overflow-hidden rounded-3xl border border-gold-500/25 bg-gradient-to-b from-gold-500/[0.08] to-transparent">
      <div className="flex items-center gap-2 border-b border-gold-500/20 bg-gold-500/10 px-5 py-3">
        <GraduationCap className="h-4 w-4 text-gold-300" />
        <span className="font-display text-sm font-semibold tracking-wide text-gold-200">
          {card.sourceLabel ?? "Teach me"}
        </span>
        {(card.chapter || card.subject) && (
          <span className="ml-auto truncate text-xs text-gold-200/60">
            {[card.chapter, card.subject ? subjectLabel(card.subject) : ""]
              .filter(Boolean)
              .join(" · ")}
          </span>
        )}
      </div>

      <div className="space-y-4 px-5 py-4">
        {definition && (
          <p className="text-[15px] leading-relaxed text-white/90">
            {definition}
          </p>
        )}

        {walkthroughLines.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold-400/80">
              <BookOpen className="h-3 w-3" /> Walkthrough
            </div>
            {walkthroughLines.map((line, i) => (
              <p
                key={i}
                className="whitespace-pre-wrap rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm leading-relaxed text-white/80"
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {dq && da && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-sky-300/90">
              <Sparkles className="h-3 w-3" /> Quick check
            </div>
            <p className="text-sm text-white/85">{dq}</p>
            {!reveal ? (
              <button
                onClick={() => setReveal(true)}
                className="mt-2 min-h-9 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-gold-500/40 hover:text-gold-300"
              >
                Try it, then reveal
              </button>
            ) : (
              <div className="mt-2 space-y-1.5">
                <p className="text-sm font-medium text-emerald-300">
                  {da}
                </p>
                {dm && (
                  <p className="text-xs leading-relaxed text-rose-200/80">
                    Common slip: {dm}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
