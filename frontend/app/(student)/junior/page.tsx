'use client'

// ──────────────────────────────────────────────
//  Gajju's Learning World  ·  Class 1-5 (ages 6-10)
//  Voice-first · 3 languages · Framer Motion
// ──────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════
//  LANGUAGES
// ═══════════════════════════════════════════════
const LANGS = ['en', 'hi', 'hinglish'] as const
type Lang = typeof LANGS[number]

const I18N: Record<Lang, Record<string, string | string[]>> = {
  en: {
    title: "Gajju's World",
    subtitle: 'What shall we learn today?',
    maths: 'Maths', english: 'English', science: 'Science', gk: 'GK',
    listenQ: 'Listen to the question',
    speakNow: '🎤  Speak your answer...',
    correct: ['Brilliant!', 'Awesome!', 'Amazing!', 'Super!', 'Wow!'],
    wrong: ['Try once more!', 'Almost there!', 'Give it another shot!'],
    star: 'star', stars: 'stars',
    nextQ: 'Next Question →', goBack: '← Back',
    grade: 'Grade', section: 'Section', name: 'Name',
    starsEarned: 'Stars Earned', subjectsDone: 'Subjects Done',
    close: 'Close', settings: 'Settings',
    switchLang: 'Switch Language', heng: 'Hinglish', hindi: 'Hindi',
    parentTitle: '👨‍👩‍👧 Parent Corner',
    todayProgress: "Today's Progress", streak: 'Day Streak', totalStars: 'Total Stars',
    parentNote: 'Learning analytics for your child.',
    greatJob: 'Great job!', keepItUp: 'Keep it up!',
    rainBow: '🌟',
  },
  hi: {
    title: 'गज्जू का दुनिया',
    subtitle: 'आज हम क्या सीखेंगे?',
    maths: 'गणित', english: 'अंग्रेजी', science: 'विज्ञान', gk: 'सामान्य ज्ञान',
    listenQ: 'सवाल सुनें',
    speakNow: '🎤  अपना जवाब बोलें...',
    correct: ['बहुत बढ़िया!', 'शाबास!', 'अद्भुत!', 'उत्कृष्ट!', 'वाह!'],
    wrong: ['फिर से कोशिश करो!', 'लगभार हो गया!', 'दोबारा प्रयास करो!'],
    star: 'सितारा', stars: 'सितारे',
    nextQ: 'अगला सवाल →', goBack: '← वापस',
    grade: 'कक्षा', section: 'सेक्शन', name: 'नाम',
    starsEarned: 'किए गए सितारे', subjectsDone: 'पूरे विषय',
    close: 'बंद करें', settings: 'सेटिंग्स',
    switchLang: 'भाषा बदलें', heng: 'हिंग्लिश', hindi: 'हिंदी',
    parentTitle: '👨‍👩‍👧 अभिभावक कॉर्नर',
    todayProgress: 'आज की प्रगति', streak: 'दिनों की लगती', totalStars: 'कुल सितारे',
    parentNote: 'आपके बच्चे की सीखने का विश्लेषण।',
    greatJob: 'बहुत बढ़िया काम!', keepItUp: 'ऐसे ही जारी रखो!',
    rainBow: '🌟',
  },
  hinglish: {
    title: "Gajju ka World",
    subtitle: 'Aaj hum kya seekhenge?',
    maths: 'Maths', english: 'English', science: 'Science', gk: 'GK',
    listenQ: 'Question suno',
    speakNow: '🎤  Apna answer bolo...',
    correct: ['Bahut badhiya!', 'Shaabas!', 'Adbhut!', 'Utkrisht!', 'Wah!'],
    wrong: ['Phir se koshish karo!', 'Laghubhar ho gaya!', 'Dobara try karo!'],
    star: 'star', stars: 'stars',
    nextQ: 'Next Question →', goBack: '← Wapas',
    grade: 'Class', section: 'Section', name: 'Naam',
    starsEarned: 'Stars Earned', subjectsDone: 'Subjects Done',
    close: 'Close', settings: 'Settings',
    switchLang: 'Language change karo', heng: 'Hinglish', hindi: 'Hindi',
    parentTitle: '👨‍👩‍👧 Parent Corner',
    todayProgress: "Aaj ki Progress", streak: 'Day Streak', totalStars: 'Total Stars',
    parentNote: 'Aapke bachche ki learning ki report.',
    greatJob: 'Bahut badhiya kaam!', keepItUp: 'Aise hi jari rakho!',
    rainBow: '🌟',
  },
}

const t = (k: string, lang: Lang): any => I18N[lang]?.[k] ?? I18N.en[k] ?? k

const isDevanagari = (s: string) => /[ऀ-ि]/.test(s) || /[ॠ-ೲ]/.test(s)

// ═══════════════════════════════════════════════
//  VOICE UTILITIES
// ═══════════════════════════════════════════════
const getHindiVoice = (): SpeechSynthesisVoice | null => {
  const voices = speechSynthesis.getVoices()
  return voices.find(v => v.lang.startsWith('hi')) ?? voices.find(v => v.lang.startsWith('en')) ?? null
}

const speak = (text: string, lang: Lang) => {
  speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = lang === 'en' ? 'en-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN'
  utt.rate = 0.82
  utt.pitch = 1.25
  utt.volume = 1
  const v = getHindiVoice()
  if (v) utt.voice = v
  speechSynthesis.speak(utt)
}

const playTone = (freq: number, dur: number, type: OscillatorType = 'sine') => {
  try {
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ac.createOscillator()
    const g = ac.createGain()
    osc.type = type
    osc.frequency.value = freq
    g.gain.value = 0.18
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur)
    osc.connect(g)
    g.connect(ac.destination)
    osc.start()
    osc.stop(ac.currentTime + dur)
  } catch {}
}
const cheer = () => { playTone(523, 0.12); setTimeout(() => playTone(659, 0.12), 120); setTimeout(() => playTone(784, 0.25), 240) }
const wrongTone = () => { playTone(300, 0.3, 'triangle') }

// ═══════════════════════════════════════════════
//  MATH GENERATOR
// ═══════════════════════════════════════════════
const generateQuestion = () => {
  const ops = ['+', '−', '×']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a: number, b: number, ans: number
  switch (op) {
    case '+': a = Math.floor(Math.random() * 50) + 1; b = Math.floor(Math.random() * 50) + 1; ans = a + b; break
    case '−': a = Math.floor(Math.random() * 20) + 10; b = Math.floor(Math.random() * a); ans = a - b; break
    default:  a = Math.floor(Math.random() * 9) + 1; b = Math.floor(Math.random() * 9) + 1; ans = a * b; break
  }
  return { a, b, op, ans, label: `${a} ${op} ${b} = ?` }
}

// ═══════════════════════════════════════════════
//  GAJJU CHARACTER (SVG)
// ═══════════════════════════════════════════════
const GAJJU_COLORS = {
  idle:    { body: '#a78bfa', accent: '#7c3aed', cheek: '#f9a8d4', inner: '#ede9fe' },
  speak:   { body: '#818cf8', accent: '#6366f1', cheek: '#f472b6', inner: '#e0e7ff' },
  win:     { body: '#34d399', accent: '#059669', cheek: '#fcd34d', inner: '#d1fae5' },
  enc:     { body: '#f472b6', accent: '#db2777', cheek: '#fcd34d', inner: '#fce7f3' },
}

const Gajju = ({ state = 'idle' }: { state?: string }) => {
  const c = GAJJU_COLORS[state as keyof typeof GAJJU_COLORS] ?? GAJJU_COLORS.idle
  const isWin = state === 'win'
  const isEnc = state === 'enc'

  const earVar = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: isWin ? [1, 1.15, 1] : isEnc ? [1, 1.08, 1] : [1, 1.04, 1],
      rotate: isWin ? [0, -8, 8, 0] : [0, -3, 3, 0],
      transition: { duration: isWin ? 0.5 : isEnc ? 0.7 : 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  const bodyAnim = {
    animate: {
      y: isWin ? [0, -12, 0] : isEnc ? [0, -6, 0] : [0, -2, 0],
      transition: { duration: isWin ? 0.45 : isEnc ? 0.6 : 2, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return (
    <motion.div className="relative" variants={bodyAnim} animate="animate">
      <svg viewBox="0 0 200 210" className="w-40 h-44 sm:w-48 sm:h-52 drop-shadow-2xl">
        <defs>
          <radialGradient id="bg" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor={c.inner} />
            <stop offset="100%" stopColor={c.body} />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="tusk" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDE7" />
            <stop offset="100%" stopColor="#E0E0E0" />
          </linearGradient>
          <clipPath id="earClip"><ellipse cx="32" cy="72" rx="26" ry="34" /></clipPath>
        </defs>

        {/* ── Ear (left) ── */}
        <motion.g variants={earVar} initial="initial" animate="animate">
          <ellipse cx="32" cy="72" rx="26" ry="34" fill={c.accent} />
          <ellipse cx="32" cy="72" rx="16" ry="24" fill={c.cheek} />
        </motion.g>

        {/* ── Head ── */}
        <motion.circle
          cx="100" cy="90" r="68"
          fill="url(#bg)" filter="url(#glow)"
          animate={{
            scale: state === 'speak' ? [1, 1.025, 1] : [1, 1.008, 1],
          }}
          transition={{ duration: state === 'speak' ? 0.35 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Forehead dot (tilak) ── */}
        <circle cx="100" cy="42" r="5" fill="#f59e0b" />

        {/* ── Ear flap detail ── */}
        <ellipse cx="32" cy="72" rx="10" ry="18" fill={c.cheek} opacity="0.5" />

        {/* ── Eyes ── */}
        <ellipse cx="80" cy="84" rx="11" ry="13" fill="white" />
        <ellipse cx="120" cy="84" rx="11" ry="13" fill="white" />
        <motion.circle
          cx="82" cy="86" r="7" fill="#1e1b4b"
          animate={{ y: state === 'speak' ? [0, -2, 0] : [0, -1.5, 0] }}
          transition={{ duration: state === 'speak' ? 0.4 : 2.5, repeat: Infinity }}
        />
        <motion.circle
          cx="122" cy="86" r="7" fill="#1e1b4b"
          animate={{ y: state === 'speak' ? [0, -2, 0] : [0, -1.5, 0] }}
          transition={{ duration: state === 'speak' ? 0.4 : 2.5, repeat: Infinity }}
        />
        <circle cx="85" cy="83" r="3.5" fill="white" />
        <circle cx="125" cy="83" r="3.5" fill="white" />

        {/* ── Trunk ── */}
        <motion.path
          d="M 100 105 Q 100 130, 94 145 Q 88 160, 100 160 Q 112 160, 106 145 Q 100 130, 100 105 Z"
          fill={c.accent}
          animate={{
            d: state === 'speak'
              ? [
                  'M 100 105 Q 100 130, 94 145 Q 88 160, 100 160 Q 112 160, 106 145 Q 100 130, 100 105 Z',
                  'M 100 105 Q 98 130, 94 143 Q 90 155, 100 156 Q 110 155, 106 143 Q 102 130, 100 105 Z',
                  'M 100 105 Q 100 130, 94 145 Q 88 160, 100 160 Q 112 160, 106 145 Q 100 130, 100 105 Z',
                ]
              : state === 'win'
              ? [
                  'M 100 105 Q 100 130, 94 145 Q 88 160, 100 160 Q 112 160, 106 145 Q 100 130, 100 105 Z',
                  'M 100 105 Q 95 128, 92 143 Q 85 157, 100 157 Q 115 157, 108 143 Q 105 128, 100 105 Z',
                  'M 100 105 Q 100 130, 94 145 Q 88 160, 100 160 Q 112 160, 106 145 Q 100 130, 100 105 Z',
                ]
              : undefined,
          }}
          transition={{ duration: state === 'speak' ? 0.32 : 0.55, repeat: Infinity, ease: 'easeInOut' }}
        />
        <path d="M 94 145 Q 88 158, 99 159 Q 108 158, 105 145" fill={c.cheek} opacity="0.35" />

        {/* ── Tusks ── */}
        <path d="M 78 112 Q 74 130, 77 140 Q 79 144, 82 140 Q 84 130, 82 112 Z" fill="url(#tusk)" />
        <path d="M 118 112 Q 122 130, 119 140 Q 117 144, 114 140 Q 112 130, 114 112 Z" fill="url(#tusk)" />

        {/* ── Mouth ── */}
        {state === 'win' ? (
          <path d="M 86 122 Q 100 132, 114 122" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <ellipse cx="100" cy="122" rx="8" ry="5" fill="#be185d" />
        )}

        {/* ── Cheeks ── */}
        <circle cx="70" cy="104" r="8" fill={c.cheek} opacity="0.45" />
        <circle cx="130" cy="104" r="8" fill={c.cheek} opacity="0.45" />

        {/* ── Ears (outer, behind head) ── */}
        <motion.ellipse
          cx="36" cy="74" rx="29" ry="38" fill={c.accent}
          variants={earVar} initial="initial" animate="animate"
        />
        <motion.ellipse
          cx="164" cy="74" rx="29" ry="38" fill={c.accent}
          variants={{
            initial: { scale: 1, rotate: 0 },
            animate: {
              scale: isWin ? [1, 1.15, 1] : isEnc ? [1, 1.08, 1] : [1, 1.04, 1],
              rotate: isWin ? [0, 8, -8, 0] : [0, 3, -3, 0],
              transition: { duration: isWin ? 0.5 : isEnc ? 0.7 : 1.5, repeat: Infinity, ease: 'easeInOut' },
            },
          }} initial="initial" animate="animate"
        />
        <motion.ellipse
          cx="164" cy="74" rx="16" ry="24" fill={c.cheek}
          variants={earVar} initial="initial" animate="animate"
        />

        {/* ── Body hint ── */}
        <motion.ellipse
          cx="100" cy="196" rx="56" ry="14" fill={c.accent}
          opacity="0.18"
          animate={{ scaleX: isWin ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        {/* ── Win sparkles ── */}
        {isWin && (
          <>
            <motion.text x="28" y="30" fontSize="16" animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>✨</motion.text>
            <motion.text x="156" y="26" fontSize="18" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.3, repeat: Infinity, delay: 0.3 }}>⭐</motion.text>
            <motion.text x="12" y="130" fontSize="14" animate={{ y: [0, -7, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.6 }}>💫</motion.text>
          </>
        )}
      </svg>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════
//  STAR COUNTER
// ═══════════════════════════════════════════════
const StarCounter = ({ count, onAdd }: { count: number; onAdd: () => void }) => {
  const [bump, setBump] = useState(false)
  const prev = useRef(count)

  useEffect(() => {
    if (count > prev.current) { setBump(true); setTimeout(() => setBump(false), 600) }
    prev.current = count
  }, [count])

  return (
    <button
      onClick={onAdd}
      className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl active:scale-90 transition-all"
      aria-label="${count} stars"
    >
      <motion.span
        animate={bump ? { scale: [1, 1.7, 1], rotate: [0, 25, -25, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
        className="text-2xl inline-block"
      >
        ⭐
      </motion.span>
      <span className="font-extrabold text-purple-700 text-lg font-['Nunito']">{count}</span>
    </button>
  )
}

// ═══════════════════════════════════════════════
//  CONFETTI (Framer Motion)
// ═══════════════════════════════════════════════
const COLORS = ['#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#60a5fa', '#fb923c', '#f87171']

const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; color: string; shape: string; delay: number }>>([])

  useEffect(() => {
    if (!active) return
    const ps = Array.from({ length: 55 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: ['circle', 'rect', 'star'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 0.6,
    }))
    setPieces(ps)
    const t = setTimeout(() => setPieces([]), 3200)
    return () => clearTimeout(t)
  }, [active])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => {
        const isStar = p.shape === 'star'
        return (
          <motion.div
            key={p.id}
            className="absolute top-0"
            style={{ left: `${p.x}%` }}
            initial={{ y: -20, x: 0, opacity: 1, rotate: 0, scale: 0 }}
            animate={{
              y: ['0%', '85vh'],
              x: [(Math.random() - 0.5) * 280, (Math.random() - 0.5) * 280],
              opacity: [1, 1, 0],
              rotate: [0, Math.random() * 720 - 360],
              scale: [0, 1.4, 0.8, 0],
            }}
            transition={{ duration: 2.4, delay: p.delay, ease: 'easeOut' }}
          >
            {isStar ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill={p.color}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01z" />
              </svg>
            ) : p.shape === 'circle' ? (
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
            ) : (
              <div style={{ width: 12, height: 12, background: p.color, borderRadius: 2, transform: `rotate(${Math.random() * 45}deg)` }} />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════
//  SUBJECT CARD
// ═══════════════════════════════════════════════
const subjects = [
  { key: 'maths',   emoji: '🔢', color: 'from-orange-400 to-red-500',  shadow: 'shadow-orange-300',   border: 'border-orange-200',   labelK: 'maths' },
  { key: 'english', emoji: '🔤', color: 'from-blue-400 to-indigo-600', shadow: 'shadow-blue-300',   border: 'border-blue-200',     labelK: 'english' },
  { key: 'science', emoji: '🔬', color: 'from-green-400 to-emerald-600',shadow: 'shadow-green-300',  border: 'border-green-200',   labelK: 'science' },
  { key: 'gk',      emoji: '🌍', color: 'from-pink-400 to-rose-600',   shadow: 'shadow-pink-300',   border: 'border-pink-200',    labelK: 'gk' },
] as const

const SubjectCard = ({ subj, onTap, lang, idx }: { subj: typeof subjects[number]; onTap: (s: string) => void; lang: Lang; idx: number }) => (
  <motion.button
    initial={{ opacity: 0, y: 60, scale: 0.5 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: idx * 0.1, type: 'spring', stiffness: 260, damping: 18 }}
    whileHover={{ scale: 1.06, y: -6 }}
    whileTap={{ scale: 0.92 }}
    onClick={() => onTap(subj.key)}
    className={`relative w-full h-24 sm:h-28 rounded-3xl bg-gradient-to-br ${subj.color} ${subj.shadow} shadow-xl border-4 ${subj.border} flex items-center justify-center gap-3 overflow-hidden group`}
    aria-label={t(subj.labelK, lang)}
  >
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
    <span className="text-4xl sm:text-5xl drop-shadow-lg relative z-10" aria-hidden="true">{subj.emoji}</span>
    <span className="text-white font-black text-xl sm:text-2xl drop-shadow-md relative z-10 font-['Nunito'] tracking-wide">
      {t(subj.labelK, lang)}
    </span>
  </motion.button>
)

// ═══════════════════════════════════════════════
//  QUIZ SCREEN
// ═══════════════════════════════════════════════
const QuizScreen = ({ subject, lang, onBack, onCorrect }: { subject: string; lang: Lang; onBack: () => void; onCorrect: () => void }) => {
  const [q, setQ] = useState(generateQuestion())
  const [fb, setFb] = useState<'idle' | 'correct' | 'wrong' | 'thinking'>('idle')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showWin, setShowWin] = useState(false)
  const [gajjuState, setGajjuState] = useState('idle')
  const [msg, setMsg] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recRef = useRef<any>(null)

  const gajjuSpeak = useCallback((text: string, after?: () => void) => {
    setGajjuState('speak')
    speak(text, lang)
    setTimeout(() => { setGajjuState('idle'); after?.() }, text.length * 90 + 200)
  }, [lang])

  useEffect(() => {
    const qText = `${q.label}`
    const listenText = t('listenQ', lang)
    gajjuSpeak(`${listenText}  ${qText}`, () => {
      setTimeout(() => gajjuSpeak(t('speakNow', lang)), 600)
    })
  }, [])

  const flashMsg = useCallback((m: string, dur = 2000) => { setMsg(m); setTimeout(() => setMsg(''), dur) }, [])

  const handleAnswer = useCallback((ans: string) => {
    if (fb !== 'idle') return
    const num = parseInt(ans.replace(/[^0-9−-]/g, '').replace('−', '-'))
    if (isNaN(num)) { flashMsg(t('wrong', lang)[0], 2000); return }

    if (num === q.ans) {
      setFb('correct')
      setGajjuState('win')
      setShowConfetti(true)
      setShowWin(true)
      cheer()
      const praise = t('correct', lang)[Math.floor(Math.random() * 5)]
      flashMsg(`${praise}  ${q.label.replace('=?', '= ' + q.ans)}`)
      gajjuSpeak(praise, () => setTimeout(() => { onCorrect(); onBack() }, 1800))
    } else {
      setFb('wrong')
      setGajjuState('enc')
      wrongTone()
      const tip = t('wrong', lang)[Math.floor(Math.random() * 3)]
      flashMsg(tip, 2000)
      gajjuSpeak(tip)
      setTimeout(() => {
        setFb('idle'); setGajjuState('idle')
        gajjuSpeak(q.label, () => setTimeout(() => gajjuSpeak(t('speakNow', lang)), 500))
      }, 2000)
    }
  }, [fb, q, lang, onCorrect, onBack, gajjuSpeak, flashMsg])

  const startListen = useCallback(() => {
    if (fb !== 'idle') return
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SR) { alert('Voice not supported — try Chrome browser'); return }
    const r = new SR()
    r.lang = lang === 'hi' ? 'hi-IN' : lang === 'hinglish' ? 'en-IN' : 'en-IN'
    r.continuous = false
    r.interimResults = false
    r.maxAlternatives = 3
    r.onstart = () => setIsListening(true)
    r.onend = () => setIsListening(false)
    r.onerror = () => { setIsListening(false); setFb('idle'); setGajjuState('idle') }
    r.onresult = (e: any) => {
      for (const res of e.results) {
        for (const alt of res) {
          handleAnswer(alt.transcript)
          if (fb === 'idle') return
        }
      }
    }
    recRef.current = r
    r.start()
  }, [fb, lang, handleAnswer])

  const nextQ = useCallback(() => {
    setQ(generateQuestion())
    setFb('idle')
    setShowConfetti(false)
    setShowWin(false)
    setMsg('')
    setGajjuState('idle')
    gajjuSpeak(`${t('listenQ', lang)} ${q.label}`, () => setTimeout(() => gajjuSpeak(t('speakNow', lang)), 500))
  }, [lang, q.label, gajjuSpeak])

  return (
    <motion.div initial={{ opacity: 0, x: 120 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -120 }} className="w-full">
      <AnimatePresence>
        {showWin && (
          <motion.div initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center mb-4">
            <motion.span animate={{ scale: [1, 1.35, 1], rotate: [-8, 8, -8, 0] }} transition={{ duration: 0.7, repeat: 3 }} className="text-6xl inline-block">🏆</motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-5 sm:p-7 border-2 border-purple-100">
        <div className="flex justify-between items-center mb-5">
          <span className="text-purple-600 font-bold text-base sm:text-lg tracking-wide font-['Nunito']">{subject.toUpperCase()}</span>
          <button onClick={onBack} className="text-purple-400 hover:text-purple-700 font-bold text-sm px-3 py-1.5 rounded-full hover:bg-purple-50 transition font-['Nunito']">{t('goBack', lang)}</button>
        </div>

        {/* Question */}
        <div className="text-center mb-6">
          <p className="text-purple-400 text-sm mb-2 font-semibold font-['Nunito']">{t('listenQ', lang)}</p>
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl py-6 px-4"
            animate={{ scale: fb === 'thinking' ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <motion.p
              className="text-4xl sm:text-5xl font-black text-purple-800 font-['Nunito'] tracking-tight"
              key={q.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {q.label}
            </motion.p>
          </motion.div>
        </div>

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {fb !== 'idle' && (
            <motion.div
              key={fb}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`text-center py-4 mb-4 rounded-2xl ${fb === 'correct' ? 'bg-green-100' : fb === 'wrong' ? 'bg-orange-100' : 'bg-blue-100'}`}
            >
              <p className={`text-xl sm:text-2xl font-black font-['Nunito'] ${fb === 'correct' ? 'text-green-700' : fb === 'wrong' ? 'text-orange-700' : 'text-blue-700'}`}>
                {msg}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mic button */}
        {fb === 'idle' && (
          <motion.button
            onClick={startListen}
            className="w-full h-16 sm:h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-lg sm:text-xl font-['Nunito'] shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            animate={isListening ? { scale: [1, 1.06, 1] } : {} }
            transition={isListening ? { duration: 0.7, repeat: Infinity } : { type: 'spring', stiffness: 400, damping: 17 }}
            aria-label="Speak your answer"
          >
            <span className="text-3xl">🎤</span>
            <span>{t('speakNow', lang)}</span>
          </motion.button>
        )}

        {/* Next */}
        <AnimatePresence>
          {fb === 'correct' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={nextQ}
              className="w-full mt-4 h-14 sm:h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-black text-lg sm:text-xl font-['Nunito'] shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              {t('nextQ', lang)}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Confetti active={showConfetti} />
    </motion.div>
  )
}

// ═══════════════════════════════════════════════
//  PARENT CORNER (long-press + PIN)
// ═══════════════════════════════════════════════
const ParentCorner = ({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Lang }) => {
  const [step, setStep] = useState<'lock' | 'pin' | 'dash'>('lock')
  const [pin, setPin] = useState('')
  const [pinInput, setPinInput] = useState('')
  const timerRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (step === 'pin') {
      const t = setTimeout(() => { setStep('lock'); setPin(''); setPinInput('') }, 15000)
      return () => clearTimeout(t)
    }
  }, [step])

  const startPress = () => {
    let p = 0
    timerRef.current = window.setInterval(() => {
      p += 5
      setProgress(p)
      if (p >= 100) {
        clearInterval(timerRef.current!)
        setStep('pin')
      }
    }, 120)
  }
  const endPress = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (step === 'pin') return
    setProgress(0)
  }

  const submitPin = () => {
    if (pinInput === pin || pinInput === '1234') {
      setStep('dash')
    } else {
      setPinInput('')
    }
  }

  if (!open) return null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative bg-white rounded-3xl shadow-2xl p-5 sm:p-7 w-full max-w-sm border-2 border-purple-100">

        {/* ── LOCK SCREEN ── */}
        {step === 'lock' && (
          <div className="text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-black text-purple-700 mb-2 font-['Nunito']">{t('parentTitle', lang)}</h3>
            <p className="text-gray-500 text-sm mb-5 font-['Nunito']">Long-press the lock icon to enter</p>
            <div className="w-24 h-24 mx-auto bg-purple-50 rounded-full flex items-center justify-center cursor-pointer select-none touch-none"
              onTouchStart={startPress} onTouchEnd={endPress}
              onMouseDown={startPress} onMouseUp={endPress} onMouseLeave={endPress}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-purple-200" />
                <motion.div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-purple-600 border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
                <span className="text-3xl relative z-10">🔒</span>
                <motion.div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap font-['Nunito']">
                  Hold me
                </motion.div>
              </div>
            </div>
            <motion.div className="w-24 h-2 bg-purple-100 rounded-full mx-auto mt-14 overflow-hidden">
              <motion.div className="h-full bg-purple-500 rounded-full" animate={{ width: `${progress}%` }} />
            </motion.div>
            <button onClick={onClose} className="mt-6 text-gray-400 text-sm font-['Nunito']">{t('close', lang)}</button>
          </div>
        )}

        {/* ── PIN SCREEN ── */}
        {step === 'pin' && (
          <div className="text-center">
            <div className="text-4xl mb-3">🔐</div>
            <h3 className="text-xl font-black text-purple-700 mb-1 font-['Nunito']">Enter Parent PIN</h3>
            <p className="text-gray-400 text-xs mb-5 font-['Nunito']">Default: 1234</p>
            <div className="flex justify-center gap-2 mb-5">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold font-['Nunito'] ${pinInput[i] ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-transparent'}`}>{pinInput[i] ?? ''}</div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[1,2,3,4,5,6,7,8,9,'⌫',0,'OK'].map((k, i) => (
                <button key={i} onClick={() => {
                  if (k === '⌫') { setPinInput(p => p.slice(0, -1)); return }
                  if (k === 'OK') { submitPin(); return }
                  setPinInput(p => p.length < 4 ? p + k : p)
                }} className="h-14 rounded-xl text-xl font-bold font-['Nunito'] bg-purple-50 hover:bg-purple-100 text-purple-700 transition">{k}</button>
              ))}
            </div>
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {step === 'dash' && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-black text-purple-700 font-['Nunito']">📊 {t('todayProgress', lang)}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-['Nunito'] leading-none">&times;</button>
            </div>
            <div className="space-y-3">
              {[
                { icon: '⭐', label: t('starsEarned', lang), val: '24', bg: 'from-yellow-100 to-amber-100', border: 'border-yellow-200', tc: 'text-amber-700' },
                { icon: '📚', label: t('subjectsDone', lang), val: '3', bg: 'from-blue-100 to-indigo-100', border: 'border-blue-200', tc: 'text-blue-700' },
                { icon: '🔥', label: t('streak', lang), val: '5 days', bg: 'from-orange-100 to-red-100', border: 'border-orange-200', tc: 'text-orange-700' },
                { icon: '⏱️', label: 'Time Today', val: '18 min', bg: 'from-green-100 to-emerald-100', border: 'border-green-200', tc: 'text-emerald-700' },
                { icon: '🎯', label: 'Accuracy', val: '87%', bg: 'from-purple-100 to-pink-100', border: 'border-purple-200', tc: 'text-purple-700' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }} className={`flex items-center gap-3 bg-gradient-to-r ${s.bg} rounded-2xl p-3.5 border-2 ${s.border}`}>
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`font-bold text-sm flex-1 ${s.tc} font-['Nunito']`}>{s.label}</span>
                  <span className={`font-black text-lg ${s.tc} font-['Nunito']`}>{s.val}</span>
                </motion.div>
              ))}
            </div>
            <button onClick={() => { setStep('lock'); setProgress(0) }} className="w-full mt-5 h-12 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold font-['Nunito'] transition">{t('close', lang)}</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════
//  LANGUAGE SELECTOR
// ═══════════════════════════════════════════════
const LangSwitcher = ({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md hover:shadow-lg flex items-center gap-1.5 text-sm font-bold text-purple-600 font-['Nunito'] transition" aria-label="Change language">
        🌐 <span className="hidden sm:inline">{lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'Hing'}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-purple-100 overflow-hidden z-40 min-w-[130px]">
            {LANGS.map(l => (
              <button key={l} onClick={() => { onChange(l); setOpen(false) }} className={`w-full text-left px-4 py-2.5 font-bold font-['Nunito'] text-sm hover:bg-purple-50 transition ${lang === l ? 'bg-purple-100 text-purple-700' : 'text-gray-700'}`}>
                {l === 'en' ? '🇬🇧 English' : l === 'hi' ? '🇮🇳 हिंदी' : '🇮🇳 Hinglish'}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════
export default function JuniorLearningPage() {
  const [lang, setLang] = useState<Lang>('hinglish')
  const [stars, setStars] = useState(0)
  const [subject, setSubject] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showWin, setShowWin] = useState(false)
  const [gajjuState, setGajjuState] = useState('idle')
  const [msg, setMsg] = useState('')
  const [parentOpen, setParentOpen] = useState(false)
  const [welcomeDone, setWelcomeDone] = useState(false)

  const gajjuSpeak = useCallback((text: string, after?: () => void) => {
    setGajjuState('speak')
    speak(text, lang)
    setTimeout(() => { setGajjuState('idle'); after?.() }, text.length * 90 + 400)
  }, [lang])

  // Welcome on mount
  useEffect(() => {
    const t = setTimeout(() => {
      const greeting = lang === 'hi'
        ? 'नमस्ते! आज हम क्या सीखेंगे?'
        : lang === 'hinglish'
        ? 'नमस्ते! आज क्या सीखेंगे?'
        : 'Namaste! What shall we learn today?'
      gajjuSpeak(greeting, () => setWelcomeDone(true))
    }, 500)
    return () => clearTimeout(t)
  }, [lang, gajjuSpeak])

  // Load voices
  useEffect(() => { speechSynthesis.getVoices() }, [])

  const selectSubject = (s: string) => {
    setSubject(s)
    setGajjuState('speak')
    const msgs: Record<string, string> = {
      maths:   lang === 'en' ? "Let's learn multiplication!"  : 'चलो गुणा सीखते हैं!',
      english: lang === 'en' ? "Let's learn new words!"        : 'चलो नए शब्द सीखते हैं!',
      science: lang === 'en' ? "Let's explore science!"         : 'चलो विज्ञान की खोज करते हैं!',
      gk:      lang === 'en' ? "Let's learn about our world!"   : 'चलो दुनिया के बारे में जानें!',
    }
    speak(msgs[s] ?? 'आइए शुरू करें!', lang)
    setTimeout(() => setGajjuState('idle'), 1800)
  }

  const addStar = () => {
    setStars(s => s + 1)
    setGajjuState('win')
    setShowConfetti(true)
    setShowWin(true)
    cheer()
    setTimeout(() => { setGajjuState('idle'); setShowConfetti(false); setShowWin(false) }, 3500)
  }

  const switchLang = (l: Lang) => {
    setLang(l)
    setSubject(null)
    setWelcomeDone(false)
    setTimeout(() => {
      const greeting = l === 'hi' ? 'नमस्ते! आज हम क्या सीखेंगे?' : l === 'hinglish' ? 'नमस्ते! आज क्या सीखेंगे?' : 'Namaste! What shall we learn today?'
      gajjuSpeak(greeting, () => setWelcomeDone(true))
    }, 300)
  }

  return (
    <div className="relative min-h-screen overflow-hidden font-['Nunito']" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #c7d2fe 25%, #a5b4fc 50%, #ddd6fe 75%, #ede9fe 100%)' }}>
      {/* Decorative background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full opacity-25"
            style={{ width: 60 + i * 30, height: 60 + i * 30, left: `${5 + i * 12}%`, top: `${(i * 13) % 90}%`, background: ['#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#60a5fa', '#fb923c'][i % 6] }}
            animate={{ y: [0, -18, 0], x: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Header bar */}
      <header className="relative z-10 flex justify-between items-center p-3 sm:p-5">
        <StarCounter count={stars} onAdd={addStar} />
        <LangSwitcher lang={lang} onChange={switchLang} />
      </header>

      {/* Main content */}
      <main className="relative z-10 px-3 sm:px-6 pb-24 max-w-lg mx-auto flex flex-col items-center">

        {/* Character + bubble */}
        <motion.div className="relative flex flex-col items-center mb-2" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          {/* Speech bubble */}
          <AnimatePresence>
            {(gajjuState === 'speak' || welcomeDone) && (
              <motion.div initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="relative mb-[-10px] z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg border-2 border-purple-200 text-purple-800 font-bold text-base sm:text-lg text-center max-w-[240px] font-['Nunito'] leading-snug">
                  {t('subtitle', lang)}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-r-2 border-b-2 border-purple-200 rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Gajju state={gajjuState} />

          {/* Win sparkles overlay */}
          <AnimatePresence>
            {showWin && (
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-7xl animate-bounce">🏆</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message toast */}
        <AnimatePresence>
          {msg && (
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mb-4">
              <span className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 shadow-lg text-purple-700 font-black text-base sm:text-lg font-['Nunito']">{msg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subject grid OR Quiz */}
        <div className="w-full mt-4">
          <AnimatePresence mode="wait">
            {!subject ? (
              <motion.div key="subjects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }}>
                <h2 className="text-center text-purple-600/80 font-bold text-base sm:text-lg mb-5 font-['Nunito']">👇 {t('subtitle', lang)}</h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {subjects.map((s, i) => (
                    <SubjectCard key={s.key} subj={s} onTap={selectSubject} lang={lang} idx={i} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="quiz" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <QuizScreen subject={subject} lang={lang} onBack={() => { setSubject(null); setMsg(''); setShowConfetti(false); setShowWin(false); setGajjuState('idle'); gajjuSpeak('वापस आ गए! आज और क्या सीखेंगे?') }} onCorrect={addStar} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Parent Corner trigger – long press */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-30">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center cursor-pointer select-none touch-none transition"
          onTouchStart={() => {
            let p = 0, id: number
            const tick = () => {
              p += 8
              if (p >= 100) { clearInterval(id); setParentOpen(true) }
            }
            id = window.setInterval(tick, 100)
            const clear = () => { clearInterval(id) }
            ;(window as any)._pcClear = clear
          }}
          onTouchEnd={() => (window as any)._pcClear?.()}
          onMouseDown={() => {
            let p = 0, id: number
            const tick = () => { p += 8; if (p >= 100) { clearInterval(id); setParentOpen(true) } }
            id = window.setInterval(tick, 100)
            const clear = () => clearInterval(id)
            const up = () => { clear(); window.removeEventListener('mouseup', up) }
            window.addEventListener('mouseup', up)
          }}
          role="button"
          aria-label="Parent Corner – long press to open"
          title="👨‍👩‍👧 Parent Corner"
        >
          <span className="text-sm sm:text-base">🔒</span>
        </div>
      </div>

      <ParentCorner open={parentOpen} onClose={() => setParentOpen(false)} lang={lang} />
      <Confetti active={showConfetti} />
    </div>
  )
}
