"use client";

import { CheckCircle2, Compass, HelpCircle, ShieldCheck } from "lucide-react";
import { sanitizeTutorText, type AskResponse } from "./tutorShared";
import TeachCard, { type TeachCardContent } from "./TeachCard";

/**
 * AskResponseCard — renders a free-form /ask response beautifully:
 *  - teach lane  -> TeachCard (authored explanation, gold)
 *  - VERIFIED    -> numeric answer + numbered steps (emerald, honest badge)
 *  - guided lane -> the honest "I won't guess" refusal + socratic nudge
 */

export default function AskResponseCard({ res }: { res: AskResponse }) {
  const answer = sanitizeTutorText(res.answer || "");
  const steps = (res.steps || [])
    .map((s) => sanitizeTutorText(s))
    .filter(Boolean);

  // Teach lane: authored content -> teach card treatment
  if (res.teach && answer) {
    const card: TeachCardContent = {
      definition: answer,
      sourceLabel: res.topic ? `Teach · ${sanitizeTutorText(res.topic)}` : "Teach me",
    };
    return <TeachCard card={card} />;
  }

  if (res.verified) {
    return (
      <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.06] px-5 py-4">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5" /> Verified answer
        </div>
        {answer && (
          <p className="font-display text-xl font-semibold text-white">
            {answer}
          </p>
        )}
        {steps.length > 0 && (
          <ol className="mt-3 space-y-1.5">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-white/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-semibold text-emerald-300">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }

  // Guided / refusal lane
  return (
    <div className="rounded-3xl border border-amber-500/25 bg-amber-500/[0.06] px-5 py-4">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
        <Compass className="h-3.5 w-3.5" /> Let&apos;s think it through
      </div>
      {answer ? (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/85">
          {answer}
        </p>
      ) : (
        <p className="text-sm leading-relaxed text-white/85">
          I don&apos;t want to guess this one — a wrong shortcut sticks.
          Try it as a &ldquo;why&rdquo; question, or tell me which part confuses you.
        </p>
      )}
      {res.refusal_reason && (
        <p className="mt-2 text-xs text-amber-200/70">
          {sanitizeTutorText(res.refusal_reason)}
        </p>
      )}
      {res.socratic && (
        <p className="mt-3 flex gap-2 rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-sm italic text-amber-100/90">
          <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          {sanitizeTutorText(res.socratic)}
        </p>
      )}
      {!answer && !res.socratic && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-white/40">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Real answers only — that is the rule here.
        </p>
      )}
    </div>
  );
}
