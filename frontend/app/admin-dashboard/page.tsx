'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity, DollarSign, Users, TrendingUp, AlertTriangle,
  Brain, Lightbulb, Zap, Clock, CheckCircle2, XCircle,
  BarChart3, Server, Cpu,
} from 'lucide-react'
import {
  useDashboardOverview, useEventCounts, useLLMCosts,
  useMasteryDistribution, useCommonMisconceptions, useSocraticStats,
} from '@/hooks/useAnalytics'
import AuthGuard from '@/components/AuthGuard'

export default function AdminDashboardPage() {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <AdminDashboardContent />
    </AuthGuard>
  )
}

function AdminDashboardContent() {
  const { data: overview, isLoading } = useDashboardOverview()
  const { data: eventCounts } = useEventCounts(24)
  const { data: llmCosts } = useLLMCosts(7)
  const { data: mastery } = useMasteryDistribution()
  const { data: misconceptions } = useCommonMisconceptions(7)
  const { data: socratic } = useSocraticStats(7)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-slate-400">Loading dashboard...</div>
      </div>
    )
  }

  const totalEvents = eventCounts ? Object.values(eventCounts).reduce((a, b) => a + b, 0) : 0
  const totalCost = llmCosts?.reduce((sum, c) => sum + c.total_cost, 0) ?? 0
  const totalCalls = llmCosts?.reduce((sum, c) => sum + c.total_calls, 0) ?? 0
  const totalErrors = llmCosts?.reduce((sum, c) => sum + c.total_errors, 0) ?? 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Server className="w-8 h-8 text-indigo-400" />
            Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-1">System analytics and observability</p>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={<Activity className="w-5 h-5" />}
            label="Events (24h)"
            value={totalEvents.toString()}
            color="text-indigo-400"
          />
          <MetricCard
            icon={<DollarSign className="w-5 h-5" />}
            label="LLM Cost (7d)"
            value={`$${totalCost.toFixed(4)}`}
            color="text-green-400"
          />
          <MetricCard
            icon={<Cpu className="w-5 h-5" />}
            label="LLM Calls (7d)"
            value={totalCalls.toString()}
            color="text-blue-400"
          />
          <MetricCard
            icon={<AlertTriangle className="w-5 h-5" />}
            label="Errors (7d)"
            value={totalErrors.toString()}
            color="text-red-400"
          />
        </div>

        {/* Event counts breakdown */}
        <Card title="Event Breakdown (24h)" icon={<BarChart3 className="w-5 h-5" />}>
          {eventCounts && Object.entries(eventCounts).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(eventCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between py-2 border-b border-slate-800">
                    <span className="text-sm text-slate-300">{type.replace(/_/g, ' ')}</span>
                    <span className="text-sm font-mono text-indigo-400">{count}</span>
                  </div>
                ))}
            </div>
          ) : (
            <EmptyState text="No events in the last 24 hours" />
          )}
        </Card>

        {/* LLM Costs */}
        <Card title="LLM Cost Breakdown (7 days)" icon={<DollarSign className="w-5 h-5" />}>
          {llmCosts && llmCosts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="text-left py-2 px-3">Call Type</th>
                    <th className="text-left py-2 px-3">Model</th>
                    <th className="text-right py-2 px-3">Calls</th>
                    <th className="text-right py-2 px-3">Tokens</th>
                    <th className="text-right py-2 px-3">Cost</th>
                    <th className="text-right py-2 px-3">Avg Latency</th>
                    <th className="text-right py-2 px-3">Errors</th>
                  </tr>
                </thead>
                <tbody>
                  {llmCosts.map((row, i) => (
                    <tr key={i} className="border-b border-slate-800/50">
                      <td className="py-2 px-3 text-slate-300">{row.call_type}</td>
                      <td className="py-2 px-3 text-slate-400 font-mono text-xs">{row.model}</td>
                      <td className="py-2 px-3 text-right text-slate-300">{row.total_calls}</td>
                      <td className="py-2 px-3 text-right text-slate-400">{row.total_tokens.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-green-400">${row.total_cost.toFixed(6)}</td>
                      <td className="py-2 px-3 text-right text-slate-400">{row.avg_latency.toFixed(0)}ms</td>
                      <td className="py-2 px-3 text-right">
                        {row.total_errors > 0 ? (
                          <span className="text-red-400">{row.total_errors}</span>
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-400 inline" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState text="No LLM calls in the last 7 days" />
          )}
        </Card>

        {/* Mastery Distribution */}
        <Card title="Mastery Distribution" icon={<Brain className="w-5 h-5" />}>
          {mastery && mastery.length > 0 ? (
            <div className="space-y-3">
              {mastery.map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-slate-300">
                    {row.subject} — Class {row.class_level}
                  </div>
                  <div className="flex-1 flex gap-1 h-6 rounded overflow-hidden">
                    <div className="bg-red-500/60" style={{ width: `${(row.low_mastery / row.total_students) * 100}%` }} title={`Low: ${row.low_mastery}`} />
                    <div className="bg-yellow-500/60" style={{ width: `${(row.medium_mastery / row.total_students) * 100}%` }} title={`Medium: ${row.medium_mastery}`} />
                    <div className="bg-green-500/60" style={{ width: `${(row.high_mastery / row.total_students) * 100}%` }} title={`High: ${row.high_mastery}`} />
                  </div>
                  <div className="w-16 text-right text-sm text-slate-400">
                    {row.total_students} students
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No mastery data available" />
          )}
        </Card>

        {/* Socratic Stats */}
        <Card title="Socratic Pipeline Stats (7d)" icon={<Lightbulb className="w-5 h-5" />}>
          {socratic && socratic.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {socratic.map((row, i) => (
                <div key={i} className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-indigo-400 mb-2 uppercase">
                    {row.pcr_level} mastery
                  </div>
                  <div className="text-2xl font-bold text-white">{row.total_interactions}</div>
                  <div className="text-xs text-slate-400 mt-1">interactions</div>
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mastery before:</span>
                      <span className="text-slate-300">{row.avg_mastery_before.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mastery after:</span>
                      <span className="text-slate-300">{row.avg_mastery_after.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Hint L1:</span>
                      <span className="text-slate-300">{row.hint_1_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Hint L4:</span>
                      <span className="text-slate-300">{row.hint_4_count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No Socratic interactions in the last 7 days" />
          )}
        </Card>

        {/* Common Misconceptions */}
        <Card title="Common Misconceptions (7d)" icon={<AlertTriangle className="w-5 h-5" />}>
          {misconceptions && misconceptions.length > 0 ? (
            <div className="space-y-2">
              {misconceptions.slice(0, 10).map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800">
                  <div>
                    <span className="text-sm text-slate-300 font-mono">{row.node_id}</span>
                    <span className="text-xs text-slate-500 ml-2">{row.subject}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-red-400">{row.total_count} occurrences</span>
                    <span className="text-xs text-slate-400">{row.unique_students} students</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No misconceptions diagnosed in the last 7 days" />
          )}
        </Card>
      </div>
    </div>
  )
}

// ── Helper components ────────────────────────────────────────── //

function MetricCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs font-medium text-slate-400 uppercase">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white mt-2">{value}</div>
    </div>
  )
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6"
    >
      <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <span className="text-indigo-400">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-8 text-slate-500 text-sm">
      {text}
    </div>
  )
}
