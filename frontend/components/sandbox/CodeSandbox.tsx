'use client'

/**
 * CodeSandbox — the E8 Code Runtime tab of /sandbox (SANDBOX_TAXONOMY.md
 * engine type 8), for Computer Studies 6-8, Computer Applications 9-10 and
 * the language-neutral CS 11-12 topics.
 *
 * Engine: write/arrange code → run → output + variable-state TRACE TABLE
 * (the teaching core — the corpus's c8_compst_icse_03_005 chapter is
 * literally the dry-run table). All execution is the deterministic
 * Java-subset interpreter in codeTrace.ts — no LLM, no network solve.
 *
 * Closed-world misconception loop: any compile error, runtime exception,
 * infinite-loop stop, or a wrong output prediction pulls the AUTHORED
 * corpus content for the selected topic's node (ICSE nodes via the
 * sandbox's /api/sandbox/code-node parser; CBSE c11/c12_cs nodes via the
 * standard enrichment endpoint) into MisconceptionPanel. Nothing is ever
 * invented — a node without authored text renders no panel.
 *
 * TABS
 *   Run & Trace  — editor + sample inputs + output + step-through dry-run table
 *   Predict      — trace trainer: predict the output, the engine is the mark scheme
 *   Error Clinic — compile vs runtime vs logical classification drills
 *   Flowchart    — classes 6-8: drag symbols, execute step by step (lazy)
 *
 * WIRING NOTE: app/(student)/sandbox/page.tsx is intentionally NOT touched
 * (concurrent agents); central wiring happens post-hoc via the exported
 * CODE_SANDBOX_TAB config below.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Bug, Play, FlaskConical, GitBranch, Terminal } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment } from '@/components/learn/remediation'
import { runJava, evalConditionText, evalExprText, type RunResult } from './codeTrace'
import { CODE_SANDBOX_CLASSES, fetchCodeNode, type CodeClassBand, type CodeTopic } from './codeTopics'

const FlowchartBench = dynamic(() => import('./FlowchartBench'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-xs text-slate-500">
      loading the flowchart bench…
    </div>
  ),
})

// ------------------------------------------------------- remediation layer

interface TopicMisconception {
  misconception: string | null
  commonMisconception: string | null
}

/**
 * Authored remediation for a topic — ICSE corpus nodes through the
 * sandbox parser, CBSE enhanced nodes through the enrichment endpoint.
 */
async function loadMisconception(topic: CodeTopic | undefined): Promise<TopicMisconception> {
  if (!topic) return { misconception: null, commonMisconception: null }
  if (topic.enhancedNodeId) {
    const d = await fetchEnrichment(topic.enhancedNodeId)
    return {
      misconception: d?.diagnostic_questions?.find(q => q.misconception_if_wrong)?.misconception_if_wrong ?? null,
      commonMisconception: d?.common_misconception ?? null,
    }
  }
  if (topic.nodeId) {
    const d = await fetchCodeNode(topic.nodeId)
    if (!d?.found) return { misconception: null, commonMisconception: null }
    const clause = d.wrong_answer_clauses?.[0] ?? d.misconceptions?.[0] ?? null
    return { misconception: clause, commonMisconception: d.common_misconception ?? null }
  }
  return { misconception: null, commonMisconception: null }
}

// ------------------------------------------------------------------ shell

type Tab = 'run' | 'predict' | 'clinic' | 'flowchart'

const PROGRESS_KEY = 'code_sandbox_explored_v1'

export default function CodeSandbox() {
  const [bandKey, setBandKey] = useState('c9')
  const [chapterKey, setChapterKey] = useState('c9_ch3')
  const [topicKey, setTopicKey] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('run')
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

  const band = CODE_SANDBOX_CLASSES.find(b => b.key === bandKey) ?? CODE_SANDBOX_CLASSES[0]
  const chapter = band.chapters.find(c => c.key === chapterKey) ?? band.chapters[0]
  const topic = chapter.topics.find(t => t.key === topicKey) ?? null

  const pickBand = (b: CodeClassBand) => {
    setBandKey(b.key)
    setChapterKey(b.chapters[0].key)
    setTopicKey(null)
    setTab(b.engine === 'flowchart' ? 'flowchart' : 'run')
  }
  const pickTopic = (tp: CodeTopic) => {
    setTopicKey(tp.key)
    markExplored(tp.key)
    setTab(tp.clinic?.length && !tp.predict && !tp.starter && band.engine !== 'flowchart' ? 'clinic' : band.engine === 'flowchart' ? 'flowchart' : 'run')
  }

  const totalTopics = CODE_SANDBOX_CLASSES.reduce(
    (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)

  const tabs: { key: Tab; label: string; icon: typeof Play }[] = [
    { key: 'run', label: 'Run & Trace', icon: Terminal },
    { key: 'predict', label: 'Predict the Output', icon: FlaskConical },
    { key: 'clinic', label: 'Error Clinic', icon: Bug },
    ...(band.engine === 'flowchart' ? [{ key: 'flowchart' as Tab, label: 'Flowchart Bench', icon: GitBranch }] : []),
  ]

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* header: class + chapter + topic pickers, progress chip */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            💻 Code Runtime
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              java-subset interpreter · trace tables · error clinic
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            explored {explored.size}/{totalTopics} topics
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {CODE_SANDBOX_CLASSES.map(b => (
            <button key={b.key} onClick={() => pickBand(b)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${b.key === bandKey ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {band.chapters.map(c => (
            <button key={c.key} onClick={() => { setChapterKey(c.key); setTopicKey(null) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${c.key === chapterKey ? 'bg-amber-500/15 border-amber-400/50 text-amber-200' : 'bg-slate-800/40 border-slate-700/70 text-slate-400 hover:text-slate-200'}`}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {chapter.topics.map(tp => (
            <button key={tp.key} onClick={() => pickTopic(tp)}
              className={`px-2 py-0.5 rounded-md text-[11px] border transition ${topic?.key === tp.key ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : explored.has(tp.key) ? 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-400' : 'bg-slate-800/30 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}>
              {explored.has(tp.key) ? '✓ ' : ''}{tp.label}
            </button>
          ))}
        </div>
      </div>

      {/* tab bar */}
      <div className="flex gap-1 px-3 pt-2.5 border-b border-slate-800 bg-slate-900/40 overflow-x-auto">
        {tabs.map(tb => (
          <button key={tb.key} onClick={() => setTab(tb.key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition ${tab === tb.key ? 'border-sky-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <tb.icon className="w-3.5 h-3.5" />
            {tb.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'flowchart' && band.engine === 'flowchart'
          ? <FlowchartBench nodeId={topic?.nodeId ?? chapter.nodeId} onActivity={() => topic && markExplored(topic.key)} />
          : <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
            <div className="min-w-0">
              <EditorPane
                key={`${chapterKey}-${topicKey}-${tab}`}
                band={band} topic={topic} tab={tab}
                onExplored={() => topic && markExplored(topic.key)} />
            </div>
            <div className="min-w-0">
              <RunPane band={band} topic={topic} tab={tab}
                onExplored={() => topic && markExplored(topic.key)} />
            </div>
          </div>}
      </div>
    </div>
  )
}

// ------------------------------------------------------------ editor pane

function EditorPane({ band, topic, tab, onExplored }: {
  band: CodeClassBand; topic: CodeTopic | null; tab: Tab; onExplored: () => void
}) {
  if (tab === 'predict') {
    if (!topic?.predict) {
      return <TopicPrompt topic={topic} text="This topic has no prediction drill — pick a topic that shows one, or use Run & Trace to write your own." />
    }
    return (
      <div>
        <PaneTitle text="Predict the output BEFORE running — the dry-run table is your rough work" />
        {topic.predict.note && (
          <p className="text-[11px] text-amber-200/80 bg-amber-500/5 border border-amber-400/20 rounded-lg px-2.5 py-1.5 mb-2">
            {topic.predict.note}
          </p>
        )}
        <pre className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-[12px] leading-relaxed font-mono text-slate-200 overflow-x-auto whitespace-pre">{topic.predict.code}</pre>
        {topic.predict.inputs?.length ? (
          <p className="text-[11px] text-slate-400 mt-1.5">
            sample inputs: <span className="font-mono text-slate-300">{topic.predict.inputs.join(' ⏎ ')}</span>
          </p>
        ) : null}
        <p className="text-[10px] text-slate-500 mt-2">Your prediction goes in the right pane — press Reveal to let the engine mark it.</p>
      </div>
    )
  }
  if (tab === 'clinic') {
    if (!topic?.clinic?.length) {
      return <TopicPrompt topic={topic} text="No bug specimens for this topic — the Error Clinic grows with topics that list them." />
    }
    return (
      <div>
        <PaneTitle text="Three error families: compile-time (the compiler refuses) · runtime (the JVM crashes) · logical (it runs, but the answer is wrong)" />
        <ClinicList topic={topic} band={band} onExplored={onExplored} />
      </div>
    )
  }
  if (tab === 'flowchart') {
    return null
  }
  return (
    <div>
      <PaneTitle text={band.engine === 'java'
        ? 'Write Java-subset code (System.out.println, if/else, loops, methods, arrays, Scanner) — the interpreter traces every line'
        : 'Simple programs — int boxes, arithmetic, println, small loops (the flowchart Bench tab builds diagrams)'} />
      <p className="text-[10px] text-slate-500 mt-2">
        Press Run (right pane). Deterministic sandbox: Math.random() draws a fixed sequence, Scanner reads from your sample inputs, runaway loops are stopped at the step limit.
      </p>
    </div>
  )
}

function PaneTitle({ text }: { text: string }) {
  return <p className="text-[11px] uppercase tracking-wider text-slate-500 font-black mb-2">{text}</p>
}

function TopicPrompt({ topic, text }: { topic: CodeTopic | null; text: string }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 px-3 py-3">
      <p className="text-xs text-slate-400">{text}</p>
      {!topic && <p className="text-[11px] text-slate-500 mt-1.5">No topic selected yet — pick one from the chips above.</p>}
    </div>
  )
}

// --------------------------------------------------------------- run pane

/** The Run tab: editor + inputs (left) and output + trace (right). */
function RunPane({ band, topic, tab, onExplored }: {
  band: CodeClassBand; topic: CodeTopic | null; tab: Tab; onExplored: () => void
}) {
  if (tab === 'flowchart') return null
  return (
    <div>
      {tab === 'run' && <RunWorkbench band={band} topic={topic} onExplored={onExplored} />}
      {tab === 'predict' && <PredictWorkbench topic={topic} onExplored={onExplored} />}
      {tab === 'clinic' && <div />}
    </div>
  )
}

// ------------------------------------------------------- run & trace bench

function RunWorkbench({ topic, onExplored }: {
  band?: CodeClassBand; topic: CodeTopic | null; onExplored: () => void
}) {
  const [code, setCode] = useState(topic?.starter ?? 'System.out.println("Hello Atlas");')
  const [inputs, setInputs] = useState((topic?.inputs ?? []).join('\n'))
  const [res, setRes] = useState<RunResult | null>(null)
  const [miscon, setMiscon] = useState<TopicMisconception>({ misconception: null, commonMisconception: null })
  const [stepIdx, setStepIdx] = useState(0)
  const topicKey = useRef(topic?.key)

  useEffect(() => {
    if ((topic?.key ?? null) !== topicKey.current) {
      topicKey.current = topic?.key ?? null
      setCode(topic?.starter ?? 'System.out.println("Hello Atlas");')
      setInputs((topic?.inputs ?? []).join('\n'))
      setRes(null)
      setMiscon({ misconception: null, commonMisconception: null })
    }
  }, [topic])

  const run = async () => {
    const inputList = inputs.split('\n').map(s => s.trimEnd()).filter(s => s.length > 0)
    const r = runJava(code, inputList, { trace: true })
    setRes(r)
    setStepIdx(0)
    onExplored()
    if (!r.ok) setMiscon(await loadMisconception(topic ?? undefined))
    else setMiscon({ misconception: null, commonMisconception: null })
  }

  const err = res?.error ?? null
  const rows = res?.trace ?? []
  const selRow = rows.length ? rows[Math.min(stepIdx, rows.length - 1)] : null
  const varNames = useMemo(() => {
    const names: string[] = []
    for (const row of rows) {
      for (const v of row.vars) if (!names.includes(v.name)) names.push(v.name)
    }
    return names
  }, [rows])

  return (
    <div data-testid="code-run-bench">
      <div className="flex items-center gap-2 mb-1.5">
        <button onClick={run}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm flex items-center gap-1.5">
          <Play className="w-4 h-4" />Run
        </button>
        {res && <span className="text-[10px] text-slate-500 font-mono">{res.steps} steps · {rows.length} trace rows</span>}
      </div>
      <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-black mb-1">
        program
        <textarea value={code} onChange={e => setCode(e.target.value)} rows={14} spellCheck={false}
          className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-[12px] leading-relaxed font-mono text-slate-100 focus:outline-none focus:border-sky-400 resize-y" />
      </label>
      <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-black mb-1">
        sample inputs (one per line — Scanner reads them in order)
        <textarea value={inputs} onChange={e => setInputs(e.target.value)} rows={2} spellCheck={false}
          className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-[12px] font-mono text-emerald-200 focus:outline-none focus:border-sky-400 resize-y" />
      </label>

      {/* output */}
      <div className="mt-3">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black mb-1">output</p>
        <pre data-testid="code-output"
          className="rounded-xl bg-black/60 border border-slate-700 px-3 py-2.5 text-[12px] font-mono text-emerald-300 whitespace-pre-wrap min-h-[44px]">
          {res === null ? '— run the program to see its output —'
            : res.stdout.length ? res.stdout : '(no output printed)'}
        </pre>
      </div>

      {err && (
        <div className={`mt-2 rounded-xl border px-3 py-2 ${err.kind === 'compile' ? 'border-rose-400/40 bg-rose-500/10' : err.kind === 'runtime' ? 'border-amber-400/40 bg-amber-500/10' : 'border-fuchsia-400/40 bg-fuchsia-500/10'}`}>
          <p className="text-[10px] uppercase tracking-wider font-black mb-0.5">
            <span className={err.kind === 'compile' ? 'text-rose-300' : err.kind === 'runtime' ? 'text-amber-300' : 'text-fuchsia-300'}>
              {err.kind === 'compile' ? 'compile-time error — the program never started'
                : err.kind === 'runtime' ? `runtime error${err.javaName ? ` — ${err.javaName}` : ''}`
                  : 'run stopped by the sandbox'}
            </span>
            {err.line ? <span className="text-slate-400 ml-2">line {err.line}</span> : null}
          </p>
          <p className="text-xs text-slate-200 leading-relaxed">{err.message}</p>
        </div>
      )}
      {res?.traceTruncated && (
        <p className="text-[11px] text-fuchsia-300/90 mt-1.5">
          trace table truncated at {rows.length} rows — the run itself continued.
        </p>
      )}

      {/* trace table — the teaching core */}
      {rows.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black">
              dry-run trace table — variable state after every executed line
            </p>
            <label className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              step {Math.min(stepIdx + 1, rows.length)}/{rows.length}
              <input type="range" min={0} max={Math.max(0, rows.length - 1)} value={Math.min(stepIdx, rows.length - 1)}
                onChange={e => setStepIdx(Number(e.target.value))} className="w-28 accent-emerald-400" />
            </label>
          </div>
          <div className="overflow-auto rounded-xl border border-slate-700 max-h-64">
            <table className="w-full text-[11px] font-mono border-collapse">
              <thead className="sticky top-0">
                <tr className="bg-slate-800 text-slate-300">
                  <th className="px-2 py-1 text-left font-bold border-b border-slate-700">#</th>
                  <th className="px-2 py-1 text-left font-bold border-b border-slate-700">line</th>
                  {varNames.map(n => (
                    <th key={n} className="px-2 py-1 text-left font-bold border-b border-slate-700">{n}</th>
                  ))}
                  <th className="px-2 py-1 text-left font-bold border-b border-slate-700">output so far</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} onClick={() => setStepIdx(i)}
                    className={`${selRow === row ? 'bg-emerald-500/10' : i % 2 ? 'bg-slate-900/40' : ''} cursor-pointer hover:bg-slate-800/60`}>
                    <td className="px-2 py-1 text-slate-500">{i + 1}</td>
                    <td className="px-2 py-1 text-sky-300">{row.line}</td>
                    {varNames.map(n => {
                      const v = row.vars.find(v => v.name === n)
                      return (
                        <td key={n} className={`px-2 py-1 ${v ? 'text-slate-100' : 'text-slate-700'}`}>
                          {v ? `${v.value}` : '·'}
                        </td>
                      )
                    })}
                    <td className="px-2 py-1 text-emerald-300/80 whitespace-pre-wrap max-w-[180px]">{row.output || '·'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Each row is one executed statement — exactly the dry-run table the corpus teaches: {varNames.length ? `watch ${varNames[0]} change step by step` : 'read the state after each line'}.
          </p>
        </div>
      )}

      <MisconceptionPanel misconception={miscon.misconception} commonMisconception={miscon.commonMisconception} />
    </div>
  )
}

// ---------------------------------------------------------- predict bench

function normOutput(s: string): string {
  return s.split('\n').map(l => l.trim()).join('\n').replace(/\n+$/, '').trim()
}

function PredictWorkbench({ topic, onExplored }: {
  topic: CodeTopic | null; onExplored: () => void
}) {
  const [prediction, setPrediction] = useState('')
  const [verdict, setVerdict] = useState<'idle' | 'correct' | 'wrong' | 'crashed'>('idle')
  const [actual, setActual] = useState<RunResult | null>(null)
  const [miscon, setMiscon] = useState<TopicMisconception>({ misconception: null, commonMisconception: null })
  const topicKey = useRef(topic?.key)

  useEffect(() => {
    if ((topic?.key ?? null) !== topicKey.current) {
      topicKey.current = topic?.key ?? null
      setPrediction('')
      setVerdict('idle')
      setActual(null)
      setMiscon({ misconception: null, commonMisconception: null })
    }
  }, [topic])

  const reveal = async () => {
    if (!topic?.predict) return
    const r = runJava(topic.predict.code, topic.predict.inputs ?? [], { trace: true })
    setActual(r)
    onExplored()
    if (!r.ok) {
      setVerdict('crashed')
      setMiscon(await loadMisconception(topic))
      return
    }
    const ok = normOutput(r.stdout) === normOutput(prediction)
    setVerdict(ok ? 'correct' : 'wrong')
    if (!ok) setMiscon(await loadMisconception(topic))
    else setMiscon({ misconception: null, commonMisconception: null })
  }

  if (!topic?.predict) {
    return <TopicPrompt topic={topic} text="This topic has no prediction drill — open Run & Trace and write one yourself." />
  }

  return (
    <div data-testid="code-predict-bench">
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black mb-1">
        your predicted output (one printed line per line)
      </p>
      <textarea value={prediction} onChange={e => setPrediction(e.target.value)} rows={6} spellCheck={false}
        placeholder={'e.g.\n3\n3.5'}
        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-[12px] font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 resize-y" />
      <button onClick={reveal}
        className="mt-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm">
        Reveal the engine&apos;s answer
      </button>

      {verdict === 'correct' && actual && (
        <div className="mt-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2">
          <p className="text-xs font-black text-emerald-300">Exact match — your dry run is correct.</p>
          <pre className="text-[12px] font-mono text-emerald-200 mt-1 whitespace-pre-wrap">{actual.stdout}</pre>
        </div>
      )}
      {verdict === 'wrong' && actual && (
        <div className="mt-3 space-y-2">
          <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-2">
            <p className="text-xs font-black text-rose-300 mb-1.5">Not the engine&apos;s output — compare line by line:</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-[12px]">
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-black">you predicted</p>
                <pre className="whitespace-pre-wrap text-rose-200">{prediction.trim() || '(nothing)'}</pre>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-black">the engine printed</p>
                <pre className="whitespace-pre-wrap text-emerald-200">{actual.stdout || '(nothing)'}</pre>
              </div>
            </div>
          </div>
          {actual.trace.length > 0 && (
            <TraceMiniTable rows={actual.trace} />
          )}
        </div>
      )}
      {verdict === 'crashed' && actual?.error && (
        <div className="mt-3 rounded-xl border border-amber-400/40 bg-amber-500/10 px-3 py-2">
          <p className="text-xs font-black text-amber-300">
            The drill program itself stops — {actual.error.kind === 'runtime' ? `a runtime error (${actual.error.javaName ?? 'exception'})` : 'a compile error'}: even drills can be read as "what WILL happen?" questions.
          </p>
          <p className="text-[11px] text-slate-300 mt-1">{actual.error.message}</p>
        </div>
      )}

      <MisconceptionPanel misconception={miscon.misconception} commonMisconception={miscon.commonMisconception} />
    </div>
  )
}

/** Compact trace used by the Predict reveal — first 12 rows. */
function TraceMiniTable({ rows }: { rows: { line: number; vars: { name: string; type: string; value: string }[]; output: string }[] }) {
  const [open, setOpen] = useState(true)
  const names: string[] = []
  for (const row of rows) for (const v of row.vars) if (!names.includes(v.name)) names.push(v.name)
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full px-3 py-1.5 text-left text-[10px] uppercase tracking-wider text-slate-400 font-black bg-slate-800/60 hover:text-slate-200">
        {open ? '▾' : '▸'} the engine&apos;s dry-run table ({rows.length} rows)
      </button>
      {open && (
        <div className="overflow-auto max-h-56">
          <table className="w-full text-[11px] font-mono border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300">
                <th className="px-2 py-1 text-left">#</th>
                <th className="px-2 py-1 text-left">line</th>
                {names.map(n => <th key={n} className="px-2 py-1 text-left">{n}</th>)}
                <th className="px-2 py-1 text-left">output so far</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 12).map((row, i) => (
                <tr key={i} className={i % 2 ? 'bg-slate-900/40' : ''}>
                  <td className="px-2 py-1 text-slate-500">{i + 1}</td>
                  <td className="px-2 py-1 text-sky-300">{row.line}</td>
                  {names.map(n => (
                    <td key={n} className="px-2 py-1 text-slate-100">{row.vars.find(v => v.name === n)?.value ?? '·'}</td>
                  ))}
                  <td className="px-2 py-1 text-emerald-300/80 whitespace-pre-wrap">{row.output || '·'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 12 && <p className="px-2 py-1 text-[10px] text-slate-500">+{rows.length - 12} more rows — open Run & Trace for the full table.</p>}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------- error clinic

function ClinicList({ topic, band, onExplored }: {
  topic: CodeTopic; band: CodeClassBand; onExplored: () => void
}) {
  void band
  const [idx, setIdx] = useState(0)
  const [guess, setGuess] = useState<'compile' | 'runtime' | 'logical' | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [run, setRun] = useState<RunResult | null>(null)
  const [miscon, setMiscon] = useState<TopicMisconception>({ misconception: null, commonMisconception: null })
  const bugs = topic.clinic ?? []
  const bug = bugs[Math.min(idx, bugs.length - 1)]

  useEffect(() => { setIdx(0); setGuess(null); setRevealed(false); setRun(null) }, [topic?.key])

  if (!bug) return null

  const reveal = async () => {
    const r = runJava(bug.code, bug.inputs ?? [], { trace: false })
    setRun(r)
    setRevealed(true)
    onExplored()
    const right = guess !== null && guess === bug.bug
    if (!right) setMiscon(await loadMisconception(topic))
    else setMiscon({ misconception: null, commonMisconception: null })
  }

  const KIND_LABEL: Record<'compile' | 'runtime' | 'logical', string> = {
    compile: 'compile-time — javac refuses before anything runs',
    runtime: 'runtime — it compiles, then crashes mid-run',
    logical: 'logical — it runs to the end, quietly prints a wrong answer',
  }

  return (
    <div data-testid="code-clinic">
      <div className="flex gap-1.5 flex-wrap mb-2">
        {bugs.map((b, i) => (
          <button key={i} onClick={() => { setIdx(i); setGuess(null); setRevealed(false); setRun(null) }}
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${i === idx ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
            specimen {i + 1}
          </button>
        ))}
      </div>
      <pre className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-[12px] leading-relaxed font-mono text-slate-200 overflow-x-auto whitespace-pre">{bug.code}</pre>
      <p className="text-[11px] text-slate-400 mt-2">Diagnose it, then run it:</p>
      <div className="flex gap-1.5 flex-wrap mt-1.5">
        {(['compile', 'runtime', 'logical'] as const).map(k => (
          <button key={k} onClick={() => setGuess(k)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${guess === k ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
            {k}
          </button>
        ))}
        <button onClick={reveal}
          className="px-3 py-1 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white font-black text-[11px] ml-auto">
          Run the bug ▶
        </button>
      </div>

      {revealed && run && (
        <div className="mt-3 rounded-xl border border-slate-700 bg-slate-800/40 px-3 py-2.5 space-y-1.5">
          <p className="text-xs font-black text-white">
            {guess === bug.bug
              ? <span className="text-emerald-300">Correct — {KIND_LABEL[bug.bug]}.</span>
              : <span className="text-amber-300">Actually: {KIND_LABEL[bug.bug]}.</span>}
          </p>
          <p className="text-[11px] text-slate-300">
            {run.error
              ? <>The engine reports: <span className="font-mono text-rose-300">{run.error.kind === 'compile' ? 'compile-time error' : run.error.kind === 'runtime' ? run.error.javaName ?? 'runtime exception' : 'step limit'}</span>{run.error.line ? <> (line {run.error.line})</> : null} — {run.error.message}</>
              : <>It compiled and ran to completion, printing: <span className="font-mono text-emerald-300">{run.stdout.trim() || '(nothing)'}</span> — no error anywhere. That silence IS the logical bug.</>}
          </p>
          <p className="text-[11px] text-amber-200/90 bg-amber-500/5 border border-amber-400/20 rounded-lg px-2.5 py-1.5">
            Where to look: {bug.hint}
          </p>
        </div>
      )}
      <MisconceptionPanel misconception={miscon.misconception} commonMisconception={miscon.commonMisconception} />
    </div>
  )
}

// ------------------------------------------------- flowchart condition API
// (exported for FlowchartBench so both engines share Java's arithmetic)

export { evalConditionText, evalExprText }

/** Tab config consumed by the sandbox page wiring (post-hoc integration). */
export const CODE_SANDBOX_TAB = {
  id: 'code',
  label: '💻 Code Runtime',
  component: CodeSandbox,
} as const
