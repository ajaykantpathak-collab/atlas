'use client'

/**
 * CivicsSim.tsx — civic process simulators for the E6 Timeline & Civics
 * sandbox (SANDBOX_TAXONOMY.md: civics E4 System Simulator + constitution
 * E2 Construction Workbench / Preamble builder).
 *
 * Four closed-world sims, every string authored in the histciv corpus:
 *   1. Preamble builder   — drag the descriptors into constitutional order
 *                           (Sovereign → Socialist → Secular → Democratic →
 *                           Republic; c9_histciv_icse_01_003).
 *   2. Three organs       — route a law through Legislature (makes) →
 *                           Executive (executes) → Judiciary (interprets/
 *                           judicial review; c10_histciv_icse_01/02/03).
 *   3. Election process   — ECI (Art 324) → rolls → MCC → nomination →
 *                           campaign → polling → counting → disputes, plus a
 *                           malpractice→reform matcher (c9_histciv_icse_02).
 *   4. DPSP in action     — match articles to the laws that implemented them:
 *                           Art 40 → 73rd Amendment 1992, Art 21A → RTE Act
 *                           2009, Art 48A → environment acts… (c9_01_005,
 *                           c7_histciv_icse_08).
 *
 * Wrong states inject the chapter node's AUTHORED misconception content via
 * MisconceptionPanel (remediation.ts fetchEnrichment — honest degradation,
 * never invented text). SequenceSim + PairingSim are exported: the E6
 * timeline/causal-chain engine in HistTimeline.tsx reuses them.
 */
import { useEffect, useState } from 'react'
import { Scale, Vote, Landmark, ScrollText, RotateCcw, Check } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import { shuffled } from './histcivTopics'

// ----------------------------------------------------------- shared bits --

/** Authored misconception content for one corpus node (honest null). */
export function useMisconception(nodeId: string | undefined, trigger: number) {
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)
  useEffect(() => {
    if (!nodeId || trigger <= 0) { setMiscon(null); return }
    let live = true
    fetchEnrichment(nodeId).then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [nodeId, trigger])
  return miscon
}

const misconOf = (m: EnrichmentData | null) => ({
  misconception: m?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null,
  commonMisconception: m?.common_misconception ?? null,
})

export function MisconPanel({ nodeId, trigger }:
  { nodeId?: string; trigger: number }) {
  const miscon = useMisconception(nodeId, trigger)
  return <MisconceptionPanel {...misconOf(miscon)} />
}

/** One draggable chip (HTML5 DnD + click-to-select fallback for touch). */
export function Chip({ id, label, sub, state, onPick, onDrop }: {
  id: string
  label: string
  sub?: string
  state: 'pool' | 'locked' | 'wrong'
  onPick?: () => void
  onDrop?: () => void
}) {
  const base = 'rounded-xl border px-3 py-2 text-left text-xs font-semibold transition select-none cursor-grab active:cursor-grabbing'
  const look = state === 'locked'
    ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-100'
    : state === 'wrong'
      ? 'bg-rose-500/20 border-rose-400/60 text-rose-100 animate-pulse'
      : 'bg-slate-800/70 border-slate-600 text-slate-200 hover:border-amber-400/60 hover:text-amber-100'
  return (
    <div
      draggable={state === 'pool'}
      onDragStart={e => {
        if (state !== 'pool') { e.preventDefault(); return }
        e.dataTransfer.setData('text/plain', id)
        onPick?.()
      }}
      onClick={state === 'pool' ? onPick : undefined}
      onDragOver={e => { if (onDrop) e.preventDefault() }}
      onDrop={e => { if (onDrop) { e.preventDefault(); onDrop() } }}
      data-testid={`chip-${id}`}
      className={`${base} ${look}`}>
      {label}
      {sub && <span className="mt-0.5 block text-[10px] font-normal text-slate-400">{sub}</span>}
    </div>
  )
}

function SimHeader({ icon: Icon, title, hint, onReset }:
  { icon: typeof Scale; title: string; hint: string; onReset: () => void }) {
  return (
    <div className="flex items-start justify-between gap-2 mb-2.5">
      <div>
        <h3 className="flex items-center gap-1.5 text-sm font-black text-white">
          <Icon className="w-4 h-4 text-amber-300" />{title}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">{hint}</p>
      </div>
      <button onClick={onReset} title="reset"
        className="shrink-0 rounded-lg border border-slate-600 px-2 py-1 text-[10px] font-bold text-slate-300 hover:text-white hover:border-slate-400">
        <RotateCcw className="w-3 h-3 inline mr-1" />reset
      </button>
    </div>
  )
}

const Done = ({ text }: { text: string }) => (
  <p className="mt-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-bold text-emerald-200">
    <Check className="w-3 h-3 inline mr-1" />{text}
  </p>
)

// -------------------------------------------------- SequenceSim (ordered) --

export interface SeqItem { key: string; label: string; marker: string }

/**
 * Drag the shuffled chips into the numbered slots — slot i only accepts
 * item i (the authored order). A wrong chip pulses red and injects the
 * node's authored misconception; the right chip locks in place.
 */
export function SequenceSim({ items, nodeId, title, hint, doneText, onDone }:
  { items: SeqItem[]; nodeId?: string; title: string; hint: string; doneText: string; onDone?: () => void }) {
  const [placed, setPlaced] = useState<Record<number, string>>({})
  const [wrongAt, setWrongAt] = useState<number | null>(null)
  const [wrongChip, setWrongChip] = useState<string | null>(null)
  const [trigger, bump] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [pool, setPool] = useState(() => shuffled(items.map((it, i) => ({ ...it, n: i }))))

  const reset = () => {
    setPlaced({}); setWrongAt(null); setWrongChip(null); setPicked(null); bump(0)
    setPool(shuffled(items.map((it, i) => ({ ...it, n: i }))))
  }
  const place = (n: number, chipKey: string | null) => {
    if (placed[n]) return
    const want = items[n].key
    const chip = chipKey ?? picked
    if (!chip) return
    if (chip === want) {
      setPlaced(p => ({ ...p, [n]: chip }))
      setWrongAt(null); setWrongChip(null); setPicked(null)
      if (Object.keys({ ...placed, [n]: chip }).length === items.length) onDone?.()
    } else {
      setWrongAt(n); setWrongChip(chip); bump(t => t + 1)
    }
  }

  const remaining = pool.filter(it => !Object.values(placed).includes(it.key))
  const complete = Object.keys(placed).length === items.length

  return (
    <div>
      <SimHeader icon={ScrollText} title={title} hint={hint} onReset={reset} />
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          {items.map((it, n) => {
            const placedKey = placed[n]
            return (
              <div key={it.key} role="button" tabIndex={0}
                onClick={() => picked && place(n, null)}
                onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && picked) place(n, null) }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); place(n, e.dataTransfer.getData('text/plain')) }}
                data-testid={`slot-${n}`}
                className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 min-h-[42px] transition ${placedKey
                  ? 'border-emerald-400/50 bg-emerald-500/10'
                  : wrongAt === n
                    ? 'border-rose-400/60 bg-rose-500/10'
                    : 'border-dashed border-slate-600 bg-slate-900/40 hover:border-amber-400/50'}`}>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${placedKey ? 'bg-emerald-500/30 text-emerald-200' : 'bg-slate-700 text-slate-300'}`}>
                  {placedKey ? '✓' : n + 1}
                </span>
                {placedKey ? (
                  <span className="text-[11px] font-semibold text-emerald-100">
                    {items[n].label}
                    <span className="ml-1.5 text-[10px] font-black text-emerald-300/80">{it.marker}</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{it.marker}</span>
                )}
              </div>
            )
          })}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
            drag or tap a card, then tap its slot
          </p>
          <div className="space-y-1.5">
            {remaining.map(it => (
              <Chip key={it.key} id={it.key} label={it.label}
                state={wrongChip === it.key ? 'wrong' : picked === it.key ? 'locked' : 'pool'}
                onPick={() => { setPicked(k => (k === it.key ? null : it.key)); setWrongChip(null) }} />
            ))}
          </div>
          {complete && <Done text={doneText} />}
        </div>
      </div>
      {trigger > 0 && <MisconPanel nodeId={nodeId} trigger={trigger} />}
    </div>
  )
}

// ---------------------------------------------------- PairingSim (matched) --

export interface PairItem { key: string; cause: string; effect: string; why: string }

/**
 * Drag each cause chip onto its effect slot (pairing, not ordering).
 * Wrong pairing → authored misconception; correct → the corpus's own
 * causal link (`why`) is revealed under the pair.
 */
export function PairingSim({ pairs, nodeId, title, hint, doneText, causeLabel, effectLabel, onDone }:
  { pairs: PairItem[]; nodeId?: string; title: string; hint: string; doneText: string;
    causeLabel: string; effectLabel: string; onDone?: () => void }) {
  const [placed, setPlaced] = useState<Record<string, string>>({}) // effectKey -> causeKey
  const [wrongEffect, setWrongEffect] = useState<string | null>(null)
  const [wrongChip, setWrongChip] = useState<string | null>(null)
  const [trigger, bump] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [pool, setPool] = useState(() => shuffled(pairs))

  const reset = () => {
    setPlaced({}); setWrongEffect(null); setWrongChip(null); setPicked(null); bump(0)
    setPool(shuffled(pairs))
  }
  const place = (effectKey: string, causeKey: string | null) => {
    if (placed[effectKey]) return
    const chip = causeKey ?? picked
    if (!chip) return
    if (chip === effectKey) {
      const next = { ...placed, [effectKey]: chip }
      setPlaced(next); setWrongEffect(null); setWrongChip(null); setPicked(null)
      if (Object.keys(next).length === pairs.length) onDone?.()
    } else {
      setWrongEffect(effectKey); setWrongChip(chip); bump(t => t + 1)
    }
  }

  const remaining = pool.filter(p => !Object.values(placed).includes(p.key))
  const complete = Object.keys(placed).length === pairs.length

  return (
    <div>
      <SimHeader icon={Scale} title={title} hint={hint} onReset={reset} />
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1.5">{causeLabel}</p>
          <div className="space-y-1.5">
            {remaining.map(p => (
              <Chip key={p.key} id={p.key} label={p.cause}
                state={wrongChip === p.key ? 'wrong' : picked === p.key ? 'locked' : 'pool'}
                onPick={() => { setPicked(k => (k === p.key ? null : p.key)); setWrongChip(null) }} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest mb-1.5">{effectLabel}</p>
          <div className="space-y-1.5">
            {pairs.map(p => {
              const got = placed[p.key]
              const why = got ? pairs.find(x => x.key === p.key)?.why : null
              return (
                <div key={p.key}
                  role="button" tabIndex={0}
                  onClick={() => picked && place(p.key, null)}
                  onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && picked) place(p.key, null) }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); place(p.key, e.dataTransfer.getData('text/plain')) }}
                  data-testid={`pair-${p.key}`}
                  className={`rounded-xl border px-2.5 py-1.5 transition ${got
                    ? 'border-emerald-400/50 bg-emerald-500/10'
                    : wrongEffect === p.key
                      ? 'border-rose-400/60 bg-rose-500/10'
                      : 'border-dashed border-slate-600 bg-slate-900/40 hover:border-amber-400/50'}`}>
                  <p className={`text-[11px] font-semibold ${got ? 'text-emerald-100' : 'text-slate-300'}`}>
                    {got && <Check className="w-3 h-3 inline mr-1 text-emerald-300" />}{p.effect}
                  </p>
                  {why && <p className="mt-1 text-[10px] leading-relaxed text-slate-400 border-l-2 border-emerald-500/40 pl-2">{why}</p>}
                </div>
              )
            })}
          </div>
          {complete && <Done text={doneText} />}
        </div>
      </div>
      {trigger > 0 && <MisconPanel nodeId={nodeId} trigger={trigger} />}
    </div>
  )
}

// -------------------------------------------------------- 1. Preamble sim --

const PREAMBLE: SeqItem[] = [
  { key: 'sovereign', label: 'Sovereign — no external power dictates; India\'s constituent power is India\'s own', marker: 'word 1' },
  { key: 'socialist', label: 'Socialist — socio-economic democracy: distributive justice, social security, human dignity', marker: 'word 2' },
  { key: 'secular', label: 'Secular — no state religion; the State keeps equal distance from all faiths', marker: 'word 3' },
  { key: 'democratic', label: 'Democratic — universal adult franchise; the executive is responsible to the legislature', marker: 'word 4' },
  { key: 'republic', label: 'Republic — an elected head of state, not a hereditary one', marker: 'word 5' },
]

export function PreambleSim({ onDone }: { onDone?: () => void }) {
  return (
    <SequenceSim
      items={PREAMBLE}
      nodeId="c9_histciv_icse_01_003"
      title="Preamble builder — put the descriptors in constitutional order"
      hint={'The corpus: India is a "sovereign, socialist, secular, democratic republic". Drag the five words into the order the Preamble uses — each card carries its meaning.'}
      doneText="sovereign, socialist, secular, democratic republic — the Preamble's own order."
      onDone={onDone}
    />
  )
}

// ------------------------------------------------------ 2. Three organs --

const ORGAN_STAGES = [
  {
    key: 'legislature', organ: 'Legislature', organColor: 'text-sky-200', node: 'c10_histciv_icse_01_001',
    prompt: 'A proposal for a new law has been drafted. WHO debates it, passes it (both Houses), and turns the proposal into a statute?',
    right: 'Parliament (Article 79) — the Union Legislature — is the supreme legislative authority: it deliberates and passes the bill.',
    wrongs: 'Laws are MADE here. The Executive implements what the Legislature has already passed; the Judiciary interprets — it does not draft statutes.',
  },
  {
    key: 'executive', organ: 'Executive', organColor: 'text-amber-200', node: 'c10_histciv_icse_02_001',
    prompt: 'The bill has been passed. WHO gives the assent and implements the law through the ministries?',
    right: 'The Union Executive — the President (constitutional head) assents; the government headed by the PM (real head) executes the law through ministries.',
    wrongs: 'Assent and implementation belong to the EXECUTIVE. Parliament passes laws but does not run ministries; courts do not execute statutes.',
  },
  {
    key: 'judiciary', organ: 'Judiciary', organColor: 'text-emerald-200', node: 'c10_histciv_icse_03_001',
    prompt: 'A dispute arises over the new law\'s meaning — and someone claims it violates the Constitution. WHO interprets and can strike it down?',
    right: 'The Judiciary — the Supreme Court at the apex exercises judicial review, protecting the Constitution and settling disputes.',
    wrongs: 'Interpretation and judicial review belong to the JUDICIARY. The Legislature makes and amends law; the Executive carries it out — neither interprets the Constitution.',
  },
] as const

export function ThreeOrgansSim({ onDone }: { onDone?: () => void }) {
  const [stage, setStage] = useState(0)
  const [verdict, setVerdict] = useState<'right' | 'wrong' | null>(null)
  const [picked, setPicked] = useState<string | null>(null)
  const [trigger, bump] = useState(0)
  const cur = ORGAN_STAGES[stage]

  const choose = (organ: string) => {
    if (verdict === 'right') return
    setPicked(organ)
    if (organ === cur.key) {
      setVerdict('right'); setPicked(null)
    } else {
      setVerdict('wrong'); bump(t => t + 1)
    }
  }
  const next = () => {
    setVerdict(null); setPicked(null)
    if (stage + 1 >= ORGAN_STAGES.length) onDone?.()
    else setStage(s => s + 1)
  }

  return (
    <div>
      <SimHeader icon={Landmark} title="Three organs simulator — make it, execute it, enforce it"
        hint="One law, three stations. The corpus: Legislature makes, Executive executes, Judiciary interprets (judicial review)."
        onReset={() => { setStage(0); setVerdict(null); setPicked(null); bump(0) }} />
      <div className="grid md:grid-cols-[1fr_240px] gap-3">
        <div className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            stage {stage + 1} of {ORGAN_STAGES.length}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-200 leading-relaxed">{cur.prompt}</p>
          {verdict === 'right' && (
            <div className="mt-2 space-y-2">
              <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-200">
                <Check className="w-3 h-3 inline mr-1" />{cur.right}
              </p>
              <button onClick={next}
                className="rounded-xl bg-sky-500 hover:bg-sky-400 px-3 py-1.5 text-[11px] font-black text-slate-950">
                {stage + 1 >= ORGAN_STAGES.length ? 'finish the law\'s journey' : 'next station →'}
              </button>
            </div>
          )}
          {verdict === 'wrong' && (
            <div className="mt-2 space-y-2">
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-rose-200">
                {cur.wrongs}
              </p>
              <button onClick={() => setVerdict(null)}
                className="rounded-xl bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-[11px] font-black text-slate-950">
                try again
              </button>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          {(['legislature', 'executive', 'judiciary'] as const).map(o => (
            <button key={o} onClick={() => choose(o)}
              data-testid={`organ-${o}`}
              className={`w-full rounded-xl border px-3 py-2 text-xs font-black capitalize transition ${verdict === 'wrong' && picked === o
                ? 'bg-rose-500/20 border-rose-400/60 text-rose-100'
                : verdict === 'right' && cur.key === o
                  ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-100'
                  : 'bg-slate-800/70 border-slate-600 text-slate-200 hover:border-amber-400/60'}`}>
              {o}
            </button>
          ))}
          <p className="text-[10px] text-slate-500 leading-relaxed pt-1">
            Wrong answer = the matching corpus node&apos;s authored diagnosis opens below.
          </p>
        </div>
      </div>
      {trigger > 0 && <MisconPanel nodeId={cur.node} trigger={trigger} />}
    </div>
  )
}

// -------------------------------------------------------- 3. Election sim --

const ELECTION_STEPS: SeqItem[] = [
  { key: 'eci', label: 'Election Commission of India — superintendence, direction and control (Article 324)', marker: 'machinery' },
  { key: 'rolls', label: 'Delimitation of constituencies and preparation of electoral rolls', marker: 'prepare' },
  { key: 'mcc', label: 'Schedule announced — the Model Code of Conduct applies until results', marker: 'announce' },
  { key: 'nomination', label: 'Nomination of candidates', marker: 'contest' },
  { key: 'campaign', label: 'Campaigning (meetings need prior permission; expenditure monitored)', marker: 'persuade' },
  { key: 'polling', label: 'Polling day — universal adult franchise (18+), secret ballot, EVM/VVPAT', marker: 'vote' },
  { key: 'counting', label: 'Counting of votes', marker: 'count' },
  { key: 'results', label: 'Results declared — disputes resolved', marker: 'mandate' },
]

const MALPRACTICE: PairItem[] = [
  { key: 'booth', cause: 'Booth capturing on polling day', effect: 'Re-poll ordered by the Election Commission', why: 'The Commission\'s plenary powers under Article 324 include ordering re-poll where the poll was vitiated.' },
  { key: 'mcc_viol', cause: 'A campaigner breaks the Model Code of Conduct', effect: 'Censure, banning campaigners, or ordering re-poll', why: 'The corpus: the ECI "take[s] punitive action such as censure, banning campaigners, or ordering re-poll" — and the MCC is NOT a statute, it is consensus guidelines.' },
  { key: 'bogus', cause: 'Bogus / impersonated voting', effect: 'Photo voter-ID rolls and EVM/VVPAT machines', why: 'Voting runs through "secret ballot or electronic voting machines" on verified electoral rolls — identity checks are the reform.' },
  { key: 'indirect', cause: 'Choosing a President or Rajya Sabha member', effect: 'Indirect election — an electoral college of elected representatives votes', why: 'Direct elections fill the Lok Sabha and Assemblies; the President, Vice-President and Rajya Sabha members are chosen by electoral colleges.' },
]

export function ElectionSim({ onDone }: { onDone?: () => void }) {
  const [part, setPart] = useState<'flow' | 'malpractice'>('flow')
  return (
    <div className="space-y-4">
      <div className="flex gap-1.5">
        {([['flow', 'process order'], ['malpractice', 'malpractice → reform']] as const).map(([k, label]) => (
          <button key={k} onClick={() => setPart(k)}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${part === k ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
            {label}
          </button>
        ))}
      </div>
      {part === 'flow' ? (
        <SequenceSim
          items={ELECTION_STEPS}
          nodeId="c9_histciv_icse_02_001"
          title="Election process — from the Commission to the mandate"
          hint="Order the machinery the corpus teaches: the ECI (Art 324) runs everything from rolls to results; the MCC applies from announcement to results."
          doneText="One autonomous Commission, one chain: rolls → rules → nomination → campaign → poll → count → mandate."
          onDone={onDone}
        />
      ) : (
        <PairingSim
          pairs={MALPRACTICE}
          nodeId="c9_histciv_icse_02_008"
          title="Malpractice → reform matcher"
          hint="Match what can go wrong to the authored remedy — direct vs indirect elections included."
          doneText="Every ailment has an authored remedy — the Commission's Article 324 powers."
          causeLabel="what happens"
          effectLabel="the corpus remedy"
          onDone={onDone}
        />
      )}
    </div>
  )
}

// ----------------------------------------------------------- 4. DPSP sim --

const DPSP: PairItem[] = [
  { key: 'art40', cause: 'Article 40 — organise village panchayats', effect: '73rd Constitutional Amendment, 1992 — constitutional status, three tiers, five-year elections, one-third seats for women', why: 'The corpus: "action began at Nagaur, permanence arrived in 1992" — the Gandhian DPSP became a constitutional structure.' },
  { key: 'art21a', cause: 'Article 21A — free and compulsory education (ages 6-14)', effect: 'Right to Education Act, 2009 — in force 1 April 2010', why: 'Amendment and statute are different instruments with different years: Article 21A made the right; the RTE Act 2009 is the working statute.' },
  { key: 'art39', cause: 'Article 39 — livelihood, equitable resources, equal pay for equal work', effect: 'Wage-employment programmes (MGNREGA-style): designed centrally, adapted by Gram Panchayats', why: 'The corpus: Article 39\'s economics drives livelihood schemes; panchayats implement because such schemes "are designed centrally but need local adaptation".' },
  { key: 'art41', cause: 'Article 41 — public assistance in unemployment, old age, sickness, disablement', effect: 'Social-security and right-to-work programmes', why: 'Article 41 (public assistance) is the old-age-walking-stick beside the school satchel — the State must provide within its capacity.' },
  { key: 'art48a', cause: 'Article 48A — environment, forests and wildlife', effect: 'Wildlife Protection Act 1972, Water Act 1974, Forest (Conservation) Act 1980, Air Act 1981, Environment (Protection) Act 1986', why: 'The corpus shelves the green statutes beside Article 48A — a DPSP turned into five Acts.' },
  { key: 'art44', cause: 'Article 44 — uniform civil code for all citizens', effect: 'Still a directive, not a law — the State "shall endeavour"', why: 'Article 44 envisions a uniform civil code; being a DPSP (Article 37), it is fundamental in governance but NOT court-enforceable.' },
  { key: 'art51', cause: 'Article 51 — promote international peace and security', effect: 'India\'s foreign-policy posture: peace, NAM-style independence from blocs', why: 'Article 51\'s internationalism points outward — the same corpus that teaches NAM (1961) teaches Article 51 as its constitutional root.' },
]

export function DPSPSim({ onDone }: { onDone?: () => void }) {
  return (
    <PairingSim
      pairs={DPSP}
      nodeId="c9_histciv_icse_01_005"
      title="DPSP in action — match the article to the law it produced"
      hint={'Part IV directives are non-justiciable (Article 37) yet "fundamental in governance" — match each to its real-world instrument.'}
      doneText="Seven articles, seven instruments — DPSP and Fundamental Rights are complementary (Minerva Mills, 1980)."
      causeLabel="directive article"
      effectLabel="instrument in action"
      onDone={onDone}
    />
  )
}

// ------------------------------------------------------------ sim picker --

export type CivicsSimKey = 'preamble' | 'organs' | 'elections' | 'dpsp'

export const CIVICS_SIMS: { key: CivicsSimKey; label: string; icon: typeof Scale }[] = [
  { key: 'preamble', label: 'Preamble builder', icon: ScrollText },
  { key: 'organs', label: 'Three organs', icon: Landmark },
  { key: 'elections', label: 'Election process', icon: Vote },
  { key: 'dpsp', label: 'DPSP in action', icon: Scale },
]

export default function CivicsSim({ sim, onDone }: { sim: CivicsSimKey; onDone?: () => void }) {
  if (sim === 'preamble') return <PreambleSim onDone={onDone} />
  if (sim === 'organs') return <ThreeOrgansSim onDone={onDone} />
  if (sim === 'elections') return <ElectionSim onDone={onDone} />
  return <DPSPSim onDone={onDone} />
}
