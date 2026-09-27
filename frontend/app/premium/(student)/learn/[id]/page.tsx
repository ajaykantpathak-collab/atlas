'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Layers, SearchX } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  CustomCursor, StaggerContainer, StaggerItem,
  PremiumLoader, PremiumProgress,
} from '@/components/premium'
import { useSubjects, useKnowledgeGraph } from '@/hooks'

export default function PremiumSubjectPage() {
  const params = useParams()
  const subjectId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : ''

  const { data: subjectsData, isLoading: subjectsLoading } = useSubjects()
  const { data: graphData, isLoading: graphLoading } = useKnowledgeGraph()

  const subject = (subjectsData?.subjects ?? []).find((s) => s.id === subjectId)
  const topics = (graphData?.nodes ?? []).filter(
    (n) => subject && n.subject?.toLowerCase() === subject.name.toLowerCase()
  )

  if (subjectsLoading || graphLoading) {
    return (
      <div className="min-h-screen bg-surface-0 mesh-bg flex items-center justify-center">
        <PremiumLoader />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/premium/learn" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">
              {subject ? subject.name : 'Subject'}
            </h1>
          </div>
          {subject && (
            <span className="text-xs text-surface-600 font-mono">{topics.length} topics</span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {!subject ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <SearchX className="w-10 h-10 text-surface-500 mx-auto mb-4" />
            <h2 className="font-display text-lg font-bold text-white mb-2">Subject not found</h2>
            <p className="text-sm text-surface-600 mb-6">
              We couldn&apos;t find this subject. It may have been renamed or removed.
            </p>
            <Link href="/premium/learn" className="btn-primary text-xs">
              Back to Knowledge Graph
            </Link>
          </div>
        ) : (
          <StaggerContainer stagger={0.06}>
            <StaggerItem>
              <div className="glass-card rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-white">{subject.name}</h2>
                  </div>
                  <span className="text-xs text-surface-600 font-mono">
                    {subject.masteryPercentage ?? 0}% mastery
                  </span>
                </div>
                <PremiumProgress progress={subject.masteryPercentage ?? 0} />
              </div>
            </StaggerItem>

            <StaggerItem>
              <h3 className="font-display text-base font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-300" />
                Topics in the graph
              </h3>
            </StaggerItem>

            {topics.length === 0 ? (
              <StaggerItem>
                <div className="glass-card rounded-xl p-8 text-center">
                  <BookOpen className="w-8 h-8 text-surface-500 mx-auto mb-3" />
                  <h4 className="text-sm font-medium text-white mb-1">No topics yet</h4>
                  <p className="text-xs text-surface-600">
                    This subject has no topics in the knowledge graph yet. Check back soon.
                  </p>
                </div>
              </StaggerItem>
            ) : (
              <div className="space-y-3">
                {topics.map((node, i) => (
                  <StaggerItem key={node.id ?? node.nodeId ?? i}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="glass-card rounded-xl p-4 flex items-center gap-4"
                    >
                      <div className="w-9 h-9 rounded-lg glass flex items-center justify-center text-brand-300 shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{node.label}</h4>
                        <p className="text-xs text-surface-600 mt-0.5">
                          {node.chapter}
                          {typeof node.classLevel === 'number' ? ` · Class ${node.classLevel}` : ''}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            )}
          </StaggerContainer>
        )}
      </div>
    </div>
  )
}
