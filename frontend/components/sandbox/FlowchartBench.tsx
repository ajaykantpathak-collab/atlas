'use client'

/**
 * FlowchartBench — the classes 6-8 half of the E8 Code Runtime (the
 * taxonomy's flowchart E2 workbench): drag flowchart symbols into a
 * flow, then EXECUTE it step by step on sample inputs.
 *
 * Content grounding: deploy/content/cisce_nodes_v2/c8_compst_icse_03_* —
 * "Algorithms & Flowcharts" (03_003 symbols, 03_004 sequential, 03_005
 * TRACE TABLES, 03_006 decisions incl. compound conditions, 03_007 loops),
 * plus c6 ch6 (scratch-style programming) and c7 ch2 (number systems).
 *
 * The blocks execute through the SAME deterministic arithmetic as the
 * Java runner (codeTrace.evalExprText / evalConditionText), so integer
 * division, precedence and comparisons behave identically across both
 * engines — what a class 8 student builds here is exactly what class 9
 * writes as code.
 *
 * Symbol set: start · input/output (parallelogram) · process (rectangle)
 * · decision (diamond, No → chosen block) · loop (while, with auto
 * matched end) · jump (arrow to a block). Infinite flows are capped.
 * Misconception injection: a run that hits the iteration cap, or a
 * decision that never took one of its branches, pulls the authored
 * corpus text for the chapter node into MisconceptionPanel (closed-world).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, RotateCcw, StepForward, Trash2 } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { evalConditionText, evalExprText } from './codeTrace'
import { fetchCodeNode, type CodeMisconceptionData } from './codeTopics'

type BlockKind = 'start' | 'input' | 'output' | 'process' | 'decision' | 'loop' | 'endloop' | 'jump'

interface Block {
  id: number
  kind: BlockKind
  text: string      // input: var name · process/output: expression · loop/decision: condition
  noJump: number    // decision: block index for the "No" arrow (-1 → END)
  jumpTo: number    // jump: target index
}

const PALETTE: { kind: BlockKind; label: string; hint: string }[] = [
  { kind: 'input', label: 'Input', hint: 'read a value into a box' },
  { kind: 'output', label: 'Output', hint: 'print a value' },
  { kind: 'process', label: 'Process', hint: 'compute: total = total + i' },
  { kind: 'decision', label: 'Decision', hint: 'ask: marks >= 40 ?' },
  { kind: 'loop', label: 'Loop', hint: 'repeat while: i <= 5' },
  { kind: 'jump', label: 'Arrow', hint: 'go to block N (skip)' },
]

let nextId = 100

function newBlock(kind: BlockKind): Block {
  const defaults: Record<BlockKind, Partial<Block>> = {
    start: {}, endloop: {},
    input: { text: 'n' },
    output: { text: 'total' },
    process: { text: 'total = total + 1' },
    decision: { text: 'n > 0', noJump: -1 },
    loop: { text: 'i <= 5' },
    jump: { jumpTo: -1 },
  }
  return { id: nextId++, kind, text: '', noJump: -1, jumpTo: -1, ...defaults[kind] } as Block
}

function presetLarger(): Block[] {
  return [
    { ...newBlock('start') },
    { ...newBlock('input'), text: 'a' },
    { ...newBlock('input'), text: 'b' },
    { ...newBlock('decision'), text: 'a > b', noJump: 6 },
    { ...newBlock('output'), text: '"A is bigger"' },
    { ...newBlock('jump'), jumpTo: 7 },
    { ...newBlock('output'), text: '"B is bigger"' },
  ]
}

function presetSum(): Block[] {
  return [
    { ...newBlock('start') },
    { ...newBlock('process'), text: 'total = 0' },
    { ...newBlock('process'), text: 'i = 1' },
    { ...newBlock('loop'), text: 'i <= 5' },
    { ...newBlock('process'), text: 'total = total + i' },
    { ...newBlock('process'), text: 'i = i + 1' },
    { ...newBlock('endloop') },
    { ...newBlock('output'), text: 'total' },
  ]
}

// ------------------------------------------------------------- execution

interface FlowState {
  pc: number
  vars: Record<string, number | string | boolean>
  out: string
  done: boolean
  error: string | null
  loopStack: number[]
  decisions: Record<number, { yes: number; no: number }>
  steps: number
  curLine: number | null
}

const MAX_FLOW_STEPS = 400

function matchEndloop(blocks: Block[], start: number): number {
  let depth = 1
  for (let i = start + 1; i < blocks.length; i++) {
    if (blocks[i].kind === 'loop') depth++
    else if (blocks[i].kind === 'endloop') { depth--; if (depth === 0) return i }
  }
  return blocks.length // unpaired → run off the end
}

function stepFlow(blocks: Block[], st: FlowState, inputs: string[], inputPos: number):
  { state: FlowState; inputPos: number } {
  if (st.done || st.pc >= blocks.length) {
    return { state: { ...st, done: true, curLine: null }, inputPos }
  }
  const b = blocks[st.pc]
  const next: FlowState = {
    ...st,
    pc: st.pc + 1,
    steps: st.steps + 1,
    curLine: st.pc,
    error: null,
  }
  const evalErr = (r: { ok: boolean; error?: string }): boolean => {
    if (!r.ok) { next.error = r.error ?? 'cannot evaluate'; next.done = true; return false }
    return true
  }
  switch (b.kind) {
    case 'start':
      break
    case 'input': {
      const name = b.text.trim()
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
        next.error = `'${b.text}' is not a valid variable name — use letters and digits, starting with a letter`
        next.done = true
        break
      }
      if (inputPos >= inputs.length) {
        next.error = 'the flowchart asked for more input than the sample inputs provide'
        next.done = true
        break
      }
      const raw = inputs[inputPos++]
      const n = Number(raw)
      next.vars = { ...next.vars, [name]: Number.isInteger(n) ? n : (Number.isNaN(n) ? raw : n) }
      break
    }
    case 'process': {
      const m = b.text.replace(/\s+/g, '').match(/^([A-Za-z_][A-Za-z0-9_]*)(\+|-|\*|\/)?=(.+)$/)
      if (!m) {
        next.error = `a process box needs: name = expression (e.g. total = total + i) — got '${b.text}'`
        next.done = true
        break
      }
      const [, name, op, rhs] = m
      if (op === '/') {
        // guard division so a flowchart can't divide by zero silently
        const r = evalExprText(rhs, next.vars)
        if (!evalErr(r)) break
        const d = r.ok && 'v' in r.value ? r.value.v : 0
        if (d === 0) { next.error = 'division by zero in a process box — the divisor evaluated to 0'; next.done = true; break }
      }
      const r = evalExprText(op ? `${name} ${op} (${rhs})` : b.text, next.vars)
      if (!evalErr(r)) break
      if (r.ok && 'v' in r.value) {
        const v = r.value
        const val = v.t === 'boolean' ? (v as { v: boolean }).v : v.t === 'String' ? (v as { v: string }).v : (v as { v: number }).v
        next.vars = { ...next.vars, [name]: val }
      }
      break
    }
    case 'output': {
      const t = b.text.trim()
      if (t.startsWith('"') && t.endsWith('"') && t.length >= 2) {
        next.out = next.out + t.slice(1, -1) + '\n'
      } else {
        const r = evalExprText(t, next.vars)
        if (!evalErr(r)) break
        if (r.ok && 'v' in r.value) {
          const v = r.value
          const s = v.t === 'String' ? (v as { v: string }).v
            : v.t === 'boolean' ? ((v as { v: boolean }).v ? 'true' : 'false')
              : v.t === 'char' ? String.fromCharCode((v as { v: number }).v)
                : String((v as { v: number }).v)
          next.out = next.out + s + '\n'
        }
      }
      break
    }
    case 'decision': {
      const r = evalConditionText(b.text, next.vars)
      if (!evalErr(r)) break
      const yes = r.ok && r.value
      const rec = next.decisions[st.pc] ?? { yes: 0, no: 0 }
      next.decisions = { ...next.decisions, [st.pc]: yes ? { ...rec, yes: rec.yes + 1 } : { ...rec, no: rec.no + 1 } }
      next.pc = yes ? st.pc + 1 : (b.noJump >= 0 ? b.noJump : blocks.length)
      break
    }
    case 'loop': {
      const r = evalConditionText(b.text, next.vars)
      if (!evalErr(r)) break
      if (r.ok && r.value) {
        next.loopStack = [...next.loopStack, st.pc]
      } else {
        next.pc = matchEndloop(blocks, st.pc) + 1
      }
      break
    }
    case 'endloop': {
      const header = next.loopStack[next.loopStack.length - 1]
      if (header === undefined) { next.done = true; break }
      next.loopStack = next.loopStack.slice(0, -1)
      next.pc = header
      break
    }
    case 'jump': {
      next.pc = b.jumpTo >= 0 ? b.jumpTo : blocks.length
      break
    }
  }
  if (next.pc >= blocks.length) next.done = true
  if (next.steps >= MAX_FLOW_STEPS) {
    next.done = true
    next.error = `stopped after ${MAX_FLOW_STEPS} steps — the loop condition never became false. Does anything in the loop body move it toward false?`
  }
  return { state: next, inputPos }
}

// -------------------------------------------------------------- component

export default function FlowchartBench({ nodeId, onActivity }: {
  nodeId?: string
  onActivity?: () => void
}) {
  const [blocks, setBlocks] = useState<Block[]>(presetLarger)
  const [inputs, setInputs] = useState('12\n35')
  const [st, setSt] = useState<FlowState | null>(null)
  const [inputPos, setInputPos] = useState(0)
  const [dragKind, setDragKind] = useState<BlockKind | null>(null)
  const [miscon, setMiscon] = useState<CodeMisconceptionData | null>(null)
  const runFlags = useRef<{ capped: boolean; oneSided: boolean }>({ capped: false, oneSided: false })

  const reset = useCallback(() => {
    setSt({ pc: 0, vars: {}, out: '', done: false, error: null, loopStack: [], decisions: {}, steps: 0, curLine: null })
    setInputPos(0)
    setMiscon(null)
  }, [])

  useEffect(() => { reset() }, [reset])

  const finishCheck = useCallback(async (s: FlowState) => {
    const capped = !!s.error && s.error.includes('stopped after')
    const oneSided = Object.values(s.decisions).some(d => (d.yes === 0) !== (d.no === 0))
    if ((capped || oneSided) && nodeId) {
      runFlags.current = { capped, oneSided }
      setMiscon(await fetchCodeNode(nodeId))
    } else {
      setMiscon(null)
    }
  }, [nodeId])

  const doStep = () => {
    if (!st) reset()
    const cur = st ?? { pc: 0, vars: {}, out: '', done: false, error: null, loopStack: [], decisions: {}, steps: 0, curLine: null }
    if (cur.done) return
    const inputList = inputs.split('\n').map(s => s.trim()).filter(Boolean)
    const { state, inputPos: np } = stepFlow(blocks, cur, inputList, inputPos)
    setInputPos(np)
    setSt(state)
    onActivity?.()
    if (state.done) void finishCheck(state)
  }

  const runAll = () => {
    let cur: FlowState = { pc: 0, vars: {}, out: '', done: false, error: null, loopStack: [], decisions: {}, steps: 0, curLine: null }
    let pos = 0
    const inputList = inputs.split('\n').map(s => s.trim()).filter(Boolean)
    let guard = 0
    while (!cur.done && guard++ < MAX_FLOW_STEPS) {
      const r = stepFlow(blocks, cur, inputList, pos)
      cur = r.state
      pos = r.inputPos
    }
    setInputPos(pos)
    setSt(cur)
    onActivity?.()
    void finishCheck(cur)
  }

  const addBlock = (kind: BlockKind) => {
    setBlocks(prev => {
      const nb = newBlock(kind)
      const out = [...prev, nb]
      if (kind === 'loop') out.push({ ...newBlock('endloop'), id: nextId++ })
      return out
    })
  }

  const dropOn = (idx: number) => {
    if (!dragKind) return
    const kind = dragKind
    setDragKind(null)
    setBlocks(prev => {
      const nb = newBlock(kind)
      const out = [...prev]
      out.splice(idx, 0, nb)
      if (kind === 'loop') out.splice(idx + 1, 0, { ...newBlock('endloop'), id: nextId++ })
      return out
    })
  }

  const move = (idx: number, dir: -1 | 1) => {
    setBlocks(prev => {
      const j = idx + dir
      if (j < 0 || j >= prev.length) return prev
      const out = [...prev];
      [out[idx], out[j]] = [out[j], out[idx]]
      return out
    })
  }

  const update = (id: number, patch: Partial<Block>) => {
    setBlocks(prev => prev.map(b => (b.id === id ? { ...b, ...patch } : b)))
  }

  const SYM: Record<BlockKind, string> = {
    start: '▮', endloop: '⟲', input: '▱', output: '▱', process: '▭', decision: '◇', loop: '⬡', jump: '↷',
  }
  const SYM_LABEL: Record<BlockKind, string> = {
    start: 'START', endloop: 'END LOOP', input: 'INPUT', output: 'OUTPUT',
    process: 'PROCESS', decision: 'DECISION', loop: 'LOOP while', jump: 'ARROW →',
  }

  const inputList = inputs.split('\n').map(s => s.trim()).filter(Boolean)

  return (
    <div className="grid lg:grid-cols-[210px_minmax(0,1fr)_230px] gap-4" data-testid="flowchart-bench">
      {/* palette */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black mb-1.5">
          symbols — drag onto the flow (or click to add)
        </p>
        <div className="space-y-1.5">
          {PALETTE.map(p => (
            <div key={p.kind}
              draggable
              onDragStart={() => setDragKind(p.kind)}
              onDragEnd={() => setDragKind(null)}
              onClick={() => addBlock(p.kind)}
              className={`cursor-grab rounded-xl border px-2.5 py-1.5 transition select-none ${dragKind === p.kind ? 'border-sky-400 bg-sky-500/20' : 'border-slate-700 bg-slate-800/60 hover:border-slate-500'}`}>
              <p className="text-[11px] font-black text-slate-200">{SYM[p.kind]} {p.label}</p>
              <p className="text-[10px] text-slate-500">{p.hint}</p>
            </div>
          ))}
          <div className="flex gap-1.5 pt-1">
            <button onClick={() => setBlocks(presetLarger)}
              className="flex-1 px-1.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white">
              load: larger of two
            </button>
            <button onClick={() => { setBlocks(presetSum); setInputs('') }}
              className="flex-1 px-1.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white">
              load: sum 1..5
            </button>
          </div>
        </div>
      </div>

      {/* the flow */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <button onClick={doStep} disabled={!!st?.done}
            className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center gap-1">
            <StepForward className="w-3.5 h-3.5" />Step
          </button>
          <button onClick={runAll} disabled={!!st?.done}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center gap-1">
            <Play className="w-3.5 h-3.5" />Run
          </button>
          <button onClick={reset}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-600 hover:border-slate-400 text-slate-200 font-black text-xs flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5" />Reset
          </button>
          <label className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
            inputs (one per line)
            <input value={inputs} onChange={e => setInputs(e.target.value)}
              className="w-32 rounded-lg bg-slate-950 border border-slate-700 px-2 py-1 text-[11px] font-mono text-emerald-200 focus:outline-none focus:border-sky-400" />
          </label>
        </div>

        <div onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); dropOn(blocks.length) }}
          className="rounded-xl border border-slate-700 bg-slate-950/60 p-2.5 min-h-[380px]">
          {blocks.map((b, i) => (
            <div key={b.id}>
              <DropZone onDrop={() => dropOn(i)} active={!!dragKind} />
              <div className={`rounded-lg border px-2.5 py-1.5 transition ${st?.curLine === i ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                : b.kind === 'start' ? 'border-slate-500 bg-slate-800/80'
                  : b.kind === 'decision' ? 'border-amber-500/50 bg-amber-500/5'
                    : b.kind === 'loop' || b.kind === 'endloop' ? 'border-fuchsia-500/40 bg-fuchsia-500/5'
                      : 'border-slate-700 bg-slate-900/70'}`}>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-mono text-slate-500 w-4">{i}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wider w-20 ${b.kind === 'decision' ? 'text-amber-300' : b.kind === 'loop' || b.kind === 'endloop' ? 'text-fuchsia-300' : b.kind === 'start' ? 'text-slate-400' : 'text-sky-300'}`}>
                    {SYM[b.kind]} {SYM_LABEL[b.kind]}
                  </span>
                  {b.kind === 'start' ? (
                    <span className="text-[11px] text-slate-400 font-mono">●</span>
                  ) : b.kind === 'endloop' ? (
                    <span className="text-[11px] text-fuchsia-200/70 font-mono">loop back ↑</span>
                  ) : (
                    <input value={b.text} onChange={e => update(b.id, { text: e.target.value })}
                      placeholder={b.kind === 'input' ? 'variable name' : b.kind === 'decision' || b.kind === 'loop' ? 'condition' : b.kind === 'process' ? 'name = expression' : 'value or "text"'}
                      className="flex-1 min-w-[120px] rounded-md bg-slate-950 border border-slate-700 px-2 py-0.5 text-[11px] font-mono text-slate-100 focus:outline-none focus:border-sky-400" />
                  )}
                  {b.kind === 'decision' && (
                    <label className="text-[9px] text-amber-300/80 font-bold">
                      No →
                      <select value={b.noJump} onChange={e => update(b.id, { noJump: Number(e.target.value) })}
                        className="ml-1 rounded bg-slate-950 border border-slate-700 text-[10px] text-slate-200 px-1 py-0.5">
                        <option value={-1}>END</option>
                        {blocks.map((_, j) => <option key={j} value={j}>{`block ${j}`}</option>)}
                      </select>
                    </label>
                  )}
                  {b.kind === 'jump' && (
                    <label className="text-[9px] text-sky-300/80 font-bold">
                      →
                      <select value={b.jumpTo} onChange={e => update(b.id, { jumpTo: Number(e.target.value) })}
                        className="ml-1 rounded bg-slate-950 border border-slate-700 text-[10px] text-slate-200 px-1 py-0.5">
                        <option value={-1}>END</option>
                        {blocks.map((_, j) => <option key={j} value={j}>{`block ${j}`}</option>)}
                      </select>
                    </label>
                  )}
                  <div className="ml-auto flex gap-0.5">
                    <button onClick={() => move(i, -1)} className="px-1 text-[10px] text-slate-500 hover:text-slate-200">↑</button>
                    <button onClick={() => move(i, 1)} className="px-1 text-[10px] text-slate-500 hover:text-slate-200">↓</button>
                    <button onClick={() => setBlocks(prev => prev.filter(x => x.id !== b.id))}
                      className="px-1 text-slate-600 hover:text-rose-300"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
              {i < blocks.length - 1 && <p className="text-center text-[10px] text-slate-600 leading-none py-0.5">▼</p>}
            </div>
          ))}
          {blocks.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-10">
              Drag symbols here — or click one in the palette. Start with a preset below the palette.
            </p>
          )}
          <p className="text-center text-[10px] text-slate-600 mt-1">▼ END</p>
        </div>
      </div>

      {/* state + output */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black">dry-run state</p>
        <div className="rounded-xl border border-slate-700 bg-slate-950/70 px-2.5 py-2 min-h-[92px]">
          {st && Object.keys(st.vars).length > 0 ? (
            <table className="w-full text-[11px] font-mono">
              <tbody>
                {Object.entries(st.vars).map(([k, v]) => (
                  <tr key={k}>
                    <td className="text-sky-300 pr-2">{k}</td>
                    <td className="text-slate-100 text-right">{String(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-[11px] text-slate-500">Press Step — every box updates the boxes below (the chapter&apos;s trace table, live).</p>
          )}
        </div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black">output</p>
        <pre className="rounded-xl border border-slate-700 bg-black/60 px-2.5 py-2 text-[12px] font-mono text-emerald-300 whitespace-pre-wrap min-h-[60px]">
          {st?.out?.length ? st.out : st?.done ? '(nothing printed)' : '—'}
        </pre>
        {st?.error && (
          <p className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-2.5 py-1.5 text-[11px] text-amber-200 font-semibold">
            {st.error}
          </p>
        )}
        {st?.done && !st.error && Object.keys(st.decisions).length > 0 && (
          <p className="text-[10px] text-slate-500">
            decisions: {Object.entries(st.decisions).map(([k, d]) => `block ${k}: ${d.yes}×yes / ${d.no}×no`).join(' · ')}
          </p>
        )}
        <p className="text-[10px] text-slate-500">
          inputs left: <span className="font-mono">{inputList.slice(inputPos).join(', ') || '—'}</span>
        </p>
        <MisconceptionPanel
          misconception={miscon?.wrong_answer_clauses?.[0] ?? miscon?.misconceptions?.[0] ?? null}
          commonMisconception={miscon?.common_misconception ?? null} />
      </div>
    </div>
  )
}

function DropZone({ onDrop, active }: { onDrop: () => void; active: boolean }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onDragOver={e => { if (active) { e.preventDefault(); setHover(true) } }}
      onDragLeave={() => setHover(false)}
      onDrop={e => { e.preventDefault(); e.stopPropagation(); setHover(false); onDrop() }}
      className={`h-1.5 rounded-full my-0.5 transition ${hover ? 'bg-sky-400/70' : active ? 'bg-sky-500/20' : 'bg-transparent'}`} />
  )
}
