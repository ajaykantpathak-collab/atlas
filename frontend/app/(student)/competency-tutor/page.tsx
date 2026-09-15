"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  BookOpen,
  Brain,
  ChevronRight,
  Loader2,
  MessagesSquare,
  RefreshCw,
  Sparkles,
  Target,
  TrendingDown,
} from "lucide-react";
import HintLadder from "@/components/tutor/HintLadder";
import TeachCard, { type TeachCardContent } from "@/components/tutor/TeachCard";
import AskResponseCard from "@/components/tutor/AskResponseCard";
import ProgressPanel from "@/components/tutor/ProgressPanel";
import VerdictCard from "@/components/tutor/VerdictCard";
import DiscussionDebate from "@/components/tutor/DiscussionDebate";
import {
  sanitizeTutorText,
  tierLabel,
  tutorHeaders,
  tutorStudentId,
  type AskResponse,
  type Progress,
  type Served,
  type SubmitResult,
  type TeachCard as TeachCardType,
} from "@/components/tutor/tutorShared";

/**
 * Competency Tutor — a chat, not a form.
 *
 * The tutor's natural-language "voice" frames every turn; the question
 * card sits inline in the conversation; hints climb a 3-rung ladder;
 * stuck students get a teach-me card; free-form "why" questions go to
 * the WHY-lane.  Only real mastery from /progress is ever shown.
 */

type Msg =
  | { id: string; kind: "tutor"; text: string }
  | { id: string; kind: "retreat"; text: string }
  | { id: string; kind: "question"; served: Served }
  | { id: string; kind: "answer"; text: string }
  | {
      id: string;
      kind: "verdict";
      result: SubmitResult;
      conceptTitle: string;
      conceptId: string;
    }
  | { id: string; kind: "teach"; card: TeachCardContent }
  | { id: string; kind: "ask"; question: string; res: AskResponse }
  | { id: string; kind: "error"; text: string };

type Stats = {
  concepts: number;
  subjects: Record<string, number>;
  generated_questions?: number;
};

let seq = 0;
const nid = () => `m${++seq}`;

const CLASS_LEVELS = [null, 6, 7, 8, 9, 10, 11, 12];

export default function CompetencyTutorPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [classLevel, setClassLevel] = useState<number | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [served, setServed] = useState<Served | null>(null);
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [asking, setAsking] = useState(false);
  const [askInput, setAskInput] = useState("");
  const [progress, setProgress] = useState<Progress | null>(null);
  const [progressLoading, setProgressLoading] = useState(true);
  const [booted, setBooted] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  const push = useCallback((...msgs: Msg[]) => {
    setMessages((prev) => [...prev, ...msgs]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy, asking]);

  const refreshProgress = useCallback(async () => {
    try {
      const r = await fetch(
        `/api/tutor-graph/progress?student_id=${encodeURIComponent(tutorStudentId())}`,
        { headers: tutorHeaders() }
      );
      if (r.ok) setProgress(await r.json());
    } catch {
      /* honest empty state stays */
    } finally {
      setProgressLoading(false);
    }
  }, []);

  // ── serve loop ──────────────────────────────────────────────
  const serveNext = useCallback(
    async (subj: string | null, cls: number | null) => {
      setBusy(true);
      setServed(null);
      setAnswer("");
      try {
        const q = new URLSearchParams({
          student_id: tutorStudentId(),
        });
        if (subj) q.set("subject", subj);
        if (cls) q.set("class_level", String(cls));
        const r = await fetch(`/api/tutor-graph/serve?${q}`, {
          headers: tutorHeaders(),
        });
        if (!r.ok) {
          push({
            id: nid(),
            kind: "error",
            text: "I couldn't pick the next question — the tutor brain is warming up or offline. Give it a moment and tap retry.",
          });
          return;
        }
        const data: Served = await r.json();
        // struggling-student framing first: prerequisite retreat
        if (data.retreated_from) {
          push({
            id: nid(),
            kind: "retreat",
            text:
              sanitizeTutorText(data.retreat_voice || "") ||
              "No stress — that topic leans on an earlier idea. Two minutes there and this one gets easy. Pehle wahi concept.",
          });
        }
        const voiceText =
          sanitizeTutorText(data.voice?.text || "") ||
          "Here's one to try:";
        push({ id: nid(), kind: "tutor", text: voiceText });
        push({ id: nid(), kind: "question", served: data });
        setServed(data);
        setTimeout(() => answerRef.current?.focus(), 350);
      } catch {
        push({
          id: nid(),
          kind: "error",
          text: "The tutor backend didn't answer. Your streak and mastery are safe — try again in a bit.",
        });
      } finally {
        setBusy(false);
      }
    },
    [push]
  );

  // boot: stats + progress + first question
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/tutor-graph/stats");
        if (r.ok && alive) setStats(await r.json());
      } catch {
        /* header shows a soft fallback */
      }
      await refreshProgress();
      if (alive) {
        setBooted(true);
        void serveNext(null, null);
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickSubject = (s: string | null) => {
    setSubject(s);
    void serveNext(s, classLevel);
  };

  const pickClass = (c: number | null) => {
    setClassLevel(c);
    void serveNext(subject, c);
  };

  // ── submit ──────────────────────────────────────────────────
  const submitAnswer = async (override?: string) => {
    if (!served || busy) return;
    const text = (override ?? answer).trim();
    if (!text) return;
    setBusy(true);
    push({ id: nid(), kind: "answer", text });
    setAnswer("");
    const qid = served.question_id;
    const title = served.concept_title;
    const cid = served.concept_id;
    try {
      const r = await fetch("/api/tutor-graph/submit", {
        method: "POST",
        headers: tutorHeaders(true),
        body: JSON.stringify({
          student_id: tutorStudentId(),
          question_id: qid,
          answer: text,
        }),
      });
      if (!r.ok) throw new Error("submit failed");
      const result: SubmitResult = await r.json();
      push({
        id: nid(),
        kind: "verdict",
        result,
        conceptTitle: title,
        conceptId: cid,
      });
      setServed(null); // graded — question is closed until Next
      refreshProgress();
    } catch {
      push({
        id: nid(),
        kind: "error",
        text: "That answer didn't reach the grader. Nothing was marked — type it again.",
      });
    } finally {
      setBusy(false);
    }
  };

  // ── teach-me ────────────────────────────────────────────────
  const teachCurrent = useCallback(
    async (conceptId: string, conceptTitle: string) => {
      push({
        id: nid(),
        kind: "tutor",
        text: `Good instinct — let's build it from zero: ${sanitizeTutorText(conceptTitle)}.`,
      });
      try {
        const r = await fetch(
          `/api/tutor-graph/teach?concept_id=${encodeURIComponent(conceptId)}`
        );
        if (r.ok) {
          const t: TeachCardType = await r.json();
          push({
            id: nid(),
            kind: "teach",
            card: {
              chapter: t.chapter,
              subject: t.subject,
              definition: t.definition,
              walkthrough: t.walkthrough,
              diagnostic: t.diagnostic
                ? {
                    question: t.diagnostic.question,
                    answer: t.diagnostic.answer,
                    misconception: t.diagnostic.misconception,
                  }
                : null,
            },
          });
          return;
        }
        // no teaching node under that id — fall through to the WHY-lane
        const ar = await fetch("/api/tutor-graph/ask", {
          method: "POST",
          headers: tutorHeaders(true),
          body: JSON.stringify({
            student_id: tutorStudentId(),
            question: `explain the idea behind ${conceptTitle}`,
          }),
        });
        if (ar.ok) {
          const res: AskResponse = await ar.json();
          push({ id: nid(), kind: "ask", question: conceptTitle, res });
          return;
        }
        push({
          id: nid(),
          kind: "error",
          text: "The teach card isn't available for this one right now — the hint ladder below still works.",
        });
      } catch {
        push({
          id: nid(),
          kind: "error",
          text: "Teaching content didn't load. The hints below still work.",
        });
      }
    },
    [push]
  );

  // ── free-form ask ───────────────────────────────────────────
  const sendAsk = async () => {
    const text = askInput.trim();
    if (!text || asking) return;
    setAsking(true);
    setAskInput("");
    push({ id: nid(), kind: "answer", text });
    try {
      const r = await fetch("/api/tutor-graph/ask", {
        method: "POST",
        headers: tutorHeaders(true),
        body: JSON.stringify({ student_id: tutorStudentId(), question: text }),
      });
      if (!r.ok) throw new Error("ask failed");
      const res: AskResponse = await r.json();
      push({ id: nid(), kind: "ask", question: text, res });
    } catch {
      push({
        id: nid(),
        kind: "error",
        text: "I couldn't reach my notes for that one — ask me again in a moment.",
      });
    } finally {
      setAsking(false);
    }
  };

  const subjects = useMemo(
    () => (stats ? Object.keys(stats.subjects).sort() : []),
    [stats]
  );

  const showNext = !served && !busy && messages.some((m) => m.kind === "verdict" || m.kind === "error");

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-white font-body">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.05),transparent_55%)]" />

      {/* header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-500/25">
              <Brain className="h-5 w-5 text-black/80" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold leading-tight">
                Your <span className="text-gold-300">AI Tutor</span>
              </h1>
              <p className="text-xs text-white/40">
                {stats
                  ? `${stats.concepts.toLocaleString()} concepts · one question at a time · zero guessing`
                  : "warming up the concept graph…"}
              </p>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            {CLASS_LEVELS.map((c) => (
              <button
                key={String(c)}
                onClick={() => pickClass(c)}
                className={`min-h-9 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  classLevel === c
                    ? "bg-gold-500 font-semibold text-black"
                    : "border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                }`}
              >
                {c === null ? "Any" : `Class ${c}`}
              </button>
            ))}
          </div>
        </div>
        {/* subject chips */}
        <div className="mx-auto flex max-w-6xl flex-wrap gap-1.5 px-4 pb-3">
          <button
            onClick={() => pickSubject(null)}
            className={`flex min-h-9 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              subject === null
                ? "bg-white/90 font-semibold text-black"
                : "border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
            }`}
          >
            <Sparkles className="h-3 w-3" /> Mixed
          </button>
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => pickSubject(s)}
              className={`min-h-9 rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all ${
                subject === s
                  ? "bg-gold-500/90 font-semibold text-black"
                  : "border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
              }`}
            >
              {s.replace(/_/g, " ")}
              <span className="ml-1.5 opacity-50">{stats!.subjects[s]}</span>
            </button>
          ))}
        </div>
      </header>

      {/* body */}
      <div className="relative mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
        {/* chat column */}
        <div className="flex min-h-0 flex-col">
          <div className="flex-1 space-y-4">
            {messages.length === 0 && !booted && (
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/50">
                <Loader2 className="h-4 w-4 animate-spin text-gold-400" />
                Picking the right first question for you…
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                >
                  {m.kind === "tutor" && (
                    <div className="flex items-start gap-2.5">
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/15">
                        <Brain className="h-3.5 w-3.5 text-gold-300" />
                      </span>
                      <p className="max-w-[85%] whitespace-pre-wrap rounded-3xl rounded-tl-md border border-white/10 bg-white/[0.05] px-4 py-3 text-[15px] leading-relaxed text-white/90">
                        {m.text}
                      </p>
                    </div>
                  )}

                  {m.kind === "retreat" && (
                    <div className="ml-10 flex items-start gap-2.5">
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/15">
                        <TrendingDown className="h-3.5 w-3.5 text-sky-300" />
                      </span>
                      <p className="max-w-[85%] rounded-3xl rounded-tl-md border border-sky-500/25 bg-sky-500/[0.07] px-4 py-3 text-sm leading-relaxed text-sky-100/90">
                        {m.text}
                      </p>
                    </div>
                  )}

                  {m.kind === "question" && (
                    <QuestionBubble
                      served={m.served}
                      answer={answer}
                      setAnswer={setAnswer}
                      inputRef={answerRef}
                      busy={busy}
                      graded={!served}
                      onSubmit={submitAnswer}
                      onPick={(text) => void submitAnswer(text)}
                      onTeach={() =>
                        teachCurrent(
                          m.served.concept_id,
                          m.served.concept_title
                        )
                      }
                    />
                  )}

                  {m.kind === "answer" && (
                    <div className="flex justify-end">
                      <p className="max-w-[80%] whitespace-pre-wrap rounded-3xl rounded-br-md border border-gold-500/25 bg-gold-500/[0.09] px-4 py-3 text-[15px] leading-relaxed text-white/95">
                        {m.text}
                      </p>
                    </div>
                  )}

                  {m.kind === "verdict" && (
                    <div className="ml-9">
                      <VerdictCard
                        result={m.result}
                        onTeach={
                          m.result.outcome !== "correct"
                            ? () =>
                                teachCurrent(m.conceptId, m.conceptTitle)
                            : undefined
                        }
                      />
                    </div>
                  )}

                  {m.kind === "teach" && (
                    <div className="ml-9">
                      <TeachCard card={m.card} />
                    </div>
                  )}

                  {m.kind === "ask" && (
                    <>
                      <div className="flex justify-end">
                        <p className="max-w-[80%] whitespace-pre-wrap rounded-3xl rounded-br-md border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white/85">
                          {m.question}
                        </p>
                      </div>
                      <div className="ml-9 mt-3">
                        <AskResponseCard res={m.res} />
                      </div>
                    </>
                  )}

                  {m.kind === "error" && (
                    <div className="ml-9 rounded-2xl border border-rose-500/25 bg-rose-500/[0.06] px-4 py-3 text-sm text-rose-100/85">
                      {m.text}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* next-question action */}
            {showNext && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center pt-1"
              >
                <button
                  onClick={() => serveNext(subject, classLevel)}
                  className="flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-2.5 font-display text-sm font-bold text-black shadow-lg shadow-gold-500/25 transition-all hover:scale-[1.03] active:scale-95"
                >
                  Next question <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            <div ref={endRef} />
          </div>

          {/* free-form ask composer */}
          <div className="sticky bottom-4 mt-5">
            <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-[#131118]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur">
              <span className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <MessagesSquare className="h-4 w-4 text-white/50" />
              </span>
              <input
                value={askInput}
                onChange={(e) => setAskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendAsk()}
                placeholder="Ask anything… why does BODMAS exist? what is refraction?"
                className="min-h-11 flex-1 bg-transparent px-1 text-[15px] outline-none placeholder:text-white/30"
              />
              <button
                onClick={sendAsk}
                disabled={asking || !askInput.trim()}
                aria-label="Ask the tutor"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-black transition-all hover:bg-gold-400 active:scale-90 disabled:opacity-40"
              >
                {asking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="mt-1.5 px-2 text-center text-[11px] text-white/25">
              Answers come from authored teaching notes — the tutor never
              guesses a number it can&apos;t verify.
            </p>
          </div>
        </div>

        {/* sidebar */}
        <aside className="space-y-4 self-start lg:sticky lg:top-36">
          <ProgressPanel progress={progress} loading={progressLoading} />

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-white/50">
              <RefreshCw className="h-4 w-4 text-gold-400" /> How your tutor
              works
            </h2>
            <ul className="space-y-2.5 text-sm leading-relaxed text-white/55">
              <li className="flex gap-2">
                <Target className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                Every question targets one exact skill — miss two and we
                quietly step back to the basics first.
              </li>
              <li className="flex gap-2">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                Hints come in three rungs, never the answer. Stuck? Ask for
                the teach card.
              </li>
              <li className="flex gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                Small wins count. The tutor celebrates the method warming up.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Question bubble (inline card in the chat) ─────────────────

function QuestionBubble({
  served,
  answer,
  setAnswer,
  inputRef,
  busy,
  graded,
  onSubmit,
  onPick,
  onTeach,
}: {
  served: Served;
  answer: string;
  setAnswer: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  busy: boolean;
  graded: boolean;
  onSubmit: () => void;
  onPick: (text: string) => void;
  onTeach: () => void;
}) {
  const title = sanitizeTutorText(served.concept_title || "");
  const question = sanitizeTutorText(served.question || "");
  const tier = tierLabel(served.tier);
  const options = (served.options ?? []).filter((o) => o.trim());
  const mcq = options.length >= 2;
  // only the live question accepts picks — older bubbles in the
  // transcript render their options read-only
  const active = !graded && !busy;

  return (
    <div className="ml-9 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold-300/90">
          <Target className="h-3.5 w-3.5" /> {title}
        </span>
        {tier && (
          <span className="rounded-full bg-white/[0.07] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
            {tier}
          </span>
        )}
        {served.micro_win && (
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
            tiny check · no pressure
          </span>
        )}
      </div>

      {/* optional warm-up debate — only when the concept has an authored
          misconception; purely for engagement, never marks-affecting */}
      {served.discussion && <DiscussionDebate discussion={served.discussion} />}

      <p className="font-display text-lg leading-relaxed text-white">
        {question}
      </p>

      {mcq ? (
        <div className="mt-4">
          {active && (
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
              Pick the best answer
            </p>
          )}
          <div className="grid gap-2">
            {options.map((opt, i) =>
              active ? (
                <button
                  key={i}
                  onClick={() => onPick(opt)}
                  disabled={busy}
                  className="flex min-h-11 items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-left text-[15px] leading-relaxed text-white/85 transition-all hover:border-gold-500/60 hover:bg-gold-500/[0.07] hover:text-white focus:outline-none focus:ring-4 focus:ring-gold-500/15 active:scale-[0.99] disabled:opacity-40"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-[11px] font-bold text-gold-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {sanitizeTutorText(opt)}
                </button>
              ) : (
                <div
                  key={i}
                  className="flex min-h-11 items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/15 px-4 py-3 text-left text-[15px] leading-relaxed text-white/55"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-[11px] font-bold text-white/35">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {sanitizeTutorText(opt)}
                </div>
              )
            )}
          </div>
          {active && (
            <p className="mt-2 text-[11px] text-white/30">
              One pick per question — words or numbers, both count.
            </p>
          )}
        </div>
      ) : !graded ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            ref={inputRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !busy && onSubmit()}
            placeholder="Type your answer — words or numbers, both fine"
            className="min-h-11 min-w-0 flex-1 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-[15px] outline-none transition-all placeholder:text-white/30 focus:border-gold-500/60 focus:ring-4 focus:ring-gold-500/15"
          />
          <button
            onClick={() => onSubmit()}
            disabled={busy || !answer.trim()}
            className="min-h-11 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 px-6 font-display text-sm font-bold text-black shadow-lg shadow-gold-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            {busy ? "Checking…" : "Check"}
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs text-white/35">
          Graded — tap &ldquo;Next question&rdquo; below to keep going.
        </p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          onClick={onTeach}
          className="flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-gold-500/40 hover:text-gold-300"
        >
          <BookOpen className="h-3.5 w-3.5" /> Teach me this
        </button>
      </div>

      <HintLadder questionId={served.question_id} disabled={graded} />
    </div>
  );
}
