'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Brain, Zap, Target, TrendingUp, Activity,
  Clock, Eye, Hand, Mic, BookOpen, Lightbulb, Gauge,
  ChevronRight, Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import InternalDemoBadge from "@/components/InternalDemoBadge";

interface CognitiveMetric {
  name: string
  score: number
  maxScore: number
  unit: string
  icon: typeof Brain
  color: string
  bgColor: string
  description: string
  trend: number
}

const cognitiveMetrics: CognitiveMetric[] = [
  { name: 'Working Memory', score: 78, maxScore: 100, unit: '%', icon: Brain, color: 'text-brand-300', bgColor: 'bg-brand-500/15', description: 'Ability to hold and manipulate information in mind', trend: 5 },
  { name: 'Processing Speed', score: 65, maxScore: 100, unit: '%', icon: Zap, color: 'text-accent-300', bgColor: 'bg-accent-500/15', description: 'How quickly you process and respond to information', trend: 8 },
  { name: 'Attention Span', score: 82, maxScore: 100, unit: '%', icon: Eye, color: 'text-mint-300', bgColor: 'bg-mint-500/15', description: 'Sustained focus on tasks without distraction', trend: 3 },
  { name: 'Spatial Reasoning', score: 70, maxScore: 100, unit: '%', icon: Hand, color: 'text-gold-300', bgColor: 'bg-gold-500/15', description: 'Mental manipulation of 2D and 3D objects', trend: -2 },
  { name: 'Verbal Reasoning', score: 88, maxScore: 100, unit: '%', icon: Mic, color: 'text-red-300', bgColor: 'bg-red-500/15', description: 'Understanding and analyzing written information', trend: 6 },
  { name: 'Logical Reasoning', score: 72, maxScore: 100, unit: '%', icon: Target, color: 'text-brand-300', bgColor: 'bg-brand-500/15', description: 'Pattern recognition and deductive thinking', trend: 4 },
]

const brainAreas = [
  { area: 'Prefrontal Cortex', function: 'Decision making, planning', activity: 85, color: 'bg-brand-500/60' },
  { area: 'Hippocampus', function: 'Memory formation', activity: 78, color: 'bg-accent-500/60' },
  { area: 'Parietal Lobe', function: 'Spatial processing', activity: 65, color: 'bg-mint-500/60' },
  { area: 'Temporal Lobe', function: 'Language & auditory', activity: 88, color: 'bg-gold-500/60' },
  { area: 'Occipital Lobe', function: 'Visual processing', activity: 72, color: 'bg-red-500/60' },
]

const weeklyData = [
  { week: 'W1', memory: 65, speed: 55, attention: 75 },
  { week: 'W2', memory: 68, speed: 58, attention: 78 },
  { week: 'W3', memory: 72, speed: 60, attention: 80 },
  { week: 'W4', memory: 75, speed: 62, attention: 81 },
  { week: 'W5', memory: 76, speed: 64, attention: 82 },
  { week: 'W6', memory: 78, speed: 65, attention: 82 },
]

const exercises = [
  { title: 'Dual N-Back', description: 'Train working memory with simultaneous audio-visual stimuli', duration: '10 min', difficulty: 'Hard', benefit: 'Working Memory +12%', icon: Brain, color: 'text-brand-300' },
  { title: 'Pattern Matrix', description: 'Complete logical sequences in a visual grid', duration: '8 min', difficulty: 'Medium', benefit: 'Logical Reasoning +8%', icon: Target, color: 'text-accent-300' },
  { title: 'Speed Reading', description: 'Improve reading speed while maintaining comprehension', duration: '15 min', difficulty: 'Easy', benefit: 'Processing Speed +10%', icon: BookOpen, color: 'text-mint-300' },
  { title: 'Mental Rotation', description: 'Rotate 3D objects mentally to match targets', duration: '12 min', difficulty: 'Medium', benefit: 'Spatial Reasoning +15%', icon: Hand, color: 'text-gold-300' },
  { title: 'Word Puzzles', description: 'Solve anagrams and word associations', duration: '10 min', difficulty: 'Easy', benefit: 'Verbal Reasoning +7%', icon: Mic, color: 'text-red-300' },
  { title: 'Focus Timer', description: 'Sustained attention training with progressive distractions', duration: '20 min', difficulty: 'Hard', benefit: 'Attention Span +14%', icon: Eye, color: 'text-brand-300' },
]

export default function CognitivePage() {
  return (
    <div className="min-h-screen mesh-bg">
      <InternalDemoBadge what="hardcoded cognitive mock" />
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-lg font-semibold text-white">Cognitive Development</h1>
          </div>
          <span className="badge-brand">
            <Sparkles className="w-3 h-3" />
            AI-Tracked
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brain overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">Cognitive Profile</h2>
              <p className="text-xs text-surface-600">Based on 6 weeks of learning data · Updated daily</p>
            </div>
          </div>

          {/* Brain area activity */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {brainAreas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-3">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-surface-300/30" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      className={area.color.replace('bg-', 'text-').replace('/60', '')}
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - area.activity / 100) }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-white">{area.activity}%</span>
                </div>
                <p className="text-xs font-medium text-white">{area.area}</p>
                <p className="text-[10px] text-surface-600 mt-0.5">{area.function}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cognitive metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {cognitiveMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs ${metric.trend >= 0 ? 'text-mint-300' : 'text-red-300'}`}>
                    {metric.trend >= 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">{metric.name}</h4>
              <p className="text-[10px] text-surface-600 mb-3">{metric.description}</p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold text-white">{metric.score}</span>
                <span className="text-xs text-surface-600 mb-1">/ {metric.maxScore}{metric.unit}</span>
              </div>
              <div className="h-2 rounded-full bg-surface-300/40 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.score / metric.maxScore) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`h-full rounded-full ${metric.bgColor.replace('/15', '/60')}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trend chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-300" />
            6-Week Cognitive Trends
          </h3>
          <div className="relative h-48">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[100, 75, 50, 25, 0].map((v) => (
                <div key={v} className="flex items-center gap-2">
                  <span className="text-[10px] text-surface-600 w-8">{v}</span>
                  <div className="flex-1 h-px bg-surface-300/20" />
                </div>
              ))}
            </div>
            {/* Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {[
                { key: 'memory', color: '#818cf8' },
                { key: 'speed', color: '#c084fc' },
                { key: 'attention', color: '#34d399' },
              ].map((line) => {
                const points = weeklyData.map((d, i) => {
                  const x = (i / (weeklyData.length - 1)) * 600
                  const y = 200 - (d[line.key as keyof typeof d] as number) * 2
                  return `${x},${y}`
                }).join(' ')
                return (
                  <motion.polyline
                    key={line.key}
                    points={points}
                    fill="none"
                    stroke={line.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                )
              })}
            </svg>
          </div>
          <div className="flex items-center gap-4 mt-4">
            {[
              { label: 'Working Memory', color: 'bg-brand-400' },
              { label: 'Processing Speed', color: 'bg-accent-400' },
              { label: 'Attention Span', color: 'bg-mint-400' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${l.color}`} />
                <span className="text-[10px] text-surface-600">{l.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Brain training exercises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-gold-300" />
            Recommended Brain Training
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exercises.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-hover p-5 group cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-300/30 flex items-center justify-center">
                    <ex.icon className={`w-5 h-5 ${ex.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">{ex.title}</h4>
                    <p className="text-[10px] text-surface-600 mt-0.5">{ex.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge text-[10px] py-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {ex.duration}
                  </span>
                  <span className="badge text-[10px] py-0.5">{ex.difficulty}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-surface-300/20">
                  <span className="text-[10px] text-mint-300 font-medium">{ex.benefit}</span>
                  <ChevronRight className="w-4 h-4 text-surface-600 group-hover:text-brand-300 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
