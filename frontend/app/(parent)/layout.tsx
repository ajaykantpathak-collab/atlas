'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard, Bell, ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AtlasMark } from '@/components/atlas/AtlasMark'
import { useAuthStore } from '@/stores/authStore'
import { getAuthToken } from '@/lib/api'

const navItems = [
  { href: '/parent-overview', label: 'Overview', icon: LayoutDashboard },
]

function authHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/** Get the logged-in parent's id from the persisted student-store. */
function getParentId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('student-storage');
    if (!raw) return null;
    return JSON.parse(raw)?.state?.profile?.id || null;
  } catch {
    return null;
  }
}

function initials(name: string): string {
  return name.split(' ').filter(Boolean).map((w) => w.charAt(0)).slice(0, 2).join('').toUpperCase() || 'P';
}

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useAuthStore((s) => s.user)
  // Real first linked child from the parent dashboard API — no hardcoded
  // demo identities. Chip stays hidden until real data arrives.
  const [child, setChild] = useState<{ name: string; grade: string | null } | null>(null)

  useEffect(() => {
    const pid = user?.id || getParentId()
    if (!pid) return
    let cancelled = false
    fetch(`/api/dashboard/parent/${pid}`, { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const c = d?.children?.[0]
        if (c?.student_name && !cancelled) setChild({ name: c.student_name, grade: c.grade ?? null })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [user?.id])

  return (
    <div className="min-h-screen mesh-bg flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-60 glass-strong border-r border-surface-300/30 z-40 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 border-b border-surface-300/20">
          <Link href="/" className="flex items-center gap-2">
            <AtlasMark size={32} />
            <span className="font-display text-sm font-bold text-white">Atlas</span>
          </Link>
          <div className="mt-3 px-3 py-2 rounded-lg bg-mint-500/10 border border-mint-500/20">
            <p className="text-[10px] text-mint-300 font-medium">Parent Portal</p>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'text-surface-600 hover:text-white hover:bg-surface-200/20'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-300/20">
          {child && (
            <div className="glass-card p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-xs font-bold text-white">
                  {child.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{child.name}</p>
                  {child.grade && <p className="text-[10px] text-surface-600">Class {child.grade}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 glass-strong border-b border-surface-300/30">
          <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden btn-ghost px-2"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <h1 className="font-display text-sm font-semibold text-white hidden sm:block">
              {navItems.find((n) => pathname.startsWith(n.href))?.label || 'Parent Portal'}
            </h1>
            <div className="flex items-center gap-3">
              <button className="btn-ghost p-2 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-500" />
              </button>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-mint-gradient flex items-center justify-center text-xs font-bold text-white">
                  {initials(user?.name || 'Parent')}
                </div>
                <span className="text-xs text-white hidden sm:block">{user?.name || 'Parent'}</span>
                <ChevronDown className="w-3 h-3 text-surface-600 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
