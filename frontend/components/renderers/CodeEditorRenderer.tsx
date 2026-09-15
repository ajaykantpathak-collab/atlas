'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Code2, Play, RotateCcw, Terminal } from 'lucide-react'

export interface CodeEditorRendererProps {
  title?: string
  language?: string
  initialCode?: string
  expectedOutput?: string
  explanation?: string
  // Line-by-line execution steps
  executionSteps?: {
    line: number
    variables?: { name: string; value: string }[]
    output?: string
    note?: string
  }[]
}

export function CodeEditorRenderer({
  title,
  language = 'python',
  initialCode = '',
  expectedOutput = '',
  explanation,
  executionSteps = [],
}: CodeEditorRendererProps) {
  const [code, setCode] = useState(initialCode)
  const [currentStep, setCurrentStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [output, setOutput] = useState('')

  const lines = code.split('\n')

  const runStepByStep = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    setPlaying(true)
    setCurrentStep(0)
    setOutput('')

    let stepIdx = 0
    const interval = setInterval(() => {
      if (stepIdx >= executionSteps.length) {
        clearInterval(interval)
        setPlaying(false)
        setOutput(expectedOutput)
        return
      }
      setCurrentStep(executionSteps[stepIdx].line - 1)
      if (executionSteps[stepIdx].output) {
        setOutput(prev => prev + executionSteps[stepIdx].output + '\n')
      }
      stepIdx++
    }, 1200)

    // Store interval to clear on unmount
    return () => clearInterval(interval)
  }

  const reset = () => {
    setPlaying(false)
    setCurrentStep(-1)
    setOutput('')
  }

  return (
    <div className="w-full">
      <div className="glass-card rounded-2xl p-6">
        {title && (
          <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-brand-300" />
            {title}
          </h3>
        )}

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Code editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-surface-600 font-mono">{language}</span>
              <div className="flex gap-2">
                <button
                  onClick={runStepByStep}
                  className="px-3 py-1.5 rounded-lg bg-brand-gradient text-white text-xs font-medium flex items-center gap-1.5 hover:scale-105 transition-transform"
                >
                  <Play className="w-3 h-3" />
                  {playing ? 'Pause' : 'Step Through'}
                </button>
                <button
                  onClick={reset}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-surface-300/30 font-mono text-sm" style={{ background: '#0d0a14' }}>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`flex transition-colors ${
                    currentStep === i ? 'bg-brand-500/20 border-l-2 border-brand-400' : ''
                  }`}
                >
                  <span className="w-10 text-right pr-3 py-1.5 text-surface-500 select-none border-r border-surface-300/20">
                    {i + 1}
                  </span>
                  <pre className="px-3 py-1.5 text-surface-700 whitespace-pre flex-1">{line || ' '}</pre>
                </div>
              ))}
            </div>
          </div>

          {/* Output + variable inspector */}
          <div className="space-y-4">
            {/* Variable inspector */}
            <div>
              <span className="text-xs text-surface-600 uppercase tracking-wider mb-2 block">Variables</span>
              <div className="glass-card rounded-xl p-3 min-h-[80px]">
                {currentStep >= 0 && executionSteps[currentStep]?.variables ? (
                  executionSteps[currentStep].variables.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs font-mono mb-1"
                    >
                      <span className="text-brand-300">{v.name}</span>
                      <span className="text-surface-500">=</span>
                      <span className="text-mint-300">{v.value}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-xs text-surface-500 italic">Run code to see variables</p>
                )}
              </div>
            </div>

            {/* Output console */}
            <div>
              <span className="text-xs text-surface-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> Output
              </span>
              <div className="glass-card rounded-xl p-3 min-h-[120px] font-mono text-xs text-mint-300">
                {output ? (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                ) : (
                  <span className="text-surface-500 italic">Console output appears here</span>
                )}
              </div>
            </div>

            {/* Step note */}
            {currentStep >= 0 && executionSteps[currentStep]?.note && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-xl p-3"
              >
                <p className="text-xs text-surface-600">
                  <span className="text-brand-300 font-medium">Line {currentStep + 1}: </span>
                  {executionSteps[currentStep].note}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {explanation && (
          <p className="text-sm text-surface-600 mt-4 leading-relaxed">{explanation}</p>
        )}
      </div>
    </div>
  )
}
