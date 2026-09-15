'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap, Users, AlertTriangle, BookOpen,
  TrendingUp, Brain, ClipboardList, UserCheck,
} from 'lucide-react'
import {
  useMasteryDistribution, useCommonMisconceptions, useDifficultySummary,
} from '@/hooks/useAnalytics'
import AuthGuard from '@/components/AuthGuard'

export default function TeacherDashboardPage() {
  return (
    <AuthGuard allowedRoles={['teacher', 'admin']}>
      <TeacherDashboardContent />
    </AuthGuard>
  )
}

function TeacherDashboardContent() {
  const { data: mastery, isLoading } = useMasteryDistribution()
  const { data: misconceptions } = useCommonMisconceptions(7)
  const { data: difficulty } = useDifficultySummary()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-indigo-400" />
            Teacher Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Class overview and student intervention</p>
        </div>

        {/* Class stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<Users className="w-5 h-5" />} label="Total students" value="42" color="text-blue-400" />
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Active today" value="28" color="text-green-400" />
          <StatCard icon={<AlertTriangle className="w-5 h-5" />} label="Need intervention" value="7" color="text-red-400" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Class avg mastery" value="62%" color="text-purple-400" />
        </div>

        {/* Class mastery overview */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-indigo-400" />
            Class Mastery by Subject
          </h2>
          {mastery && mastery.length > 0 ? (
            <div className="space-y-3">
              {mastery.map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-slate-300">
                    {row.subject} — Class {row.class_level}
                  </div>
                  <div className="flex-1 flex gap-1 h-6 rounded overflow-hidden bg-slate-800">
                    <div className="bg-red-500/60 flex items-center justify-center text-xs text-white"
                         style={{ width: `${(row.low_mastery / row.total_students) * 100}%` }}>
                      {row.low_mastery > 0 && row.low_mastery}
                    </div>
                    <div className="bg-yellow-500/60 flex items-center justify-center text-xs text-white"
                         style={{ width: `${(row.medium_mastery / row.total_students) * 100}%` }}>
                      {row.medium_mastery > 0 && row.medium_mastery}
                    </div>
                    <div className="bg-green-500/60 flex items-center justify-center text-xs text-white"
                         style={{ width: `${(row.high_mastery / row.total_students) * 100}%` }}>
                      {row.high_mastery > 0 && row.high_mastery}
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm text-slate-400">
                    {(row.avg_mastery * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No mastery data available</p>
          )}
        </div>

        {/* Students needing intervention */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Students Needing Intervention
          </h2>
          <div className="space-y-2">
            {['Aarav S.', 'Priya K.', 'Rohan M.', 'Ananya R.'].map((name, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-red-500/10">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">{name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-red-400">Mastery: 28%</span>
                  <span className="text-slate-500">Last active: 5 days ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common misconceptions */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Common Misconceptions (7d)
          </h2>
          {misconceptions && misconceptions.length > 0 ? (
            <div className="space-y-2">
              {misconceptions.slice(0, 8).map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800">
                  <div>
                    <span className="text-sm text-slate-300 font-mono">{row.node_id}</span>
                    <span className="text-xs text-slate-500 ml-2">{row.subject}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-amber-400">{row.total_count} times</span>
                    <span className="text-slate-400">{row.unique_students} students</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No misconceptions recorded</p>
          )}
        </div>

        {/* Question difficulty */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-indigo-400" />
            Question Difficulty by Subject
          </h2>
          {difficulty && difficulty.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="text-left py-2 px-3">Subject</th>
                    <th className="text-left py-2 px-3">Class</th>
                    <th className="text-right py-2 px-3">Questions</th>
                    <th className="text-right py-2 px-3">With Data</th>
                    <th className="text-right py-2 px-3">Avg Difficulty</th>
                    <th className="text-right py-2 px-3">Pass Rate</th>
                    <th className="text-right py-2 px-3">Avg Time</th>
                  </tr>
                </thead>
                <tbody>
                  {difficulty.map((row, i) => (
                    <tr key={i} className="border-b border-slate-800/50">
                      <td className="py-2 px-3 text-slate-300">{row.subject}</td>
                      <td className="py-2 px-3 text-slate-400">{row.class_level}</td>
                      <td className="py-2 px-3 text-right text-slate-300">{row.total_questions}</td>
                      <td className="py-2 px-3 text-right text-slate-400">{row.questions_with_data}</td>
                      <td className="py-2 px-3 text-right text-slate-300">{row.avg_difficulty.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right text-green-400">{(row.avg_pass_rate * 100).toFixed(0)}%</td>
                      <td className="py-2 px-3 text-right text-slate-400">{row.avg_time_per_question.toFixed(0)}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No difficulty data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs text-slate-400 uppercase">{label}</span>
      </div>
      <div className="text-xl font-bold text-white mt-2">{value}</div>
    </div>
  )
}
