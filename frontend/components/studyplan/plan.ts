"use client";

/**
 * plan.ts — the study-plan brain. Pure logic + storage, no React.
 *
 * The plan is a 7-day grid (Monday-anchored calendar week) of concrete
 * tasks derived ONLY from the student's real data:
 *
 *   1. due SM-2 reviews first (memory)          → /review
 *   2. then the weakest mastery topic           → story / practice
 *   3. then the next unexplored chapter         → story / practice / test
 *      (from /api/content/recommended — official corpus, syllabus-earliest
 *      first, mastered nodes excluded)
 *   4. then one stretch / challenge             → chapter test / pre-board paper
 *
 * Honesty rules:
 *   - A brand-new student's plan is "take your first diagnostic" — the
 *     grid fills with tasks only once real data exists.
 *   - Ticks are REAL: derived from activity_log rows on the task's date,
 *     from review stats, or from a manual mark the student made. Nothing
 *     is ticked because the plan wished it so.
 *   - The plan snapshot is persisted per student (localStorage) so the
 *     week's plan and its completion ticks survive reloads; a new week
 *     regenerates from fresh data.
 *   - Days before the plan existed carry no tasks — an honest em-dash,
 *     never retro-fitted homework.
 */

import type { RecommendedLesson } from "@/components/dashboard/types";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type PlanTaskKind =
  | "review"      // due SM-2 items
  | "practice"    // focused question practice
  | "story"       // read the next topic (story mode)
  | "test"        // chapter test
  | "paper"       // pre-board full paper
  | "diagnostic"  // first diagnostic
  | "explore";    // open exploration (new students)

/** How a task's completion can be truthfully observed. */
export type TickSource =
  | "manual"         // student marks it done (persisted)
  | "activity"       // a real activity row that day matches the subject
  | "diagnostic"     // a real diagnostic row that day
  | "reviewedToday"; // review stats say reviews were cleared today

export interface PlanTask {
  id: string;
  kind: PlanTaskKind;
  /** Day index within the plan week (0 = Monday … 6 = Sunday). */
  day: number;
  /** Short imperative title, student-facing. Never a raw node id. */
  title: string;
  /** One honest line of why / what. */
  detail?: string;
  /** Deep link — story, practice, test, review, exam-prep, diagnostic. */
  href: string;
  /** Canonical subject key used to match real activity rows for ticks. */
  subjectKey?: string;
  /** How completion can be observed (beyond a manual mark). */
  tickBy: TickSource;
  /** Review tasks show the LIVE due count on today's card. */
  liveCount?: boolean;
  /** Count snapshot for days that are no longer "today". */
  count?: number;
}

export interface PlanTick {
  /** auto = observed from real data; manual = marked by the student. */
  t: "auto" | "manual";
  at: string; // ISO timestamp of the observation/mark
}

export interface StoredPlan {
  v: 1;
  uid: string;
  /** Monday of the plan week, YYYY-MM-DD (local). */
  weekStart: string;
  generatedAt: string;
  /** Day index (0-6) the plan was first generated on. Days before it
   *  carried no tasks — they render as an honest em-dash. */
  startDayIndex: number;
  tasks: PlanTask[];
  /** `${taskId}|${YYYY-MM-DD}` → tick. */
  ticks: Record<string, PlanTick>;
}

/* ------------------------------------------------------------------ */
/* Dates (all local-day math — the plan lives on the student's device) */
/* ------------------------------------------------------------------ */

export function toLocalISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Monday of the week containing `d`. */
export function weekStartOf(d: Date): Date {
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = (start.getDay() + 6) % 7; // 0 = Monday
  start.setDate(start.getDate() - dow);
  return start;
}

export function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

/** Local calendar day of an ISO timestamp (activity rows are UTC ISO). */
export function isoToLocalDate(iso: string): string | null {
  if (!iso) return null;
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return null;
  return toLocalDateOf(t);
}

function toLocalDateOf(t: Date): string {
  return toLocalISO(t);
}

/* ------------------------------------------------------------------ */
/* Subject normalization — activity rows spell subjects loosely        */
/* ("math", "Mathematics", "mathematics", "biology", "sst", …).        */
/* Tick matching compares canonical keys only.                         */
/* ------------------------------------------------------------------ */

const SUBJECT_CANON: Record<string, string> = {
  math: "math", mathematics: "math", maths: "math", mth: "math",
  sci: "science", science: "science",
  bio: "biology", biology: "biology",
  chem: "chemistry", chemistry: "chemistry",
  phy: "physics", physics: "physics",
  hist: "history", history: "history",
  geo: "geography", geography: "geography",
  civ: "civics", civics: "civics",
  eco: "economics", economics: "economics",
  eng: "english", engl: "english", english: "english",
  gram: "grammar", grammar: "grammar",
  sst: "socialscience", social: "socialscience", social_science: "socialscience",
  "social science": "socialscience", socialscience: "socialscience",
  comp: "computer", computer: "computer", cs: "computer",
  psy: "psychology", psychology: "psychology",
  acc: "accounts", accounts: "accounts", accountancy: "accounts",
  bs: "businessstudies", bst: "businessstudies",
};

export function canonSubject(s?: string | null): string | null {
  if (!s) return null;
  const key = String(s).trim().toLowerCase().replace(/-/g, "_");
  return SUBJECT_CANON[key] ?? SUBJECT_CANON[key.replace(/_/g, " ")] ?? (key || null);
}

/** Corpus subject code → /chapter-test?subject= slug (page-supported keys). */
const TEST_SUBJECT_SLUG: Record<string, string> = {
  math: "mathematics", sci: "science", bio: "biology", chem: "chemistry",
  phy: "physics", hist: "history", geo: "geography", civ: "social_science",
  eco: "economics", engl: "english", eng: "english", gram: "grammar",
  sst: "social_science",
};

export function testSubjectSlug(code?: string | null): string | null {
  const c = canonSubject(code);
  if (!c) return null;
  if (c === "socialscience") return "social_science";
  return TEST_SUBJECT_SLUG[c] ?? c;
}

/** Friendly display name for a corpus/loose subject code. */
export function subjectDisplay(code?: string | null): string {
  const c = canonSubject(code);
  if (!c) return "Topic";
  const NAMES: Record<string, string> = {
    math: "Mathematics", science: "Science", biology: "Biology",
    chemistry: "Chemistry", physics: "Physics", history: "History",
    geography: "Geography", civics: "Civics", economics: "Economics",
    english: "English", grammar: "Grammar", socialscience: "Social Science",
    computer: "Computer Science", psychology: "Psychology",
    accounts: "Accounts", businessstudies: "Business Studies",
  };
  return NAMES[c] ?? c;
}

/* ------------------------------------------------------------------ */
/* Micro-coach — one evidence-based study tip per day (curated set).   */
/* Plain, honest, no gamified filler.                                  */
/* ------------------------------------------------------------------ */

export const STUDY_TIPS: readonly string[] = [
  "Close the book and write down what you remember. Pulling facts out of your head beats reading them again — that is retrieval practice.",
  "Space it out. Three 20-minute sessions across the week beat one hour tonight — memory keeps what it meets repeatedly.",
  "Teach it to a friend (or an empty chair). Explaining out loud exposes exactly the spots you cannot yet explain.",
  "Sleep consolidates today's practice into tomorrow's memory. A full night after studying beats one more hour of screens.",
  "Mix problem types in one session. Switching between topics trains you to pick the method — not just follow it.",
  "Study one solved example line by line, cover it, then redo it yourself. Worked examples are shortcuts to technique.",
  "Try the questions before reading the chapter. A wrong first attempt makes the right explanation stick.",
];

export function tipOfDay(d: Date): string {
  const start = new Date(d.getFullYear(), 0, 0);
  const doy = Math.floor((d.getTime() - start.getTime()) / 86_400_000);
  return STUDY_TIPS[doy % STUDY_TIPS.length];
}

/* ------------------------------------------------------------------ */
/* Inputs — everything the generator needs, all from real endpoints    */
/* ------------------------------------------------------------------ */

export interface WeakestTopic {
  topicId: string;
  topicName: string;
  subjectName: string | null;
  masteryPct: number;
  attempts: number;
}

export interface ActivityRow {
  activityType?: string;
  title?: string;
  subject?: string | null;
  time?: string;
}

export interface ExamMode {
  /** A ready pre-board paper exists for this class. */
  active: boolean;
  /** Honest approximate days to the typical CBSE board-season start. */
  daysToBoards: number | null;
  papers: string[]; // labels of ready papers
}

export interface PlanInputs {
  uid: string;
  classLevel: number | null;
  today: Date;
  reviewsDue: number;
  reviewedToday: number;
  weakest: WeakestTopic | null;
  secondTopic: WeakestTopic | null;
  /** Corpus "next lessons" (syllabus-earliest, mastered excluded). */
  recommended: RecommendedLesson[];
  /** Topic titles the student already has attempts on (normalized). */
  attemptedTitles: Set<string>;
  /** Corpus node resolved for the weakest topic's story link (may be null
   *  — the plan falls back to a practice deep link when unresolved). */
  weakestStoryNodeId: string | null;
  /** True when the student has any real footprint (attempts, XP, streak). */
  hasFootprint: boolean;
  exam: ExamMode;
}

/* ------------------------------------------------------------------ */
/* Exam season — honest anchor                                         */
/* ------------------------------------------------------------------ */

/** CBSE board papers typically begin mid-February; the student's school
 *  date may differ — the UI says so in exactly those words. */
export function daysToBoardSeason(today: Date): number {
  const year = today.getFullYear();
  let target = new Date(year, 1, 15); // Feb 15
  if (today.getTime() > target.getTime()) target = new Date(year + 1, 1, 15);
  return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86_400_000));
}

/* ------------------------------------------------------------------ */
/* Plan generation                                                     */
/* ------------------------------------------------------------------ */

function normTitle(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** First "next lesson" that is genuinely new ground: not attempted
 *  (title matches a topic with attempts) and zero recorded progress. */
export function pickNextLessons(
  recommended: RecommendedLesson[],
  attemptedTitles: Set<string>,
  limit = 2,
): RecommendedLesson[] {
  const out: RecommendedLesson[] = [];
  for (const l of recommended ?? []) {
    if (!l?.node_id) continue;
    if ((l.progress ?? 0) > 0) continue;
    if (attemptedTitles.has(normTitle(l.topic ?? ""))) continue;
    if (out.some((x) => x.node_id === l.node_id)) continue;
    out.push(l);
    if (out.length >= limit) break;
  }
  return out;
}

/** Build the week's ordered task pool (priority order — the caller deals
 *  it into day slots). Max 12 tasks; every task is real and deep-linked. */
export function buildTaskPool(inp: PlanInputs): Omit<PlanTask, "id" | "day">[] {
  const pool: Omit<PlanTask, "id" | "day">[] = [];
  const seen = new Set<string>();
  const push = (t: Omit<PlanTask, "id" | "day">) => {
    const id = `${t.kind}:${t.href}`;
    if (seen.has(id)) return;
    seen.add(id);
    pool.push(t);
  };

  const revision = inp.exam.active;

  // 1 — memory first: due SM-2 reviews.
  if (inp.reviewsDue > 0) {
    push({
      kind: "review",
      title: inp.reviewsDue === 1 ? "Clear 1 due review" : `Clear ${inp.reviewsDue} due reviews`,
      detail: "Spaced repetition — items you have not revisited in days are fading first.",
      href: "/review",
      tickBy: "reviewedToday",
      liveCount: true,
      count: inp.reviewsDue,
    });
  }

  // 2 — weakest mastery topic.
  const weak = inp.weakest;
  const weakHref = weak
    ? inp.weakestStoryNodeId
      ? `/learn/${encodeURIComponent(inp.weakestStoryNodeId)}/story`
      : `/practice?topic=${encodeURIComponent(weak.topicName)}`
    : "";
  if (weak) {
    push({
      kind: inp.weakestStoryNodeId ? "story" : "practice",
      title: `Strengthen: ${weak.topicName}`,
      detail: `Your softest spot — ${Math.round(weak.masteryPct)}% over ${weak.attempts} ${weak.attempts === 1 ? "attempt" : "attempts"}.`,
      href: weakHref,
      subjectKey: canonSubject(weak.subjectName) ?? undefined,
      tickBy: "activity",
    });
  }

  // 3 — next unexplored chapter, from the official corpus recommendations
  //     (syllabus-earliest first, already-mastered nodes excluded).
  const [next, nextB] = pickNextLessons(inp.recommended, inp.attemptedTitles);
  if (next) {
    const subj = subjectDisplay(next.subject);
    const chapterBit = next.chapter ? ` · ${next.chapter}` : "";
    push({
      kind: "story",
      title: `Read next: ${next.topic ?? subj}`,
      detail: `New ground in ${subj}${chapterBit} — read the story, then practice it.`,
      href: `/learn/${encodeURIComponent(next.node_id)}/story`,
      tickBy: "manual",
    });
    push({
      kind: "practice",
      title: `Practice: ${next.topic ?? subj}`,
      detail: `${subj}${chapterBit} — questions aimed at exactly this topic.`,
      href: `/practice?node=${encodeURIComponent(next.node_id)}&subject=${encodeURIComponent(next.subject ?? "")}`,
      subjectKey: canonSubject(next.subject) ?? undefined,
      tickBy: "activity",
    });
    const slug = testSubjectSlug(next.subject);
    if (slug && inp.classLevel) {
      push({
        kind: "test",
        title: `Chapter test: ${subj}${chapterBit}`,
        detail: "A real chapter-spanning test — the honest score shows what stuck.",
        href: `/chapter-test?subject=${encodeURIComponent(slug)}&class=${inp.classLevel}`,
        subjectKey: canonSubject(next.subject) ?? undefined,
        tickBy: "activity",
      });
    }
  }

  // 4 — stretch / challenge. Revision mode wants a full paper; the normal
  //     week wants a second topic or a second chapter.
  if (revision && inp.exam.papers.length > 0) {
    push({
      kind: "paper",
      title: `Pre-board paper: ${inp.exam.papers[0]}`,
      detail: `Full CBSE-pattern paper, timed and graded.${inp.exam.daysToBoards != null ? ` Boards are roughly ${inp.exam.daysToBoards} days out.` : ""}`,
      href: "/exam-prep",
      tickBy: "manual",
    });
  } else if (inp.secondTopic) {
    const st = inp.secondTopic;
    push({
      kind: "practice",
      title: `Stretch: ${st.topicName}`,
      detail: `Second-softest topic — ${Math.round(st.masteryPct)}%. Keep both plates spinning.`,
      href: `/practice?topic=${encodeURIComponent(st.topicName)}`,
      subjectKey: canonSubject(st.subjectName) ?? undefined,
      tickBy: "activity",
    });
  }

  if (nextB) {
    const subj = subjectDisplay(nextB.subject);
    push({
      kind: "story",
      title: `Explore: ${nextB.topic ?? subj}`,
      detail: `A second subject's next topic — keep more than one door open.`,
      href: `/learn/${encodeURIComponent(nextB.node_id)}/story`,
      tickBy: "manual",
    });
  }

  // Revision weighting: more chapter tests + review, less new content.
  if (revision) {
    if (nextB) {
      const slug = testSubjectSlug(nextB.subject);
      if (slug && inp.classLevel) {
        push({
          kind: "test",
          title: `Chapter test: ${subjectDisplay(nextB.subject)}${nextB.chapter ? ` · ${nextB.chapter}` : ""}`,
          detail: "Revision mode — testing beats re-reading this close to boards.",
          href: `/chapter-test?subject=${encodeURIComponent(slug)}&class=${inp.classLevel}`,
          subjectKey: canonSubject(nextB.subject) ?? undefined,
          tickBy: "activity",
        });
      }
    }
    if (inp.reviewsDue >= 4) {
      push({
        kind: "review",
        title: "Memory sweep: clear the backlog",
        detail: "A large review pile means old topics are fading — reclaim them.",
        href: "/review",
        tickBy: "reviewedToday",
        liveCount: true,
        count: inp.reviewsDue,
      });
    }
  } else if (inp.reviewsDue >= 4) {
    push({
      kind: "review",
      title: "Memory sweep: clear the backlog",
      detail: "A large review pile means old topics are fading — reclaim them.",
      href: "/review",
      tickBy: "reviewedToday",
      liveCount: true,
      count: inp.reviewsDue,
    });
  }

  return pool.slice(0, 12);
}

/** The honest new-student week: Day 1 is a diagnostic — the plan builds
 *  itself from real data after that. Never invented momentum. */
export const NEW_STUDENT_POOL: Omit<PlanTask, "id" | "day">[] = [
  {
    kind: "diagnostic",
    title: "Take your first diagnostic",
    detail:
      "A short honest session tells the plan what you actually know — every task after it comes from your real results.",
    href: "/diagnostic",
    tickBy: "diagnostic",
  },
  {
    kind: "explore",
    title: "Pick any topic in the galaxy",
    detail: "Browse 9,099 real syllabus topics and read your first story.",
    href: "/explore",
    tickBy: "manual",
  },
];

/** Deal the pool into day slots: up to 2 tasks per day starting at the
 *  generation day, in priority order. */
export function dealToDays(
  pool: Omit<PlanTask, "id" | "day">[],
  startDayIndex: number,
): PlanTask[] {
  const out: PlanTask[] = [];
  let i = 0;
  for (let day = startDayIndex; day < 7 && i < pool.length; day++) {
    for (let k = 0; k < 2 && i < pool.length; k++) {
      const task = pool[i++];
      const id = `${task.kind}:${task.href}#d${day}`;
      out.push({ ...task, day, id });
    }
  }
  return out;
}

export interface GenerateResult {
  plan: StoredPlan;
  fresh: boolean;
}

/** Generate or reuse the persisted week plan. */
export function generateOrLoadPlan(
  inp: PlanInputs,
  load: () => StoredPlan | null,
  save: (p: StoredPlan) => void,
): GenerateResult {
  const weekStart = toLocalISO(weekStartOf(inp.today));
  const todayIdx = Math.max(
    0,
    Math.min(6, Math.round((inp.today.getTime() - new Date(weekStart + "T00:00:00").getTime()) / 86_400_000)),
  );
  const stored = load();
  if (stored && stored.v === 1 && stored.uid === inp.uid && stored.weekStart === weekStart) {
    // Merge any newly observed auto-ticks is handled by the caller; the
    // snapshot itself stays stable so the week never reshuffles.
    return { plan: stored, fresh: false };
  }

  const tasks = dealToDays(
    inp.hasFootprint ? buildTaskPool(inp) : NEW_STUDENT_POOL,
    todayIdx,
  );
  const plan: StoredPlan = {
    v: 1,
    uid: inp.uid,
    weekStart,
    generatedAt: new Date().toISOString(),
    startDayIndex: todayIdx,
    tasks,
    ticks: {},
  };
  save(plan);
  return { plan, fresh: true };
}

/* ------------------------------------------------------------------ */
/* Ticks — real completion only                                        */
/* ------------------------------------------------------------------ */

export function tickKey(taskId: string, dateISO: string): string {
  return `${taskId}|${dateISO}`;
}

/** Derive auto-completions from real data for the given tasks.
 *  - practice/test: an activity row that day whose subject matches
 *  - diagnostic: a diagnostic row that day
 *  - review: review stats say something was reviewed today (today only)
 *  Returns only NEWLY observed keys (caller persists them). */
export function deriveAutoTicks(
  tasks: PlanTask[],
  activity: ActivityRow[],
  reviewedToday: number,
  today: Date,
  existing: Record<string, PlanTick>,
): Record<string, PlanTick> {
  const out: Record<string, PlanTick> = {};
  const rowsByDay = new Map<string, Set<string>>(); // local date → subject keys
  for (const r of activity ?? []) {
    const day = isoToLocalDate(r?.time ?? "");
    if (!day) continue;
    const subj = canonSubject(r.subject);
    const typeKey = String(r.activityType ?? "").toLowerCase();
    if (!subj && !typeKey) continue;
    let set = rowsByDay.get(day);
    if (!set) rowsByDay.set(day, (set = new Set()));
    if (subj) set.add(subj);
    set.add(`type:${typeKey}`);
  }
  const todayISO = toLocalISO(today);

  for (const task of tasks) {
    for (let d = 0; d < 7; d++) {
      const dayISO = toLocalISO(addDays(weekStartOf(today), d));
      const key = tickKey(task.id, dayISO);
      if (existing[key] || out[key]) continue;
      const sigs = rowsByDay.get(dayISO);
      let done = false;
      if (task.tickBy === "reviewedToday") {
        done = dayISO === todayISO && reviewedToday > 0;
      } else if (task.tickBy === "diagnostic") {
        done = !!sigs?.has("type:diagnostic");
      } else if (task.tickBy === "activity" && task.subjectKey && sigs) {
        done = sigs.has(task.subjectKey);
      }
      if (done) out[key] = { t: "auto", at: new Date().toISOString() };
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Storage — per-student, namespaced, defensive                        */
/* ------------------------------------------------------------------ */

const STORAGE_PREFIX = "atlas.studyplan.v1.";

export function loadPlan(uid: string): StoredPlan | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + uid);
    if (!raw) return null;
    const p = JSON.parse(raw) as StoredPlan;
    if (!p || p.v !== 1 || p.uid !== uid || !Array.isArray(p.tasks)) return null;
    return p;
  } catch {
    return null;
  }
}

export function savePlan(plan: StoredPlan): void {
  try {
    // Prune ticks older than 8 days — they can never render again.
    const cutoff = Date.now() - 8 * 86_400_000;
    const ticks: Record<string, PlanTick> = {};
    for (const [k, v] of Object.entries(plan.ticks ?? {})) {
      const at = new Date(v?.at ?? "").getTime();
      if (Number.isFinite(at) && at >= cutoff) ticks[k] = v;
    }
    window.localStorage.setItem(
      STORAGE_PREFIX + plan.uid,
      JSON.stringify({ ...plan, ticks }),
    );
  } catch {
    /* storage unavailable — the plan still renders, ticks just do not
       persist on this device. Never fabricate. */
  }
}
