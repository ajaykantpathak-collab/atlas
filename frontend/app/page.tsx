import Link from 'next/link';
import type { Metadata } from 'next';

// Fully static content (all data is baked): serve from cache instead of
// per-request SSR — the root layout's force-dynamic made every landing
// visit pay a full SSR render (~1s p50 at 50 CCU in the TIER3 load test).
export const dynamic = 'force-static';

// P5 gap 1: the landing keeps its full marketing-free title verbatim.
// `absolute` bypasses the root layout's "%s | Atlas" template so the
// <title> is not suffixed with its own brand.
export const metadata: Metadata = {
  title: {
    absolute: 'Atlas — Every answer verified, never guessed | CBSE',
  },
  description:
    'A CBSE learning galaxy for Classes 1–12: interactive simulations, verified step-by-step solutions, per-concept mastery and board-pattern exams.',
};
import { AtlasMark } from '@/components/atlas/AtlasMark';
import LumenCosmos from '@/components/landing/LumenCosmos';

/**
 * Public landing — first-visit front door, floating on the Lumen cosmos.
 *
 * The Lumen particle sky (the same GPGPU pipeline as /lumen, reduced to
 * ~100k light-points) renders behind everything as a living, pointer-reactive
 * background; the "never wrong" copy sits on top with contrast scrims.
 *
 * Positioning: "the CBSE app that's never wrong." Every claim on this page
 * maps to a real, measurable property of the platform:
 *
 *   - 9,099 curriculum topics        → /api/nodes/stats (parsed corpus count)
 *   - 200,000+ practice questions    → board_questions table (213k rows)
 *   - "Never wrong"                  → the verified-answer engine: solutions
 *     re-execute through deterministic gates before they are shown, and
 *     anything machine-assisted is labeled MODEL-ASSISTED — never styled as
 *     verified (ARCHITECTURE.md §11, UI truth rules).
 *
 * No testimonials, ratings or user counts — nothing we cannot prove.
 */

const STATS = [
  { value: '9,099', label: 'curriculum topics, mapped concept-by-concept' },
  { value: '200,000+', label: 'practice questions with worked answers' },
  { value: '6–12', label: 'CBSE classes covered end to end' },
];

const PILLARS = [
  {
    tag: 'Verified answers',
    title: 'Never wrong, by construction',
    body: 'Every solution we show is re-executed by a deterministic solving engine — each step checked against the syllabus chain before it reaches you. Answers carry a VERIFIED badge and expand to their audit trail. If a step was machine-assisted, it is labeled as such. No quiet guessing, ever.',
    points: ['Deterministic re-execution before display', 'VERIFIED vs MODEL-ASSISTED labels — trust is visible', 'Audit trail behind every verified answer'],
  },
  {
    tag: 'Mastery practice',
    title: 'Practice that knows what you know',
    body: 'Questions adapt to you with knowledge-tracing models — the same techniques used in learning-science research. Your mastery is tracked per concept, so revision lands exactly where you are weak instead of everywhere at once.',
    points: ['Adaptive question selection', 'Per-concept mastery tracking', 'Spaced review that resurfaces fading topics'],
  },
  {
    tag: 'Teacher suite',
    title: 'Set homework, see who did it',
    body: 'Teachers assign work straight from the curriculum — class, topic, question count, due date. Students see it instantly on their homework page; teachers watch real completions land as students submit. Every status is read from actual submissions, never estimated.',
    points: ['Assignments built from the verified question bank', 'Live completion status per student', 'Cohort mastery and misconception analytics'],
  },
];

export default function LandingPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0f] text-zinc-100">
      {/* ── Lumen cosmos background (pointer-active; scrims keep copy readable) ── */}
      <LumenCosmos />

      <div className="relative z-10">
      {/* ── Nav ── */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="flex items-center gap-2.5">
          <AtlasMark size={34} />
          <span className="font-display text-lg font-bold tracking-tight">Atlas</span>
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-[#131118] hover:from-amber-300"
          >
            Start learning
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 text-center sm:pt-24">
          <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            CBSE · Classes 6–12
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            The CBSE app that&apos;s{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              never wrong
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Every answer Atlas shows has been verified by a deterministic solving engine —
            re-executed step by step, not guessed by a chatbot. Where a step is
            machine-assisted, we say so. Your trust is earned in the UI, not claimed in ads.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-7 py-3.5 text-sm font-semibold text-[#131118] hover:from-amber-300"
            >
              Start learning free
            </Link>
            <Link
              href="/lumen"
              className="rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-amber-200/90 transition-colors hover:border-amber-300/40 hover:bg-amber-400/10 hover:text-amber-100"
            >
              Explore the cosmos <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* stats — smoke-glass so the numbers keep contrast when the
              particle disk drifts behind them */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-[#0a0a0f]/55 px-6 py-6 backdrop-blur-[2px]">
                <p className="font-display text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.tag}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/90">{p.tag}</p>
              <h2 className="mt-2 font-display text-xl font-bold text-white">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.body}</p>
              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Honesty band ── */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            &ldquo;Never wrong&rdquo; is a promise with fine print
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Here is all of it: verified means the engine re-executed the full solution chain and
            it passed every gate. Some first-draft help is model-assisted — those answers are
            labeled, always. Diagram-heavy questions and full proof-writing have known limits we
            publish rather than hide. If Atlas is ever unsure, it tells you — that is the whole
            point.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-extrabold text-white">Start with your syllabus</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
          Pick a chapter, practice until the concepts stick, and trust every worked step you read.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-[#131118] hover:from-amber-300"
        >
          Create your account
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <span className="flex items-center gap-2">
            <AtlasMark size={22} />
            <span className="text-xs text-zinc-500">Atlas — every answer verified, never guessed</span>
          </span>
          <p className="text-[11px] text-zinc-600">
            Counts reflect the current CBSE corpus: 9,099 parsed teaching nodes and the verified
            question bank backing practice and homework.
          </p>
        </div>
      </footer>
      </div>
    </main>
  );
}
