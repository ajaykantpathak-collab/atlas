"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Compass,
  PartyPopper,
  Scale,
  Scale as ScaleIcon,
  Sparkles,
  XCircle,
} from "lucide-react";
import {
  sanitizeTutorText,
  type SubmitResult,
} from "./tutorShared";

/**
 * VerdictCard — honest grading feedback: celebrate small wins, never
 * shame a miss, always show the worked method.  Includes the tutor's
 * natural "voice" line as the framing and a "Teach me this" escape hatch.
 */

const OUTCOME_UI: Record<
  string,
  { icon: typeof CircleCheck; cls: string; label: string }
> = {
  correct: {
    icon: CircleCheck,
    cls: "border-emerald-500/30 bg-emerald-500/[0.08]",
    label: "Correct — nicely done",
  },
  wrong: {
    icon: XCircle,
    cls: "border-rose-500/30 bg-rose-500/[0.07]",
    label: "Not yet — and that's fine",
  },
  lets_learn: {
    icon: BookOpen,
    cls: "border-gold-500/30 bg-gold-500/[0.07]",
    label: "Let's learn it together",
  },
  micro_win: {
    icon: PartyPopper,
    cls: "border-emerald-500/30 bg-emerald-500/[0.08]",
    label: "Small win — that's the method warming up",
  },
  micro_win_miss: {
    icon: Sparkles,
    cls: "border-gold-500/30 bg-gold-500/[0.07]",
    label: "No marks lost — here are the steps",
  },
  self_check: {
    icon: Scale,
    cls: "border-sky-500/30 bg-sky-500/[0.07]",
    label: "Compare your work",
  },
  ungraded: {
    icon: Compass,
    cls: "border-sky-500/30 bg-sky-500/[0.07]",
    label: "Let's see the method",
  },
};

export default function VerdictCard({
  result,
  onTeach,
}: {
  result: SubmitResult;
  onTeach?: () => void;
}) {
  const [showSteps, setShowSteps] = useState(
    result.outcome !== "correct"
  );

  const ui = OUTCOME_UI[result.outcome] ?? OUTCOME_UI.ungraded;
  const Icon = ui.icon;
  const voice = result.voice?.text ? sanitizeTutorText(result.voice.text) : "";
  const note = result.note ? sanitizeTutorText(result.note) : "";
  const stepsText = sanitizeTutorText(result.worked_solution || "");
  const stepsLines = stepsText
    ? stepsText.split(/\n+/).map((l) => l.trim()).filter(Boolean)
    : [];

  return (
    <div className={`rounded-3xl border px-5 py-4 ${ui.cls}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Icon className="h-5 w-5 shrink-0 text-white/90" />
        <span className="font-display text-sm font-semibold text-white">
          {ui.label}
        </span>
        {typeof result.mastery === "number" && result.attempts > 0 && (
          <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
            mastery {Math.round(result.mastery * 100)}%
          </span>
        )}
      </div>

      {voice && voice !== stepsText && (
        <p className="mt-2.5 text-sm leading-relaxed text-white/85">{voice}</p>
      )}
      {!voice && note && (
        <p className="mt-2.5 text-sm leading-relaxed text-white/85">{note}</p>
      )}
      {voice && note && note !== voice && (
        <p className="mt-1 text-xs leading-relaxed text-white/55">{note}</p>
      )}

      {stepsLines.length > 0 && (
        <div className="mt-3">
          {result.outcome === "correct" && !showSteps ? (
            <button
              onClick={() => setShowSteps(true)}
              className="flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-emerald-400/50 hover:text-emerald-300"
            >
              <ScaleIcon className="h-3.5 w-3.5" /> See the worked steps
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          ) : (
            <>
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Worked steps
              </div>
              <ol className="space-y-1.5">
                {stepsLines.map((l, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 rounded-xl bg-black/20 px-3.5 py-2 text-sm leading-relaxed text-white/85"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white/70">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre-wrap">{l}</span>
                  </li>
                ))}
              </ol>
              {result.outcome === "correct" && (
                <button
                  onClick={() => setShowSteps(false)}
                  className="mt-2 flex items-center gap-1 text-[11px] text-white/40 hover:text-white/60"
                >
                  <ChevronUp className="h-3 w-3" /> hide steps
                </button>
              )}
            </>
          )}
        </div>
      )}

      {result.outcome !== "correct" && onTeach && (
        <button
          onClick={onTeach}
          className="mt-3.5 flex min-h-11 items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-300 transition-all hover:bg-gold-500/20 active:scale-95"
        >
          <BookOpen className="h-4 w-4" />
          Teach me this from zero
        </button>
      )}
    </div>
  );
}
