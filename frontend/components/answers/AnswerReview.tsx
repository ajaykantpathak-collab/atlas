'use client'

/**
 * AnswerReview — the exam-prep answer review.
 *
 * Teaches students to write full-marks answers by comparing THEIR answer
 * with the examiner's, criterion by criterion:
 *
 *   1. Side-by-side: model answer (or the authored marking steps as the
 *      skeleton of a perfect answer) next to what the student wrote.
 *   2. Criterion checklist: met/missed against the EXACT criterion text
 *      (backend rubric criteria, or runtime derivations of the model
 *      answer — nothing is ever paraphrased or invented).
 *   3. Writing mechanics: grammar/spelling notes when, and only when, a
 *      real signal exists (grammar_score / grammar_notes from the
 *      evaluator, or the client mechanics pass). No signal -> no section.
 *   4. "How to reach full marks": assembled ONLY from missed criteria —
 *      no missed criteria means the line is simply not shown.
 *
 * Honest absence: no model answer -> criteria only; neither model answer
 * nor criteria -> the component renders nothing at all.
 */

import { motion } from 'framer-motion'
import {
  BookOpen, CheckCircle2, XCircle, Minus, PenLine,
  SpellCheck, ListChecks, GraduationCap,
} from 'lucide-react'

/** One review criterion. `met` is never guessed: null = no verdict exists. */
export interface ReviewCriterion {
  id: string
  description: string
  marks?: number
  met?: boolean | null
}

export default function AnswerReview({
  studentAnswer,
  modelAnswer,
  markingSteps,
  criteria,
  grammarScore = null,
  grammarNotes,
  marksAwarded = null,
  maxMarks = null,
  heading = 'Answer review',
}: {
  /** What the student wrote. */
  studentAnswer?: string | null
  /** Authored model answer (verbatim). */
  modelAnswer?: string | null
  /** Authored examiner marking steps — the skeleton of a perfect answer. */
  markingSteps?: string[] | null
  /** Checklist criteria, with met/missed verdicts when they exist. */
  criteria?: ReviewCriterion[] | null
  /** 0-1, or null/undefined when no reliable grammar signal exists. */
  grammarScore?: number | null
  /** Specific, kind, actionable mechanics notes. */
  grammarNotes?: string[] | null
  marksAwarded?: number | null
  maxMarks?: number | null
  heading?: string
}) {
  const model = modelAnswer?.trim() || ''
  const steps = (markingSteps || []).map((s) => s.trim()).filter(Boolean)
  const list = (criteria || []).filter((c) => c && c.description?.trim())
  const notes = (grammarNotes || []).map((n) => n?.trim()).filter(Boolean) as string[]
  const hasGrammarSection =
    notes.length > 0 || (grammarScore !== null && grammarScore !== undefined)
  const student = studentAnswer?.trim() || ''

  // Honest absence: nothing to compare and nothing to check -> nothing shown.
  if (!model && steps.length === 0 && list.length === 0) return null

  const missed = list.filter((c) => c.met === false)
  const metCount = list.filter((c) => c.met === true).length
  const hasVerdicts = list.some((c) => c.met === true || c.met === false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-3 rounded-xl border border-brand-500/30 bg-brand-500/5 overflow-hidden"
      data-testid="answer-review"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-brand-300 flex-shrink-0" />
          <p className="font-display text-sm font-semibold text-brand-300">
            {heading}
          </p>
        </div>
        {marksAwarded !== null && maxMarks !== null && maxMarks > 0 && (
          <span className="badge text-xs text-white">
            {marksAwarded}/{maxMarks}
          </span>
        )}
      </div>

      {/* Side-by-side: model answer (or marking steps) vs the student's.
          Each panel renders only when its content exists, so callers that
          already show the model answer elsewhere can pass just the
          student's text without duplicating anything. */}
      {(model || steps.length > 0 || student) && (
        <div
          className={`px-4 pb-1 grid gap-3 ${
            (model || steps.length > 0) && student ? 'md:grid-cols-2' : ''
          }`}
        >
          {(model || steps.length > 0) && (
            <div className="rounded-lg border border-surface-300/40 bg-surface-100/40 p-3">
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-surface-600 font-semibold mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {steps.length > 0 && !model ? 'Examiner’s steps' : 'Model answer'}
              </p>
              {model ? (
                <p className="text-sm text-surface-800 leading-relaxed whitespace-pre-wrap">
                  {model}
                </p>
              ) : (
                <ol className="space-y-1.5 list-decimal list-inside">
                  {steps.map((s, i) => (
                    <li key={i} className="text-sm text-surface-800 leading-relaxed">
                      {s}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
          {student && (
            <div className="rounded-lg border border-gold-500/30 bg-gold-500/5 p-3">
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold-300/80 font-semibold mb-1.5">
                <PenLine className="w-3.5 h-3.5" />
                Your answer
              </p>
              <p className="text-sm text-surface-800 leading-relaxed whitespace-pre-wrap">
                {student}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Criterion checklist — exact criterion text, met/missed only when
          a real verdict exists (never guessed). */}
      {list.length > 0 && (
        <div className="px-4 py-3">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-surface-600 font-semibold mb-2">
            <ListChecks className="w-3.5 h-3.5" />
            {hasVerdicts
              ? `Checklist — ${metCount} of ${list.length} covered`
              : 'Examiner checklist'}
          </p>
          <ul className="space-y-1.5">
            {list.map((c) => {
              const status = c.met === true ? 'met' : c.met === false ? 'missed' : 'unknown'
              return (
                <li key={c.id} className="flex items-start gap-2">
                  {status === 'met' ? (
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-mint-300 flex-shrink-0" />
                  ) : status === 'missed' ? (
                    <XCircle className="w-4 h-4 mt-0.5 text-gold-300 flex-shrink-0" />
                  ) : (
                    <Minus className="w-4 h-4 mt-0.5 text-surface-600 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm leading-relaxed ${
                      status === 'missed'
                        ? 'text-gold-200'
                        : status === 'met'
                          ? 'text-surface-800'
                          : 'text-surface-700'
                    }`}
                  >
                    {c.description}
                    {typeof c.marks === 'number' && c.marks > 0 && (
                      <span className="ml-1.5 text-[10px] text-surface-600">
                        ({c.marks} mark{c.marks === 1 ? '' : 's'})
                      </span>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Writing mechanics — only when a real signal exists. */}
      {hasGrammarSection && (
        <div className="px-4 pb-3">
          <div className="rounded-lg border border-surface-300/40 bg-surface-100/40 p-3">
            <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-surface-600 font-semibold mb-1.5">
              <SpellCheck className="w-3.5 h-3.5" />
              Writing mechanics
              {grammarScore !== null && grammarScore !== undefined && (
                <span className="text-surface-600 normal-case tracking-normal font-normal">
                  · {Math.round(grammarScore * 100)}%
                </span>
              )}
            </p>
            {notes.length > 0 ? (
              <ul className="space-y-1">
                {notes.map((n, i) => (
                  <li key={i} className="text-sm text-surface-700 leading-relaxed">
                    {n}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-mint-300 leading-relaxed">
                No mechanics issues flagged — clean writing.
              </p>
            )}
          </div>
        </div>
      )}

      {/* How to reach full marks — assembled ONLY from missed criteria. */}
      {missed.length > 0 && (
        <div className="border-t border-brand-500/20 px-4 py-3">
          <p className="text-sm text-surface-700 leading-relaxed">
            <span className="text-brand-300 font-semibold">
              To reach full marks
            </span>
            , your answer still needs to:{' '}
            {missed.map((c) => c.description.trim()).join('; ')}
          </p>
        </div>
      )}
    </motion.div>
  )
}
