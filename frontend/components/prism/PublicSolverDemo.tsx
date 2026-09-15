'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator, Loader2, CheckCircle2, XCircle, Sparkles, ArrowRight, Zap,
} from 'lucide-react'
import Link from 'next/link'

interface ProblemType {
  id: string
  name: string
  description: string
  topic: string
  class_level: string
  example: string
  num_steps: number
}

interface StepField {
  name: string
  label: string
  type: string
  required: boolean
  default: string
  placeholder: string
  help_text: string
}

interface StepType {
  id: string
  name: string
  description: string
  fields: StepField[]
  thinking: {
    question: string
    options: string[]
    correct: string
    explanation: string
  }
}

interface SolveResult {
  success: boolean
  answer: string
  steps: string[]
  verified: boolean
  verification_msg?: string
  error?: string
}

// Map problem type IDs to step type IDs (problem types have _problem suffix, step types don't)
const PROBLEM_TO_STEP: Record<string, string> = {
  solve_quadratic: 'solve_equation',
  arc_length_problem: 'arc_length',
  sector_area_problem: 'sector_area',
  volume_hemisphere_problem: 'volume_hemisphere',
  standard_deviation_problem: 'standard_deviation',
  pythagoras_hypotenuse_problem: 'pythagoras_hypotenuse',
  pythagoras_side_problem: 'pythagoras_side',
  find_percentage_of: 'percentage_of',
  find_percentage: 'percentage',
  percentage_change: 'percentage_change',
  simple_interest_problem: 'simple_interest',
  compound_interest_problem: 'compound_interest',
  area_circle_problem: 'area_circle',
}

export function PublicSolverDemo() {
  const [problemTypes, setProblemTypes] = useState<ProblemType[]>([])
  const [selectedType, setSelectedType] = useState<ProblemType | null>(null)
  const [stepType, setStepType] = useState<StepType | null>(null)
  const [loadingTypes, setLoadingTypes] = useState(true)
  const [loadingStep, setLoadingStep] = useState(false)
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [solving, setSolving] = useState(false)
  const [result, setResult] = useState<SolveResult | null>(null)
  const [thinkingAnswer, setThinkingAnswer] = useState<string | null>(null)
  const [thinkingChecked, setThinkingChecked] = useState(false)

  // Load problem types
  useEffect(() => {
    fetch('/api/public/solver-demo?class_level=10')
      .then((r) => r.json())
      .then((data) => {
        setProblemTypes(data.problem_types || [])
        setLoadingTypes(false)
      })
      .catch(() => setLoadingTypes(false))
  }, [])

  // Load step type when a problem type is selected
  async function selectProblem(pt: ProblemType) {
    setSelectedType(pt)
    setResult(null)
    setThinkingAnswer(null)
    setThinkingChecked(false)
    setInputs({})
    setLoadingStep(true)

    const stepId = PROBLEM_TO_STEP[pt.id] || pt.id
    try {
      const res = await fetch(`/api/public/solver-demo?step_type=${stepId}`)
      const data = await res.json()
      setStepType(data)
      // Initialize inputs with defaults
      const initInputs: Record<string, string> = {}
      ;(data.fields || []).forEach((f: StepField) => {
        initInputs[f.name] = f.default || ''
      })
      setInputs(initInputs)
    } catch {
      setStepType(null)
    } finally {
      setLoadingStep(false)
    }
  }

  // Solve
  async function solve() {
    if (!stepType || !selectedType) return
    setSolving(true)
    setResult(null)

    try {
      const stepId = PROBLEM_TO_STEP[selectedType.id] || selectedType.id
      const res = await fetch('/api/public/solver-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step_type_id: stepId, inputs }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ success: false, answer: '', steps: [], verified: false, error: 'Failed to connect to solver' })
    } finally {
      setSolving(false)
    }
  }

  if (loadingTypes) {
    return (
      <div className="glass-card rounded-3xl p-12 text-center">
        <Loader2 className="w-8 h-8 text-brand-400 animate-spin mx-auto mb-4" />
        <p className="text-sm text-surface-600">Loading problem types...</p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-3xl p-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Deterministic Math Solver</h3>
          <p className="text-xs text-surface-600">Pick a problem type. Input your numbers. Get a verified step-by-step solution.</p>
        </div>
      </div>

      {!selectedType && (
        <>
          <p className="text-sm text-surface-600 mb-4">Choose a problem type to try:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {problemTypes.map((pt) => (
              <motion.button
                key={pt.id}
                whileHover={{ y: -2, scale: 1.02 }}
                onClick={() => selectProblem(pt)}
                className="text-left p-4 rounded-xl bg-surface-200/40 border border-surface-300/20 hover:border-emerald-500/40 transition-all"
              >
                <div className="text-sm font-medium text-white">{pt.name}</div>
                <div className="text-xs text-surface-600 mt-1">{pt.example}</div>
                <div className="text-xs text-emerald-400 mt-2">Class {pt.class_level} · {pt.topic}</div>
              </motion.button>
            ))}
          </div>
        </>
      )}

      {selectedType && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedType.id}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          >
            {/* Back button */}
            <button
              onClick={() => { setSelectedType(null); setStepType(null); setResult(null) }}
              className="text-xs text-surface-600 hover:text-white transition-colors mb-4"
            >
              ← Back to problem types
            </button>

            <div className="text-lg font-bold text-white mb-1">{selectedType.name}</div>
            <div className="text-sm text-surface-600 mb-4">{selectedType.example}</div>

            {loadingStep && (
              <div className="flex items-center gap-2 py-4">
                <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
                <span className="text-sm text-surface-600">Loading input fields...</span>
              </div>
            )}

            {/* Thinking step */}
            {stepType?.thinking && !thinkingChecked && (
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 mb-4">
                <div className="text-xs text-violet-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Thinking step — test your understanding
                </div>
                <div className="text-sm text-white mb-3">{stepType.thinking.question}</div>
                <div className="space-y-2">
                  {stepType.thinking.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setThinkingAnswer(opt)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-all ${
                        thinkingAnswer === opt
                          ? 'bg-violet-500/20 border-violet-500/40 text-white'
                          : 'bg-surface-200/30 border-surface-300/20 text-surface-600 hover:border-violet-500/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setThinkingChecked(true)}
                  disabled={!thinkingAnswer}
                  className="mt-3 w-full px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium hover:bg-violet-500/30 transition-all disabled:opacity-50"
                >
                  Check Answer
                </button>
              </div>
            )}

            {/* Thinking result */}
            {stepType?.thinking && thinkingChecked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className={`rounded-xl p-4 mb-4 border ${
                  thinkingAnswer === stepType.thinking.correct
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-amber-500/10 border-amber-500/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {thinkingAnswer === stepType.thinking.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-400" />
                  )}
                  <span className="text-sm font-medium text-white">
                    {thinkingAnswer === stepType.thinking.correct ? 'Correct!' : 'Not quite.'}
                  </span>
                </div>
                <p className="text-xs text-surface-600">{stepType.thinking.explanation}</p>
              </motion.div>
            )}

            {/* Input form */}
            {stepType && !loadingStep && (
              <div className="space-y-3 mb-4">
                <div className="text-xs text-surface-600 mb-2">Enter your values:</div>
                {stepType.fields.map((field) => (
                  <div key={field.name}>
                    <label className="text-xs text-surface-600 block mb-1">{field.label}</label>
                    <input
                      type="text"
                      value={inputs[field.name] || ''}
                      onChange={(e) => setInputs({ ...inputs, [field.name]: e.target.value })}
                      placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                      className="w-full bg-surface-200/50 border border-surface-300/30 rounded-lg px-3 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                ))}
                <button
                  onClick={solve}
                  disabled={solving || stepType.fields.some((f) => f.required && !inputs[f.name])}
                  className="w-full px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {solving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {solving ? 'Solving with SymPy...' : 'Solve Step'}
                </button>
              </div>
            )}

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-4 border ${
                    result.success
                      ? 'bg-emerald-500/10 border-emerald-500/20'
                      : 'bg-rose-500/10 border-rose-500/20'
                  }`}
                >
                  {result.success ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-medium text-white">Solved & Verified</span>
                        {result.verified && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="text-lg font-bold text-white mb-3">{result.answer}</div>
                      <div className="space-y-1.5">
                        <div className="text-xs text-surface-600 mb-1">Steps:</div>
                        {result.steps.map((step, i) => (
                          <div key={i} className="text-sm text-surface-700 font-mono bg-surface-200/30 rounded-lg px-3 py-1.5">
                            {step}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span className="text-sm font-medium text-white">Could not solve</span>
                      </div>
                      <p className="text-xs text-surface-600">{result.error || 'Check your inputs and try again.'}</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-surface-300/20">
              <p className="text-xs text-surface-600 mb-3">
                This is a tiny demo. The full solver has 113 operations across 108 problem types —
                from Class 5 fractions to Class 12 calculus.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Try the full solver <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
