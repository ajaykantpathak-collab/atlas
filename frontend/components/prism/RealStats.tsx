'use client'

import { motion } from 'framer-motion'
import { usePublicStats } from '@/hooks/usePublicData'

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}+`
  return String(n)
}

export function RealStats() {
  const { data: stats, isLoading, isError } = usePublicStats()

  // Fallback to loading state, not hardcoded numbers
  const statItems = stats
    ? [
        { value: formatNumber(stats.total_nodes), label: 'Topics to Master' },
        { value: formatNumber(stats.enrichment_nodes), label: 'Enrichment Nodes' },
        { value: String(stats.subjects), label: 'Subjects' },
        { value: String(stats.classes), label: 'Classes (1 to 12)' },
      ]
    : isLoading
      ? [
          { value: '...', label: 'Topics to Master' },
          { value: '...', label: 'Enrichment Nodes' },
          { value: '...', label: 'Subjects' },
          { value: '...', label: 'Classes (1 to 12)' },
        ]
      : [
          { value: '—', label: 'Topics to Master' },
          { value: '—', label: 'Enrichment Nodes' },
          { value: '—', label: 'Subjects' },
          { value: '—', label: 'Classes (1 to 12)' },
        ]

  return (
    <div className="glass-card rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
      {statItems.map((s, i) => (
        <div key={i} className="text-center">
          <div className="font-display text-3xl md:text-4xl font-bold spectrum-text">{s.value}</div>
          <div className="mt-2 text-sm text-surface-600">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
