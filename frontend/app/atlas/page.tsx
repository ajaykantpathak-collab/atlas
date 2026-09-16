'use client'

import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { useState, useEffect, useRef, Component, type ReactNode } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Search, X, Sparkles, BookOpen,
  GraduationCap, Atom, FlaskConical,
  Sigma, Leaf, Brain, Target, Layers, Compass,
  MapPin, Route, Trophy, CheckCircle2, Quote,
  ChevronDown, HelpCircle, Check,
} from 'lucide-react'
import { AtlasLandscape, type Region } from '@/components/prism/AtlasLandscape'
import { AtlasGalaxy } from '@/components/atlas/AtlasGalaxy'
import AskBox from '@/components/discovery/AskBox'
import AnswerCard, { type AtlasAnswer } from '@/components/discovery/AnswerCard'
import SubjectStrip from '@/components/discovery/SubjectStrip'

/* ═══════════════════════════════════════════════════════════════════════════
   ATLAS — Your map to mastery.
   
   Structure:
   1. HERO — Clear value prop, CTAs, trust badges, canvas as atmosphere
   2. CLASS SELECTOR — "Where are you on the map?"
   3. THE ATLAS — Framed interactive map with question bar + regions
   4. HOW IT WORKS — 3 steps
   5. SOCIAL PROOF — Board badges, real stats
   6. PRICING — Simple, honest, free-first
   7. FAQ — Objection handling
   8. FINAL CTA
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Class data ─────────────────────────────────────────────────────────────

const CLASS_GROUPS = [
  {
    label: 'Primary',
    range: 'Classes 1–5',
    icon: GraduationCap,
    classes: [
      { label: 'Class 1', value: 'c1', topics: 0, weeks: 40, subjects: ['EVS', 'English', 'Maths', 'Hindi'] },
      { label: 'Class 2', value: 'c2', topics: 0, weeks: 40, subjects: ['EVS', 'English', 'Maths', 'Hindi'] },
      { label: 'Class 3', value: 'c3', topics: 0, weeks: 40, subjects: ['EVS', 'English', 'Maths', 'Hindi'] },
      { label: 'Class 4', value: 'c4', topics: 0, weeks: 40, subjects: ['EVS', 'English', 'Maths', 'Hindi'] },
      { label: 'Class 5', value: 'c5', topics: 20, weeks: 40, subjects: ['EVS', 'English', 'Maths', 'Science'] },
    ],
  },
  {
    label: 'Middle',
    range: 'Classes 6–9',
    icon: Layers,
    classes: [
      { label: 'Class 6', value: 'c6', topics: 762, weeks: 40, subjects: ['Science', 'Maths', 'English', 'Social'] },
      { label: 'Class 7', value: 'c7', topics: 795, weeks: 40, subjects: ['Science', 'Maths', 'English', 'Social'] },
      { label: 'Class 8', value: 'c8', topics: 829, weeks: 40, subjects: ['Physics', 'Chemistry', 'Maths', 'Biology'] },
      { label: 'Class 9', value: 'c9', topics: 556, weeks: 40, subjects: ['Physics', 'Chemistry', 'Maths', 'Biology'] },
    ],
  },
  {
    label: 'Boards',
    range: 'Class 10 & 12',
    icon: Target,
    classes: [
      { label: 'Class 10', value: 'c10', topics: 781, weeks: 12, subjects: ['Physics', 'Chemistry', 'Maths', 'Biology'] },
      { label: 'Class 12', value: 'c12', topics: 2303, weeks: 16, subjects: ['Physics', 'Chemistry', 'Maths', 'Biology'] },
    ],
  },
  {
    label: 'Senior',
    range: 'Class 11',
    icon: BookOpen,
    classes: [
      { label: 'Class 11', value: 'c11', topics: 2323, weeks: 40, subjects: ['Physics', 'Chemistry', 'Maths', 'Biology'] },
    ],
  },
  {
    label: 'Competitive',
    range: 'Entrance exams',
    icon: Brain,
    classes: [
      { label: 'JEE', value: 'jee', topics: 4626, weeks: 24, subjects: ['Physics', 'Chemistry', 'Maths', 'Aptitude'] },
      { label: 'NEET', value: 'neet', topics: 4626, weeks: 20, subjects: ['Physics', 'Chemistry', 'Biology', 'Botany'] },
    ],
  },
]

// ─── Topic database ─────────────────────────────────────────────────────────

const TOPIC_DB: {
  keywords: string[]
  subject: string
  topic: string
  answer: string
  prerequisites: string[]
}[] = [
  {
    keywords: ['quadratic', 'equation', 'polynomial', 'factor'],
    subject: 'Maths', topic: 'Quadratic Equations',
    answer: 'A quadratic equation has the form ax² + bx + c = 0. Solve by factoring, completing the square, or the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. The discriminant (b²-4ac) tells you if there are 2 real roots, 1 repeated root, or 2 complex roots.',
    prerequisites: ['Linear equations', 'Algebraic identities', 'Square roots'],
  },
  {
    keywords: ['photosynthesis', 'plant', 'chlorophyll', 'leaf'],
    subject: 'Biology', topic: 'Photosynthesis',
    answer: 'Photosynthesis is how plants convert sunlight into food. Chlorophyll in chloroplasts captures light energy, splitting water and converting CO₂ into glucose. Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. The oxygen we breathe comes from the water, not the CO₂.',
    prerequisites: ['Cell structure', 'Chloroplasts', 'Light energy'],
  },
  {
    keywords: ['motion', 'newton', 'force', 'velocity', 'acceleration', 'inertia'],
    subject: 'Physics', topic: "Newton's Laws of Motion",
    answer: "Three laws: 1) An object stays at rest or in uniform motion unless acted on by a force (inertia). 2) Force = mass × acceleration (F = ma). 3) Every action has an equal and opposite reaction. These three laws explain everything from walking to rocket launches.",
    prerequisites: ['Speed and velocity', 'Vectors', 'Units and measurement'],
  },
  {
    keywords: ['chemical', 'reaction', 'acid', 'base', 'mole', 'equation'],
    subject: 'Chemistry', topic: 'Chemical Reactions',
    answer: 'A chemical reaction transforms reactants into products by breaking and forming bonds. Types: combination, decomposition, displacement, double displacement, redox. Acids donate H⁺, bases donate OH⁻. pH 0-14: <7 acidic, 7 neutral, >7 basic.',
    prerequisites: ['Atomic structure', 'Periodic table', 'Chemical bonding'],
  },
  {
    keywords: ['trigonometry', 'sin', 'cos', 'tan', 'angle'],
    subject: 'Maths', topic: 'Trigonometry',
    answer: 'Trigonometry relates angles to side ratios in right triangles. sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. Core identity: sin²θ + cos²θ = 1. Used in navigation, architecture, music, and waves.',
    prerequisites: ['Right triangles', 'Pythagoras theorem', 'Ratios'],
  },
  {
    keywords: ['heredity', 'genetics', 'dna', 'gene', 'inheritance', 'mendel'],
    subject: 'Biology', topic: 'Heredity and Genetics',
    answer: "Heredity passes traits from parents to offspring through genes on chromosomes. Mendel's laws: segregation (alleles separate) and independent assortment. DNA is a double helix; genes code for proteins. Dominant alleles mask recessive ones.",
    prerequisites: ['Cell division', 'Chromosomes', 'Reproduction'],
  },
  {
    keywords: ['electricity', 'circuit', 'current', 'voltage', 'ohm', 'resistance'],
    subject: 'Physics', topic: 'Electricity and Circuits',
    answer: "Current = flow of electrons (amps). Voltage = electrical push (volts). Resistance = opposition (ohms). Ohm's law: V = IR. Series circuits: same current, voltage divides. Parallel: same voltage, current divides. Power = V × I.",
    prerequisites: ['Charge and field', 'Potential difference', 'Basic circuits'],
  },
  {
    keywords: ['periodic', 'table', 'element', 'atomic', 'electron'],
    subject: 'Chemistry', topic: 'Periodic Table',
    answer: 'Elements arranged by atomic number. Groups (columns) share properties. Periods (rows): left to right, atomic radius decreases, electronegativity increases. Group 1 = alkali metals, Group 17 = halogens, Group 18 = noble gases.',
    prerequisites: ['Atomic structure', 'Electron configuration', 'Valence electrons'],
  },
  {
    keywords: ['fraction', 'decimal', 'percentage', 'ratio', 'proportion'],
    subject: 'Maths', topic: 'Fractions, Decimals & Percentages',
    answer: 'A fraction is part of a whole (numerator/denominator). Decimals are fractions with power-of-10 denominators. Percentage = fraction out of 100. To convert: fraction → divide → decimal → ×100 → percentage.',
    prerequisites: ['Division', 'Place value', 'Multiplication'],
  },
  {
    keywords: ['planet', 'solar', 'system', 'earth', 'space', 'moon', 'sun'],
    subject: 'Physics', topic: 'The Solar System',
    answer: '8 planets orbit the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Inner 4 are rocky, outer 4 are gas giants. The Moon orbits Earth. Gravity keeps planets in elliptical orbits. Light from the Sun takes 8 minutes to reach Earth.',
    prerequisites: ['Gravity', 'Basic measurement', 'Earth and sky'],
  },
]

function findTopic(query: string) {
  const q = query.toLowerCase()
  for (const t of TOPIC_DB) {
    if (t.keywords.some(k => q.includes(k))) return t
  }
  return null
}

// ─── Knowledge graph data (Obsidian-style LivingGraph) ─────────────────────
// Subject hubs + topic nodes, edges from real prerequisite chains in
// TOPIC_DB. Mastery values are deterministic demo states until the live
// solver feeds real mastery.

const GRAPH_SUBJECT_COLORS: Record<string, string> = {
  Physics: '#38BDF8',
  Chemistry: '#FBBF24',
  Maths: '#A78BFA',
  Biology: '#FB7185',
}

function buildKnowledgeGraph() {
  const nodes: { id: string; subject: string; mastery: number; label?: string }[] = []
  const edges: { source: string; target: string }[] = []
  const subjects = Array.from(new Set(TOPIC_DB.map(t => t.subject)))

  for (const s of subjects) {
    nodes.push({ id: `hub:${s}`, subject: s, mastery: 0.85, label: s })
  }

  TOPIC_DB.forEach((t, i) => {
    const id = `topic:${t.topic}`
    nodes.push({ id, subject: t.subject, mastery: 0.25 + ((i * 29) % 70) / 100, label: t.topic })
    edges.push({ source: `hub:${t.subject}`, target: id })
  })

  const byName = new Map(TOPIC_DB.map(t => [t.topic.toLowerCase(), `topic:${t.topic}`]))
  for (const t of TOPIC_DB) {
    for (const pre of t.prerequisites) {
      const target = byName.get(pre.toLowerCase())
      if (target) edges.push({ source: target, target: `topic:${t.topic}` })
    }
  }
  return { nodes, edges }
}

const KNOWLEDGE_GRAPH = buildKnowledgeGraph()

const SUBJECT_DOTS: Record<string, string> = {
  Physics: '#38BDF8', Chemistry: '#FBBF24', Maths: '#A78BFA', Biology: '#FB7185',
  EVS: '#34D399', English: '#F87171', Hindi: '#FB923C', Aptitude: '#Facc15', Botany: '#4ADE80',
}
const SUBJECT_DOT = (s: string) => SUBJECT_DOTS[s] || '#94A3B8'

const SUBJECT_ICONS: Record<string, typeof Atom> = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Maths: Sigma,
  Biology: Leaf,
  EVS: Leaf,
  English: BookOpen,
  Hindi: BookOpen,
  Science: FlaskConical,
  Social: MapPin,
  Aptitude: Brain,
  Botany: Leaf,
}

// Subject visual config — color, position on map, shape
const SUBJECT_CONFIG: Record<string, { color: string; colorRgb: [number, number, number]; cx: number; cy: number; shape: string }> = {
  Physics:    { color: '#38BDF8', colorRgb: [56, 189, 248],   cx: 0.20, cy: 0.35, shape: 'crystal' },
  Chemistry:  { color: '#FBBF24', colorRgb: [251, 191, 36],   cx: 0.45, cy: 0.55, shape: 'molecular' },
  Maths:      { color: '#A78BFA', colorRgb: [167, 139, 250],  cx: 0.65, cy: 0.38, shape: 'geometric' },
  Biology:    { color: '#FB7185', colorRgb: [251, 113, 133],  cx: 0.82, cy: 0.52, shape: 'organic' },
  EVS:        { color: '#4ADE80', colorRgb: [74, 222, 128],   cx: 0.25, cy: 0.50, shape: 'organic' },
  English:    { color: '#FBBF24', colorRgb: [251, 191, 36],   cx: 0.50, cy: 0.35, shape: 'geometric' },
  Hindi:      { color: '#FB7185', colorRgb: [251, 113, 133],  cx: 0.75, cy: 0.55, shape: 'organic' },
  Science:    { color: '#38BDF8', colorRgb: [56, 189, 248],   cx: 0.35, cy: 0.45, shape: 'crystal' },
  Social:     { color: '#A78BFA', colorRgb: [167, 139, 250],  cx: 0.70, cy: 0.55, shape: 'geometric' },
  Aptitude:   { color: '#A78BFA', colorRgb: [167, 139, 250],  cx: 0.82, cy: 0.40, shape: 'geometric' },
  Botany:     { color: '#4ADE80', colorRgb: [74, 222, 128],   cx: 0.82, cy: 0.52, shape: 'organic' },
}

// Build regions dynamically from a class's subject list
function buildRegions(subjects: string[], totalTopics: number) {
  const radius = 0.13
  // Distribute topics across subjects
  const perSubject = Math.floor(totalTopics / subjects.length)
  const remainder = totalTopics - perSubject * subjects.length
  return subjects.map((subject, i) => {
    const config = SUBJECT_CONFIG[subject] || SUBJECT_CONFIG.Maths
    const topics = perSubject + (i < remainder ? 1 : 0)
    // Simulate partial mastery — roughly 25-35% mastered
    const mastered = Math.floor(topics * (0.22 + (i * 0.04)))
    return {
      name: subject,
      subject,
      color: config.color,
      colorRgb: config.colorRgb,
      cx: config.cx,
      cy: config.cy,
      radius,
      topics,
      mastered,
      shape: config.shape as 'crystal' | 'molecular' | 'geometric' | 'organic',
    }
  })
}

const BOARDS = ['CISCE', 'CBSE', 'ICSE', 'ISC']

const STATS = [
  // live-wired: teaching_nodes from /api/tutor-graph/stats (official
  // graph = 9,010; the 21k-era datasets are the old syllabus — never shown)
  { countUp: true, dynamic: true, value: 9010, suffix: '', label: 'Topics in the Atlas graph' },
  { countUp: false, dynamic: false, value: 'Class 1–12', label: 'Every class, every subject' },
  { countUp: false, dynamic: false, value: '3 min', label: 'To find your gaps' },
]

const FAQ_ITEMS = [
  {
    q: 'Is Atlas a replacement for tuition or school?',
    a: 'No. Atlas doesn\'t teach — it maps. It shows you exactly what you know, what you don\'t, and what order to learn things in. Use it alongside school, tuition, or self-study. It makes everything else more efficient.',
  },
  {
    q: 'Which boards and classes do you cover?',
    a: 'CISCE (ICSE and ISC), CBSE, and state boards aligned to NCERT. Every class from 1 to 12, plus JEE and NEET preparation. If your board isn\'t listed yet, sign up and we\'ll prioritize it.',
  },
  {
    q: 'How is this different from Khan Academy or YouTube?',
    a: 'Khan Academy teaches topics. YouTube has thousands of videos. Atlas tells you WHICH topic to learn next, based on what you actually know. It\'s the difference between a library and a map — both useful, but only one tells you where to go.',
  },
  {
    q: 'Does the diagnostic really take only 3 minutes?',
    a: 'Yes. The diagnostic uses adaptive questioning — it starts broad, then narrows based on your answers. In 3 minutes it identifies your strongest and weakest areas across all your subjects. You can take it again anytime.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. The diagnostic, the syllabus map, and topic-level answers are free forever. No credit card required. We may introduce premium features for schools and coaching institutes in the future, but the core student experience stays free.',
  },
  {
    q: 'Can parents use Atlas to track their child?',
    a: 'Yes. When you sign up as a parent, you can see your child\'s map — which topics they\'ve mastered, where the gaps are, and what they should focus on this week. No more asking "how was studying?" and getting "fine."',
  },
]

const PRICING = [
  {
    name: 'Student',
    price: 'Free',
    period: 'forever',
    desc: 'Everything a student needs to find their gaps and fill them.',
    features: [
      'Full syllabus map for your class',
      '3-minute diagnostic scan',
      'Ask any topic, get instant answers',
      'Track mastery across all subjects',
      'See prerequisites for every topic',
    ],
    cta: 'Start free',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Parent',
    price: 'Free',
    period: 'forever',
    desc: 'See exactly where your child stands — no guessing.',
    features: [
      'Everything in Student',
      'Track multiple children',
      'Weekly progress summary',
      'See gaps before exams do',
      'No credit card required',
    ],
    cta: 'Start free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'School',
    price: 'Talk to us',
    period: '',
    desc: 'Cohort-level insights for teachers and administrators.',
    features: [
      'Everything in Student & Parent',
      'Class-level and grade-level analytics',
      'Teacher dashboard with gap reports',
      'Custom board alignment',
      'Priority support',
    ],
    cta: 'Contact us',
    href: '/signup',
    highlighted: false,
  },
]

const HOW_IT_WORKS = [
  {
    icon: MapPin,
    step: '01',
    title: 'Map your knowledge',
    desc: 'A 3-minute diagnostic finds exactly what you know and what you don\'t — no guessing, no wasted time.',
  },
  {
    icon: Route,
    step: '02',
    title: 'Follow your path',
    desc: 'Atlas builds a personalized sequence. You only learn what you need next — prerequisites first, then mastery.',
  },
  {
    icon: Trophy,
    step: '03',
    title: 'Track mastery',
    desc: 'Watch your map fill in. See gaps close. Know exactly where you stand before every exam.',
  },
]

// ─── Motion ─────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease },
}

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: '-80px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease },
}

// ─── Reduced motion hook ────────────────────────────────────────────────────

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// ─── Scroll progress bar ────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500 origin-left z-50 rounded-full"
    />
  )
}

// ─── Count-up number ────────────────────────────────────────────────────────

function CountUp({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const animate = () => {
            const elapsed = (Date.now() - start) / 1000
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(end)
          }
          animate()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Magnetic button wrapper ────────────────────────────────────────────────

function MagneticButton({ children, className, href, onClick, strength = 0.3, type }: {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
  type?: 'button' | 'submit' | 'reset'
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) * strength
    const dy = (e.clientY - centerY) * strength
    x.set(dx)
    y.set(dy)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const motionProps = {
    ref: ref as any,
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
    className,
  }

  if (href) {
    return <motion.a href={href} {...motionProps}>{children}</motion.a>
  }
  return <motion.button type={type || 'button'} onClick={onClick} {...motionProps}>{children}</motion.button>
}


// ─── Travelling gold spark ──────────────────────────────────────────────────
// One glowing mote that falls through the page as you scroll — the single
// carried motif from hero to final CTA.

function ScrollSpark() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['8vh', '96vh'])
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['78%', '30%', '62%', '38%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 0.85, 0.85, 0])
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-30 h-2 w-2 rounded-full"
      style={{
        y, x, opacity,
        background: '#ffd66e',
        boxShadow: '0 0 12px 3px rgba(255,214,110,0.65), 0 0 34px 10px rgba(255,196,66,0.22)',
      }}
    />
  )
}

// ─── Ambient field ──────────────────────────────────────────────────────────
// Aurora glows + starfield. Replaces the flat topo backdrop behind the hero
// so the first screen feels alive without any WebGL cost.

function AmbientField() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <style>{`
        @keyframes ambient-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(4%, -3%, 0) scale(1.08); }
        }
        @keyframes ambient-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-3%, 4%, 0) scale(1.06); }
        }
        @keyframes ambient-drift-c {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.02); }
          50% { transform: translate3d(2%, 3%, 0) scale(0.96); }
        }
        @keyframes ambient-twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      {/* deep-space base */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#12102a_0%,#0a0a0f_55%,#08080c_100%)]" />
      {/* aurora glows */}
      <div
        className="absolute -left-[12%] -top-[18%] h-[64vmax] w-[64vmax] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle at 45% 45%, rgba(255,196,66,0.16) 0%, rgba(255,196,66,0.05) 34%, transparent 62%)',
          animation: 'ambient-drift-a 26s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -right-[16%] top-[8%] h-[70vmax] w-[70vmax] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle at 55% 45%, rgba(124,93,250,0.18) 0%, rgba(124,93,250,0.05) 36%, transparent 64%)',
          animation: 'ambient-drift-b 32s ease-in-out infinite',
        }}
      />
      <div
        className="absolute left-[22%] -bottom-[28%] h-[58vmax] w-[58vmax] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0.04) 38%, transparent 66%)',
          animation: 'ambient-drift-c 38s ease-in-out infinite',
        }}
      />
      {/* starfield — layered radial dots */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            'radial-gradient(1.4px 1.4px at 12% 22%, rgba(255,255,255,0.85) 50%, transparent 51%), radial-gradient(1px 1px at 34% 68%, rgba(255,255,255,0.6) 50%, transparent 51%), radial-gradient(1.6px 1.6px at 58% 14%, rgba(255,224,150,0.9) 50%, transparent 51%), radial-gradient(1px 1px at 72% 44%, rgba(255,255,255,0.55) 50%, transparent 51%), radial-gradient(1.2px 1.2px at 88% 72%, rgba(190,200,255,0.7) 50%, transparent 51%), radial-gradient(1px 1px at 22% 84%, rgba(255,255,255,0.5) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 46% 38%, rgba(255,255,255,0.75) 50%, transparent 51%), radial-gradient(1px 1px at 64% 88%, rgba(255,214,140,0.65) 50%, transparent 51%), radial-gradient(1.1px 1.1px at 8% 52%, rgba(255,255,255,0.6) 50%, transparent 51%), radial-gradient(1.3px 1.3px at 94% 18%, rgba(255,255,255,0.7) 50%, transparent 51%)',
          backgroundSize: '100% 100%',
          animation: 'ambient-twinkle 7s ease-in-out infinite',
        }}
      />
    </div>
  )
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function AtlasLanding() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState<AtlasAnswer | null>(null)
  const [asking, setAsking] = useState(false)
  const [mockQuery, setMockQuery] = useState('')
  const [activeSubject, setActiveSubject] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  // official node count — live from the graph, honest 9,010 fallback
  const [liveNodes, setLiveNodes] = useState(9010)
  // per-subject counts from the same stats call — drives the subject strip
  const [statsSubjects, setStatsSubjects] = useState<Record<string, number> | null>(null)
  // guards against a slow node-resolution landing after a newer ask
  const askSeq = useRef(0)
  useEffect(() => {
    fetch('/api/tutor-graph/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const n = Number(d?.teaching_nodes)
        if (Number.isFinite(n) && n > 0) setLiveNodes(n)
        if (d?.subjects && typeof d.subjects === 'object' && !Array.isArray(d.subjects)) {
          setStatsSubjects(d.subjects as Record<string, number>)
        }
      })
      .catch(() => {})
  }, [])
  // The map is the brand — never show an empty frame. Auto-load the
  // Class 10 demo map so the Atlas section demonstrates itself.
  useEffect(() => {
    const t = setTimeout(() => setSelectedClass((prev) => prev ?? 'c10'), 1400)
    return () => clearTimeout(t)
  }, [])
  const atlasRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Parallax for hero mockup
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const mockupY = useTransform(heroScrollProgress, [0, 1], [0, reducedMotion ? 0 : -80])
  const mockupOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, reducedMotion ? 1 : 0])
  const heroContentY = useTransform(heroScrollProgress, [0, 1], [0, reducedMotion ? 0 : 60])

  // Atlas draw-in progress (0 → 1 as Atlas section enters view)
  const { scrollYProgress: atlasDrawProgress } = useScroll({
    target: atlasRef,
    offset: ['start end', 'center center'],
  })
  const atlasDrawSmooth = useSpring(atlasDrawProgress, { stiffness: 60, damping: 20 })
  const [drawProgress, setDrawProgress] = useState(1)

  useEffect(() => {
    return atlasDrawSmooth.on('change', (v) => {
      setDrawProgress(Math.max(0, Math.min(1, v)))
    })
  }, [atlasDrawSmooth])

  function pickClass(value: string) {
    setSelectedClass(value)
    // Scroll to atlas section
    setTimeout(() => {
      atlasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  function handoffMockAsk() {
    const q = mockQuery.trim()
    if (!q || asking) return
    setQuery(q)
    atlasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const el = document.getElementById('atlas-ask-input') as HTMLInputElement | null
    el?.focus()
    handleAsk(q)
  }

  function handleAsk(override?: string) {
    if (asking) return
    const q = (override ?? query).trim()
    if (!q) return
    setAsking(true)
    askSeq.current += 1
    const seq = askSeq.current
    // resolve the topic node in parallel so the answer can deep-link into
    // /learn/{nodeId}; the ask response itself carries node_id only in the
    // enhanced-nodes teach lane, so the corpus search is the general resolver
    const resolution = fetch(`/api/content/search?q=${encodeURIComponent(q)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((nodes) => {
        const top = Array.isArray(nodes) ? nodes[0] : null
        return top?.node_id ? String(top.node_id) : null
      })
      .catch(() => null)
    // the REAL deterministic engine (WHY-lane -> solver), same one the
    // tutor uses — the local TOPIC_DB is only an offline fallback now
    fetch('/api/tutor-graph/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: 'atlas-guest', question: q }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        const steps: string[] = Array.isArray(d.steps) ? d.steps : []
        const text = String(d.answer || '')
        const topic = d.topic || (d.teach ? 'Teaching answer' : d.verified ? 'Verified solution' : 'Guided next step')
        const directId = typeof d.node_id === 'string' && d.node_id ? d.node_id : null
        setAnswer({ topic, answer: text, steps, source: 'live', nodeId: directId, prerequisites: [] })
        setActiveSubject(null)
        setSelectedRegion(null)
        // patch the gold deep-link once the parallel resolution lands
        resolution.then((nodeId) => {
          if (seq !== askSeq.current || !nodeId) return
          setAnswer((prev) => (prev && !prev.nodeId ? { ...prev, nodeId } : prev))
        })
      })
      .catch(() => {
        const topic = findTopic(q)
        if (topic) {
          setAnswer({
            topic: topic.topic,
            answer: topic.answer,
            steps: [],
            source: 'sample',
            nodeId: null,
            prerequisites: topic.prerequisites,
          })
          setActiveSubject(topic.subject)
          setSelectedRegion(null)
        } else {
          setAnswer({
            topic: 'Not mapped yet',
            answer: `"${q}" — the answer engine is unreachable right now. This is the offline sample mode; the full engine covers CBSE, ICSE and ISC from Class 1 to 12.`,
            steps: [],
            source: 'sample',
            nodeId: null,
            prerequisites: [],
          })
          setActiveSubject(null)
          setSelectedRegion(null)
        }
      })
      .finally(() => setAsking(false))
  }

  function clickRegion(region: Region) {
    setSelectedRegion(region)
    setAnswer(null)
    setActiveSubject(region.subject)
  }

  function closePanel() {
    setSelectedRegion(null)
    setAnswer(null)
    setActiveSubject(null)
  }

  const classData = CLASS_GROUPS.flatMap(g => g.classes).find(c => c.value === selectedClass)
  const regions: Region[] = classData ? buildRegions(classData.subjects, classData.topics) : []
  const highlight = activeSubject || hoveredRegion?.subject || null

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-surface-0 text-white font-sans overflow-x-hidden">
      {/* Scroll progress bar */}
      <ScrollProgress />
      {/* The travelling spark — one gold mote that falls through the whole
          story (hero -> atlas -> pricing -> CTA), tying the sections into
          a single narrative. Decorative, pointer-transparent. */}
      <ScrollSpark />

      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col">
        {/* Canvas atmosphere — dimmed behind content */}
        <div className="absolute inset-0 overflow-hidden">
          <AmbientField />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-0/40 via-surface-0/25 to-surface-0" />
        </div>

        {/* Nav */}
        <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-gold-400" />
            <span className="font-display text-xl font-bold tracking-tight">Atlas</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-surface-400 hover:text-white transition-colors hidden sm:block premium-link">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/15 transition-all font-medium"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero content — split layout: left = copy + email capture, right = product mockup */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 pt-28 pb-16">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

            {/* Left: Copy + email capture */}
            <motion.div style={{ y: heroContentY }} className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-7"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-xs text-gold-300 font-medium">Early access · Limited spots</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease, delay: 0.3 }}
                className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]"
              >
                Stop guessing what
                <br />
                <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  you don't know.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.5 }}
                className="mt-5 text-lg text-surface-400 max-w-md leading-relaxed"
              >
                Atlas maps your entire syllabus, finds your gaps in 3 minutes,
                and tells you exactly what to learn next.
              </motion.p>

              {/* Inline email capture */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.7 }}
                onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true) }}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-surface-600 outline-none focus:border-gold-400/50 focus:bg-white/8 transition-all text-sm"
                />
                <MagneticButton
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-brand-500 text-white font-display font-semibold text-sm shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 transition-all duration-200 whitespace-nowrap cursor-pointer"
                  strength={0.2}
                >
                  Get early access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </motion.form>

              <AnimatePresence>
                {emailSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-2 text-sm text-gold-300"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    You're on the list. We'll email you when your spot opens.
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                <span className="text-xs text-surface-600 uppercase tracking-wider">Aligned to</span>
                {BOARDS.map(b => (
                  <span key={b} className="text-sm font-display font-semibold text-surface-400 tracking-wide">
                    {b}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Product mockup — a mini Atlas map preview */}
            <motion.div
              style={{ y: mockupY, opacity: mockupOpacity }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.4 }}
              className="relative hidden md:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-surface-100/40 backdrop-blur-sm shadow-2xl">
              {/* Mock window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-surface-100/60">
                <div className="w-2.5 h-2.5 rounded-full bg-surface-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-surface-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-surface-500" />
                <div className="ml-3 text-xs text-surface-600 font-mono">atlas.app/class-10</div>
              </div>
              {/* Mock content */}
              <div className="p-5 space-y-4">
                {/* Mock question bar */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 focus-within:border-gold-400/50 transition-colors">
                  <Search className="w-3.5 h-3.5 text-surface-600" />
                  <input
                    value={mockQuery}
                    onChange={(e) => setMockQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handoffMockAsk() }}
                    placeholder="photosynthesis"
                    className="flex-1 bg-transparent text-xs text-white placeholder:text-surface-500 outline-none min-w-0"
                  />
                  <button onClick={handoffMockAsk} className="text-xs text-gold-400 font-medium hover:text-gold-300 whitespace-nowrap">
                    {asking ? '…' : 'Ask →'}
                  </button>
                </div>
                {/* Mock subject cards */}
                <div className="grid grid-cols-4 gap-2">
                  {regions.map((r) => {
                    const Icon = SUBJECT_ICONS[r.subject]
                    return (
                      <div key={r.subject} className="p-2.5 rounded-lg border" style={{ borderColor: r.color + '30', background: r.color + '08' }}>
                        {Icon && <Icon className="w-4 h-4 mb-1.5" style={{ color: r.color }} />}
                        <div className="text-xs font-display font-semibold text-white">{r.subject}</div>
                        <div className="text-[10px] text-surface-600">{r.mastered}/{r.topics}</div>
                      </div>
                    )
                  })}
                </div>
                {/* Mock map canvas — the knowledge constellation, always in motion */}
                <div className="relative h-48 rounded-lg overflow-hidden border border-white/10">
                  <AtlasGalaxy compact className="absolute inset-0 w-full h-full" />
                </div>
                {/* Mock mastery bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-surface-500">Overall mastery <span className="text-surface-700">· sample data</span></span>
                    <span className="text-white font-display font-bold">39%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '39%' }}
                      transition={{ delay: 1.2, duration: 1, ease }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-400 to-brand-400"
                    />
                  </div>
                </div>
                {/* Mock "next up" recommendation — makes the product feel intelligent */}
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gold-500/5 border border-gold-500/15">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-surface-600 uppercase tracking-wider">Next up</div>
                    <div className="text-xs text-white font-medium truncate">Light: Reflection & Refraction</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gold-400 flex-shrink-0" />
                </div>
              </div>
            </div>
            {/* Floating accent */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-gold-500/20 border border-gold-500/30 backdrop-blur-md"
            >
              <div className="text-xs font-display font-bold text-gold-300">3 min to start</div>
            </motion.div>
          </motion.div>

          {/* Mobile mockup — simplified, shown only on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="md:hidden mt-8"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-surface-100/40 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-surface-100/60">
                <div className="w-2 h-2 rounded-full bg-surface-500" />
                <div className="w-2 h-2 rounded-full bg-surface-500" />
                <div className="w-2 h-2 rounded-full bg-surface-500" />
                <div className="ml-2 text-[10px] text-surface-600 font-mono">atlas.app/class-10</div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <Search className="w-3 h-3 text-surface-600" />
                  <div className="text-xs text-surface-500">photosynthesis</div>
                  <div className="ml-auto text-xs text-gold-400 font-medium">→</div>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {regions.map((r) => {
                    const Icon = SUBJECT_ICONS[r.subject]
                    return (
                      <div key={r.subject} className="p-2 rounded-lg border" style={{ borderColor: r.color + '30', background: r.color + '08' }}>
                        {Icon && <Icon className="w-3 h-3 mb-1" style={{ color: r.color }} />}
                        <div className="text-[10px] font-display font-semibold text-white">{r.subject}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden border border-white/10">
                  <AtlasGalaxy compact className="absolute inset-0 w-full h-full" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-surface-500">Mastery <span className="text-surface-700">· sample</span></span>
                  <span className="text-white font-display font-bold">39%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '39%' }}
                    transition={{ delay: 1, duration: 0.8, ease }}
                    className="h-full rounded-full bg-gradient-to-r from-gold-400 to-brand-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="relative z-10 pb-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-surface-600 text-xs flex flex-col items-center gap-1"
          >
            <span>Scroll to explore</span>
            <span className="text-lg">↓</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. CLASS SELECTOR
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="class-selector" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Where are you on the map?
            </h2>
            <p className="mt-4 text-lg text-surface-400">
              Pick your class or exam. Atlas loads your syllabus instantly.
            </p>
          </motion.div>

          {/* Class groups */}
          <motion.div {...stagger} className="space-y-8">
            {CLASS_GROUPS.map((group) => {
              const GroupIcon = group.icon
              return (
                <motion.div key={group.label} {...staggerItem}>
                  {/* Group header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10">
                      <GroupIcon className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
                        {group.label}
                      </div>
                      <div className="text-xs text-surface-500">{group.range}</div>
                    </div>
                  </div>

                  {/* Class cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {group.classes.map((cls) => {
                      const isSelected = selectedClass === cls.value
                      return (
                        <motion.button
                          key={cls.value}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => pickClass(cls.value)}
                          className={`relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isSelected
                              ? 'bg-gold-400/[0.07] border-gold-400/50 shadow-lg shadow-gold-500/10'
                              : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="font-display text-lg font-bold text-white">
                            {cls.label}
                          </div>
                          <div className="mt-1 text-xs text-surface-400">
                            {cls.topics > 0 ? `${cls.topics.toLocaleString('en-IN')} concepts · verified` : 'sims & junior world'}
                          </div>
                          <div className="mt-2.5 flex items-center gap-1.5">
                            {cls.subjects.slice(0, 5).map((s) => (
                              <span key={s} className="w-1.5 h-1.5 rounded-full" style={{ background: SUBJECT_DOT(s), boxShadow: `0 0 6px ${SUBJECT_DOT(s)}90` }} />
                            ))}
                          </div>
                          {isSelected && (
                            <motion.div
                              layoutId="selected-indicator"
                              className="absolute top-3 right-3"
                            >
                              <CheckCircle2 className="w-4 h-4 text-gold-400" />
                            </motion.div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Diagnostic link */}
          <motion.div {...fadeUp} className="mt-10 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-brand-300 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Not sure where you stand? Take a 3-minute scan →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. THE ATLAS — Interactive map
          ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={atlasRef} className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              The Atlas
            </h2>
            <p className="mt-4 text-lg text-surface-400">
              {classData
                ? `${classData.label} · ${classData.topics.toLocaleString('en-IN')} concepts verified`
                : 'Select a class above to load your syllabus map'}
            </p>
          </motion.div>

          {/* Try it now hook */}
          <motion.div {...fadeUp} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-gold-300 font-medium">Try it now — no signup needed</span>
            </div>
          </motion.div>

          {/* Atlas frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-surface-100/30 backdrop-blur-sm shadow-2xl"
          >
            {/* Top bar — question input + live topics dropdown */}
            <div className="relative z-20 p-5 border-b border-white/10 bg-surface-100/50 backdrop-blur-xl">
              <AskBox
                value={query}
                onValueChange={setQuery}
                onAsk={() => handleAsk()}
                asking={asking}
              />
            </div>

            {/* Canvas map area — the galaxy speaks for itself */}
            <div className="relative h-[400px] md:h-[500px]">
              {classData ? (
                <>
                  {/* One object: the golden galaxy — the syllabus as a
                      monochrome cosmos, black and gold, in continuous
                      motion like the Lumen front door. */}
                  <div className="absolute inset-0">
                    <AtlasGalaxy className="absolute inset-0 w-full h-full" />
                    {/* Lumen-style vignette */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: 'radial-gradient(115% 100% at 50% 45%, transparent 55%, rgba(5,5,8,0.55) 100%)' }}
                    />
                  </div>

                  {/* Region markers — replaced by the constellation's own
                      glowing hub labels; the subject chips above are the
                      interactive controls. */}
                  {false && regions.map((region, i) => {
                    const Icon = SUBJECT_ICONS[region.subject] || BookOpen
                    const isActive = activeSubject === region.subject
                    return (
                      <motion.button
                        key={region.subject}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{
                          opacity: 1,
                          scale: [0, 1.3, 1],
                        }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5 + i * 0.15,
                          duration: 0.6,
                          ease,
                          times: [0, 0.7, 1],
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => clickRegion(region)}
                        className="absolute z-10 group"
                        style={{
                          left: `${region.cx * 100}%`,
                          top: `${region.cy * 100}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all"
                          style={{
                            borderColor: region.color,
                            background: region.color + '20',
                            boxShadow: isActive
                              ? `0 0 20px ${region.color}80`
                              : `0 0 10px ${region.color}40`,
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: region.color }} />
                        </div>
                      </motion.button>
                    )
                  })}

                  {/* Answer Panel — live ask result with gold node deep-link */}
                  <AnimatePresence>
                    {answer && (
                      <motion.div
                        key="answer"
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                        className="absolute top-4 right-4 bottom-4 w-80 md:w-96 z-20"
                      >
                        <AnswerCard answer={answer} onClose={closePanel} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Region Detail Panel */}
                  <AnimatePresence>
                    {selectedRegion && !answer && (
                      <motion.div
                        key="region"
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                        className="absolute top-4 right-4 bottom-4 w-72 md:w-80 z-20"
                      >
                        <div className="h-full rounded-2xl backdrop-blur-2xl bg-surface-100/70 border border-white/15 overflow-y-auto scrollbar-hide">
                          <div
                            className="sticky top-0 flex items-center justify-between px-5 py-4 backdrop-blur-2xl border-b border-white/10"
                            style={{ background: selectedRegion.color + '15' }}
                          >
                            <div className="flex items-center gap-2">
                              {(() => {
                                const Icon = SUBJECT_ICONS[selectedRegion.subject]
                                return Icon ? <Icon className="w-4 h-4" style={{ color: selectedRegion.color }} /> : null
                              })()}
                              <span className="font-display text-sm font-bold">{selectedRegion.name}</span>
                            </div>
                            <button onClick={closePanel} className="text-surface-500 hover:text-white transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="p-5 space-y-5">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-display text-xs text-surface-600 uppercase tracking-wider">Mastery</span>
                                <span className="text-xs text-white font-display font-bold">
                                  {selectedRegion.mastered}/{selectedRegion.topics}
                                </span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(selectedRegion.mastered / selectedRegion.topics) * 100}%` }}
                                  transition={{ delay: 0.2, duration: 0.7, ease }}
                                  className="h-full rounded-full"
                                  style={{
                                    background: selectedRegion.color,
                                    boxShadow: `0 0 10px ${selectedRegion.color}`,
                                  }}
                                />
                              </div>
                              <div className="mt-1.5 text-xs text-surface-600">
                                {Math.round((selectedRegion.mastered / selectedRegion.topics) * 100)}% mastered
                              </div>
                            </div>
                            <div>
                              <div className="font-display text-xs text-surface-600 mb-2 uppercase tracking-wider">
                                Topics in this region
                              </div>
                              <div className="space-y-1.5">
                                {getRegionTopics(selectedRegion.subject).map((topic, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.06 }}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                                  >
                                    <span className="text-xs text-surface-300">{topic.name}</span>
                                    <span className={`text-xs ${topic.mastered ? 'text-emerald-400' : 'text-surface-700'}`}>
                                      {topic.mastered ? '✓' : '○'}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            <Link
                              href="/signup"
                              className="block w-full text-center px-4 py-3.5 rounded-xl border text-sm font-display font-semibold transition-all"
                              style={{
                                background: selectedRegion.color + '15',
                                borderColor: selectedRegion.color + '40',
                                color: selectedRegion.color,
                              }}
                            >
                              Explore {selectedRegion.subject} →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                /* Empty state — polished with animated icon and clear CTA */
                <div className="absolute inset-0 flex flex-col items-center justify-center text-surface-600 gap-4">
                  <motion.div
                    animate={reducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Compass className="w-14 h-14 opacity-40" />
                  </motion.div>
                  <div className="text-center">
                    <p className="text-sm font-display font-semibold text-surface-500">Your map is empty</p>
                    <p className="text-xs mt-1 text-surface-600">Select a class above to chart your syllabus</p>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('class-selector')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-xs px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-surface-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    Choose your class ↑
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Subject strip — real per-subject counts from /api/tutor-graph/stats,
              each chip deep-linking to a real node via /api/graph/search */}
          <SubjectStrip subjects={statsSubjects} totalTopics={liveNodes} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. HOW IT WORKS — varied layout with connecting line + quote break
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              How Atlas works
            </h2>
            <p className="mt-4 text-lg text-surface-400">
              Three steps from lost to mastery.
            </p>
          </motion.div>

          {/* Steps with connecting line */}
          <div className="relative grid md:grid-cols-3 gap-6">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-gold-500/20 via-brand-500/20 to-accent-500/20" />

            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon
              const colors = [
                { bg: 'bg-gold-500/10', border: 'border-gold-500/20', text: 'text-gold-400', glow: 'shadow-gold-500/10' },
                { bg: 'bg-brand-500/10', border: 'border-brand-500/20', text: 'text-brand-400', glow: 'shadow-brand-500/10' },
                { bg: 'bg-accent-500/10', border: 'border-accent-500/20', text: 'text-accent-400', glow: 'shadow-accent-500/10' },
              ]
              const c = colors[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease }}
                  className={`relative p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all hover:shadow-lg ${c.glow}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${c.bg} border ${c.border}`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <span className={`font-display text-3xl font-bold ${c.text} opacity-30`}>{step.step}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Full-width quote break — visual variety */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 relative py-12 px-8 rounded-3xl bg-gradient-to-br from-surface-100/40 to-surface-200/20 border border-white/5 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-brand-500/5" />
            <div className="relative">
              <Compass className="w-8 h-8 text-gold-400/40 mx-auto mb-4" />
              <p className="font-display text-2xl md:text-3xl font-bold text-white max-w-2xl mx-auto leading-tight">
                The syllabus is a map.
                <br />
                <span className="text-surface-500">Most students wander it blind.</span>
                <br />
                Atlas gives you directions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. SOCIAL PROOF — Board badges + real stats (no fake testimonials)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Built for Indian students
            </h2>
            <p className="mt-4 text-lg text-surface-400">
              Every board. Every class. One map.
            </p>
          </motion.div>

          {/* Board badges */}
          <motion.div {...stagger} className="flex flex-wrap items-center justify-center gap-4 mb-14">
            {BOARDS.map(b => (
              <motion.div
                key={b}
                {...staggerItem}
                className="px-8 py-4 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <span className="font-display text-lg font-bold text-surface-400 tracking-wide">{b}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats — honest, verifiable, with count-up */}
          <motion.div {...stagger} className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {STATS.map(s => (
              <motion.div key={s.label} {...staggerItem} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold-400 to-brand-400 bg-clip-text text-transparent">
                  {s.countUp ? <CountUp end={(s.dynamic ? liveNodes : s.value) as number} suffix={s.suffix} /> : String(s.value)}
                </div>
                <div className="mt-1 text-sm text-surface-500">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Early access note — honest instead of fake testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease }}
            className="mt-14 max-w-2xl mx-auto p-6 rounded-2xl bg-brand-500/5 border border-brand-500/15 text-center"
          >
            <p className="text-sm text-surface-400 leading-relaxed">
              <span className="font-display font-semibold text-white">Atlas is in early access.</span>{' '}
              We're mapping every topic across CISCE, CBSE, and ICSE — and building the diagnostic
              that finds your gaps in 3 minutes. Sign up to get early access and shape what we build next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          6. PRICING — Simple, honest, free-first
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Simple pricing
            </h2>
            <p className="mt-4 text-lg text-surface-400">
              Free for students and parents. Always.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.6, ease, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative p-7 rounded-2xl border transition-all ${
                  plan.highlighted
                    ? 'bg-gold-400/[0.06] border-gold-400/40 shadow-lg shadow-gold-500/10'
                    : 'bg-white/[0.03] border-white/10'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-400 text-surface-0 text-xs font-display font-semibold shadow-lg shadow-gold-500/30">
                    Most popular
                  </div>
                )}
                <div className="font-display text-lg font-bold mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="font-display text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm text-surface-400">{plan.period}</span>}
                </div>
                <p className="text-sm text-surface-300 mb-5 leading-relaxed">{plan.desc}</p>
                <div className="space-y-2.5 mb-7">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-gold-400' : 'text-brand-400'}`} />
                      <span className="text-sm text-surface-200">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={plan.href}
                  className={`block w-full text-center px-4 py-3 rounded-xl text-sm font-display font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-gold-400 to-amber-500 text-surface-0 hover:shadow-lg hover:shadow-gold-500/30'
                      : 'bg-white/5 border border-white/15 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          7. FAQ — Objection handling
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-brand-400" />
              <span className="text-sm font-display font-semibold text-brand-400 uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Questions parents ask
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          8. FINAL CTA
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        {/* Background glow — warm gold + indigo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold-500/10 to-brand-500/10 blur-3xl" />
        </div>

        <motion.div
          {...fadeUp}
          className="relative max-w-2xl mx-auto text-center"
        >
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs text-gold-300 font-medium">Early access closing soon</span>
          </div>

          <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight">
            Your map is waiting.
          </h2>
          <p className="mt-5 text-lg text-surface-400">
            Find your starting point in 3 minutes. Then let Atlas guide you
            the rest of the way.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="/welcome"
              strength={0.25}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-500 to-brand-500 text-white font-display font-semibold text-base shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 transition-all duration-200 cursor-pointer"
            >
              Start your journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="/diagnostic"
              strength={0.2}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md text-white font-display font-semibold text-base hover:bg-white/10 transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-gold-400" />
              Take the diagnostic
            </MagneticButton>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-surface-600">
            <span>Free forever</span>
            <span>·</span>
            <span>No credit card</span>
            <span>·</span>
            <span>CBSE, ICSE & ISC</span>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-gold-400" />
            <span className="font-display font-bold">Atlas</span>
            <span className="text-xs text-surface-600 ml-2">Your map to mastery</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-surface-500">
            <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="hover:text-white transition-colors">Sign up</Link>
            <Link href="/diagnostic" className="hover:text-white transition-colors">Diagnostic</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── FAQ Item component ─────────────────────────────────────────────────────

function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease }}
      whileHover={{ scale: 1.01 }}
      className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-display text-base font-semibold text-white">{item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-surface-500 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-surface-400 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Region topic samples ───────────────────────────────────────────────────

function getRegionTopics(subject: string): { name: string; mastered: boolean }[] {
  const topics: Record<string, { name: string; mastered: boolean }[]> = {
    Physics: [
      { name: "Newton's Laws of Motion", mastered: true },
      { name: 'Electricity and Circuits', mastered: true },
      { name: 'Light: Reflection & Refraction', mastered: false },
      { name: 'Magnetic Effects of Current', mastered: false },
      { name: 'Energy and Work', mastered: true },
    ],
    Chemistry: [
      { name: 'Chemical Reactions', mastered: true },
      { name: 'Periodic Table', mastered: false },
      { name: 'Carbon Compounds', mastered: false },
      { name: 'Acids, Bases and Salts', mastered: true },
      { name: 'Metals and Non-Metals', mastered: false },
    ],
    Maths: [
      { name: 'Quadratic Equations', mastered: true },
      { name: 'Trigonometry', mastered: true },
      { name: 'Probability', mastered: false },
      { name: 'Surface Areas & Volumes', mastered: false },
      { name: 'Arithmetic Progressions', mastered: true },
    ],
    Biology: [
      { name: 'Photosynthesis', mastered: false },
      { name: 'Heredity and Genetics', mastered: true },
      { name: 'Human Body Systems', mastered: false },
      { name: 'Cell Structure', mastered: true },
      { name: 'Ecology & Environment', mastered: false },
    ],
  }
  return topics[subject] || []
}
