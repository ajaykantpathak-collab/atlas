'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, User, Bell, Globe, Shield, Palette,
  Download, LogOut, ChevronRight, Check, Moon, Sun,
  Volume2, Vibrate, Smartphone, Wifi, Languages,
  Eye, Accessibility, HelpCircle, Trash2, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import {
  CustomCursor, TiltCard, GlowCard, BorderBeam,
  StaggerContainer, StaggerItem, Spotlight,
} from '@/components/premium'

type SettingSection = 'account' | 'notifications' | 'appearance' | 'language' | 'privacy' | 'accessibility' | 'about'

const sections: { id: SettingSection; label: string; icon: typeof User; color: string }[] = [
  { id: 'account', label: 'Account', icon: User, color: 'text-brand-300' },
  { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-gold-300' },
  { id: 'appearance', label: 'Appearance', icon: Palette, color: 'text-accent-300' },
  { id: 'language', label: 'Language & Region', icon: Globe, color: 'text-mint-300' },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield, color: 'text-red-300' },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility, color: 'text-brand-300' },
  { id: 'about', label: 'About', icon: HelpCircle, color: 'text-surface-600' },
]

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-brand-500' : 'bg-surface-300/50'}`}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
        animate={{ left: enabled ? '20px' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

export default function PremiumSettingsPage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [active, setActive] = useState<SettingSection>('account')
  const [settings, setSettings] = useState({
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
  })

  function toggle(key: keyof typeof settings) {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] })
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/premium/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <StaggerContainer stagger={0.08}>
          <div className="grid lg:grid-cols-[200px_1fr] gap-6">
            {/* Section nav */}
            <StaggerItem>
              <div className="glass-card rounded-2xl p-3 lg:sticky lg:top-20">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActive(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        active === section.id
                          ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                          : 'text-surface-600 hover:bg-surface-200/50 hover:text-white border border-transparent'
                      }`}
                    >
                      <section.icon className={`w-4 h-4 ${active === section.id ? section.color : ''}`} />
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </StaggerItem>

            {/* Section content */}
            <StaggerItem>
              <BorderBeam className="glass-card rounded-2xl p-6" duration={6}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {active === 'account' && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold text-white mb-4">Account</h2>
                        <div className="flex items-center gap-4 p-4 rounded-xl glass">
                          <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-xl shadow-glow">
                            {user?.name?.[0] || 'A'}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{user?.name || 'Aarav'}</div>
                            <div className="text-xs text-surface-600">{user?.email || 'aarav@example.com'}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: 'Name', value: user?.name || 'Aarav' },
                            { label: 'Email', value: user?.email || 'aarav@example.com' },
                            { label: 'Board', value: settings.board },
                            { label: 'Class', value: 'Class 10' },
                          ].map((field) => (
                            <div key={field.label} className="flex items-center justify-between p-3 rounded-lg glass">
                              <span className="text-xs text-surface-600">{field.label}</span>
                              <span className="text-sm text-white">{field.value}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => { logout(); router.push('/') }}
                          className="btn-secondary w-full text-xs text-red-300 hover:text-red-200"
                        >
                          <LogOut className="w-3 h-3" />
                          Sign Out
                        </button>
                      </div>
                    )}

                    {active === 'notifications' && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold text-white mb-4">Notifications</h2>
                        {[
                          { key: 'pushNotifications' as const, label: 'Push Notifications', desc: 'Receive push notifications on this device' },
                          { key: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Receive updates via email' },
                          { key: 'achievementAlerts' as const, label: 'Achievement Alerts', desc: 'Get notified when you unlock achievements' },
                          { key: 'streakReminders' as const, label: 'Streak Reminders', desc: 'Daily reminders to keep your streak alive' },
                          { key: 'examReminders' as const, label: 'Exam Reminders', desc: 'Notifications before scheduled exams' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-3 rounded-lg glass">
                            <div>
                              <div className="text-sm text-white">{item.label}</div>
                              <div className="text-xs text-surface-600">{item.desc}</div>
                            </div>
                            <Toggle enabled={settings[item.key]} onChange={() => toggle(item.key)} />
                          </div>
                        ))}
                      </div>
                    )}

                    {active === 'appearance' && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold text-white mb-4">Appearance</h2>
                        {[
                          { key: 'darkMode' as const, label: 'Dark Mode', desc: 'Use dark theme' },
                          { key: 'reducedMotion' as const, label: 'Reduced Motion', desc: 'Minimize animations and transitions' },
                          { key: 'soundEffects' as const, label: 'Sound Effects', desc: 'Play sounds for interactions' },
                          { key: 'hapticFeedback' as const, label: 'Haptic Feedback', desc: 'Vibrate on interactions (mobile)' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-3 rounded-lg glass">
                            <div>
                              <div className="text-sm text-white">{item.label}</div>
                              <div className="text-xs text-surface-600">{item.desc}</div>
                            </div>
                            <Toggle enabled={settings[item.key]} onChange={() => toggle(item.key)} />
                          </div>
                        ))}
                      </div>
                    )}

                    {active === 'language' && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold text-white mb-4">Language & Region</h2>
                        <div className="space-y-2">
                          {['English', 'Hindi', 'Bilingual (EN + HI)'].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setSettings({ ...settings, language: lang })}
                              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                                settings.language === lang ? 'glass border border-brand-500/30' : 'glass hover:bg-surface-200/50'
                              }`}
                            >
                              <span className="text-sm text-white">{lang}</span>
                              {settings.language === lang && <Check className="w-4 h-4 text-brand-300" />}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="p-3 rounded-lg glass">
                            <div className="text-xs text-surface-600 mb-1">Region</div>
                            <div className="text-sm text-white">{settings.region}</div>
                          </div>
                          <div className="p-3 rounded-lg glass">
                            <div className="text-xs text-surface-600 mb-1">Board</div>
                            <div className="text-sm text-white">{settings.board}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {active === 'privacy' && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold text-white mb-4">Privacy & Security</h2>
                        {[
                          { key: 'autoDownload' as const, label: 'Auto-Download Content', desc: 'Automatically download new lessons' },
                          { key: 'dataSaver' as const, label: 'Data Saver Mode', desc: 'Reduce data usage on cellular networks' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-3 rounded-lg glass">
                            <div>
                              <div className="text-sm text-white">{item.label}</div>
                              <div className="text-xs text-surface-600">{item.desc}</div>
                            </div>
                            <Toggle enabled={settings[item.key]} onChange={() => toggle(item.key)} />
                          </div>
                        ))}
                        <button className="btn-secondary w-full text-xs text-red-300">
                          <Trash2 className="w-3 h-3" />
                          Clear Cache
                        </button>
                      </div>
                    )}

                    {active === 'accessibility' && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold text-white mb-4">Accessibility</h2>
                        {[
                          { key: 'highContrast' as const, label: 'High Contrast', desc: 'Increase visual contrast' },
                          { key: 'largeText' as const, label: 'Large Text', desc: 'Increase font size throughout the app' },
                          { key: 'screenReader' as const, label: 'Screen Reader', desc: 'Optimize for screen readers' },
                          { key: 'reducedMotion' as const, label: 'Reduced Motion', desc: 'Minimize animations' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-3 rounded-lg glass">
                            <div>
                              <div className="text-sm text-white">{item.label}</div>
                              <div className="text-xs text-surface-600">{item.desc}</div>
                            </div>
                            <Toggle enabled={settings[item.key]} onChange={() => toggle(item.key)} />
                          </div>
                        ))}
                      </div>
                    )}

                    {active === 'about' && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold text-white mb-4">About</h2>
                        <div className="space-y-2">
                          {[
                            { label: 'App Name', value: 'Prism' },
                            { label: 'Version', value: '2.0.0 Premium' },
                            { label: 'Build', value: '2025.07.30' },
                            { label: 'Board Support', value: 'CBSE + CISCE' },
                            { label: 'Class Range', value: 'Class 1-12' },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg glass">
                              <span className="text-xs text-surface-600">{item.label}</span>
                              <span className="text-sm text-white">{item.value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-surface-600 text-center mt-4">
                          AI-Powered Learning for Bharat
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </BorderBeam>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </div>
  )
}
