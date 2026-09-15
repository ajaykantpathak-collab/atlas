'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Lightbulb, Brain, Lock, Unlock, ChevronRight,
  TrendingUp, Award, Zap, BookOpen, AlertCircle, Sparkles,
} from 'lucide-react'
import { useSocraticAsk, useSocraticHint } from '@/hooks/useAnalytics'
import { useAuthStore } from '@/stores/authStore'
import AuthGuard from '@/components/AuthGuard'

interface Message {
  id: string
  role: 'user' | 'tutor'
  content: string
  hint?: string
  feedback?: string
  masteryLevel?: string
  hintLevel?: number
  qualityScore?: number
  pcrLocked?: boolean
}

export default function SocraticTutorPage() {
  return (
    <AuthGuard allowedRoles={['student', 'admin']}>
      <SocraticTutorContent />
    </AuthGuard>
  )
}

function SocraticTutorContent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [mastery, setMastery] = useState(0.2) // Default low mastery
  const [nodeId, setNodeId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const user = useAuthStore((s) => s.user)
  const askMutation = useSocraticAsk()
  const hintMutation = useSocraticHint()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || askMutation.isPending) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }
    setMessages((prev) => [...prev, userMsg])
    const query = input
    setInput('')

    try {
      const result = await askMutation.mutateAsync({
        query,
        user_id: user?.id || 'demo_user',
        node_id: nodeId || undefined,
        mastery,
      })

      const tutorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'tutor',
        content: result.question,
        hint: result.hint,
        feedback: result.feedback,
        masteryLevel: result.mastery_level,
        hintLevel: result.hint_level,
        qualityScore: result.quality_score,
        pcrLocked: result.mastery_level === 'low',
      }
      setMessages((prev) => [...prev, tutorMsg])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'tutor',
          content: 'Sorry, I had trouble processing that. Please try again.',
        },
      ])
    }
  }

  const handleHint = async () => {
    if (!messages.length || hintMutation.isPending) return
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUserMsg) return

    try {
      const result = await hintMutation.mutateAsync({
        query: lastUserMsg.content,
        user_id: user?.id || 'demo_user',
        node_id: nodeId || undefined,
        mastery,
      })

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'tutor',
          content: result.hint,
          hint: result.hint,
          masteryLevel: mastery < 0.4 ? 'low' : mastery < 0.7 ? 'medium' : 'high',
        },
      ])
    } catch (err) {
      // Fallback hint
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'tutor',
          content: 'Hint: Break the problem into smaller steps and identify what you know.',
        },
      ])
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header with mastery control */}
      <div className="border-b border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <div>
              <h1 className="text-lg font-bold text-white">Socratic Tutor</h1>
              <p className="text-xs text-slate-400">PCR-gated • Mastery-aware</p>
            </div>
          </div>

          {/* Mastery slider */}
          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-400">Mastery:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={mastery}
              onChange={(e) => setMastery(parseFloat(e.target.value))}
              className="w-32 accent-indigo-500"
            />
            <span className={`text-sm font-mono w-12 ${
              mastery < 0.4 ? 'text-red-400' : mastery < 0.7 ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {mastery.toFixed(1)}
            </span>
            {mastery < 0.4 ? (
              <Lock className="w-4 h-4 text-red-400" aria-label="Answers locked (low mastery)" />
            ) : mastery < 0.7 ? (
              <BookOpen className="w-4 h-4 text-yellow-400" aria-label="Partial reveal (medium mastery)" />
            ) : (
              <Unlock className="w-4 h-4 text-green-400" aria-label="Full reveal (high mastery)" />
            )}
          </div>
        </div>
      </div>

      {/* PCR status bar */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center gap-4 text-xs">
          <span className="text-slate-500">PCR Mode:</span>
          <span className={
            mastery < 0.4 ? 'text-red-400' : mastery < 0.7 ? 'text-yellow-400' : 'text-green-400'
          }>
            {mastery < 0.4 ? 'context_only — no direct answers' :
             mastery < 0.7 ? 'prerequisite_first — hints and structure' :
             'full_reveal — all content available'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <Brain className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-300 mb-2">
                Ask me anything about your studies
              </h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                I&apos;ll guide you with Socratic questions and hints based on your mastery level.
                {mastery < 0.4 && ' Direct answers are locked until your mastery improves.'}
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-100'
              }`}>
                <p className="text-sm">{msg.content}</p>

                {/* Hint */}
                {msg.hint && msg.role === 'tutor' && (
                  <div className="mt-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                      <Lightbulb className="w-3 h-3" />
                      <span>Hint (Level {msg.hintLevel || 1})</span>
                    </div>
                    <p className="text-xs text-slate-400">{msg.hint}</p>
                  </div>
                )}

                {/* Feedback */}
                {msg.feedback && msg.role === 'tutor' && (
                  <div className="mt-2 text-xs text-slate-500 italic">
                    {msg.feedback}
                  </div>
                )}

                {/* PCR lock indicator */}
                {msg.pcrLocked && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                    <Lock className="w-3 h-3" />
                    <span>Answer content locked — build mastery to unlock</span>
                  </div>
                )}

                {/* Quality score */}
                {msg.qualityScore !== undefined && msg.qualityScore > 0 && (
                  <div className="mt-2 text-xs text-slate-600">
                    Quality: {(msg.qualityScore * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {askMutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <button
            onClick={handleHint}
            disabled={!messages.length || hintMutation.isPending}
            className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Request a hint"
          >
            <Lightbulb className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question or describe what you're stuck on..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || askMutation.isPending}
            className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
