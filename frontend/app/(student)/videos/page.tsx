'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Search, Play, Clock, Eye, Bookmark,
  Filter, Sparkles, Flame, Star,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'

const videos = [
  { id: 'v1', title: 'Understanding Quadratic Equations', subject: 'Mathematics', duration: '12:34', views: 15420, rating: 4.8, thumbnail: 'from-brand-500/30 to-accent-500/30', isNew: true, classLevel: 10 },
  { id: 'v2', title: 'The Magic of Photosynthesis', subject: 'Science', duration: '08:45', views: 22100, rating: 4.9, thumbnail: 'from-mint-500/30 to-gold-500/30', isNew: false, classLevel: 8 },
  { id: 'v3', title: 'French Revolution: Complete Overview', subject: 'Social Studies', duration: '15:20', views: 8730, rating: 4.6, thumbnail: 'from-orange-500/30 to-red-500/30', isNew: false, classLevel: 9 },
  { id: 'v4', title: 'Active and Passive Voice', subject: 'English', duration: '06:12', views: 18500, rating: 4.7, thumbnail: 'from-accent-500/30 to-purple-500/30', isNew: true, classLevel: 7 },
  { id: 'v5', title: 'Introduction to Python Programming', subject: 'Computer Science', duration: '20:30', views: 12300, rating: 4.5, thumbnail: 'from-purple-500/30 to-brand-500/30', isNew: false, classLevel: 11 },
  { id: 'v6', title: 'Trigonometry Made Easy', subject: 'Mathematics', duration: '14:55', views: 31000, rating: 4.9, thumbnail: 'from-brand-500/30 to-cyan-500/30', isNew: false, classLevel: 10 },
  { id: 'v7', title: 'Cell Structure and Function', subject: 'Science', duration: '11:08', views: 14200, rating: 4.7, thumbnail: 'from-mint-500/30 to-accent-500/30', isNew: true, classLevel: 9 },
  { id: 'v8', title: 'Mughal Empire: Rise and Fall', subject: 'Social Studies', duration: '18:42', views: 9600, rating: 4.4, thumbnail: 'from-gold-500/30 to-orange-500/30', isNew: false, classLevel: 7 },
]

const filters = ['All', 'Mathematics', 'Science', 'Social Studies', 'English', 'Computer Science']

export default function VideosPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = videos.filter((v) => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === 'All' || v.subject === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen mesh-bg">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Video Library</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search videos..."
              className="input-field pl-9 text-xs h-9 w-40 sm:w-56"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === f
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  : 'glass-card text-surface-600 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-0 mb-8 overflow-hidden rounded-2xl"
        >
          <div className="relative h-48 sm:h-64 bg-gradient-to-br from-brand-500/30 via-accent-500/20 to-purple-500/30 flex items-center justify-center">
            <div className="absolute inset-0 mesh-bg opacity-50" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer"
            >
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </motion.div>
            <div className="absolute bottom-4 left-4 z-10">
              <span className="badge-accent text-[10px] mb-2 inline-flex items-center gap-1">
                <Flame className="w-3 h-3" /> Featured
              </span>
              <h2 className="font-display text-xl font-bold text-white">Trigonometry Made Easy</h2>
              <p className="text-xs text-surface-600 mt-1">Mathematics · 14:55 · 31K views</p>
            </div>
          </div>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-0 overflow-hidden rounded-xl cursor-pointer group"
            >
              <div className={`relative h-32 bg-gradient-to-br ${video.thumbnail} flex items-center justify-center`}>
                <div className="absolute inset-0 mesh-bg opacity-30" />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="relative z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
                >
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </motion.div>
                <span className="absolute bottom-2 right-2 z-10 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">
                  {video.duration}
                </span>
                {video.isNew && (
                  <span className="absolute top-2 left-2 z-10 badge-accent text-[9px]">NEW</span>
                )}
                <button className="absolute top-2 right-2 z-10 w-7 h-7 rounded-lg bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-white line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-[10px] text-surface-600">{video.subject} · Class {video.classLevel}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-surface-600">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {(video.views / 1000).toFixed(1)}K
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold-300" /> {video.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
