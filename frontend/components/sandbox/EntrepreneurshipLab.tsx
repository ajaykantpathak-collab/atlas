'use client'

/**
 * EntrepreneurshipLab — the E1 Parameter Lab for classes 11-12 business
 * studies / entrepreneurship (SANDBOX_TAXONOMY engine type 1).
 *
 * Four benches, all deterministic closed forms computed locally — no LLM,
 * no network solve:
 *
 *   Break-even       BEP units = FC/(P−VC) · BEP rupees = units × P
 *                    · margin of safety at a target sales volume
 *   Unit economics   contribution/unit = P−VC · total contribution
 *                    · target-profit volume = (FC+TP)/(P−VC)
 *   Cash-flow        12-month cash budget → running balance, red months
 *   Working capital  NWC = CA−CL · current ratio in the x : 1 convention
 *
 * Prefills come from authored worked examples in the business-studies
 * corpus (entrepreneurshipTopics.ts header lists every number's source).
 * Impossible states route through the solver-family gate: VC ≥ P means no
 * contribution, so the break-even division is undefined — the bench shows
 * a plain gate note plus the node's AUTHORED trap text via
 * MisconceptionPanel, and states the corpus does not author get the gate
 * note only (honest absence, nothing invented).
 */
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import {
  ENT_BENCHES, BREAK_EVEN_SCENARIOS, CASH_FLOW_PREFILL, UNIT_ECON_PREFILL,
  WORKING_CAPITAL_PREFILL, MONTH_LABELS,
  solveBreakEven, marginOfSafety, solveUnitEconomics, solveWorkingCapital,
  misconceptionFor, failIs, fmt, fmtRupees, num,
  type EntBenchKey,
} from './entrepreneurshipTopics'

// ------------------------------------------------------------------ //
// UI atoms (house style, same conventions as the economics lab)
// ------------------------------------------------------------------ //

function Slider({ label, value, set, min, max, step = 1, display }: {
  label: string; value: number; set: (v: number) => void
  min: number; max: number; step?: number; display?: string
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-[11px] font-bold text-slate-300">
        <span>{label}</span>
        <span className="font-mono text-gold-300">{display ?? fmt(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => set(parseFloat(e.target.value))}
        className="mt-1 w-full accent-gold-400" />
    </label>
  )
}

function Readout({ label, value, tone = 'gold', hint }: {
  label: string; value: string; tone?: 'gold' | 'green' | 'amber' | 'red'; hint?: string
}) {
  const tones: Record<string, string> = {
    gold: 'border-gold-400/40 bg-gold-500/10 text-gold-200',
    green: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
    amber: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
    red: 'border-rose-400/40 bg-rose-500/10 text-rose-200',
  }
  return (
    <div className={`rounded-xl border px-3 py-2 ${tones[tone]}`}>
      <p className="text-[9px] font-black uppercase tracking-widest opacity-70">{label}</p>
      <p className="font-mono text-sm font-black">{value}</p>
      {hint && <p className="mt-0.5 text-[9px] font-semibold opacity-60">{hint}</p>}
    </div>
  )
}

/** Inline gate message for impossible states — plain solver language only;
 *  authored teaching text (when the corpus has one) goes through
 *  MisconceptionPanel below it. */
function GateNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 rounded-xl border border-rose-400/30 bg-rose-500/5 px-3 py-2">
      <p className="text-xs font-bold text-rose-300">{children}</p>
    </div>
  )
}

/** Money slider display helper. */
const inr = (v: number): string => fmtRupees(v)

// ------------------------------------------------------------------ //
// bench 1 — break-even
// ------------------------------------------------------------------ //

function BreakEvenBench() {
  const [scen, setScen] = useState(0)
  const [fc, setFc] = useState(BREAK_EVEN_SCENARIOS[0].values.fc)
  const [price, setPrice] = useState(BREAK_EVEN_SCENARIOS[0].values.price)
  const [vc, setVc] = useState(BREAK_EVEN_SCENARIOS[0].values.vc)
  const [target, setTarget] = useState(2500)

  const solve = solveBreakEven(fc, price, vc)
  const r = solve.ok ? solve.value : null
  const mos = r ? marginOfSafety(target, r.bepUnits, r.contribution) : null
  const gated = failIs(solve, 'no-contribution') || failIs(solve, 'non-positive-price') || failIs(solve, 'negative-cost')

  return (
    <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-4">
      <div className="space-y-3">
        <div className="flex gap-1.5 flex-wrap">
          {BREAK_EVEN_SCENARIOS.map((s, i) => (
            <button key={s.name} onClick={() => { setScen(i); setFc(s.values.fc); setPrice(s.values.price); setVc(s.values.vc); setTarget(2500) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${i === scen ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {s.name}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">{BREAK_EVEN_SCENARIOS[scen].note}</p>
        <Slider label="Fixed cost (per month)" value={fc} set={setFc} min={0} max={2000000} step={10000} display={inr(fc)} />
        <Slider label="Selling price per unit" value={price} set={setPrice} min={100} max={1000} step={10} display={inr(price)} />
        <Slider label="Variable cost per unit" value={vc} set={setVc} min={0} max={1000} step={10} display={inr(vc)} />
        <Slider label="Target sales volume" value={target} set={setTarget} min={0} max={5000} step={50} display={`${fmt(target)} units`} />
        {gated && (
          <GateNote>
            No contribution — each unit sells for {inr(price)} but costs {inr(vc)} to make.
            Break-even divides fixed cost by (price − variable cost), and that gap is ≤ 0,
            so no sales volume can ever recover the fixed cost. Raise the price or cut the
            variable cost before the bench can compute a break-even point.
          </GateNote>
        )}
        <MisconceptionPanel
          misconception={gated ? (misconceptionFor('no-contribution')?.text ?? null) : null} />
      </div>

      <div>
        {r && mos && mos.ok && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Readout label="contribution / unit" value={inr(r.contribution)} hint="price − variable cost" />
              <Readout label="BEP units" value={`${fmt(r.bepUnits)}`} hint={`round up → ${fmt(Math.ceil(r.bepUnits))} whole units`} />
              <Readout label="BEP rupees" value={fmtRupees(r.bepRupees)} hint="BEP units × price" />
              <Readout label={`margin of safety @ ${fmt(target)} units`} value={`${fmt(mos.value.mosUnits)} units`}
                tone={mos.value.mosUnits >= 0 ? 'green' : 'amber'}
                hint={`${fmt(mos.value.mosPercent)}% of target`} />
              <Readout label="profit at target volume" value={fmtRupees(mos.value.profitAtTarget)}
                tone={mos.value.profitAtTarget >= 0 ? 'green' : 'red'}
                hint="(target − BEP) × contribution" />
              <Readout label="check — contribution covers FC" value={`${fmt(r.bepUnits)} × ${inr(r.contribution)} = ${fmtRupees(r.bepUnits * r.contribution)}`}
                hint="must equal the fixed cost exactly" />
            </div>
            <BreakEvenChart fc={fc} price={price} vc={vc} bepUnits={r.bepUnits} target={target} />
          </>
        )}
        {r && mos && !mos.ok && (
          <p className="text-xs text-slate-400">Set a target sales volume above zero to see the margin of safety.</p>
        )}
      </div>
    </div>
  )
}

/** Revenue vs total-cost chart with the break-even crossing and the
 *  margin-of-safety band. Native SVG, deterministic. */
function BreakEvenChart({ fc, price, vc, bepUnits, target }: {
  fc: number; price: number; vc: number; bepUnits: number; target: number
}) {
  const W = 580, H = 280, L = 44, R = 14, T = 14, B = 30
  const xMax = Math.max(Math.ceil(bepUnits * 1.5), target * 1.2, 500)
  const yMax = Math.max(price * xMax, fc + vc * xMax) * 1.05
  const X = (x: number) => L + (x / xMax) * (W - L - R)
  const Y = (y: number) => H - B - (y / yMax) * (H - T - B)
  const safe = (v: number) => (Number.isFinite(v) ? v : 0)
  const belowBep = target < bepUnits
  return (
    <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/60 p-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="break-even chart">
        {/* margin-of-safety band between BEP and target volume */}
        <rect x={Math.min(X(safe(bepUnits)), X(safe(target)))} y={T}
          width={Math.abs(X(safe(target)) - X(safe(bepUnits)))} height={H - T - B}
          fill={belowBep ? 'rgba(244,63,94,0.10)' : 'rgba(52,211,153,0.10)'} />
        {/* axes */}
        <line x1={L} y1={H - B} x2={W - R} y2={H - B} stroke="#475569" strokeWidth={1} />
        <line x1={L} y1={T} x2={L} y2={H - B} stroke="#475569" strokeWidth={1} />
        {/* total cost line */}
        <line x1={X(0)} y1={Y(safe(fc))} x2={X(xMax)} y2={Y(safe(fc + vc * xMax))} stroke="#94a3b8" strokeWidth={2} />
        {/* revenue line */}
        <line x1={X(0)} y1={Y(0)} x2={X(xMax)} y2={Y(safe(price * xMax))} stroke="#eab308" strokeWidth={2.5} />
        {/* break-even point */}
        <circle cx={X(safe(bepUnits))} cy={Y(safe(bepUnits * price))} r={5} fill="#34d399" stroke="#064e3b" />
        {/* target volume marker */}
        <line x1={X(safe(target))} y1={T} x2={X(safe(target))} y2={H - B} stroke="#c084fc" strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={X(safe(target)) + 4} y={T + 10} fill="#c084fc" fontSize={10} fontWeight="bold">target</text>
        <text x={X(safe(bepUnits)) + 6} y={Y(safe(bepUnits * price)) - 8} fill="#34d399" fontSize={10} fontWeight="bold">BEP</text>
        {/* axis labels */}
        <text x={W / 2} y={H - 8} fill="#64748b" fontSize={10} textAnchor="middle">units sold →</text>
        <text x={12} y={H / 2} fill="#64748b" fontSize={10} textAnchor="middle" transform={`rotate(-90 12 ${H / 2})`}>rupees →</text>
        <text x={X(xMax) - 2} y={Y(safe(price * xMax)) - 6} fill="#eab308" fontSize={10} textAnchor="end">revenue</text>
        <text x={X(xMax) - 2} y={Y(safe(fc + vc * xMax)) - 6} fill="#94a3b8" fontSize={10} textAnchor="end">total cost</text>
      </svg>
      <p className="px-1 text-[10px] text-slate-500">
        {belowBep
          ? 'target sits LEFT of the break-even point (rose band) — at this volume the fixed cost is not yet covered'
          : 'target sits RIGHT of the break-even point (green band) — the band is the margin of safety'}
      </p>
    </div>
  )
}

// ------------------------------------------------------------------ //
// bench 2 — unit economics
// ------------------------------------------------------------------ //

function UnitEconBench() {
  const [fc, setFc] = useState(UNIT_ECON_PREFILL.fc)
  const [price, setPrice] = useState(UNIT_ECON_PREFILL.price)
  const [vc, setVc] = useState(UNIT_ECON_PREFILL.vc)
  const [unitsSold, setUnitsSold] = useState(UNIT_ECON_PREFILL.unitsSold)
  const [targetProfit, setTargetProfit] = useState(UNIT_ECON_PREFILL.targetProfit)

  const solve = solveUnitEconomics(fc, price, vc, unitsSold, targetProfit)
  const r = solve.ok ? solve.value : null
  const gated = failIs(solve, 'no-contribution') || failIs(solve, 'non-positive-price') || failIs(solve, 'negative-cost')

  return (
    <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-4">
      <div className="space-y-3">
        <p className="text-[10px] text-slate-500 leading-relaxed">
          The corpus&apos;s health-band example: fixed ₹5,00,000 · price ₹800 · variable ₹300 →
          each unit contributes ₹500, and 1,000 units just cover the fixed cost.
        </p>
        <Slider label="Fixed cost (per month)" value={fc} set={setFc} min={0} max={2000000} step={10000} display={inr(fc)} />
        <Slider label="Selling price per unit" value={price} set={setPrice} min={100} max={1000} step={10} display={inr(price)} />
        <Slider label="Variable cost per unit" value={vc} set={setVc} min={0} max={1000} step={10} display={inr(vc)} />
        <Slider label="Units sold (current volume)" value={unitsSold} set={setUnitsSold} min={0} max={5000} step={50} display={`${fmt(unitsSold)} units`} />
        <Slider label="Target profit" value={targetProfit} set={setTargetProfit} min={0} max={1000000} step={10000} display={inr(targetProfit)} />
        {gated && (
          <GateNote>
            No contribution — price ({inr(price)}) does not exceed variable cost ({inr(vc)}),
            so every unit sold moves the business backwards and a target-profit volume does
            not exist: (FC + TP)/(P − VC) divides by a number ≤ 0.
          </GateNote>
        )}
        <MisconceptionPanel
          misconception={gated ? (misconceptionFor('no-contribution')?.text ?? null) : null} />
      </div>

      <div>
        {r && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Readout label="contribution / unit" value={inr(r.contribution)} hint="price − variable cost" />
            <Readout label="total contribution @ volume" value={fmtRupees(r.totalContribution)}
              hint={`${fmt(unitsSold)} units × ${inr(r.contribution)}`} />
            <Readout label="profit at this volume" value={fmtRupees(r.profitAtVolume)}
              tone={r.profitAtVolume >= 0 ? 'green' : 'red'}
              hint="total contribution − fixed cost" />
            <Readout label={`units for target profit (${inr(targetProfit)})`} value={`${fmt(Math.ceil(r.targetProfitUnits))} units`}
              tone="green" hint="(FC + TP)/(P − VC)" />
            <Readout label="break-even units (reference)" value={fmt(r.bepUnits)} hint="the TP = 0 case" />
            <Readout label="check" value={`${fmt(Math.ceil(r.targetProfitUnits))} × ${inr(r.contribution)} − ${fmtRupees(fc)} ≈ ${fmtRupees(Math.ceil(r.targetProfitUnits) * r.contribution - fc)}`}
              hint="rounding up meets or beats the target" />
          </div>
        )}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ //
// bench 3 — cash-flow projector
// ------------------------------------------------------------------ //

function CashFlowBench() {
  const [opening, setOpening] = useState(CASH_FLOW_PREFILL.opening)
  const [inflows, setInflows] = useState<string[]>(CASH_FLOW_PREFILL.inflows.map(String))
  const [outflows, setOutflows] = useState<string[]>(CASH_FLOW_PREFILL.outflows.map(String))

  const restore = () => {
    setOpening(CASH_FLOW_PREFILL.opening)
    setInflows(CASH_FLOW_PREFILL.inflows.map(String))
    setOutflows(CASH_FLOW_PREFILL.outflows.map(String))
  }

  const rows = useMemo(() => {
    const bal: number[] = []
    let run = opening
    for (let i = 0; i < 12; i++) {
      const inf = num(inflows[i] ?? '0')
      const out = num(outflows[i] ?? '0')
      run = run + inf - out
      bal.push(run)
    }
    return bal.map((balance, i) => ({
      month: MONTH_LABELS[i],
      inflow: num(inflows[i] ?? '0'),
      outflow: num(outflows[i] ?? '0'),
      net: num(inflows[i] ?? '0') - num(outflows[i] ?? '0'),
      balance,
    }))
  }, [opening, inflows, outflows])

  const redMonths = rows.filter(rw => rw.balance < 0)
  const worst = rows.reduce((w, rw) => (rw.balance < w.balance ? rw : w), rows[0])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="flex items-baseline gap-2 text-[11px] font-bold text-slate-300">
          opening cash (April 1)
          <input type="range" min={0} max={3000000} step={50000} value={opening}
            onChange={e => setOpening(parseFloat(e.target.value))}
            className="w-44 accent-gold-400" />
          <span className="font-mono text-gold-300">{fmtRupees(opening)}</span>
        </label>
        <button onClick={restore}
          className="ml-auto px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-[11px] font-bold text-slate-300 hover:text-white">
          restore the default year
        </button>
      </div>

      <p className="text-[10px] text-slate-500 leading-relaxed">
        A cash budget plans one specific period, month by month — the default year is built
        from the health-band unit economics (units × price in, fixed + units × variable out,
        festive-and-winter ramp). Edit any cell; the running balance recomputes instantly.
        Months whose running balance falls below zero are the red ones.
      </p>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-4">
        {/* the 12-month grid */}
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-[11px] font-mono border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300">
                <th className="px-2 py-1.5 text-left font-bold">month</th>
                <th className="px-2 py-1.5 text-right font-bold">inflow (₹)</th>
                <th className="px-2 py-1.5 text-right font-bold">outflow (₹)</th>
                <th className="px-2 py-1.5 text-right font-bold">net</th>
                <th className="px-2 py-1.5 text-right font-bold">running balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((rw, i) => (
                <tr key={rw.month} className={rw.balance < 0 ? 'bg-rose-500/10' : i % 2 ? 'bg-slate-900/40' : ''}>
                  <td className={`px-2 py-1 font-bold ${rw.balance < 0 ? 'text-rose-300' : 'text-slate-300'}`}>{rw.month}</td>
                  <td className="px-1 py-1 text-right">
                    <input value={inflows[i] ?? ''} onChange={e => setInflows(prev => prev.map((v, j) => (j === i ? e.target.value : v)))}
                      className="w-24 rounded-md bg-slate-950 border border-slate-700 px-1.5 py-0.5 text-right text-[11px] font-mono text-emerald-200 focus:outline-none focus:border-gold-400" />
                  </td>
                  <td className="px-1 py-1 text-right">
                    <input value={outflows[i] ?? ''} onChange={e => setOutflows(prev => prev.map((v, j) => (j === i ? e.target.value : v)))}
                      className="w-24 rounded-md bg-slate-950 border border-slate-700 px-1.5 py-0.5 text-right text-[11px] font-mono text-rose-200 focus:outline-none focus:border-gold-400" />
                  </td>
                  <td className={`px-2 py-1 text-right ${rw.net >= 0 ? 'text-emerald-300/90' : 'text-rose-300'}`}>{fmt(rw.net)}</td>
                  <td className={`px-2 py-1 text-right font-black ${rw.balance < 0 ? 'text-rose-300' : 'text-slate-100'}`}>
                    {rw.balance < 0 ? '▼ ' : ''}{fmtRupees(rw.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* chart + verdicts */}
        <div className="space-y-2">
          <CashFlowChart balances={rows.map(rw => rw.balance)} />
          <div className="grid grid-cols-2 gap-2">
            <Readout label="closing balance (Mar 31)" value={fmtRupees(rows[rows.length - 1]?.balance ?? 0)}
              tone={(rows[rows.length - 1]?.balance ?? 0) >= 0 ? 'green' : 'red'} />
            <Readout label="months in the red" value={`${redMonths.length}`}
              tone={redMonths.length ? 'red' : 'green'}
              hint={redMonths.length ? redMonths.map(rw => rw.month).join(' · ') : 'none'} />
            <div className="col-span-2">
              <Readout label="lowest point of the year" value={`${worst ? worst.month : '—'} · ${fmtRupees(worst?.balance ?? 0)}`}
                tone={(worst?.balance ?? 0) >= 0 ? 'green' : 'amber'} />
            </div>
          </div>
          <MisconceptionPanel
            misconception={redMonths.length ? (misconceptionFor('cash-red')?.text ?? null) : null} />
        </div>
      </div>
    </div>
  )
}

function CashFlowChart({ balances }: { balances: number[] }) {
  const W = 300, H = 190, L = 8, R = 8, T = 12, B = 22
  const maxAbs = Math.max(1, ...balances.map(b => Math.abs(b)))
  const zeroY = T + (H - T - B) / 2
  const bw = (W - L - R) / balances.length
  const Y = (v: number) => zeroY - (v / maxAbs) * ((H - T - B) / 2)
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="running cash balance by month">
        <line x1={L} y1={zeroY} x2={W - R} y2={zeroY} stroke="#64748b" strokeWidth={1} />
        {balances.map((b, i) => {
          const x = L + i * bw + bw * 0.15
          const w = bw * 0.7
          const yTop = b >= 0 ? Y(b) : zeroY
          const h = Math.max(1, Math.abs(Y(b) - zeroY))
          return (
            <g key={i}>
              <rect x={x} y={yTop} width={w} height={h} rx={2}
                fill={b >= 0 ? 'rgba(52,211,153,0.75)' : 'rgba(244,63,94,0.8)'} />
              <text x={x + w / 2} y={H - 8} fill={b >= 0 ? '#64748b' : '#fb7185'} fontSize={8}
                textAnchor="middle" fontWeight={b >= 0 ? 'normal' : 'bold'}>
                {MONTH_LABELS[i]}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="text-center text-[10px] text-slate-500">running cash balance, April → March (red = below zero)</p>
    </div>
  )
}

// ------------------------------------------------------------------ //
// bench 4 — working capital
// ------------------------------------------------------------------ //

function WorkingCapBench() {
  const [ca, setCa] = useState(WORKING_CAPITAL_PREFILL.ca)
  const [cl, setCl] = useState(WORKING_CAPITAL_PREFILL.cl)

  const solve = solveWorkingCapital(ca, cl)
  const r = solve.ok ? solve.value : null
  const zeroCl = failIs(solve, 'zero-current-liabilities')
  const negativeGap = !!r && r.wcGap < 0

  return (
    <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-4">
      <div className="space-y-3">
        <p className="text-[10px] text-slate-500 leading-relaxed">
          The sliders open on the corpus&apos;s trading-firm worked example — current assets
          ₹15,50,000 (cash ₹50,000 + bank ₹2,00,000 + inventory ₹8,00,000 + debtors ₹4,50,000 +
          bills receivable ₹50,000) against current liabilities ₹7,50,000 (creditors ₹6,00,000 +
          bills payable ₹1,00,000 + outstanding wages ₹50,000), whose net working capital is
          ₹8,00,000.
        </p>
        <Slider label="Current assets" value={ca} set={setCa} min={0} max={5000000} step={50000} display={inr(ca)} />
        <Slider label="Current liabilities" value={cl} set={setCl} min={0} max={5000000} step={50000} display={inr(cl)} />
        {zeroCl && (
          <GateNote>
            Current ratio undefined — the x : 1 convention divides current assets by current
            liabilities, and current liabilities are zero. Give the firm at least some
            short-term obligations to compute a ratio.
          </GateNote>
        )}
        <MisconceptionPanel
          misconception={negativeGap ? (misconceptionFor('wc-negative-gap')?.text ?? null) : null} />
      </div>

      <div>
        {r && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Readout label="gross working capital" value={fmtRupees(ca)} hint="total current assets" />
              <Readout label="working-capital gap (NWC)" value={fmtRupees(r.wcGap)}
                tone={r.wcGap >= 0 ? 'green' : 'red'} hint="current assets − current liabilities" />
              <Readout label="current ratio" value={`${r.currentRatio.toFixed(2)} : 1`}
                tone={r.currentRatio >= 1 ? 'green' : 'red'} hint="CA ÷ CL, solver convention" />
            </div>
            <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black mb-1">reading the ratio</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {r.currentRatio >= 2
                  ? `₹${fmt(r.currentRatio)} of current assets for every ₹1 of current liabilities — a comfortable cushion; the corpus's own worked example lands near 2 : 1.`
                  : r.currentRatio >= 1
                    ? `₹${fmt(r.currentRatio)} of current assets for every ₹1 of current liabilities — above 1 : 1, so short-term obligations are covered, but the cushion is thin.`
                    : `only ₹${fmt(r.currentRatio)} of current assets for every ₹1 of current liabilities — below 1 : 1, short-term obligations outrun short-term resources (the rose state above).`}
              </p>
            </div>
            {/* CA vs CL bar */}
            <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/60 p-3">
              {(() => {
                const maxv = Math.max(ca, cl, 1)
                const bar = (v: number) => `${Math.max(1, (v / maxv) * 100)}%`
                return (
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-300 mb-0.5">current assets · {fmtRupees(ca)}</p>
                      <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-400/70" style={{ width: bar(ca) }} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-rose-300 mb-0.5">current liabilities · {fmtRupees(cl)}</p>
                      <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-rose-400/70" style={{ width: bar(cl) }} />
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ //
// shell
// ------------------------------------------------------------------ //

export default function EntrepreneurshipLab() {
  const [bench, setBench] = useState<EntBenchKey>('breakeven')
  const current = ENT_BENCHES.find(b => b.key === bench) ?? ENT_BENCHES[0]

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <h2 className="font-black text-lg text-white">
          💼 Entrepreneurship Lab
          <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            break-even · unit economics · cash-flow · working capital
          </span>
        </h2>
        <div className="flex gap-1.5 flex-wrap mt-2.5">
          {ENT_BENCHES.map(b => (
            <button key={b.key} onClick={() => setBench(b.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${b.key === bench ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {b.emoji} {b.title}
              <span className="ml-1.5 text-[9px] font-black opacity-60">{b.engine}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-slate-400">{current.blurb}</p>
      </div>

      <div className="p-4">
        {bench === 'breakeven' && <BreakEvenBench />}
        {bench === 'unitecon' && <UnitEconBench />}
        {bench === 'cashflow' && <CashFlowBench />}
        {bench === 'workingcap' && <WorkingCapBench />}
      </div>
    </div>
  )
}

/** Tab config consumed by the sandbox page wiring (post-hoc integration). */
export const ENTREPRENEURSHIP_LAB_TAB = {
  id: 'entrepreneurship',
  label: '💼 Entrepreneurship Lab',
  component: EntrepreneurshipLab,
} as const
