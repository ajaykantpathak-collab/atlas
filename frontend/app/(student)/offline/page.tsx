'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Download, Trash2, HardDrive, Wifi, WifiOff,
  CheckCircle2, Clock, FileVideo, FileText, FileAudio,
  RefreshCw, Search, Filter, Cloud, CloudOff,
  BookOpen, AlertCircle, Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'

interface OfflineContent {
  id: string
  title: string
  subject: string
  type: 'video' | 'document' | 'audio' | 'interactive'
  size: string
  sizeBytes: number
  status: 'downloaded' | 'downloading' | 'queued' | 'update-available' | 'not-downloaded'
  progress?: number
  lastUpdated: string
  chapter: string
}

const storageLimit = 500 // MB
const mockContent: OfflineContent[] = [
  { id: '1', title: 'Light — Reflection and Refraction', subject: 'Science', type: 'video', size: '45 MB', sizeBytes: 45, status: 'downloaded', lastUpdated: '2025-07-28', chapter: 'Chapter 3' },
  { id: '2', title: 'Quadratic Equations — Complete', subject: 'Mathematics', type: 'interactive', size: '28 MB', sizeBytes: 28, status: 'downloaded', lastUpdated: '2025-07-27', chapter: 'Chapter 4' },
  { id: '3', title: 'The Rise of Nationalism in Europe', subject: 'Social Science', type: 'video', size: '52 MB', sizeBytes: 52, status: 'downloaded', lastUpdated: '2025-07-25', chapter: 'Chapter 1' },
  { id: '4', title: 'Reported Speech — Full Lesson', subject: 'English', type: 'document', size: '12 MB', sizeBytes: 12, status: 'downloaded', lastUpdated: '2025-07-24', chapter: 'Chapter 7' },
  { id: '5', title: 'Electricity — Interactive Lab', subject: 'Science', type: 'interactive', size: '38 MB', sizeBytes: 38, status: 'update-available', lastUpdated: '2025-07-20', chapter: 'Chapter 4' },
  { id: '6', title: 'Periodic Classification — Audio Summary', subject: 'Science', type: 'audio', size: '18 MB', sizeBytes: 18, status: 'downloaded', lastUpdated: '2025-07-22', chapter: 'Chapter 5' },
  { id: '7', title: 'Polynomials — Practice Set', subject: 'Mathematics', type: 'document', size: '8 MB', sizeBytes: 8, status: 'downloading', progress: 45, lastUpdated: '2025-07-30', chapter: 'Chapter 2' },
  { id: '8', title: 'Real Numbers — Video Lesson', subject: 'Mathematics', type: 'video', size: '42 MB', sizeBytes: 42, status: 'queued', lastUpdated: '2025-07-30', chapter: 'Chapter 1' },
  { id: '9', title: 'Chemical Reactions — Full Chapter', subject: 'Science', type: 'video', size: '65 MB', sizeBytes: 65, status: 'not-downloaded', lastUpdated: '-', chapter: 'Chapter 1' },
  { id: '10', title: 'Mughal Empire — Timeline', subject: 'Social Science', type: 'interactive', size: '32 MB', sizeBytes: 32, status: 'not-downloaded', lastUpdated: '-', chapter: 'Chapter 3' },
  { id: '11', title: 'A Letter to God — Audio Reading', subject: 'English', type: 'audio', size: '15 MB', sizeBytes: 15, status: 'not-downloaded', lastUpdated: '-', chapter: 'Chapter 1' },
  { id: '12', title: 'Trigonometry — Interactive', subject: 'Mathematics', type: 'interactive', size: '48 MB', sizeBytes: 48, status: 'not-downloaded', lastUpdated: '-', chapter: 'Chapter 8' },
]

const typeIcons: Record<string, typeof FileVideo> = {
  video: FileVideo,
  document: FileText,
  audio: FileAudio,
  interactive: BookOpen,
}

const typeColors: Record<string, string> = {
  video: 'text-brand-300 bg-brand-500/15',
  document: 'text-accent-300 bg-accent-500/15',
  audio: 'text-gold-300 bg-gold-500/15',
  interactive: 'text-mint-300 bg-mint-500/15',
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  'downloaded': { label: 'Downloaded', color: 'text-mint-300', icon: CheckCircle2 },
  'downloading': { label: 'Downloading', color: 'text-brand-300', icon: Loader2 },
  'queued': { label: 'Queued', color: 'text-gold-300', icon: Clock },
  'update-available': { label: 'Update Available', color: 'text-gold-300', icon: RefreshCw },
  'not-downloaded': { label: 'Not Downloaded', color: 'text-surface-600', icon: CloudOff },
}

export default function OfflinePage() {
  const [content, setContent] = useState(mockContent)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [isOnline, setIsOnline] = useState(true)

  const downloaded = content.filter((c) => c.status === 'downloaded' || c.status === 'update-available')
  const usedStorage = downloaded.reduce((sum, c) => sum + c.sizeBytes, 0)
  const storagePercentage = Math.round((usedStorage / storageLimit) * 100)

  const filtered = content.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || c.status === filter || (filter === 'downloaded' && (c.status === 'downloaded' || c.status === 'update-available'))
    return matchesSearch && matchesFilter
  })

  const handleDownload = (id: string) => {
    setContent((prev) => prev.map((c) => c.id === id ? { ...c, status: 'downloading', progress: 0 } : c))
    // Simulate download progress
    const interval = setInterval(() => {
      setContent((prev) => prev.map((c) => {
        if (c.id === id && c.status === 'downloading') {
          const newProgress = (c.progress || 0) + 10
          if (newProgress >= 100) {
            clearInterval(interval)
            return { ...c, status: 'downloaded', progress: 100, lastUpdated: new Date().toISOString().split('T')[0] }
          }
          return { ...c, progress: newProgress }
        }
        return c
      }))
    }, 500)
  }

  const handleDelete = (id: string) => {
    setContent((prev) => prev.map((c) => c.id === id ? { ...c, status: 'not-downloaded', progress: undefined, lastUpdated: '-' } : c))
  }

  const handleUpdate = (id: string) => {
    setContent((prev) => prev.map((c) => c.id === id ? { ...c, status: 'downloading', progress: 0 } : c))
    const interval = setInterval(() => {
      setContent((prev) => prev.map((c) => {
        if (c.id === id && c.status === 'downloading') {
          const newProgress = (c.progress || 0) + 20
          if (newProgress >= 100) {
            clearInterval(interval)
            return { ...c, status: 'downloaded', progress: 100, lastUpdated: new Date().toISOString().split('T')[0] }
          }
          return { ...c, progress: newProgress }
        }
        return c
      }))
    }, 400)
  }

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-lg font-semibold text-white">Offline Content</h1>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isOnline ? 'bg-mint-500/15 text-mint-300 border border-mint-500/30' : 'bg-red-500/15 text-red-300 border border-red-500/30'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Storage overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow flex-shrink-0">
              <HardDrive className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-sm font-semibold text-white">Storage Usage</h3>
                <span className="text-xs text-surface-600">{usedStorage} MB / {storageLimit} MB</span>
              </div>
              <div className="h-3 rounded-full bg-surface-300/40 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${storagePercentage}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full ${storagePercentage > 80 ? 'bg-red-500/60' : 'bg-brand-gradient'}`}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-surface-600">{downloaded.length} items downloaded</span>
                <span className={`text-[10px] font-medium ${storagePercentage > 80 ? 'text-red-300' : 'text-mint-300'}`}>
                  {storagePercentage > 80 ? 'Running low on space' : `${100 - storagePercentage}% free`}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Offline banner */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 text-sm mb-6"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              You're offline. Only downloaded content is available.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content..."
              className="input-field pl-11"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {[
              { id: 'all', label: 'All' },
              { id: 'downloaded', label: 'Downloaded' },
              { id: 'downloading', label: 'Downloading' },
              { id: 'queued', label: 'Queued' },
              { id: 'not-downloaded', label: 'Available' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  filter === f.id
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'glass text-surface-600 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content list */}
        <div className="space-y-3">
          {filtered.map((item, i) => {
            const TypeIcon = typeIcons[item.type]
            const status = statusConfig[item.status]
            const StatusIcon = status.icon

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-4">
                  {/* Type icon */}
                  <div className={`w-12 h-12 rounded-xl ${typeColors[item.type]} flex items-center justify-center flex-shrink-0`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>

                  {/* Content info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-surface-600">
                      <span>{item.subject}</span>
                      <span>·</span>
                      <span>{item.chapter}</span>
                      <span>·</span>
                      <span>{item.size}</span>
                      {item.lastUpdated !== '-' && (
                        <>
                          <span>·</span>
                          <span>Updated {item.lastUpdated}</span>
                        </>
                      )}
                    </div>

                    {/* Download progress */}
                    {item.status === 'downloading' && item.progress !== undefined && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-brand-300">Downloading... {item.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-surface-300/40 overflow-hidden">
                          <motion.div
                            animate={{ width: `${item.progress}%` }}
                            className="h-full rounded-full bg-brand-gradient"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status & actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`flex items-center gap-1 text-[10px] ${status.color}`}>
                      <StatusIcon className={`w-3 h-3 ${item.status === 'downloading' ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline">{status.label}</span>
                    </span>

                    {item.status === 'downloaded' && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn-ghost p-2 text-red-300 hover:text-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    {item.status === 'update-available' && (
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="btn-ghost p-2 text-gold-300 hover:text-gold-200"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    {item.status === 'not-downloaded' && (
                      <button
                        onClick={() => handleDownload(item.id)}
                        disabled={!isOnline}
                        className="btn-primary text-xs disabled:opacity-30"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Save
                      </button>
                    )}
                    {item.status === 'queued' && (
                      <button
                        onClick={() => handleDownload(item.id)}
                        disabled={!isOnline}
                        className="btn-secondary text-xs disabled:opacity-30"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Queued
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <CloudOff className="w-12 h-12 text-surface-600 mx-auto mb-4" />
            <p className="text-sm text-surface-600">No content found</p>
          </div>
        )}
      </div>
    </div>
  )
}
