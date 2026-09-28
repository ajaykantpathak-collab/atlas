/**
 * economicsSolvers.ts — deterministic TS mirrors of the backend
 * economics solver families (deploy/backend/its/solver/economics_families.py).
 *
 * The sandbox computes ground truth locally for live slider interaction
 * (sub-frame updates); the backend families own the same closed forms for
 * typed-problem solving through the ITS pipeline. Same gates: impossible
 * economy states (MPC >= 1, zero reserve ratio, negative price) return
 * { ok: false, reason } so the UI can route them to MisconceptionPanel
 * with authored corpus text instead of shipping a number.
 */

export type Solve<T> = { ok: true; value: T } | { ok: false; reason: string }

export const ok = <T,>(value: T): Solve<T> => ({ ok: true, value })
export const fail = (reason: string): Solve<never> => ({ ok: false, reason })

/**
 * This project compiles with "strict": false (strictNullChecks off), under
 * which TypeScript does NOT narrow the failure branch of a boolean
 * discriminant union. These two helpers read the reason through an explicit
 * cast so call sites stay compile-clean and narrowing-independent.
 */
export const failReason = <T,>(r: Solve<T>): string | null =>
  r.ok ? null : (r as { reason: string }).reason

export const failIs = <T,>(r: Solve<T>, reason: string): boolean =>
  !r.ok && (r as { reason: string }).reason === reason

export const fmt = (v: number): string =>
  Number.isInteger(v) ? v.toLocaleString('en-IN')
    : v.toLocaleString('en-IN', { maximumFractionDigits: 4 })

/** Linear market: Qd = a - bP (b > 0 is the slope magnitude), Qs = c + dP. */
export interface MarketState { a: number; b: number; c: number; d: number }

export interface MarketEquilibrium { pStar: number; qStar: number }

export function solveMarket(m: MarketState): Solve<MarketEquilibrium> {
  if (m.b <= 0) return fail('demand-slope')
  if (m.d <= 0) return fail('supply-slope')
  const denom = m.b + m.d
  if (denom === 0) return fail('parallel')
  const pStar = (m.a - m.c) / denom
  const qStar = m.a - m.b * pStar
  if (pStar <= 0) return fail('negative-price')
  if (qStar <= 0) return fail('negative-quantity')
  return ok({ pStar, qStar })
}

export const qdAt = (m: MarketState, p: number): number => m.a - m.b * p
export const qsAt = (m: MarketState, p: number): number => m.c + m.d * p

export function excessAt(m: MarketState, p: number): number {
  return qdAt(m, p) - qsAt(m, p)
}

/** Point elasticity on a linear demand curve: e = b * P / Q. */
export function pedPoint(a: number, b: number, p: number): Solve<{ q: number; e: number }> {
  if (b <= 0) return fail('demand-slope')
  const q = a - b * p
  if (q <= 0) return fail('beyond-choke')
  if (p <= 0) return fail('negative-price')
  return ok({ q, e: (b * p) / q })
}

export type EdClass = 'elastic' | 'unitary' | 'inelastic'

export const classifyEd = (e: number): EdClass =>
  Math.abs(e) > 1 + 1e-9 ? 'elastic' : Math.abs(e) < 1 - 1e-9 ? 'inelastic' : 'unitary'

/** Total-outlay method: classify demand from how TE = P x Q moves with P. */
export function totalOutlay(p1: number, q1: number, p2: number, q2: number): Solve<{
  te1: number; te2: number; cls: EdClass
}> {
  if (p1 <= 0 || p2 <= 0 || p1 === p2 || q1 < 0 || q2 < 0) return fail('outlay-inputs')
  const te1 = p1 * q1
  const te2 = p2 * q2
  const priceUp = p2 > p1
  let cls: EdClass
  if (Math.abs(te2 - te1) < 1e-9) cls = 'unitary'
  else if (te2 > te1 === priceUp) cls = 'inelastic'
  else cls = 'elastic'
  return ok({ te1, te2, cls })
}

/** GDP expenditure identity: GDP = C + I + G + (X - M). */
export function gdpExpenditure(c: number, i: number, g: number, x: number, m: number): Solve<number> {
  const gdp = c + i + g + (x - m)
  if (gdp <= 0) return fail('non-positive-gdp')
  return ok(gdp)
}

/** GDP deflator = nominal / real x 100. */
export function deflator(nominal: number, real: number): Solve<number> {
  if (real <= 0) return fail('non-positive-real')
  return ok((nominal / real) * 100)
}

/** Inflation between two price-index values. */
export function inflation(i1: number, i2: number): Solve<number> {
  if (i1 <= 0) return fail('non-positive-index')
  return ok(((i2 - i1) / i1) * 100)
}

/** Fisher approximate real rate = nominal - inflation. */
export function fisherReal(nominal: number, infl: number): Solve<number> {
  return ok(nominal - infl)
}

/** Money multiplier m = 1/RRR (rr in %), with deposit-creation chain. */
export function moneyMultiplier(rrPct: number): Solve<number> {
  if (rrPct <= 0) return fail('zero-reserve')
  if (rrPct >= 100) return fail('full-reserve')
  return ok(100 / rrPct)
}

export interface DepositRound { round: number; deposit: number; reserve: number; loan: number }

export function depositChain(rrPct: number, initial: number): Solve<{
  multiplier: number; total: number; credit: number; rounds: DepositRound[]
}> {
  const mm = moneyMultiplier(rrPct)
  if (!mm.ok) return fail(failReason(mm) ?? 'reserve-ratio')
  if (initial <= 0) return fail('non-positive-deposit')
  const rr = rrPct / 100
  const rounds: DepositRound[] = []
  let deposit = initial
  for (let r = 1; r <= 10 && deposit > 0.5; r++) {
    const reserve = deposit * rr
    const loan = deposit - reserve
    rounds.push({ round: r, deposit, reserve, loan })
    deposit = loan
  }
  const total = initial * mm.value
  return ok({ multiplier: mm.value, total, credit: total - initial, rounds })
}

/** Investment multiplier k = 1/(1-MPC) and dY = k dI. */
export function investmentMultiplier(mpc: number): Solve<{ k: number; mps: number }> {
  if (mpc <= 0 || mpc >= 1) return fail('mpc-range')
  return ok({ k: 1 / (1 - mpc), mps: 1 - mpc })
}

/** APC = C/Y, APS = 1 - APC. */
export function apcAps(y: number, c: number): Solve<{ apc: number; aps: number; s: number }> {
  if (y <= 0) return fail('non-positive-income')
  if (c < 0) return fail('negative-consumption')
  const apc = c / y
  return ok({ apc, aps: 1 - apc, s: y - c })
}

/** Budget deficits: revenue, fiscal, primary (amounts in the stated unit). */
export interface BudgetState { re: number; rr: number; ce: number; cr: number; ip: number }
export interface Deficits { revenue: number; fiscal: number; primary: number }

export function budgetDeficits(b: BudgetState): Deficits {
  const revenue = b.re - b.rr
  const fiscal = b.re + b.ce - (b.rr + b.cr)
  const primary = fiscal - b.ip
  return { revenue, fiscal, primary }
}

/** % change in the exchange rate (rupees per foreign unit). */
export function exchangeChange(r1: number, r2: number): Solve<{
  pct: number; depreciated: boolean
}> {
  if (r1 <= 0) return fail('non-positive-rate')
  return ok({ pct: ((r2 - r1) / r1) * 100, depreciated: r2 > r1 })
}

/** Unemployment + participation rates. */
export function unemploymentRates(e: number, u: number, wap: number): Solve<{
  lf: number; ur: number; pr: number | null
}> {
  const lf = e + u
  if (lf <= 0) return fail('empty-force')
  if (u > lf) return fail('u-above-lf')
  const ur = (u / lf) * 100
  let pr: number | null = null
  if (wap > 0) {
    pr = (lf / wap) * 100
    if (pr > 100) return fail('lf-above-population')
  }
  return ok({ lf, ur, pr })
}

/** Headcount ratio (poverty rate). */
export function headcountRatio(poor: number, total: number): Solve<number> {
  if (total <= 0) return fail('empty-population')
  if (poor > total) return fail('poor-above-total')
  return ok((poor / total) * 100)
}

/** Index numbers: simple aggregative, Laspeyres (base quantities), Paasche
 *  (current quantities).  Quantities optional (aggregative needs none). */
export interface IndexResult {
  aggregative: number
  laspeyres: number | null
  paasche: number | null
}

export function indexNumbers(
  p0: number[], p1: number[], q0: number[] | null, q1: number[] | null,
): Solve<IndexResult> {
  if (p0.length === 0 || p0.length !== p1.length) return fail('list-mismatch')
  if (p0.some(v => v <= 0)) return fail('non-positive-price')
  const s0 = p0.reduce((a, b) => a + b, 0)
  const s1 = p1.reduce((a, b) => a + b, 0)
  if (s0 === 0) return fail('zero-base')
  const aggregative = (s1 / s0) * 100
  let laspeyres: number | null = null
  if (q0 && q0.length === p0.length) {
    const num = p1.reduce((a, p, j) => a + p * q0[j], 0)
    const den = p0.reduce((a, p, j) => a + p * q0[j], 0)
    if (den > 0) laspeyres = (num / den) * 100
  }
  let paasche: number | null = null
  if (q1 && q1.length === p0.length) {
    const num = p1.reduce((a, p, j) => a + p * q1[j], 0)
    const den = p0.reduce((a, p, j) => a + p * q1[j], 0)
    if (den > 0) paasche = (num / den) * 100
  }
  return ok({ aggregative, laspeyres, paasche })
}
