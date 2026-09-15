'use client'

import { motion } from 'framer-motion'
import {
  Sparkles, Star, Gift, Gamepad2, BookHeart,
  Flame, PawPrint, Bird, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

const MASCOTS = [
  {
    name: 'Sheru',
    type: 'Dragon',
    icon: Flame,
    color: 'text-orange-400',
    bg: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    description: 'Loves numbers and puzzles!',
    subject: 'Maths',
  },
  {
    name: 'Atlas',
    type: 'Puppy',
    icon: PawPrint,
    color: 'text-blue-400',
    bg: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/30',
    description: 'Curious about the world!',
    subject: 'EVS & Science',
  },
  {
    name: 'Rive',
    type: 'Owl',
    icon: Bird,
    color: 'text-purple-400',
    bg: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    description: 'Loves stories and words!',
    subject: 'English & Hindi',
  },
]

const GAMES = [
  { name: 'Word Crossword', icon: BookHeart, color: 'text-green-400', href: '/junior/crossword' },
  { name: 'Quiz Quest', icon: Gamepad2, color: 'text-blue-400', href: '/junior/quiz' },
  { name: 'Drag & Drop', icon: Star, color: 'text-amber-400', href: '/junior/drag-drop' },
  { name: 'Story Time', icon: Sparkles, color: 'text-purple-400', href: '/junior/stories' },
]

export default function JuniorLearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to Junior Learning! 🌈
          </h1>
          <p className="text-slate-400 text-lg">Classes 1-5 • Learn with your mascot friends</p>
        </motion.div>

        {/* Mascot selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {MASCOTS.map((mascot, i) => {
            const Icon = mascot.icon
            return (
              <motion.div
                key={mascot.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${mascot.bg} border ${mascot.border} rounded-3xl p-6 text-center cursor-pointer hover:scale-105 transition-transform`}
              >
                <div className={`inline-flex p-4 rounded-full bg-slate-900/50 mb-3`}>
                  <Icon className={`w-12 h-12 ${mascot.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{mascot.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{mascot.type} • {mascot.subject}</p>
                <p className="text-xs text-slate-500 mt-2">{mascot.description}</p>
                <button className={`mt-4 px-4 py-2 rounded-full bg-slate-900/50 border ${mascot.border} text-sm ${mascot.color} hover:bg-slate-900/80 transition-colors`}>
                  Learn with {mascot.name} →
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Games section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-indigo-400" />
            Play & Learn
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GAMES.map((game, i) => {
              const Icon = game.icon
              return (
                <Link
                  key={game.name}
                  href={game.href}
                  className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/50 transition-colors"
                >
                  <Icon className={`w-8 h-8 ${game.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <p className="text-sm text-slate-300">{game.name}</p>
                  <ChevronRight className="w-4 h-4 text-slate-600 mt-2 group-hover:text-indigo-400 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Rewards section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Gift className="w-6 h-6 text-amber-400" />
            Your Rewards
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">12</div>
              <div className="text-xs text-slate-400 mt-1">Stars earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">3</div>
              <div className="text-xs text-slate-400 mt-1">Lessons done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">5</div>
              <div className="text-xs text-slate-400 mt-1">Day streak 🔥</div>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Today&apos;s Lessons</h2>
          <div className="space-y-3">
            {[
              { name: 'Counting 1-20', subject: 'Maths', progress: 80, color: 'bg-orange-400' },
              { name: 'My Family', subject: 'EVS', progress: 60, color: 'bg-blue-400' },
              { name: 'The Lion and the Mouse', subject: 'English', progress: 40, color: 'bg-purple-400' },
            ].map((lesson, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4"
              >
                <div className={`w-2 h-12 rounded-full ${lesson.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{lesson.name}</p>
                  <p className="text-xs text-slate-500">{lesson.subject}</p>
                  <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${lesson.color}`} style={{ width: `${lesson.progress}%` }} />
                  </div>
                </div>
                <span className="text-xs text-slate-400">{lesson.progress}%</span>
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
