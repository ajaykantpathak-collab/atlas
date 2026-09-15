'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MailCheck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [verified, setVerified] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendTimer])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`)
      next?.focus()
    }
    if (newCode.every((c) => c !== '')) {
      setTimeout(() => setVerified(true), 500)
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {!verified ? (
          <motion.div
            key="verify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                <MailCheck className="w-7 h-7 text-gold-300" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white">Verify your email</h2>
              <p className="text-surface-600 text-sm mt-2">
                We sent a 6-digit code to your email. Enter it below.
              </p>
            </div>

            <div className="flex gap-2 justify-center mb-6">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value.replace(/\D/g, ''))}
                  className="w-11 h-14 text-center text-xl font-bold rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold-500 focus:outline-none transition-colors"
                />
              ))}
            </div>

            <button className="btn-primary w-full" disabled={code.some((c) => !c)}>
              Verify Email
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center mt-6">
              {resendTimer > 0 ? (
                <p className="text-xs text-surface-600">
                  Resend code in {resendTimer}s
                </p>
              ) : (
                <button
                  onClick={() => setResendTimer(30)}
                  className="text-xs text-gold-300 hover:text-gold-200 font-medium"
                >
                  Resend code
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-mint-500/15 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="w-8 h-8 text-mint-300" />
            </motion.div>
            <h2 className="font-display text-3xl font-bold text-white">Email Verified!</h2>
            <p className="text-surface-600 text-sm mt-2 mb-8">
              Your account is ready. Let&apos;s start learning.
            </p>
            <Link href="/dashboard" className="btn-primary w-full">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-sm text-surface-600 mt-6">
        <Link href="/login" className="text-gold-300 hover:text-gold-200 font-medium">
          Back to login
        </Link>
      </p>
    </div>
  )
}
