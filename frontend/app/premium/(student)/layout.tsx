'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Brain, Target, Trophy, Award,
  Download, Settings, Sparkles, Bell, Search, ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { CustomCursor } from '@/components/premium/CustomCursor'
import { GradientOrb } from '@/components/premium/GlowCard'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

const navItems: { href: string; label: string; icon: LucideIcon; color: string }[] = [
  { href: '/premium/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-brand-300' },
  { href: '/premium/learn', label: 'Learn', icon: BookOpen, color: 'text-mint-300' },
  { href: '/premium/tutor', label: 'AI Tutor', icon: Brain, color: 'text-accent-300' },
  { href: '/premium/practice', label: 'Practice', icon: Target, color: 'text-gold-300' },
  { href: '/premium/exam', label: 'Exam Sim', icon: Trophy, color: 'text-brand-300' },
  { href: '/premium/achievements', label: 'Achievements', icon: Award, color: 'text-gold-300' },
  { href: '/premium/offline', label: 'Offline', icon: Download, color: 'text-mint-300' },
  { href: '/premium/settings', label: 'Settings', icon: Settings, color: 'text-surface-600' },
]

export default function PremiumStudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-0 mesh-bg flex">
      <CustomCursor />
      <GradientOrb className="top-0 right-0 opacity-50" size={400} speed={20} />

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-60 glass-strong border-r border-surface-300/30 z-40 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 border-b border-surface-300/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold text-white">
              Atlas
            </span>
          </Link>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="px-3 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20 flex-1">
              <p className="text-[10px] text-brand-300 font-medium">Student Portal</p>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-140px)]" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'text-surface-700 hover:bg-surface-200/50 hover:text-white border border-transparent'
                }`}
              >
                <item.icon className={`w-4 h-4 ${active ? item.color : 'text-surface-600 group-hover:text-white'} transition-colors`} />
                {item.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* User card at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-surface-300/20">
          <div className="flex items-center gap-3 p-2 rounded-lg glass">
            <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-xs shadow-glow">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">Aarav</div>
              <div className="text-[10px] text-surface-600">Class 10 · CBSE</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 relative" id="main-content" role="main" style={{ zIndex: 1 }}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 glass-strong border-b border-surface-300/30 lg:hidden">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn-ghost px-2"
              aria-label="Open navigation menu"
            >
              <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="font-display text-sm font-bold text-white">Atlas</span>
            <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-xs shadow-glow">
              A
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
