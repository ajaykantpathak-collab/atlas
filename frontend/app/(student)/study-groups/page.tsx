'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Search, Users, MessageCircle, Calendar,
  Clock, Star, Sparkles, ChevronRight, Plus, Zap,
  Trophy, BookOpen, Target, TrendingUp, Crown,
  CheckCircle2, Lock, UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'

const studyGroups = [
  {
    id: 'g1',
    name: 'Calculus Warriors',
    subject: 'Mathematics',
    members: 8,
    maxMembers: 10,
    level: 'Class 11-12',
    description: 'Master derivatives, integrals, and limits together. We solve problems daily!',
    tags: ['Calculus', 'Problem Solving', 'Daily Practice'],
    rating: 4.9,
    activeMembers: 5,
    nextSession: 'Today, 6:00 PM',
    color: 'from-brand-500/30 to-accent-500/30',
    joined: true,
  },
  {
    id: 'g2',
    name: 'Physics Explorers',
    subject: 'Physics',
    members: 12,
    maxMembers: 15,
    level: 'Class 10-12',
    description: 'From mechanics to modern physics. Experiments, discussions, and doubt clearing.',
    tags: ['Mechanics', 'Experiments', 'Doubt Clearing'],
    rating: 4.8,
    activeMembers: 8,
    nextSession: 'Tomorrow, 5:00 PM',
    color: 'from-mint-500/30 to-gold-500/30',
    joined: false,
  },
  {
    id: 'g3',
    name: 'Code Crafters',
    subject: 'Computer Science',
    members: 6,
    maxMembers: 8,
    level: 'Class 9-12',
    description: 'Learn Python, Java, and data structures through collaborative coding challenges.',
    tags: ['Python', 'Java', 'DSA'],
    rating: 4.9,
    activeMembers: 4,
    nextSession: 'Today, 8:00 PM',
    color: 'from-cyan-500/30 to-brand-500/30',
    joined: true,
  },
  {
    id: 'g4',
    name: 'Chemistry Wizards',
    subject: 'Chemistry',
    members: 10,
    maxMembers: 12,
    level: 'Class 11-12',
    description: 'Organic, inorganic, physical — we cover it all. Weekly mock tests included.',
    tags: ['Organic', 'Mock Tests', 'Reactions'],
    rating: 4.7,
    activeMembers: 3,
    nextSession: 'Wed, 4:30 PM',
    color: 'from-purple-500/30 to-brand-500/30',
    joined: false,
  },
  {
    id: 'g5',
    name: 'History Buffs',
    subject: 'Social Studies',
    members: 15,
    maxMembers: 20,
    level: 'Class 8-10',
    description: 'Explore world history, Indian freedom struggle, and ancient civilizations.',
    tags: ['World History', 'Indian History', 'Discussions'],
    rating: 4.6,
    activeMembers: 7,
    nextSession: 'Thu, 5:00 PM',
    color: 'from-gold-500/30 to-orange-500/30',
    joined: false,
  },
  {
    id: 'g6',
    name: 'Biology geniuses',
    subject: 'Biology',
    members: 9,
    maxMembers: 10,
    level: 'Class 10-12',
    description: 'Cell biology, genetics, human physiology — deep dives with visual aids.',
    tags: ['Genetics', 'Physiology', 'Diagrams'],
    rating: 4.8,
    activeMembers: 6,
    nextSession: 'Today, 7:00 PM',
    color: 'from-mint-500/30 to-accent-500/30',
    joined: false,
  },
]

const groupChallenges = [
  { id: 'c1', title: 'Weekly Problem Set #15', group: 'Calculus Warriors', deadline: '2 days left', participants: 6, reward: '50 XP', status: 'active' },
  { id: 'c2', title: 'Physics Quiz Championship', group: 'Physics Explorers', deadline: '5 days left', participants: 12, reward: '100 XP + Badge', status: 'active' },
  { id: 'c3', title: 'Coding Sprint: Sorting Algorithms', group: 'Code Crafters', deadline: '1 day left', participants: 4, reward: '75 XP', status: 'urgent' },
]

const leaderboard = [
  { rank: 1, name: 'Ananya P.', points: 2840, avatar: 'from-gold-500 to-orange-500', group: 'Calculus Warriors' },
  { rank: 2, name: 'Rohan K.', points: 2650, avatar: 'from-brand-500 to-accent-500', group: 'Code Crafters' },
  { rank: 3, name: 'Sara M.', points: 2480, avatar: 'from-mint-500 to-gold-500', group: 'Physics Explorers' },
  { rank: 4, name: 'You', points: 2150, avatar: 'from-accent-500 to-purple-500', group: 'Calculus Warriors', isYou: true },
  { rank: 5, name: 'Karthik V.', points: 1980, avatar: 'from-purple-500 to-brand-500', group: 'Chemistry Wizards' },
]

const filters = ['All', 'My Groups', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Social Studies']

export default function StudyGroupsPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = studyGroups.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.subject.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'My Groups' && g.joined) ||
      g.subject === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen mesh-bg">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Study Groups</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search groups..."
                className="input-field pl-9 text-xs h-9 w-32 sm:w-48"
              />
            </div>
            <button onClick={() => setShowCreate(true)} className="btn-primary text-xs px-3 py-2 rounded-lg flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Create
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'My Groups', value: '2', icon: Users, color: 'text-brand-300' },
            { label: 'Active Challenges', value: '3', icon: Target, color: 'text-accent-300' },
            { label: 'Total XP', value: '2,150', icon: Zap, color: 'text-gold-300' },
            { label: 'Rank', value: '#4', icon: Crown, color: 'text-mint-300' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-3 rounded-xl"
            >
              <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-surface-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Active challenges */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Active Challenges
          </h2>
          <div className="space-y-2">
            {groupChallenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover p-3 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    challenge.status === 'urgent' ? 'bg-red-500/20 text-red-300' : 'bg-accent-500/20 text-accent-300'
                  }`}>
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{challenge.title}</h3>
                    <p className="text-[10px] text-surface-600">{challenge.group} · {challenge.participants} participating</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] text-surface-600">{challenge.reward}</p>
                    <p className={`text-[10px] font-medium ${challenge.status === 'urgent' ? 'text-red-300' : 'text-gold-300'}`}>
                      {challenge.deadline}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-surface-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === f
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  : 'glass-card text-surface-600 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Study groups grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-0 overflow-hidden rounded-xl"
            >
              <div className={`relative h-20 bg-gradient-to-br ${group.color} flex items-center justify-between px-4`}>
                <div className="absolute inset-0 mesh-bg opacity-30" />
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white">{group.name}</h3>
                  <p className="text-[10px] text-white/70">{group.subject} · {group.level}</p>
                </div>
                <div className="relative z-10 flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-300" />
                  <span className="text-[10px] text-white">{group.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-surface-400 mb-3 line-clamp-2">{group.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {group.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-200/20 text-[9px] text-surface-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-surface-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {group.members}/{group.maxMembers}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint-400" /> {group.activeMembers} active
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-surface-600 mb-3 pb-3 border-b border-surface-300/20">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {group.nextSession}
                  </span>
                </div>
                <button
                  className={`w-full text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    group.joined
                      ? 'glass-card text-surface-400'
                      : 'btn-primary'
                  }`}
                >
                  {group.joined ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Joined
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Join Group
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Group leaderboard */}
        <div className="mt-8">
          <h2 className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5" /> Group Leaderboard
          </h2>
          <div className="glass-card p-4 rounded-xl">
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    entry.isYou ? 'bg-brand-500/10 border border-brand-500/20' : ''
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    entry.rank === 1 ? 'bg-gold-500/20 text-gold-300' :
                    entry.rank === 2 ? 'bg-surface-300/20 text-surface-300' :
                    entry.rank === 3 ? 'bg-orange-500/20 text-orange-300' :
                    'bg-surface-200/20 text-surface-600'
                  }`}>
                    {entry.rank}
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${entry.avatar} flex items-center justify-center text-xs font-bold text-white`}>
                    {entry.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${entry.isYou ? 'text-brand-300' : 'text-white'}`}>{entry.name}</p>
                    <p className="text-[10px] text-surface-600">{entry.group}</p>
                  </div>
                  <span className="text-xs font-bold text-gold-300">{entry.points} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create group modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="font-display text-lg font-bold text-white mb-4">Create Study Group</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-surface-600 uppercase tracking-wider">Group Name</label>
                  <input className="input-field text-xs h-10 mt-1" placeholder="e.g., Algebra Avengers" />
                </div>
                <div>
                  <label className="text-[10px] text-surface-600 uppercase tracking-wider">Subject</label>
                  <select className="input-field text-xs h-10 mt-1">
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Computer Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-surface-600 uppercase tracking-wider">Description</label>
                  <textarea className="input-field text-xs mt-1 min-h-[60px]" placeholder="What will your group focus on?" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-surface-600 uppercase tracking-wider">Max Members</label>
                    <input type="number" defaultValue={10} className="input-field text-xs h-10 mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] text-surface-600 uppercase tracking-wider">Level</label>
                    <select className="input-field text-xs h-10 mt-1">
                      <option>Class 8-10</option>
                      <option>Class 11-12</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setShowCreate(false)} className="flex-1 glass-card text-xs py-2.5 rounded-lg text-surface-400">
                  Cancel
                </button>
                <button onClick={() => setShowCreate(false)} className="flex-1 btn-primary text-xs py-2.5 rounded-lg">
                  Create Group
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
