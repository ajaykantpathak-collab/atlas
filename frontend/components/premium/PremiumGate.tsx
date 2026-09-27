'use client'

/**
 * PremiumGate — wraps premium-only features. Free users see an upgrade
 * card; premium users see the feature. Reads `user.is_premium` off the
 * auth store (the DB column exists — /me returns it; login/signup flow it
 * through `setUser` unchanged).
 *
 * Usage:
 *   <PremiumGate feature="exam">…exam sim…</PremiumGate>
 *   <PremiumGate feature="tutor" soft>…tutor…</PremiumGate>  // soft = preview + upsell
 */
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'

const FEATURE_LABELS: Record<string, string> = {
    exam: 'Exam Simulator',
    tutor: 'Full AI Tutor',
    grading: 'Answer-sheet grading',
    offline: 'Offline mode',
    unlimited: 'Unlimited lessons',
    languages: 'All languages',
}

interface PremiumGateProps {
    feature: keyof typeof FEATURE_LABELS | string
    children: ReactNode
    /** soft=true shows a preview card with upsell instead of a hard lock */
    soft?: boolean
    /** custom fallback; defaults to the upgrade card */
    fallback?: ReactNode
}

export function PremiumGate({ feature, children, soft = false, fallback }: PremiumGateProps) {
    const user = useAuthStore((s) => s.user)
    const isPremium = !!user?.is_premium

    if (isPremium) return <>{children}</>

    const label = FEATURE_LABELS[feature as string] ?? feature

    if (soft && fallback === undefined) {
        // soft gate — show the feature teaser with an upsell overlay
        return (
            <div className="relative">
                <div className="pointer-events-none select-none opacity-40" aria-hidden>
                    {children}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-surface-900/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-2xl p-6 text-center max-w-xs mx-4"
                    >
                        <Sparkles className="w-8 h-8 text-brand-300 mx-auto mb-3" />
                        <h3 className="font-display text-lg font-bold text-white mb-1">{label}</h3>
                        <p className="text-xs text-surface-600 mb-4">Premium feature — upgrade to unlock</p>
                        <Link href="/premium" className="btn-primary text-sm inline-flex items-center gap-1">
                            Go Premium <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        )
    }

    if (fallback) return <>{fallback}</>

    // hard gate — a clean lock card
    return (
        <div className="flex items-center justify-center min-h-[40vh] p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-8 text-center max-w-sm"
            >
                <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-7 h-7 text-brand-300" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-1">{label}</h3>
                <p className="text-sm text-surface-600 mb-5">
                    This is a Premium feature. Upgrade for ₹299/month to unlock it.
                </p>
                <Link href="/premium" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                    Go Premium <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-surface-700 mt-4">Free plan: 10 lessons/day, basic tutor, practice, progress</p>
            </motion.div>
        </div>
    )
}

/** Convenience hook — is the current user premium? */
export function useIsPremium(): boolean {
    return !!useAuthStore((s) => s.user)?.is_premium
}

export default PremiumGate
