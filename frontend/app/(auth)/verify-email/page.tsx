'use client'

/**
 * /verify-email — the previous page faked verification (a 500ms timer
 * marked it "Verified!" regardless of the code, and the real /verify-otp
 * endpoint is phone-based, not email). Until an email-verification backend
 * exists, this page tells the truth: no email verification is needed —
 * sign in and go.
 */
import { motion } from 'framer-motion'
import { MailCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
        <MailCheck className="w-7 h-7 text-gold-300" />
      </div>
      <h2 className="font-display text-3xl font-bold text-white">No verification needed</h2>
      <p className="text-surface-600 text-sm mt-2 mb-8">
        Your account is ready — email verification isn&apos;t required on Atlas right now.
      </p>
      <Link href="/login" className="btn-primary w-full inline-flex items-center justify-center gap-2">
        Go to login
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}
