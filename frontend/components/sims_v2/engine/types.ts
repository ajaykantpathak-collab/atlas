/**
 * sims_v2 engine — data-driven simulation definitions.
 *
 * Every sim (Class 1-12) is a SimDef: pure data. SimPlayer renders it in
 * 'junior' mode (Class 1-5: mascot, read-aloud, tap/drag) or 'senior' mode
 * (Class 6-12: KaTeX, math input, hint ladders, linked sub-parts).
 * No per-sim game loops — a fix to the engine fixes every sim.
 */

// ─── Phases ─────────────────────────────────────────────────
// discover  : curiosity hook question BEFORE teaching (no marks)
// teach     : narrated slides
// explore   : free manipulation on the widget
// observe   : "what did you notice?" — the kid reports a discovery
// predict   : predict → verify on the widget (Brilliant.org loop)
// play      : scored challenges (fixed + generated)
// reflect   : what was surprising? (metacognition)
// results   : stars, buddy, island
export type SimPhase = 'intro' | 'discover' | 'teach' | 'explore' | 'observe' | 'predict' | 'play' | 'reflect' | 'results';
export type SimMode = 'junior' | 'senior';

// ─── Teaching slide ─────────────────────────────────────────
export interface TeachingSlide {
    title: string;
    text: string;             // keep SHORT — auto-narrated in junior mode
    emoji: string;
    bgColor: string;
    katex?: string;           // optional formula to render (senior)
}

// ─── Challenge types ────────────────────────────────────────
// mcq        : pick the right option (confidence gate after selection)
// sort       : drag items into bins
// order      : drag items into a horizontal sequence
// count      : manipulate widget to produce a count, then answer
// interact   : accomplish a goal ON the widget — VALIDATED against widget state
// math_input : free numeric/expression answer (senior, MathLive)
// subpart    : linked multi-part question — parts unlock in sequence (senior)
export type ChallengeType = 'mcq' | 'sort' | 'order' | 'count' | 'interact' | 'math_input' | 'subpart';

export interface SortItem {
    id: string;
    label: string;
    emoji: string;
    correctBin: string;     // bin id (sort) or slot id (order)
}

export interface Bin {
    id: string;
    label: string;
    color: string;          // hex
}

export interface SubPart {
    id: string;             // 'a' | 'b' | 'c'...
    prompt: string;         // the part question (may contain $..$ for KaTeX)
    answer: string;         // accepted answer (normalized numeric or text)
    hint: string;
    misconception: string;
    workedExample?: string[];
    /** v3: tap-to-answer variant — renders options as buttons instead of
     * typed input. Use for prose/conceptual answers that can't be typed
     * exactly. When set, `answer` must equal one of the option texts. */
    options?: string[];
}

// ─── v3: misconception-keyed options ─────────────────────────
/** An MCQ option. `reveals` names the misconception a wrong pick exposes —
 * authored from the node's DIAGNOSTIC_ANSWER "a wrong answer reveals X".
 * Plain strings still work (legacy sims); v3 sims must key every
 * distractor. */
export interface MCQOption {
    text: string;
    reveals?: string;       // misconception id, e.g. 'moon-emits-light'
}
export const optionText = (o: string | MCQOption): string =>
    typeof o === 'string' ? o : o.text;
export const optionReveals = (o: string | MCQOption): string | undefined =>
    typeof o === 'string' ? undefined : o.reveals;

/** Remediation branch keyed by a `reveals` misconception id. Built from
 * the node's COMMON_MISCONCEPTION + ON_FAILURE sections. */
export interface Remediation {
    /** fix-it steps shown to the student (from ON_FAILURE) */
    steps: string[];
    /** optional hands-on correction task on a widget or lab — student must
     * physically produce the right state, validated, before retrying */
    labTask?: { instruction: string; widget: string; validate: string };
}

// ─── v3: TeachBeat — teaching is instrumented activity ───────
// Slides are orientation only. Each beat is a DOING that emits signal.
export type BeatType = 'mission' | 'scaffold' | 'case' | 'dissect' | 'build' | 'drill';

export interface BeatMission {           // manipulate a world to a goal
    widget: string;                      // widget OR lab key
    validate: string;                    // validateGoal string
    instruction: string;                 // the concrete task — always matches `validate`
    context?: string;                    // authored framing — why this matters (may name
                                         // capabilities the lab lacks, so it never stands alone)
    labels?: string[];                   // chapter-specific stage/era names for flow+timeline
    observePrompt?: string;              // "what did you notice?" after success
}
export interface BeatScaffold {          // worked-example fading I→we→you
    problem: string;
    steps: { text: string; faded?: boolean; blankAnswer?: string }[];
}
export interface BeatCase {              // branching decision + consequence
    intro: string;
    decisions: { prompt: string; options: { text: string; outcome: string; reveals?: string }[] }[];
}
export interface BeatDissect {           // zoom specimen → identify → predict
    lab?: string;                        // optional bound world; absent = prompt-driven spots
    specimen?: string;                   // what we're dissecting (chapter/topic label)
    spots: { id: string; label: string; prompt: string; answer: string; options?: string[] }[];
}
export interface BeatBuild {             // constrained construction
    prompt: string;
    blocks?: string[];                   // draggable pieces; empty = free input
    answer: string;
}
export interface BeatDrill {             // spaced retrieval via generator
    kind: string; count: number; level?: number;
}
export interface TeachBeat {
    type: BeatType;
    nodeId?: string;                     // node this beat teaches (per-node BKT)
    title: string;
    mission?: BeatMission;
    scaffold?: BeatScaffold;
    caseStudy?: BeatCase;
    dissect?: BeatDissect;
    build?: BeatBuild;
    drill?: BeatDrill;
}

export interface Challenge {
    id?: string;
    type: ChallengeType;
    /** difficulty tier — BKT adapts which challenges surface.
     * foundation = entry, standard = grade-level, advanced = stretch.
     * Omit = standard. */
    difficulty?: 'foundation' | 'standard' | 'advanced';
    /** specific node this challenge tests (for per-node BKT).
     * If omitted, falls back to def.nodeIds[challengeIdx]. */
    nodeId?: string;
    question: string;             // may contain $..$ for KaTeX in senior mode
    answer?: string;              // mcq / count / math_input
    /** mcq/count options. v3: MCQOption objects carry `reveals` —
     * the misconception id a wrong pick exposes. Strings still work. */
    options?: (string | MCQOption)[];
    /** remediation branches keyed by misconception id (the `reveals`
     * value of the picked distractor). Fires on a wrong pick. */
    remediations?: Record<string, Remediation>;
    /** after a remediation completes, replace this item with a fresh
     * generated variant of this kind (re-test measures the concept,
     * not the memorised answer). */
    retestKind?: string;
    retestLevel?: number;
    sortItems?: SortItem[];       // sort / order
    bins?: Bin[];                 // sort (order uses sequence slots)
    hint: string;
    misconception: string;
    workedExample?: string[];     // steps — fade on wrong streaks
    interactGoal?: {              // interact — VALIDATED against widget state
        instruction: string;
        widget: string;           // widget key used for this challenge
        validate: string;         // e.g. 'clock:hour=9,mins=0' | 'tray:count=12'
    };
    mathInput?: {                 // math_input
        placeholder?: string;
        tolerance?: number;       // numeric tolerance, default 0
    };
    parts?: SubPart[];            // subpart — linked steps A→E
}

// ─── Telemetry ──────────────────────────────────────────────
// Emitted per answer — feeds BKT/IRT, confidence calibration, misconception
// matching. This is the wire into backend AttemptLog.
export interface SimAnswerEvent {
    simId: string;
    challengeIndex: number;
    challengeId?: string;
    challengeType: ChallengeType;
    correct: boolean;
    attempts: number;             // wrong attempts before success/give-up
    confidence: 'sure' | 'guessing' | null;
    responseMs: number;
    misconceptionShown: boolean;
    nodeId?: string;              // backend node this challenge maps to
    masteryBefore?: number;       // BKT pKnown before this answer
    masteryAfter?: number;        // BKT pKnown after this answer
    sessionId?: string;
    timestamp: string;
}

// ─── The sim ────────────────────────────────────────────────
export interface SimDef {
    id: string;
    title: string;
    subtitle: string;
    classLevel: number;
    mode?: SimMode;               // default: junior for class<=5 else senior
    subject: string;
    topic: string;
    chapters: string[];
    nodeIds?: string[];           // backend node ids this sim covers
    emoji: string;
    /** Immersive narrative framing — "You are a young explorer..." (c6_12 parity). */
    scenario?: { role: string; intro: string; goal: string };
    theme: { bg: string; accent: string; scene: string };
    /** Curiosity hook shown BEFORE teaching — a real question that makes the
     * kid curious. No marks; wrong answers just spark the lesson. */
    discovery?: {
        question: string;
        options: string[];
        answer: string;
        hook: string;            // "surprising!" line revealed after answering
    };
    teaching: TeachingSlide[];    // v3: orientation only — max 2 slides.
    /** v3: the actual teaching — ordered instrumented beats. When set,
     * rendered during 'teach' phase after orientation slides. */
    beats?: TeachBeat[];
    explore?: {
        /** simple widget key OR a real canvas lab key (from canvasLab.LABS) */
        widget?: string;
        lab?: string;            // 'pour'|'grow'|'stretch'|'jump'|'balance' — real canvas lab
        /** bespoke React component (an old rich sim) rendered as the interactive */
        component?: React.ComponentType;
        /** JSON-emitted form of `component` — resolved via engine/sim_components.gen */
        componentId?: string;
        prompt: string;
    };
    /** "What did you notice?" after explore — kid reports a discovery. */
    observe?: {
        prompt: string;
        options: string[];       // a few plausible observations
        answer: string;
    };
    /** Predict-then-verify: guess → then do it on the widget → see result. */
    predict?: {
        question: string;
        options: string[];
        answer: string;
        verifyWidget: string;    // widget key used to verify the prediction
        verifyPrompt: string;    // "try it — were you right?"
    };
    /** Metacognition card before results — what surprised you? */
    reflect?: {
        prompts: string[];       // e.g. ["What surprised you?", "Tell a friend!"]
    };
    challenges: Challenge[];
    /** Procedural generation — sims can serve fresh questions each run
     * instead of only the fixed `challenges` array.
     *  - Maths kinds ('add,sub,...') → generateChallenges()
     *  - Lexicon kinds (sort/which/fill/match/opposite/oddone) → generateLex()
     * When set, `challenges` becomes the curated/fixed set mixed in. */
    generate?: {
        kind: string;              // 'add,sub' OR a lexicon kind OR 'lex:<kind>'
        count: number;             // fresh questions per run
        level?: number;            // difficulty 1-5, defaults to classLevel
        /** lexicon data — required when kind is a lexicon generator */
        data?: import('./lexgen').LexData;
    };
    /** If the fixed pool is larger than needed, sample this many per run.
     * Makes EVS/language sims vary each playthrough too. */
    sampleChallenges?: number;
    successLine: string;
    tryAgainLine: string;
}
