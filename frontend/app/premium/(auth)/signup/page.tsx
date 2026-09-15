'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, GraduationCap, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore, type UserRole } from '@/stores/authStore'
import {
  MagneticButton, Spotlight, StaggerContainer, StaggerItem,
} from '@/components/premium'

export default function PremiumSignupPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<UserRole>('student')
  const [board, setBoard] = useState<'CBSE' | 'CISCE'>('CBSE')
  const [classLevel, setClassLevel] = useState(10)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    try {
      await signup({ name, email, password, role, board, classLevel })
      router.push('/premium/dashboard')
    } catch {
      setError('Signup failed. Please try again.')
    }
  }

  return (
    <div>
      <StaggerContainer stagger={0.08}>
        <StaggerItem>
          <div className="mb-6">
            <h2 className="font-display text-3xl font-bold text-white">Create your account</h2>
            <p className="text-surface-600 text-sm mt-2">Start learning smarter — it&apos;s free to begin</p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {([
              { value: 'student', label: 'Student', icon: GraduationCap },
              { value: 'teacher', label: 'Teacher', icon: BookOpen },
              { value: 'parent', label: 'Parent', icon: User },
            ] as const).map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                  role === r.value
                    ? 'bg-brand-500/15 border-brand-500/40 text-brand-300'
                    : 'glass border-surface-300/30 text-surface-600 hover:text-white'
                }`}
              >
                <r.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{r.label}</span>
              </button>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-surface-700 mb-2 block">Full Name</label>
              <Spotlight className="relative rounded-xl" size={200}>
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600 z-10" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="input-field pl-11"
                />
              </Spotlight>
            </div>

            <div>
              <label className="text-xs font-medium text-surface-700 mb-2 block">Email Address</label>
              <Spotlight className="relative rounded-xl" size={200}>
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600 z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                />
              </Spotlight>
            </div>

            <div>
              <label className="text-xs font-medium text-surface-700 mb-2 block">Password</label>
              <Spotlight className="relative rounded-xl" size={200}>
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600 z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-600 hover:text-white transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </Spotlight>
            </div>

            {role === 'student' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-surface-700 mb-2 block">Board</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['CBSE', 'CISCE'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBoard(b)}
                        className={`py-2.5 rounded-lg text-xs font-medium border transition-all ${
                          board === b ? 'bg-brand-500/15 border-brand-500/40 text-brand-300' : 'glass border-surface-300/30 text-surface-600'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-700 mb-2 block">Class</label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(Number(e.target.value))}
                    className="input-field text-sm"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                      <option key={c} value={c} className="bg-surface-100">Class {c}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <MagneticButton strength={0.3}>
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </MagneticButton>
          </form>
        </StaggerItem>

        <StaggerItem>
          <p className="text-center text-sm text-surface-600 mt-6">
            Already have an account?{' '}
            <Link href="/premium/login" className="text-brand-300 hover:text-brand-200 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}
