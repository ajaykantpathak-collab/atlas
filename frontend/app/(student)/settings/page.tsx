'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, User, Bell, Globe, Shield, Palette,
  Download, LogOut, ChevronRight, Check, Moon, Sun,
  Volume2, Vibrate, Smartphone, Wifi, Languages,
  Eye, Accessibility, HelpCircle, Trash2, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

type SettingSection = 'account' | 'notifications' | 'appearance' | 'language' | 'privacy' | 'accessibility' | 'about'

const DEFAULT_SETTINGS = {
  pushNotifications: true,
  emailNotifications: true,
  achievementAlerts: true,
  streakReminders: true,
  examReminders: true,
  soundEffects: true,
  hapticFeedback: true,
  darkMode: true,
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  screenReader: false,
  autoDownload: false,
  dataSaver: true,
  language: 'English',
  region: 'India',
  board: 'CBSE',
}

const sections: { id: SettingSection; label: string; icon: typeof User; color: string }[] = [
  { id: 'account', label: 'Account', icon: User, color: 'text-brand-300' },
  { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-gold-300' },
  { id: 'appearance', label: 'Appearance', icon: Palette, color: 'text-accent-300' },
  { id: 'language', label: 'Language & Region', icon: Globe, color: 'text-mint-300' },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield, color: 'text-red-300' },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility, color: 'text-brand-300' },
  { id: 'about', label: 'About', icon: HelpCircle, color: 'text-surface-600' },
]

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [active, setActive] = useState<SettingSection>('account')
  const [settings, setSettings] = useState(() => {
    // Restore locally-saved preferences (device only — no backend surface exists)
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('dream-settings')
        if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      } catch { /* corrupted save — fall back to defaults */ }
    }
    return { ...DEFAULT_SETTINGS }
  })

  // Persist on every change so toggles survive reloads
  useEffect(() => {
    try {
      window.localStorage.setItem('dream-settings', JSON.stringify(settings))
    } catch { /* storage unavailable (private mode) — settings stay session-only */ }
  }, [settings])

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <PrismLogo size={28} />
          <Link href="/dashboard" className="btn-ghost px-2">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-lg font-semibold text-white">Settings</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active === section.id
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'text-surface-600 hover:text-white hover:bg-surface-200/30'
                }`}
              >
                <section.icon className={`w-4 h-4 ${active === section.id ? section.color : ''}`} />
                {section.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-all mt-4"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="glass-card p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Account */}
                {active === 'account' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-lg font-semibold text-white">Account</h2>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-200/30">
                      <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user?.name || 'Student'}</p>
                        <p className="text-xs text-surface-600">{user?.email || ''}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="badge-brand text-[10px]">{settings.board} Class 10</span>
                          <span className="badge text-[10px]">Student</span>
                        </div>
                      </div>
                    </div>
                    <SettingRow label="Full Name" value={user?.name || 'Student'} />
                    <SettingRow label="Email Address" value={user?.email || ''} />
                    <SettingRow label="Board" value={settings.board} />
                    <SettingRow label="Class Level" value="Class 10" />
                    <SettingRow label="School" value="Delhi Public School" />
                    <button className="btn-primary text-xs">
                      Edit Profile
                    </button>
                  </div>
                )}

                {/* Notifications */}
                {active === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-lg font-semibold text-white">Notifications</h2>
                    <ToggleRow
                      icon={Bell}
                      label="Push Notifications"
                      description="Receive push notifications on your device"
                      value={settings.pushNotifications}
                      onChange={() => toggleSetting('pushNotifications')}
                    />
                    <ToggleRow
                      icon={Bell}
                      label="Email Notifications"
                      description="Receive notifications via email"
                      value={settings.emailNotifications}
                      onChange={() => toggleSetting('emailNotifications')}
                    />
                    <ToggleRow
                      icon={Bell}
                      label="Achievement Alerts"
                      description="Get notified when you unlock achievements"
                      value={settings.achievementAlerts}
                      onChange={() => toggleSetting('achievementAlerts')}
                    />
                    <ToggleRow
                      icon={Bell}
                      label="Streak Reminders"
                      description="Daily reminders to maintain your streak"
                      value={settings.streakReminders}
                      onChange={() => toggleSetting('streakReminders')}
                    />
                    <ToggleRow
                      icon={Bell}
                      label="Exam Reminders"
                      description="Get notified about upcoming exams"
                      value={settings.examReminders}
                      onChange={() => toggleSetting('examReminders')}
                    />
                    <ToggleRow
                      icon={Volume2}
                      label="Sound Effects"
                      description="Play sounds for notifications and interactions"
                      value={settings.soundEffects}
                      onChange={() => toggleSetting('soundEffects')}
                    />
                    <ToggleRow
                      icon={Vibrate}
                      label="Haptic Feedback"
                      description="Vibrate on interactions (mobile only)"
                      value={settings.hapticFeedback}
                      onChange={() => toggleSetting('hapticFeedback')}
                    />
                  </div>
                )}

                {/* Appearance */}
                {active === 'appearance' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-lg font-semibold text-white">Appearance</h2>
                    <div>
                      <p className="text-xs text-surface-600 mb-3">Theme</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => toggleSetting('darkMode')}
                          className={`p-4 rounded-xl border transition-all ${
                            settings.darkMode ? 'bg-brand-500/15 border-brand-500/30' : 'bg-surface-200/30 border-surface-300/20'
                          }`}
                        >
                          <Moon className={`w-6 h-6 mx-auto mb-2 ${settings.darkMode ? 'text-brand-300' : 'text-surface-600'}`} />
                          <p className="text-xs text-white">Dark</p>
                        </button>
                        <button
                          onClick={() => toggleSetting('darkMode')}
                          className={`p-4 rounded-xl border transition-all ${
                            !settings.darkMode ? 'bg-brand-500/15 border-brand-500/30' : 'bg-surface-200/30 border-surface-300/20'
                          }`}
                        >
                          <Sun className={`w-6 h-6 mx-auto mb-2 ${!settings.darkMode ? 'text-brand-300' : 'text-surface-600'}`} />
                          <p className="text-xs text-white">Light</p>
                        </button>
                      </div>
                    </div>
                    <ToggleRow
                      icon={Eye}
                      label="Reduced Motion"
                      description="Minimize animations and transitions"
                      value={settings.reducedMotion}
                      onChange={() => toggleSetting('reducedMotion')}
                    />
                  </div>
                )}

                {/* Language */}
                {active === 'language' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-lg font-semibold text-white">Language & Region</h2>
                    <div>
                      <p className="text-xs text-surface-600 mb-2">App Language</p>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="input-field"
                      >
                        <option>English</option>
                        <option>हिन्दी (Hindi)</option>
                        <option>தமிழ் (Tamil)</option>
                        <option>తెలుగు (Telugu)</option>
                        <option>বাংলা (Bengali)</option>
                        <option>मराठी (Marathi)</option>
                        <option>ગુજરાતી (Gujarati)</option>
                        <option>ಕನ್ನಡ (Kannada)</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xs text-surface-600 mb-2">Region</p>
                      <select
                        value={settings.region}
                        onChange={(e) => setSettings({ ...settings, region: e.target.value })}
                        className="input-field"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Singapore</option>
                        <option>UAE</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xs text-surface-600 mb-2">Education Board</p>
                      <select
                        value={settings.board}
                        onChange={(e) => setSettings({ ...settings, board: e.target.value })}
                        className="input-field"
                      >
                        <option>CBSE</option>
                        <option>CISCE (ICSE/ISC)</option>
                      </select>
                    </div>
                    <ToggleRow
                      icon={Download}
                      label="Auto-Download Content"
                      description="Automatically download new lessons when on Wi-Fi"
                      value={settings.autoDownload}
                      onChange={() => toggleSetting('autoDownload')}
                    />
                    <ToggleRow
                      icon={Wifi}
                      label="Data Saver"
                      description="Reduce data usage by lowering video quality"
                      value={settings.dataSaver}
                      onChange={() => toggleSetting('dataSaver')}
                    />
                  </div>
                )}

                {/* Privacy */}
                {active === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-lg font-semibold text-white">Privacy & Security</h2>
                    <SettingRow label="Change Password" value="Not available yet" />
                    <SettingRow label="Two-Factor Authentication" value="Not available yet" />
                    <SettingRow label="Data Sharing" value="Not configurable yet" />
                    <SettingRow label="Connected Devices" value="Not available yet" />
                    <div className="pt-4 border-t border-surface-300/20">
                      <button
                        disabled
                        className="flex items-center gap-3 text-sm text-red-300/40 cursor-not-allowed"
                        title="Account deletion is not available yet"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                      <p className="text-[10px] text-surface-600 mt-2">
                        Account deletion is not available yet. This space will be used for it when the backend supports it.
                      </p>
                    </div>
                  </div>
                )}

                {/* Accessibility */}
                {active === 'accessibility' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-lg font-semibold text-white">Accessibility</h2>
                    <ToggleRow
                      icon={Accessibility}
                      label="High Contrast Mode"
                      description="Increase visual contrast for better readability"
                      value={settings.highContrast}
                      onChange={() => toggleSetting('highContrast')}
                    />
                    <ToggleRow
                      icon={Accessibility}
                      label="Large Text"
                      description="Increase font size throughout the app"
                      value={settings.largeText}
                      onChange={() => toggleSetting('largeText')}
                    />
                    <ToggleRow
                      icon={Accessibility}
                      label="Screen Reader Optimization"
                      description="Enhance screen reader compatibility"
                      value={settings.screenReader}
                      onChange={() => toggleSetting('screenReader')}
                    />
                    <ToggleRow
                      icon={Eye}
                      label="Reduced Motion"
                      description="Minimize animations and transitions"
                      value={settings.reducedMotion}
                      onChange={() => toggleSetting('reducedMotion')}
                    />
                    <p className="text-[10px] text-surface-600">
                      Preferences are saved on this device. Atlas targets WCAG 2.1 AA compliance.
                    </p>
                  </div>
                )}

                {/* About */}
                {active === 'about' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-lg font-semibold text-white">About</h2>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-200/30">
                      <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow">
                        <span className="text-white font-bold text-xl">D</span>
                      </div>
                      <div>
                        <p className="font-display text-base font-bold text-white">Atlas</p>
                        <p className="text-xs text-surface-600">Version 1.0.0 (Build 2025.07.30)</p>
                      </div>
                    </div>
                    <SettingRow label="Terms of Service" actionLabel="View" />
                    <SettingRow label="Privacy Policy" actionLabel="View" />
                    <SettingRow label="Open Source Licenses" actionLabel="View" />
                    <SettingRow label="Help & Support" actionLabel="Contact" />
                    <SettingRow label="Rate Atlas" actionLabel="Rate" />
                    <div className="pt-4 border-t border-surface-300/20 text-center">
                      <p className="text-[10px] text-surface-600">
                        Made with ❤️ for Indian students · CBSE & CISCE · Class 1-12
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingRow({ label, value, actionLabel }: { label: string; value?: string; actionLabel?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-surface-300/10">
      <div>
        <p className="text-sm text-white">{label}</p>
        {value && <p className="text-xs text-surface-600 mt-0.5">{value}</p>
        }
      </div>
      {actionLabel && (
        <button className="text-xs text-brand-300 hover:text-brand-200 transition-colors">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

function ToggleRow({
  icon: Icon, label, description, value, onChange,
}: {
  icon: typeof Bell; label: string; description: string; value: boolean; onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-surface-300/10">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-surface-600" />
        <div>
          <p className="text-sm text-white">{label}</p>
          <p className="text-xs text-surface-600 mt-0.5">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-all ${
          value ? 'bg-brand-500/60' : 'bg-surface-300/40'
        }`}
      >
        <motion.div
          animate={{ x: value ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute top-1 w-4 h-4 rounded-full ${
            value ? 'bg-white' : 'bg-surface-600'
          }`}
        />
      </button>
    </div>
  )
}
