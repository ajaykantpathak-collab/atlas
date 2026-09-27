'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, KeyRound, AlertCircle, Info } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your email address')
      return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        setError('Something went wrong — please try again')
        return
      }
      const body = await res.json()
      // demo delivery: no mailer is configured in this deployment, so the
      // API hands back the one-time token instead of pretending to email it
      setResetToken(
        body?.delivery === 'demo' && body?.reset_token ? body.reset_token : null,
      )
      setDone(true)
    } catch {
      setError('Network error — please try again')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="w-16 h-16 rounded-full bg-mint-500/15 border border-mint-500/30 flex items-center justify-center mx-auto mb-6"
        >
          <KeyRound className="w-8 h-8 text-mint-300" />
        </motion.div>

        <h2 className="font-display text-2xl font-bold text-white mb-3">Reset your password</h2>
        <p className="text-surface-600 text-sm mb-6 max-w-sm mx-auto">
          If an account exists for{' '}
          <span className="text-gold-300 font-medium">{email}</span>, a reset link
          was generated. The link expires in 30 minutes.
        </p>

        {resetToken ? (
          <div className="mb-6 max-w-sm mx-auto text-left rounded-xl bg-gold-500/10 border border-gold-500/30 px-4 py-3">
            <div className="flex items-start gap-2 text-gold-200 text-xs mb-3">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                Email delivery isn&apos;t configured in this deployment — no email
                was sent. Use this one-time link to set a new password:
              </span>
            </div>
            <Link
              href={`/reset-password?token=${encodeURIComponent(resetToken)}`}
              className="btn-primary w-full"
            >
              Set a new password
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : null}

        <Link href="/login" className="btn-secondary">
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-white">Reset password</h2>
        <p className="text-surface-600 text-sm mt-2">
          Enter your email and we&apos;ll generate a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs font-medium text-surface-700 mb-2 block">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-field pl-11"
              autoFocus
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? 'Generating…' : 'Generate Reset Link'}
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <p className="text-center text-sm text-surface-600 mt-6">
        Remember your password?{' '}
        <Link href="/login" className="text-gold-300 hover:text-gold-200 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
