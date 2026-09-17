/**
 * Platform design tokens — single source of truth for the visual language of
 * the polished student pages (originally extracted from the competency-tutor
 * page, now consolidated into /tutor).
 *
 * Look: slate-950 canvas, glass cards (slate-900/70 + backdrop-blur),
 * indigo→violet accent gradient with indigo glow shadows, rounded-2xl / 3xl
 * surfaces, emerald / rose / amber / sky status colors, spring motion.
 *
 * Import this module from legacy pages during the unification pass —
 * do NOT restyle pages by hand; consume the tokens/class recipes here.
 * Pure constants (no React imports) so server and client components can use it.
 */

// ─────────────────────────────────────────────────────────────
// 1. COLORS (hex values for canvas/SVG/chart use)
// ─────────────────────────────────────────────────────────────

export const colors = {
  // Base surfaces (Tailwind slate scale)
  bg: "#020617", // slate-950  — page canvas
  surface: "#0f172a", // slate-900  — card base (use as /70 alpha + blur in class recipes)
  surfaceAlt: "#1e293b", // slate-800  — tracks, dividers, hover fills
  border: "#1e293b", // slate-800  — card borders
  borderStrong: "#334155", // slate-700  — input borders

  // Text
  text: "#f1f5f9", // slate-100  — primary text
  textSecondary: "#94a3b8", // slate-400  — secondary text
  textMuted: "#64748b", // slate-500  — captions, placeholders
  textPlaceholder: "#475569", // slate-600  — input placeholders

  // Accent (indigo → violet)
  accent: "#6366f1", // indigo-500
  accentStrong: "#8b5cf6", // violet-500
  accentDeep: "#7c3aed", // violet-600
  accentSoft: "#a5b4fc", // indigo-300 — section labels
  accentBright: "#818cf8", // indigo-400 — rings, progress strokes
  accentGlow: "rgba(99, 102, 241, 0.30)", // shadow-indigo-500/30
  ambientGlow: "rgba(99, 102, 241, 0.12)", // radial page glow at 55% fade

  // Gradient stops (from → to)
  gradientFrom: "#6366f1", // indigo-500
  gradientTo: "#7c3aed", // violet-600
} as const;

/** Status palette — emerald (success), rose (error), amber (warning),
 *  sky (info). Hex + Tailwind class recipes with translucent fills. */
export const status = {
  success: {
    hex: "#34d399", // emerald-400
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    solid: "bg-emerald-500",
  },
  error: {
    hex: "#fb7185", // rose-400
    text: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    solid: "bg-rose-500",
  },
  warning: {
    hex: "#fcd34d", // amber-300
    text: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    solid: "bg-amber-500",
  },
  info: {
    hex: "#38bdf8", // sky-400
    text: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    solid: "bg-sky-500",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 2. RADII
// ─────────────────────────────────────────────────────────────

export const radii = {
  chip: "9999px", // rounded-full — subject/filter chips
  sm: "0.75rem", // rounded-xl  — hint rows, small tiles
  md: "1rem", // rounded-2xl — buttons, inputs, inner cards, icon squares
  lg: "1.5rem", // rounded-3xl — page-level cards
} as const;

/** Tailwind radius classes matching `radii`. */
export const radiusClass = {
  chip: "rounded-full",
  sm: "rounded-xl",
  md: "rounded-2xl",
  lg: "rounded-3xl",
} as const;

// ─────────────────────────────────────────────────────────────
// 3. SHADOWS (raw CSS box-shadow values)
// ─────────────────────────────────────────────────────────────

export const shadows = {
  card: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // shadow-2xl — primary cards
  accentGlow:
    "0 10px 15px -3px rgba(99, 102, 241, 0.30), 0 4px 6px -4px rgba(99, 102, 241, 0.30)", // shadow-lg shadow-indigo-500/30 — primary buttons, active chips, icon squares
  subtle: "0 10px 15px -3px rgba(0, 0, 0, 0.2)", // generic lifted element
} as const;

/** Tailwind shadow classes. */
export const shadowClass = {
  card: "shadow-2xl",
  accentGlow: "shadow-lg shadow-indigo-500/30",
  subtle: "shadow-lg",
} as const;

// ─────────────────────────────────────────────────────────────
// 4. SPACING (rem; matches Tailwind scale steps used by the tutor page)
// ─────────────────────────────────────────────────────────────

export const spacing = {
  pageX: "1rem", // px-4   — page gutter
  pageY: "2rem", // py-8   — page top/bottom padding
  pageMaxWidth: "72rem", // max-w-6xl — content column
  sectionGap: "1.5rem", // gap-6  — grid gap between cards
  cardPadding: "1.75rem", // p-7    — question card
  sidebarPadding: "1.5rem", // p-6    — sidebar cards
  elementGap: "1rem", // gap-4  — inside stacks
  chipGap: "0.5rem", // gap-2  — chip rows
  controlPaddingX: "1.5rem", // px-6   — buttons
  controlPaddingY: "0.875rem", // py-3.5 — buttons/inputs
  chipPaddingX: "1rem", // px-4   — chips
  chipPaddingY: "0.375rem", // py-1.5 — chips
} as const;

// ─────────────────────────────────────────────────────────────
// 5. MOTION
// ─────────────────────────────────────────────────────────────

export const motion = {
  durationFast: 150, // micro feedback (hover, scale)
  durationNormal: 300, // standard transitions
  durationSlow: 700, // dramatic reveals
  skeletonPulse: 1400, // loading skeleton opacity pulse (ms)

  /** Framer Motion spring for card/content entrances (serve → next question). */
  springEnter: { type: "spring", stiffness: 120, damping: 20 },
  /** Framer Motion spring for progress rings/bars. */
  springProgress: { type: "spring", stiffness: 60, damping: 18 },
  /** Exit transition for content being replaced. */
  exit: { opacity: 0, y: -16, scale: 0.98 },
  /** Enter transition for content (cards slide up + settle). */
  enter: { opacity: 1, y: 0, scale: 1 },
  /** Initial state for content entrances. */
  initial: { opacity: 0, y: 24, scale: 0.98 },
} as const;

/** Tailwind transition utility classes. */
export const transitionClass = {
  base: "transition-all",
  hoverScale: "transition-all hover:scale-[1.02] active:scale-95",
  focusRing: "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20",
} as const;

// ─────────────────────────────────────────────────────────────
// 6. CLASS RECIPES (composed Tailwind strings — the unification kit)
// ─────────────────────────────────────────────────────────────

/** Page shell: slate-950 canvas + indigo ambient glow overlay. */
export const pageClass = {
  shell: "min-h-screen bg-slate-950 text-slate-100",
  ambientGlow:
    "pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_55%)]",
  container: "relative mx-auto max-w-6xl px-4 py-8",
} as const;

/** Glass card used for every major panel. */
export const card = {
  /** Primary card: rounded-3xl glass + deep shadow (question card, sidebars). */
  primary:
    "rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur",
  /** Roomier primary card (question card uses p-7). */
  primaryLoose:
    "rounded-3xl border border-slate-800 bg-slate-900/70 p-7 shadow-2xl backdrop-blur",
  /** Compact stat/header pill card (header progress widget). */
  compact:
    "rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3 backdrop-blur",
  /** Skeleton placeholder block. */
  skeleton: "rounded-3xl border border-slate-800 bg-slate-900/50",
} as const;

/** Form controls. */
export const input =
  "flex-1 rounded-2xl border border-slate-700 bg-slate-950/80 px-5 py-3.5 text-lg outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-60";

/** Primary action button (indigo→violet gradient + glow). */
export const buttonPrimary =
  "rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100";

/** Secondary/ghost button on dark surfaces. */
export const buttonGhost =
  "rounded-2xl border border-slate-700 bg-slate-950/60 px-6 py-3.5 font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-slate-100";

/** Filter/subject chips (pill). */
export const chip = {
  base: "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
  active: "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30",
  inactive: "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800",
};

/** Small uppercase section label inside cards (indigo-300, tracking-wide). */
export const sectionLabel =
  "text-xs font-medium uppercase tracking-wider text-indigo-300";

/** Muted sidebar heading (slate-400 uppercase). */
export const sidebarHeading =
  "text-sm font-semibold uppercase tracking-wider text-slate-400";

/** Verdict banner styles keyed by outcome (correct / wrong / self-check / info). */
export const verdictBanner = {
  correct:
    "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 rounded-2xl border p-5",
  wrong: "text-rose-400 border-rose-500/30 bg-rose-500/10 rounded-2xl border p-5",
  warning:
    "text-amber-300 border-amber-500/30 bg-amber-500/10 rounded-2xl border p-5",
  info: "text-sky-400 border-sky-500/30 bg-sky-500/10 rounded-2xl border p-5",
} as const;

/** Hint row (amber ladder steps). */
export const hintRow =
  "rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-100/90";

/** Subject gradient hues (Tailwind from-/to- gradient pairs) used for chips,
 *  progress bars and illustrations. Keys are subject slugs. */
export const subjectHues: Record<string, string> = {
  maths: "from-indigo-500 to-violet-500",
  science: "from-emerald-500 to-teal-500",
  physics: "from-sky-500 to-blue-500",
  chemistry: "from-amber-500 to-orange-500",
  biology: "from-green-500 to-emerald-500",
  social_science: "from-rose-500 to-pink-500",
  history: "from-yellow-500 to-amber-500",
  geography: "from-lime-500 to-green-500",
  english: "from-fuchsia-500 to-purple-500",
  hindi: "from-orange-500 to-red-500",
  accountancy: "from-cyan-500 to-sky-500",
  economics: "from-teal-500 to-cyan-500",
  business_studies: "from-violet-500 to-fuchsia-500",
  applied_maths: "from-blue-500 to-indigo-500",
  computer_science: "from-slate-500 to-zinc-500",
};

/** Fallback hue for unknown subjects. */
export const defaultSubjectHue = "from-slate-500 to-zinc-500";
