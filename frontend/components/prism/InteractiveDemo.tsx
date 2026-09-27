'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, ArrowRight, RotateCcw, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'ai'
  text: string
  typing?: boolean
}

interface TutorResponse {
  answer: string
  node_id: string | null
  node_title: string | null
  subject: string | null
  class_level: number | null
  confidence: number
  method: string
}

interface EnrichmentData {
  definition: string
  eli5: string
  text_walkthrough: string
  common_misconception: string
  diagnostic_question: string
  on_failure: string
}

/**
 * InteractiveDemo — REAL AI tutor demo for the landing page.
 *
 * Uses the actual backend tutor API (/api/tutor/ask) to answer questions.
 * The backend routes questions to the correct curriculum node using embeddings,
 * then serves the real enrichment content (definition, ELI5, walkthrough).
 *
 * Flow:
 * 1. Student asks → AI calls real backend, gets real enrichment-based answer
 * 2. If the node has a diagnostic question → AI asks it to check understanding
 * 3. Student answers → AI acknowledges and offers to continue or try another topic
 * 4. Signup nudge after a meaningful exchange
 *
 * No hardcoded teaching content. Every answer comes from the real knowledge graph.
 */

const SUGGESTIONS = [
  'Explain photosynthesis',
  'What is the quadratic formula?',
  'How does electricity flow?',
  'Why does salt dissolve in water?',
  'What is Newton\'s second law?',
  'What is DNA?',
  'How do vaccines work?',
  'What is the Pythagorean theorem?',
  'Why is the sky blue?',
  'What are chemical bonds?',
  'What is climate change?',
  'How does refraction work?',
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Levenshtein distance for fuzzy answer matching.
 */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}

/**
 * Fuzzy check if the student's answer is "close enough" to the expected answer.
 * Handles misspellings, plurals, and extra words.
 */
function fuzzyMatch(answer: string, expected: string): boolean {
  const lower = answer.toLowerCase().trim().replace(/\s+/g, ' ')
  const expectedLower = expected.toLowerCase().trim()

  // Direct substring match
  if (lower.includes(expectedLower)) return true
  if (expectedLower.includes(lower) && lower.length > 3) return true

  // Word-by-word fuzzy match
  const answerWords = lower.split(/\s+/)
  const expectedWords = expectedLower.split(/\s+/)

  for (const aw of answerWords) {
    for (const ew of expectedWords) {
      if (aw.length < 3 || ew.length < 3) continue
      if (aw === ew) return true
      if (aw === ew + 's' || ew === aw + 's') return true
      if (aw === ew + 'es' || ew === aw + 'es') return true
      const maxDist = Math.max(1, Math.min(3, Math.floor(ew.length * 0.3)))
      if (levenshtein(aw, ew) <= maxDist) return true
    }
  }

  return false
}

/**
 * Clean up the tutor API response.
 * The backend sometimes returns __TRIGGER_VOCAB__: prefix for vocabulary triggers.
 * In that case, we fetch the enrichment content directly.
 */
function cleanAnswer(answer: string): string {
  if (answer.startsWith('__TRIGGER_VOCAB__:')) {
    return answer.replace('__TRIGGER_VOCAB__:', '').trim()
  }
  return answer
}

export function InteractiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm Atlas AI, powered by your curriculum knowledge graph. Ask me anything — I'll explain it using real content from the syllabus, then check your understanding." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Conversation state
  const [phase, setPhase] = useState<'idle' | 'teaching' | 'checking' | 'done'>('idle')
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [currentEnrichment, setCurrentEnrichment] = useState<EnrichmentData | null>(null)
  const [exchangeCount, setExchangeCount] = useState(0)

  useEffect(() => {
    setSuggestions(shuffle(SUGGESTIONS).slice(0, 4))
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  async function typeResponse(text: string) {
    setMessages((m) => [...m, { role: 'ai', text: '', typing: true }])
    const words = text.split(' ')
    for (let i = 0; i <= words.length; i++) {
      await new Promise((r) => setTimeout(r, 20))
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'ai', text: words.slice(0, i).join(' '), typing: i < words.length }
        return copy
      })
    }
  }

  /**
   * Fetch enrichment data for a node (definition, ELI5, diagnostic question, etc.)
   */
  async function fetchEnrichment(nodeId: string): Promise<EnrichmentData | null> {
    try {
      const res = await fetch(`/api/public/enrichment?node_id=${nodeId}`)
      if (!res.ok) return null
      const data = await res.json()
      return {
        definition: data.definition || '',
        eli5: data.eli5 || '',
        text_walkthrough: data.text_walkthrough || '',
        common_misconception: data.common_misconception || '',
        diagnostic_question: data.diagnostic_question || '',
        on_failure: data.on_failure || '',
      }
    } catch {
      return null
    }
  }

  async function sendQuestion(question: string) {
    if (!question.trim() || loading) return
    setMessages((m) => [...m, { role: 'user', text: question }])
    setInput('')
    setLoading(true)
    setSuggestions([])

    await new Promise((r) => setTimeout(r, 400))

    // If we're in 'checking' phase, treat input as answer to the diagnostic question
    if (phase === 'checking' && currentEnrichment) {
      // We don't have a strict "expected" answer from the backend,
      // so we acknowledge the student's effort and provide the misconception/remediation
      // This is pedagogically sound — the diagnostic question is open-ended
      const hasMisconception = currentEnrichment.common_misconception
      const hasRemediation = currentEnrichment.on_failure && currentEnrichment.on_failure.length > 10

      // Check if the answer seems confident (not "I don't know", "no idea", etc.)
      const lowerAns = question.toLowerCase().trim()
      const isUncertain = ['no idea', "don't know", 'dont know', 'not sure', 'confused', '?', 'idk', 'no clue'].some(
        (p) => lowerAns.includes(p)
      )

      if (isUncertain && hasRemediation) {
        // Student is stuck — provide remediation
        const remediation = currentEnrichment.on_failure.trim()
        await typeResponse(`That's okay! ${remediation}`)
      } else if (hasMisconception) {
        // Share the common misconception as a learning point
        const misconception = currentEnrichment.common_misconception.trim()
        await typeResponse(`Good thinking! A common misconception here is: ${misconception}`)
      } else {
        // Generic acknowledgment
        await typeResponse("Good! Let's continue — ask me another question, or try one of the suggestions below.")
      }

      const newCount = exchangeCount + 1
      setExchangeCount(newCount)

      if (newCount >= 2) {
        // After 2 exchanges, show signup nudge
        await new Promise((r) => setTimeout(r, 400))
        await typeResponse("You're learning! Sign up to get unlimited AI tutoring, diagnostic scans, and personalized learning paths.")
        setPhase('done')
        setShowSignup(true)
        setSuggestions(shuffle(SUGGESTIONS).slice(0, 3))
      } else {
        // Offer to continue
        setPhase('teaching')
        setSuggestions(shuffle(SUGGESTIONS).slice(0, 3))
      }

      setLoading(false)
      return
    }

    // New question — call the REAL tutor API
    setMessages((m) => [...m, { role: 'ai', text: '', typing: true }])

    try {
      const res = await fetch('/api/public/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      })

      if (!res.ok) {
        setMessages((m) => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'ai', text: "I'm having trouble connecting to the knowledge graph right now. Please try again in a moment." }
          return copy
        })
        setLoading(false)
        setSuggestions(shuffle(SUGGESTIONS).slice(0, 4))
        return
      }

      const data: TutorResponse = await res.json()
      let answer = cleanAnswer(data.answer)

      // If the answer is a vocab trigger (just the term name), fetch the enrichment
      if (data.method === 'vocab_trigger' || answer.length < 50) {
        if (data.node_id) {
          const enrichment = await fetchEnrichment(data.node_id)
          if (enrichment) {
            // Use ELI5 if available (simpler), otherwise definition
            answer = enrichment.eli5 || enrichment.definition || answer
            setCurrentEnrichment(enrichment)
          }
        }
      } else if (data.node_id) {
        // Fetch enrichment for the diagnostic question
        const enrichment = await fetchEnrichment(data.node_id)
        if (enrichment) {
          setCurrentEnrichment(enrichment)
        }
      }

      setCurrentNodeId(data.node_id)

      // Type out the real answer
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'ai', text: '', typing: true }
        return copy
      })
      const words = answer.split(' ')
      for (let i = 0; i <= words.length; i++) {
        await new Promise((r) => setTimeout(r, 15))
        setMessages((m) => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'ai', text: words.slice(0, i).join(' '), typing: i < words.length }
          return copy
        })
      }

      // After teaching, ask a follow-up diagnostic question if available
      if (currentEnrichment?.diagnostic_question && currentEnrichment.diagnostic_question.length > 10) {
        await new Promise((r) => setTimeout(r, 400))
        await typeResponse(`Let's check your understanding: ${currentEnrichment.diagnostic_question}`)
        setPhase('checking')
      } else {
        // No diagnostic question available — offer to continue
        await new Promise((r) => setTimeout(r, 400))
        await typeResponse("Ask me another question, or try one of the suggestions below to learn more!")
        setPhase('teaching')
        setSuggestions(shuffle(SUGGESTIONS).slice(0, 3))
      }

    } catch (error) {
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'ai', text: "I'm having trouble connecting right now. Please try again." }
        return copy
      })
      setSuggestions(shuffle(SUGGESTIONS).slice(0, 4))
    }

    setLoading(false)
  }

  function resetChat() {
    setMessages([{ role: 'ai', text: "Hi! I'm Atlas AI, powered by your curriculum knowledge graph. Ask me anything — I'll explain it using real content from the syllabus, then check your understanding." }])
    setCurrentNodeId(null)
    setCurrentEnrichment(null)
    setPhase('idle')
    setExchangeCount(0)
    setShowSignup(false)
    setSuggestions(shuffle(SUGGESTIONS).slice(0, 4))
  }

  const placeholder = phase === 'checking' ? 'Type your answer...' : 'Ask Atlas AI anything...'

  return (
    <div className="glass-card rounded-3xl p-1 max-w-md w-full">
      <div className="bg-surface-100/60 rounded-[1.4rem] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-300/30">
          <div className="w-9 h-9 rounded-xl bg-spectrum-gradient flex items-center justify-center shadow-glow">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Atlas AI</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online · Real curriculum data
            </div>
          </div>
          <button onClick={resetChat} className="ml-auto text-surface-600 hover:text-white transition-colors" title="New chat">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-80 overflow-y-auto px-5 py-4 space-y-3 scrollbar-hide">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-brand-500/20 border border-brand-500/30 text-white rounded-br-md'
                  : 'bg-surface-200/50 border border-surface-300/30 text-surface-800 rounded-bl-md'
              }`}>
                {msg.text}
                {msg.typing && <span className="inline-block w-1.5 h-3.5 ml-1 bg-surface-500 animate-pulse align-middle" />}
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {loading && messages[messages.length - 1]?.role === 'user' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-surface-200/50 border border-surface-300/30 rounded-2xl rounded-bl-md px-4 py-3">
                <Loader2 className="w-4 h-4 text-surface-500 animate-spin" />
              </div>
            </motion.div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (phase === 'idle' || phase === 'done' || phase === 'teaching') && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendQuestion(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-surface-200/50 border border-surface-300/30 text-surface-700 hover:bg-brand-500/20 hover:border-brand-500/30 hover:text-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Signup nudge */}
          <AnimatePresence>
            {showSignup && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="pt-2"
              >
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-spectrum-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Start learning free <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-surface-300/30">
          <form
            onSubmit={(e) => { e.preventDefault(); sendQuestion(input) }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              disabled={loading}
              className="flex-1 bg-surface-200/50 border border-surface-300/30 rounded-xl px-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300 hover:bg-brand-500/30 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
