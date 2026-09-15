'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Send, Sparkles, AlertTriangle, Lightbulb,
  GraduationCap, BookOpen, ChevronRight, Brain, Zap,
  RotateCcw, MessageCircle, Target, TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import {
  CustomCursor, TiltCard, GlowCard, BorderBeam,
  ScrollReveal, StaggerContainer, StaggerItem,
  Typewriter, Spotlight,
} from '@/components/premium'
import type { SocraticTurn } from '@/types'
import { useStartTutorSession, useTutorReply } from '@/hooks'

const socraticLevels = [
  { level: 1, name: 'Clarifying', color: 'text-brand-300', desc: 'What do you mean by...?' },
  { level: 2, name: 'Probing', color: 'text-accent-300', desc: 'Why do you think that happens?' },
  { level: 3, name: 'Assumption', color: 'text-gold-300', desc: 'What if the opposite were true?' },
  { level: 4, name: 'Evidence', color: 'text-mint-300', desc: 'Can you find evidence for this?' },
  { level: 5, name: 'Redirect', color: 'text-red-300', desc: 'Let\'s revisit a prerequisite' },
]

export default function PremiumAITutorPage() {
  const [messages, setMessages] = useState<SocraticTurn[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [socraticLevel, setSocraticLevel] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const startSession = useStartTutorSession()
  const tutorReply = useTutorReply()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-start session on mount
  useEffect(() => {
    if (!sessionId && !startSession.isPending) {
      startSession.mutate(
        { nodeId: 'c10_sci_003_05', topic: 'Refraction of Light' },
        {
          onSuccess: (data) => {
            setSessionId(data.sessionId)
            setSocraticLevel(data.socraticLevel ?? 1)
            if (data.messages?.length > 0) {
              setMessages(data.messages)
            } else {
              setMessages([{
                role: 'tutor',
                content: data.firstQuestion ?? 'Welcome! Let\'s explore this topic together. What do you already know about it?',
                type: 'question',
              }])
            }
          },
        }
      )
    }
  }, [sessionId])

  function handleSend() {
    if (!input.trim() || !sessionId) return
    const userMsg: SocraticTurn = { role: 'student', content: input, type: 'answer' }
    setMessages([...messages, userMsg])
    setInput('')
    setIsTyping(true)

    tutorReply.mutate(
      { sessionId, message: input },
      {
        onSuccess: (data) => {
          const tutorMsg: SocraticTurn = {
            role: 'tutor',
            content: data.reply.content,
            type: data.reply.type as SocraticTurn['type'],
            misconceptionDetected: data.reply.misconceptionDetected,
            prerequisiteGap: data.reply.prerequisiteGap,
          }
          setMessages((prev) => [...prev, tutorMsg])
          if (data.updatedMastery !== undefined) {
            // Mastery updated silently
          }
          setIsTyping(false)
        },
        onError: () => {
          setMessages((prev) => [...prev, {
            role: 'tutor',
            content: 'I apologize, I had trouble processing that. Could you try rephrasing your answer?',
            type: 'question',
          }])
          setIsTyping(false)
        },
      }
    )
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/premium/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-brand-300" />
              <h1 className="font-display text-sm font-semibold text-white">AI Socratic Tutor</h1>
            </div>
          </div>
          <button className="btn-ghost text-xs">
            <RotateCcw className="w-3 h-3" />
            New Session
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <StaggerContainer stagger={0.1}>
          {/* Session info */}
          <StaggerItem>
            <BorderBeam className="glass-card rounded-2xl p-4 mb-6" duration={5}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-6 h-6 text-white" /></div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold text-white">Refraction of Light</h2>
                  <p className="text-xs text-surface-600">Science · Class 10 · CBSE · Chapter 3</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge-brand">
                    <Zap className="w-3 h-3" />
                    Level {socraticLevel}
                  </span>
                </div>
              </div>
            </BorderBeam>
          </StaggerItem>

          {/* Socratic levels indicator */}
          <StaggerItem>
            <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
              {socraticLevels.map((level) => (
                <div
                  key={level.level}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg glass border border-surface-300/30 ${
                    level.level === socraticLevel ? 'ring-1 ring-accent-500/30' : ''
                  }`}
                >
                  <div className={`text-[10px] font-medium ${level.color}`}>L{level.level} · {level.name}</div>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Chat messages */}
          <StaggerItem>
            <div className="space-y-4 mb-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-3 ${msg.role === 'student' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'tutor' && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-5 h-5 text-white" /></div>
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'student' ? 'items-end' : ''}`}>
                    <div className={`rounded-2xl p-4 ${
                      msg.role === 'tutor'
                        ? 'glass-card rounded-bl-sm'
                        : 'bg-brand-500/15 border border-brand-500/30 rounded-br-sm'
                    }`}>
                      <p className={`text-sm leading-relaxed ${msg.role === 'tutor' ? 'text-surface-700' : 'text-white'}`}>
                        {msg.content}
                      </p>
                      {msg.misconceptionDetected && (
                        <div className="mt-3 pt-3 border-t border-surface-300/30 flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] text-gold-300/80">
                            Misconception detected: {msg.misconceptionDetected}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-5 h-5 text-white" /></div>
                  <div className="glass-card rounded-2xl rounded-bl-sm p-4">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-brand-400"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </StaggerItem>

          {/* Input */}
          <StaggerItem>
            <Spotlight className="glass-card rounded-2xl p-2" size={400}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your answer..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-surface-600 px-3 py-2 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="btn-primary px-4 py-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </Spotlight>
          </StaggerItem>

          {/* Tips */}
          <StaggerItem>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Lightbulb, label: 'Hint', color: 'text-gold-300' },
                { icon: BookOpen, label: 'Review', color: 'text-mint-300' },
                { icon: Target, label: 'Practice', color: 'text-brand-300' },
              ].map((tip, i) => (
                <TiltCard key={i} maxTilt={6}>
                  <button className="w-full glass-card rounded-xl p-3 flex items-center gap-2 justify-center">
                    <tip.icon className={`w-4 h-4 ${tip.color}`} />
                    <span className="text-xs text-surface-700">{tip.label}</span>
                  </button>
                </TiltCard>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
