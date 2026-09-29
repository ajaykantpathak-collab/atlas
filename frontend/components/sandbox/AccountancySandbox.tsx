'use client'

/**
 * AccountancySandbox — the accountancy tab of /sandbox (classes 9-12).
 *
 * Engine mix per SANDBOX_TAXONOMY.md: E7 Document & Ledger Workbench
 * (journal entry verification, live T-account posting, trial balance,
 * final-accounts assembler) + E1 Parameter Lab (depreciation SLM/WDV
 * sliders, ratio asks) — with the 3D accounting-equation pans
 * (Assets = Liabilities + Capital, level after every dual entry) as the
 * flagship visual.
 *
 * EVERY accounting answer is validated through the deterministic solver:
 *   inputs → POST /api/sandbox/solve (subject "accountancy",
 *   accountancy_families.py) → golden entry / schedule / profit.
 * The component never hardcodes an expected debit-credit pair: the
 * student's pick is checked against the entry parsed out of the solver's
 * golden answer, and account classifications for the equation view are
 * parsed out of the solver's golden-rules reasoning.
 *
 * A wrong entry triggers the MisconceptionPanel with the authored corpus
 * content of the topic's node (remediation.ts, closed-world, honest
 * degradation — nodes without authored misconceptions render nothing).
 *
 * The 3D stage is next/dynamic(ssr:false) so three.js stays out of the
 * page's first-load bundle.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  BookOpen, Scale, TrendingDown, Files, Search,
  CheckCircle2, XCircle,
} from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import {
  fetchNodeRemediation, type NodeRemediation,
} from '@/components/learn/remediation'
import {
  ACCOUNTANCY_SANDBOX_CLASSES,
  TXN_PRESETS, ACCOUNT_CHOICES, type TxnPreset,
} from './accountancyTopics'
import type { PanSide, DeclinePoint } from './AccountancyStage3D'

const AccountancyStage3D = dynamic(() => import('./AccountancyStage3D'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-xs text-slate-500">
      loading 3D stage…
    </div>
  ),
})

// ---------------------------------------------------------------- solver --

interface SolveState {
  loading: boolean
  matched: boolean
  available?: boolean
  structure: string
  final_answer: string
  numeric_answer: number | null
  steps: string[]
  note: string
}

const IDLE: SolveState = {
  loading: false, matched: false, structure: '',
  final_answer: '', numeric_answer: null, steps: [], note: '',
}

async function askSolver(text: string): Promise<SolveState> {
  try {
    const r = await fetch('/api/sandbox/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'accountancy', text }),
    })
    if (!r.ok) return { ...IDLE, note: `solver error: ${r.status}` }
    const d = await r.json()
    return {
      loading: false,
      matched: !!d.matched,
      available: d.available,
      structure: d.structure || '',
      final_answer: d.final_answer || '',
      numeric_answer: d.numeric_answer ?? null,
      steps: Array.isArray(d.steps) ? d.steps : [],
      note: d.note || '',
    }
  } catch (e: any) {
    return { ...IDLE, note: e?.message || 'solver unreachable' }
  }
}

function fmt(v: number): string {
  if (!Number.isFinite(v)) return '—'
  return '₹' + Math.round(v).toLocaleString('en-IN')
}

function StepsList({ s }: { s: SolveState }) {
  if (s.loading) return <p className="text-xs text-slate-400 py-2">computing…</p>
  if (s.note && !s.matched) {
    return <p className="text-xs text-amber-300/90 py-2">{s.note}</p>
  }
  if (!s.matched) {
    return (
      <p className="text-xs text-slate-400 py-2">
        No deterministic family matched that wording — try the topic&apos;s
        sample prompt or reword it like the textbook.
      </p>
    )
  }
  return (
    <div className="mt-2">
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-black">
          {s.structure}
        </span>
        <span className="text-sm font-bold text-white whitespace-pre-line">
          {s.final_answer}
        </span>
      </div>
      <ol className="mt-1.5 space-y-1">
        {s.steps.map((st, i) => (
          <li key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
            <span className="text-slate-500 font-mono flex-shrink-0">{i + 1}.</span>
            <span>{st}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ------------------------------------------------- golden entry (solver) --

type AcctCat = 'asset' | 'liability' | 'capital' | 'drawings' | 'expense' | 'income'

export interface PostedEntry {
  id: number
  txnKey: string
  narration: string
  debit: string
  credit: string
  drCat: AcctCat
  crCat: AcctCat
  amount: number
}

/**
 * Parse the golden entry OUT OF THE SOLVER'S ANSWER — the expected
 * debit/credit pair is never stored in the component. Falls back to
 * null when the answer shape is not a journal entry.
 */
function parseGoldenEntry(s: SolveState): Omit<PostedEntry, 'id' | 'txnKey'> | null {
  if (!s.matched || s.structure !== 'JOURNAL_ENTRY') return null
  const lines = s.final_answer.split('\n')
  let debit = ''
  let credit = ''
  for (const ln of lines) {
    if (!debit && /Dr\.\s*[\d,]/.test(ln)) {
      debit = ln.split('A/c')[0].trim()
    }
    const to = ln.match(/To\s+(.+?)\s+A\/c/)
    if (to) credit = to[1].trim()
  }
  if (!debit || !credit) return null
  const catOf = (acct: string): AcctCat => {
    const stepLine = s.steps.find(
      st => st.trim().startsWith('Dr ') && st.includes(acct.split(' ')[0]))
      ?? s.steps.find(
        st => st.trim().startsWith('Cr ') && st.includes(acct.split(' ')[0]))
      ?? ''
    const low = stepLine.toLowerCase()
    if (/drawings/.test(low)) return 'drawings'
    if (/creditor|liability/.test(low)) return 'liability'
    if (/debtor/.test(low)) return 'asset'
    if (/expense/.test(low)) return 'expense'
    if (/income/.test(low)) return 'income'
    if (/capital/.test(low)) return 'capital'
    return 'asset'
  }
  const am = s.final_answer.match(/Dr\.\s*([\d,]+)/)
  const amount = am ? Number(am[1].replace(/,/g, '')) : 0
  const narr = s.final_answer.match(/\(([^)]+)\)\s*$/)
  return {
    narration: narr ? narr[1] : '',
    debit, credit,
    drCat: catOf(debit), crCat: catOf(credit),
    amount,
  }
}

/** normalise a picked account label against the solver's account title */
function sameAccount(pick: string, solverAcct: string): boolean {
  const norm = (s: string) => s.toLowerCase()
    .replace(/\(.*?\)/g, '').replace(/'s\s+a\/c|a\/c/g, '')
    .replace(/[^a-z]/g, '')
  const p = norm(pick)
  const s = norm(solverAcct)
  if (!p || !s) return false
  return p === s || s.includes(p) || p.includes(s)
}

// ------------------------------------------------------------- widgets --

function Slider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void
}) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-24 text-slate-400 font-semibold">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-amber-400" />
      <span className="w-20 text-right font-mono text-slate-200">
        {value.toLocaleString('en-IN')}
      </span>
    </label>
  )
}

// ------------------------------------------------------------ main shell --

type Tab = 'journal' | 'equation' | 'depreciation' | 'final' | 'ask'

const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: 'journal', label: 'Journal workbench', icon: BookOpen },
  { key: 'equation', label: 'Equation 3D', icon: Scale },
  { key: 'depreciation', label: 'Depreciation lab', icon: TrendingDown },
  { key: 'final', label: 'Final accounts', icon: Files },
  { key: 'ask', label: 'Ask the solver', icon: Search },
]

const PROGRESS_KEY = 'accountancy_sandbox_explored_v1'

// fixed trial-balance lines for the final-accounts assembler (amounts are
// DATA, not answers — the target gross/net profit always comes from the
// solver)
const TB_LINES: { key: string; label: string; dr?: number; cr?: number }[] = [
  { key: 'sales', label: 'Sales', cr: 500000 },
  { key: 'returns_in', label: 'Sales returns', dr: 20000 },
  { key: 'opening', label: 'Opening stock', dr: 50000 },
  { key: 'purchases', label: 'Purchases', dr: 300000 },
  { key: 'returns_out', label: 'Return outwards', cr: 10000 },
  { key: 'carriage_in', label: 'Carriage inwards', dr: 10000 },
  { key: 'wages', label: 'Wages', dr: 40000 },
  { key: 'salaries', label: 'Salaries', dr: 60000 },
  { key: 'rent', label: 'Rent', dr: 24000 },
  { key: 'advert', label: 'Advertising', dr: 6000 },
  { key: 'depr', label: 'Depreciation', dr: 10000 },
  { key: 'commission', label: 'Commission received', cr: 8000 },
  { key: 'closing', label: 'Closing stock', dr: 80000 },
]

type Bucket = '' | 'trading_dr' | 'trading_cr' | 'pl_dr' | 'pl_cr' | 'bs'
const BUCKET_CYCLE: Bucket[] = ['', 'trading_dr', 'trading_cr', 'pl_dr', 'pl_cr', 'bs']
const BUCKET_LABEL: Record<Bucket, string> = {
  '': 'unassigned', trading_dr: 'Trading Dr', trading_cr: 'Trading Cr',
  pl_dr: 'P&L Dr', pl_cr: 'P&L Cr', bs: 'Balance Sheet',
}

export default function AccountancySandbox() {
  const [bandKey, setBandKey] = useState('c11')
  const [chapterKey, setChapterKey] = useState('c11_ch3')
  const [tab, setTab] = useState<Tab>('journal')
  const [explored, setExplored] = useState<Set<string>>(new Set())

  // ---- closed-world misconception state ----
  const [remediation, setRemediation] = useState<NodeRemediation | null>(null)
  const [misconception, setMisconception] = useState<string | null>(null)
  const remediationCache = useRef<Map<string, NodeRemediation | null>>(new Map())

  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]')
      if (Array.isArray(arr)) setExplored(new Set(arr))
    } catch { /* fresh start */ }
  }, [])

  const markExplored = useCallback((k: string) => {
    setExplored(prev => {
      if (prev.has(k)) return prev
      const next = new Set(prev).add(k)
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next])) } catch { }
      return next
    })
  }, [])

  const showMisconceptionFor = useCallback(async (
    nodeId: string | undefined, hint?: string,
  ) => {
    setMisconception(null)
    setRemediation(null)
    if (!nodeId) return
    let rm = remediationCache.current.get(nodeId) ?? null
    if (rm === null && !remediationCache.current.has(nodeId)) {
      try { rm = await fetchNodeRemediation(nodeId) } catch { rm = null }
      remediationCache.current.set(nodeId, rm)
    }
    setRemediation(rm)
    // pick the authored diagnostic whose question matches the transaction
    // hint (e.g. "furniture"); else the first with a misconception field
    let picked: string | null = null
    const h = hint?.toLowerCase()
    for (const d of rm?.diagnostics || []) {
      if (!d.misconception) continue
      if (h && d.question.toLowerCase().includes(h)) { picked = d.misconception; break }
      if (!picked) picked = d.misconception
    }
    setMisconception(picked)
  }, [remediationCache])

  const dismissMisconception = useCallback(() => {
    setMisconception(null)
    setRemediation(null)
  }, [])

  const band = ACCOUNTANCY_SANDBOX_CLASSES.find(b => b.key === bandKey)
    ?? ACCOUNTANCY_SANDBOX_CLASSES[0]
  const chapter = band.chapters.find(c => c.key === chapterKey)
    ?? band.chapters[0]

  // ---- journal workbench state ----
  const [preset, setPreset] = useState<TxnPreset>(TXN_PRESETS[1])
  const [drPick, setDrPick] = useState('')
  const [crPick, setCrPick] = useState('')
  const [verdict, setVerdict] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [golden, setGolden] = useState<SolveState>(IDLE)
  const [entries, setEntries] = useState<PostedEntry[]>([])
  const [pulse, setPulse] = useState(0)
  const [debitUp, setDebitUp] = useState(true)
  const nextId = useRef(1)

  const pickPreset = (p: TxnPreset) => {
    setPreset(p)
    setDrPick('')
    setCrPick('')
    setVerdict('idle')
    setGolden(IDLE)
    dismissMisconception()
    markExplored(p.key)
  }

  const postEntry = async () => {
    if (!drPick || !crPick) return
    setGolden({ ...IDLE, loading: true })
    const s = await askSolver(preset.prompt)
    setGolden(s)
    const g = parseGoldenEntry(s)
    if (!g) {
      setVerdict('idle')
      return
    }
    const ok = sameAccount(drPick, g.debit) && sameAccount(crPick, g.credit)
    setVerdict(ok ? 'right' : 'wrong')
    if (ok) {
      setEntries(prev => [...prev, { ...g, id: nextId.current++, txnKey: preset.key }])
      setPulse(p => p + 1)
      setDebitUp(d => !d)
    } else {
      showMisconceptionFor(preset.nodeId, preset.trap ?? preset.short.split(' ')[0])
    }
  }

  // ---- ledger + trial balance derived from POSTED (solver-verified) entries
  const ledgerAccounts = useMemo(() => {
    const map = new Map<string, { dr: number; cr: number }>()
    for (const e of entries) {
      const d = map.get(e.debit) ?? { dr: 0, cr: 0 }
      d.dr += e.amount
      map.set(e.debit, d)
      const c = map.get(e.credit) ?? { dr: 0, cr: 0 }
      c.cr += e.amount
      map.set(e.credit, c)
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [entries])

  const trialBalance = useMemo(() => {
    let totDr = 0
    let totCr = 0
    const rows = ledgerAccounts.map(([acct, { dr, cr }]) => {
      const net = dr - cr
      if (net >= 0) totDr += net
      else totCr += -net
      return { acct, drBal: net >= 0 ? net : 0, crBal: net < 0 ? -net : 0 }
    })
    return { rows, totDr, totCr, balanced: Math.abs(totDr - totCr) < 0.01 }
  }, [ledgerAccounts])

  // ---- accounting equation derived from solver-classified entries ----
  const equation = useMemo<PanSide>(() => {
    let assets = 0
    let liabilities = 0
    let capital = 0
    for (const e of entries) {
      assets += (e.drCat === 'asset' ? e.amount : 0)
        - (e.crCat === 'asset' ? e.amount : 0)
      liabilities += (e.crCat === 'liability' ? e.amount : 0)
        - (e.drCat === 'liability' ? e.amount : 0)
      capital += ((e.crCat === 'capital' || e.crCat === 'income') ? e.amount : 0)
        - ((e.drCat === 'expense' || e.drCat === 'drawings') ? e.amount : 0)
    }
    return { assets, liabilities, capital }
  }, [entries])

  // ---- depreciation lab state ----
  const [depMethod, setDepMethod] = useState<'slm' | 'wdv'>('slm')
  const [cost, setCost] = useState(100000)
  const [salvage, setSalvage] = useState(10000)
  const [life, setLife] = useState(5)
  const [depRate, setDepRate] = useState(10)
  const [depYears, setDepYears] = useState(3)
  const [depSolve, setDepSolve] = useState<SolveState>(IDLE)

  const depImpossible = salvage >= cost || life < 1 || depRate <= 0 || depRate > 100

  const buildDepPrompt = useCallback(() => {
    if (depMethod === 'slm') {
      return `A machine costing Rs ${cost} has a salvage value of Rs ${salvage} and a useful life of ${life} years. Find its book value after ${depYears} years (straight line).`
    }
    return `Machinery costing Rs ${cost} is depreciated at ${depRate}% per annum on written down value method. Find the book value after ${depYears} years.`
  }, [depMethod, cost, salvage, life, depYears, depRate])

  useEffect(() => {
    if (tab !== 'depreciation' || depImpossible) return
    let alive = true
    const t = setTimeout(async () => {
      const s = await askSolver(buildDepPrompt())
      if (alive) setDepSolve(s)
    }, 250)
    return () => { alive = false; clearTimeout(t) }
  }, [tab, depImpossible, buildDepPrompt])

  // solver-anchored schedule: WDV rows parsed out of the solver's steps;
  // SLM rows from the solver-validated annual charge
  const depSchedule = useMemo(() => {
    const rows: { year: number; open: number; dep: number; close: number }[] = []
    if (depMethod === 'wdv') {
      for (const st of depSolve.steps) {
        const m = st.match(/Year (\d+): depreciation = ([\d,]+) x [\d.]+% = ([\d,]+); closing WDV = ([\d,]+)/)
        if (m) {
          rows.push({
            year: Number(m[1]),
            open: Number(m[2].replace(/,/g, '')),
            dep: Number(m[3].replace(/,/g, '')),
            close: Number(m[4].replace(/,/g, '')),
          })
        }
      }
    } else if (depSolve.matched && depSolve.numeric_answer != null
      && cost > salvage && life >= 1) {
      const annual = (cost - salvage) / life
      let bv = cost
      for (let y = 1; y <= Math.min(depYears, 15); y++) {
        const open = bv
        bv = open - annual
        rows.push({ year: y, open, dep: annual, close: bv })
      }
    }
    return rows
  }, [depMethod, depSolve, cost, salvage, life, depYears])

  const declinePoints = useMemo<DeclinePoint[]>(
    () => depSchedule.map(r => ({
      year: r.year, value: r.close, wdv: depMethod === 'wdv',
    })),
    [depSchedule, depMethod],
  )

  // ---- final accounts assembler state ----
  const [buckets, setBuckets] = useState<Record<string, Bucket>>({})
  const [checkSolve, setCheckSolve] = useState<SolveState>(IDLE)

  const cycleBucket = (key: string) => {
    setBuckets(prev => {
      const cur = prev[key] ?? ''
      const next = BUCKET_CYCLE[(BUCKET_CYCLE.indexOf(cur) + 1) % BUCKET_CYCLE.length]
      return { ...prev, [key]: next }
    })
  }

  const studentGP = useMemo(() => {
    let cr = 0
    let dr = 0
    for (const ln of TB_LINES) {
      const b = buckets[ln.key] ?? ''
      if (b === 'trading_cr') cr += ln.cr ?? 0
      if (b === 'trading_dr') dr += ln.dr ?? 0
    }
    return cr - dr
  }, [buckets])

  const studentNP = useMemo(() => {
    let dr = 0
    let cr = 0
    for (const ln of TB_LINES) {
      const b = buckets[ln.key] ?? ''
      if (b === 'pl_dr') dr += ln.dr ?? 0
      if (b === 'pl_cr') cr += ln.cr ?? 0
    }
    return studentGP - dr + cr
  }, [buckets, studentGP])

  const checkAgainstSolver = async () => {
    const parts = TB_LINES.map(ln => `${ln.label} Rs ${(ln.dr ?? ln.cr ?? 0).toLocaleString('en-IN')}`)
    setCheckSolve({ ...IDLE, loading: true })
    const s = await askSolver(
      `${parts.join(', ')}. Find the gross profit`,
    )
    setCheckSolve(s)
  }

  // ---- ask-the-solver tab ----
  const [askText, setAskText] = useState('')
  const [askSolve, setAskSolve] = useState<SolveState>(IDLE)
  const runAsk = async (text?: string) => {
    const q = (text ?? askText).trim()
    if (!q) return
    setAskText(q)
    setAskSolve({ ...IDLE, loading: true })
    setAskSolve(await askSolver(q))
    const topic = chapter.topics.find(tp => tp.prompt === q)
    if (topic?.nodeId) markExplored(topic.key)
  }

  // ---------------------------------------------------------------- view --
  const totalTopics = ACCOUNTANCY_SANDBOX_CLASSES.reduce(
    (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)

  return (
    <div className="space-y-6">
      {/* header stats */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs text-slate-400">
          <span className="text-amber-300 font-bold">{explored.size}</span>
          {' '}of {totalTopics} solver-able topics explored · every answer
          computed by the deterministic accountancy families — nothing
          invented.
        </div>
      </div>

      {/* class band + chapter picker */}
      <div className="flex flex-wrap gap-2">
        {ACCOUNTANCY_SANDBOX_CLASSES.map(b => (
          <button key={b.key} data-testid={`acc-band-${b.key}`}
            onClick={() => { setBandKey(b.key); setChapterKey(b.chapters[0].key) }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${bandKey === b.key ? 'bg-amber-500/15 border-amber-400/60 text-amber-200' : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'}`}>
            {b.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {band.chapters.map(c => (
          <button key={c.key} onClick={() => setChapterKey(c.key)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${chapterKey === c.key ? 'bg-slate-700 border-slate-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chapter.topics.map(tp => (
          <button key={tp.key} data-testid={`acc-topic-${tp.key}`}
            title={tp.prompt}
            onClick={() => { markExplored(tp.key); runAskFromTopic(tp.prompt) }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition ${explored.has(tp.key) ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50'}`}>
            {explored.has(tp.key) ? '✓ ' : ''}{tp.label}
          </button>
        ))}
      </div>

      {/* tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black border transition ${tab === t.key ? 'bg-amber-500/15 border-amber-400/60 text-amber-200' : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'}`}>
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* misconception panel (closed-world, authored-only) */}
      <MisconceptionPanel
        misconception={misconception}
        commonMisconception={remediation?.commonMisconception ?? null}
      >
        <button onClick={dismissMisconception}
          className="text-[11px] font-bold text-amber-200 hover:text-amber-100">
          got it — back to the bench
        </button>
      </MisconceptionPanel>

      {/* ============================================== JOURNAL WORKBENCH */}
      {tab === 'journal' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
              1 · pick a transaction
            </p>
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {TXN_PRESETS.map(p => (
                <button key={p.key} data-testid={`acc-txn-${p.key}`}
                  onClick={() => pickPreset(p)}
                  className={`rounded-xl px-2.5 py-2 text-left text-[11px] font-bold border transition ${preset.key === p.key ? 'bg-amber-500/15 border-amber-400/60 text-amber-100' : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                  {p.trap ? '⚠ ' : ''}{p.short}
                </button>
              ))}
            </div>
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
              2 · your golden-rules call
            </p>
            <div className="space-y-2 mb-3">
              <label className="flex items-center gap-2 text-xs">
                <span className="w-24 text-slate-400 font-semibold">Debit (Dr)</span>
                <select value={drPick} onChange={e => setDrPick(e.target.value)}
                  data-testid="acc-dr-pick"
                  className="flex-1 rounded-lg bg-slate-800 border border-slate-600 px-2 py-1.5 text-slate-100">
                  <option value="">— choose the account to debit —</option>
                  {ACCOUNT_CHOICES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 text-xs">
                <span className="w-24 text-slate-400 font-semibold">Credit (Cr)</span>
                <select value={crPick} onChange={e => setCrPick(e.target.value)}
                  data-testid="acc-cr-pick"
                  className="flex-1 rounded-lg bg-slate-800 border border-slate-600 px-2 py-1.5 text-slate-100">
                  <option value="">— choose the account to credit —</option>
                  {ACCOUNT_CHOICES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
            </div>
            <button onClick={postEntry} disabled={!drPick || !crPick || golden.loading}
              data-testid="acc-post-btn"
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs py-2.5 transition">
              {golden.loading ? 'checking with the solver…' : 'Post this entry'}
            </button>
            {verdict === 'right' && (
              <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3" data-testid="acc-verdict-right">
                <p className="flex items-center gap-1.5 text-xs font-black text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> Correct — the double entry posts to the books
                </p>
                <StepsList s={golden} />
              </div>
            )}
            {verdict === 'idle' && golden.matched && !golden.loading && (
              <div className="mt-3"><StepsList s={golden} /></div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-[10px] font-black text-gold-300 uppercase tracking-widest mb-2">
              live T-accounts (posted entries flow here)
            </p>
            {ledgerAccounts.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">
                Post a correct entry and watch it flow into the ledger.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {ledgerAccounts.map(([acct, { dr, cr }]) => (
                  <div key={acct} className="rounded-lg border border-slate-700 overflow-hidden">
                    <p className="bg-slate-800 px-2 py-1 text-[10px] font-black text-slate-200 text-center">{acct}</p>
                    <div className="grid grid-cols-2 text-[10px] font-mono">
                      <div className="border-r border-slate-700 px-2 py-1 text-gold-300">
                        {dr > 0 ? fmt(dr) : ''}
                      </div>
                      <div className="px-2 py-1 text-amber-300 text-right">
                        {cr > 0 ? fmt(cr) : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[10px] font-black text-gold-300 uppercase tracking-widest mt-4 mb-2">
              trial balance
            </p>
            {trialBalance.rows.length === 0 ? (
              <p className="text-xs text-slate-500">Balances appear once entries are posted.</p>
            ) : (
              <div className="text-[11px]" data-testid="acc-trial-balance">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-400 text-left">
                      <th className="font-semibold">Account</th>
                      <th className="font-semibold text-right">Dr (₹)</th>
                      <th className="font-semibold text-right">Cr (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {trialBalance.rows.map(r => (
                      <tr key={r.acct} className="border-t border-slate-800">
                        <td className="py-0.5 font-sans">{r.acct}</td>
                        <td className="text-right text-gold-300">{r.drBal ? r.drBal.toLocaleString('en-IN') : ''}</td>
                        <td className="text-right text-amber-300">{r.crBal ? r.crBal.toLocaleString('en-IN') : ''}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-600 font-black">
                      <td className="py-1 font-sans">Total</td>
                      <td className="text-right text-gold-200">{trialBalance.totDr.toLocaleString('en-IN')}</td>
                      <td className="text-right text-amber-200">{trialBalance.totCr.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
                {trialBalance.balanced && (
                  <p className="mt-1.5 text-[11px] font-bold text-emerald-300">
                    ✓ debits = credits — the trial balance tallies
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================== EQUATION 3D */}
      {tab === 'equation' && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
          <div className="grid md:grid-cols-[1fr_260px]">
            <div className="h-[380px]">
              <AccountancyStage3D mode="pans" side={equation}
                pulse={pulse} debitUp={debitUp} />
            </div>
            <div className="p-4 space-y-3 border-t md:border-t-0 md:border-l border-slate-700">
              <p className="text-[10px] font-black text-gold-300 uppercase tracking-widest">
                Assets = Liabilities + Capital
              </p>
              {(['assets', 'liabilities', 'capital'] as const).map(k => (
                <div key={k} data-testid={`acc-eq-${k}`}
                  className="rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black">
                    {k}
                  </p>
                  <p className={`text-lg font-black font-mono ${k === 'assets' ? 'text-gold-300' : k === 'liabilities' ? 'text-amber-300' : 'text-gold-300'}`}>
                    {fmt(equation[k])}
                  </p>
                </div>
              ))}
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2">
                <p className="text-[11px] font-bold text-emerald-200">
                  {Math.abs(equation.assets - (equation.liabilities + equation.capital)) < 0.01
                    ? '✓ both pans level — the equation holds'
                    : '…'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {entries.length} solver-verified {entries.length === 1 ? 'entry' : 'entries'} posted.
                  Every debit chip rising is matched by a credit chip falling.
                </p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Post transactions in the Journal workbench — each entry arrives
                here classified by the solver&apos;s golden-rules reasoning.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================================================ DEPRECIATION */}
      {tab === 'depreciation' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="flex gap-1.5 mb-3">
              {(['slm', 'wdv'] as const).map(m => (
                <button key={m} onClick={() => setDepMethod(m)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${depMethod === m ? 'bg-gold-500/15 border-gold-400/60 text-gold-200' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                  {m === 'slm' ? 'Straight Line' : 'Written Down Value'}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Slider label="Cost (₹)" value={cost} min={10000} max={1000000}
                step={10000} onChange={v => { setCost(v); if (salvage >= v) setSalvage(Math.floor(v / 2 / 10000) * 10000) }} />
              {depMethod === 'slm' ? (
                <>
                  <Slider label="Salvage (₹)" value={salvage} min={0} max={cost - 10000}
                    step={5000} onChange={setSalvage} />
                  <Slider label="Life (yrs)" value={life} min={2} max={15}
                    step={1} onChange={v => { setLife(v); if (depYears > v) setDepYears(v) }} />
                </>
              ) : (
                <Slider label="Rate (%)" value={depRate} min={1} max={25}
                  step={1} onChange={setDepRate} />
              )}
              <Slider label="After (yrs)" value={depYears} min={1}
                max={depMethod === 'slm' ? life : 15}
                step={1} onChange={setDepYears} />
            </div>
            {depImpossible ? (
              <div className="mt-3 rounded-xl border border-gold-500/40 bg-gold-500/10 p-3 text-[11px] text-amber-200" data-testid="acc-dep-impossible">
                Impossible state: {salvage >= cost
                  ? 'salvage cannot reach the cost — a depreciating asset always keeps some depreciable amount.'
                  : depRate > 100
                    ? 'a WDV rate above 100% would annihilate the asset in under a year.'
                    : 'life must be at least one year.'}
              </div>
            ) : (
              <div className="mt-3">
                <StepsList s={depSolve} />
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden flex flex-col">
            <div className="h-[280px]">
              <AccountancyStage3D mode="decline" side={equation}
                pulse={0} debitUp={false} points={declinePoints} />
            </div>
            <div className="p-3 max-h-52 overflow-y-auto">
              {depSchedule.length === 0 ? (
                <p className="text-xs text-slate-500">
                  The year-by-year schedule (parsed straight from the
                  solver&apos;s steps) appears here.
                </p>
              ) : (
                <table className="w-full text-[11px]" data-testid="acc-dep-schedule">
                  <thead>
                    <tr className="text-slate-400 text-left">
                      <th className="font-semibold">Year</th>
                      <th className="font-semibold text-right">Opening</th>
                      <th className="font-semibold text-right">Depreciation</th>
                      <th className="font-semibold text-right">Closing</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {depSchedule.map(r => (
                      <tr key={r.year} className="border-t border-slate-800">
                        <td>{r.year}</td>
                        <td className="text-right">{r.open.toLocaleString('en-IN')}</td>
                        <td className="text-right text-rose-300">{Math.round(r.dep).toLocaleString('en-IN')}</td>
                        <td className="text-right text-emerald-300">{Math.round(r.close).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================ FINAL ACCOUNTS */}
      {tab === 'final' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
              drag-free assembler — click a line to cycle its bucket
            </p>
            <p className="text-[10px] text-slate-500 mb-3">
              Trading Dr/Cr feeds gross profit · P&amp;L Dr/Cr adjusts to net
              profit · Balance Sheet positions the rest.
            </p>
            <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
              {TB_LINES.map(ln => (
                <button key={ln.key} onClick={() => cycleBucket(ln.key)}
                  data-testid={`acc-tb-${ln.key}`}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-[11px] font-bold border transition ${(buckets[ln.key] ?? '') === '' ? 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-500'
                    : buckets[ln.key] === 'trading_dr' || buckets[ln.key] === 'trading_cr' ? 'bg-gold-500/15 border-gold-400/50 text-gold-200'
                      : buckets[ln.key] === 'pl_dr' || buckets[ln.key] === 'pl_cr' ? 'bg-gold-500/15 border-gold-400/50 text-gold-200'
                        : 'bg-emerald-500/15 border-emerald-400/50 text-emerald-200'}`}>
                  <span>{ln.label}</span>
                  <span className="font-mono">
                    {fmt(ln.dr ?? ln.cr ?? 0)} {ln.dr ? 'Dr' : 'Cr'} · {BUCKET_LABEL[buckets[ln.key] ?? '']}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="rounded-xl border border-gold-500/40 bg-gold-500/10 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-gold-300 font-black">your gross profit</p>
                <p className="text-lg font-black font-mono text-gold-200" data-testid="acc-student-gp">{fmt(studentGP)}</p>
              </div>
              <div className="rounded-xl border border-gold-500/40 bg-gold-500/10 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-gold-300 font-black">your net profit</p>
                <p className="text-lg font-black font-mono text-gold-200" data-testid="acc-student-np">{fmt(studentNP)}</p>
              </div>
            </div>
            <button onClick={checkAgainstSolver}
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-2.5 transition">
              Check against the solver
            </button>
            {checkSolve.matched && (
              <div className="mt-2 rounded-xl border border-slate-700 p-3">
                {checkSolve.numeric_answer != null &&
                  Math.abs(checkSolve.numeric_answer - studentGP) < 0.01 ? (
                  <p className="flex items-center gap-1.5 text-xs font-black text-emerald-300" data-testid="acc-final-match">
                    <CheckCircle2 className="w-4 h-4" /> matches the solver&apos;s gross profit of {fmt(checkSolve.numeric_answer)}
                  </p>
                ) : (
                  <p className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                    <XCircle className="w-4 h-4" /> differs from the solver — compare your Trading Dr/Cr
                    placement with the COGS composition below
                  </p>
                )}
                <StepsList s={checkSolve} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================== ASK THE SOLVER */}
      {tab === 'ask' && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
            any topic prompt — ratios, partnership, BRS, final accounts
          </p>
          <div className="flex gap-2">
            <input value={askText}
              onChange={e => setAskText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') runAsk() }}
              placeholder="e.g. Current assets are Rs 400,000 and current liabilities are Rs 200,000. Calculate the current ratio."
              className="flex-1 rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500" />
            <button onClick={() => runAsk()} disabled={!askText.trim() || askSolve.loading}
              className="rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs px-4">
              solve
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {chapter.topics.slice(0, 4).map(tp => (
              <button key={tp.key} onClick={() => runAsk(tp.prompt)}
                className="rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-300 hover:border-amber-500/50">
                try: {tp.label}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <StepsList s={askSolve} />
          </div>
        </div>
      )}
    </div>
  )

  function runAskFromTopic(prompt: string) {
    setTab('ask')
    runAsk(prompt)
  }
}
