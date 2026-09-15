'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calculator, ArrowRight, CheckCircle2, XCircle, BookOpen } from 'lucide-react'

export interface LedgerEntry {
  id: string
  date: string
  particulars: string
  debit?: number
  credit?: number
}

export interface LedgerRendererProps {
  accountName: string
  entries: LedgerEntry[]
  description?: string
}

export function LedgerRenderer({ accountName, entries, description }: LedgerRendererProps) {
  const [showSolution, setShowSolution] = useState(false)

  const totalDebit = entries.reduce((sum, e) => sum + (e.debit || 0), 0)
  const totalCredit = entries.reduce((sum, e) => sum + (e.credit || 0), 0)
  const balanced = totalDebit === totalCredit

  return (
    <div className="w-full">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-mint-300" />
          <h3 className="font-display text-lg font-bold text-white">{accountName}</h3>
        </div>

        {description && (
          <p className="text-sm text-surface-600 mb-4 leading-relaxed">{description}</p>
        )}

        {/* T-Account */}
        <div className="grid grid-cols-2 gap-0 rounded-xl overflow-hidden border border-surface-300/30">
          {/* Debit side */}
          <div>
            <div className="bg-brand-500/15 px-4 py-2 border-b border-r border-surface-300/30">
              <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">Dr. — Debit</span>
            </div>
            <div className="divide-y divide-surface-300/20">
              {entries.filter(e => e.debit).map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2.5 flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-white font-medium">{entry.particulars}</p>
                    <p className="text-[10px] text-surface-500">{entry.date}</p>
                  </div>
                  <span className="text-sm font-mono text-mint-300">₹{entry.debit?.toLocaleString('en-IN')}</span>
                </motion.div>
              ))}
              <div className="px-4 py-2.5 flex justify-between items-center bg-surface-200/20">
                <span className="text-xs font-bold text-surface-700">Total</span>
                <span className="text-sm font-mono font-bold text-mint-300">₹{totalDebit.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Credit side */}
          <div>
            <div className="bg-accent-500/15 px-4 py-2 border-b border-surface-300/30">
              <span className="text-xs font-bold text-accent-300 uppercase tracking-wider">Cr. — Credit</span>
            </div>
            <div className="divide-y divide-surface-300/20">
              {entries.filter(e => e.credit).map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2.5 flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-white font-medium">{entry.particulars}</p>
                    <p className="text-[10px] text-surface-500">{entry.date}</p>
                  </div>
                  <span className="text-sm font-mono text-accent-300">₹{entry.credit?.toLocaleString('en-IN')}</span>
                </motion.div>
              ))}
              <div className="px-4 py-2.5 flex justify-between items-center bg-surface-200/20">
                <span className="text-xs font-bold text-surface-700">Total</span>
                <span className="text-sm font-mono font-bold text-accent-300">₹{totalCredit.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Balance check */}
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="w-full mt-4 py-3 rounded-xl bg-brand-gradient text-white text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
        >
          <BookOpen className="w-4 h-4" />
          {showSolution ? 'Hide' : 'Check'} Balance
        </button>

        {showSolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 rounded-xl glass-card"
          >
            <div className="flex items-center gap-2 mb-2">
              {balanced ? (
                <CheckCircle2 className="w-5 h-5 text-mint-300" />
              ) : (
                <XCircle className="w-5 h-5 text-accent-300" />
              )}
              <span className="text-sm font-bold text-white">
                {balanced ? 'Account is balanced!' : 'Account is not balanced'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-surface-600">
              <span>Debit Total: ₹{totalDebit.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-3 h-3" />
              <span>Credit Total: ₹{totalCredit.toLocaleString('en-IN')}</span>
              {!balanced && (
                <span className="text-gold-300">
                  Difference: ₹{Math.abs(totalDebit - totalCredit).toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
