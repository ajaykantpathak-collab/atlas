"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleX, MessagesSquare, Scale } from "lucide-react";
import { sanitizeTutorText, type Discussion } from "./tutorShared";

/**
 * DiscussionDebate — the coach-vs-skeptic warm-up debate.
 *
 * Rendered only when the serve carries an optional `discussion` object
 * (built by the backend from the concept's authored COMMON_MISCONCEPTION).
 * Two pickable sides; a pick reveals which claim was correct and why.
 * Deliberately marks-neutral: it never feeds /submit or mastery.
 */

export default function DiscussionDebate({
  discussion,
}: {
  discussion: Discussion;
}) {
  const [picked, setPicked] = useState<0 | 1 | null>(null);

  const claims = [discussion.claimA, discussion.claimB].map((c) =>
    sanitizeTutorText(c)
  );
  const reveal = sanitizeTutorText(discussion.reveal);
  const correct = discussion.correctIndex;

  return (
    <div className="mb-4 rounded-2xl border border-gold-500/25 bg-gold-500/[0.05] p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
          <Scale className="h-3.5 w-3.5" /> Warm-up debate
        </span>
        <span className="flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-white/45">
          <MessagesSquare className="h-3 w-3" /> two tutors disagree
        </span>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-white/60">
        Two tutors argue about this topic. Who do you agree with?
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        {claims.map((claim, i) => {
          const isPicked = picked === i;
          const isCorrect = correct === i;
          const showVerdict = picked !== null;
          return (
            <button
              key={i}
              onClick={() => picked === null && setPicked(i as 0 | 1)}
              disabled={picked !== null}
              aria-pressed={isPicked}
              className={`rounded-2xl border p-3.5 text-left transition-all focus:outline-none focus:ring-4 focus:ring-gold-500/15 ${
                showVerdict
                  ? isCorrect
                    ? "border-emerald-500/50 bg-emerald-500/[0.08]"
                    : isPicked
                      ? "border-rose-500/45 bg-rose-500/[0.07]"
                      : "border-white/[0.06] bg-black/15 opacity-60"
                  : "cursor-pointer border-white/10 bg-black/25 hover:border-gold-500/60 hover:bg-gold-500/[0.07] active:scale-[0.99]"
              }`}
            >
              <span className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                    showVerdict && isCorrect
                      ? "border-emerald-400/60 text-emerald-300"
                      : showVerdict && isPicked
                        ? "border-rose-400/60 text-rose-300"
                        : "border-white/15 text-gold-300"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {i === 0 ? "Tutor A says" : "Tutor B says"}
                {showVerdict && isCorrect && (
                  <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-400" />
                )}
                {showVerdict && isPicked && !isCorrect && (
                  <CircleX className="ml-auto h-4 w-4 text-rose-400" />
                )}
              </span>
              <span className="block text-sm leading-relaxed text-white/85">
                {claim}
              </span>
            </button>
          );
        })}
      </div>

      {picked !== null ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 170, damping: 22 }}
          className="mt-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] p-3.5"
        >
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            {correct === picked
              ? "Good instinct — you picked the right side"
              : "The other tutor was right"}
          </p>
          <p className="text-sm leading-relaxed text-white/85">{reveal}</p>
        </motion.div>
      ) : (
        <p className="mt-3 text-[11px] text-white/30">
          Pick a side to see who was right — just a warm-up, your marks are
          safe.
        </p>
      )}
    </div>
  );
}
