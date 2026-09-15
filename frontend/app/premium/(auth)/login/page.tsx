'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import {
  MagneticButton, TiltCard, GlowCard, Spotlight,
  StaggerContainer, StaggerItem,
} from '@/components/premium'

export default function PremiumLoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    try {
      await login(email, password)
      router.push('/premium/dashboard')
    } catch {
      setError('Invalid email or password. Try again.')
    }
  }

  return (
    <div>
      <StaggerContainer stagger={0.1}>
        <StaggerItem>
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-surface-600 text-sm mt-2">Sign in to continue your learning journey</p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  autoComplete="email"
                  autoFocus
                />
              </Spotlight>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-surface-700">Password</label>
                <Link href="/forgot-password" className="text-xs text-brand-300 hover:text-brand-200 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Spotlight className="relative rounded-xl" size={200}>
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600 z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  autoComplete="current-password"
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
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </MagneticButton>
          </form>
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-surface-300/40" />
            <span className="text-xs text-surface-600">or</span>
            <div className="flex-1 h-px bg-surface-300/40" />
          </div>
        </StaggerItem>

        <StaggerItem>
          <MagneticButton strength={0.2}>
            <button
              onClick={() => {
                setEmail('demo@dreamapp.in')
                setPassword('demo123')
                setTimeout(() => {
                  useAuthStore.setState({
                    user: { id: 'demo', name: 'Demo Student', email: 'demo@dreamapp.in', role: 'student', board: 'CBSE', classLevel: 10 },
                    token: 'demo-token',
                    isAuthenticated: true,
                  })
                  router.push('/premium/dashboard')
                }, 300)
              }}
              className="btn-secondary w-full"
            >
              Try Demo Account
            </button>
          </MagneticButton>
        </StaggerItem>

        <StaggerItem>
          <p className="text-center text-sm text-surface-600 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/premium/signup" className="text-brand-300 hover:text-brand-200 font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}
