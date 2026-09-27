'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import {
  Flame, Zap, Target, Trophy, ArrowRight, BookOpen, WifiOff,
  Brain, PenTool, LineChart, Languages, Sparkles, ChevronRight,
  Play, CheckCircle2, Quote, Star, type LucideIcon,
} from 'lucide-react'
import {
  AuroraBackground, CustomCursor, MagneticButton, TiltCard,
  ScrollReveal, AnimatedCounter, GlowCard, RippleButton,
  TextReveal, GradientOrb, Spotlight, Marquee, Typewriter,
  BorderBeam, StaggerContainer, StaggerItem, PremiumProgress,
} from '@/components/premium'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-brand-gradient origin-left z-[100]" />
}

function FloatingOrbs() {
  return (
    <>
      <GradientOrb className="top-20 left-1/4" size={288} speed={8} />
      <GradientOrb className="top-40 right-1/4" size={384} colors={['#d946ef', '#8b5cf6', '#6366f1']} speed={10} />
      <GradientOrb className="bottom-20 left-1/3" size={320} colors={['#38bdf8', '#6366f1', '#d946ef']} speed={12} />
    </>
  )
}

function HeroQuiz() {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const question = {
    text: 'Identify the poetic device: "The wind whispered through the trees."',
    options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
    correct: 2,
    explanation: 'The wind is given the human ability to "whisper" — that is personification. Non-human things doing human actions = personification.',
  }
  return (
    <TiltCard maxTilt={8} className="max-w-md w-full">
      <Spotlight className="glass-card rounded-3xl p-6 md:p-8" size={500}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-surface-600">Atlas AI:</span>
          <span className="badge-brand ml-auto">Live Quiz</span>
        </div>
        <p className="text-white font-medium mb-6 text-sm leading-relaxed">{question.text}</p>
        <div className="space-y-2.5">
          {question.options.map((opt, i) => (
            <button key={i}
              onClick={() => { setSelected(i); setShowResult(true) }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 border quiz-option ${
                showResult
                  ? i === question.correct ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : i === selected ? 'bg-red-500/15 border-red-500/40 text-red-300'
                    : 'bg-surface-200/40 border-surface-300/30 text-surface-600'
                  : selected === i ? 'bg-brand-500/15 border-brand-500/40 text-brand-300'
                    : 'bg-surface-200/40 border-surface-300/30 text-surface-700 hover:border-brand-500/30 hover:bg-surface-200/60'
              }`}
            >
              <span className="font-mono text-xs text-surface-500 mr-3">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {showResult && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-surface-300/30 overflow-hidden"
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-5 h-5 text-white" /></div>
                </div>
                <p className="text-xs text-surface-600 leading-relaxed pt-1">
                  <span className="text-brand-300 font-medium">Atlas AI: </span>{question.explanation}
                </p>
              </div>
              <button onClick={() => { setSelected(null); setShowResult(false) }} className="btn-ghost mt-3 text-xs">Try again →</button>
            </motion.div>
          )}
        </AnimatePresence>
      </Spotlight>
    </TiltCard>
  )
}

function XPBar() {
  return (
    <TiltCard maxTilt={6}>
      <GlowCard className="glass-card rounded-2xl p-5" glowColor="rgba(99,102,241,0.25)" glowSize={200}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display text-xl font-bold text-white">2,450 XP</div>
            <div className="text-xs text-surface-600">Level 12 · Scholar</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-surface-600 mb-1.5">
            <span>Level 12</span><span>550 / 1000 XP</span>
          </div>
          <PremiumProgress progress={55} />
        </div>
      </GlowCard>
    </TiltCard>
  )
}

function StreakCard() {
  return (
    <TiltCard maxTilt={6}>
      <GlowCard className="glass-card rounded-2xl p-5" glowColor="rgba(251,191,36,0.25)" glowSize={200}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-600 flex items-center justify-center shadow-glow">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display text-xl font-bold text-white">4 day streak!</div>
            <div className="text-xs text-surface-600">Keep it up</div>
          </div>
        </div>
        <div className="flex gap-1.5 mt-3">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
              i < 4 ? 'bg-gradient-to-b from-gold-500/30 to-accent-600/20 border border-gold-500/40 text-gold-300'
              : 'bg-surface-200/40 border border-surface-300/20 text-surface-600'
            }`}>{i < 4 ? '' : d}</div>
          ))}
        </div>
      </GlowCard>
    </TiltCard>
  )
}

function MasteryRing({ percent, label, color }: { percent: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (percent / 100) * circumference
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <motion.circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-base font-bold text-white">{percent}%</span>
        </div>
      </div>
      <span className="text-xs text-surface-600">{label}</span>
    </div>
  )
}

function BadgeShowcase() {
  const badges = [
    { emoji: '', label: 'Quiz Master', color: 'from-gold-400 to-gold-600' },
    { emoji: '', label: 'Bookworm', color: 'from-brand-400 to-brand-600' },
    { emoji: '', label: 'Speed Learner', color: 'from-accent-400 to-accent-600' },
    { emoji: '', label: 'Sharp Shooter', color: 'from-mint-400 to-mint-600' },
    { emoji: '', label: 'On Fire', color: 'from-accent-500 to-accent-700' },
    { emoji: '', label: 'Rising Star', color: 'from-gold-400 to-gold-500' },
  ]
  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map((b, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
          className="glass-card rounded-xl p-3 flex flex-col items-center gap-1.5"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center text-lg shadow-glow`}>
            {b.emoji}
          </div>
          <span className="text-[10px] text-surface-600 text-center font-medium">{b.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function LeaderboardPreview() {
  const players = [
    { name: 'Aarav', xp: 3420, avatar: '', you: false },
    { name: 'Priya', xp: 3180, avatar: '', you: false },
    { name: 'You', xp: 2450, avatar: '', you: true },
    { name: 'Kabir', xp: 2100, avatar: '', you: false },
    { name: 'Ananya', xp: 1890, avatar: '', you: false },
  ]
  return (
    <TiltCard maxTilt={5}>
      <Spotlight className="glass-card rounded-2xl p-5" size={300}>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-gold-400" />
          <span className="text-sm font-medium text-white">Weekly Leaderboard</span>
        </div>
        <div className="space-y-2">
          {players.map((p, i) => (
            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
              p.you ? 'bg-brand-500/15 border border-brand-500/30' : ''
            }`}>
              <span className={`text-xs font-bold w-5 ${i === 0 ? 'text-gold-400' : i === 1 ? 'text-surface-400' : i === 2 ? 'text-accent-400' : 'text-surface-600'}`}>
                {i + 1}
              </span>
              <span className="text-lg">{p.avatar}</span>
              <span className={`text-sm flex-1 ${p.you ? 'text-brand-300 font-medium' : 'text-surface-600'}`}>{p.name}</span>
              <span className="text-xs font-mono text-surface-500">{p.xp.toLocaleString('en-IN')} XP</span>
            </div>
          ))}
        </div>
      </Spotlight>
    </TiltCard>
  )
}

const features: { icon: LucideIcon; title: string; desc: string; gradient: string; glow: string }[] = [
  { icon: Brain, title: 'AI Tutor Atlas AI', desc: 'Atlas AI never gives direct answers — it asks questions that help you discover answers yourself. Like a smart friend who actually cares.', gradient: 'from-brand-500 to-brand-700', glow: 'rgba(99,102,241,0.3)' },
  { icon: PenTool, title: 'Answer Sheet Grading', desc: 'Upload your handwritten answers. AI reads them, grades against CBSE/CISCE rubrics, and tells you exactly where you lost marks.', gradient: 'from-accent-500 to-accent-700', glow: 'rgba(217,70,239,0.3)' },
  { icon: LineChart, title: 'Smart Learning Path', desc: 'AI knows what you have mastered and what is next. No wasting time on stuff you already know — focus on what matters.', gradient: 'from-brand-500 to-brand-700', glow: 'rgba(99,102,241,0.3)' },
  { icon: WifiOff, title: 'Offline Mode', desc: 'No internet? No problem. Download lessons, study anywhere — bus, train, village. Syncs automatically when you are back online.', gradient: 'from-mint-500 to-mint-700', glow: 'rgba(52,211,153,0.3)' },
  { icon: Languages, title: 'Hindi + English', desc: 'Content mixes Hindi and English naturally — the way you actually think and talk with friends. No confusing jargon.', gradient: 'from-accent-500 to-accent-700', glow: 'rgba(217,70,239,0.3)' },
  { icon: Trophy, title: 'Earn XP & Badges', desc: 'Level up like a game. Earn XP, unlock badges, climb leaderboards. Learning that feels like playing, not studying.', gradient: 'from-gold-500 to-gold-700', glow: 'rgba(251,191,36,0.3)' },
]

const steps = [
  { step: '01', title: 'Take a Quick Quiz', desc: 'A 10-minute quiz finds exactly what you know and what you do not. Not a boring test — more like a game that scans your brain.', icon: Target },
  { step: '02', title: 'Get Your Path', desc: 'Atlas AI builds a custom learning path just for you. It knows your weak spots, your strong spots, and what is coming in your board exam.', icon: Brain },
  { step: '03', title: 'Level Up & Win', desc: 'Learn with interactive lessons, earn XP, keep your streak alive, and watch your mastery grow. Before you know it, you are ready to ace that exam.', icon: Trophy },
]

const testimonials = [
  { name: 'Aarav', class: 'Class 10, CBSE', text: 'Pehle mujhe English bilkul pasand nahi tha. Atlas AI ne aise questions pooche ki mujhe khud answer dhoondhna pada. Ab mujhe poems samajh aate hain!', avatar: '' },
  { name: 'Priya', class: 'Class 9, CISCE', text: 'The streak system is addictive. I have not missed a single day in 47 days. My mom is shocked that I actually want to study.', avatar: '' },
  { name: 'Kabir', class: 'Class 8, CBSE', text: 'I live in a village with slow internet. The offline mode is a lifesaver. I download lessons at school and study at home.', avatar: '' },
  { name: 'Ananya', class: 'Class 10, CBSE', text: 'Answer sheet grading is magic. I uploaded my practice paper and got detailed feedback in seconds. Better than my tuition teacher.', avatar: '' },
]

export default function LandingPage() {
  const [board, setBoard] = useState<'CBSE' | 'CISCE'>('CBSE')

  return (
    <div className="min-h-screen bg-surface-0 overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AuroraBackground intensity="medium" speed="slow" />

      <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-surface-300/30"
      >
        <div className="section-padding h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <motion.div whileHover={{ rotate: 180, scale: 1.1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Atlas
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#gamify" className="nav-link">Level Up</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-ghost hidden sm:flex">Log In</button>
            <MagneticButton strength={0.3}>
              <button className="btn-primary">
                Start Free <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      <section className="relative pt-32 pb-20 section-padding min-h-screen flex items-center overflow-hidden">
        <FloatingOrbs />
        <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <StaggerContainer stagger={0.1}>
              <StaggerItem>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 mb-6">
                  <Sparkles className="w-4 h-4 text-brand-300" />
                  <span className="text-xs text-surface-600 font-medium">AI-Powered Learning for Bharat</span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
                  <TextReveal text="Your AI tutor" />
                  <br />
                  <TextReveal text="figures it out" delay={0.3} className="text-aurora" />
                  <br />
                  <TextReveal text="with you." delay={0.6} />
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-surface-600 max-w-md mx-auto lg:mx-0 mb-8">
                  Adaptive learning, Socratic tutoring, and gamified mastery for CBSE & CISCE — Class 1 to 12.
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                  <MagneticButton strength={0.4}>
                    <button className="btn-primary">
                      Start Learning Free
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={0.25}>
                    <button className="btn-secondary">
                      <Play className="w-4 h-4" />
                      Watch Demo
                    </button>
                  </MagneticButton>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-center gap-6 justify-center lg:justify-start">
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-white">
                      <AnimatedCounter value={20000} suffix="+" />
                    </div>
                    <div className="text-xs text-surface-600">Knowledge Nodes</div>
                  </div>
                  <div className="w-px h-10 bg-surface-300/40" />
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-white">
                      <AnimatedCounter value={500} suffix="+" />
                    </div>
                    <div className="text-xs text-surface-600">Active Students</div>
                  </div>
                  <div className="w-px h-10 bg-surface-300/40" />
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-white">
                      <AnimatedCounter value={22} suffix="+" />
                    </div>
                    <div className="text-xs text-surface-600">Languages</div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <HeroQuiz />
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <XPBar />
              <StreakCard />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-6 border-y border-surface-300/20">
        <Marquee speed={30}>
          {['AI Socratic Tutor', '20,000+ Knowledge Nodes', 'Offline-First PWA', 'CBSE + CISCE', 'Bilingual Learning', 'Adaptive Mastery', 'Gamified XP', 'Class 1-12'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-6">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="font-display text-xl font-bold text-surface-700">{item}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Features */}
      <section id="features" className="py-24 section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="blur">
            <div className="text-center mb-16">
              <span className="badge-brand mb-4">Features</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Everything you need to <span className="text-aurora">ace your exams</span>
              </h2>
              <p className="text-surface-600 max-w-2xl mx-auto">
                Built specifically for Indian students. Every feature designed to make learning feel natural, not forced.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <TiltCard maxTilt={10} className="h-full">
                  <GlowCard className="glass-card rounded-2xl p-6 h-full" glowColor={feature.glow} glowSize={250}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-glow mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-surface-600 leading-relaxed">{feature.desc}</p>
                  </GlowCard>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="blur">
            <div className="text-center mb-16">
              <span className="badge-accent mb-4">How It Works</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Three steps to <span className="gradient-text">mastery</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.15}>
                <div className="relative">
                  <div className="absolute -top-4 -left-2 font-display text-7xl font-bold text-brand-500/10 select-none">
                    {step.step}
                  </div>
                  <div className="relative glass-card rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow mb-4">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-surface-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section id="gamify" className="py-24 section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="blur">
            <div className="text-center mb-16">
              <span className="badge-warning mb-4">Level Up</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Learning that feels like <span className="text-shimmer-gold">playing</span>
              </h2>
              <p className="text-surface-600 max-w-2xl mx-auto">
                Earn XP, keep streaks alive, unlock badges, and climb leaderboards. Because motivation matters.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            <ScrollReveal direction="up">
              <BorderBeam className="glass-card rounded-2xl p-6" duration={5}>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-gold-400" />
                  <span className="text-sm font-medium text-white">Mastery Rings</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <MasteryRing percent={85} label="Algebra" color="#a855f7" />
                  <MasteryRing percent={70} label="Geometry" color="#34d399" />
                  <MasteryRing percent={92} label="Physics" color="#c084fc" />
                  <MasteryRing percent={60} label="Chem" color="#fb7185" />
                </div>
              </BorderBeam>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <BorderBeam className="glass-card rounded-2xl p-6" duration={4}>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-gold-400" />
                  <span className="text-sm font-medium text-white">Badges</span>
                </div>
                <BadgeShowcase />
              </BorderBeam>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <LeaderboardPreview />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="blur">
            <div className="text-center mb-16">
              <span className="badge-success mb-4">Student Stories</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Real students. <span className="gradient-text-accent">Real results.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                <TiltCard maxTilt={5}>
                  <Spotlight className="glass-card rounded-2xl p-6" size={400}>
                    <Quote className="w-8 h-8 text-brand-500/30 mb-4" />
                    <p className="text-sm text-surface-700 leading-relaxed mb-4">{t.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-lg shadow-glow">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{t.name}</div>
                        <div className="text-xs text-surface-600">{t.class}</div>
                      </div>
                    </div>
                  </Spotlight>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="blur">
            <div className="text-center mb-16">
              <span className="badge-brand mb-4">Pricing</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Simple, <span className="text-aurora">honest</span> pricing
              </h2>
              <p className="text-surface-600 max-w-2xl mx-auto">
                One price. No hidden fees. No ads. No selling your data. Just learning.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale">
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <TiltCard maxTilt={8}>
                <div className="glass-card rounded-2xl p-8">
                  <h3 className="font-display text-xl font-bold text-white mb-2">Free</h3>
                  <p className="text-xs text-surface-600 mb-6">Start your journey</p>
                  <div className="font-display text-4xl font-bold text-white mb-6">
                    {'\u20B9'}0<span className="text-sm text-surface-600 font-normal">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {['10 lessons per day', 'Basic AI tutor', 'Practice quizzes', 'Progress tracking'].map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-surface-600">
                        <CheckCircle2 className="w-4 h-4 text-mint-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton strength={0.3}>
                    <button className="btn-secondary w-full">Get Started</button>
                  </MagneticButton>
                </div>
              </TiltCard>

              <TiltCard maxTilt={8}>
                <BorderBeam className="glass-card rounded-2xl p-8 relative" duration={4}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-brand">Most Popular</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Premium</h3>
                  <p className="text-xs text-surface-600 mb-6">Unlock everything</p>
                  <div className="font-display text-4xl font-bold text-white mb-6">
                    {'\u20B9'}299<span className="text-sm text-surface-600 font-normal">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {['Unlimited lessons', 'Full AI Socratic tutor', 'Answer sheet grading', 'Exam simulator', 'Offline mode', 'All languages', 'No ads, ever'].map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-surface-600">
                        <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton strength={0.4}>
                    <Link href="/premium/signup?plan=premium" className="block">
                      <RippleButton className="btn-primary w-full">
                        Go Premium
                        <ArrowRight className="w-4 h-4" />
                      </RippleButton>
                    </Link>
                  </MagneticButton>
                  {/* Checkout hook-up point: once a payment provider is
                      connected, /premium/signup?plan=premium should open
                      the checkout; today it captures intent + account. */}
                </BorderBeam>
              </TiltCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 section-padding">
        <ScrollReveal direction="scale">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative glass-card rounded-3xl p-12 overflow-hidden">
              <GradientOrb className="-top-20 -right-20" size={300} speed={6} />
              <GradientOrb className="-bottom-20 -left-20" size={250} colors={['#d946ef', '#38bdf8', '#6366f1']} speed={8} />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-8 h-8 text-white" /></div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
                  Ready to start learning?
                </h2>
                <p className="text-surface-600 mb-8 max-w-md mx-auto">
                  Join 500+ students who are learning smarter, not harder.
                </p>
                <MagneticButton strength={0.4}>
                  <RippleButton className="btn-primary text-base px-8 py-4">
                    Start Free Today
                    <ArrowRight className="w-5 h-5" />
                  </RippleButton>
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-surface-300/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Atlas
              </span>
            </div>
            <p className="text-xs text-surface-600">
              AI-Powered Learning for Bharat · CBSE & CISCE · Class 1-12
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
