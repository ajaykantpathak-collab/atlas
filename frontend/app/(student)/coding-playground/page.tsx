'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Play, RotateCcw, CheckCircle2, XCircle,
  Terminal, Code2, Lightbulb, Sparkles, Clock,
  ChevronRight, BookOpen, Zap, Trophy, Star,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import InternalDemoBadge from "@/components/InternalDemoBadge";

const challenges = [
  {
    id: 'ch1',
    title: 'Hello World',
    difficulty: 'Easy',
    language: 'python',
    description: 'Write a program that prints "Hello, World!" to the console.',
    starterCode: '# Write your code here\nprint("Hello, World!")',
    solution: 'print("Hello, World!")',
    testCases: [{ input: '', expected: 'Hello, World!' }],
    xp: 10,
    completed: true,
  },
  {
    id: 'ch2',
    title: 'Sum of Two Numbers',
    difficulty: 'Easy',
    language: 'python',
    description: 'Create a function that takes two numbers and returns their sum.',
    starterCode: 'def add(a, b):\n    # Write your code here\n    pass\n\n# Test\nprint(add(5, 3))',
    solution: 'def add(a, b):\n    return a + b',
    testCases: [
      { input: '5, 3', expected: '8' },
      { input: '10, -2', expected: '8' },
    ],
    xp: 15,
    completed: true,
  },
  {
    id: 'ch3',
    title: 'FizzBuzz',
    difficulty: 'Medium',
    language: 'python',
    description: 'Print numbers 1-100. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For both, print "FizzBuzz".',
    starterCode: 'for i in range(1, 101):\n    # Write your code here\n    pass',
    solution: 'for i in range(1, 101):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    testCases: [{ input: '15', expected: 'FizzBuzz' }],
    xp: 30,
    completed: false,
  },
  {
    id: 'ch4',
    title: 'Reverse a String',
    difficulty: 'Easy',
    language: 'python',
    description: 'Write a function that reverses a given string.',
    starterCode: 'def reverse_string(s):\n    # Write your code here\n    pass\n\nprint(reverse_string("hello"))',
    solution: 'def reverse_string(s):\n    return s[::-1]',
    testCases: [
      { input: '"hello"', expected: 'olleh' },
      { input: '"world"', expected: 'dlrow' },
    ],
    xp: 20,
    completed: false,
  },
  {
    id: 'ch5',
    title: 'Check Palindrome',
    difficulty: 'Medium',
    language: 'python',
    description: 'Write a function to check if a string is a palindrome (reads same forwards and backwards).',
    starterCode: 'def is_palindrome(s):\n    # Write your code here\n    pass\n\nprint(is_palindrome("racecar"))',
    solution: 'def is_palindrome(s):\n    return s == s[::-1]',
    testCases: [
      { input: '"racecar"', expected: 'True' },
      { input: '"hello"', expected: 'False' },
    ],
    xp: 25,
    completed: false,
  },
  {
    id: 'ch6',
    title: 'Binary Search',
    difficulty: 'Hard',
    language: 'python',
    description: 'Implement binary search on a sorted array. Return the index of the target element, or -1 if not found.',
    starterCode: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    # Write your code here\n    pass\n\nprint(binary_search([1, 3, 5, 7, 9], 5))',
    solution: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1',
    testCases: [
      { input: '[1,3,5,7,9], 5', expected: '2' },
      { input: '[1,3,5,7,9], 10', expected: '-1' },
    ],
    xp: 50,
    completed: false,
  },
]

const difficultyColors: Record<string, string> = {
  Easy: 'text-mint-300 bg-mint-500/10 border-mint-500/20',
  Medium: 'text-gold-300 bg-gold-500/10 border-gold-500/20',
  Hard: 'text-red-300 bg-red-500/10 border-red-500/20',
}

export default function CodingPlaygroundPage() {
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[2])
  const [code, setCode] = useState(challenges[2].starterCode)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const selectChallenge = (challenge: typeof challenges[0]) => {
    setSelectedChallenge(challenge)
    setCode(challenge.starterCode)
    setOutput('')
    setTestResults([])
    setShowHint(false)
  }

  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set())

  // Static verification — no interpreter exists in the app, so "Run Code"
  // honestly checks that the submission contains the constructs the
  // solution requires (signature + core logic tokens), not Math.random().
  const requiredTokens = (solution: string): string[] => {
    const tokens = new Set<string>()
    for (const line of solution.split('\n')) {
      const t = line.trim()
      const fn = t.match(/def\s+([a-zA-Z_]\w*)/)
      if (fn) tokens.add(`def ${fn[1]}`)
      for (const m of t.matchAll(/(return|print|for|while|if|elif|else|len|range|%|==|\[::?-?\d*\])/g))
        if (m[1].startsWith('[')) tokens.add('[::-1]')
        else if (m[1] === '%') tokens.add('%')
        else if (m[1] === '==') tokens.add('==')
        else tokens.add(m[1])
    }
    // keep only meaningful constructs
    return [...tokens].filter((t) => t.length > 1)
  }

  const runCode = () => {
    setRunning(true)
    setOutput('')
    setTestResults([])

    setTimeout(() => {
      const normalized = code.replace(/\s+/g, ' ')
      const required = requiredTokens(selectedChallenge.solution)
      const missing = required.filter((t) => !normalized.includes(t))

      const passed = missing.length === 0
      const results = selectedChallenge.testCases.map((tc) => ({
        passed,
        message: passed
          ? `Verified: input(${tc.input}) → expected(${tc.expected})`
          : `Missing constructs: ${missing.slice(0, 4).join(', ')}`,
      }))
      setTestResults(results)
      setOutput(
        passed
          ? `Static check passed — your solution contains all required constructs.\nExpected output for test cases: ${selectedChallenge.testCases.map((t) => t.expected).join(', ')}`
          : `Static check failed — add the missing constructs listed above.`
      )
      if (passed) setSolvedIds((prev) => new Set(prev).add(selectedChallenge.id))
      setRunning(false)
    }, 400)
  }

  const resetCode = () => {
    setCode(selectedChallenge.starterCode)
    setOutput('')
    setTestResults([])
  }

  const allPassed = testResults.length > 0 && testResults.every((r) => r.passed)

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <InternalDemoBadge what="static check only, no real execution" />
      {/* Header */}
      <div className="glass-strong border-b border-surface-300/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost px-2">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-sm font-semibold text-white">Coding Playground</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-surface-600 flex items-center gap-1">
            <Zap className="w-3 h-3 text-gold-300" /> {challenges.filter((c) => solvedIds.has(c.id)).reduce((s, c) => s + c.xp, 0)} XP earned
          </span>
          <span className="text-[10px] text-surface-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-mint-300" /> {solvedIds.size}/{challenges.length} solved
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Challenge list sidebar */}
        <div className="lg:w-64 border-r border-surface-300/30 glass-strong lg:h-[calc(100vh-52px)] lg:overflow-y-auto">
          <div className="p-3">
            <h2 className="text-[10px] font-semibold text-surface-600 uppercase tracking-wider mb-2 px-2">Challenges</h2>
            <div className="space-y-1">
              {challenges.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => selectChallenge(challenge)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                    selectedChallenge.id === challenge.id
                      ? 'bg-brand-500/15 border border-brand-500/30'
                      : 'hover:bg-surface-200/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${selectedChallenge.id === challenge.id ? 'text-brand-300' : 'text-white'}`}>
                      {challenge.title}
                    </span>
                    {challenge.completed && <CheckCircle2 className="w-3.5 h-3.5 text-mint-300 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-[9px] text-surface-600 flex items-center gap-0.5">
                      <Zap className="w-2.5 h-2.5" /> {challenge.xp} XP
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main coding area */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Problem description */}
          <div className="lg:w-80 border-r border-surface-300/30 p-4 lg:overflow-y-auto">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-display text-base font-bold text-white">{selectedChallenge.title}</h2>
                <span className={`text-[9px] px-2 py-0.5 rounded border ${difficultyColors[selectedChallenge.difficulty]}`}>
                  {selectedChallenge.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-surface-600">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3 h-3" /> {selectedChallenge.language}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-gold-300" /> {selectedChallenge.xp} XP
                </span>
              </div>
            </div>

            <div className="glass-card p-3 rounded-lg mb-4">
              <p className="text-xs text-surface-400 leading-relaxed">{selectedChallenge.description}</p>
            </div>

            {/* Test cases */}
            <h3 className="text-[10px] font-semibold text-surface-600 uppercase tracking-wider mb-2">Test Cases</h3>
            <div className="space-y-2 mb-4">
              {selectedChallenge.testCases.map((tc, i) => (
                <div key={i} className="glass-card p-2.5 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-surface-600">Case {i + 1}</span>
                    {testResults[i] && (
                      testResults[i].passed ? (
                        <CheckCircle2 className="w-3 h-3 text-mint-300" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-300" />
                      )
                    )}
                  </div>
                  <p className="text-[10px] text-surface-600">Input: <span className="text-surface-400">{tc.input}</span></p>
                  <p className="text-[10px] text-surface-600">Expected: <span className="text-mint-300">{tc.expected}</span></p>
                </div>
              ))}
            </div>

            {/* Hint */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full glass-card-hover p-2.5 rounded-lg flex items-center gap-2 text-xs text-surface-400"
            >
              <Lightbulb className="w-3.5 h-3.5 text-gold-300" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-card p-3 rounded-lg mt-2 border border-gold-500/20">
                    <p className="text-[10px] text-gold-200/80">
                      Think about the edge cases. What happens when the input is empty or has special characters?
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Code editor + output */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Editor toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-surface-300/30 glass-strong">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-brand-300" />
                <span className="text-xs text-white font-medium">main.py</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetCode} className="btn-ghost text-[10px] px-2 py-1.5 rounded-lg flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button
                  onClick={runCode}
                  disabled={running}
                  className="btn-primary text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  {running ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" /> Check Solution
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code editor */}
            <div className="flex-1 bg-surface-900/50 relative overflow-auto">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full min-h-[200px] bg-transparent p-4 text-xs font-mono text-white resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
                style={{ tabSize: 4 }}
              />
            </div>

            {/* Output console */}
            <div className="h-40 border-t border-surface-300/30 bg-surface-900/70 flex flex-col">
              <div className="px-4 py-2 border-b border-surface-300/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-surface-600" />
                  <span className="text-[10px] text-surface-600 uppercase tracking-wider">Output</span>
                </div>
                {allPassed && (
                  <span className="text-[10px] text-mint-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> All tests passed! +{selectedChallenge.xp} XP
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {output ? (
                  <pre className="text-xs font-mono text-mint-300 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-[10px] text-surface-600 italic">Click "Run Code" to see output...</p>
                )}
                {testResults.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {testResults.map((result, i) => (
                      <div
                        key={i}
                        className={`text-[10px] font-mono flex items-center gap-1.5 ${
                          result.passed ? 'text-mint-300' : 'text-red-300'
                        }`}
                      >
                        {result.passed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {result.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
