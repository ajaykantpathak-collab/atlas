'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Download, Trash2, HardDrive, Wifi, WifiOff,
  CheckCircle2, Clock, FileVideo, FileText, FileAudio,
  RefreshCw, Search, Cloud, CloudOff,
  BookOpen, AlertCircle, Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  CustomCursor, TiltCard, GlowCard, BorderBeam,
  StaggerContainer, StaggerItem, Spotlight,
  PremiumProgress, AnimatedCounter, ScrollReveal, PremiumLoader,
} from '@/components/premium'
import { useOfflineContent, useDownloadContent, useRemoveOfflineContent } from '@/hooks'

const typeIcons = {
  video: FileVideo,
  document: FileText,
  audio: FileAudio,
  interactive: BookOpen,
}

const typeColors = {
  video: 'text-brand-300',
  document: 'text-mint-300',
  audio: 'text-gold-300',
  interactive: 'text-accent-300',
}

export default function PremiumOfflinePage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'downloaded' | 'not-downloaded'>('all')

  const { data: offlineContent, isLoading } = useOfflineContent()
  const downloadContent = useDownloadContent()
  const removeContent = useRemoveOfflineContent()

  const content = offlineContent ?? []

  const filtered = content.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' ||
      (filter === 'downloaded' && c.status === 'downloaded') ||
      (filter === 'not-downloaded' && c.status === 'not-downloaded')
    return matchesSearch && matchesFilter
  })

  const usedStorage = content.filter(c => c.status === 'downloaded').reduce((sum, c) => sum + c.sizeBytes, 0)
  const storageLimit = 500

  if (isLoading) {
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
            <Link href="/premium/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Offline Content</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass">
              <Wifi className="w-3.5 h-3.5 text-mint-400" />
              <span className="text-xs text-surface-600">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <StaggerContainer stagger={0.1}>
          {/* Storage card */}
          <StaggerItem>
            <TiltCard maxTilt={4}>
              <BorderBeam className="glass-card rounded-2xl p-6 mb-6" duration={5}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
                    <HardDrive className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-2">
                      <h2 className="font-display text-lg font-bold text-white">Storage</h2>
                      <span className="text-xs text-surface-600 font-mono">{usedStorage} MB / {storageLimit} MB</span>
                    </div>
                    <PremiumProgress progress={(usedStorage / storageLimit) * 100} />
                    <p className="text-xs text-surface-600 mt-2">
                      <AnimatedCounter value={content.filter(c => c.status === 'downloaded').length} suffix=" items downloaded" />
                    </p>
                  </div>
                </div>
              </BorderBeam>
            </TiltCard>
          </StaggerItem>

          {/* Filters */}
          <StaggerItem>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search content..."
                  className="input-field pl-9 text-xs h-9"
                />
              </div>
              {(['all', 'downloaded', 'not-downloaded'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === tab ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'text-surface-600 hover:text-white'
                  }`}
                >
                  {tab === 'all' ? 'All' : tab === 'downloaded' ? 'Downloaded' : 'Available'}
                </button>
              ))}
            </div>
          </StaggerItem>

          {/* Content list */}
          <StaggerItem>
            <div className="space-y-3">
              {filtered.map((item, i) => {
                const Icon = typeIcons[item.type]
                const color = typeColors[item.type]
                return (
                  <ScrollReveal key={item.id} direction="up" delay={i * 0.05}>
                    <TiltCard maxTilt={3}>
                      <Spotlight className="glass-card rounded-xl p-4" size={300}>
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg glass flex items-center justify-center ${color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-surface-600 mt-0.5">
                              <span>{item.subject}</span>
                              <span>{item.chapter}</span>
                              <span>{item.size}</span>
                            </div>
                            {item.status === 'downloading' && (
                              <div className="mt-2">
                                <PremiumProgress progress={item.progress || 0} height="h-1" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {item.status === 'downloaded' && (
                              <span className="badge-success">
                                <CheckCircle2 className="w-3 h-3" />
                                Downloaded
                              </span>
                            )}
                            {item.status === 'downloading' && (
                              <span className="badge-brand">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                {item.progress}%
                              </span>
                            )}
                            {item.status === 'queued' && (
                              <span className="badge">
                                <Clock className="w-3 h-3" />
                                Queued
                              </span>
                            )}
                            {item.status === 'update-available' && (
                              <span className="badge-warning">
                                <RefreshCw className="w-3 h-3" />
                                Update
                              </span>
                            )}
                            {item.status === 'not-downloaded' && (
                              <button className="btn-ghost text-xs px-3 py-1.5">
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                            )}
                          </div>
                        </div>
                      </Spotlight>
                    </TiltCard>
                  </ScrollReveal>
                )
              })}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
