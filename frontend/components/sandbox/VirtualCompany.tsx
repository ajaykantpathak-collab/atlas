'use client'

/**
 * VirtualCompany — the E7 Document & Ledger flagship (HUMANITIES_COMMERCE_PLAN
 * §C): ONE continuous firm the student runs end to end.
 *
 *   setup → transactions → JOURNAL → LEDGER → TRIAL BALANCE → FINAL ACCOUNTS
 *                                                     + RATIOS
 *
 * Everything is deterministic and closed-world:
 *  - The 14 authored transactions are grounded in class-11 accountancy
 *    worked examples (c11_acc_cbse_03_xxx journal nodes — same transaction
 *    families the deterministic solver covers in
 *    deploy/backend/its/solver/accountancy_families.py, JOURNAL_ENTRY).
 *  - Journal checking reimplements the JOURNAL_ENTRY family's golden rules:
 *    personal (debit the receiver / credit the giver), real (debit what
 *    comes in / credit what goes out), nominal (debit expenses / credit
 *    incomes) — c11_acc_cbse_03_006 (traditional rules) and 03_004/03_005
 *    (modern rules for assets/liabilities/capital and expenses/revenues).
 *    A wrong entry names WHICH rule broke, per leg.
 *  - Ledger errors are seeded the way c11_acc_cbse_06_003 classifies
 *    one-sided errors (posting to the wrong side; transposition of digits).
 *    The student must spot and fix them; the trial balance then tallies.
 *  - The trial balance is built on the balances method (c11_acc_cbse_06_002);
 *    when it disagrees, the gap parks on the shorter side as Suspense A/c —
 *    the TRIAL_BALANCE_DIFF family's logic — and the hunt goes back to the
 *    ledger. (With both seeds loose the gap is ₹1,96,000: Dr 4,19,000 vs
 *    Cr 2,23,000 at the default capital.)
 *  - Final accounts + ratios follow the GROSS_PROFIT / NET_PROFIT /
 *    CURRENT_RATIO family formulas; the student computes all three and the
 *    check shows the family's [Method]/[Given]/[Check] beats.
 *  - Every completed stage renders the family's 5-beat verification
 *    ([Method] → [Given] → computation → [Check] → [Interpretation]), the
 *    step contract accountancy_families.py enforces on every family.
 *
 * The starting capital entered at setup is event T1's amount, so all ledger /
 * TB / balance-sheet totals scale with it; GP, NP and the current ratio do
 * not (they depend on the goods economy only). Minimum ₹1,65,000 keeps every
 * interim cash balance non-negative at the T4 trough (cash dips to
 * capital − 1,65,000 before the first sale lands).
 *
 * Teacher tooling: a Cheat view toggle (golden legs, seeded error locations,
 * target figures), Reset, and progress persisted to localStorage.
 *
 * Golden-black brand only: slate + amber/gold, emerald for verified.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2, ChevronRight, Eye, EyeOff, RotateCcw, Search, XCircle,
} from 'lucide-react'

// ============================================================ golden rules ==
//
// Category → golden-rule text per side. Mirrors _RULE_LINE +
// journal_entry()'s reason strings in accountancy_families.py; the account
// theory is c11_acc_cbse_03_006 (personal/real/nominal) and 03_004/03_005
// (modern rules).

type Cat = 'asset' | 'expense' | 'income' | 'capital' | 'drawings' | 'creditor' | 'debtor'

const RULE: Record<Cat, { dr: string; cr: string }> = {
  asset: {
    dr: 'an asset coming IN is debited (real account: debit what comes in)',
    cr: 'an asset going OUT is credited (real account: credit what goes out)',
  },
  expense: {
    dr: 'an expense/loss is debited (nominal account: debit expenses and losses)',
    cr: 'an expense is never credited on payment — the nominal rule debits expenses and losses',
  },
  income: {
    dr: 'an income is never debited on receipt — the nominal rule credits incomes and gains',
    cr: 'an income/gain is credited (nominal account: credit incomes and gains)',
  },
  capital: {
    dr: 'capital is not a debtor — the owner\'s claim sits on the credit side',
    cr: 'the owner\'s claim on the firm is credited (personal account: credit the giver)',
  },
  drawings: {
    dr: 'cash/goods taken by the owner are debited to Drawings (debit the owner\'s account when goods/cash are taken out)',
    cr: 'Drawings is not a giver — the account is debited when the owner takes value out',
  },
  creditor: {
    dr: 'when the creditor RECEIVES the payment he is the receiver → debit (personal rule)',
    cr: 'the creditor GIVES the goods on credit → credit the giver (personal rule)',
  },
  debtor: {
    dr: 'the debtor RECEIVES the goods on credit → debit the receiver (personal rule)',
    cr: 'when the debtor GIVES the payment he is the giver → credit (personal rule)',
  },
}

interface AcctDef { id: string; label: string; cat: Cat }

// The firm's chart of accounts (labels only — the golden pair per event
// lives on the event, never in the picker).
const ACCOUNTS: AcctDef[] = [
  { id: 'cash', label: 'Cash', cat: 'asset' },
  { id: 'bank', label: 'Bank', cat: 'asset' },
  { id: 'furniture', label: 'Furniture', cat: 'asset' },
  { id: 'capital', label: 'Capital', cat: 'capital' },
  { id: 'drawings', label: 'Drawings', cat: 'drawings' },
  { id: 'purchases', label: 'Purchases', cat: 'expense' },
  { id: 'sales', label: 'Sales', cat: 'income' },
  { id: 'rent', label: 'Rent', cat: 'expense' },
  { id: 'wages', label: 'Wages', cat: 'expense' },
  { id: 'salaries', label: 'Salaries', cat: 'expense' },
  { id: 'commission', label: 'Commission Received', cat: 'income' },
  { id: 'mohan', label: 'Mohan (creditor)', cat: 'creditor' },
  { id: 'ramesh', label: 'Ramesh (debtor)', cat: 'debtor' },
]
const acct = (id: string): AcctDef => ACCOUNTS.find(a => a.id === id)!

// ============================================================== the firm ==
//
// 14 authored events. Grounding per event (all class-11 accountancy corpus):
//   T1  commenced business with cash      — c11_acc_cbse_03_003 worked ex.
//   T2  cash deposited into bank          — c11_acc_cbse_03_004 (bank/cash)
//   T3  bought furniture for cash         — c11_acc_cbse_03_004 (asset trap:
//         furniture is kept for use, NOT Purchases)
//   T4  bought goods for cash             — c11_acc_cbse_03_007 (Purchases)
//   T5  bought goods on credit from Mohan — c11_acc_cbse_03_006 (creditor =
//         giver → credit; the node's misconception: personal/real mix-ups)
//   T6  sold goods for cash               — c11_acc_cbse_03_005 (Sales income)
//   T7  sold goods on credit to Ramesh    — c11_acc_cbse_03_006 (debtor =
//         receiver → debit)
//   T8  paid rent by cheque               — c11_acc_cbse_03_005 (expense,
//         bank credit)
//   T9  paid wages in cash                — c11_acc_cbse_03_005 (wages are a
//         DIRECT production expense; kept separate from salaries)
//   T10 withdrew cash for personal use    — c11_acc_cbse_03_004 (Drawings —
//         the node's misconception: Drawings is a PERSONAL account, not a
//         nominal expense)
//   T11 paid Mohan ₹30,000 (part)         — personal rule: receiver debited
//   T12 Ramesh paid ₹25,000 (part)        — personal rule: giver credited;
//         partial settlement keeps the balance in the debtor account
//   T13 received commission               — c11_acc_cbse_03_005 (income)
//   T14 paid salaries                     — c11_acc_cbse_03_005 (expense)
//
// The golden legs match what the deterministic solver's journal_entry()
// classifies for these same sentences (JOURNAL_ENTRY family,
// deploy/backend/its/solver/accountancy_families.py). T1's amount is the
// setup capital — see the `events` memo.

interface FirmEvent {
  id: string
  date: string
  text: string
  amount: number
  dr: string
  cr: string
  /** Why each golden leg is right (the JOURNAL_ENTRY family's reasons). */
  whyDr: string
  whyCr: string
  /** Narration for the journal book (corpus convention: "Being …"). */
  narration: string
  /** Targeted teaching when THIS event's classic trap is picked. */
  trap?: Record<string, string>
}

const EVENT_TEMPLATE: FirmEvent[] = [
  {
    id: 't1', date: 'Apr 1', text: 'Commenced business with cash', amount: 0,
    dr: 'cash', cr: 'capital',
    whyDr: 'Cash comes into the business → debit (real account: debit what comes in)',
    whyCr: 'Capital is the owner\'s claim → credit (personal account: credit the giver)',
    narration: 'Being capital introduced in cash',
  },
  {
    id: 't2', date: 'Apr 2', text: 'Deposited ₹1,00,000 into the firm\'s bank account',
    amount: 100000, dr: 'bank', cr: 'cash',
    whyDr: 'Bank balance (an asset) increases → debit (real account: debit what comes in)',
    whyCr: 'Cash goes out of the cash box → credit (real account: credit what goes out)',
    narration: 'Being cash deposited into bank',
    trap: { capital: 'The cash did not leave the FIRM — it moved between two of the firm\'s own assets. No owner\'s claim changed, so Capital is untouched.' },
  },
  {
    id: 't3', date: 'Apr 4', text: 'Bought furniture for office use, for cash ₹15,000',
    amount: 15000, dr: 'furniture', cr: 'cash',
    whyDr: 'Furniture (an asset kept for use, not for resale) comes in → debit (real account)',
    whyCr: 'Cash goes out → credit (real account: credit what goes out)',
    narration: 'Being furniture purchased for cash',
    trap: { purchases: 'The classic trap: goods bought for RESALE go to Purchases (nominal). Furniture is kept and USED — it is a fixed asset, so the real rule debits Furniture, not Purchases (c11_acc_cbse_03_004).' },
  },
  {
    id: 't4', date: 'Apr 6', text: 'Bought goods (for resale) for cash ₹50,000',
    amount: 50000, dr: 'purchases', cr: 'cash',
    whyDr: 'Purchases (goods bought for resale, an expense in the trading sense) → debit (nominal account: debit expenses)',
    whyCr: 'Cash goes out → credit (real account: credit what goes out)',
    narration: 'Being goods purchased for cash',
  },
  {
    id: 't5', date: 'Apr 9', text: 'Bought goods on credit from Mohan for ₹50,000',
    amount: 50000, dr: 'purchases', cr: 'mohan',
    whyDr: 'Purchases (goods for resale) → debit (nominal account: debit expenses)',
    whyCr: 'Mohan is the GIVER of the goods (a creditor) → credit the giver (personal rule)',
    narration: 'Being goods purchased on credit from Mohan',
    trap: { cash: 'No cash moved — the payment is still owed. A credit purchase creates a liability to Mohan, not a cash outflow.' },
  },
  {
    id: 't6', date: 'Apr 12', text: 'Sold goods for cash ₹80,000',
    amount: 80000, dr: 'cash', cr: 'sales',
    whyDr: 'Cash comes in → debit (real account: debit what comes in)',
    whyCr: 'Sales (goods sold, an income) → credit (nominal account: credit incomes and gains)',
    narration: 'Being goods sold for cash',
  },
  {
    id: 't7', date: 'Apr 15', text: 'Sold goods on credit to Ramesh for ₹45,000',
    amount: 45000, dr: 'ramesh', cr: 'sales',
    whyDr: 'Ramesh is the RECEIVER of the goods (a debtor) → debit the receiver (personal rule)',
    whyCr: 'Sales (goods sold, an income) → credit (nominal account: credit incomes and gains)',
    narration: 'Being goods sold on credit to Ramesh',
  },
  {
    id: 't8', date: 'Apr 18', text: 'Paid office rent ₹12,000 by cheque',
    amount: 12000, dr: 'rent', cr: 'bank',
    whyDr: 'Rent (an expense) → debit (nominal account: debit expenses and losses)',
    whyCr: 'Bank balance goes down → credit (real account: credit what goes out)',
    narration: 'Being office rent paid by cheque',
  },
  {
    id: 't9', date: 'Apr 21', text: 'Paid factory wages ₹8,000 in cash',
    amount: 8000, dr: 'wages', cr: 'cash',
    whyDr: 'Wages (a direct expense of production) → debit (nominal account: debit expenses)',
    whyCr: 'Cash goes out → credit (real account: credit what goes out)',
    narration: 'Being wages paid in cash',
  },
  {
    id: 't10', date: 'Apr 24', text: 'Withdrew cash ₹10,000 for personal use',
    amount: 10000, dr: 'drawings', cr: 'cash',
    whyDr: 'Goods/cash taken by the OWNER → debit Drawings (debit the owner\'s personal account when taken out)',
    whyCr: 'Cash goes out → credit (real account: credit what goes out)',
    narration: 'Being cash withdrawn for personal use',
    trap: { rent: 'Personal withdrawals are NOT a business expense — no service was bought by the firm. Drawings (a personal account) is debited, reducing the owner\'s claim (c11_acc_cbse_03_004).' },
  },
  {
    id: 't11', date: 'Apr 27', text: 'Paid Mohan ₹30,000 in cash (part payment)',
    amount: 30000, dr: 'mohan', cr: 'cash',
    whyDr: 'Mohan now RECEIVES the cash → debit the receiver (personal rule)',
    whyCr: 'Cash goes out → credit (real account: credit what goes out)',
    narration: 'Being cash paid to Mohan',
  },
  {
    id: 't12', date: 'Apr 29', text: 'Ramesh paid ₹25,000 in cash — part payment of his account',
    amount: 25000, dr: 'cash', cr: 'ramesh',
    whyDr: 'Cash comes in → debit (real account: debit what comes in)',
    whyCr: 'Ramesh GIVES the payment → credit the giver (personal rule); the unpaid balance stays in his account',
    narration: 'Being part cash received from Ramesh',
  },
  {
    id: 't13', date: 'May 2', text: 'Received commission ₹3,000 in cash',
    amount: 3000, dr: 'cash', cr: 'commission',
    whyDr: 'Cash comes in → debit (real account: debit what comes in)',
    whyCr: 'Commission is an income → credit (nominal account: credit incomes and gains)',
    narration: 'Being commission received in cash',
  },
  {
    id: 't14', date: 'May 5', text: 'Paid office salaries ₹15,000 in cash',
    amount: 15000, dr: 'salaries', cr: 'cash',
    whyDr: 'Salaries (an expense) → debit (nominal account: debit expenses and losses)',
    whyCr: 'Cash goes out → credit (real account: credit what goes out)',
    narration: 'Being salaries paid in cash',
    trap: { wages: 'Wages (direct, factory) and salaries (office) are separate heads — this event pays SALARIES. Keeping them apart is what lets the final accounts split direct vs indirect expenses.' },
  },
]

/** Lowest capital keeping every interim cash balance ≥ 0 (T4 trough:
 *  capital − 1,00,000 deposit − 15,000 furniture − 50,000 goods). */
const MIN_CAPITAL = 165000

// ========================================================= seeded errors ==
//
// Two one-sided ledger errors exactly as c11_acc_cbse_06_003 classifies them
// (errors DISCLOSED by the trial balance: posting to the wrong side, and
// transposition of digits while posting). Until both are fixed the trial
// balance disagrees and the gap parks as Suspense A/c on the credit side —
// the TRIAL_BALANCE_DIFF logic.

interface LedgerError {
  id: string
  /** The event whose posting line is corrupted. */
  eventId: string
  account: string
  kind: 'wrong-side' | 'transposition'
  /** Wrong side shown in the buggy ledger (wrong-side kind). */
  badSide: 'dr' | 'cr'
  /** Wrong amount shown (transposition kind). */
  badAmount?: number
  fixNote: string
}

const SEED_ERRORS: LedgerError[] = [
  {
    id: 'e1', eventId: 't6', account: 'sales', kind: 'wrong-side',
    badSide: 'dr',
    fixNote: 'The Apr 12 cash sale was posted on the DEBIT side of Sales. Sales is an income — the nominal rule credits incomes and gains. Flip it to the credit side.',
  },
  {
    id: 'e2', eventId: 't14', account: 'salaries', kind: 'transposition',
    badSide: 'dr', badAmount: 51000,
    fixNote: 'Salaries was posted as ₹51,000 — the digits of ₹15,000 were transposed while posting. Post the journal amount, ₹15,000.',
  },
]

// ========================================================== stage config ==

type Stage = 'setup' | 'journal' | 'ledger' | 'trial' | 'final'

const STAGE_ORDER: Stage[] = ['setup', 'journal', 'ledger', 'trial', 'final']

const STAGE_LABEL: Record<Stage, string> = {
  setup: '1 · Incorporate',
  journal: '2 · Journal',
  ledger: '3 · Ledger',
  trial: '4 · Trial Balance',
  final: '5 · Final Accounts & Ratios',
}

const PROGRESS_KEY = 'virtual_company_state_v1'

interface SavedState {
  firmName: string
  capital: number
  stage: Stage
  /** eventId → posted golden (only correct entries persist). */
  posted: string[]
  /** corrected seeded-error ids */
  fixes: string[]
  ratioInputs: { gp: string; np: string; cr: string }
}

function loadSaved(): SavedState | null {
  try {
    const d = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? 'null')
    if (!d || typeof d !== 'object') return null
    return d as SavedState
  } catch { return null }
}

// ============================================================ formatting ==

function inr(v: number): string {
  if (!Number.isFinite(v)) return '—'
  return '₹' + Math.round(v).toLocaleString('en-IN')
}

/** The ledger-document amount: bare digits with Indian grouping. */
function num(v: number): string {
  return Math.round(v).toLocaleString('en-IN')
}

// ====================================================== 5-beat contract ==

function FiveBeats({ beats }: { beats: { m: string; g: string; w: string[]; c: string; i: string } }) {
  return (
    <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/80 p-3" data-testid="vc-five-beats">
      <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
        5-beat verification (accountancy family step contract)
      </p>
      <p className="text-[11px] text-slate-300 leading-relaxed">
        <span className="font-black text-amber-200">[Method]</span> {beats.m}
      </p>
      <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
        <span className="font-black text-amber-200">[Given]</span> {beats.g}
      </p>
      <ul className="mt-1 space-y-0.5">
        {beats.w.map((w, i) => (
          <li key={i} className="text-[11px] text-slate-300 leading-relaxed flex gap-2">
            <span className="text-slate-500 font-mono flex-shrink-0">{i + 1}.</span>
            <span>{w}</span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
        <span className="font-black text-emerald-300">[Check]</span> {beats.c}
      </p>
      <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
        <span className="font-black text-amber-200">[Interpretation]</span> {beats.i}
      </p>
    </div>
  )
}

// ============================================================== helpers ==

interface PostedLedgerLine {
  lineId: string
  account: string
  side: 'dr' | 'cr'
  amount: number
  eventId: string
}

/** Golden ledger: post every journal entry to its two accounts. */
function goldenLedger(events: FirmEvent[], posted: string[]): PostedLedgerLine[] {
  const lines: PostedLedgerLine[] = []
  for (const evId of posted) {
    const ev = events.find(e => e.id === evId)
    if (!ev) continue
    lines.push({
      lineId: `${ev.id}-dr`, account: ev.dr, side: 'dr',
      amount: ev.amount, eventId: ev.id,
    })
    lines.push({
      lineId: `${ev.id}-cr`, account: ev.cr, side: 'cr',
      amount: ev.amount, eventId: ev.id,
    })
  }
  return lines
}

/** Apply the seeded errors to a golden ledger (until fixed). */
function applyErrors(lines: PostedLedgerLine[], fixes: string[]): PostedLedgerLine[] {
  return lines.map(l => {
    for (const err of SEED_ERRORS) {
      if (fixes.includes(err.id)) continue
      if (err.eventId === l.eventId && err.account === l.account) {
        if (err.kind === 'wrong-side') return { ...l, side: err.badSide }
        if (err.kind === 'transposition') {
          return { ...l, amount: err.badAmount ?? l.amount }
        }
      }
    }
    return l
  })
}

interface AcctView {
  id: string
  label: string
  dr: PostedLedgerLine[]
  cr: PostedLedgerLine[]
  bal: { side: 'dr' | 'cr'; amount: number } | null
}

function buildAccounts(lines: PostedLedgerLine[]): AcctView[] {
  const views: AcctView[] = ACCOUNTS
    .filter(a => lines.some(l => l.account === a.id))
    .map(a => ({ id: a.id, label: a.label, dr: [], cr: [], bal: null }))
  for (const l of lines) {
    const v = views.find(x => x.id === l.account)
    if (!v) continue
    ;(l.side === 'dr' ? v.dr : v.cr).push(l)
  }
  for (const v of views) {
    const dr = v.dr.reduce((s, l) => s + l.amount, 0)
    const cr = v.cr.reduce((s, l) => s + l.amount, 0)
    if (dr === 0 && cr === 0) { v.bal = null; continue }
    v.bal = dr >= cr ? { side: 'dr', amount: dr - cr } : { side: 'cr', amount: cr - dr }
  }
  return views.sort((a, b) => a.label.localeCompare(b.label))
}

// ============================================================== the UI ==

export default function VirtualCompany() {
  const saved = useMemo(loadSaved, [])
  const [firmName, setFirmName] = useState(saved?.firmName ?? '')
  const [capital, setCapital] = useState(saved?.capital ?? 200000)
  const [stage, setStage] = useState<Stage>(saved?.stage ?? 'setup')
  const [posted, setPosted] = useState<string[]>(saved?.posted ?? [])
  const [fixes, setFixes] = useState<string[]>(saved?.fixes ?? [])
  const [cheat, setCheat] = useState(false)

  // effective event list: T1's amount IS the setup capital
  const events = useMemo<FirmEvent[]>(
    () => EVENT_TEMPLATE.map(e => (e.id === 't1' ? { ...e, amount: capital } : e)),
    [capital])
  const eventOf = useCallback(
    (id: string) => events.find(e => e.id === id)!, [events])

  // journal workbench state
  const [drPick, setDrPick] = useState('')
  const [crPick, setCrPick] = useState('')
  const [amtText, setAmtText] = useState('')
  const [verdict, setVerdict] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [diagnosis, setDiagnosis] = useState<string>('')

  // ledger hunt state
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const [flagNote, setFlagNote] = useState<string>('')
  const [fixDraft, setFixDraft] = useState<Record<string, string>>({})

  // final-accounts state
  const [ratioInputs, setRatioInputs] = useState(
    saved?.ratioInputs ?? { gp: '', np: '', cr: '' })
  const [ratioCheck, setRatioCheck] = useState<'idle' | 'pass' | 'fail'>('idle')

  // ------------------------------------------------------ persistence --
  useEffect(() => {
    const s: SavedState = { firmName, capital, stage, posted, fixes, ratioInputs }
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(s)) } catch { /* private mode */ }
  }, [firmName, capital, stage, posted, fixes, ratioInputs])

  const resetAll = () => {
    try { localStorage.removeItem(PROGRESS_KEY) } catch { /* ignore */ }
    setFirmName(''); setCapital(200000); setStage('setup')
    setPosted([]); setFixes([]); setCheat(false)
    setDrPick(''); setCrPick(''); setAmtText('')
    setVerdict('idle'); setDiagnosis('')
    setFlags({}); setFlagNote(''); setFixDraft({})
    setRatioInputs({ gp: '', np: '', cr: '' }); setRatioCheck('idle')
  }

  // ---------------------------------------------------- journal logic --
  const currentEvent = events.find(e => !posted.includes(e.id)) ?? null
  const allPosted = posted.length === events.length

  const diagnose = (ev: FirmEvent): string => {
    const parts: string[] = []
    const gDr = acct(ev.dr)
    const gCr = acct(ev.cr)
    const pDr = drPick ? acct(drPick) : null
    const pCr = crPick ? acct(crPick) : null
    const swapped = !!pDr && !!pCr && drPick === ev.cr && crPick === ev.dr
    if (swapped) {
      parts.push('The two legs are SWAPPED — the account that should sit on the debit side is sitting on the credit side, and vice versa.')
    }
    if (drPick !== ev.dr) {
      parts.push(`DEBIT side: you chose ${pDr?.label}. The books debit ${gDr.label} — ${ev.whyDr.charAt(0).toLowerCase()}${ev.whyDr.slice(1)}.`)
      if (pDr) {
        const trap = ev.trap?.[pDr.id]
        if (trap) parts.push(trap)
        else parts.push(`Rule check: ${pDr.label} — ${RULE[pDr.cat].dr}.`)
      }
    }
    if (crPick !== ev.cr) {
      parts.push(`CREDIT side: you chose ${pCr?.label}. The books credit ${gCr.label} — ${ev.whyCr.charAt(0).toLowerCase()}${ev.whyCr.slice(1)}.`)
      if (pCr) {
        const trap = ev.trap?.[pCr.id]
        if (trap) parts.push(trap)
        else parts.push(`Rule check: ${pCr.label} — ${RULE[pCr.cat].cr}.`)
      }
    }
    return parts.join(' ')
  }

  const postEntry = () => {
    if (!currentEvent || !drPick || !crPick || !amtText.trim()) return
    const ev = currentEvent
    const amt = Number(amtText.replace(/,/g, ''))
    if (drPick === ev.dr && crPick === ev.cr && amt === ev.amount) {
      setVerdict('right')
      setDiagnosis('')
      setPosted(prev => [...prev, ev.id])
      setDrPick(''); setCrPick(''); setAmtText('')
    } else if (drPick === ev.dr && crPick === ev.cr && amt !== ev.amount) {
      setVerdict('wrong')
      setDiagnosis(
        `Both accounts are right but Dr ${inr(amt)} ≠ Cr ${inr(ev.amount)} — ` +
        `the double entry must balance at the transaction's value. Every golden ` +
        `entry posts EQUAL debits and credits (JOURNAL_ENTRY family: Dr = Cr).`)
    } else {
      setVerdict('wrong')
      setDiagnosis(diagnose(ev))
    }
  }

  const journalDrTotal = posted.reduce((s, id) => s + eventOf(id).amount, 0)

  // ----------------------------------------------------- ledger logic --
  const ledgerLines = useMemo(
    () => applyErrors(goldenLedger(events, posted), fixes),
    [events, posted, fixes])
  const accounts = useMemo(() => buildAccounts(ledgerLines), [ledgerLines])

  const bugLines = useMemo(() => {
    const golden = new Map(goldenLedger(events, posted).map(l => [l.lineId, l]))
    return ledgerLines.filter(l => {
      const g = golden.get(l.lineId)
      return !!g && (g.side !== l.side || g.amount !== l.amount)
    })
  }, [ledgerLines, events, posted])

  const toggleFlag = (lineId: string) => {
    const next = { ...flags, [lineId]: !flags[lineId] }
    setFlags(next)
    const isBuggy = bugLines.some(l => l.lineId === lineId)
    if (next[lineId] && !isBuggy) {
      // deterministic cross-check: a correct line matches its journal posting
      const g = goldenLedger(events, posted).find(l => l.lineId === lineId)
      setFlagNote(
        `That line matches its journal posting exactly (the journal said ` +
        `${g ? (g.side === 'dr' ? 'Dr ' : 'Cr ') : ''}${inr(g?.amount ?? 0)}). ` +
        `One-sided errors show only where the ledger DISAGREES with the ` +
        `journal — cross-check each posting, don't guess by count.`)
    } else {
      setFlagNote('')
    }
  }

  const bothFlagged = bugLines.length === 2 && bugLines.every(l => flags[l.lineId])

  const applyFix = (err: LedgerError) => {
    setFixes(prev => [...prev, err.id])
    setFixDraft(prev => { const n = { ...prev }; delete n[err.id]; return n })
    setFlagNote('')
  }

  const ledgerDone = SEED_ERRORS.every(e => fixes.includes(e.id))

  // ------------------------------------------------ trial balance logic --
  const trialBalance = useMemo(() => {
    let totDr = 0
    let totCr = 0
    const rows = accounts
      .filter(a => a.bal)
      .map(a => {
        const amt = a.bal!.amount
        if (a.bal!.side === 'dr') totDr += amt
        else totCr += amt
        return { acct: a.label, side: a.bal!.side, amount: amt }
      })
    const diff = totDr - totCr
    return { rows, totDr, totCr, diff, balanced: Math.abs(diff) < 0.01 }
  }, [accounts])

  // ------------------------------------------------- final accounts logic --
  // Golden figures at default capital (hand-verified):
  //   GP 45,000 · NP 13,000 · BS 2,23,000 both sides · CR 10.4 : 1
  const fin = useMemo(() => {
    const net = (id: string): number => {
      const a = accounts.find(x => x.id === id)
      if (!a?.bal) return 0
      return a.bal.side === 'dr' ? a.bal.amount : -a.bal.amount
    }
    const sales = -net('sales')          // credit balance
    const purchases = net('purchases')   // debit balance
    const closingStock = 20000           // authored year-end count (₹20,000 at cost)
    const cogs = purchases - closingStock
    const gp = sales - cogs
    const indirectDr = net('rent') + net('wages') + net('salaries')
    const commission = -net('commission')
    const np = gp + commission - indirectDr
    const cash = net('cash'); const bank = net('bank')
    const furniture = net('furniture'); const ramesh = net('ramesh')
    const drawings = net('drawings'); const mohan = -net('mohan')
    const capitalBase = -net('capital')
    const ca = cash + bank + ramesh + closingStock
    const cl = mohan
    const assetsTotal = cash + bank + furniture + closingStock + ramesh
    const liabCapital = mohan + capitalBase + np - drawings
    return {
      sales, purchases, closingStock, cogs, gp, indirectDr, commission, np,
      cash, bank, furniture, ramesh, drawings, mohan, capitalBase,
      currentRatio: ca / cl, ca, cl, assetsTotal, liabCapital,
      balanced: Math.abs(assetsTotal - liabCapital) < 0.01,
    }
  }, [accounts])

  const ratioPass = (() => {
    const gp = Number(ratioInputs.gp)
    const np = Number(ratioInputs.np)
    const cr = Number(ratioInputs.cr)
    if (!Number.isFinite(gp) || !Number.isFinite(np) || !Number.isFinite(cr) ||
      ratioInputs.gp === '' || ratioInputs.np === '' || ratioInputs.cr === '') {
      return false
    }
    return Math.abs(gp - fin.gp) < 0.5 &&
      Math.abs(np - fin.np) < 0.5 &&
      Math.abs(cr - fin.currentRatio) < 0.05
  })()

  useEffect(() => {
    const touched = ratioInputs.gp || ratioInputs.np || ratioInputs.cr
    if (!touched) { setRatioCheck('idle'); return }
    setRatioCheck(ratioPass ? 'pass' : 'fail')
  }, [ratioInputs, ratioPass])

  // ---------------------------------------------------------------- view --
  const stageIdx = STAGE_ORDER.indexOf(stage)
  const canOpen = (s: Stage): boolean => {
    const i = STAGE_ORDER.indexOf(s)
    if (s === 'setup') return true
    if (s === 'journal') return posted.length > 0 || stageIdx >= 1
    if (s === 'ledger') return posted.length === events.length || stageIdx >= 2
    if (s === 'trial') return stageIdx >= 3
    return stageIdx >= 4
  }

  const goto = (s: Stage) => { if (canOpen(s)) setStage(s) }

  // journal book rows for the document view
  const journalRows = posted.map(id => eventOf(id))

  return (
    <div className="space-y-5">
      {/* company header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs text-slate-400">
          {stage === 'setup' ? (
            'One continuous firm — journal → ledger → trial balance → final accounts → ratios.'
          ) : (
            <>
              <span className="text-amber-300 font-black">{firmName || 'The Firm'}</span>
              {' '}· capital {inr(capital)} ·{' '}
              <span className="text-emerald-300 font-bold">
                {posted.length}/{events.length} entries posted
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCheat(c => !c)} data-testid="vc-cheat"
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold transition ${cheat
              ? 'border-amber-400/60 bg-amber-500/15 text-amber-200'
              : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500'}`}>
            {cheat ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            cheat view {cheat ? 'on' : 'off'} (teacher)
          </button>
          {stage !== 'setup' && (
            <button onClick={resetAll} data-testid="vc-reset"
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-[10px] font-bold text-slate-300 hover:border-slate-500">
              <RotateCcw className="w-3 h-3" /> reset
            </button>
          )}
        </div>
      </div>

      {/* stage rail */}
      {stage !== 'setup' && (
        <div className="flex flex-wrap gap-1.5">
          {STAGE_ORDER.slice(1).map(s => (
            <button key={s} onClick={() => goto(s)} data-testid={`vc-stage-${s}`}
              disabled={!canOpen(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition disabled:opacity-30 ${stage === s
                ? 'bg-amber-500/15 border-amber-400/60 text-amber-200'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-500'}`}>
              {STAGE_LABEL[s]}
              {s === 'ledger' && posted.length === events.length && !ledgerDone ? ' ⚠' : ''}
            </button>
          ))}
        </div>
      )}

      {/* ====================================================== SETUP */}
      {stage === 'setup' && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 max-w-xl">
          <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
            incorporate the firm
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Name the proprietorship and bring in starting capital. Every rupee
            that follows runs through the golden rules — the same families the
            deterministic accountancy solver enforces.
          </p>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Firm name
          </label>
          <input value={firmName} onChange={e => setFirmName(e.target.value)}
            data-testid="vc-firm-name"
            placeholder="e.g. Sharma & Sons Trading Co."
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 mb-3" />
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Starting capital (₹, minimum ₹1,65,000 so the cash box never runs
            dry before the first sale)
          </label>
          <input value={capital ? capital.toLocaleString('en-IN') : ''}
            onChange={e => setCapital(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)}
            data-testid="vc-capital"
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm font-mono text-slate-100 mb-2" />
          <div className="flex gap-1.5 mb-4">
            {[200000, 300000, 500000].map(v => (
              <button key={v} onClick={() => setCapital(v)}
                className="rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] font-bold text-slate-300 hover:border-amber-500/50">
                ₹{num(v)}
              </button>
            ))}
          </div>
          <button onClick={() => setStage('journal')}
            disabled={!firmName.trim() || capital < MIN_CAPITAL}
            data-testid="vc-incorporate"
            className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs py-2.5 transition">
            Commence business with {inr(capital)} →
          </button>
          <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
            The 14 transactions ahead are class-11 worked examples — cash &amp;
            credit sales/purchases, expenses, drawings, and a credit customer
            who pays PART of his account (watch the balance stay in his
            account). Your capital is transaction #1.
          </p>
        </div>
      )}

      {/* ==================================================== JOURNAL */}
      {stage === 'journal' && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
              {allPosted ? 'journal complete' : `entry ${posted.length + 1} of ${events.length}`}
            </p>
            {currentEvent ? (
              <>
                <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 mb-3">
                  <p className="text-[10px] font-mono text-slate-500">{currentEvent.date}</p>
                  <p className="text-sm font-bold text-white">{currentEvent.text}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    voucher verified — the document proves the amount
                    {cheat && (
                      <span className="text-amber-300 font-black">
                        {' '}· golden: Dr {acct(currentEvent.dr).label} / Cr{' '}
                        {acct(currentEvent.cr).label} {inr(currentEvent.amount)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="space-y-2 mb-3">
                  <label className="flex items-center gap-2 text-xs">
                    <span className="w-28 text-slate-400 font-semibold">Debit (Dr)</span>
                    <select value={drPick} onChange={e => setDrPick(e.target.value)}
                      data-testid="vc-dr-pick"
                      className="flex-1 rounded-lg bg-slate-800 border border-slate-600 px-2 py-1.5 text-slate-100">
                      <option value="">— which account comes in / is owed / is spent on? —</option>
                      {ACCOUNTS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <span className="w-28 text-slate-400 font-semibold">Credit (Cr)</span>
                    <select value={crPick} onChange={e => setCrPick(e.target.value)}
                      data-testid="vc-cr-pick"
                      className="flex-1 rounded-lg bg-slate-800 border border-slate-600 px-2 py-1.5 text-slate-100">
                      <option value="">— which account gives / goes out? —</option>
                      {ACCOUNTS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <span className="w-28 text-slate-400 font-semibold">Amount (₹)</span>
                    <input value={amtText}
                      onChange={e => setAmtText(e.target.value.replace(/[^0-9,]/g, ''))}
                      data-testid="vc-amt"
                      placeholder="the voucher amount"
                      className="flex-1 rounded-lg bg-slate-800 border border-slate-600 px-2 py-1.5 font-mono text-slate-100 placeholder:text-slate-500" />
                  </label>
                </div>
                <button onClick={postEntry} disabled={!drPick || !crPick || !amtText.trim()}
                  data-testid="vc-post"
                  className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs py-2.5 transition">
                  Post this entry to the journal
                </button>
                {verdict === 'right' && (
                  <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3" data-testid="vc-verdict-right">
                    <p className="flex items-center gap-1.5 text-xs font-black text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" /> Golden entry — both rules hold, Dr = Cr
                    </p>
                  </div>
                )}
                {verdict === 'wrong' && (
                  <div className="mt-3 rounded-xl border border-gold-500/40 bg-gold-500/10 p-3" data-testid="vc-verdict-wrong">
                    <p className="flex items-center gap-1.5 text-xs font-black text-gold-300">
                      <XCircle className="w-4 h-4" /> Which rule broke
                    </p>
                    <p className="text-[11px] text-slate-200 mt-1.5 leading-relaxed">{diagnosis}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4" data-testid="vc-journal-done">
                <p className="flex items-center gap-1.5 text-sm font-black text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> All {events.length} entries posted — the journal is closed
                </p>
                <FiveBeats beats={{
                  m: 'golden rules of debit and credit (personal: debit the receiver / credit the giver; real: debit what comes in / credit what goes out; nominal: debit expenses / credit incomes) classify every leg, so each entry balances.',
                  g: `${events.length} transactions of ${firmName || 'the firm'}, Apr 1 – May 5, evidenced by vouchers.`,
                  w: [
                    `${events.length} correct entries posted; total debit = total credit = ${inr(journalDrTotal)}.`,
                    'Assets & expenses rose on the Dr side; incomes & claims sat on the Cr side — exactly as the rules direct.',
                  ],
                  c: `Σ Dr = Σ Cr = ${inr(journalDrTotal)} across the journal book — the double entry holds entry-by-entry.`,
                  i: 'the journal is the book of original entry; the ledger can now be posted from it without a single unbalanced leg.',
                }} />
                <button onClick={() => setStage('ledger')}
                  data-testid="vc-to-ledger"
                  className="mt-3 flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 transition">
                  Post to the ledger <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* journal book document */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 overflow-hidden">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
              journal of {firmName || 'the firm'} (book of original entry)
            </p>
            {journalRows.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">
                Correct entries land here in chronological order, Dr first.
              </p>
            ) : (
              <div className="max-h-[420px] overflow-y-auto pr-1">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="text-slate-400 text-left border-b border-slate-700">
                      <th className="font-semibold py-1">Date</th>
                      <th className="font-semibold">Particulars</th>
                      <th className="font-semibold text-right">Dr (₹)</th>
                      <th className="font-semibold text-right">Cr (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {journalRows.map(ev => (
                      <tr key={ev.id} className="border-t border-slate-800 align-top">
                        <td className="py-1.5 font-sans text-slate-400 whitespace-nowrap pr-2">{ev.date}</td>
                        <td className="py-1.5 font-sans text-slate-200">
                          {acct(ev.dr).label} A/c <span className="text-amber-300">Dr.</span>
                          <span className="block text-slate-400 pl-3">To {acct(ev.cr).label} A/c</span>
                          <span className="block text-[10px] text-slate-500">({ev.narration})</span>
                        </td>
                        <td className="py-1.5 text-right text-gold-300">{num(ev.amount)}</td>
                        <td className="py-1.5 text-right text-amber-300">{num(ev.amount)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-600 font-black">
                      <td className="py-1.5 font-sans" colSpan={2}>Total</td>
                      <td className="py-1.5 text-right text-gold-200">{num(journalDrTotal)}</td>
                      <td className="py-1.5 text-right text-amber-200">{num(journalDrTotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================== LEDGER */}
      {stage === 'ledger' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                  error hunt — the ledger was posted, but not perfectly
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                  TWO postings disagree with the journal: one is on the
                  <span className="font-black text-amber-200"> wrong side </span>
                  of its account, one has a
                  <span className="font-black text-amber-200"> transposed amount </span>
                  (digits swapped). Flag a suspicious posting line to accuse it.
                  {cheat && (
                    <span className="font-black text-amber-300">
                      {' '}Cheat: the buggy lines are highlighted.
                    </span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase">bugs found</p>
                <p className="text-lg font-black font-mono text-amber-300" data-testid="vc-bug-count">
                  {bugLines.filter(l => flags[l.lineId]).length}/2
                </p>
              </div>
            </div>
            {flagNote && (
              <p className="mt-2 rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-[11px] text-slate-300">
                {flagNote}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {accounts.map(a => (
              <div key={a.id}
                className={`rounded-2xl border overflow-hidden ${cheat && bugLines.some(l => l.account === a.id)
                  ? 'border-amber-400/70'
                  : 'border-slate-700'}`}>
                <p className="bg-slate-800 px-3 py-1.5 text-[11px] font-black text-slate-100 text-center">
                  {a.label} A/c
                </p>
                <div className="grid grid-cols-2 text-[10px] font-mono">
                  <div className="border-r border-slate-700">
                    <p className="px-2 py-1 font-bold text-gold-300 border-b border-slate-800">Dr</p>
                    {a.dr.map(l => (
                      <button key={l.lineId}
                        onClick={() => toggleFlag(l.lineId)}
                        data-testid={`vc-ledger-line-${l.lineId}`}
                        className={`w-full text-left px-2 py-1 border-b border-slate-800/60 transition ${flags[l.lineId]
                          ? 'bg-gold-500/20 text-amber-200 font-black'
                          : cheat && bugLines.some(b => b.lineId === l.lineId)
                            ? 'bg-amber-500/10 text-amber-200'
                            : 'text-slate-300 hover:bg-slate-800/60'}`}>
                        {num(l.amount)}
                        <span className="block text-[9px] text-slate-500 font-sans">
                          {eventOf(l.eventId).date}
                        </span>
                      </button>
                    ))}
                    {a.bal?.side === 'dr' && (
                      <p className="px-2 py-1 text-gold-200 font-black border-t border-slate-600">
                        Bal c/d {num(a.bal.amount)}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="px-2 py-1 font-bold text-amber-300 border-b border-slate-800 text-right">Cr</p>
                    {a.cr.map(l => (
                      <button key={l.lineId}
                        onClick={() => toggleFlag(l.lineId)}
                        data-testid={`vc-ledger-line-${l.lineId}`}
                        className={`w-full text-right px-2 py-1 border-b border-slate-800/60 transition ${flags[l.lineId]
                          ? 'bg-gold-500/20 text-amber-200 font-black'
                          : cheat && bugLines.some(b => b.lineId === l.lineId)
                            ? 'bg-amber-500/10 text-amber-200'
                            : 'text-slate-300 hover:bg-slate-800/60'}`}>
                        {num(l.amount)}
                        <span className="block text-[9px] text-slate-500 font-sans">
                          {eventOf(l.eventId).date}
                        </span>
                      </button>
                    ))}
                    {a.bal?.side === 'cr' && (
                      <p className="px-2 py-1 text-amber-200 font-black border-t border-slate-600 text-right">
                        By bal c/d {num(a.bal.amount)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* fixes when both bugs are flagged */}
          {bothFlagged && (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4" data-testid="vc-fix-panel">
              <p className="text-xs font-black text-emerald-300 mb-2">
                Both disagreements flagged — now correct them
              </p>
              <div className="space-y-2">
                {SEED_ERRORS.map(err => {
                  if (fixes.includes(err.id)) {
                    return (
                      <p key={err.id} className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> fixed — the posting now agrees with the journal
                      </p>
                    )
                  }
                  const ev = eventOf(err.eventId)
                  const correctSide: 'dr' | 'cr' = ev.dr === err.account ? 'dr' : 'cr'
                  return (
                    <div key={err.id} className="rounded-xl border border-slate-600 bg-slate-800/70 p-3">
                      <p className="text-[11px] font-bold text-slate-200">{err.fixNote}</p>
                      {err.kind === 'wrong-side' ? (
                        <div className="mt-2 flex gap-1.5">
                          {(['dr', 'cr'] as const).map(side => (
                            <button key={side}
                              onClick={() => setFixDraft(p => ({ ...p, [err.id]: side }))}
                              data-testid={`vc-fix-side-${err.id}-${side}`}
                              className={`rounded-lg px-3 py-1 text-[10px] font-black border ${fixDraft[err.id] === side
                                ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                                : 'bg-slate-900 border-slate-600 text-slate-300'}`}>
                              {side === 'dr' ? 'Dr side' : 'Cr side'}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <input value={fixDraft[err.id] ?? ''}
                          onChange={e => setFixDraft(p => ({ ...p, [err.id]: e.target.value.replace(/[^0-9]/g, '') }))}
                          data-testid={`vc-fix-amt-${err.id}`}
                          placeholder="correct amount (₹)"
                          className="mt-2 w-40 rounded-lg bg-slate-900 border border-slate-600 px-2 py-1 text-[11px] font-mono text-slate-100 placeholder:text-slate-500" />
                      )}
                      <button
                        onClick={() => {
                          if (err.kind === 'wrong-side') {
                            if (fixDraft[err.id] === correctSide) applyFix(err)
                            else {
                              setFlagNote('That is still not where the journal puts it — check which side the journal entry used for this account.')
                            }
                          } else if (Number(fixDraft[err.id]) === ev.amount) {
                            applyFix(err)
                          } else {
                            setFlagNote('The ledger must carry the JOURNAL amount — re-read the May 5 voucher.')
                          }
                        }}
                        disabled={!fixDraft[err.id]}
                        data-testid={`vc-fix-apply-${err.id}`}
                        className="mt-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-[10px] px-3 py-1.5">
                        apply correction
                      </button>
                    </div>
                  )
                })}
              </div>
              {ledgerDone && (
                <>
                  <FiveBeats beats={{
                    m: 'posting transfers each journal leg to the account it belongs to; one-sided errors (wrong side, transposition) break Dr = Cr and are caught by cross-checking the ledger against the journal (c11_acc_cbse_06_003).',
                    g: `${accounts.length} accounts, ${posted.length * 2} postings across ${posted.length} journal entries.`,
                    w: [
                      'The wrong-side Sales posting was flipped back to the credit side.',
                      'The transposed Salaries posting (₹51,000) was corrected to the journal amount ₹15,000.',
                    ],
                    c: 'every posting now agrees with its journal entry — no one-sided errors remain in the books.',
                    i: 'balanced accounts can only balance the trial balance — but agreement with the journal is the stronger guarantee.',
                  }} />
                  <button onClick={() => setStage('trial')} data-testid="vc-to-trial"
                    className="mt-3 flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 transition">
                    Build the trial balance <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setStage('trial')} data-testid="vc-to-trial-early"
              className="rounded-xl border border-slate-600 bg-slate-800/60 hover:border-slate-400 text-slate-200 font-black text-[11px] px-4 py-2.5 transition">
              proceed to trial balance{ledgerDone ? '' : ' (with errors in the books — the TB will disagree)'}
            </button>
          </div>
        </div>
      )}

      {/* ================================================ TRIAL BALANCE */}
      {stage === 'trial' && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
              trial balance of {firmName || 'the firm'} — (balances method)
            </p>
            <table className="w-full text-[11px]" data-testid="vc-trial-balance">
              <thead>
                <tr className="text-slate-400 text-left border-b border-slate-700">
                  <th className="font-semibold py-1">Account</th>
                  <th className="font-semibold text-right">Dr (₹)</th>
                  <th className="font-semibold text-right">Cr (₹)</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {trialBalance.rows.map(r => (
                  <tr key={r.acct} className="border-t border-slate-800">
                    <td className="py-1 font-sans text-slate-200">{r.acct}</td>
                    <td className="text-right text-gold-300">
                      {r.side === 'dr' ? num(r.amount) : ''}
                    </td>
                    <td className="text-right text-amber-300">
                      {r.side === 'cr' ? num(r.amount) : ''}
                    </td>
                  </tr>
                ))}
                {!trialBalance.balanced && (
                  <tr className="border-t border-slate-800">
                    <td className="py-1 font-sans text-slate-200">Suspense A/c</td>
                    {trialBalance.diff > 0 ? (
                      <td className="text-right" />
                    ) : (
                      <td className="text-right text-rose-300 font-black">
                        {num(Math.abs(trialBalance.diff))}
                      </td>
                    )}
                    {trialBalance.diff > 0 ? (
                      <td className="text-right text-rose-300 font-black">
                        {num(Math.abs(trialBalance.diff))}
                      </td>
                    ) : (
                      <td className="text-right" />
                    )}
                  </tr>
                )}
                <tr className="border-t-2 border-slate-600 font-black">
                  <td className="py-1.5 font-sans">Total</td>
                  <td className="text-right text-gold-200">{num(trialBalance.totDr)}</td>
                  <td className="text-right text-amber-200">{num(trialBalance.totCr)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            {trialBalance.balanced ? (
              <div data-testid="vc-tb-balanced">
                <p className="flex items-center gap-1.5 text-sm font-black text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> The trial balance tallies
                </p>
                <FiveBeats beats={{
                  m: 'the balances method lists each ledger account\'s closing debit or credit balance; total debits must equal total credits because every entry posted equal Dr and Cr legs.',
                  g: `${trialBalance.rows.length} accounts carried down from the ledger of ${firmName || 'the firm'}.`,
                  w: [
                    `Debit balances total ${inr(trialBalance.totDr)}.`,
                    `Credit balances total ${inr(trialBalance.totCr)}.`,
                    'No suspense figure is needed — nothing is parked on the short side.',
                  ],
                  c: `${inr(trialBalance.totDr)} = ${inr(trialBalance.totCr)} — the two columns agree exactly.`,
                  i: 'arithmetical accuracy is proven; the books are ready for the final accounts (a tallied TB still tolerates errors of omission and principle — c11_acc_cbse_06_001).',
                }} />
                <button onClick={() => setStage('final')} data-testid="vc-to-final"
                  className="mt-3 flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 transition">
                  Build final accounts <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div data-testid="vc-tb-broken">
                <p className="flex items-center gap-1.5 text-sm font-black text-gold-300">
                  <XCircle className="w-4 h-4" /> The trial balance does NOT tally
                </p>
                <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                  Debits {inr(trialBalance.totDr)} vs credits{' '}
                  {inr(trialBalance.totCr)} — a gap of{' '}
                  <span className="font-black text-amber-200">
                    {inr(Math.abs(trialBalance.diff))}
                  </span>{' '}
                  {trialBalance.diff > 0 ? '(debit exceeds credit)' : '(credit exceeds debit)'}.
                  By the TRIAL_BALANCE_DIFF logic the shorter side parks the gap
                  as <span className="font-black">Suspense A/c</span> — but the
                  real exercise is the hunt: one-sided errors are still loose in
                  the ledger.
                </p>
                <button onClick={() => setStage('ledger')} data-testid="vc-back-hunt"
                  className="mt-3 flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 transition">
                  <Search className="w-4 h-4" /> Return to the ledger hunt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================== FINAL */}
      {stage === 'final' && (
        <div className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* trading account */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4" data-testid="vc-trading">
              <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
                trading account (yr ended May 31)
              </p>
              <table className="w-full text-[11px] font-mono">
                <tbody>
                  <tr><td className="py-1 font-sans text-slate-200">Sales</td><td className="text-right text-slate-100">{num(fin.sales)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Purchases</td><td className="text-right text-gold-300">{num(fin.purchases)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">less: closing stock</td><td className="text-right text-amber-300">({num(fin.closingStock)})</td></tr>
                  <tr className="border-t border-slate-700"><td className="py-1 font-sans text-slate-300">COGS</td><td className="text-right text-slate-100">{num(fin.cogs)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Gross profit c/d</td><td className="text-right text-emerald-300 font-black">{num(fin.gp)}</td></tr>
                  <tr className="border-t-2 border-slate-600 font-black">
                    <td className="py-1 font-sans">Total</td>
                    <td className="text-right">{num(fin.cogs + fin.gp)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                Closing stock ₹{num(fin.closingStock)} at cost — the authored
                year-end physical count. GP = Net sales − COGS.
              </p>
            </div>

            {/* P&L */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4" data-testid="vc-pl">
              <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
                profit &amp; loss account
              </p>
              <table className="w-full text-[11px] font-mono">
                <tbody>
                  <tr><td className="py-1 font-sans text-slate-300">Gross profit b/d</td><td className="text-right text-slate-100">{num(fin.gp)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-300">Commission received</td><td className="text-right text-slate-100">{num(fin.commission)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Rent</td><td className="text-right text-gold-300">{num(12000)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Wages</td><td className="text-right text-gold-300">{num(8000)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Salaries</td><td className="text-right text-gold-300">{num(15000)}</td></tr>
                  <tr className="border-t border-slate-700">
                    <td className="py-1 font-sans text-slate-300">Net profit c/d</td>
                    <td className="text-right text-emerald-300 font-black">{num(fin.np)}</td>
                  </tr>
                  <tr className="border-t-2 border-slate-600 font-black">
                    <td className="py-1 font-sans">Total</td>
                    <td className="text-right">{num(fin.gp + fin.commission)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                NP = GP + indirect incomes − indirect expenses.
              </p>
            </div>

            {/* balance sheet */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4" data-testid="vc-bs">
              <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
                balance sheet (May 31)
              </p>
              <table className="w-full text-[11px] font-mono">
                <tbody>
                  <tr><td className="py-1 font-sans text-slate-200">Cash</td><td className="text-right text-gold-300">{num(fin.cash)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Bank</td><td className="text-right text-gold-300">{num(fin.bank)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Furniture</td><td className="text-right text-gold-300">{num(fin.furniture)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Closing stock</td><td className="text-right text-gold-300">{num(fin.closingStock)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">Debtors (Ramesh)</td><td className="text-right text-gold-300">{num(fin.ramesh)}</td></tr>
                  <tr className="border-t-2 border-slate-600 font-black">
                    <td className="py-1 font-sans">Assets</td>
                    <td className="text-right text-gold-200">{num(fin.assetsTotal)}</td>
                  </tr>
                  <tr className="border-t-2 border-slate-600">
                    <td className="py-1 font-sans text-slate-200">Creditors (Mohan)</td>
                    <td className="text-right text-amber-300">{num(fin.mohan)}</td>
                  </tr>
                  <tr><td className="py-1 font-sans text-slate-200">Capital {inr(capital)}</td><td className="text-right text-amber-300">{num(fin.capitalBase)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">add: net profit</td><td className="text-right text-amber-300">{num(fin.np)}</td></tr>
                  <tr><td className="py-1 font-sans text-slate-200">less: drawings</td><td className="text-right text-amber-300">({num(fin.drawings)})</td></tr>
                  <tr className="border-t-2 border-slate-600 font-black">
                    <td className="py-1 font-sans">Liabilities + Capital</td>
                    <td className="text-right text-amber-200">{num(fin.liabCapital)}</td>
                  </tr>
                </tbody>
              </table>
              <p className={`text-[11px] font-bold mt-2 ${fin.balanced ? 'text-emerald-300' : 'text-rose-300'}`}>
                {fin.balanced ? '✓ A = L + C — the sheet balances' : '✗ does not balance'}
              </p>
            </div>
          </div>

          {/* ratio checks — the student computes */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
              your analysis — compute before you peek
            </p>
            <p className="text-xs text-slate-400 mb-3">
              From the corrected books: gross profit, net profit, and the
              current ratio (current assets ÷ current liabilities). The checks
              use the GROSS_PROFIT / NET_PROFIT / CURRENT_RATIO family formulas.
              {cheat && (
                <span className="text-amber-300 font-black">
                  {' '}Cheat: GP {inr(fin.gp)} · NP {inr(fin.np)} · CR {fin.currentRatio.toFixed(1)} : 1
                </span>
              )}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {([
                { key: 'gp', label: 'Gross profit (₹)', hint: 'Sales − (purchases − closing stock)' },
                { key: 'np', label: 'Net profit (₹)', hint: 'GP + commission − rent − wages − salaries' },
                { key: 'cr', label: 'Current ratio (x : 1)', hint: 'CA = cash+bank+debtors+stock · CL = creditors' },
              ] as const).map(f => (
                <label key={f.key} className="block">
                  <span className="text-[11px] font-bold text-slate-300 block">{f.label}</span>
                  <input value={ratioInputs[f.key]}
                    onChange={e => setRatioInputs(p => ({ ...p, [f.key]: e.target.value.replace(/[^0-9.]/g, '') }))}
                    data-testid={`vc-ratio-${f.key}`}
                    className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-600 px-2 py-1.5 font-mono text-sm text-slate-100" />
                  <span className="text-[10px] text-slate-500">{f.hint}</span>
                </label>
              ))}
            </div>
            {ratioCheck === 'pass' && (
              <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3" data-testid="vc-ratio-pass">
                <p className="flex items-center gap-1.5 text-xs font-black text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> All three figures match the family formulas
                </p>
                <FiveBeats beats={{
                  m: 'GROSS_PROFIT = net sales − COGS (purchases − closing stock); NET_PROFIT = GP + indirect incomes − indirect expenses; CURRENT_RATIO = current assets ÷ current liabilities.',
                  g: `Sales ${inr(fin.sales)}, purchases ${inr(fin.purchases)}, closing stock ${inr(fin.closingStock)}, commission ${inr(fin.commission)}, expenses rent+wages+salaries ${inr(fin.indirectDr)}, CA ${inr(fin.ca)}, CL ${inr(fin.cl)}.`,
                  w: [
                    `GP = ${inr(fin.sales)} − ${inr(fin.cogs)} = ${inr(fin.gp)}.`,
                    `NP = ${inr(fin.gp)} + ${inr(fin.commission)} − ${inr(fin.indirectDr)} = ${inr(fin.np)}.`,
                    `Current ratio = ${inr(fin.ca)} ÷ ${inr(fin.cl)} = ${fin.currentRatio.toFixed(1)} : 1.`,
                  ],
                  c: `balance sheet: assets ${inr(fin.assetsTotal)} = liabilities + capital ${inr(fin.liabCapital)} — the final accounts close on both sides.`,
                  i: 'one continuous firm, journal to ratios — every figure above is the arithmetic consequence of the entries you posted.',
                }} />
              </div>
            )}
            {ratioCheck === 'fail' && (
              <div className="mt-3 rounded-xl border border-gold-500/40 bg-gold-500/10 p-3" data-testid="vc-ratio-fail">
                <p className="flex items-center gap-1.5 text-xs font-black text-gold-300">
                  <XCircle className="w-4 h-4" /> One of the figures disagrees with the books
                </p>
                <p className="text-[11px] text-slate-200 mt-1.5 leading-relaxed">
                  Rebuild from the ledger: GP comes from the TRADING account
                  (sales against purchases − closing stock). NP then adjusts GP
                  by the P&amp;L items — commission in; rent, wages and salaries
                  out. The current ratio counts only CURRENT items: cash, bank,
                  debtors and closing stock over creditors — furniture is a
                  fixed asset and never enters the numerator.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
              the whole firm, one ledger
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              14 transactions → {events.length} golden entries → {accounts.length}{' '}
              accounts → a {inr(trialBalance.totDr)} trial balance → GP{' '}
              {inr(fin.gp)}, NP {inr(fin.np)}, a {fin.currentRatio.toFixed(1)} : 1
              current ratio, and a balance sheet that closes at{' '}
              {inr(fin.assetsTotal)} on both sides. Depreciation, BRS and bills
              live one bench over in the Accountancy Sandbox.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
