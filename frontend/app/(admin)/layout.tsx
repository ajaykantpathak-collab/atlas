'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard, Users, Database, Settings as SettingsIcon,
  Sparkles, Bell, ChevronDown, Search,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/(admin)/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/(admin)/users', label: 'Users', icon: Users },
  { href: '/(admin)/content', label: 'Content', icon: Database },
  { href: '/(admin)/system', label: 'System', icon: SettingsIcon },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen mesh-bg flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-60 glass-strong border-r border-surface-300/30 z-40 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 border-b border-surface-300/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold text-white">Prism</span>
          </Link>
          <div className="mt-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-[10px] text-red-300 font-medium">Admin Console</p>
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
            <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="input-field pl-9 text-xs h-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-ghost p-2 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-xs font-bold text-red-300">
                  AD
                </div>
                <span className="text-xs text-white hidden sm:block">Admin</span>
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
