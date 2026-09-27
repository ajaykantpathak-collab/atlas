'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Wifi, WifiOff, FileText, Trash2, RefreshCw, BookOpen,
} from 'lucide-react'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { listDownloadedStories } from '@/lib/offlineLibrary'

interface CachedPage {
  url: string
  sizeKb: number | null
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname || '/'
  } catch {
    return url
  }
}

import PremiumGate from '@/components/premium/PremiumGate'

export default function OfflinePage() {
  // Offline mode is premium-gated per the landing pricing.
  return (
    <PremiumGate feature="offline">
      <OfflineInner />
    </PremiumGate>
  )
}

function OfflineInner() {
  const [isOnline, setIsOnline] = useState(true)
  const [cached, setCached] = useState<CachedPage[]>([])
  const [storageUsed, setStorageUsed] = useState<number | null>(null)
  const [storageQuota, setStorageQuota] = useState<number | null>(null)
  const [swActive, setSwActive] = useState<boolean | null>(null)
  const [savedStories, setSavedStories] = useState(0)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    try {
      setSwActive(!!(await navigator.serviceWorker?.getRegistration()))
      // The real offline story library (Cache Storage), not an estimate.
      setSavedStories((await listDownloadedStories()).length)
      if ('caches' in window) {
        const names = await caches.keys()
        const pages: CachedPage[] = []
        for (const name of names) {
          const cache = await caches.open(name)
          const reqs = await cache.keys()
          for (const r of reqs) {
            let sizeKb: number | null = null
            try {
              const res = await cache.match(r)
              if (res) {
                const blob = await res.blob()
                sizeKb = Math.round(blob.size / 1024)
              }
            } catch { /* size optional */ }
            pages.push({ url: r.url, sizeKb })
          }
        }
        setCached(pages)
      }
      if (navigator.storage?.estimate) {
        const est = await navigator.storage.estimate()
        setStorageUsed(est.usage ? Math.round(est.usage / 1024 / 1024) : null)
        setStorageQuota(est.quota ? Math.round(est.quota / 1024 / 1024) : null)
      }
    } catch { /* best-effort */ }
    setLoading(false)
  }

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    refresh()
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  // "Clear all" applies to the auto-cached page/runtime stores only — the
  // pinned story library (atlas-stories-v1) is the student's downloaded
  // content and is never swept here; it is managed on /premium/offline.
  const PERSISTENT_CACHES = ['atlas-stories-v1']
  const clearAll = async () => {
    if ('caches' in window) {
      const names = await caches.keys()
      await Promise.all(
        names
          .filter((n) => !PERSISTENT_CACHES.includes(n))
          .map((n) => caches.delete(n))
      )
    }
    setCached([])
  }

  const pct =
    storageUsed != null && storageQuota
      ? Math.min(100, Math.round((storageUsed / storageQuota) * 100))
      : null

  return (
    <div className="min-h-screen mesh-bg">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <PrismLogo size={28} />
          <Link href="/dashboard" className="btn-ghost px-2">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-lg font-semibold text-white">Offline Access</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Status */}
        <div className="glass-card rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isOnline ? (
              <Wifi className="w-8 h-8 text-mint-300" />
            ) : (
              <WifiOff className="w-8 h-8 text-gold-300" />
            )}
            <div>
              <p className="font-display font-semibold text-white">
                {isOnline ? "You're online" : "You're offline"}
              </p>
              <p className="text-xs text-surface-600">
                {isOnline
                  ? 'Pages you visit are cached automatically for offline use.'
                  : 'Cached pages below still open without a connection.'}
              </p>
            </div>
          </div>
          <button
            onClick={refresh}
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Saved stories — the real offline library */}
        <Link
          href="/premium/offline"
          className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-brand-500/40 transition-colors"
        >
          <BookOpen className="w-8 h-8 text-brand-300 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-white">
              {loading ? 'Checking saved stories…' : `${savedStories} ${savedStories === 1 ? 'story' : 'stories'} saved for offline`}
            </p>
            <p className="text-xs text-surface-600 mt-0.5">
              Stories you open while online are stored on this device — see the full library.
            </p>
          </div>
        </Link>

        {/* Storage */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-sm font-semibold text-white">Storage</h2>
            <span className="text-xs text-surface-600">
              {storageUsed != null && storageQuota != null
                ? `${storageUsed} MB / ${storageQuota} MB`
                : 'Estimate unavailable'}
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-400 to-gold-400 transition-all"
              style={{ width: `${pct ?? 0}%` }}
            />
          </div>
          <p className="text-[11px] text-surface-600 mt-2">
            Service worker: {swActive === null ? '…' : swActive ? 'active' : 'not registered'}
          </p>
        </div>

        {/* Cached pages */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold text-white">
              Cached pages ({cached.length})
            </h2>
            {cached.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-300 hover:text-red-200 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>
          {loading ? (
            <p className="text-xs text-surface-600">Reading cache…</p>
          ) : cached.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-surface-600 mx-auto mb-2" />
              <p className="text-sm text-surface-600">Nothing cached yet.</p>
              <p className="text-xs text-surface-600 mt-1">
                Browse the app — pages are stored here automatically as you open them.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {cached.map((p) => (
                <li key={p.url} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-4 h-4 text-brand-300 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{pathOf(p.url)}</p>
                      <p className="text-[10px] text-surface-600">
                        {p.sizeKb != null ? `${p.sizeKb} KB` : 'cached'}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={pathOf(p.url)}
                    className="text-xs text-brand-300 hover:text-brand-200 shrink-0"
                  >
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
