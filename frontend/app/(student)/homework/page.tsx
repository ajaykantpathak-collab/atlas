'use client'

// ═══════════════════════════════════════════════════════════════
//  Homework Page — Student Assignment Tracker
//  Next.js 14 · TypeScript · Tailwind · Framer Motion · KaTeX
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock as FiClock, CheckCircle as FiCheckCircle, AlertCircle as FiAlertCircle, Send as FiSend, Save as FiSave, ArrowLeft as FiArrowLeft, RefreshCw as FiRefreshCw, X as FiX, Star as FiStar, BarChart2 as FiBarChart2, Wifi as FiWifi, WifiOff as FiWifiOff, ChevronRight as FiChevronRight } from 'lucide-react'
import renderMathInElement from 'katex/contrib/auto-render'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { getAuthToken } from "@/lib/api";

// ───────────────────────────────────────────────────────────────
//  Translations
// ───────────────────────────────────────────────────────────────
const translations = {
  en: {
    title: 'Homework',
    subtitle: 'Stay on track with your assignments',
    tabs: { pending: 'Pending', completed: 'Completed', all: 'All' },
    status: { pending: 'Pending', completed: 'Completed', overdue: 'Overdue' },
    dueDate: 'Due',
    dueTomorrow: 'Due tomorrow',
    dueToday: 'Due today',
    overdue: 'Overdue',
    questions: 'questions',
    points: 'pts',
    priority: { high: 'High', medium: 'Medium', low: 'Low' },
    startAssignment: 'Start Assignment',
    resumeAssignment: 'Resume Assignment',
    viewResults: 'View Results',
    question: 'Question',
    of: 'of',
    saveAndExit: 'Save & Exit',
    submit: 'Submit Answers',
    submitting: 'Submitting...',
    loading: 'Loading homework...',
    retry: 'Retry',
    noAssignments: 'No assignments found',
    backToList: 'Back to list',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct answer',
    scoreMessage: 'You scored',
    masteryMessage: 'Mastery',
    masteryLevel: { low: 'Keep practicing!', medium: 'Good effort!', high: 'Excellent!' },
    offlineCached: 'Available offline',
    offlineSaving: 'Saving offline...',
    savedOffline: 'Saved offline',
    queuedSubmission: 'Will submit when online',
    online: 'Online',
    connectionLost: 'Connection lost',
    reconnecting: 'Reconnecting...',
    mathPlaceholder: 'Type your answer using LaTeX...',
    textPlaceholder: 'Type your answer...',
    subjects: { maths: 'Mathematics', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology', english: 'English', history: 'History' },
    scoreFeedback: {
      perfect: 'Perfect score! Outstanding work! 🌟',
      great: 'Great job! Keep it up! 👏',
      good: 'Good effort! Review the mistakes. 👍',
      needsWork: "Keep practicing! You'll get better! 💪",
    },
    saveProgress: 'Progress saved',
    exitConfirm: 'Your progress has been saved',
  },
  hi: {
    title: 'होमवर्क',
    subtitle: 'अपने असाइनमेंट के साथ ट्रैक रहें',
    tabs: { pending: 'लंबित', completed: 'पूर्ण', all: 'सभी' },
    status: { pending: 'लंबित', completed: 'पूर्ण', overdue: 'देर से' },
    dueDate: 'समय सीमा',
    dueTomorrow: 'कल तक',
    dueToday: 'आज तक',
    overdue: 'देर हो गई',
    questions: 'प्रश्न',
    points: 'अंक',
    priority: { high: 'उच्च', medium: 'मध्यम', low: 'कम' },
    startAssignment: 'असाइनमेंट शुरू करें',
    resumeAssignment: 'असाइनमेंट फिर से शुरू करें',
    viewResults: 'परिणाम देखें',
    question: 'प्रश्न',
    of: 'का',
    saveAndExit: 'सहेजें और बाहर निकलें',
    submit: 'उत्तर प्रस्तुत करें',
    submitting: 'प्रस्तुत हो रहा है...',
    loading: 'होमवर्क लोड हो रहा है...',
    retry: 'पुनः प्रयास',
    noAssignments: 'कोई असाइनमेंट नहीं मिला',
    backToList: 'सूची पर वापस जाएं',
    correct: 'सही!',
    incorrect: 'गलत',
    yourAnswer: 'आपका उत्तर',
    correctAnswer: 'सही उत्तर',
    scoreMessage: 'आपका स्कोर',
    masteryMessage: 'प्रवीणता',
    masteryLevel: { low: 'अभ्यास जारी रखें!', medium: 'अच्छा प्रयास!', high: 'उत्कृष्ट!' },
    offlineCached: 'ऑफलाइन उपलब्ध',
    offlineSaving: 'ऑफलाइन सहेज रहे हैं...',
    savedOffline: 'ऑफलाइन सहेजा गया',
    queuedSubmission: 'ऑनलाइन होने पर प्रस्तुत होगा',
    online: 'ऑनलाइन',
    connectionLost: 'कनेक्शन टूट गया',
    reconnecting: 'फिर से कनेक्ट हो रहा है...',
    mathPlaceholder: 'LaTeX का उपयोग करके अपना उत्तर लिखें...',
    textPlaceholder: 'अपना उत्तर लिखें...',
    subjects: { maths: 'गणित', physics: 'भौतिकी', chemistry: 'रसायन विज्ञान', biology: 'जीव विज्ञान', english: 'अंग्रेजी', history: 'इतिहास' },
    scoreFeedback: {
      perfect: 'परफेक्ट स्कोर! उत्कृष्ट कार्य! 🌟',
      great: 'बहुत बढ़िया! जारी रखें! 👏',
      good: 'अच्छा प्रयास! गलतियों की समीक्षा करें. 👍',
      needsWork: 'अभ्यास जारी रखें! आप बेहतर करेंगे! 💪',
    },
    saveProgress: 'प्रगति सहेजी गई',
    exitConfirm: 'आपकी प्रगति सहेजी गई है',
  },
  hn: {
    title: 'होमवर्क',
    subtitle: 'अपने असाइनमेंट्स के साथ ट्रैक रहो',
    tabs: { pending: 'पेंडिंग', completed: 'कम्पलीटेड', all: 'ऑल' },
    status: { pending: 'पेंडिंग', completed: 'कम्पलीटेड', overdue: 'ओवरड्यू' },
    dueDate: 'ड्यू डेट',
    dueTomorrow: 'कल तक',
    dueToday: 'आज तक',
    overdue: 'डेर हो गई',
    questions: 'प्रश्न',
    points: 'pts',
    priority: { high: 'हाई', medium: 'मीडियम', low: 'लो' },
    startAssignment: 'असाइनमेंट शुरू करो',
    resumeAssignment: 'असाइनमेंट रिज्यूम करो',
    viewResults: 'रिजल्ट देखो',
    question: 'प्रश्न',
    of: 'ऑफ',
    saveAndExit: 'सेव एंड एक्सिट',
    submit: 'सबमिट करो',
    submitting: 'सबमिट हो रहा है...',
    loading: 'होमवर्क लोड हो रहा है...',
    retry: 'रीट्राई',
    noAssignments: 'कोई असाइनमेंट नहीं मिला',
    backToList: 'बैक लिस्ट पर जाओ',
    correct: 'सही है!',
    incorrect: 'गलत है',
    yourAnswer: 'तुम्हारा उत्तर',
    correctAnswer: 'सही उत्तर',
    correctAnswerLabel: 'सही उत्तर यह है',
    scoreMessage: 'तुम्हारा स्कोर',
    masteryMessage: 'मास्टरी',
    masteryLevel: { low: 'प्रैक्टिस जारी रखो!', medium: 'अच्छा प्रयास!', high: 'एक्सेलेंट!' },
    offlineCached: 'ऑफलाइन उपलब्ध',
    offlineSaving: 'ऑफलाइन सेव हो रहा है...',
    savedOffline: 'ऑफलाइन सेव हो गया',
    queuedSubmission: 'ऑनलाइन होने पर सबमिट होगा',
    online: 'ऑनलाइन',
    connectionLost: 'कनेक्शन टूट गया',
    reconnecting: 'रीकनेक्ट हो रहा है...',
    mathPlaceholder: 'LaTeX का उपयोग करके अपना उत्तर लिखें...',
    textPlaceholder: 'अपना उत्तर लिखें...',
    subjects: { maths: 'मैथ्स', physics: 'फिजिक्स', chemistry: 'केमिस्ट्री', biology: 'बायोलॉजी', english: 'इंग्लिश', history: 'हिस्ट्री' },
    scoreFeedback: {
      perfect: 'परफेक्ट स्कोर! बहुत बढ़िया! 🌟',
      great: 'ग्रेट जॉब! जारी रखो! 👏',
      good: 'अच्छा प्रयास! गलतियों की समीक्षा करो. 👍',
      needsWork: 'अभ्यास जारी रखो! तुम बेहतर करोगे! 💪',
    },
    saveProgress: 'प्रगति सेव हो गई',
    exitConfirm: 'तुम्हारी प्रगति सेव हो गई है',
  },
}

// ───────────────────────────────────────────────────────────────
//  Types
// ───────────────────────────────────────────────────────────────
type AnswerValue = string | string[]

type QuestionType = 'mcq' | 'math' | 'text'

interface Question {
  id: string
  type: QuestionType
  text: string
  latex?: string
  options?: string[]
  correctAnswer: string
  points: number
  explanation?: string
}

interface Assignment {
  id: string
  subject: keyof typeof translations.en.subjects
  topic: string
  dueDate: string
  status: 'pending' | 'completed' | 'overdue'
  priority: 'high' | 'medium' | 'low'
  questionCount: number
  questions: Question[]
  description?: string
  totalPoints: number
}

interface FeedbackResult {
  questionId: string
  isCorrect: boolean
  userAnswer: string
  correctAnswer: string
  pointsEarned: number
  explanation?: string
}

interface SubmissionResult {
  score: number
  totalPoints: number
  percentage: number
  mastery: number
  results: FeedbackResult[]
  feedbackKey: 'perfect' | 'great' | 'good' | 'needsWork'
}

type TabFilter = 'pending' | 'completed' | 'all'
type ViewMode = 'list' | 'detail'

type Language = keyof typeof translations

// ───────────────────────────────────────────────────────────────
//  Zustand Store
// ───────────────────────────────────────────────────────────────
interface HomeworkStore {
  viewMode: ViewMode
  selectedAssignmentId: string | null
  answers: Record<string, AnswerValue>
  hasUnsavedChanges: boolean
  isOnline: boolean
  submissionQueue: SubmissionResult[]
  lang: Language
  setViewMode: (mode: ViewMode) => void
  selectAssignment: (id: string | null) => void
  setAnswer: (questionId: string, value: AnswerValue) => void
  setHasUnsavedChanges: (val: boolean) => void
  setIsOnline: (val: boolean) => void
  setLang: (lang: Language) => void
  addToQueue: (result: SubmissionResult) => void
  clearQueue: () => void
  resetAssignment: (assignmentId: string) => void
}

const useHomeworkStore = create<HomeworkStore>()(
  subscribeWithSelector((set, get) => ({
    viewMode: 'list',
    selectedAssignmentId: null,
    answers: {},
    hasUnsavedChanges: false,
    isOnline: true,
    submissionQueue: [],
    lang: 'en',

    setViewMode: (mode) => set({ viewMode: mode }),
    selectAssignment: (id) => set({ selectedAssignmentId: id, viewMode: id ? 'detail' : 'list', answers: {} }),
    setAnswer: (questionId, value) =>
      set((state) => ({
        answers: { ...state.answers, [questionId]: value },
        hasUnsavedChanges: true,
      })),
    setHasUnsavedChanges: (val) => set({ hasUnsavedChanges: val }),
    setIsOnline: (val) => set({ isOnline: val }),
    setLang: (lang) => set({ lang }),
    addToQueue: (result) => set((state) => ({ submissionQueue: [...state.submissionQueue, result] })),
    clearQueue: () => set({ submissionQueue: [] }),
    resetAssignment: (assignmentId) =>
      set((state) => {
        const newAnswers = { ...state.answers }
        delete newAnswers[assignmentId]
        return { answers: newAnswers, hasUnsavedChanges: false }
      }),
  }))
)

// ───────────────────────────────────────────────────────────────
//  Mock Data — Realistic Indian curriculum content
// ───────────────────────────────────────────────────────────────
const mockAssignments: Assignment[] = [
  {
    id: 'hw-001',
    subject: 'maths',
    topic: 'Quadratic Equations',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    priority: 'high',
    questionCount: 10,
    totalPoints: 40,
    description: 'Solve problems involving quadratic equations using factorisation, formula methods, and graphical interpretation.',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        text: 'The roots of the equation $x^2 - 5x + 6 = 0$ are:',
        options: ['2 and 3', '−2 and −3', '5 and 6', '−5 and −6'],
        correctAnswer: '2 and 3',
        points: 4,
        explanation: 'Using factorisation: $x^2 - 5x + 6 = (x-2)(x-3) = 0$, so $x = 2$ or $x = 3$.'
      },
      {
        id: 'q2',
        type: 'math',
        text: 'Solve for x: $2x^2 - 7x + 3 = 0$',
        correctAnswer: 'x = 3, x = 0.5',
        points: 5,
        explanation: 'Using quadratic formula: $x = \frac{7 \pm \sqrt{49 - 24}}{4} = \frac{7 \pm 5}{4}$' 
      },
      {
        id: 'q3',
        type: 'mcq',
        text: 'The discriminant $D = b^2 - 4ac$ determines:',
        options: [
          'The number of real roots',
          'The sum of roots',
          'The product of roots',
          'The vertex of parabola'
        ],
        correctAnswer: 'The number of real roots',
        points: 4,
        explanation: 'If $D > 0$: two real roots, $D = 0$: one real root, $D < 0$: no real roots.'
      },
      {
        id: 'q4',
        type: 'math',
        text: 'If $\alpha$ and $\beta$ are roots of $x^2 + px + q = 0$, find $\alpha^2 + \beta^2$:',
        correctAnswer: 'p^2 - 2q',
        points: 5,
        explanation: 'We know $\alpha + \beta = -p$ and $\alpha\beta = q$. So $\alpha^2 + \beta^2 = (\alpha+\beta)^2 - 2\alpha\beta = p^2 - 2q$.'
      },
      {
        id: 'q5',
        type: 'mcq',
        text: 'Which of the following is a quadratic equation?',
        options: [
          '$x^3 + 2x + 1 = 0$',
          '$3x^2 - 5x + 2 = 0$',
          '$x + 7 = 0$',
          '$x^4 - 1 = 0$'
        ],
        correctAnswer: '$3x^2 - 5x + 2 = 0$',
        points: 4,
        explanation: 'A quadratic equation has degree 2. The highest power of x is 2.'
      },
      {
        id: 'q6',
        type: 'text',
        text: 'Write the quadratic formula for finding roots of $ax^2 + bx + c = 0$.',
        correctAnswer: 'x = (-b ± √(b² - 4ac)) / 2a',
        points: 5,
        explanation: 'The quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$'
      },
      {
        id: 'q7',
        type: 'math',
        text: 'Find the nature of roots of $3x^2 + 4x + 1 = 0$ (state whether real/equal/imaginary):',
        correctAnswer: 'real and distinct',
        points: 5,
        explanation: '$D = 16 - 12 = 4 > 0$, so roots are real and distinct.'
      },
      {
        id: 'q8',
        type: 'mcq',
        text: 'Sum of the roots of $2x^2 - 8x + 3 = 0$ is:',
        options: ['4', '−4', '8', '1.5'],
        correctAnswer: '4',
        points: 4,
        explanation: 'Sum of roots = $−b/a = −(−8)/2 = 4$'
      },
      {
        id: 'q9',
        type: 'math',
        text: 'If one root of $kx^2 - 14x + 8 = 0$ is 2, find the value of k:',
        correctAnswer: 'k = 9',
        points: 5,
        explanation: 'Substituting $x = 2$: $k(4) - 28 + 8 = 0 \Rightarrow 4k = 20 \Rightarrow k = 5$'
      },
      {
        id: 'q10',
        type: 'mcq',
        text: 'For what value of k does $x^2 + kx + 9 = 0$ have equal roots?',
        options: ['±3', '±6', '±9', '±4.5'],
        correctAnswer: '±6',
        points: 4,
        explanation: 'For equal roots, $D = 0$: $k^2 - 36 = 0 \Rightarrow k = \pm6$'
      },
    ]
  },
  {
    id: 'hw-002',
    subject: 'physics',
    topic: 'Laws of Motion',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    priority: 'medium',
    questionCount: 5,
    totalPoints: 30,
    description: "Understand Newton's three laws of motion with practical examples from daily life.",
    questions: [
      {
        id: 'pq1',
        type: 'mcq',
        text: "Newton's First Law is also known as:",
        options: ['Law of Inertia', 'Law of Acceleration', 'Law of Action-Reaction', 'Law of Gravitation'],
        correctAnswer: 'Law of Inertia',
        points: 5,
        explanation: "Newton's First Law states that an object remains at rest or in uniform motion unless acted upon by an external force."
      },
      {
        id: 'pq2',
        type: 'math',
        text: 'A force of 10 N acts on a body of mass 2 kg. Find acceleration ($a = F/m$):',
        correctAnswer: '5 m/s²',
        points: 5,
        explanation: '$a = F/m = 10/2 = 5$ m/s²'
      },
      {
        id: 'pq3',
        type: 'mcq',
        text: 'The SI unit of force is:',
        options: ['Newton (N)', 'Joule (J)', 'Pascal (Pa)', 'Watt (W)'],
        correctAnswer: 'Newton (N)',
        points: 5,
        explanation: 'Force is measured in Newtons. $1 N = 1 kg \cdot m/s^2$'
      },
      {
        id: 'pq4',
        type: 'text',
        text: "State Newton's Third Law of Motion in your own words.",
        correctAnswer: 'For every action there is an equal and opposite reaction',
        points: 10,
        explanation: "Newton's Third Law: For every action, there is an equal and opposite reaction. Forces always occur in pairs."
      },
      {
        id: 'pq5',
        type: 'mcq',
        text: "Which of the following is an example of Newton's Third Law?",
        options: [
          'A book resting on a table',
          'Rocket propulsion',
          'Free fall of a stone',
          'Car moving at constant velocity'
        ],
        correctAnswer: 'Rocket propulsion',
        points: 5,
        explanation: 'Rocket pushes exhaust gases down (action), gases push rocket up (reaction).'
      },
    ]
  },
  {
    id: 'hw-003',
    subject: 'chemistry',
    topic: 'Atomic Structure',
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'overdue',
    priority: 'high',
    questionCount: 4,
    totalPoints: 25,
    description: 'Learn about subatomic particles, electron configuration, and the Bohr model of the atom.',
    questions: [
      {
        id: 'cq1',
        type: 'mcq',
        text: 'The atomic number of an element represents:',
        options: ['Number of protons', 'Number of neutrons', 'Number of electrons', 'Mass number'],
        correctAnswer: 'Number of protons',
        points: 5,
        explanation: 'Atomic number (Z) = number of protons = number of electrons in a neutral atom.'
      },
      {
        id: 'cq2',
        type: 'mcq',
        text: 'Who proposed the Bohr model of the atom?',
        options: ['Niels Bohr', 'Ernest Rutherford', 'J.J. Thomson', 'James Chadwick'],
        correctAnswer: 'Niels Bohr',
        points: 5,
        explanation: 'Niels Bohr proposed his model in 1913, with electrons orbiting in fixed energy levels.'
      },
      {
        id: 'cq3',
        type: 'math',
        text: 'For an element with mass number 23 and atomic number 11, find number of neutrons:',
        correctAnswer: '12',
        points: 5,
        explanation: 'Number of neutrons = Mass number − Atomic number = 23 − 11 = 12'
      },
      {
        id: 'cq4',
        type: 'text',
        text: 'Write the electronic configuration of Sodium (Na, Z=11).',
        correctAnswer: '2, 8, 1',
        points: 10,
        explanation: 'Sodium has 11 electrons: K shell = 2, L shell = 8, M shell = 1. Configuration: 2,8,1'
      },
    ]
  },
]

// ───────────────────────────────────────────────────────────────
//  API Helpers
// ───────────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

// ───────────────────────────────────────────────────────────────
//  Utility Functions
// ───────────────────────────────────────────────────────────────
function formatDueDate(dateStr: string, t: typeof translations.en): string {
  const now = new Date()
  const due = new Date(dateStr)
  const diffMs = due.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return t.status.overdue
  if (diffDays === 0) return t.dueToday
  if (diffDays === 1) return t.dueTomorrow
  return `${t.dueDate}: ${due.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
}

function getStatusColor(status: Assignment['status']): string {
  switch (status) {
    case 'completed': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
    case 'overdue': return 'text-red-700 bg-red-50 border-red-200'
    default: return 'text-amber-700 bg-amber-50 border-amber-200'
  }
}

function getStatusDot(status: Assignment['status']): string {
  switch (status) {
    case 'completed': return 'bg-emerald-500'
    case 'overdue': return 'bg-red-500'
    default: return 'bg-amber-500'
  }
}

function getPriorityBadge(priority: Assignment['priority'], t: typeof translations.en): string {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700'
    case 'medium': return 'bg-amber-100 text-amber-700'
    default: return 'bg-slate-100 text-slate-600'
  }
}

function getMasteryColor(mastery: number): string {
  if (mastery >= 80) return 'text-emerald-600'
  if (mastery >= 50) return 'text-amber-600'
  return 'text-red-500'
}

function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[∞∑∏∫√≈≠≤≥±×÷·^_]/g, '')
    .replace(/[(){}[\]]/g, '')
    .replace(/[^a-z0-9.,/\-+ ]/g, '')
    .trim()
}

function normalizeLaTeX(latex: string): string {
  return latex
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    .replace(/\\sqrt\{([^}]*)\}/g, 'sqrt($1)')
    .replace(/\\pm/g, '±')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\cdot/g, '·')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\\pi/g, 'π')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\sqrt\{([^}]*)\}/g, '√($1)')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\{([^}]*)\}/g, '$1')
    .replace(/\\/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function checkAnswer(
  userAnswer: string,
  correctAnswer: string,
  questionType: QuestionType
): boolean {
  const trimmed = userAnswer.trim()
  if (!trimmed) return false

  if (questionType === 'mcq') {
    return normalizeAnswer(trimmed) === normalizeAnswer(correctAnswer)
  }

  const normUser = normalizeLaTeX(trimmed)
  const normCorrect = normalizeLaTeX(correctAnswer)

  if (normUser === normCorrect) return true

  // Try numeric comparison
  const userNums = trimmed.match(/-?\d+\.?\d*/g)
  const correctNums = correctAnswer.match(/-?\d+\.?\d*/g)
  if (userNums && correctNums) {
    if (userNums.length === correctNums.length) {
      const allMatch = userNums.every((u, i) => Math.abs(parseFloat(u) - parseFloat(correctNums[i])) < 0.01)
      if (allMatch) return true
    }
  }

  // Partial match for multi-answer questions
  const userParts = normUser.split(',').map(s => s.trim())
  const correctParts = normCorrect.split(',').map(s => s.trim())
  if (userParts.length > 1 && correctParts.length > 1) {
    return userParts.every(u => correctParts.some(c => u === c))
  }

  return false
}

// ───────────────────────────────────────────────────────────────
//  Offline Storage Helpers
// ───────────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  ANSWERS: 'hw_answers',
  SUBMISSIONS: 'hw_submissions',
  QUEUE: 'hw_queue',
  LAST_SYNC: 'hw_last_sync',
}

function saveToStorage(key: string, data: unknown) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  } catch {
    // Storage full or unavailable
  }
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : fallback
    }
  } catch {
    // Corrupted data
  }
  return fallback
}

// ───────────────────────────────────────────────────────────────
//  Hooks
// ───────────────────────────────────────────────────────────────
function useLanguage() {
  const lang = useHomeworkStore((s) => s.lang)
  const setLang = useHomeworkStore((s) => s.setLang)
  const t = useMemo(() => translations[lang], [lang])
  return { t, lang, setLang }
}

function getStudentId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('student-storage')
    return raw ? JSON.parse(raw)?.state?.profile?.id || null : null
  } catch {
    return null
  }
}

const SUBJECT_MAP: Record<string, Assignment['subject']> = {
  mathematics: 'maths', maths: 'maths', math: 'maths',
  physics: 'physics', chemistry: 'chemistry',
  biology: 'biology', english: 'english', history: 'history',
}

function toAssignment(detail: any): Assignment {
  const subject = SUBJECT_MAP[(detail.subject || '').toLowerCase()] || 'maths'
  const questions: Question[] = (detail.questions || []).map((q: any) => ({
    id: q.id,
    type: q.question_type === 'mcq' ? 'mcq' : 'text',
    text: q.question_text,
    options: q.options || undefined,
    correctAnswer: '', // server-graded; never exposed to the client
    points: q.marks ?? 1,
  }))
  const status: Assignment['status'] =
    detail.status === 'submitted' ? 'completed'
    : detail.status === 'overdue' ? 'overdue'
    : 'pending'
  return {
    id: detail.id,
    subject,
    topic: detail.title,
    dueDate: detail.due_date,
    status,
    priority: status === 'overdue' ? 'high' : 'medium',
    questionCount: questions.length,
    questions,
    description: detail.description || detail.teacher_instructions || undefined,
    totalPoints: detail.total_marks ?? questions.reduce((s, q) => s + q.points, 0),
  }
}

function useAssignments() {
  const { t } = useLanguage()
  return useQuery({
    queryKey: ['homework', 'assignments'],
    queryFn: async (): Promise<Assignment[]> => {
      const sid = getStudentId()
      if (!sid) return mockAssignments // logged-out / demo mode
      // List summaries, then hydrate each with its questions
      const list: any = await apiFetch<any[]>(`/api/homework/student/${sid}`).catch(() => null)
      if (!Array.isArray(list)) return mockAssignments
      if (!list.length) return []
      const details = await Promise.all(
        list.map((h: any) =>
          apiFetch(`/api/homework/${h.id}?student_id=${sid}`).catch(() => null)
        )
      )
      const out = details.filter(Boolean).map(toAssignment)
      return out.length ? out : mockAssignments
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  })
}

function useSubmitMutation() {
  const queryClient = useQueryClient()
  const addToQueue = useHomeworkStore((s) => s.addToQueue)
  const clearQueue = useHomeworkStore((s) => s.clearQueue)
  const isOnline = useHomeworkStore((s) => s.isOnline)

  return useMutation({
    mutationFn: async (payload: {
      assignmentId: string
      answers: Record<string, string>
    }): Promise<SubmissionResult> => {
      const sid = getStudentId()
      const isReal = sid && !mockAssignments.some(a => a.id === payload.assignmentId)

      // Real path: server-side grading (MCQ exact-match + LLM for text)
      if (isReal) {
        const body = {
          answers: Object.entries(payload.answers).map(([qid, ans]) => ({
            question_id: qid,
            answer: ans,
          })),
        }
        const r: any = await apiFetch(
          `/api/homework/${payload.assignmentId}/submit?student_id=${sid}`,
          { method: 'POST', body: JSON.stringify(body) }
        )
        const pct = r.percentage ?? 0
        return {
          score: r.total_score ?? 0,
          totalPoints: r.max_score ?? 0,
          percentage: Math.round(pct),
          mastery: Math.round(pct),
          results: (r.graded_answers || []).map((g: any) => ({
            questionId: g.question_id,
            isCorrect: !!g.is_correct,
            userAnswer: g.student_answer || '(not answered)',
            correctAnswer: g.correct_answer || '',
            pointsEarned: g.marks_awarded ?? 0,
            explanation: g.feedback,
          })),
          feedbackKey:
            pct >= 90 ? 'perfect' : pct >= 70 ? 'great' : pct >= 50 ? 'good' : 'needsWork',
        }
      }

      // Demo/offline path — local grading against mock data
      await new Promise((r) => setTimeout(r, 1500))

      const assignment = mockAssignments.find(a => a.id === payload.assignmentId)
      if (!assignment) throw new Error('Assignment not found')

      let totalEarned = 0
      const results: FeedbackResult[] = assignment.questions.map((q) => {
        const userAns = payload.answers[q.id] || ''
        const isCorrect = checkAnswer(userAns, q.correctAnswer, q.type)
        if (isCorrect) totalEarned += q.points
        return {
          questionId: q.id,
          isCorrect,
          userAnswer: userAns || '(not answered)',
          correctAnswer: q.correctAnswer,
          pointsEarned: isCorrect ? q.points : 0,
          explanation: q.explanation,
        }
      })

      const percentage = Math.round((totalEarned / assignment.totalPoints) * 100)
      const mastery = Math.round((totalEarned / assignment.totalPoints) * 100)

      let feedbackKey: SubmissionResult['feedbackKey']
      if (percentage >= 90) feedbackKey = 'perfect'
      else if (percentage >= 70) feedbackKey = 'great'
      else if (percentage >= 50) feedbackKey = 'good'
      else feedbackKey = 'needsWork'

      const result: SubmissionResult = {
        score: totalEarned,
        totalPoints: assignment.totalPoints,
        percentage,
        mastery,
        results,
        feedbackKey,
      }

      // Queue if offline
      if (!isOnline) {
        addToQueue(result)
        saveToStorage(STORAGE_KEYS.QUEUE, [...loadFromStorage(STORAGE_KEYS.QUEUE, []), result])
      }

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homework'] })
    },
  })
}

// ───────────────────────────────────────────────────────────────
//  Offline Manager Component
// ───────────────────────────────────────────────────────────────
function OfflineIndicator({ t }: { t: typeof translations.en }) {
  const isOnline = useHomeworkStore((s) => s.isOnline)
  const [showReconnect, setShowReconnect] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      useHomeworkStore.getState().setIsOnline(true)
      setShowReconnect(false)
    }
    const handleOffline = () => {
      useHomeworkStore.getState().setIsOnline(false)
      setShowReconnect(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    useHomeworkStore.getState().setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-4 left-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium shadow-lg backdrop-blur-md ${
        isOnline
          ? 'bg-emerald-500/90 text-white'
          : 'bg-red-500/90 text-white'
      }`}
      role="status"
      aria-live="polite"
    >
      {isOnline ? (
        <>
          <FiWifi className="w-4 h-4" aria-hidden="true" />
          <span>{t.online}</span>
        </>
      ) : (
        <>
          <FiWifiOff className="w-4 h-4" aria-hidden="true" />
          <span>{showReconnect ? t.reconnecting : t.connectionLost}</span>
        </>
      )}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────
//  Component: MathInput
// ───────────────────────────────────────────────────────────────
const QUICK_SYMBOLS = [
  { label: 'x²', latex: '^2' },
  { label: 'x³', latex: '^3' },
  { label: '√', latex: '\\sqrt{}' },
  { label: 'π', latex: '\\pi' },
  { label: '±', latex: '\\pm' },
  { label: 'α', latex: '\\alpha' },
  { label: 'β', latex: '\\beta' },
  { label: '²⁄ₓ', latex: '\\frac{}{}' },
  { label: '≤', latex: '\\le' },
  { label: '≥', latex: '\\ge' },
  { label: '≠', latex: '\\ne' },
  { label: '×', latex: '\\times' },
]

function MathInput({ value, onChange, placeholder, disabled }: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  disabled?: boolean
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showKeyboard, setShowKeyboard] = useState(false)
  const { t } = useLanguage()

  const handleSymbolClick = (latex: string) => {
    const el = inputRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const newValue = value.slice(0, start) + latex + value.slice(end)
    onChange(newValue)
    // Move cursor after insertion
    setTimeout(() => {
      el.selectionStart = el.selectionEnd = start + latex.length
      el.focus()
    }, 0)
  }

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t.mathPlaceholder}
        disabled={disabled}
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 font-mono text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all disabled:opacity-60 resize-none"
        aria-label="Math answer input"
      />
      <button
        type="button"
        onClick={() => setShowKeyboard(!showKeyboard)}
        disabled={disabled}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors disabled:opacity-40"
        aria-label="Toggle math symbols keyboard"
        aria-expanded={showKeyboard}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M4 7h4m-4 5h4m-4 5h4M14 7h6m-6 5h6m-6 5h6" />
        </svg>
      </button>
      <AnimatePresence>
        {showKeyboard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200"
            role="toolbar"
            aria-label="Math symbols"
          >
            <div className="flex flex-wrap gap-1.5">
              {QUICK_SYMBOLS.map((sym) => (
                <button
                  key={sym.latex}
                  type="button"
                  onClick={() => handleSymbolClick(sym.latex)}
                  disabled={disabled}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm font-mono text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-sm active:scale-95 disabled:opacity-40"
                  aria-label={`Insert ${sym.label}`}
                >
                  {sym.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
//  Component: FeedbackSystem
// ───────────────────────────────────────────────────────────────
function FeedbackSystem({ result, t }: { result: SubmissionResult; t: typeof translations.en }) {
  const masteryColor = getMasteryColor(result.mastery)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
      role="region"
      aria-label="Submission feedback"
    >
      {/* Score Card */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
              🎯
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                {result.score}/{result.totalPoints}
              </h3>
              <p className="text-indigo-100 text-sm">{result.percentage}%</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-indigo-100">{t.masteryMessage}</span>
              <span className="font-semibold">{result.mastery}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.mastery}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-100"
              />
            </div>
          </div>

          <p className="text-indigo-100 text-sm">
            {t.scoreFeedback[result.feedbackKey]}
          </p>
        </div>
      </motion.div>

      {/* Per-question results */}
      <div className="space-y-3" role="list" aria-label="Question results">
        {result.results.map((r, idx) => (
          <motion.div
            key={r.questionId}
            variants={itemVariants}
            role="listitem"
            className={`p-4 rounded-xl border ${
              r.isCorrect
                ? 'bg-emerald-50/80 border-emerald-200'
                : 'bg-red-50/80 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                r.isCorrect ? 'bg-emerald-500' : 'bg-red-500'
              }`}>
                {r.isCorrect ? (
                  <FiCheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <FiAlertCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700">
                  {t.question} {idx + 1}: {r.isCorrect ? t.correct : t.incorrect}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {t.yourAnswer}: <span className="font-mono">{r.userAnswer}</span>
                </p>
                {!r.isCorrect && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.correctAnswer}: <span className="font-mono text-emerald-700">{r.correctAnswer}</span>
                  </p>
                )}
                {r.explanation && (
                  <p className="text-xs text-slate-400 mt-2 italic border-t border-slate-200/60 pt-2">
                    {r.explanation}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────
//  Component: QuestionCard
// ───────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  answer,
  onAnswerChange,
  submitted,
  feedbackResult,
  t,
}: {
  question: Question
  questionIndex: number
  totalQuestions: number
  answer: AnswerValue
  onAnswerChange: (val: AnswerValue) => void
  submitted: boolean
  feedbackResult?: FeedbackResult
  t: typeof translations.en
}) {
  const latexRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (latexRef.current && question.latex) {
      renderMathInElement(latexRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      })
    }
  }, [question.latex])

  const isCorrect = feedbackResult?.isCorrect

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.15 } }}
      className={`p-5 rounded-2xl border transition-all ${
        submitted
          ? isCorrect
            ? 'bg-emerald-50/60 border-emerald-200'
            : 'bg-red-50/60 border-red-200'
          : 'bg-white/80 border-slate-200 shadow-sm'
      }`}
      role="group"
      aria-roledescription="question"
      aria-label={`${t.question} ${questionIndex + 1} ${t.of} ${totalQuestions}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center">
          {questionIndex + 1}
        </span>
        <div className="flex-1">
          <p className="text-slate-800 font-medium leading-relaxed">
            {question.text.split('$').map((part, i) =>
              i % 2 === 0 ? (
                <span key={i}>{part}</span>
              ) : (
                <span
                  key={i}
                  ref={latexRef}
                  className="inline"
                >{part}</span>
              )
            )}
          </p>
          <span className="text-xs text-slate-400 mt-1 block">
            {question.points} {t.points || 'pts'}
          </span>
        </div>
        {submitted && feedbackResult && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
              isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}
            aria-label={isCorrect ? t.correct : t.incorrect}
          >
            {isCorrect ? '✓' : '✗'}
          </motion.span>
        )}
      </div>

      {/* Answer input based on type */}
      {!submitted && (
        <div className="ml-11">
          {question.type === 'mcq' && question.options && (
            <div
              className="space-y-2"
              role="radiogroup"
              aria-label={`${t.question} ${questionIndex + 1} options`}
            >
              {question.options.map((opt, optIdx) => (
                <motion.label
                  key={optIdx}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    answer === opt
                      ? 'border-indigo-400 bg-indigo-50/80 shadow-sm'
                      : 'border-slate-200 bg-white/60 hover:border-indigo-200 hover:bg-indigo-50/40'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      answer === opt
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-slate-300'
                    }`}
                    aria-hidden="true"
                  >
                    {answer === opt && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </span>
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    value={opt}
                    checked={answer === opt}
                    onChange={() => onAnswerChange(opt)}
                    className="sr-only"
                    aria-describedby={`q-${question.id}-desc`}
                  />
                  <span className="text-sm text-slate-700">
                    {opt.split('$').map((p, i) =>
                      i % 2 === 0 ? (
                        <span key={i}>{p}</span>
                      ) : (
                        <span key={i} ref={latexRef} className="inline">{p}</span>
                      )
                    )}
                  </span>
                </motion.label>
              ))}
            </div>
          )}

          {question.type === 'math' && (
            <MathInput
              value={(answer as string) || ''}
              onChange={onAnswerChange}
              placeholder={t.mathPlaceholder}
            />
          )}

          {question.type === 'text' && (
            <input
              type="text"
              value={(answer as string) || ''}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder={t.textPlaceholder}
              disabled={submitted}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all disabled:opacity-60"
              aria-label="Text answer"
            />
          )}
        </div>
      )}

      {/* Show answer after submission */}
      {submitted && feedbackResult && !isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="ml-11 mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200"
        >
          <p className="text-xs text-emerald-700">
            <span className="font-semibold">{t.correctAnswer}:</span> {feedbackResult.correctAnswer}
          </p>
          {feedbackResult.explanation && (
            <p className="text-xs text-slate-500 mt-1.5 italic">{feedbackResult.explanation}</p>
          )}
        </motion.div>
      )}
      {submitted && feedbackResult && isCorrect && feedbackResult.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="ml-11 mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200"
        >
          <p className="text-xs text-slate-500 italic">{feedbackResult.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
// ───────────────────────────────────────────────────────────────
//  Component: HomeworkCard (list item)
// ───────────────────────────────────────────────────────────────
function HomeworkCard({
  assignment,
  index,
  onSelect,
  t,
}: {
  assignment: Assignment
  index: number
  onSelect: () => void
  t: typeof translations.en
}) {
  const hasResults = assignment.status === 'completed'
  const statusClass = getStatusColor(assignment.status)
  const dotClass = getStatusDot(assignment.status)
  const priorityClass = getPriorityBadge(assignment.priority, t)

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: (i: number) => (
      {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: i * 0.08,
          type: 'spring',
          stiffness: 300,
          damping: 25,
        },
      }
    ),
  }

  return (
    <motion.button
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className="w-full text-left group"
      aria-label={`${assignment.topic} - ${t.status[assignment.status]} - ${formatDueDate(assignment.dueDate, t)}`}
    >
      <div className="glass-card p-5 rounded-2xl border border-white/60 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
        {/* Top row: subject badge + priority */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400" aria-hidden="true" />
            {t.subjects[assignment.subject]}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityClass}`}>
            {t.priority[assignment.priority]}
          </span>
        </div>

        {/* Topic */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">
          {assignment.topic}
        </h3>

        {/* Description snippet */}
        {assignment.description && (
          <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
            {assignment.description}
          </p>
        )}

        {/* Bottom row: due date + status + action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border ${statusClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dotClass} animate-pulse`} aria-hidden="true" />
              {t.status[assignment.status]}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FiClock className="w-3.5 h-3.5" aria-hidden="true" />
              {formatDueDate(assignment.dueDate, t)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-indigo-600">
            <span className="text-xs font-medium">
              {hasResults ? t.viewResults : (
                assignment.status === 'overdue' ? t.resumeAssignment : t.startAssignment
              )}
            </span>
            <FiChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </div>
        </div>

        {/* Progress bar for completed */}
        {hasResults && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>{assignment.questionCount} {t.questions}</span>
              <span className="font-medium text-emerald-600">100%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </motion.button>
  )
}
// ───────────────────────────────────────────────────────────────
//  Main Page Component
// ───────────────────────────────────────────────────────────────
export default function HomeworkPage() {
  const { t, lang, setLang } = useLanguage()
  const { data: assignments, isLoading, error, refetch } = useAssignments()
  const submitMutation = useSubmitMutation()

  const [activeTab, setActiveTab] = useState<TabFilter>('pending')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const viewMode = useHomeworkStore((s) => s.viewMode)
  const selectedAssignmentId = useHomeworkStore((s) => s.selectedAssignmentId)
  const answers = useHomeworkStore((s) => s.answers)
  const hasUnsavedChanges = useHomeworkStore((s) => s.hasUnsavedChanges)
  const isOnline = useHomeworkStore((s) => s.isOnline)
  const setViewMode = useHomeworkStore((s) => s.setViewMode)
  const selectAssignment = useHomeworkStore((s) => s.selectAssignment)
  const setAnswer = useHomeworkStore((s) => s.setAnswer)
  const setHasUnsavedChanges = useHomeworkStore((s) => s.setHasUnsavedChanges)

  const assignmentKey = selectedAssignmentId || ''
  const assignmentAnswers = answers[assignmentKey] || {}

  const selectedAssignment = assignments?.find(a => a.id === selectedAssignmentId)

  // Filter assignments by tab
  const filteredAssignments = useMemo(() => {
    if (!assignments) return []
    if (activeTab === 'all') return assignments
    if (activeTab === 'completed') return assignments.filter(a => a.status === 'completed')
    return assignments.filter(a => a.status !== 'completed')
  }, [assignments, activeTab])

  // Counts
  const counts = useMemo(() => {
    if (!assignments) return { pending: 0, completed: 0, all: 0 }
    return {
      pending: assignments.filter(a => a.status !== 'completed').length,
      completed: assignments.filter(a => a.status === 'completed').length,
      all: assignments.length,
    }
  }, [assignments])

  // Save answers to localStorage when changed
  useEffect(() => {
    if (Object.keys(assignmentAnswers).length > 0) {
      saveToStorage(STORAGE_KEYS.ANSWERS, { ...answers, [assignmentKey]: assignmentAnswers })
    }
  }, [assignmentAnswers, assignmentKey])

  // Load saved answers when entering an assignment
  useEffect(() => {
    if (selectedAssignment && viewMode === 'detail') {
      const saved = loadFromStorage<Record<string, AnswerValue>>(STORAGE_KEYS.ANSWERS, {})
      if (saved[selectedAssignment.id]) {
        useHomeworkStore.setState({
          answers: { ...answers, [selectedAssignment.id]: saved[selectedAssignment.id] },
          hasUnsavedChanges: false,
        })
      }
      setCurrentQuestion(0)
      setShowFeedback(false)
      setSubmissionResult(null)
    }
  }, [selectedAssignmentId])

  // Keyboard navigation for questions
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (viewMode !== 'detail' || showFeedback) return
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const handleSelectAssignment = useCallback((id: string) => {
    selectAssignment(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectAssignment])

  const handleBackToList = useCallback(() => {
    selectAssignment(null)
    setActiveTab('pending')
    setShowFeedback(false)
    setSubmissionResult(null)
  }, [selectAssignment])

  const handleAnswerChange = useCallback((questionId: string, value: AnswerValue) => {
    setAnswer(questionId, value)
  }, [setAnswer])

  const handleSaveAndExit = useCallback(() => {
    if (!selectedAssignment) return
    saveToStorage(STORAGE_KEYS.ANSWERS, {
      ...answers,
      [selectedAssignment.id]: assignmentAnswers,
    })
    setHasUnsavedChanges(false)
    showToast(t.saveProgress, 'success')
    setTimeout(() => handleBackToList(), 800)
  }, [selectedAssignment, assignmentAnswers, answers, setHasUnsavedChanges, t, handleBackToList])

  const handleSubmit = useCallback(async () => {
    if (!selectedAssignment) return

    // Validate all questions answered
    const unanswered = selectedAssignment.questions.filter(q => !assignmentAnswers[q.id])
    if (unanswered.length > 0) {
      showToast(`Please answer all questions (${unanswered.length} remaining)`, 'error')
      return
    }

    try {
      const result = await submitMutation.mutateAsync({
        assignmentId: selectedAssignment.id,
        answers: assignmentAnswers as Record<string, string>,
      })
      setSubmissionResult(result)
      setShowFeedback(true)
      setHasUnsavedChanges(false)
      showToast(result.feedbackKey === 'perfect' ? '🎉 Perfect!' : `Score: ${result.score}/${result.totalPoints}`, 'success')
      // In production: trigger WhatsApp notification to parent here
      // await apiFetch('/api/notifications/parent-whatsapp', { ... })
    } catch {
      showToast('Submission failed. Will retry when online.', 'error')
    }
  }, [selectedAssignment, assignmentAnswers, submitMutation, setHasUnsavedChanges])

  const handlePrev = useCallback(() => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    if (!selectedAssignment) return
    setCurrentQuestion((prev) => Math.min(selectedAssignment.questions.length - 1, prev + 1))
  }, [selectedAssignment])

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // ──── RENDER: List View ────
  if (viewMode === 'list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-slate-200/60">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                  {t.title}
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {t.subtitle}
                </p>
              </motion.div>

              {/* Language selector */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 bg-slate-100/80 rounded-xl p-1"
                role="radiogroup"
                aria-label="Language"
              >
                {(['en', 'hi', 'hn'] as Language[]).map((l) => (
                  <button
                    key={l}
                    role="radio"
                    aria-checked={lang === l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      lang === l
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'hi' ? 'हि' : 'हि/EN'}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-4 bg-slate-100/80 rounded-xl p-1" role="tablist" aria-label="Assignment filters">
              {(['pending', 'completed', 'all'] as TabFilter[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all relative ${
                    activeTab === tab
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tabs()[tab]}
                  {counts[tab] > 0 && (
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {counts[tab]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-2xl mx-auto px-4 py-6">
          {isLoading ? (
            <LoadingState t={t} />
          ) : error ? (
            <ErrorState t={t} onRetry={() => refetch()} />
          ) : filteredAssignments.length === 0 ? (
            <EmptyState t={t} />
          ) : (
            <motion.div
              layout
              className="space-y-4"
              role="list"
              aria-label="Assignments"
            >
              {filteredAssignments.map((assignment, idx) => (
                <HomeworkCard
                  key={assignment.id}
                  assignment={assignment}
                  index={idx}
                  onSelect={() => handleSelectAssignment(assignment.id)}
                  t={t}
                />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    )
  }

  // ──── RENDER: Detail View ────
  if (viewMode === 'detail' && selectedAssignment) {
    const questions = selectedAssignment.questions
    const currentQ = questions[currentQuestion]
    const isLastQuestion = currentQuestion === questions.length - 1
    const allAnswered = questions.every(q => assignmentAnswers[q.id])

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
        {/* Top bar */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-slate-200/60">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToList}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-700 transition-colors py-2"
                aria-label={t.backToList}
              >
                <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
                {t.backToList}
              </motion.button>

              <div className="flex items-center gap-2">
                {hasUnsavedChanges && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-amber-600 font-medium flex items-center gap-1"
                    aria-live="polite"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
                    Unsaved
                  </motion.span>
                )}
                {!isOnline && (
                  <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                    <FiWifiOff className="w-3 h-3" aria-hidden="true" />
                    Offline
                  </span>
                )}
                <button
                  onClick={handleSaveAndExit}
                  disabled={!hasUnsavedChanges || submitMutation.isPending}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all disabled:opacity-40"
                  aria-label={t.saveAndExit}
                >
                  <FiSave className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.saveAndExit}
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-medium">
                  {t.question} {currentQuestion + 1} {t.of} {questions.length}
                </span>
                <span className="font-semibold text-indigo-600">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div
                className="h-2 bg-slate-100 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={currentQuestion + 1}
                aria-valuemin={1}
                aria-valuemax={questions.length}
                aria-label={`Question ${currentQuestion + 1} of ${questions.length}`}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Assignment header card */}
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 rounded-2xl border border-white/60 mb-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
                  {t.subjects[selectedAssignment.subject]}
                </span>
                <h2 className="text-xl font-bold text-slate-800">{selectedAssignment.topic}</h2>
                {selectedAssignment.description && (
                  <p className="text-sm text-slate-500 mt-1">{selectedAssignment.description}</p>
                )}
              </div>
              <span className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border ${getStatusColor(selectedAssignment.status)}`}>
                {t.status[selectedAssignment.status]}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5" aria-hidden="true" />
                {formatDueDate(selectedAssignment.dueDate, t)}
              </span>
              <span>
                {questions.length} {t.questions} · {selectedAssignment.totalPoints} {t.points || 'pts'}
              </span>
            </div>
          </motion.div>

          {/* Feedback or Questions */}
          <AnimatePresence mode="wait">
            {showFeedback && submissionResult ? (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pb-8"
              >
                <FeedbackSystem result={submissionResult} t={t} />
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBackToList}
                  className="w-full mt-6 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
                >
                  Back to Assignments
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="questions"
                className="space-y-4 pb-8"
              >
                <AnimatePresence mode="popLayout">
                  <QuestionCard
                    key={currentQ.id}
                    question={currentQ}
                    questionIndex={currentQuestion}
                    totalQuestions={questions.length}
                    answer={assignmentAnswers[currentQ.id] || ''}
                    onAnswerChange={(val) => handleAnswerChange(currentQ.id, val)}
                    submitted={false}
                    t={t}
                  />
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                    aria-label="Previous question"
                  >
                    <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Prev
                  </motion.button>

                  <div className="flex items-center gap-1">
                    {questions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestion(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === currentQuestion
                            ? 'bg-indigo-500 w-6'
                            : assignmentAnswers[questions[idx].id]
                              ? 'bg-emerald-400'
                              : 'bg-slate-200'
                        }`}
                        aria-label={`Go to question ${idx + 1}`}
                        aria-current={idx === currentQuestion ? 'step' : undefined}
                      />
                    ))}
                  </div>

                  {isLastQuestion ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={!allAnswered || submitMutation.isPending}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all disabled:opacity-40 shadow-lg shadow-indigo-500/25"
                      aria-label={t.submit}
                    >
                      {submitMutation.isPending ? (
                        <><FiRefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />{t.submitting}</>
                      ) : (
                        <>{t.submit}<FiSend className="w-4 h-4" aria-hidden="true" /></>
                      )}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-all shadow-sm"
                      aria-label="Next question"
                    >
                      Next<FiChevronRight className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                  )}
                </div>

                {!allAnswered && isLastQuestion && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-amber-600"
                    role="alert"
                  >
                    Please answer all questions before submitting
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // Fallback
  return null
}
// ───────────────────────────────────────────────────────────────
//  Sub-components
// ───────────────────────────────────────────────────────────────
function tabs() {
  return translations.en.tabs // keys are same across all langs
}
function LoadingState({ t }: { t: typeof translations.en }) {
  return (
    <div className="flex flex-col items-center justify-center py-20" role="status" aria-live="polite">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600"
        />
      </div>
      <p className="text-sm text-slate-500">{t.loading}</p>
    </div>
  )
}
function ErrorState({ t, onRetry }: { t: typeof translations.en; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      role="alert"
    >
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <FiAlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <p className="text-sm text-slate-600 mb-4">Failed to load assignments</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
      >
        <FiRefreshCw className="w-4 h-4" aria-hidden="true" />
        {t.retry}
      </button>
    </motion.div>
  )
}
function EmptyState({ t }: { t: typeof translations.en }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      role="status"
    >
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
        <FiBarChart2 className="w-10 h-10 text-indigo-300" />
      </div>
      <p className="text-lg font-semibold text-slate-700 mb-1">{t.noAssignments}</p>
      <p className="text-sm text-slate-400">Check back later for new assignments</p>
    </motion.div>
  )
}
// ───────────────────────────────────────────────────────────────
//  Glass Card Style (Tailwind-safe inline for glass morphism)
// ───────────────────────────────────────────────────────────────
// Add to tailwind.config.ts if not present:
//
// const config = {
//   theme: {
//     extend: {
//       animation: {
//         'gradient-x': 'gradient-x 8s ease infinite',
//       },
//       keyframes: {
//         'gradient-x': {
//           '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
//           '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
//         },
//       },
//     },
//   },
// }

// Glass card CSS (add to globals.css):
//
// .glass-card {
//   background: rgba(255, 255, 255, 0.65);
//   backdrop-filter: blur(16px) saturate(180%);
//   -webkit-backdrop-filter: blur(16px) saturate(180%);
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06),
//               inset 0 1px 0 rgba(255, 255, 255, 0.8);
// }
//
// .line-clamp-2 {
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// }
