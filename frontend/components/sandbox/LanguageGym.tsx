'use client'

/**
 * LanguageGym — the E8-adapted Language Gym tab of /sandbox
 * (SANDBOX_TAXONOMY.md §11 English + §12 Hindi), bilingual en/hi packs.
 *
 * Every tab is wired to the same closed-world loop as MathsSandbox:
 *
 *   question → answer → INSTANT DIAGNOSIS pulling the AUTHORED wrong-answer
 *   clause from the corpus node through components/learn/remediation.ts —
 *   English keeps the authored shape
 *     A wrong answer (e.g., "…") reveals the misconception that …
 *   and Hindi keeps the authored Devanagari clause
 *     गलत उत्तर (जैसे — "…") से … की गलती प्रकट होती है
 *   — never generated. When the enrichment API has nothing for a node the
 *   panel renders nothing (honest degradation).
 *
 * Tabs: grammar drill trainer · sentence-assembly workbench · ICSE format
 * checkers (notice/e-mail/letter/पत्र/नोटिस) · literature RCT trainer ·
 * vocabulary builders. Class bands mirror the corpus: 6-10 for both
 * subjects (11-12 language nodes do not exist in cisce_nodes_v2 yet).
 *
 * Central wiring into app/(student)/sandbox/page.tsx happens post-hoc
 * (concurrent agents own that file) via the exported LANGUAGE_GYM_TAB
 * config: { id: 'langym', label: '🗣️ Language Gym', component }.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  SpellCheck, Blocks, ClipboardCheck, BookOpen, Lightbulb, Play,
} from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import {
  fetchEnrichment, fetchNodeRemediation,
  type EnrichmentData, type DiagnosticQuestion,
} from '@/components/learn/remediation'
import {
  LANGYM_CLASSES, bandsFor, accepted, normEn, normHi,
  GRAMMAR_DRILLS, SENTENCE_ASSEMBLY, FORMAT_SPECS, RCT_PACKS, VOCAB_PACKS,
  type LangSubject, type LangClassBand, type LangChapter, type LangTopic,
  type GrammarDrill, type AssemblyPuzzle, type FormatSpec, type RctItem, type VocabItem,
} from './langGymTopics'

const PROGRESS_KEY = 'langym_explored_v1'

// ------------------------------------------------------------ diagnosis --

interface Diagnosis {
  /** Authored wrong-answer clause (EN corpus sentence / HI Devanagari). */
  clause: string | null
  enrichment: EnrichmentData | null
  /** Authored diagnostics pulled live from the node via remediation.ts. */
  runtime: DiagnosticQuestion[]
}

/**
 * Build the diagnosis for a missed item: the bundled verbatim clause when
 * the pack carries one, plus the node's authored misconception fetched
 * through remediation.ts (matched by question text when possible).
 */
async function diagnose(nodeId: string | undefined, bundled: string | undefined, missedQuestion?: string): Promise<Diagnosis> {
  const enrichment = nodeId ? await fetchEnrichment(nodeId) : null
  let clause = bundled ?? null
  if (!clause && missedQuestion && enrichment?.diagnostic_questions) {
    const hit = enrichment.diagnostic_questions.find(
      d => d.question?.trim().toLowerCase() === missedQuestion.trim().toLowerCase())
    clause = hit?.misconception_if_wrong ?? null
  }
  return { clause, enrichment, runtime: [] }
}

function misconOf(d: Diagnosis): string | null {
  return d.clause ?? d.enrichment?.diagnostic_questions?.find(q => q.misconception_if_wrong)?.misconception_if_wrong ?? null
}

function Panel({ diag }: { diag: Diagnosis | null }) {
  if (!diag) return null
  return (
    <MisconceptionPanel
      misconception={misconOf(diag)}
      commonMisconception={diag.enrichment?.common_misconception ?? null} />
  )
}

// ----------------------------------------------------------- main shell --

type Tab = 'drills' | 'assemble' | 'formats' | 'rct' | 'vocab'

const TAB_META: Record<LangSubject, Record<Tab, { label: string; icon: any }>> = {
  en: {
    drills: { label: 'Grammar trainer', icon: SpellCheck },
    assemble: { label: 'Sentence assembly', icon: Blocks },
    formats: { label: 'Format checkers', icon: ClipboardCheck },
    rct: { label: 'Literature RCT', icon: BookOpen },
    vocab: { label: 'Word builders', icon: Lightbulb },
  },
  hi: {
    drills: { label: 'व्याकरण अभ्यास', icon: SpellCheck },
    assemble: { label: 'वाक्य-संरचना', icon: Blocks },
    formats: { label: 'प्रारूप-जाँच', icon: ClipboardCheck },
    rct: { label: 'साहित्य (पंक्ति-बोध)', icon: BookOpen },
    vocab: { label: 'शब्द-भंडार', icon: Lightbulb },
  },
}

export default function LanguageGym() {
  const [subject, setSubject] = useState<LangSubject>('en')
  const [bandKey, setBandKey] = useState('en9')
  const [chapterKey, setChapterKey] = useState<string | null>(null)
  const [topicKey, setTopicKey] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('drills')
  const [explored, setExplored] = useState<Set<string>>(new Set())

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

  const bands = bandsFor(subject)
  const band: LangClassBand = bands.find(b => b.key === bandKey) ?? bands[0]
  const chapter: LangChapter = band.chapters.find(c => c.key === chapterKey) ?? band.chapters[0]
  const topic: LangTopic | undefined = chapter?.topics.find(tp => tp.key === topicKey) ?? chapter?.topics[0]

  const pickSubject = (s: LangSubject) => {
    setSubject(s)
    const first = bandsFor(s)[0]
    setBandKey(first.key)
    setChapterKey(first.chapters[0].key)
    setTopicKey(first.chapters[0].topics[0]?.key ?? null)
  }

  const pickBand = (b: LangClassBand) => {
    setBandKey(b.key)
    setChapterKey(b.chapters[0].key)
    setTopicKey(b.chapters[0].topics[0]?.key ?? null)
  }

  const pickTopic = (tp: LangTopic) => {
    setTopicKey(tp.key)
    markExplored(tp.key)
  }

  const totalTopics = LANGYM_CLASSES.reduce(
    (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)

  const tabs = TAB_META[subject]

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* header: subject + class + chapter + topic pickers, progress chip */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            🗣️ Language Gym
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              grammar drills · assembly · format checkers · RCT · vocabulary
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            practised {explored.size}/{totalTopics} topics
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {(['en', 'hi'] as const).map(s => (
            <button key={s} onClick={() => pickSubject(s)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${s === subject ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {s === 'en' ? 'English' : 'हिंदी'}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {bands.map(b => (
            <button key={b.key} onClick={() => pickBand(b)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${b.key === band.key ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {band.chapters.map(c => (
            <button key={c.key} onClick={() => { setChapterKey(c.key); setTopicKey(c.topics[0]?.key ?? null) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${c.key === chapter.key ? 'bg-amber-500/15 border-amber-400/50 text-amber-200' : 'bg-slate-800/40 border-slate-700/70 text-slate-400 hover:text-slate-200'}`}>
              {c.label}
            </button>
          ))}
        </div>
        {chapter && (
          <div className="flex gap-1.5 flex-wrap mt-1.5">
            {chapter.topics.map(tp => (
              <button key={tp.key} onClick={() => pickTopic(tp)}
                className={`px-2 py-0.5 rounded-md text-[11px] border transition ${topic?.key === tp.key ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : explored.has(tp.key) ? 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-400' : 'bg-slate-800/30 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}>
                {explored.has(tp.key) ? '✓ ' : ''}{tp.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* tab bar */}
      <div className="flex gap-1 px-3 pt-2.5 border-b border-slate-800 bg-slate-900/40 overflow-x-auto">
        {(Object.keys(tabs) as Tab[]).map(k => {
          const meta = tabs[k]
          return (
            <button key={k} onClick={() => setTab(k)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition ${tab === k ? 'border-sky-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
              <meta.icon className="w-3.5 h-3.5" />
              {meta.label}
            </button>
          )
        })}
      </div>

      <div className="p-4">
        {tab === 'drills' && <DrillsTab topic={topic} onPractise={markExplored} />}
        {tab === 'assemble' && <AssemblyTab topic={topic} onPractise={markExplored} />}
        {tab === 'formats' && <FormatTab subject={subject} onPractise={markExplored} />}
        {tab === 'rct' && <RctTab topic={topic} onPractise={markExplored} />}
        {tab === 'vocab' && <VocabTab topic={topic} onPractise={markExplored} />}
      </div>
    </div>
  )
}

// ------------------------------------------------------------ drills tab --

function DrillsTab({ topic, onPractise }: { topic: LangTopic | undefined; onPractise: (k: string) => void }) {
  const nodeId = topic?.nodeId
  const curated: GrammarDrill[] = nodeId ? (GRAMMAR_DRILLS[nodeId] ?? []) : []
  const [runtime, setRuntime] = useState<DiagnosticQuestion[]>([])
  const [loading, setLoading] = useState(false)

  // authored diagnostics pulled live from the node (remediation.ts)
  useEffect(() => {
    let live = true
    setRuntime([])
    if (!nodeId) return () => { live = false }
    setLoading(true)
    fetchNodeRemediation(nodeId).then(r => {
      if (!live) return
      // only diagnostics that the curated pack does not already carry
      const known = new Set(curated.map(d => normEn(d.q)))
      setRuntime(r.diagnostics.filter(d => !known.has(normEn(d.question))))
      setLoading(false)
    })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId])

  if (!topic) return <EmptyPick />
  return (
    <div className="space-y-4">
      <p className="text-[11px] text-slate-500">
        Answer, then read the authored wrong-answer clause — it names the exact
        misconception the examiner expects you to dodge.
      </p>
      {curated.map((d, i) => (
        <CuratedDrill key={`${topic.key}-${i}`} drill={d} onRight={() => onPractise(topic.key)} />
      ))}
      {loading && <p className="text-xs text-slate-400 py-1">loading authored diagnostics…</p>}
      {runtime.map((d, i) => (
        <RuntimeDrill key={`rt-${i}`} q={d} nodeId={nodeId} onRight={() => onPractise(topic.key)} />
      ))}
      {!curated.length && !loading && !runtime.length && (
        <p className="text-xs text-slate-500 py-2">
          No authored drill items bundled for this topic — the corpus node may
          still serve diagnostics when the enrichment API is reachable.
        </p>
      )}
    </div>
  )
}

function CuratedDrill({ drill, onRight }: { drill: GrammarDrill; onRight: () => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const [diag, setDiag] = useState<Diagnosis | null>(null)
  const [done, setDone] = useState<'right' | 'wrong' | null>(null)
  const mcq = drill.options.length > 0 && drill.correct !== undefined

  const checkTyped = () => {
    const subjectGuess = /[\u0900-\u097F]/.test(drill.answer) ? 'hi' : 'en'
    const ok = accepted(typed, drill.accept ?? [drill.answer], subjectGuess)
    finish(ok)
  }

  const finish = (ok: boolean) => {
    setDone(ok ? 'right' : 'wrong')
    if (ok) onRight()
    else diagnose(undefined, drill.wrongClause).then(setDiag)
  }

  const pick = (i: number) => {
    if (done) return
    setPicked(i)
    finish(i === drill.correct)
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 px-3 py-2.5">
      <p className="text-sm text-slate-200 font-semibold">{drill.q}</p>
      {mcq ? (
        <div className="mt-2 grid sm:grid-cols-2 gap-1.5">
          {drill.options.map((o, i) => (
            <button key={i} onClick={() => pick(i)} disabled={!!done}
              className={`text-left px-2.5 py-1.5 rounded-lg text-xs border transition ${done && i === drill.correct ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200'
                : picked === i && done === 'wrong' ? 'bg-rose-500/15 border-rose-400/50 text-rose-200'
                  : 'bg-slate-800/70 border-slate-600 text-slate-300 hover:border-slate-400'}`}>
              {o}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-2 flex gap-1.5">
          <input value={typed} onChange={e => setTyped(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !done) checkTyped() }}
            dir="auto"
            className="flex-1 rounded-lg bg-slate-800/70 border border-slate-600 px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-sky-400"
            placeholder="your answer…" />
          <button onClick={checkTyped} disabled={!!done || !typed.trim()}
            className="px-3 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs">
            Check
          </button>
        </div>
      )}
      {done === 'right' && (
        <p className="mt-2 text-xs text-emerald-300 font-bold">✓ Correct — {drill.answer}</p>
      )}
      {done === 'wrong' && (
        <div className="mt-2">
          {diag?.clause && (
            <p className="rounded-lg bg-rose-500/10 border border-rose-400/30 px-2.5 py-1.5 text-xs text-rose-200 leading-relaxed">
              {diag.clause}
            </p>
          )}
          <p className="mt-1.5 text-[11px] text-slate-400">
            Authored answer: <span className="text-slate-200 font-semibold">{drill.answer}</span>
          </p>
        </div>
      )}
      <Panel diag={done === 'wrong' ? diag : null} />
    </div>
  )
}

function RuntimeDrill({ q, nodeId, onRight }:
  { q: DiagnosticQuestion; nodeId?: string; onRight: () => void }) {
  const [typed, setTyped] = useState('')
  const [picked, setPicked] = useState<string | null>(null)
  const [done, setDone] = useState<'right' | 'wrong' | null>(null)
  const [diag, setDiag] = useState<Diagnosis | null>(null)

  const subjectGuess = /[\u0900-\u097F]/.test(q.question) ? 'hi' : 'en'
  const finish = (ok: boolean, missed?: string) => {
    setDone(ok ? 'right' : 'wrong')
    if (ok) onRight()
    else diagnose(nodeId, undefined, missed ?? q.question).then(setDiag)
  }

  const pickOption = (o: string) => {
    if (done) return
    setPicked(o)
    finish(accepted(o, [q.answer ?? ''], subjectGuess), q.question ?? undefined)
  }

  return (
    <div className="rounded-xl border border-dashed border-slate-600 bg-slate-800/30 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-sky-300/70 font-black mb-1">
        authored diagnostic · corpus node
      </p>
      <p className="text-sm text-slate-200 font-semibold">{q.question}</p>
      {q.options.length >= 2 ? (
        <div className="mt-2 grid sm:grid-cols-2 gap-1.5">
          {q.options.map((o, i) => (
            <button key={i} onClick={() => pickOption(o)} disabled={!!done}
              className={`text-left px-2.5 py-1.5 rounded-lg text-xs border transition ${done === 'right' && picked === o ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200'
                : done === 'wrong' && picked === o ? 'bg-rose-500/15 border-rose-400/50 text-rose-200'
                  : 'bg-slate-800/70 border-slate-600 text-slate-300 hover:border-slate-400'}`}>
              {o}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-2 flex gap-1.5">
          <input value={typed} onChange={e => setTyped(e.target.value)}
            dir="auto"
            className="flex-1 rounded-lg bg-slate-800/70 border border-slate-600 px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-sky-400"
            placeholder="your answer…" />
          <button onClick={() => finish(accepted(typed, [q.answer ?? ''], subjectGuess), q.question ?? undefined)}
            disabled={!!done || !typed.trim()}
            className="px-3 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs">
            Check
          </button>
        </div>
      )}
      {done && (
        <p className="mt-2 text-[11px] text-slate-400">
          {done === 'right' ? '✓ ' : 'Authored answer: '}
          <span className={done === 'right' ? 'text-emerald-300 font-bold' : 'text-slate-200 font-semibold'}>{q.answer}</span>
        </p>
      )}
      <Panel diag={done === 'wrong' ? diag : null} />
    </div>
  )
}

// --------------------------------------------------------- assembly tab --

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function AssemblyTab({ topic, onPractise }: { topic: LangTopic | undefined; onPractise: (k: string) => void }) {
  const nodeId = topic?.nodeId
  const puzzles: AssemblyPuzzle[] = nodeId ? (SENTENCE_ASSEMBLY[nodeId] ?? []) : []
  const [idx, setIdx] = useState(0)
  const puzzle = puzzles[Math.min(idx, Math.max(0, puzzles.length - 1))]

  // answer strip + token pool state, reset when the puzzle changes
  const [strip, setStrip] = useState<string[]>([])
  const [checked, setChecked] = useState<null | boolean>(null)
  const [diag, setDiag] = useState<Diagnosis | null>(null)

  const pool = useMemo(() => {
    if (!puzzle) return []
    let s = 7
    let shuffled = seededShuffle(puzzle.tokens, s)
    // never present the pre-solved order by accident
    while (shuffled.join('|') === puzzle.answer.join('|')) shuffled = seededShuffle(puzzle.tokens, ++s)
    return shuffled
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle])

  useEffect(() => { setStrip([]); setChecked(null); setDiag(null) }, [puzzle])

  if (!topic || !puzzle) {
    return (
      <div>
        <EmptyPick />
        <p className="text-xs text-slate-500 mt-2">
          Assembly puzzles are authored for the sentence-transformation and
          पद-क्रम strands — pick those grammar chapters.
        </p>
      </div>
    )
  }

  // pool tokens not yet placed on the strip (multiset-aware, so duplicated
  // tokens appear the right number of times)
  const remaining: string[] = []
  {
    const stripCount = new Map<string, number>()
    for (const tk of strip) stripCount.set(tk, (stripCount.get(tk) ?? 0) + 1)
    const seen = new Map<string, number>()
    for (const tk of pool) {
      const used = stripCount.get(tk) ?? 0
      const n = seen.get(tk) ?? 0
      if (n >= used) remaining.push(tk)
      seen.set(tk, n + 1)
    }
  }

  const addToken = (tk: string) => {
    if (checked !== null) return
    setStrip(prev => [...prev, tk])
    setChecked(null)
  }
  const removeAt = (i: number) => {
    if (checked !== null) return
    setStrip(prev => prev.filter((_, j) => j !== i))
    setChecked(null)
  }
  const check = () => {
    const subject: LangSubject = /[\u0900-\u097F]/.test(puzzle.answer.join('')) ? 'hi' : 'en'
    const norm = subject === 'hi' ? normHi : normEn
    const ok = strip.length === puzzle.answer.length &&
      strip.every((tk, i) => norm(tk) === norm(puzzle.answer[i]))
    setChecked(ok)
    if (ok) onPractise(topic.key)
    else diagnose(nodeId, puzzle.wrongClause).then(setDiag)
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-200 font-semibold">{puzzle.prompt}</p>

      {/* answer strip */}
      <div className="min-h-[52px] rounded-xl border border-slate-600 bg-slate-800/60 p-2 flex flex-wrap gap-1.5 items-start">
        {strip.length === 0 && (
          <span className="text-[11px] text-slate-500 px-1">click tokens below to build the sentence…</span>
        )}
        {strip.map((tk, i) => (
          <button key={`${tk}-${i}`} onClick={() => removeAt(i)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500/20 border border-sky-400/50 text-sky-100 hover:border-rose-400/60 hover:text-rose-200">
            {tk}
          </button>
        ))}
      </div>

      {/* token pool */}
      <div className="flex flex-wrap gap-1.5">
        {remaining.map((tk, i) => (
          <button key={`${tk}-pool-${i}`} onClick={() => addToken(tk)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 border border-slate-600 text-slate-200 hover:border-amber-400/60">
            {tk}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={check} disabled={strip.length === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs">
          <Play className="w-3.5 h-3.5" />Check order
        </button>
        <button onClick={() => { setStrip([]); setChecked(null); setDiag(null) }}
          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 font-bold text-xs">
          Reset
        </button>
        {puzzles.length > 1 && (
          <button onClick={() => setIdx((idx + 1) % puzzles.length)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 font-bold text-xs">
            Next puzzle ({idx + 1}/{puzzles.length})
          </button>
        )}
      </div>

      {checked === true && (
        <p className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-300 font-bold">
          ✓ Assembled correctly — {puzzle.answer.join(' ')}
        </p>
      )}
      {checked === false && (
        <div className="space-y-2">
          <p className="rounded-xl border border-rose-500/25 bg-rose-500/5 px-3 py-2 text-xs text-rose-200">
            Not the authored order yet.
          </p>
          <div className="rounded-xl border border-slate-600 bg-slate-800/40 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-amber-300/80 font-black mb-1">authored rule</p>
            <p className="text-xs text-slate-300 leading-relaxed">{puzzle.rule}</p>
          </div>
        </div>
      )}
      <Panel diag={checked === false ? diag : null} />
    </div>
  )
}

// ----------------------------------------------------------- formats tab --

function FormatTab({ subject, onPractise }: { subject: LangSubject; onPractise: (k: string) => void }) {
  const specs = FORMAT_SPECS.filter(s => s.lang === subject)
  const [specId, setSpecId] = useState(specs[0].id)
  const spec: FormatSpec = specs.find(s => s.id === specId) ?? specs[0]
  const [draft, setDraft] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [diag, setDiag] = useState<Diagnosis | null>(null)

  useEffect(() => { setDraft(''); setSubmitted(false); setDiag(null) }, [specId])

  const fieldHits = spec.fields.map(f => ({
    spec: f,
    hit: f.patterns.some(re => re.test(draft)),
  }))
  const wHits = (spec.wChecks ?? []).map(w => ({
    ...w,
    hit: w.patterns.some(re => re.test(draft)),
  }))
  const score = fieldHits.filter(h => h.hit).reduce((s, h) => s + h.spec.marks, 0)
  const total = spec.fields.reduce((s, f) => s + f.marks, 0)

  const submit = () => {
    setSubmitted(true)
    if (score >= total) onPractise(`fmt-${spec.id}`)
    else diagnose(spec.nodeId, undefined).then(setDiag)
  }

  return (
    <div className="grid md:grid-cols-[1fr_280px] gap-4">
      <div>
        <div className="flex gap-1.5 flex-wrap mb-2">
          {specs.map(s => (
            <button key={s.id} onClick={() => setSpecId(s.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${s.id === spec.id ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {s.title}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
          <span className="font-black text-slate-300">Given situation: </span>
          {spec.task}
        </p>
        <textarea value={draft} onChange={e => { setDraft(e.target.value); setSubmitted(false) }}
          dir={spec.lang === 'hi' ? 'auto' : 'ltr'} rows={14}
          className="w-full rounded-xl bg-slate-800/70 border border-slate-600 px-3 py-2 text-sm text-white leading-relaxed focus:outline-none focus:border-sky-400"
          placeholder={spec.lang === 'hi' ? 'यहाँ अपना प्रारूप लिखिए…' : 'draft here…'} />
        <div className="flex items-center gap-2 mt-2">
          <button onClick={submit} disabled={!draft.trim()}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs">
            Check format ({score}/{total})
          </button>
          <details className="flex-1">
            <summary className="cursor-pointer text-[11px] font-bold text-amber-300/90 hover:text-amber-200">
              reveal authored model answer
            </summary>
            <pre dir={spec.lang === 'hi' ? 'auto' : 'ltr'}
              className="mt-1.5 whitespace-pre-wrap rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-100 leading-relaxed">
              {spec.model}
            </pre>
          </details>
        </div>
        <Panel diag={submitted && score < total ? diag : null} />
      </div>

      {/* live format checklist */}
      <div className="space-y-1.5">
        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black">live format check</p>
        {fieldHits.map(h => (
          <div key={h.spec.id}
            className={`flex items-start gap-1.5 rounded-lg px-2 py-1.5 text-[11px] border ${h.hit ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
            <span>{h.hit ? '✓' : '○'}</span>
            <span className="leading-snug">{h.spec.label} <span className="text-slate-500">(+{h.spec.marks})</span></span>
          </div>
        ))}
        {wHits.length > 0 && (
          <>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black mt-2">
              {spec.lang === 'hi' ? 'पाँच-प्रश्न जाँच (body)' : 'five-W check (body)'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {wHits.map(w => (
                <span key={w.id}
                  className={`px-2 py-1 rounded-md text-[10px] font-black border ${w.hit ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
                  {w.hit ? '✓ ' : ''}{w.label}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// --------------------------------------------------------------- RCT tab --

function RctTab({ topic, onPractise }: { topic: LangTopic | undefined; onPractise: (k: string) => void }) {
  const subject: LangSubject = /[\u0900-\u097F]/.test(topic?.label ?? '') || topic?.key.startsWith('hi') ? 'hi' : 'en'
  const direct = topic?.nodeId ? (RCT_PACKS[topic.nodeId] ?? []) : []
  // always give the trainer a usable quote bank for the subject (closed-world)
  const bank: { nodeId: string; item: RctItem }[] = useMemo(() => {
    if (direct.length && topic?.nodeId) {
      return direct.map(item => ({ nodeId: topic.nodeId, item }))
    }
    const out: { nodeId: string; item: RctItem }[] = []
    for (const [nid, items] of Object.entries(RCT_PACKS)) {
      const isHi = /[\u0900-\u097F]/.test(items[0]?.quote ?? '')
      if ((subject === 'hi') === isHi) out.push(...items.map(item => ({ nodeId: nid, item })))
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic?.nodeId, subject])

  const [i, setI] = useState(0)
  const current = bank[Math.min(i, Math.max(0, bank.length - 1))]

  useEffect(() => { setI(0) }, [topic?.nodeId])

  if (!current) return <EmptyPick />
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-slate-500">
        {direct.length
          ? 'Reference-to-context drills from this literature node — quotes are verbatim corpus quotations.'
          : 'Subject quote bank — pick the literature chapters above to bind drills to their own nodes.'}
      </p>
      <RctCard key={`${current.nodeId}-${i}`} nodeId={current.nodeId} item={current.item}
        onRight={() => onPractise(topic?.key ?? `rct-${current.nodeId}`)} />
      {bank.length > 1 && (
        <button onClick={() => setI((i + 1) % bank.length)}
          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 font-bold text-xs">
          Next quote ({i + 1}/{bank.length})
        </button>
      )}
    </div>
  )
}

function RctCard({ nodeId, item, onRight }: { nodeId: string; item: RctItem; onRight: () => void }) {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState<null | boolean>(null)
  const [diag, setDiag] = useState<Diagnosis | null>(null)
  const isHi = /[\u0900-\u097F]/.test(item.quote)
  const subject: LangSubject = isHi ? 'hi' : 'en'

  const check = () => {
    const ok = accepted(typed, item.accept, subject)
    setDone(ok)
    if (ok) onRight()
    else diagnose(nodeId, item.wrongClause).then(setDiag)
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 overflow-hidden">
      <blockquote dir="auto"
        className="px-4 pt-3 pb-2 border-l-4 border-amber-400/70 bg-slate-900/60">
        <p className={`text-amber-100 leading-relaxed ${isHi ? 'text-base' : 'text-sm italic font-serif'}`}>
          “{item.quote}”
        </p>
      </blockquote>
      <div className="px-4 py-3">
        <p className="text-sm text-slate-200 font-semibold">{item.question}</p>
        <div className="mt-2 flex gap-1.5">
          <input value={typed} onChange={e => setTyped(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && done === null) check() }}
            dir="auto"
            className="flex-1 rounded-lg bg-slate-800/70 border border-slate-600 px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-sky-400"
            placeholder={isHi ? 'उत्तर लिखिए…' : 'your answer…'} />
          <button onClick={check} disabled={done !== null || !typed.trim()}
            className="px-3 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs">
            Check
          </button>
        </div>
        {done !== null && (
          <div className="mt-2 space-y-1.5">
            <p className={`text-xs font-bold ${done ? 'text-emerald-300' : 'text-rose-300'}`}>
              {done ? `✓ Accepted (+${item.marks})` : 'Not quite — compare with the authored answer:'}
            </p>
            <p dir="auto" className="text-xs text-slate-300 leading-relaxed">{item.answer}</p>
          </div>
        )}
        <Panel diag={done === false ? diag : null} />
      </div>
    </div>
  )
}

// ------------------------------------------------------------- vocab tab --

function VocabTab({ topic, onPractise }: { topic: LangTopic | undefined; onPractise: (k: string) => void }) {
  const subject: LangSubject = topic?.key.startsWith('hi') ? 'hi' : 'en'
  const direct = topic?.nodeId ? (VOCAB_PACKS[topic.nodeId] ?? []) : []
  const bank: { nodeId: string; item: VocabItem }[] = useMemo(() => {
    if (direct.length && topic?.nodeId) {
      return direct.map(item => ({ nodeId: topic.nodeId, item }))
    }
    const out: { nodeId: string; item: VocabItem }[] = []
    for (const [nid, items] of Object.entries(VOCAB_PACKS)) {
      const isHi = /[\u0900-\u097F]/.test(items[0]?.prompt ?? '')
      if ((subject === 'hi') === isHi) out.push(...items.map(item => ({ nodeId: nid, item })))
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic?.nodeId, subject])

  if (!bank.length) return <EmptyPick />
  return (
    <div className="space-y-2.5">
      {!direct.length && (
        <p className="text-[11px] text-slate-500">
          Subject word-bank — pick the शब्द-भंडार / functional-grammar chapters to bind these to their nodes.
        </p>
      )}
      {bank.map(({ nodeId, item }, k) => (
        <VocabCard key={`${nodeId}-${k}`} nodeId={nodeId} item={item}
          onRight={() => onPractise(topic?.key ?? `vocab-${nodeId}`)} />
      ))}
    </div>
  )
}

function VocabCard({ nodeId, item, onRight }: { nodeId: string; item: VocabItem; onRight: () => void }) {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState<null | boolean>(null)
  const [diag, setDiag] = useState<Diagnosis | null>(null)
  const isHi = /[\u0900-\u097F]/.test(item.prompt)
  const subject: LangSubject = isHi ? 'hi' : 'en'

  const check = () => {
    const ok = accepted(typed, item.accept, subject)
    setDone(ok)
    if (ok) onRight()
    else diagnose(nodeId, item.wrongClause).then(setDiag)
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 px-3 py-2.5">
      <p className="text-sm text-slate-200 font-semibold">{item.prompt}</p>
      <div className="mt-1.5 flex gap-1.5">
        <input value={typed} onChange={e => setTyped(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && done === null) check() }}
          dir="auto"
          className="flex-1 rounded-lg bg-slate-800/70 border border-slate-600 px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-sky-400"
          placeholder={isHi ? 'उत्तर…' : 'answer…'} />
        <button onClick={check} disabled={done !== null || !typed.trim()}
          className="px-3 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs">
          Check
        </button>
      </div>
      {done !== null && (
        <p className="mt-1.5 text-[11px] leading-relaxed">
          <span className={`font-black ${done ? 'text-emerald-300' : 'text-amber-300'}`}>
            {done ? '✓ ' : 'Note: '}
          </span>
          <span className="text-slate-300">{item.note}</span>
        </p>
      )}
      <Panel diag={done === false ? diag : null} />
    </div>
  )
}

// ---------------------------------------------------------------- shared --

function EmptyPick() {
  return (
    <p className="text-xs text-slate-500 py-2">
      Pick a chapter and topic above — every exercise is authored from the
      class-wise language corpus.
    </p>
  )
}

/**
 * Central wiring happens post-hoc in app/(student)/sandbox/page.tsx
 * (concurrent agents own that file). This tab config is the contract:
 *   const LANGUAGE_GYM = dynamic(() => import('…/LanguageGym'), …)
 *   // then register { id: 'langym', label, component }
 */
export const LANGUAGE_GYM_TAB = {
  id: 'langym',
  label: '🗣️ Language Gym',
  component: LanguageGym,
} as const
