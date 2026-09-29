/**
 * entrepreneurshipTopics.ts — closed-world data + deterministic solver
 * layer for the Entrepreneurship Lab (SANDBOX_TAXONOMY engine type 1,
 * Parameter Lab; classes 11-12 business studies / entrepreneurship).
 *
 * Every PREFILL number below is traceable to an authored worked example in
 * deploy/content/enhanced_nodes_md/ (business-studies corpus):
 *
 *   Break-even (VitaBand health-band unit)
 *     → c12_bs_cbse_03_004_comp seed scenario: monthly fixed costs
 *       ₹5,00,000, variable cost ₹300/unit, price ₹800/unit, authored
 *       solution BEQ = 5,00,000 ÷ (800 − 300) = 1,000 units with the
 *       corpus's own verification (TC = 5,00,000 + 1,000×300 = 8,00,000 =
 *       TR) and its variant "add the voice assistant: +₹50 variable cost".
 *   Unit economics
 *     → same node's contribution frame (P − VC = ₹500/unit) and its
 *       verification method (revenue − total cost at the break-even
 *       volume equals zero).
 *   Cash-flow projector
 *     → inflow/outflow per period framing of the corpus's cash-budget
 *       diagnostic (c12_bs_cbse_04_004: a cash budget quantifies expected
 *       inflows/outflows for one specific period); the default monthly
 *       volumes DERIVE from the VitaBand unit economics above (units ×
 *       price in, fixed + units × variable out) — a derived series, marked
 *       as such, not an authored table (the corpus has no 12-month table).
 *   Working capital (M/s Gupta Textiles)
 *     → c12_bs_cbse_09_007 WORKED_EXAMPLE_1 verbatim ledger:
 *       CA = 50,000 + 2,00,000 + 8,00,000 + 4,50,000 + 50,000 = ₹15,50,000;
 *       CL = 6,00,000 + 1,00,000 + 50,000 = ₹7,50,000;
 *       authored answer NWC = ₹8,00,000.
 *
 * Every MISCONCEPTION string is VERBATIM authored corpus text (COMMON_
 * MISCONCEPTION / Traps sections). Node ids in `source` fields are internal
 * grep anchors — they are never rendered; MisconceptionPanel pipes the text
 * through AuthoredText. Where the corpus has no authored match for a lab
 * state (e.g. price ≤ variable cost), there is NO invented teaching text —
 * the lab shows a plain solver-gate message and the panel honestly omits.
 */

export type Solve<T> = { ok: true; value: T } | { ok: false; reason: string }

export const ok = <T,>(value: T): Solve<T> => ({ ok: true, value })
export const fail = (reason: string): Solve<never> => ({ ok: false, reason })

/** Read a failure reason without relying on discriminant narrowing
 *  (the project compiles with strictNullChecks off — same helpers as
 *  economicsSolvers.ts). */
export const failReason = <T,>(r: Solve<T>): string | null =>
  r.ok ? null : (r as { reason: string }).reason

export const failIs = <T,>(r: Solve<T>, reason: string): boolean =>
  !r.ok && (r as { reason: string }).reason === reason

export const fmt = (v: number): string =>
  Number.isFinite(v) ? (Number.isInteger(v) ? v.toLocaleString('en-IN')
    : v.toLocaleString('en-IN', { maximumFractionDigits: 2 })) : '—'

/** Indian-format rupee readout, e.g. ₹8,00,000. */
export const fmtRupees = (v: number): string => `₹${fmt(Math.round(v * 100) / 100)}`

// ------------------------------------------------------------------ //
// authored misconceptions (verbatim corpus text — closed world)
// ------------------------------------------------------------------ //

export interface EntMisconception {
  /** Internal corpus provenance (never rendered). */
  source: string
  /** Verbatim authored misconception / trap text. */
  text: string
}

export const ENT_MISCONCEPTIONS: Record<string, EntMisconception> = {
  // c12_bs_cbse_03_004_comp — the node's authored "Traps" list under the
  // worked break-even solution (VitaBand).
  beTraps: {
    source: 'c12_bs_cbse_03_004_comp',
    text: 'Traps: 1) Using total cost instead of variable cost → overestimates BEQ. 2) Forgetting to convert lakhs to rupees → answer off by factor 100.',
  },
  // c12_bs_cbse_09_007 — COMMON_MISCONCEPTION of the working-capital node
  // (first two sentences, markdown emphasis markers stripped, words intact).
  wcDualEffect: {
    source: 'c12_bs_cbse_09_007',
    text: 'Students often believe that an increase in current assets always increases working capital requirement, ignoring that a simultaneous increase in current liabilities (e.g., taking more credit from suppliers) can offset or even reduce net working capital. For example, if a firm buys ₹10 lakh inventory on 90-day credit, current assets rise by ₹10 lakh but current liabilities also rise by ₹10 lakh — NWC unchanged.',
  },
  // c12_bs_cbse_09_005 — COMMON_MISCONCEPTION, the authored profit-vs-cash
  // sentence (verbatim extract).
  profitVsCash: {
    source: 'c12_bs_cbse_09_005',
    text: 'The exact wrong reasoning: They equate accounting profit (PAT) with distributable cash, ignoring that profit includes non-cash items (depreciation, accrued income) and that cash may be tied in working capital/fixed assets.',
  },
}

/** Wrong-state keys emitted by the lab benches. */
export type EntWrongState =
  | 'no-contribution'          // price ≤ variable cost: (P − VC) ≤ 0, BEP undefined
  | 'non-positive-price'       // price ≤ 0
  | 'negative-cost'            // negative fixed or variable cost
  | 'zero-current-liabilities' // current ratio x:1 undefined with CL = 0
  | 'cash-red'                 // a month's running cash balance fell below zero
  | 'wc-negative-gap'          // current liabilities outrun current assets (gap < 0)

/** Map a solver gate refusal (or lab-side check) to authored corpus text.
 *  Returns undefined where the corpus has no authored match — the panel
 *  honestly omits (same degradation contract as economicsMisconceptions). */
export function misconceptionFor(state: EntWrongState): EntMisconception | undefined {
  switch (state) {
    case 'no-contribution':
      // closest authored text for THIS node's break-even computation
      return ENT_MISCONCEPTIONS.beTraps
    case 'cash-red':
      return ENT_MISCONCEPTIONS.profitVsCash
    case 'wc-negative-gap':
      return ENT_MISCONCEPTIONS.wcDualEffect
    case 'non-positive-price':
    case 'negative-cost':
    case 'zero-current-liabilities':
      return undefined // no authored match — honest absence, gate note only
  }
}

// ------------------------------------------------------------------ //
// deterministic solvers (closed forms; the lab only displays these)
// ------------------------------------------------------------------ //

export interface BreakEvenResult {
  /** Contribution per unit: P − VC (rupees). */
  contribution: number
  /** BEP in units: FC / (P − VC) — exact value. */
  bepUnits: number
  /** BEP in rupees: BEP units × price. */
  bepRupees: number
}

/**
 * Break-even: BEP units = FC / (P − VC), BEP rupees = units × P.
 * Gates: price must be positive, costs non-negative, and there must BE a
 * contribution — if VC ≥ P each unit loses money (or breaks even per unit),
 * fixed costs are never recovered and the formula divides by ≤ 0.
 */
export function solveBreakEven(fc: number, price: number, vc: number): Solve<BreakEvenResult> {
  if (!Number.isFinite(fc) || !Number.isFinite(price) || !Number.isFinite(vc)) return fail('negative-cost')
  if (price <= 0) return fail('non-positive-price')
  if (fc < 0 || vc < 0) return fail('negative-cost')
  if (vc >= price) return fail('no-contribution')
  const contribution = price - vc
  const bepUnits = fc / contribution
  return ok({ contribution, bepUnits, bepRupees: bepUnits * price })
}

export interface MarginOfSafetyResult {
  /** Target sales − BEP sales, in units (negative → trading below BEP). */
  mosUnits: number
  /** MoS as % of target sales. */
  mosPercent: number
  /** Profit at target volume: (target − BEP) × contribution. */
  profitAtTarget: number
}

/**
 * Margin of safety at a target sales volume: MoS = (target − BEP)/target.
 * Standard board convention: expressed against the target (budgeted) sales.
 */
export function marginOfSafety(targetUnits: number, bepUnits: number, contribution: number): Solve<MarginOfSafetyResult> {
  if (!Number.isFinite(targetUnits) || targetUnits <= 0) return fail('non-positive-price')
  const mosUnits = targetUnits - bepUnits
  return ok({
    mosUnits,
    mosPercent: (mosUnits / targetUnits) * 100,
    profitAtTarget: mosUnits * contribution,
  })
}

export interface UnitEconomicsResult {
  contribution: number
  /** Total contribution at the given volume: units × (P − VC). */
  totalContribution: number
  /** Profit at the given volume: total contribution − FC. */
  profitAtVolume: number
  /** Target-profit volume: (FC + TP) / (P − VC). */
  targetProfitUnits: number
  /** Break-even units (the TP = 0 special case, shown for reference). */
  bepUnits: number
}

/**
 * Unit economics: contribution/unit = P − VC; total contribution =
 * units × contribution; target-profit units = (FC + TP)/(P − VC).
 * Same gate family as break-even — no contribution, no volumes.
 */
export function solveUnitEconomics(fc: number, price: number, vc: number, unitsSold: number, targetProfit: number): Solve<UnitEconomicsResult> {
  if (!Number.isFinite(fc) || !Number.isFinite(price) || !Number.isFinite(vc)) return fail('negative-cost')
  if (price <= 0) return fail('non-positive-price')
  if (fc < 0 || vc < 0 || targetProfit < 0) return fail('negative-cost')
  if (vc >= price) return fail('no-contribution')
  const contribution = price - vc
  const totalContribution = unitsSold * contribution
  return ok({
    contribution,
    totalContribution,
    profitAtVolume: totalContribution - fc,
    targetProfitUnits: (fc + targetProfit) / contribution,
    bepUnits: fc / contribution,
  })
}

export interface WorkingCapitalResult {
  /** Net working capital gap: CA − CL (rupees). */
  wcGap: number
  /** Current ratio in the solver's x:1 convention, rounded to 2 dp. */
  currentRatio: number
}

/**
 * Working capital: NWC = CA − CL; current ratio = CA/CL, written "x : 1".
 * Gate: with CL = 0 the ratio divides by zero — the lab shows a plain gate
 * note (the corpus does not author this case).
 */
export function solveWorkingCapital(ca: number, cl: number): Solve<WorkingCapitalResult> {
  if (!Number.isFinite(ca) || !Number.isFinite(cl)) return fail('negative-cost')
  if (ca < 0 || cl < 0) return fail('negative-cost')
  if (cl === 0) return fail('zero-current-liabilities')
  return ok({ wcGap: ca - cl, currentRatio: ca / cl })
}

// ------------------------------------------------------------------ //
// bench inventory + prefills (traceable numbers, see header)
// ------------------------------------------------------------------ //

export type EntBenchKey = 'breakeven' | 'unitecon' | 'cashflow' | 'workingcap'

export interface EntBench {
  key: EntBenchKey
  title: string
  emoji: string
  engine: string
  blurb: string
}

export const ENT_BENCHES: EntBench[] = [
  {
    key: 'breakeven',
    title: 'Break-even Bench',
    emoji: '⚖️',
    engine: 'E1 · 2D',
    blurb: 'Fixed cost, price and variable-cost sliders → BEP units and rupees, break-even chart, margin of safety at a target sales volume.',
  },
  {
    key: 'unitecon',
    title: 'Unit Economics',
    emoji: '🧾',
    engine: 'E1 · 2D',
    blurb: 'Contribution per unit, total contribution at a volume, and the target-profit volume (FC + TP)/(P − VC).',
  },
  {
    key: 'cashflow',
    title: 'Cash-flow Projector',
    emoji: '💵',
    engine: 'E1 · 2D',
    blurb: 'A 12-month cash budget: edit monthly inflows/outflows, watch the running balance, spot the months that go into the red.',
  },
  {
    key: 'workingcap',
    title: 'Working-capital Bench',
    emoji: '🔄',
    engine: 'E1 · 2D',
    blurb: 'Current assets vs current liabilities → the working-capital gap and the current ratio in the x : 1 convention.',
  },
]

export interface BreakEvenPrefill { fc: number; price: number; vc: number }

/** Corpus scenarios for the break-even bench (see header provenance). */
export const BREAK_EVEN_SCENARIOS: { name: string; note: string; values: BreakEvenPrefill }[] = [
  {
    name: 'health-band startup',
    note: 'the corpus worked example: fixed ₹5,00,000 · price ₹800 · variable ₹300 → 1,000 units',
    values: { fc: 500000, price: 800, vc: 300 },
  },
  {
    name: '…with voice assistant',
    note: 'the corpus variant: +₹50 variable cost for the local-language voice assistant (₹350/unit)',
    values: { fc: 500000, price: 800, vc: 350 },
  },
]

export interface UnitEconPrefill { fc: number; price: number; vc: number; unitsSold: number; targetProfit: number }

export const UNIT_ECON_PREFILL: UnitEconPrefill = {
  fc: 500000,
  price: 800,
  vc: 300,
  unitsSold: 1000,
  targetProfit: 250000,
}

export interface CashFlowPrefill {
  opening: number
  /** Monthly cash inflows, April → March (12 values, rupees). */
  inflows: number[]
  /** Monthly cash outflows, April → March (12 values, rupees). */
  outflows: number[]
}

export const MONTH_LABELS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

/**
 * Default year: DERIVED from the corpus's health-band unit economics —
 * a units ramp through the Indian festive/winter season, inflow =
 * units × ₹800, outflow = ₹5,00,000 fixed + units × ₹300 variable.
 * February dips below zero: sales continue, cash does not — the exact
 * authored profit-vs-cash lesson this lab surfaces when a month runs red.
 */
export const CASH_FLOW_PREFILL: CashFlowPrefill = {
  opening: 1000000,
  inflows: [400000, 440000, 520000, 560000, 640000, 720000, 880000, 960000, 800000, 640000, 400000, 800000],
  outflows: [650000, 665000, 695000, 710000, 740000, 770000, 830000, 860000, 800000, 740000, 650000, 800000],
}

export interface WorkingCapitalPrefill { ca: number; cl: number }

/** M/s Gupta Textiles ledger from the corpus worked example (₹15,50,000 / ₹7,50,000 → NWC ₹8,00,000). */
export const WORKING_CAPITAL_PREFILL: WorkingCapitalPrefill = { ca: 1550000, cl: 750000 }

/** Safe parse for editable numeric cells: invalid text reads as 0. */
export function num(text: string): number {
  const v = parseFloat(text.replace(/,/g, ''))
  return Number.isFinite(v) ? v : 0
}
