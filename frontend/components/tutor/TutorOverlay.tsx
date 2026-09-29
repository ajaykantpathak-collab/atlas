'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Send, CheckCircle2, XCircle, ArrowRight,
  Zap, BookOpen, Brain, Sparkles, FlaskConical,
  Lightbulb, AlertCircle, ChevronRight,
} from 'lucide-react'
import type { TopicRegion } from '@/components/world/LivingWorld'
import { NODE_CONTENT, type NodeContent, type DiagnosticQuestion } from '@/lib/realContent'

const LeverSimulation = dynamic(
  () => import('@/components/simulations/maths/LeverSimulation').then(m => m.LeverSimulation),
  { ssr: false }
)
const PulleySimulation = dynamic(
  () => import('@/components/simulations/maths/PulleySimulation').then(m => m.PulleySimulation),
  { ssr: false }
)

/* ═══════════════════════════════════════════════════════════════════════════
   TutorOverlay — Friendly, paced, progressive disclosure.

   The tutor is a cool older sibling who happens to be a physics genius.
   It EXPLAINS, doesn't interrogate. It:
   - Reveals ONE thing at a time (no content walls)
   - After the simulation, EXPLAINS what the student saw (not "guess what happened")
   - Gives the formula and explains why it works
   - Chunks the walkthrough into digestible pieces
   - Shows real-world relevance
   - Warns about common mistakes directly
   - Tests with real diagnostic questions, one at a time
   - When the student asks a question, answers it FULLY first, then continues

   Flow:
   1. Greeting (1 line, friendly)
   2. Simulation (if any) — "play with this"
   3. Explanation of what they saw — "here's why that works"
   4. ELI5 — simple explanation
   5. Definition — formal, with formula
   6. Walkthrough chunks — one at a time, continue between each
   7. Real-world application
   8. Common mistake warning
   9. Quiz 1 → feedback → next quiz → ... → completion
   ═══════════════════════════════════════════════════════════════════════════ */

interface TutorMessage {
  id: string
  role: 'tutor' | 'student'
  content?: string
  type?: 'text' | 'simulation' | 'definition' | 'walkthrough' |
          'realworld' | 'misconception' | 'quiz' | 'feedback' | 'complete' |
          'help-options' | 'extra-explanation' | 'worked-example' | 'eli5-help'
  quizData?: DiagnosticQuestion
  feedbackData?: {
    correct: boolean
    explanation: string
    misconception?: string
    onFailure?: string
  }
  helpData?: {
    quizId: string
    question: string
    explanation: string
  }
  simType?: 'lever' | 'pulley'
}

interface TutorOverlayProps {
  region: TopicRegion
  onClose: () => void
  onMasteryUpdate: (regionId: string, mastery: number) => void
}

// ─── Personality ────────────────────────────────────────────────────────────

const GREETINGS = [
  (title: string, marks: number) => `Hey. ${title}. Worth ${marks} marks in your exam. Let's make sure you get every one.`,
  (title: string, marks: number) => `Alright, ${title}. ${marks} marks of exam gold. Ready?`,
  (title: string, _marks: number) => `${title}. I've got you. Let's build this up step by step.`,
]

const CORRECT_RESPONSES = [
  "Yes. You got it. No luck involved.",
  "Nailed it. Physics isn't that hard when it clicks.",
  "Correct. You're not messing around today.",
  "Right. That's marks in the bag.",
]

const WRONG_RESPONSES = [
  (explanation: string) => `Not quite. ${explanation} Most students need a couple tries here.`,
  (explanation: string) => `Close, but no. ${explanation} Let's fix this now so it doesn't happen in the exam.`,
]

// ─── Build the step sequence for a node ─────────────────────────────────────

function buildSteps(content: NodeContent, region: TopicRegion): TutorMessage[] {
  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)](content.title, region.examMarks)
  const steps: TutorMessage[] = []
  let n = 0
  const id = (s: string) => `step-${n++}-${s}`

  // 1. Greeting — friendly, one line
  steps.push({ id: id('greeting'), role: 'tutor', content: greeting, type: 'text' })

  // 2. Simulation (guided discovery — this IS the learning)
  if (content.simulationType !== 'none') {
    steps.push({
      id: id('sim-intro'),
      role: 'tutor',
      content: content.simulationType === 'lever'
        ? `Let's start with a challenge. 3 levels — each teaches you something about how levers work. Hints available if you need them.`
        : `Let's start with a challenge. You'll see how pulleys make lifting easier — and why.`,
      type: 'text',
    })
    steps.push({
      id: id('simulation'),
      role: 'tutor',
      type: 'simulation',
      simType: content.simulationType,
    })
  }

  // 3. ELI5 — reinforce in simple words
  steps.push({
    id: id('eli5'),
    role: 'tutor',
    content: content.eli5,
    type: 'text',
  })

  // 4. Definition — formalize: formula, units
  steps.push({
    id: id('definition'),
    role: 'tutor',
    content: content.definition,
    type: 'definition',
  })

  // 5. ONE worked example — not 5 text chunks
  const workedExample = extractWorkedExample(content)
  if (workedExample) {
    steps.push({
      id: id('worked-example'),
      role: 'tutor',
      content: workedExample,
      type: 'walkthrough',
    })
  }

  // 6. Real-world — why it matters
  steps.push({
    id: id('realworld'),
    role: 'tutor',
    content: content.realWorldApp,
    type: 'realworld',
  })

  // 7. Common mistake
  steps.push({
    id: id('misconception'),
    role: 'tutor',
    content: content.misconception,
    type: 'misconception',
  })

  // 8. Quiz intro — one line
  steps.push({
    id: id('quiz-intro'),
    role: 'tutor',
    content: `Let's test what you've learned. ${content.diagnosticQuestions.length} questions — if you get one wrong, I'll explain it right there. Stuck? Tap "Help me" anytime.`,
    type: 'text',
  })

  // 9. First quiz
  steps.push({
    id: id('quiz-0'),
    role: 'tutor',
    type: 'quiz',
    quizData: content.diagnosticQuestions[0],
  })

  return steps
}

// ─── Extract ONE worked example from the walkthrough ────────────────────────
// Instead of dumping 6 walkthrough chunks, pull just the worked example
function extractWorkedExample(content: NodeContent): string | null {
  const text = content.walkthrough
  // Find "Worked example" in the text
  const match = text.match(/Worked example[:\s\S]*?(?=\n\n[A-Z]|\n[A-Z][a-z]*:|$)/i)
  if (match) return match[0].trim()
  // Fallback: take the first 2 paragraphs that contain a number
  const paragraphs = text.split(/\n\n/).filter(p => /\d/.test(p) && p.trim().length > 30)
  if (paragraphs.length > 0) return paragraphs[0].trim()
  // Last resort: first paragraph
  const firstChunk = text.split(/\n\n/)[0]
  return firstChunk?.trim() || null
}

function completionMessage(content: NodeContent, correct: number, total: number, mastery: number): string {
  const pct = Math.round((correct / total) * 100)
  if (mastery >= 0.7) {
    return `That's all ${content.diagnosticQuestions.length} questions. You got ${correct}/${total} (${pct}%). You've mastered this! Look at your map — this region just came alive.`
  }
  return `That's all ${content.diagnosticQuestions.length} questions. You got ${correct}/${total} (${pct}%). You're at ${Math.round(mastery * 100)}% mastery. Tap "Help me" on any question you got wrong to understand it better, or come back later to try again.`
}

// ─── Component ──────────────────────────────────────────────────────────────

export function TutorOverlay({ region, onClose, onMasteryUpdate }: TutorOverlayProps) {
  const [allSteps, setAllSteps] = useState<TutorMessage[]>([])
  const [visibleCount, setVisibleCount] = useState(0) // how many steps are visible
  const [input, setInput] = useState('')
  const [answeredQuizzes, setAnsweredQuizzes] = useState<Set<string>>(new Set())
  const [mastery, setMastery] = useState(region.mastery)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [quizQueue, setQuizQueue] = useState<DiagnosticQuestion[]>([])
  const [allDone, setAllDone] = useState(false)
  const [usedHelpOptions, setUsedHelpOptions] = useState<Set<string>>(new Set())

  // Refs to avoid stale closures in rapid quiz answering
  const correctCountRef = useRef(0)
  const totalCountRef = useRef(0)
  const masteryRef = useRef(region.mastery)
  const quizQueueRef = useRef<DiagnosticQuestion[]>([])
  const answeredQuizzesRef = useRef<Set<string>>(new Set())
  const usedHelpOptionsRef = useRef<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  const content = NODE_CONTENT[region.id]

  // Initialize
  useEffect(() => {
    if (!content) {
      setAllSteps([{
        id: 'fallback',
        role: 'tutor',
        content: `${region.title} — content for this node is being prepared. Try one of the 5 active nodes.`,
      }])
      setVisibleCount(1)
      return
    }
    const steps = buildSteps(content, region)
    setAllSteps(steps)
    setVisibleCount(1) // show only greeting first
    setAnsweredQuizzes(new Set())
    answeredQuizzesRef.current = new Set()
    setUsedHelpOptions(new Set())
    usedHelpOptionsRef.current = new Set()
    setMastery(region.mastery)
    setCorrectCount(0)
    setTotalCount(0)
    setAllDone(false)
    // Sync refs
    correctCountRef.current = 0
    totalCountRef.current = 0
    masteryRef.current = region.mastery
    // Prepare quiz queue (all quizzes after the first, which is in steps)
    const queue = content.diagnosticQuestions.slice(1)
    quizQueueRef.current = queue
    setQuizQueue(queue)
  }, [region, content])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [visibleCount, allSteps])

  // ─── Help option handler ─────────────────────────────────────────────────
  const handleHelpOption = useCallback((option: string, helpData: NonNullable<TutorMessage['helpData']>) => {
    if (!content) return
    // Mark this help-options message as used (disable buttons)
    if (usedHelpOptionsRef.current.has(helpData.quizId)) return
    usedHelpOptionsRef.current = new Set(usedHelpOptionsRef.current)
    usedHelpOptionsRef.current.add(helpData.quizId)
    setUsedHelpOptions(usedHelpOptionsRef.current)

    const helpMsgs: TutorMessage[] = []

    if (option === 'explain') {
      helpMsgs.push({
        id: `${helpData.quizId}-extra-explain`,
        role: 'tutor',
        content: `Let me try a different way:\n\n${content.eli5}\n\nFor this specific question: ${helpData.explanation}`,
        type: 'extra-explanation',
      })
    } else if (option === 'worked') {
      const example = extractWorkedExample(content) || content.walkthrough.split(/\n\n/)[0]
      helpMsgs.push({
        id: `${helpData.quizId}-worked`,
        role: 'tutor',
        content: `Here's a worked example — follow the steps:\n\n${example}`,
        type: 'worked-example',
      })
    } else if (option === 'eli5') {
      helpMsgs.push({
        id: `${helpData.quizId}-eli5`,
        role: 'tutor',
        content: `Okay, simplest version:\n\n${content.eli5}\n\nThe answer to this question is: ${helpData.explanation}`,
        type: 'eli5-help',
      })
    }

    // After help (or "next"), show next quiz or completion
    const nextQuiz = quizQueueRef.current[0]
    if (nextQuiz) {
      quizQueueRef.current = quizQueueRef.current.slice(1)
      setQuizQueue(quizQueueRef.current)
      helpMsgs.push({
        id: `quiz-${Date.now()}-help`,
        role: 'tutor',
        type: 'quiz',
        quizData: nextQuiz,
      })
    } else {
      helpMsgs.push({
        id: `${helpData.quizId}-complete`,
        role: 'tutor',
        content: completionMessage(content, correctCountRef.current, totalCountRef.current, masteryRef.current),
        type: 'complete',
      })
      setAllDone(true)
    }

    setAllSteps(prev => [...prev, ...helpMsgs])
    setVisibleCount(prev => prev + helpMsgs.length)
  }, [content])

  // ─── Continue button ─────────────────────────────────────────────────────
  const handleContinue = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 1, allSteps.length))
  }, [allSteps.length])

  // ─── Quiz answer ─────────────────────────────────────────────────────────
  const handleQuizAnswer = useCallback((quizId: string, optionIndex: number) => {
    if (!content || answeredQuizzesRef.current.has(quizId)) return

    // Find the quiz in allSteps
    const quizMsg = allSteps.find(m => m.id === quizId)
    if (!quizMsg?.quizData) return

    const quiz = quizMsg.quizData
    const isCorrect = optionIndex === quiz.correctIndex

    // Use refs to avoid stale closures
    answeredQuizzesRef.current = new Set(answeredQuizzesRef.current)
    answeredQuizzesRef.current.add(quizId)
    setAnsweredQuizzes(answeredQuizzesRef.current)

    const newCorrect = correctCountRef.current + (isCorrect ? 1 : 0)
    const newTotal = totalCountRef.current + 1
    correctCountRef.current = newCorrect
    totalCountRef.current = newTotal
    setCorrectCount(newCorrect)
    setTotalCount(newTotal)

    const newMastery = Math.max(0, Math.min(1, masteryRef.current + (isCorrect ? 0.15 : -0.05)))
    masteryRef.current = newMastery
    setMastery(newMastery)
    onMasteryUpdate(region.id, newMastery)

    const response = isCorrect
      ? CORRECT_RESPONSES[Math.floor(Math.random() * CORRECT_RESPONSES.length)]
      : WRONG_RESPONSES[Math.floor(Math.random() * WRONG_RESPONSES.length)](quiz.explanation)

    // Add feedback + next quiz (or completion) to allSteps
    const feedbackMsgs: TutorMessage[] = [
      { id: `${quizId}-student`, role: 'student', content: quiz.options[optionIndex] },
      {
        id: `${quizId}-feedback`,
        role: 'tutor',
        content: response,
        type: 'feedback',
        feedbackData: {
          correct: isCorrect,
          explanation: quiz.explanation,
          misconception: isCorrect ? undefined : content.misconception,
          onFailure: isCorrect ? undefined : quiz.onFailure,
        },
      },
    ]

    // If wrong, show help options BEFORE next quiz
    if (!isCorrect) {
      feedbackMsgs.push({
        id: `${quizId}-help`,
        role: 'tutor',
        type: 'help-options',
        helpData: {
          quizId,
          question: quiz.question,
          explanation: quiz.explanation,
        },
      })
    } else {
      // If correct, go straight to next quiz
      const nextQuiz = quizQueueRef.current[0]
      if (nextQuiz) {
        quizQueueRef.current = quizQueueRef.current.slice(1)
        setQuizQueue(quizQueueRef.current)
        feedbackMsgs.push({
          id: `quiz-${Date.now()}-${newTotal}`,
          role: 'tutor',
          type: 'quiz',
          quizData: nextQuiz,
        })
      } else {
        feedbackMsgs.push({
          id: `${quizId}-complete`,
          role: 'tutor',
          content: completionMessage(content, newCorrect, newTotal, newMastery),
          type: 'complete',
        })
        setAllDone(true)
      }
    }

    setAllSteps(prev => [...prev, ...feedbackMsgs])
    setVisibleCount(prev => prev + feedbackMsgs.length)
  }, [allSteps, content, onMasteryUpdate, region.id])

  // ─── Free-text chat ──────────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    if (!input.trim() || !content) return
    const studentMsg: TutorMessage = {
      id: `${Date.now()}-input`,
      role: 'student',
      content: input,
    }
    setAllSteps(prev => [...prev, studentMsg])
    setVisibleCount(prev => prev + 1)
    setInput('')

    setTimeout(() => {
      const q = input.toLowerCase()
      let reply = ''
      if (q.includes('formula') || q.includes('equation')) {
        reply = `Key formula: ${content.definition.split('\n')[0]}`
      } else if (q.includes('example') || q.includes('real')) {
        reply = content.realWorldApp
      } else if (q.includes('simple') || q.includes('eli5') || q.includes('understand')) {
        reply = content.eli5
      } else if (q.includes('mistake') || q.includes('wrong')) {
        reply = `Common mistake: ${content.misconception}`
      } else {
        reply = `Good question. The key idea: ${content.eli5}\n\nRe-read the walkthrough above, or ask me something more specific.`
      }
      setAllSteps(prev => [...prev, {
        id: `${Date.now()}-reply`,
        role: 'tutor',
        content: reply,
        type: 'text',
      }])
      setVisibleCount(prev => prev + 1)
    }, 400)
  }, [input, content])

  // ─── What's currently visible ────────────────────────────────────────────
  const visibleSteps = allSteps.slice(0, visibleCount)
  const lastStep = visibleSteps[visibleSteps.length - 1]
  const canContinue = visibleCount < allSteps.length &&
                      !lastStep?.type?.startsWith('quiz') &&
                      lastStep?.type !== 'feedback' &&
                      lastStep?.type !== 'complete' &&
                      lastStep?.type !== 'help-options'
  const isWaitingForQuiz = lastStep?.type === 'quiz' && !answeredQuizzes.has(lastStep.id)
  const isOnSimulation = lastStep?.type === 'simulation'

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute top-0 right-0 bottom-0 w-full max-w-md z-30 bg-[#0e0c18]/95 backdrop-blur-xl border-l border-white/10 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: `rgba(${region.colorRgb.join(',')}, 0.2)` }}
          >
            <Brain size={20} style={{ color: `rgb(${region.colorRgb.join(',')})` }} />
          </div>
          <div>
            <div className="text-white font-bold text-sm">{content?.title || region.title}</div>
            <div className="text-white/40 text-xs font-mono">
              {region.examMarks} marks · {Math.round(mastery * 100)}% mastery
              {totalCount > 0 && ` · ${correctCount}/${totalCount}`}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors p-1">
          <X size={20} />
        </button>
      </div>

      {/* Mastery bar */}
      <div className="h-1 bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: `rgb(${region.colorRgb.join(',')})` }}
          animate={{ width: `${mastery * 100}%` }}
          transition={{ type: 'spring', damping: 20 }}
        />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {visibleSteps.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onQuizAnswer={(idx) => handleQuizAnswer(msg.id, idx)}
            onHelpOption={(option) => msg.helpData && handleHelpOption(option, msg.helpData)}
            helpUsed={msg.helpData ? usedHelpOptions.has(msg.helpData.quizId) : false}
          />
        ))}

        {/* Continue button */}
        {canContinue && !isWaitingForQuiz && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleContinue}
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            {isOnSimulation ? "I've played enough — Continue" : 'Continue'}
            <ChevronRight size={16} />
          </motion.button>
        )}

        {/* Waiting for quiz answer hint */}
        {isWaitingForQuiz && (
          <div className="text-center text-xs text-white/30 font-mono py-2">
            ↑ Answer the question above to continue
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask about ${content?.title || region.title}...`}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
          />
          <button
            onClick={handleSend}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Send size={16} className="text-white/60" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Message Bubble ─────────────────────────────────────────────────────────

function MessageBubble({
  message,
  onQuizAnswer,
  onHelpOption,
  helpUsed,
}: {
  message: TutorMessage
  onQuizAnswer: (index: number) => void
  onHelpOption?: (option: string) => void
  helpUsed?: boolean
}) {
  const isTutor = message.role === 'tutor'

  // Simulation
  if (message.type === 'simulation') {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {message.simType === 'lever' && <LeverSimulation />}
        {message.simType === 'pulley' && <PulleySimulation />}
      </motion.div>
    )
  }

  // Quiz
  if (message.type === 'quiz' && message.quizData) {
    return <QuizBubble quizData={message.quizData} onAnswer={onQuizAnswer} />
  }

  // Feedback
  if (message.type === 'feedback' && message.feedbackData) {
    const { correct, explanation, misconception, onFailure } = message.feedbackData
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-4 border ${correct ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}
      >
        <div className="flex items-start gap-3">
          {correct ? <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                   : <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />}
          <div className="space-y-2">
            <p className="text-sm text-white/90">{message.content}</p>
            <div className="rounded-lg bg-white/5 px-3 py-2">
              <p className="text-xs text-white/70 leading-relaxed">{explanation}</p>
            </div>
            {misconception && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/10 px-3 py-2">
                <AlertCircle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/70 italic">{misconception}</p>
              </div>
            )}
            {onFailure && (
              <div className="flex items-start gap-2 rounded-lg bg-gold-500/5 border border-gold-500/10 px-3 py-2">
                <ArrowRight size={12} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gold-200/70">
                  {onFailure.replace(/Review c\d+_phy_\d+\s*—?\s*/g, 'Review: ').replace(/c\d+_phy_\d+/g, 'the previous topic')}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Help options — shown after a wrong answer
  if (message.type === 'help-options' && message.helpData && onHelpOption) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl bg-gold-500/5 border border-gold-500/15 p-4 ${helpUsed ? 'opacity-40' : ''}`}
      >
        <p className="text-sm text-white/80 mb-3">{helpUsed ? '✓ Done' : 'Need more help with this one?'}</p>
        <div className="space-y-2">
          <button
            onClick={() => onHelpOption('explain')}
            disabled={helpUsed}
            className="w-full text-left px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 disabled:cursor-default disabled:hover:bg-white/5"
          >
            <Lightbulb size={14} className="text-amber-400" />
            Explain it differently
          </button>
          <button
            onClick={() => onHelpOption('worked')}
            disabled={helpUsed}
            className="w-full text-left px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 disabled:cursor-default disabled:hover:bg-white/5"
          >
            <BookOpen size={14} className="text-gold-400" />
            Show a worked example
          </button>
          <button
            onClick={() => onHelpOption('eli5')}
            disabled={helpUsed}
            className="w-full text-left px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 disabled:cursor-default disabled:hover:bg-white/5"
          >
            <Sparkles size={14} className="text-purple-400" />
            Explain like I'm 5
          </button>
          <button
            onClick={() => onHelpOption('next')}
            disabled={helpUsed}
            className="w-full text-left px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 disabled:cursor-default disabled:hover:bg-white/5"
          >
            <ArrowRight size={14} className="text-white/40" />
            Move to next question
          </button>
        </div>
      </motion.div>
    )
  }

  // Extra explanation / worked example / eli5 help
  if (message.type === 'extra-explanation' || message.type === 'worked-example' || message.type === 'eli5-help') {
    const label = message.type === 'extra-explanation' ? 'EXPLAINED DIFFERENTLY' :
                  message.type === 'worked-example' ? 'WORKED EXAMPLE' :
                  'SIMPLE VERSION'
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gold-500/5 border border-gold-500/15 rounded-2xl p-4"
      >
        <div className="flex items-center gap-2 text-xs text-gold-400/70 font-mono mb-2">
          <Lightbulb size={14} />
          {label}
        </div>
        <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </motion.div>
    )
  }

  // Definition
  if (message.type === 'definition') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-4"
      >
        <div className="flex items-center gap-2 text-xs text-white/40 font-mono mb-2">
          <BookOpen size={14} />
          DEFINITION
        </div>
        <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </motion.div>
    )
  }

  // Walkthrough
  if (message.type === 'walkthrough') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-4"
      >
        <div className="flex items-center gap-2 text-xs text-white/40 font-mono mb-2">
          <Sparkles size={14} />
          WALKTHROUGH
        </div>
        <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </motion.div>
    )
  }

  // Real world
  if (message.type === 'realworld') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4"
      >
        <div className="flex items-center gap-2 text-xs text-amber-400/70 font-mono mb-2">
          <Lightbulb size={14} />
          REAL WORLD
        </div>
        <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </motion.div>
    )
  }

  // Misconception
  if (message.type === 'misconception') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/5 border border-red-500/15 rounded-2xl p-4"
      >
        <div className="flex items-center gap-2 text-xs text-red-400/70 font-mono mb-2">
          <AlertCircle size={14} />
          COMMON MISTAKE
        </div>
        <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </motion.div>
    )
  }

  // Completion
  if (message.type === 'complete') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-4 border border-amber-500/20 bg-amber-500/10"
      >
        <div className="flex items-center gap-2 text-xs text-amber-300 font-mono mb-2">
          <FlaskConical size={14} />
          SESSION COMPLETE
        </div>
        <p className="text-sm text-white/90">{message.content}</p>
      </motion.div>
    )
  }

  // Default text bubble
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isTutor ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
        isTutor ? 'bg-white/5 border border-white/10 text-white/90'
                : 'bg-amber-500/15 border border-amber-500/20 text-white'
      }`}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  )
}

// ─── Quiz Bubble ────────────────────────────────────────────────────────────

function QuizBubble({
  quizData,
  onAnswer,
}: {
  quizData: DiagnosticQuestion
  onAnswer: (index: number) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    onAnswer(index)
  }

  const levelColors: Record<string, string> = {
    recall: 'text-gold-400',
    reasoning: 'text-green-400',
    evaluate: 'text-amber-400',
    apply: 'text-pink-400',
    create: 'text-purple-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
          <Zap size={12} />
          DIAGNOSTIC
        </div>
        <span className={`text-xs font-mono uppercase ${levelColors[quizData.level] || 'text-white/40'}`}>
          {quizData.level}
        </span>
      </div>
      <p className="text-sm text-white/90 font-medium leading-relaxed">{quizData.question}</p>
      <div className="space-y-2">
        {quizData.options.map((option, i) => {
          const isSelected = selected === i
          const isCorrect = i === quizData.correctIndex
          const showResult = answered
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                showResult
                  ? isCorrect
                    ? 'bg-green-500/15 border border-green-500/30 text-green-300'
                    : isSelected
                    ? 'bg-red-500/15 border border-red-500/30 text-red-300'
                    : 'bg-white/5 border border-white/5 text-white/40'
                  : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="font-mono text-xs mr-2 opacity-50">{String.fromCharCode(65 + i)}</span>
              {option}
              {showResult && isCorrect && <CheckCircle2 size={14} className="inline ml-2" />}
              {showResult && isSelected && !isCorrect && <XCircle size={14} className="inline ml-2" />}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
