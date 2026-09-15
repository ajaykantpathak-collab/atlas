'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, BookOpen, Clock, ThumbsUp, ThumbsDown,
  CheckCircle2, Sparkles, Lightbulb, FileCode, ArrowRight,
} from 'lucide-react'

interface LessonSection {
  section_id: string
  heading: string
  order: number
  content_markdown: string
  worked_examples?: { question: string; solution: string; steps: string[] }[]
}

interface LessonResponse {
  node_id: string
  title: string
  intro_paragraph?: string
  sections: LessonSection[]
  summary_notes?: string[]
  related_nodes?: { node_id: string; title: string; subject: string }[]
}

interface LessonReaderProps {
  lesson: LessonResponse
  onSectionComplete?: (sectionId: string, understood: boolean) => void
  onRelatedNodeClick?: (nodeId: string) => void
  className?: string
}

const COLORS = {
  void: '#06060F',
  deep: '#111128',
  surface: '#1C1C3A',
  elevated: '#282860',
  textPrimary: '#F0EAD6',
  textSecondary: '#A09DB8',
  textTertiary: '#6B6890',
  gold: '#F5A623',
  goldLight: '#FFD080',
  border: 'rgba(255,250,240,0.10)',
}

// Simple markdown renderer
function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      elements.push(
        <pre key={key++} style={{
          background: COLORS.deep, borderRadius: 12, padding: '16px 20px',
          overflow: 'auto', border: `1px solid ${COLORS.border}`,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
          color: COLORS.goldLight, margin: '16px 0',
        }}>
          {codeLines.join('\n')}
        </pre>
      )
      continue
    }

    // Math block $$...$$
    if (line.trim().startsWith('$$')) {
      const mathLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().endsWith('$$')) {
        mathLines.push(lines[i])
        i++
      }
      if (i < lines.length) { mathLines.push(lines[i].replace(/\$\$$/, '')); i++ }
      elements.push(
        <div key={key++} style={{
          textAlign: 'center', padding: '20px', margin: '16px 0',
          background: COLORS.deep, borderRadius: 12,
          fontFamily: "'JetBrains Mono', serif", fontSize: 18,
          color: COLORS.goldLight, border: `1px solid ${COLORS.border}`,
        }}>
          {mathLines.join('\n').replace(/\$\$/g, '')}
        </div>
      )
      continue
    }

    // Heading
    if (line.startsWith('### ')) {
      elements.push(<h4 key={key++} style={{ fontSize: 18, fontWeight: 700, margin: '20px 0 8px', color: COLORS.textPrimary }}>{line.slice(4)}</h4>)
      i++; continue
    }
    if (line.startsWith('## ')) {
      elements.push(<h3 key={key++} style={{ fontSize: 22, fontWeight: 700, margin: '24px 0 12px', color: COLORS.gold }}>{line.slice(3)}</h3>)
      i++; continue
    }

    // List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      elements.push(
        <ul key={key++} style={{ margin: '12px 0', paddingLeft: 24, listStyle: 'none' }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: 6, color: COLORS.textPrimary, display: 'flex', gap: 8 }}>
              <span style={{ color: COLORS.gold }}>•</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={key++} style={{ margin: '12px 0', paddingLeft: 24 }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: 6, color: COLORS.textPrimary }}>
              <span style={{ color: COLORS.gold, fontWeight: 700, marginRight: 8 }}>{idx + 1}.</span>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') { i++; continue }

    // Paragraph
    elements.push(<p key={key++} style={{ margin: '12px 0', lineHeight: 1.8, color: COLORS.textPrimary }}>{renderInline(line)}</p>)
    i++
  }

  return elements
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold**, *italic*, `code`, $math$
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) parts.push(<span key={key++}>{remaining.slice(0, boldMatch.index)}</span>)
      parts.push(<strong key={key++} style={{ color: COLORS.goldLight, fontWeight: 700 }}>{boldMatch[1]}</strong>)
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length)
      continue
    }
    // Inline code
    const codeMatch = remaining.match(/`(.+?)`/)
    if (codeMatch && codeMatch.index !== undefined) {
      if (codeMatch.index > 0) parts.push(<span key={key++}>{remaining.slice(0, codeMatch.index)}</span>)
      parts.push(<code key={key++} style={{
        background: COLORS.deep, padding: '2px 8px', borderRadius: 6,
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9em', color: COLORS.goldLight,
      }}>{codeMatch[1]}</code>)
      remaining = remaining.slice(codeMatch.index + codeMatch[0].length)
      continue
    }
    // Inline math
    const mathMatch = remaining.match(/\$(.+?)\$/)
    if (mathMatch && mathMatch.index !== undefined) {
      if (mathMatch.index > 0) parts.push(<span key={key++}>{remaining.slice(0, mathMatch.index)}</span>)
      parts.push(<span key={key++} style={{
        fontFamily: "'JetBrains Mono', serif", color: COLORS.goldLight, fontStyle: 'italic',
      }}>{mathMatch[1]}</span>)
      remaining = remaining.slice(mathMatch.index + mathMatch[0].length)
      continue
    }
    parts.push(<span key={key++}>{remaining}</span>)
    break
  }

  return <>{parts}</>
}

export function AtlasLessonReader({ lesson, onSectionComplete, onRelatedNodeClick, className = '' }: LessonReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | undefined>>({})

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const progressScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const readingTime = useMemo(() => {
    const words = lesson.sections.reduce((acc, s) => acc + s.content_markdown.split(/\s+/).length, 0)
    return Math.max(1, Math.ceil(words / 200))
  }, [lesson])

  // Track active section
  useEffect(() => {
    const handler = () => {
      if (!containerRef.current) return
      const sections = containerRef.current.querySelectorAll('[data-section]')
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect()
        if (rect.top < 200) { setActiveSection(i); break }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleFeedback = (sectionId: string, understood: boolean) => {
    setFeedback(prev => ({ ...prev, [sectionId]: understood ? 'up' : 'down' }))
    onSectionComplete?.(sectionId, understood)
  }

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
      {/* Progress bar */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 3,
          background: COLORS.gold, transformOrigin: '0%',
          scaleX: progressScale, zIndex: 100,
        }}
      />

      <div style={{ display: 'flex', gap: 32, paddingTop: 24 }}>
        {/* Sidebar */}
        <aside style={{ width: 220, flexShrink: 0, position: 'sticky', top: 80, alignSelf: 'flex-start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: COLORS.textSecondary, fontSize: 13 }}>
              <Clock size={14} /> {readingTime} min read
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: COLORS.textTertiary, fontSize: 12 }}>
              <BookOpen size={14} /> {lesson.sections.length} sections
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
            {lesson.sections.map((s, i) => (
              <button
                key={s.section_id}
                onClick={() => {
                  const el = containerRef.current?.querySelector(`[data-section="${i}"]`)
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px',
                  marginBottom: 4, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: activeSection === i ? 'rgba(245,166,35,0.1)' : 'transparent',
                  color: activeSection === i ? COLORS.gold : COLORS.textSecondary,
                  fontSize: 13, transition: 'all 0.2s',
                }}
              >
                {s.heading}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <article style={{ flex: 1, minWidth: 0 }}>
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 12, color: COLORS.textPrimary }}>
              {lesson.title}
            </h1>
            {lesson.intro_paragraph && (
              <p style={{ fontSize: 18, lineHeight: 1.7, color: COLORS.textSecondary, marginBottom: 32, fontStyle: 'italic' }}>
                {lesson.intro_paragraph}
              </p>
            )}
          </motion.div>

          {/* Sections */}
          {lesson.sections.map((section, idx) => (
            <motion.section
              key={section.section_id}
              data-section={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: 48 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700,
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                  color: COLORS.void, flexShrink: 0,
                }}>
                  {idx + 1}
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 700, color: COLORS.textPrimary, margin: 0 }}>
                  {section.heading}
                </h2>
              </div>

              <div style={{ paddingLeft: 44 }}>
                {renderMarkdown(section.content_markdown)}

                {/* Worked examples */}
                {section.worked_examples && section.worked_examples.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    {section.worked_examples.map((ex, eidx) => (
                      <motion.div
                        key={eidx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        style={{
                          background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.deep})`,
                          borderRadius: 16, padding: 24, marginBottom: 16,
                          border: `1px solid ${COLORS.border}`,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <Lightbulb size={18} style={{ color: COLORS.gold }} />
                          <span style={{ fontWeight: 600, color: COLORS.gold, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Worked Example
                          </span>
                        </div>
                        <p style={{ fontSize: 16, color: COLORS.textPrimary, marginBottom: 16, fontWeight: 500 }}>
                          {ex.question}
                        </p>
                        <div style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: 16, marginBottom: 12 }}>
                          {ex.steps.map((step, sidx) => (
                            <div key={sidx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 14 }}>{sidx + 1}.</span>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: COLORS.textPrimary }}>
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '8px 16px', borderRadius: 8,
                          background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                        }}>
                          <CheckCircle2 size={16} style={{ color: '#4ADE80' }} />
                          <span style={{ fontWeight: 600, color: '#4ADE80' }}>Answer: {ex.solution}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Feedback */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16, marginTop: 24,
                  padding: '16px 20px', borderRadius: 12,
                  background: COLORS.deep, border: `1px solid ${COLORS.border}`,
                }}>
                  <span style={{ fontSize: 14, color: COLORS.textSecondary }}>Was this clear?</span>
                  <button
                    onClick={() => handleFeedback(section.section_id, true)}
                    style={{
                      padding: '6px 12px', borderRadius: 8, border: `1px solid ${feedback[section.section_id] === 'up' ? COLORS.gold : COLORS.border}`,
                      background: feedback[section.section_id] === 'up' ? 'rgba(245,166,35,0.15)' : 'transparent',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                      color: feedback[section.section_id] === 'up' ? COLORS.gold : COLORS.textSecondary,
                      transition: 'all 0.2s',
                    }}
                  >
                    <ThumbsUp size={14} /> Yes
                  </button>
                  <button
                    onClick={() => handleFeedback(section.section_id, false)}
                    style={{
                      padding: '6px 12px', borderRadius: 8, border: `1px solid ${feedback[section.section_id] === 'down' ? '#FB7185' : COLORS.border}`,
                      background: feedback[section.section_id] === 'down' ? 'rgba(251,113,133,0.15)' : 'transparent',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                      color: feedback[section.section_id] === 'down' ? '#FB7185' : COLORS.textSecondary,
                      transition: 'all 0.2s',
                    }}
                  >
                    <ThumbsDown size={14} /> Need help
                  </button>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Summary */}
          {lesson.summary_notes && lesson.summary_notes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: `linear-gradient(135deg, rgba(245,166,35,0.08), rgba(245,166,35,0.02))`,
                borderRadius: 16, padding: 28, marginBottom: 32,
                border: `1px solid rgba(245,166,35,0.2)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Sparkles size={20} style={{ color: COLORS.gold }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.gold, margin: 0 }}>Quick Recap</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {lesson.summary_notes.map((note, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, color: COLORS.textPrimary, fontSize: 15 }}>
                    <CheckCircle2 size={18} style={{ color: COLORS.gold, flexShrink: 0, marginTop: 2 }} />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Related */}
          {lesson.related_nodes && lesson.related_nodes.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 16 }}>Related Topics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
                {lesson.related_nodes.map((node) => (
                  <button
                    key={node.node_id}
                    onClick={() => onRelatedNodeClick?.(node.node_id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px 20px', borderRadius: 12, cursor: 'pointer',
                      background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                      color: COLORS.textPrimary, fontSize: 14, textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.background = COLORS.elevated }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.background = COLORS.surface }}
                  >
                    <span>{node.title}</span>
                    <ArrowRight size={16} style={{ color: COLORS.gold }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

export default AtlasLessonReader
