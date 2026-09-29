'use client'

/**
 * ChemPracticalLab — the Chemistry Practicals bench (E3 wave 6).
 * Three deterministic state machines, NOT free-form play:
 *
 *   1. TITRATION  — animated burette + conical flask, indicator dropdown,
 *      permanent-pale-colour endpoint, and the graded step contract
 *      reading → burette correction → M₁V₁=M₂V₂ calculation → endpoint check.
 *      Overshooting (hot pink) raises the overshoot misconception card.
 *   2. SALT ANALYSIS — pick a salt, run the corpus's reagent tests
 *      (BaCl₂, AgNO₃, KI, dil. HCl, warm NaOH, flame, heat, iron nail…),
 *      read the deterministic observation table, conclude the radicals.
 *      Wrong conclusions raise the salt's specific confusion card.
 *   3. GAS TESTS — pick a gas, pick a test, get the canonical observation
 *      or an honest "no reaction / not in our corpus" answer.
 *
 * EVERY observation is traceable to an authored enhanced_nodes_md node —
 * the full bench → node-id map lives in ./chemPracticalTopics.ts (this file
 * does not invent chemistry; it renders the corpus). Wrong states feed the
 * closed-world MisconceptionPanel via remediation.ts.
 *
 * Deterministic: unknown molarities, the burette calibration offset and the
 * endpoint volumes are fixed constants in chemPracticalTopics.ts — the same
 * run closes the same numbers every time.
 *
 * Class-band gating: 9-10 → basic titration + gas tests;
 * 11-12 → everything (salt analysis + molarity-from-titration).
 * Brand: gold accents on slate-950, no blue-family classes.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Beaker, CheckCircle2, Eye, Flame, FlaskConical, Pause, Play, RotateCcw,
  TestTube2, XCircle,
} from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import {
  ANION_OPTIONS, BURETTE_CORRECTION_ML, CATION_OPTIONS, GAS_MATRIX, GASES,
  GAS_TESTS, INDICATORS, NOT_IN_CORPUS, OVERSHOOT_TOLERANCE_ML,
  POP_VS_EXTINGUISH_NODE, POP_VS_EXTINGUISH_TEXT, SALTS, SALT_REAGENTS,
  TITRATION_EXPERIMENTS, equivalenceVolume, unknownMolarity,
  type BandKey, type IndicatorKey, type Observation, type SaltReagentKey,
  type TitrationExperiment,
} from './chemPracticalTopics'

// ---------------------------------------------------------------- step log --

interface LogStep { n: number; bench: string; text: string }

function StepLogPanel({ steps, onReset }: { steps: LogStep[]; onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-black text-gold-300 uppercase tracking-widest">
          step log — write down what you did
        </p>
        <button onClick={onReset}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black bg-slate-800 border border-slate-600 text-slate-300 hover:border-gold-400/60">
          <RotateCcw className="w-3 h-3" /> clear log
        </button>
      </div>
      {steps.length === 0 ? (
        <p className="text-[11px] text-slate-500 italic">
          Every action lands here as a numbered step — the practical-notebook habit.
        </p>
      ) : (
        <ol className="max-h-44 overflow-y-auto space-y-1 pr-1">
          {steps.map(s => (
            <li key={s.n} className="text-[11px] leading-snug text-slate-300 flex gap-2">
              <span className="text-gold-400 font-black shrink-0">{s.n}.</span>
              <span><span className="text-slate-500 font-bold">[{s.bench}]</span> {s.text}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

// ------------------------------------------------------------ tiny helpers --

function Graded({ ok }: { ok: boolean }) {
  return ok
    ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
    : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">{children}</div>
  )
}

function BenchTitle({ icon: Icon, title, note }: {
  icon: typeof FlaskConical; title: string; note: string
}) {
  return (
    <div className="flex items-start gap-2 mb-3">
      <Icon className="w-5 h-5 text-gold-300 mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-black text-gold-200">{title}</p>
        <p className="text-[11px] text-slate-400">{note}</p>
      </div>
    </div>
  )
}

/** fetch one corpus node's enrichment for the misconception panel */
function useEnrichment(nodeId: string | null) {
  const [data, setData] = useState<EnrichmentData | null>(null)
  useEffect(() => {
    let live = true
    if (!nodeId) { setData(null); return }
    fetchEnrichment(nodeId).then(d => { if (live) setData(d) })
    return () => { live = false }
  }, [nodeId])
  return data
}

// ============================================================ TITRATION ==

const BURETTE_TOP = 18
const BURETTE_H = 260
function yForMl(ml: number): number {
  return BURETTE_TOP + (ml / 50) * BURETTE_H
}

type TitrationGrade = {
  reading: boolean
  correction: boolean
  calc: boolean
  endpoint: boolean
}

function TitrationBench({ band, log }: { band: BandKey; log: (s: string) => void }) {
  const exps = TITRATION_EXPERIMENTS.filter(e => band === '11-12' || e.band === '9-10')
  const [expKey, setExpKey] = useState(exps[0].key)
  const exp: TitrationExperiment = exps.find(e => e.key === expKey) ?? exps[0]

  const [indicator, setIndicator] = useState<IndicatorKey>(exp.defaultIndicator)
  const [stopcock, setStopcock] = useState(0)
  const [running, setRunning] = useState(false)
  const [delivered, setDelivered] = useState(0)
  const [phase, setPhase] = useState<'run' | 'record'>('run')

  const [readingEntry, setReadingEntry] = useState('')
  const [corrEntry, setCorrEntry] = useState('')
  const [mEntry, setMEntry] = useState('')
  const [readingOk, setReadingOk] = useState<boolean | null>(null)
  const [corrOk, setCorrOk] = useState<boolean | null>(null)
  const [calcOk, setCalcOk] = useState<boolean | null>(null)
  const [endpointOk, setEndpointOk] = useState<boolean | null>(null)
  const [acceptedReading, setAcceptedReading] = useState<number | null>(null)
  const [showOvershootCard, setShowOvershootCard] = useState(false)

  const overshootLogged = useRef(false)
  const vEq = equivalenceVolume(exp)
  const f = delivered / vEq

  // reset the whole bench whenever the experiment changes
  const resetBench = useCallback((note = 'bench reset — burette refilled, flask rinsed') => {
    setStopcock(0); setRunning(false); setDelivered(0); setPhase('run')
    setReadingEntry(''); setCorrEntry(''); setMEntry('')
    setReadingOk(null); setCorrOk(null); setCalcOk(null); setEndpointOk(null)
    setAcceptedReading(null); setShowOvershootCard(false)
    overshootLogged.current = false
    log(note)
  }, [log])

  useEffect(() => {
    setIndicator(exp.defaultIndicator)
    resetBench(`experiment loaded — ${exp.label}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expKey])

  // the drip: stopcock 0-100 → up to 1.6 mL/s
  useEffect(() => {
    if (!running || stopcock <= 0 || phase !== 'run') return
    const iv = setInterval(() => {
      setDelivered(d => Math.min(50, d + (stopcock / 100) * 1.6 * 0.1))
    }, 100)
    return () => clearInterval(iv)
  }, [running, stopcock, phase])

  // burette empty → auto close
  useEffect(() => {
    if (delivered >= 50 && running) {
      setRunning(false)
      log('burette empty at 50.00 mL — stopcock auto-closed')
    }
  }, [delivered, running, log])

  // overshoot event: past the endpoint by the tolerance while pouring
  useEffect(() => {
    if (phase === 'run' && running && !overshootLogged.current &&
      delivered > vEq + OVERSHOOT_TOLERANCE_ML) {
      overshootLogged.current = true
      log(`OVERSHOOT — the flask went hot pink past ${vEq.toFixed(1)} mL; the pale endpoint is gone`)
    }
  }, [delivered, phase, running, vEq, log])

  const flaskColour = (): string => {
    const ind = INDICATORS[indicator]
    if (indicator === 'methyl-orange') {
      if (f > 1.05) return ind.overshootColour
      if (f >= 0.95) return ind.endpointColour
      return ind.acidColour
    }
    // phenolphthalein / self-indicating KMnO4: pale colourless until the endpoint
    if (f > 1.03) return ind.overshootColour
    if (f >= 1) return ind.endpointColour
    if (indicator === 'phenolphthalein' && f >= 0.97) return '#fbe4ef' // transient flash
    return ind.acidColour
  }

  const isOvershoot = delivered > vEq + OVERSHOOT_TOLERANCE_ML

  // ---- step contract graders (reading → correction → calculation → check) --

  const gradeReading = () => {
    const v = parseFloat(readingEntry)
    if (!Number.isFinite(v)) return
    const ok = Math.abs(v - delivered) <= 0.1
    setReadingOk(ok)
    setAcceptedReading(v)
    log(`final reading recorded as ${v.toFixed(2)} mL — ${ok ? 'matches the meniscus (±0.1)' : 'more than 0.1 mL away from the meniscus'}`)
  }

  const gradeCorrection = () => {
    const v = parseFloat(corrEntry)
    if (!Number.isFinite(v) || acceptedReading === null) return
    const expected = acceptedReading + BURETTE_CORRECTION_ML
    const ok = Math.abs(v - expected) <= 0.01
    setCorrOk(ok)
    log(`corrected volume ${v.toFixed(2)} mL — ${ok ? 'the −0.05 mL calibration offset was applied correctly' : `expected ${expected.toFixed(2)} mL (reading ${acceptedReading.toFixed(2)} − 0.05 offset)`}`)
  }

  const gradeCalc = () => {
    const v = parseFloat(mEntry)
    if (!Number.isFinite(v) || acceptedReading === null) return
    const corrV = (corrOk === false ? acceptedReading + BURETTE_CORRECTION_ML
      : parseFloat(corrEntry) || acceptedReading + BURETTE_CORRECTION_ML)
    const expected = unknownMolarity(exp, corrV)
    const rel = Math.abs(v - expected) / expected
    const ok = rel <= 0.015
    setCalcOk(ok)
    log(`M(unknown) entered as ${v.toPrecision(3)} M — ${ok ? 'closes via M₁V₁ = M₂V₂' : `the family gives ${expected.toPrecision(3)} M (off by ${(rel * 100).toFixed(1)}%)`}`)
  }

  const gradeEndpoint = () => {
    const ok = Math.abs(delivered - vEq) <= OVERSHOOT_TOLERANCE_ML
    setEndpointOk(ok)
    if (!ok) setShowOvershootCard(true)
    log(`endpoint check — stopped at ${delivered.toFixed(2)} mL vs equivalence ${vEq.toFixed(2)} mL: ${ok ? 'inside the ±0.3 mL band ✓' : 'OVERSHOT ✗'}`)
  }

  const misconData = useEnrichment(showOvershootCard ? 'c11_chem_cbse_08_005' : null)
  const indMiscon = useEnrichment(indicator === 'methyl-orange' && exp.defaultIndicator === 'phenolphthalein'
    ? 'c10_chem_cbse_02_002' : null)

  const scaleMarks = []
  for (let m = 0; m <= 50; m += 5) scaleMarks.push(m)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* ---------------- apparatus ---------------- */}
      <Panel>
        <BenchTitle icon={FlaskConical} title="titration bench"
          note={exp.endpointHint} />
        <svg viewBox="0 0 190 410" className="w-full max-w-[240px] mx-auto" role="img"
          aria-label="burette above a conical flask">
          {/* stand */}
          <rect x="22" y="8" width="6" height="394" fill="#334155" />
          <rect x="22" y="396" width="150" height="8" fill="#334155" />
          <rect x="28" y="44" width="34" height="6" fill="#475569" />
          {/* burette body: 0 mL mark at top, 50 mL at bottom */}
          <rect x="96" y={BURETTE_TOP} width="22" height={BURETTE_H} rx="4"
            fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          {/* liquid: meniscus descends as delivered grows */}
          <rect x="97.5" y={yForMl(delivered)} width="19"
            height={Math.max(0, BURETTE_TOP + BURETTE_H - yForMl(delivered) - 2)}
            fill={exp.burette.titrantColour} opacity="0.85" />
          {/* meniscus line */}
          <rect x="97.5" y={yForMl(delivered) - 1} width="19" height="2.5" fill="#94a3b8" />
          {/* scale */}
          {scaleMarks.map(m => (
            <g key={m}>
              <line x1="118" y1={yForMl(m)} x2={m % 10 === 0 ? 126 : 123} y2={yForMl(m)}
                stroke="#64748b" strokeWidth={m % 10 === 0 ? 1.5 : 1} />
              {m % 10 === 0 && (
                <text x="130" y={yForMl(m) + 3} fontSize="8" fill="#94a3b8">{m}</text>
              )}
            </g>
          ))}
          {/* stopcock */}
          <rect x="103" y="278" width="8" height="10" fill="#475569" />
          {stopcock > 0
            ? <rect x="99" y="290" width="12" height="9" rx="2" fill="#a16207" />
            : <polygon points="97,288 113,288 105,300" fill="#52525b" />}
          {/* drop (animated while flowing) */}
          {running && stopcock > 0 && phase === 'run' && (
            <circle r="3" cx="105" fill={exp.burette.titrantColour}>
              <animate attributeName="cy" values="302;316;326" dur="0.45s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" dur="0.45s" repeatCount="indefinite" />
            </circle>
          )}
          {/* conical flask */}
          <path d="M78 330 L78 346 L56 392 L154 392 L132 346 L132 330 Z"
            fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M65.6 372 L56 392 L154 392 L144.4 372 Z" fill={flaskColour()} />
          <text x="105" y="324" fontSize="8" fill="#94a3b8" textAnchor="middle">
            {exp.flask.volumeMl.toFixed(1)} mL {exp.flask.formula} + {INDICATORS[indicator].label}
          </text>
        </svg>

        <div className="mt-2 space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            stopcock {running && stopcock > 0 && phase === 'run' ? '— pouring' : ''}
          </label>
          <input type="range" min={0} max={100} step={5} value={stopcock}
            onChange={e => setStopcock(Number(e.target.value))}
            className="w-full accent-amber-400" />
          <div className="flex flex-wrap gap-2">
            {phase === 'run' ? (
              <>
                <button
                  onClick={() => { setRunning(r => !r); log(running ? 'stopcock closed' : 'stopcock opened — titrant flowing') }}
                  disabled={stopcock === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black bg-gold-500/20 border border-gold-400/60 text-gold-200 disabled:opacity-40">
                  {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {running ? 'pause flow' : 'open flow'}
                </button>
                <button
                  onClick={() => {
                    setRunning(false); setPhase('record')
                    log('stopcock closed — record the final burette reading')
                  }}
                  disabled={delivered < 0.5}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-black bg-slate-800 border border-slate-600 text-slate-200 hover:border-gold-400/60 disabled:opacity-40">
                  close &amp; record final reading
                </button>
              </>
            ) : (
              <span className="text-[11px] text-gold-300 font-bold self-center">
                run finished — complete the step contract on the right
              </span>
            )}
          </div>
        </div>
      </Panel>

      {/* ---------------- controls + contract ---------------- */}
      <div className="space-y-3">
        <Panel>
          <BenchTitle icon={Beaker} title="setup" note="deterministic bench — same numbers every run" />
          {exps.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {exps.map(e => (
                <button key={e.key} onClick={() => setExpKey(e.key)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition ${e.key === expKey
                    ? 'bg-gold-500/15 border-gold-400/60 text-gold-200'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                  {e.label}
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {exp.allowedIndicators.map(k => (
              <button key={k} onClick={() => { setIndicator(k); log(`indicator switched — ${INDICATORS[k].label}`) }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition ${k === indicator
                  ? 'bg-gold-500/15 border-gold-400/60 text-gold-200'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                {INDICATORS[k].label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">
            {INDICATORS[indicator].transition}
          </p>
          {exp.flask.acidMedium && (
            <p className="text-[11px] text-slate-500 mt-1">acid medium: {exp.flask.acidMedium}</p>
          )}
          {indMiscon && indMiscon.common_misconception && (
            <p className="text-[11px] text-gold-300/90 mt-2 border-l-2 border-gold-500/40 pl-2">
              corpus watch-out ({exp.label}): {indMiscon.common_misconception}
            </p>
          )}
        </Panel>

        <Panel>
          <BenchTitle icon={Eye} title="step contract"
            note="reading → burette correction → M₁V₁=M₂V₂ calculation → endpoint check" />
          <div className="space-y-2.5">
            {/* step 1 — reading */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-gold-300">1</span>
                <input type="number" step="0.01" min="0" max="50" value={readingEntry}
                  onChange={e => setReadingEntry(e.target.value)} disabled={phase === 'run'}
                  placeholder="final reading (mL)"
                  className="w-40 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-sm font-bold text-white disabled:opacity-60" />
                <button onClick={gradeReading} disabled={phase === 'run' || !readingEntry}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-black bg-slate-700 border border-slate-600 text-white disabled:opacity-40">
                  check
                </button>
                {readingOk !== null && <Graded ok={readingOk} />}
              </div>
              <p className="text-[10px] text-slate-500 mt-1 ml-5">
                read the meniscus off the burette scale (0 at top). Accepts ±0.1 mL.
              </p>
            </div>
            {/* step 2 — correction */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-gold-300">2</span>
                <input type="number" step="0.01" value={corrEntry}
                  onChange={e => setCorrEntry(e.target.value)} disabled={acceptedReading === null}
                  placeholder="corrected volume (mL)"
                  className="w-40 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-sm font-bold text-white disabled:opacity-60" />
                <button onClick={gradeCorrection} disabled={acceptedReading === null || !corrEntry}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-black bg-slate-700 border border-slate-600 text-white disabled:opacity-40">
                  check
                </button>
                {corrOk !== null && <Graded ok={corrOk} />}
              </div>
              <p className="text-[10px] text-slate-500 mt-1 ml-5">
                this burette reads 0.05 mL HIGH — apply the printed correction
                {' '}−0.05 mL. (Burette calibration tables are outside our corpus;
                the offset is printed on the bench.)
              </p>
            </div>
            {/* step 3 — calculation */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-gold-300">3</span>
                <input type="number" step="0.001" value={mEntry}
                  onChange={e => setMEntry(e.target.value)} disabled={acceptedReading === null}
                  placeholder={`M(${exp.flask.formula}) in mol/L`}
                  className="w-40 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-sm font-bold text-white disabled:opacity-60" />
                <button onClick={gradeCalc} disabled={acceptedReading === null || !mEntry}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-black bg-slate-700 border border-slate-600 text-white disabled:opacity-40">
                  check
                </button>
                {calcOk !== null && <Graded ok={calcOk} />}
              </div>
              <p className="text-[10px] text-slate-500 mt-1 ml-5 font-mono">{exp.calcFormula}</p>
            </div>
            {/* step 4 — endpoint check */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-gold-300">4</span>
              <button onClick={gradeEndpoint} disabled={acceptedReading === null}
                className="px-3 py-1.5 rounded-lg text-[11px] font-black bg-gold-500/20 border border-gold-400/60 text-gold-200 disabled:opacity-40">
                endpoint check
              </button>
              {endpointOk !== null && <Graded ok={endpointOk} />}
              <span className="text-[10px] text-slate-500">
                was the pale colour caught inside the ±0.3 mL band?
              </span>
            </div>
          </div>

          {showOvershootCard && (
            <MisconceptionPanel
              misconception={misconData?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
              commonMisconception={misconData?.common_misconception ?? null}
            >
              <p className="text-[11px] text-slate-300">
                You went past the first permanent pale colour. The corpus endpoint
                rule: pale pink that PERSISTS while swirling — hot pink means you
                already overshot. (redox-titration endpoint rule · indicator colours)
              </p>
            </MisconceptionPanel>
          )}

          {/* the close: deterministic truth revealed after grading */}
          {endpointOk !== null && (
            <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/70 p-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                the close — does it shut?
              </p>
              <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                V(eq) = {vEq.toFixed(2)} mL · corrected V = {(acceptedReading ?? 0).toFixed(2)}{BURETTE_CORRECTION_ML >= 0 ? ' +' : ' −'}{Math.abs(BURETTE_CORRECTION_ML).toFixed(2)} = {((acceptedReading ?? 0) + BURETTE_CORRECTION_ML).toFixed(2)} mL
                <br />
                M({exp.flask.formula}) = {unknownMolarity(exp, (acceptedReading ?? 0) + BURETTE_CORRECTION_ML).toPrecision(3)} mol/L
                {' '}— flask was made up at {exp.flask.unknownM.toFixed(3)} M
              </p>
            </div>
          )}

          <button onClick={() => resetBench()}
            className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black bg-slate-800 border border-slate-600 text-slate-300 hover:border-gold-400/60">
            <RotateCcw className="w-3.5 h-3.5" /> reset bench
          </button>
        </Panel>
      </div>
    </div>
  )
}

// ========================================================= SALT ANALYSIS ==

const FLAME_COLOURS: Record<string, string> = { lilac: '#b18cde' }

function SaltAnalysisBench({ log }: { log: (s: string) => void }) {
  const [saltKey, setSaltKey] = useState(SALTS[0].key)
  const salt = SALTS.find(s => s.key === saltKey) ?? SALTS[0]
  const [obs, setObs] = useState<{ reagent: SaltReagentKey; obs: Observation }[]>([])
  const [cation, setCation] = useState('')
  const [anion, setAnion] = useState('')
  const [conclusion, setConclusion] = useState<null | { ok: boolean }>(null)

  useEffect(() => {
    setObs([]); setCation(''); setAnion(''); setConclusion(null)
    log(`salt loaded — ${salt.formula} (${salt.name}), unknown sample`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saltKey])

  const runTest = (rk: SaltReagentKey) => {
    const r = salt.results[rk] ?? NOT_IN_CORPUS
    setObs(prev => [...prev, { reagent: rk, obs: r }])
    const label = SALT_REAGENTS.find(x => x.key === rk)?.label ?? rk
    log(`${salt.formula} + ${label} → ${r.kind === 'positive' ? r.text
      : r.kind === 'negative' ? `no reaction with that test (${r.text})`
        : 'not in our corpus'}`)
  }

  const misconData = useEnrichment(conclusion && !conclusion.ok ? salt.primaryNodeId : null)

  const checkConclusion = () => {
    const ok = cation === salt.cation && anion === salt.anion
    setConclusion({ ok })
    log(`conclusion: cation ${cation || '—'}, anion ${anion || '—'} → ${ok ? 'correct ✓' : 'incorrect ✗'}`)
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Panel>
        <BenchTitle icon={TestTube2} title="salt analysis bench"
          note="run the corpus's reagent tests, read the table, conclude the radicals" />
        <div className="flex flex-wrap gap-1.5 mb-3">
          {SALTS.map(s => (
            <button key={s.key} onClick={() => setSaltKey(s.key)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black border transition ${s.key === saltKey
                ? 'bg-gold-500/15 border-gold-400/60 text-gold-200'
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
              {s.formula}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full border border-slate-500 shrink-0"
            style={{ backgroundColor: salt.solutionColour }} />
          <p className="text-[11px] text-slate-300 font-bold">unknown solution — {salt.formula}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {SALT_REAGENTS.map(r => (
            <button key={r.key} onClick={() => runTest(r.key)}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800/70 border border-slate-600 text-slate-300 hover:border-gold-400/50 hover:text-gold-200 transition">
              + {r.label}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-2 max-h-64 overflow-y-auto">
          {obs.length === 0 ? (
            <p className="text-[11px] text-slate-500 italic p-1">
              observation table — every reagent you add is recorded here with its
              corpus node.
            </p>
          ) : (
            <table className="w-full text-[11px]">
              <tbody>
                {obs.map((o, i) => (
                  <tr key={i} className="border-b border-slate-800 last:border-0 align-top">
                    <td className="py-1.5 pr-2 font-bold text-slate-300 whitespace-nowrap">
                      {SALT_REAGENTS.find(x => x.key === o.reagent)?.label}
                    </td>
                    <td className="py-1.5 pr-2">
                      {o.obs.kind === 'positive' && (
                        <span className="text-emerald-300">{o.obs.text}</span>
                      )}
                      {o.obs.kind === 'negative' && (
                        <span className="text-slate-400">{o.obs.text}</span>
                      )}
                      {o.obs.kind === 'absent' && (
                        <span className="text-slate-500 italic">{o.obs.text}</span>
                      )}
                      {o.reagent === 'flame' && o.obs.kind === 'positive' && (
                        <span className="inline-block w-3.5 h-3.5 rounded-full ml-1 align-middle"
                          style={{ backgroundColor: FLAME_COLOURS.lilac }} />
                      )}
                      {o.obs.nodeIds.length > 0 && (
                        <span className="block text-[9px] text-slate-600 mt-0.5">
                          ✓ corpus-grounded observation
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Panel>

      <div className="space-y-3">
        <Panel>
          <BenchTitle icon={Flame} title="conclude the radicals"
            note="commit only to what the observation table supports" />
          <div className="grid grid-cols-2 gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              cation
              <select value={cation} onChange={e => setCation(e.target.value)}
                className="mt-1 w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-sm font-bold text-white">
                <option value="">— pick —</option>
                {CATION_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              anion
              <select value={anion} onChange={e => setAnion(e.target.value)}
                className="mt-1 w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-sm font-bold text-white">
                <option value="">— pick —</option>
                {ANION_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
          </div>
          <button onClick={checkConclusion} disabled={!cation || !anion}
            className="mt-3 px-3 py-1.5 rounded-xl text-[11px] font-black bg-gold-500/20 border border-gold-400/60 text-gold-200 disabled:opacity-40">
            check conclusion
          </button>

          {conclusion?.ok && (
            <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-200">
                {salt.cation} + {salt.anion} — matches the corpus answer for {salt.formula}
                {' '}(the analytical-chemistry bench answer).
              </p>
            </div>
          )}
          {conclusion && !conclusion.ok && (
            <>
              <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3">
                <p className="text-[11px] text-rose-200 leading-relaxed">
                  <span className="font-black">Specific confusion</span> — {salt.confusion.text}
                </p>
                <p className="text-[9px] text-slate-500 mt-1">✓ grounded in the corpus's analytical-chemistry notes</p>
              </div>
              <MisconceptionPanel
                misconception={misconData?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
                commonMisconception={misconData?.common_misconception ?? null}
              >
                <p className="text-[11px] text-slate-300">
                  Re-read the observation table left — only conclude what a
                  recorded observation supports; absent rows are not evidence.
                </p>
              </MisconceptionPanel>
            </>
          )}
          <button onClick={() => { setObs([]); setCation(''); setAnion(''); setConclusion(null); log('bench reset — fresh sample') }}
            className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black bg-slate-800 border border-slate-600 text-slate-300 hover:border-gold-400/60">
            <RotateCcw className="w-3.5 h-3.5" /> reset bench
          </button>
        </Panel>
      </div>
    </div>
  )
}

// ============================================================== GAS TESTS ==

function GasTestsBench({ log }: { log: (s: string) => void }) {
  const [gasKey, setGasKey] = useState(GASES[0].key)
  const gas = GASES.find(g => g.key === gasKey) ?? GASES[0]
  const [obs, setObs] = useState<{ test: string; obs: Observation }[]>([])
  const [showPopCard, setShowPopCard] = useState(false)

  useEffect(() => {
    setObs([]); setShowPopCard(false)
    log(gas.available
      ? `gas jar loaded — ${gas.formula} (${gas.name})`
      : `gas jar loaded — ${gas.formula}: NOT in our corpus, the bench makes no claim about it`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gasKey])

  const runTest = (tk: string) => {
    if (!gas.available) {
      const absent: Observation = {
        kind: 'absent',
        text: `${gas.formula} tests are not in our corpus — no observation available.`,
        nodeIds: [],
      }
      setObs(prev => [...prev, { test: tk, obs: absent }])
      log(`${gas.formula} + test → honest absence (no corpus node)`)
      return
    }
    const r = GAS_MATRIX[gas.key]?.[tk] ?? NOT_IN_CORPUS
    setObs(prev => [...prev, { test: tk, obs: r }])
    if (gas.key === 'co2' && tk === 'burning-splint') setShowPopCard(true)
    const label = GAS_TESTS.find(x => x.key === tk)?.label ?? tk
    log(`${gas.formula} + ${label} → ${r.kind === 'positive' ? r.text
      : r.kind === 'negative' ? `no reaction with that test (${r.text})`
        : r.text}`)
  }

  const popMiscon = useEnrichment(showPopCard ? POP_VS_EXTINGUISH_NODE : null)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Panel>
        <BenchTitle icon={Flame} title="gas tests bench"
          note="pick a gas, pick a test — the bench answers canonically or honestly" />
        <div className="flex flex-wrap gap-1.5 mb-2">
          {GASES.map(g => (
            <button key={g.key} onClick={() => setGasKey(g.key)} disabled={!g.available}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black border transition ${g.key === gasKey
                ? 'bg-gold-500/15 border-gold-400/60 text-gold-200'
                : g.available
                  ? 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                  : 'bg-slate-900/70 border-slate-800 text-slate-600 cursor-not-allowed'}`}
              title={g.available ? g.corpusNote : g.corpusNote}>
              {g.formula}{!g.available && <span className="ml-1 text-[9px] font-bold">not in corpus</span>}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mb-3">{gas.corpusNote}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {GAS_TESTS.map(t => (
            <button key={t.key} onClick={() => runTest(t.key)}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800/70 border border-slate-600 text-slate-300 hover:border-gold-400/50 hover:text-gold-200 transition">
              {t.label}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-2 max-h-60 overflow-y-auto">
          {obs.length === 0 ? (
            <p className="text-[11px] text-slate-500 italic p-1">
              run a test — the result lands here with its corpus node.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {obs.map((o, i) => (
                <li key={i} className="text-[11px] leading-snug">
                  <span className="font-bold text-slate-300">
                    {GAS_TESTS.find(x => x.key === o.test)?.label}:{' '}
                  </span>
                  {o.obs.kind === 'positive' && <span className="text-emerald-300">{o.obs.text}</span>}
                  {o.obs.kind === 'negative' && <span className="text-slate-400">{o.obs.text}</span>}
                  {o.obs.kind === 'absent' && <span className="text-slate-500 italic">{o.obs.text}</span>}
                  {o.obs.nodeIds.length > 0 && (
                    <span className="block text-[9px] text-slate-600">✓ corpus-grounded observation</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Panel>

      <div className="space-y-3">
        <Panel>
          <BenchTitle icon={Eye} title="read like the corpus"
            note="a test only counts if the corpus authors an observation for it" />
          <ul className="text-[11px] text-slate-300 space-y-2 list-disc pl-4">
            <li><span className="font-bold text-gold-300">pop vs extinguish:</span> the burning splint POPS for H₂; a flame that merely goes out is CO₂.</li>
            <li><span className="font-bold text-gold-300">bleach vs redden:</span> Cl₂ turns moist blue litmus red <em>and then white</em> — the two-step is the signature.</li>
            <li><span className="font-bold text-gold-300">specific tests:</span> lime water answers only CO₂; K₂Cr₂O₇ orange→green answers only SO₂.</li>
            <li><span className="font-bold text-gold-300">honest absence:</span> greyed gases and &ldquo;not in our corpus&rdquo; rows mean the bench refuses to invent an observation.</li>
          </ul>
          <button onClick={() => { setObs([]); setShowPopCard(false); log('bench reset — fresh gas jar') }}
            className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black bg-slate-800 border border-slate-600 text-slate-300 hover:border-gold-400/60">
            <RotateCcw className="w-3.5 h-3.5" /> reset bench
          </button>
        </Panel>

        {showPopCard && (
          <MisconceptionPanel
            misconception={POP_VS_EXTINGUISH_TEXT}
            commonMisconception={popMiscon?.common_misconception ?? null}
          >
            <p className="text-[11px] text-slate-300">
              The pop test belongs to hydrogen (the acids-and-metals chapter's
              characteristic test); CO₂ extinguishes the flame instead (the
              combustion jar test). Swapping the two is the corpus's own flagged
              confusion.
            </p>
          </MisconceptionPanel>
        )}
      </div>
    </div>
  )
}

// ============================================================ MAIN SHELL ==

const BENCHES: { key: 'titration' | 'salt' | 'gas'; label: string; icon: typeof FlaskConical; bands: BandKey[] }[] = [
  { key: 'titration', label: 'titration', icon: FlaskConical, bands: ['9-10', '11-12'] },
  { key: 'salt', label: 'salt analysis', icon: TestTube2, bands: ['11-12'] },
  { key: 'gas', label: 'gas tests', icon: Flame, bands: ['9-10', '11-12'] },
]

export default function ChemPracticalLab() {
  const [band, setBand] = useState<BandKey>('9-10')
  const [bench, setBench] = useState<'titration' | 'salt' | 'gas'>('titration')
  const [steps, setSteps] = useState<LogStep[]>([])
  const stepN = useRef(0)
  const [benchName, setBenchName] = useState(bench)

  const log = useCallback((text: string) => {
    stepN.current += 1
    setSteps(prev => [...prev.slice(-59), { n: stepN.current, bench: benchName, text }])
  }, [benchName])

  // keep the logged bench label in sync with the active tab
  useEffect(() => { setBenchName(bench) }, [bench])

  const allowed = BENCHES.filter(b => b.bands.includes(band))
  const activeBench = allowed.some(b => b.key === bench) ? bench : allowed[0].key

  return (
    <div className="w-full space-y-4">
      {/* class band */}
      <div className="flex flex-wrap items-center gap-1.5">
        {(['9-10', '11-12'] as BandKey[]).map(b => (
          <button key={b} onClick={() => setBand(b)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${band === b
              ? 'bg-gold-500/20 border-gold-400/60 text-gold-200'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
            classes {b}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-bold text-slate-500">
          deterministic practicals — every observation is a corpus citation
        </span>
      </div>

      {/* bench tabs */}
      <div className="flex flex-wrap gap-1.5">
        {BENCHES.map(b => {
          const locked = !b.bands.includes(band)
          return (
            <button key={b.key} onClick={() => setBench(b.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${bench === b.key && !locked
                ? 'bg-gold-500/15 border-gold-400/60 text-gold-200'
                : locked
                  ? 'bg-slate-900/60 border-slate-800 text-slate-600'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
              <b.icon className="w-3.5 h-3.5" />
              {b.label}
              {locked && <span className="text-[9px] font-bold">11-12 only</span>}
            </button>
          )
        })}
      </div>

      {activeBench === 'titration' && <TitrationBench key={`tit-${band}`} band={band} log={log} />}
      {activeBench === 'salt' && <SaltAnalysisBench key="salt" log={log} />}
      {activeBench === 'gas' && <GasTestsBench key="gas" log={log} />}

      <StepLogPanel steps={steps} onReset={() => { stepN.current = 0; setSteps([]) }} />

      <p className="text-[10px] text-slate-600 leading-relaxed">
        Corpus grounding — titration: acids/bases &amp; neutralisation, indicators,
        molarity and dilution, redox titration with self-indicating KMnO₄ ·
        salt analysis: signs of chemical change, thermal decomposition,
        displacement, double displacement, acid + carbonate, ammonia from
        ammonium salts, AgCl confirmation, potassium flame · gas tests:
        splint tests, lime water, litmus action, SO₂ reducing K₂Cr₂O₇, Cl₂
        bleaching. Observation → node map: components/sandbox/chemPracticalTopics.ts.
      </p>
    </div>
  )
}
