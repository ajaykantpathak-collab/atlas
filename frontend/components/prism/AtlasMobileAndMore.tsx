'use client'
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Home,
  BookOpen,
  PenTool,
  ScanSearch,
  User,
  ChevronRight,
  X,
  Lightbulb,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Clock,
  Flag,
  Trophy,
  Maximize2,
  Save,
  Zap,
  Flame,
  Target,
  TrendingUp,
  Award,
  Crown,
  Star,
} from "lucide-react";

// ─────────────────────────────────────────────
// TOKENS & TYPES
// ─────────────────────────────────────────────
const T = {
  gold: "#F5A623",
  goldLight: "#FFD194",
  goldDark: "#C7841A",
  goldMuted: "rgba(245,166,35,0.15)",
  cream: "#F0EAD6",
  surface: "#1C1C3A",
  surfaceLight: "#2A2A52",
  surfaceLighter: "#353568",
  surfaceDark: "#13132A",
  ink: "#0D0D1F",
  success: "#4CAF82",
  danger: "#E0556A",
  dangerLight: "#FF6B7A",
  white: "#FFFFFF",
};

const SUBJECTS = [
  { key: "math", label: "Mathematics", icon: "∑" },
  { key: "science", label: "Science", icon: "⚗" },
  { key: "english", label: "English", icon: "A" },
  { key: "social", label: "Social Studies", icon: "🌍" },
  { key: "hindi", label: "Hindi", icon: "अ" },
  { key: "cs", label: "Computer Sci.", icon: "💻" },
];

const QUES_TYPES = [
  { key: "clarifying", label: "Clarifying", color: "#4A9EFF" },
  { key: "probing", label: "Probing", color: "#C77DFF" },
  { key: "assumptions", label: "Assumptions", color: "#FF8C5A" },
  { key: "evidence", label: "Evidence", color: "#4CAF82" },
  { key: "redirect", label: "Redirect", color: "#F5A623" },
];

// ─────────────────────────────────────────────
// SOUND MANAGER  (Web Audio API, no files)
// ─────────────────────────────────────────────
type UISoundType = "click" | "hover" | "toggle" | "success" | "error" | "whoosh";
type AchievementTier = "bronze" | "silver" | "gold" | "prism";
type AmbienceMood = "dawn" | "day" | "dusk" | "night";
type CompanionMood = "happy" | "thinking" | "celebrating";

class SoundManagerClass {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private volume = 0.4;
  private muted = false;
  private ambienceGain: GainNode | null = null;
  private activeNodes: OscillatorNode[] = [];
  private static _instance: SoundManagerClass | null = null;

  static get instance(): SoundManagerClass {
    if (!SoundManagerClass._instance)
      SoundManagerClass._instance = new SoundManagerClass();
    return SoundManagerClass._instance;
  }

  private init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;
      this.master.connect(this.ctx.destination);
    } catch {}
  }

  /** Public initializer — safe to call on user interaction. */
  public initAudio() {
    this.init();
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType = "sine",
    vol = 0.2,
    glide?: number,
    startOff = 0,
    attack = 0.01,
    release = 0.04
  ) {
    if (!this.ctx || !this.master || this.muted) return;
    const t = this.ctx.currentTime + startOff;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    if (glide) {
      o.frequency.setValueAtTime(freq - glide, t);
      o.frequency.linearRampToValueAtTime(freq, t + 0.06);
    } else o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  playUISound(type: UISoundType) {
    this.init();
    if (this.muted) return;
    const map: Record<UISoundType, any> = {
      click: () => {
        this.tone(880, 0.08, "triangle", 0.18);
        setTimeout(() => this.tone(1100, 0.05, "triangle", 0.12), 40);
      },
      hover: () => this.tone(600, 0.05, "sine", 0.06),
      toggle: () => {
        this.tone(523, 0.08, "triangle", 0.15);
        setTimeout(() => this.tone(659, 0.08, "triangle", 0.15), 60);
      },
      success: () => {
        this.tone(523, 0.12, "sine", 0.15);
        setTimeout(() => this.tone(659, 0.12, "sine", 0.15), 100);
        setTimeout(() => this.tone(784, 0.2, "sine", 0.18), 200);
      },
      error: () => {
        this.tone(200, 0.15, "sawtooth", 0.1);
        setTimeout(() => this.tone(160, 0.2, "sawtooth", 0.1), 120);
      },
      whoosh: () => {
        for (let i = 0; i < 20; i++)
          this.tone(300 + i * 60, 0.08, "sawtooth", 0.01, undefined, i * 0.02);
      },
    };
    map[type]();
  }

  playAchievement(tier: AchievementTier) {
    this.init();
    if (this.muted) return;
    const m: Record<AchievementTier, number[]> = {
      bronze: [523, 659, 784],
      silver: [659, 784, 988, 1175],
      gold: [784, 988, 1175, 1319, 1568],
      prism: [523, 659, 784, 988, 1175, 1319, 1568, 1976],
    };
    const notes = m[tier];
    const int = 0.12;
    notes.forEach((f, i) =>
      this.tone(f, 0.35, "sine", 0.2 - i * 0.015, 30, i * int)
    );
  }

  startWorldAmbience(mood: AmbienceMood) {
    this.stopAmbience();
    this.init();
    if (this.muted || !this.ctx || !this.master) return;
    const defs: Record<
      AmbienceMood,
      { freqs: number[]; lfo: number; lfoDepth: number; speed: number }
    > = {
      dawn: { freqs: [220, 277, 330], lfo: 0.08, lfoDepth: 4, speed: 0.4 },
      day: { freqs: [196, 247, 294], lfo: 0.12, lfoDepth: 2, speed: 0.6 },
      dusk: { freqs: [175, 220, 262], lfo: 0.06, lfoDepth: 6, speed: 0.35 },
      night: { freqs: [165, 196, 247], lfo: 0.04, lfoDepth: 3, speed: 0.25 },
    };
    const d = defs[mood];
    this.ambienceGain = this.ctx.createGain();
    this.ambienceGain.gain.value = 0.06;
    this.ambienceGain.connect(this.master);
    const lfo = this.ctx.createOscillator();
    const lfoG = this.ctx.createGain();
    lfo.frequency.value = d.lfo;
    lfoG.gain.value = d.lfoDepth;
    lfo.connect(lfoG);
    lfo.start();
    this.activeNodes.push(lfo);
    d.freqs.forEach(f => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      lfoG.connect(g.gain);
      g.gain.value = 0.03;
      o.connect(g).connect(this.ambienceGain);
      o.start();
      this.activeNodes.push(o);
    });
  }

  stopAmbience() {
    this.activeNodes.forEach(n => {
      try { n.stop(); } catch {}
    });
    this.activeNodes = [];
    if (this.ambienceGain) {
      try {
        this.ambienceGain.disconnect();
      } catch {}
      this.ambienceGain = null;
    }
  }

  playCompanionSound(mood: CompanionMood) {
    this.init();
    if (this.muted) return;
    const m: Record<CompanionMood, number[]> = {
      happy: [523, 659, 784, 1047],
      thinking: [440, 494, 523],
      celebrating: [659, 784, 988, 1175, 1319, 1568],
    };
    const notes = m[mood];
    const int = mood === "celebrating" ? 0.1 : 0.15;
    notes.forEach((f, i) =>
      this.tone(f, 0.3, "sine", 0.15, 20, i * int)
    );
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master) this.master.gain.value = this.volume;
  }

  mute() {
    this.muted = true;
    if (this.master) this.master.gain.value = 0;
  }

  unmute() {
    this.muted = false;
    if (this.master) this.master.gain.value = this.volume;
  }

  toggleMute() {
    this.muted ? this.unmute() : this.mute();
    return this.muted;
  }
}

export const SoundManager = SoundManagerClass.instance;

// ─────────────────────────────────────────────
// 1. ATLAS MOBILE NAV
// ─────────────────────────────────────────────
type NavTab = "home" | "learn" | "practice" | "solver" | "profile";

const NAV_ITEMS: { key: NavTab; icon: any; label: string }[] = [
  { key: "home", icon: Home, label: "Home" },
  { key: "learn", icon: BookOpen, label: "Learn" },
  { key: "practice", icon: PenTool, label: "Practice" },
  { key: "solver", icon: ScanSearch, label: "Solver" },
  { key: "profile", icon: User, label: "Profile" },
];

export function AtlasMobileNav({
  active,
  onChange,
  streak,
}: {
  active: NavTab;
  onChange: (t: NavTab) => void;
  streak: number;
}) {
  const [swipeHint, setSwipeHint] = useState(true);
  const idx = NAV_ITEMS.findIndex(i => i.key === active);

  useEffect(() => {
    const t = setTimeout(() => setSwipeHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleTab = (t: NavTab) => {
    SoundManager.playUISound("click");
    onChange(t);
  };

  return (
    <>
      <style>{mobileNavStyles}</style>
      <nav className="atlas-mobile-nav">
        <div className="atlas-mobile-nav__track">
          <motion.div
            className="atlas-mobile-nav__indicator"
            animate={{ x: `${idx * 20}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                className={`atlas-mobile-nav__tab ${isActive ? "atlas-mobile-nav__tab--active" : ""}`}
                onClick={() => handleTab(item.key)}
              >
                <div className="atlas-mobile-nav__icon-wrap">
                  <Icon size={22} strokeWidth={isActive ? 2.2 : 1.6} />
                  {isActive && (
                    <motion.div
                      className="atlas-mobile-nav__glow"
                      layoutId="navGlow"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </div>
                <span className="atlas-mobile-nav__label">{item.label}</span>
                {item.key === "profile" && streak > 0 && (
                  <motion.span
                    className="atlas-mobile-nav__streak"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.3 }}
                  >
                    <Flame size={10} fill={T.gold} stroke={T.goldDark} />
                    {streak}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>

        {/* Floating companion */}
        <motion.div
          className="atlas-mobile-nav__companion"
          animate={{ x: `${idx * 20 + 10}%` }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          style={{ bottom: 62 }}
        >
          <CompanionMini />
        </motion.div>

        {swipeHint && (
          <motion.div
            className="atlas-mobile-nav__hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          >
            <span>Swipe to explore</span>
            <ChevronRight size={14} />
          </motion.div>
        )}
      </nav>
    </>
  );
}

function CompanionMini() {
  const [look, setLook] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setLook({ x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 6 });
    }, 1200);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.svg width="40" height="40" viewBox="0 0 40 40" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
      <circle cx="20" cy="20" r="15" fill={T.gold} opacity="0.18" />
      <circle cx="20" cy="20" r="12" fill={T.gold} opacity="0.3" />
      <circle cx="20" cy="20" r="8" fill={T.gold} />
      <motion.circle initial={{ cx: 17 }} animate={{ cx: 17 + look.x * 0.3 }} transition={{ duration: 0.4 }} cy="18" r="2" fill={T.surfaceDark} />
      <motion.circle initial={{ cx: 23 }} animate={{ cx: 23 + look.x * 0.3 }} transition={{ duration: 0.4 }} cy="18" r="2" fill={T.surfaceDark} />
      <ellipse cx="20" cy="23" rx="2.5" ry="1.2" fill={T.surfaceDark} opacity="0.6" />
    </motion.svg>
  );
}

const mobileNavStyles = `
  .atlas-mobile-nav{position:fixed;bottom:0;left:0;right:0;z-index:100;padding:6px 10px 14px;
    background:linear-gradient(to top,${T.surfaceDark} 65%,transparent)}
  .atlas-mobile-nav__track{position:relative;display:flex;justify-content:space-around;
    background:${T.surfaceLight};border-radius:22px;padding:6px 4px;
    box-shadow:0 -4px 24px rgba(0,0,0,.35)}
  .atlas-mobile-nav__indicator{position:absolute;top:5px;left:0;width:20%;height:calc(100% - 10px);
    background:${T.goldMuted};border-radius:17px;pointer-events:none}
  .atlas-mobile-nav__tab{position:relative;z-index:2;display:flex;flex-direction:column;
    align-items:center;gap:2px;padding:4px 2px;border:none;background:none;color:${T.cream}99;
    cursor:pointer;flex:1;transition:color .25s}
  .atlas-mobile-nav__tab--active{color:${T.gold}}
  .atlas-mobile-nav__icon-wrap{position:relative;display:flex;align-items:center;justify-content:center;
    width:36px;height:36px;transition:transform .2s}
  .atlas-mobile-nav__tab:active .atlas-mobile-nav__icon-wrap{transform:scale(.88)}
  .atlas-mobile-nav__glow{position:absolute;inset:0;border-radius:50%;
    background:radial-gradient(circle,rgba(245,166,35,.35),transparent 70%);
    animation:glowPulse 1.8s ease-in-out infinite}
  @keyframes glowPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
  .atlas-mobile-nav__label{font-size:10px;font-weight:500;white-space:nowrap}
  .atlas-mobile-nav__streak{position:absolute;top:-2px;right:-6px;
    background:linear-gradient(135deg,${T.gold},${T.goldDark});color:${T.surfaceDark};
    font-size:9px;font-weight:700;border-radius:8px;padding:1px 4px;display:flex;
    align-items:center;gap:1px;box-shadow:0 2px 8px rgba(245,166,35,.5)}
  .atlas-mobile-nav__companion{position:absolute;left:10%;transform:translateX(-50%);z-index:3;
    pointer-events:none;filter:drop-shadow(0 4px 12px rgba(245,166,35,.5))}
  .atlas-mobile-nav__hint{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);
    background:${T.surfaceLight};color:${T.cream};font-size:11px;padding:5px 12px;border-radius:12px;
    white-space:nowrap;display:flex;align-items:center;gap:4px;
    box-shadow:0 4px 16px rgba(0,0,0,.4)}
`;

// ─────────────────────────────────────────────
// 2. ATLAS ONBOARDING
// ─────────────────────────────────────────────
type OnboardScreen = 0 | 1 | 2 | 3;

const ONBOARD_SCRIPTS = [
  {
    title: "Welcome to ATLAS",
    body: "Your personal compass for knowledge awaits.",
  },
  {
    title: "Your World Awaits",
    body: "Every subject is a territory waiting for you to explore.",
  },
  {
    title: "Grow Your Knowledge",
    body: "Watch your world bloom with every lesson conquered.",
  },
  {
    title: "Let's Begin",
    body: "Your companion is ready. Are you?",
  },
];

export function AtlasOnboarding({ onComplete }: { onComplete: () => void }) {
  const [screen, setScreen] = useState<OnboardScreen>(0);
  const [skip, setSkip] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef0 = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const canvasRefs = [canvasRef0, canvasRef1, canvasRef2, canvasRef3] as const;
  const rafRef0 = useRef<number>(0);
  const rafRef1 = useRef<number>(0);
  const rafRef2 = useRef<number>(0);
  const rafRef3 = useRef<number>(0);
  const rafRefs = [rafRef0, rafRef1, rafRef2, rafRef3] as const;
  const stateRef = useRef({ screen, skip });

  stateRef.current = { screen, skip };

  // Auto-advance
  useEffect(() => {
    if (skip) return;
    const iv = setInterval(() => {
      const { screen: s } = stateRef.current;
      if (s < 3) {
        setScreen((s + 1) as OnboardScreen);
        setProgress(((s + 1) / 3) * 100);
      } else {
        setSkip(true);
        SoundManager.playAchievement("gold");
        setTimeout(onComplete, 900);
      }
    }, 4200);
    return () => clearInterval(iv);
  }, [skip, onComplete]);

  // Swipe
  const touchRef = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    if (Math.abs(dx) < 50) return;
    SoundManager.playUISound("whoosh");
    if (dx < 0 && screen < 3) {
      setScreen(s => (s + 1) as OnboardScreen);
      setProgress(p => Math.min(100, p + 33.33));
    } else if (dx > 0 && screen > 0) {
      setScreen(s => (s - 1) as OnboardScreen);
      setProgress(p => Math.max(0, p - 33.33));
    }
  };

  // Canvas animations
  useEffect(() => {
    if (skip) return;
    const c = canvasRefs[screen].current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    c.width = W * dpr;
    c.height = H * dpr;
    c.style.width = W + "px";
    c.style.height = H + "px";
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const draw = (): number => {
      const t = performance.now() * 0.001;
      ctx.clearRect(0, 0, W, H);

      if (screen === 0) drawParticles(ctx, W, H, t);
      else if (screen === 1) drawWorld(ctx, W, H, t);
      else if (screen === 2) drawBloom(ctx, W, H, t);
      else if (screen === 3) drawCompanionEntry(ctx, W, H, t);

      return requestAnimationFrame(draw);
    };
    const id = draw();
    return () => cancelAnimationFrame(id);
  }, [screen, skip]);

  const skipHandler = () => {
    setSkip(true);
    SoundManager.playUISound("click");
    setTimeout(onComplete, 500);
  };

  return (
    <motion.div
      className="atlas-onboarding"
      initial={{ opacity: 1 }}
      animate={{ opacity: skip ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{onboardStyles}</style>

      {[0, 1, 2, 3].map(i => (
        <canvas
          key={i}
          ref={canvasRefs[i]}
          className={`atlas-onboarding__canvas ${i === screen ? "atlas-onboarding__canvas--active" : ""}`}
        />
      ))}

      {/* Header */}
      <div className="atlas-onboarding__header">
        <button className="atlas-onboarding__skip" onClick={skipHandler}>
          Skip
        </button>
        <div className="atlas-onboarding__dots">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="atlas-onboarding__dot"
              animate={{
                width: i === screen ? 22 : 7,
                backgroundColor: i <= screen ? T.gold : `${T.cream}44`,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="atlas-onboarding__content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="atlas-onboarding__title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {ONBOARD_SCRIPTS[screen].title}
          </motion.h1>
          <motion.p
            className="atlas-onboarding__body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {ONBOARD_SCRIPTS[screen].body}
          </motion.p>
          {screen === 3 && (
            <motion.button
              className="atlas-onboarding__cta"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                SoundManager.playAchievement("gold");
                onComplete();
              }}
            >
              <Sparkles size={18} />
              Start Learning
              <ChevronRight size={18} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="atlas-onboarding__progress">
        <div className="atlas-onboarding__bar">
          <motion.div
            className="atlas-onboarding__bar-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function drawParticles(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = T.surfaceDark;
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H * 0.38;
  for (let i = 0; i < 80; i++) {
    const a = (i / 80) * Math.PI * 2 + t * 0.3;
    const r = 60 + Math.sin(t * 0.7 + i * 0.4) * 12;
    const tx = cx + Math.cos(a) * r;
    const ty = cy + Math.sin(a) * r;
    const x = cx + (tx - cx) * (1 + Math.sin(t + i) * 0.3);
    const y = cy + (ty - cy) * (1 + Math.cos(t * 0.8 + i) * 0.3);
    const p = Math.max(0, Math.min(1, (t * 0.5 + i * 0.04) % 1));
    ctx.save();
    ctx.globalAlpha = 0.3 + p * 0.7;
    ctx.fillStyle = T.gold;
    ctx.shadowColor = T.gold;
    ctx.shadowBlur = 8 + p * 10;
    ctx.beginPath();
    ctx.arc(x + (tx - x) * (1 - p), y + (ty - y) * (1 - p), 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.strokeStyle = T.gold;
  ctx.lineWidth = 3;
  ctx.shadowColor = T.gold;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(cx, cy, 46, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - 46); ctx.lineTo(cx - 14, cy - 14);
  ctx.moveTo(cx, cy - 46); ctx.lineTo(cx + 14, cy - 14);
  ctx.moveTo(cx, cy + 46); ctx.lineTo(cx, cy + 30);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = T.gold;
  ctx.font = "bold 38px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("A", cx, cy);
}

const WORLD_STARS = Array.from({ length: 100 }, () => ({
  x: Math.random(), y: Math.random(), s: Math.random() * 1.5 + 0.4, p: Math.random()
}));

function drawWorld(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = T.surfaceDark;
  ctx.fillRect(0, 0, W, H);
  const stars = WORLD_STARS;
  stars.forEach(s => {
    ctx.globalAlpha = 0.3 + Math.sin(t * 1.5 + s.p * 10) * 0.3;
    ctx.fillStyle = T.cream;
    ctx.beginPath();
    ctx.arc(s.x * W, s.y * H, s.s, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  const cx = W / 2, cy = H * 0.52, rx = W * 0.34, ry = H * 0.22;
  const fade = Math.min(1, t * 0.3);
  ctx.save();
  ctx.globalAlpha = fade;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
  grad.addColorStop(0, "rgba(245,166,35,.12)");
  grad.addColorStop(0.6, "rgba(245,166,35,.04)");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `${T.gold}55`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
  // continent blobs
  [
    { x: cx - rx * 0.3, y: cy - ry * 0.2, r: 22 },
    { x: cx + rx * 0.2, y: cy - ry * 0.3, r: 16 },
    { x: cx + rx * 0.05, y: cy + ry * 0.2, r: 20 },
    { x: cx - rx * 0.15, y: cy + ry * 0.15, r: 14 },
    { x: cx - rx * 0.4, y: cy + ry * 0.05, r: 11 },
  ].forEach((b, i) => {
    const f = Math.max(0, Math.min(1, (t - 0.8 - i * 0.25) * 1.8));
    ctx.save();
    ctx.globalAlpha = f * 0.85;
    ctx.fillStyle = T.gold;
    ctx.shadowColor = T.gold;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * f, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  // meridian lines
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = T.cream;
  ctx.lineWidth = 1;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * (rx / 3), cy - ry);
    ctx.lineTo(cx + i * (rx / 3), cy + ry);
    ctx.stroke();
  }
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * (1 - Math.abs(i) * 0.2), ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBloom(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = T.surfaceDark;
  ctx.fillRect(0, 0, W, H);
  const topics = ["Maths", "Science", "English", "GK", "Coding", "Hindi"];
  const cx = W / 2, cy = H * 0.46;
  for (let i = 0; i < topics.length; i++) {
    const a = (i / topics.length) * Math.PI * 2 - Math.PI / 2 + t * 0.15;
    const d = 90 + Math.sin(t * 0.5 + i) * 10;
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d * 0.58;
    const f = Math.max(0, Math.min(1, (t - 0.5 - i * 0.3) * 1.5));
    const col = [T.gold, "#5AD8A6", "#FF8C5A", "#C77DFF", "#4A9EFF", "#FFD194"][i];
    // petal
    ctx.save();
    ctx.globalAlpha = f * 0.25;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(x, y, 22, 12, a, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // center
    ctx.save();
    ctx.globalAlpha = f * 0.9;
    ctx.fillStyle = col;
    ctx.shadowColor = col;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(x, y, 9 * f, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // label
    ctx.save();
    ctx.globalAlpha = f * 0.75;
    ctx.fillStyle = T.cream;
    ctx.font = `bold ${W < 360 ? 10 : 12}px system-ui`;
    ctx.textAlign = "center";
    ctx.fillText(topics[i], x, y + 22 * f);
    ctx.restore();
    // connecting line
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = T.cream;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();
  }
  // center hub
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = T.gold;
  ctx.shadowColor = T.gold;
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(cx, cy, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = T.surfaceDark;
  ctx.font = "bold 18px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", cx, cy);
}

function drawCompanionEntry(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = T.surfaceDark;
  ctx.fillRect(0, 0, W, H);
  // path
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = T.gold;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  ctx.moveTo(W * 0.1, H * 0.78);
  ctx.bezierCurveTo(W * 0.25, H * 0.55, W * 0.75, H * 0.45, W * 0.9, H * 0.28);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
  // companion
  const prog = Math.min(1, t * 0.55);
  const px = W * 0.1 + (W * 0.8) * easeOutCubic(prog);
  const py = H * 0.78 + (H * 0.28 - H * 0.78) * easeOutCubic(prog);
  // trail
  for (let i = 0; i < 5; i++) {
    const tp = Math.max(0, prog - i * 0.06);
    const tx = W * 0.1 + (W * 0.8) * easeOutCubic(tp);
    const ty = H * 0.78 + (H * 0.28 - H * 0.78) * easeOutCubic(tp);
    ctx.save();
    ctx.globalAlpha = (1 - i / 5) * 0.25;
    ctx.fillStyle = T.gold;
    ctx.beginPath();
    ctx.arc(tx, ty - 20, 12 - i * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // body
  ctx.save();
  ctx.fillStyle = T.gold;
  ctx.shadowColor = T.gold;
  ctx.shadowBlur = 28;
  ctx.beginPath();
  ctx.arc(px, py - 22, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // eyes
  const bob = Math.sin(t * 3) * 1.5;
  ctx.fillStyle = T.surfaceDark;
  ctx.beginPath(); ctx.arc(px - 7, py - 25 + bob, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(px + 7, py - 25 + bob, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(px, py - 18 + bob, 1.8, 0, Math.PI * 2); ctx.fill();
  // CTA area
  if (prog >= 1) {
    ctx.save();
    ctx.globalAlpha = 0.06 + Math.sin(t * 1.5) * 0.04;
    ctx.fillStyle = T.gold;
    ctx.shadowColor = T.gold;
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(W / 2, H * 0.6, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

const onboardStyles = `
  .atlas-onboarding{position:fixed;inset:0;z-index:200;background:${T.surfaceDark};
    display:flex;flex-direction:column;overflow:hidden;touch-action:none}
  .atlas-onboarding__canvas{position:absolute;inset:0;opacity:0;transition:opacity .6s}
  .atlas-onboarding__canvas--active{opacity:1}
  .atlas-onboarding__header{position:relative;z-index:10;display:flex;
    justify-content:space-between;align-items:center;padding:16px 20px 0}
  .atlas-onboarding__skip{background:none;border:none;color:${T.cream};opacity:.65;
    font-size:14px;cursor:pointer;padding:4px 8px;transition:opacity .2s}
  .atlas-onboarding__skip:hover{opacity:1}
  .atlas-onboarding__dots{display:flex;gap:6px}
  .atlas-onboarding__dot{height:7px;border-radius:4px;transition:all .35s}
  .atlas-onboarding__content{position:relative;z-index:10;flex:1;display:flex;
    flex-direction:column;align-items:center;justify-content:flex-end;
    padding:0 28px 160px;text-align:center}
  .atlas-onboarding__title{font-size:clamp(26px,6vw,38px);font-weight:800;
    color:${T.cream};margin:0 0 14px;line-height:1.2;
    text-shadow:0 2px 20px rgba(245,166,35,.25)}
  .atlas-onboarding__body{font-size:15px;color:${T.cream};opacity:.72;
    line-height:1.65;max-width:300px;margin:0}
  .atlas-onboarding__cta{display:inline-flex;align-items:center;gap:8px;margin-top:30px;
    padding:14px 28px;background:linear-gradient(135deg,${T.gold},${T.goldDark});
    color:${T.surfaceDark};font-weight:700;font-size:15px;border:none;border-radius:50px;
    cursor:pointer;box-shadow:0 6px 28px rgba(245,166,35,.45);transition:box-shadow .2s}
  .atlas-onboarding__cta:hover{box-shadow:0 8px 36px rgba(245,166,35,.65)}
  .atlas-onboarding__progress{position:relative;z-index:10;padding:18px 28px 28px}
  .atlas-onboarding__bar{height:3px;background:${T.surfaceLight};border-radius:2px;overflow:hidden}
  .atlas-onboarding__bar-fill{height:100%;background:linear-gradient(90deg,${T.gold},${T.goldLight});
    border-radius:2px;box-shadow:0 0 8px ${T.gold}}
`;

// ─────────────────────────────────────────────
// 3. ATLAS TUTOR CHAT
// ─────────────────────────────────────────────
interface Message {
  id: string;
  role: "student" | "tutor";
  text: string;
  type?: string;
  hint?: string;
  isLevelUp?: boolean;
  hasMisconception?: boolean;
  timestamp: Date;
}

const DEMO_CONVO: Message[] = [
  {
    id: "1",
    role: "tutor",
    text: "Namaste! I'm Atlas, your learning companion. Today we'll explore fractions. What do you already know about them?",
    type: "clarifying",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "2",
    role: "student",
    text: "I think fractions are like cutting a pizza into pieces?",
    timestamp: new Date(Date.now() - 90000),
  },
  {
    id: "3",
    role: "tutor",
    text: "Great analogy! Now, if I eat 2 out of 4 slices, what fraction have I eaten — and what does the numerator represent here?",
    type: "probing",
    timestamp: new Date(Date.now() - 60000),
  },
];

const HINT_MAP: Record<string, string[]> = {
  default: [
    "Think about how a whole can be split equally into parts.",
    "The denominator tells us how many equal parts exist.",
    "Try drawing the situation as a diagram.",
  ],
};

export function AtlasTutorChat({
  subject = "Mathematics",
  topic = "Fractions",
  onExit,
}: {
  subject?: string;
  topic?: string;
  onExit?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>(DEMO_CONVO);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hints, setHints] = useState<{ [msgId: string]: boolean }>({});
  const [celebrating, setCelebrating] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ x: 0, y: 0 });

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (celebrating) {
      const t = setTimeout(() => setCelebrating(false), 3200);
      return () => clearTimeout(t);
    }
  }, [celebrating]);

  const send = (text: string) => {
    if (!text.trim()) return;
    SoundManager.playUISound("click");
    const msg: Message = { id: Date.now().toString(), role: "student", text: text.trim(), timestamp: new Date() };
    setMessages(p => [...p, msg]);
    setInput("");
    setIsTyping(true);
    SoundManager.playCompanionSound("thinking");
    setTimeout(() => {
      setIsTyping(false);
      const isGreat = /yes|understand|got it|2\/4|half|1\/2/i.test(text.trim());
      if (isGreat) {
        SoundManager.playAchievement("bronze");
        setCelebrating(true);
      }
      const replies: Message[] = isGreat
        ? [{
            id: (Date.now() + 1).toString(),
            role: "tutor" as const,
            text: "Excellent! Now what happens to the fraction's value if we increase the numerator while keeping the denominator fixed?",
            type: "probing",
            timestamp: new Date(),
          }]
        : [{
            id: (Date.now() + 1).toString(),
            role: "tutor" as const,
            text: "Interesting! Let me think about that. Can you also explain why you chose that answer?",
            type: "evidence",
            timestamp: new Date(),
          }];
      setMessages(p => [...p, ...replies]);
    }, 2200);
  };

  const toggleHint = (id: string) => {
    SoundManager.playUISound("toggle");
    setHints(p => ({ ...p, [id]: !p[id] }));
  };

  return (
    <>
      <style>{tutorStyles}</style>
      <div className="atlas-tutor">
        {/* Header */}
        <div className="atlas-tutor__header">
          <div className="atlas-tutor__header-left">
            <motion.div className="atlas-tutor__header-avatar" animate={{ rotate: [0, -8, 8, -5, 0] }} transition={{ repeat: Infinity, duration: 4, repeatDelay: 3 }}>
              <CompanionFace size={44} />
            </motion.div>
            <div>
              <div className="atlas-tutor__header-name">Atlas Companion</div>
              <div className="atlas-tutor__header-sub">{subject} · {topic}</div>
            </div>
          </div>
          <div className="atlas-tutor__header-right">
            <span className="atlas-tutor__live">● Live</span>
            {onExit && <button className="atlas-tutor__exit" onClick={onExit}><X size={18} /></button>}
          </div>
        </div>

        {/* Messages */}
        <div className="atlas-tutor__list" ref={listRef}>
          {messages.map(m => (
            <motion.div
              key={m.id}
              className={`atlas-tutor__msg-wrap ${m.role === "student" ? "atlas-tutor__msg-wrap--student" : "atlas-tutor__msg-wrap--tutor"}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {m.role === "tutor" && <CompanionFace size={32} />}
              <div className={`atlas-tutor__bubble ${m.role === "student" ? "atlas-tutor__bubble--student" : "atlas-tutor__bubble--tutor"}`}>
                {m.type && (
                  <span className="atlas-tutor__badge" style={{ borderColor: QUES_TYPES.find(q => q.key === m.type)?.color || T.gold }}>
                    {m.type}
                  </span>
                )}
                <p className="atlas-tutor__text">{m.text}</p>
                <span className="atlas-tutor__time">
                  {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {m.role === "tutor" && (
                  <button className="atlas-tutor__hint-btn" onClick={() => toggleHint(m.id)}>
                    <Lightbulb size={13} /> Hint
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {/* Misconception */}
          <motion.div className="atlas-tutor__misconcept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="atlas-tutor__misconcept-card">
              <AlertTriangle size={16} color={T.gold} />
              <div>
                <p className="atlas-tutor__misconcept-label">Let me help with that</p>
                <p className="atlas-tutor__misconcept-text">
                  It sounds like you're exploring the idea! A common thought is that a bigger denominator always means a larger fraction — but that's actually the opposite. Shall we explore why?
                </p>
              </div>
            </div>
          </motion.div>
          {/* Hint */}
          <AnimatePresence>
            {hints["3"] && (
              <motion.div className="atlas-tutor__hint-expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <Lightbulb size={14} color={T.gold} />
                <p>💡 Try thinking: 2 out of 4 equal parts — if we call each part a "quarter", what does that make the whole?</p>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Typing */}
          <AnimatePresence>
            {isTyping && (
              <motion.div className="atlas-tutor__msg-wrap atlas-tutor__msg-wrap--tutor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <CompanionFace size={32} />
                <div className="atlas-tutor__bubble atlas-tutor__bubble--tutor atlas-tutor__typing-bubble">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Level Up */}
          <AnimatePresence>
            {celebrating && <LevelUpOverlay />}
          </AnimatePresence>
        </div>

        {/* Quick replies */}
        <div className="atlas-tutor__suggestions">
          {["It's a part of a whole", "I'm not sure yet", "Can you explain more?"].map(q => (
            <button key={q} className="atlas-tutor__sug" onClick={() => send(q)}>{q}</button>
          ))}
        </div>

        {/* Input */}
        <div className="atlas-tutor__input-area">
          <div className="atlas-tutor__input-wrap">
            <input
              className="atlas-tutor__input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your answer..."
              onKeyDown={e => e.key === "Enter" && send(input)}
              onFocus={() => SoundManager.playUISound("hover")}
            />
            <motion.button
              className="atlas-tutor__send"
              whileTap={{ scale: 0.88 }}
              onClick={() => send(input)}
              disabled={!input.trim()}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

function CompanionFace({ size = 40 }: { size?: number }) {
  const [look, setLook] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const i = setInterval(() => setLook({ x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 4 }), 2000);
    return () => clearInterval(i);
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="18" fill={T.gold} opacity="0.15" />
      <circle cx="20" cy="20" r="15" fill={T.gold} opacity="0.25" />
      <circle cx="20" cy="20" r="10" fill={T.gold} />
      <motion.circle initial={{ cx: 16.5 }} animate={{ cx: 16.5 + look.x * 0.25 }} transition={{ duration: 0.5 }} cy="18" r="2" fill={T.surfaceDark} />
      <motion.circle initial={{ cx: 23.5 }} animate={{ cx: 23.5 + look.x * 0.25 }} transition={{ duration: 0.5 }} cy="18" r="2" fill={T.surfaceDark} />
      <ellipse cx="20" cy="23" rx="2" ry="1" fill={T.surfaceDark} opacity="0.7" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="atlas-tutor__dots-typing">
      {[0, 1, 2].map(i => (
        <motion.span key={i} className="atlas-tutor__dot-typing" animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }} />
      ))}
    </div>
  );
}

function LevelUpOverlay() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase(p => p + 1), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div className="atlas-tutor__levelup" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.4 } }}>
      <motion.div className="atlas-tutor__levelup-ring" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="atlas-tutor__levelup-star" style={{ transform: `rotate(${i * 30}deg) translateY(-38px)` }} animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.5] }} transition={{ delay: i * 0.05, repeat: Infinity, duration: 1.5 }} />
        ))}
      </motion.div>
      <motion.div className="atlas-tutor__levelup-content" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
        <Trophy size={40} color={T.gold} />
        <div className="atlas-tutor__levelup-text">Level Up!</div>
        <div className="atlas-tutor__levelup-sub">+50 XP · Fractions Expert</div>
      </motion.div>
    </motion.div>
  );
}

const tutorStyles = `
  .atlas-tutor{display:flex;flex-direction:column;height:100vh;background:${T.surfaceDark};overflow:hidden}
  .atlas-tutor__header{display:flex;justify-content:space-between;align-items:center;
    padding:12px 16px;background:${T.surface};border-bottom:1px solid ${T.surfaceLight}}
  .atlas-tutor__header-left{display:flex;align-items:center;gap:10px}
  .atlas-tutor__header-avatar{border-radius:50%;display:flex;align-items:center;justify-content:center;
    background:${T.goldMuted}}
  .atlas-tutor__header-name{font-weight:700;color:${T.cream};font-size:14px}
  .atlas-tutor__header-sub{color:${T.cream};opacity:.5;font-size:12px}
  .atlas-tutor__header-right{display:flex;align-items:center;gap:10px}
  .atlas-tutor__live{color:${T.success};font-size:11px;font-weight:600}
  .atlas-tutor__exit{background:none;border:none;color:${T.cream};opacity:.5;cursor:pointer;padding:4px}
  .atlas-tutor__list{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:14px}
  .atlas-tutor__msg-wrap{display:flex;gap:8px;max-width:85%}
  .atlas-tutor__msg-wrap--student{align-self:flex-end;flex-direction:row-reverse}
  .atlas-tutor__msg-wrap--tutor{align-self:flex-start}
  .atlas-tutor__bubble{padding:10px 14px;border-radius:18px 18px 18px 4px;
    background:${T.surfaceLight};color:${T.cream};position:relative}
  .atlas-tutor__bubble--student{border-radius:18px 18px 4px 18px;
    background:linear-gradient(135deg,${T.gold},${T.goldDark});color:${T.surfaceDark}}
  .atlas-tutor__badge{display:inline-block;font-size:9px;font-weight:700;text-transform:uppercase;
    letter-spacing:.5px;padding:2px 6px;border-radius:4px;margin-bottom:4px;
    border:1px solid;background:rgba(255,255,255,.08);color:${T.cream}}
  .atlas-tutor__text{font-size:13.5px;line-height:1.55;margin:0;white-space:pre-wrap}
  .atlas-tutor__time{font-size:10px;opacity:.45;display:block;margin-top:4px}
  .atlas-tutor__hint-btn{display:inline-flex;align-items:center;gap:3px;margin-top:6px;
    background:${T.goldMuted};border:1px solid ${T.gold}44;color:${T.gold};
    font-size:11px;padding:3px 8px;border-radius:6px;cursor:pointer;transition:background .2s}
  .atlas-tutor__hint-btn:hover{background:rgba(245,166,35,.25)}
  .atlas-tutor__misconcept{margin:0 10px 8px 54px}
  .atlas-tutor__misconcept-card{display:flex;gap:10px;padding:10px 12px;
    background:rgba(245,166,35,.08);border:1px solid ${T.gold}33;border-radius:10px}
  .atlas-tutor__misconcept-label{font-size:11px;font-weight:700;color:${T.gold};margin:0 0 3px}
  .atlas-tutor__misconcept-text{font-size:12px;color:${T.cream};opacity:.78;margin:0;line-height:1.5}
  .atlas-tutor__hint-expanded{display:flex;align-items:flex-start;gap:8px;margin:4px 10px 4px 54px;
    padding:8px 12px;background:${T.goldMuted};border-radius:8px;font-size:12px;color:${T.goldLight};overflow:hidden}
  .atlas-tutor__typing-bubble{padding:14px 20px;display:flex;align-items:center}
  .atlas-tutor__dots-typing{display:flex;gap:4px}
  .atlas-tutor__dot-typing{width:7px;height:7px;border-radius:50%;background:${T.cream};opacity:.5}
  .atlas-tutor__levelup{position:fixed;inset:0;z-index:300;display:flex;align-items:center;
    justify-content:center;flex-direction:column;background:rgba(13,13,31,.75);backdrop-filter:blur(6px)}
  .atlas-tutor__levelup-ring{position:relative;width:150px;height:150px;display:flex;
    align-items:center;justify-content:center;border-radius:50%}
  .atlas-tutor__levelup-star{position:absolute;left:50%;top:50%;width:6px;height:6px;
    border-radius:50%;background:${T.gold};margin-left:-3px;margin-top:-3px}
  .atlas-tutor__levelup-content{position:relative;z-index:1;text-align:center}
  .atlas-tutor__levelup-text{font-size:32px;font-weight:800;color:${T.gold};margin-top:6px;
    text-shadow:0 0 30px rgba(245,166,35,.6)}
  .atlas-tutor__levelup-sub{font-size:13px;color:${T.cream};opacity:.75;margin-top:4px}
  .atlas-tutor__suggestions{display:flex;gap:7px;padding:6px 14px;overflow-x:auto;
    background:${T.surfaceDark}}
  .atlas-tutor__sug{flex-shrink:0;padding:6px 12px;background:${T.surfaceLight};
    border:1px solid ${T.surfaceLighter};color:${T.cream};font-size:12px;border-radius:20px;
    cursor:pointer;transition:all .2s;white-space:nowrap}
  .atlas-tutor__sug:hover{background:${T.goldMuted};border-color:${T.gold}55;color:${T.goldLight}}
  .atlas-tutor__input-area{padding:10px 14px 18px;background:${T.surfaceDark};
    border-top:1px solid ${T.surfaceLight}}
  .atlas-tutor__input-wrap{display:flex;gap:8px;align-items:center}
  .atlas-tutor__input{flex:1;padding:11px 16px;background:${T.surfaceLight};border:1px solid ${T.surfaceLighter};
    border-radius:24px;color:${T.cream};font-size:14px;outline:none;transition:border-color .2s}
  .atlas-tutor__input:focus{border-color:${T.gold}66}
  .atlas-tutor__input::placeholder{color:${T.cream};opacity:.35}
  .atlas-tutor__send{width:40px;height:40px;border-radius:50%;border:none;
    background:linear-gradient(135deg,${T.gold},${T.goldDark});color:${T.surfaceDark};
    display:flex;align-items:center;justify-content:center;cursor:pointer;
    box-shadow:0 3px 14px rgba(245,166,35,.4);transition:box-shadow .2s}
  .atlas-tutor__send:hover{box-shadow:0 5px 20px rgba(245,166,35,.6)}
  .atlas-tutor__send:disabled{opacity:.45;cursor:not-allowed}
`;

// ─────────────────────────────────────────────
// 4. ATLAS EXAM MODE
// ─────────────────────────────────────────────
interface ExamQuestion {
  id: string;
  text: string;
  type: "mcq" | "text";
  options?: string[];
  correct?: number;
  subject: string;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  { id: "q1", text: "What is 15% of 200?", type: "mcq", options: ["20", "30", "40", "50"], correct: 1, subject: "Math" },
  { id: "q2", text: "The process of photosynthesis primarily occurs in which part of a plant cell?", type: "mcq", options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"], correct: 1, subject: "Science" },
  { id: "q3", text: "Solve for x: 2x + 5 = 17", type: "text", subject: "Math" },
  { id: "q4", text: "Who was the first Prime Minister of India?", type: "mcq", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Rajendra Prasad"], correct: 1, subject: "Social Studies" },
  { id: "q5", text: "Identify the grammatical error: 'She don't like coffee.'", type: "mcq", options: ["No error", "'don't' should be 'doesn't'", "'like' should be 'likes'", "Both B and C"], correct: 1, subject: "English" },
  { id: "q6", text: "The value of π (pi) to two decimal places is:", type: "mcq", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1, subject: "Math" },
  { id: "q7", text: "Water boils at what temperature at sea level?", type: "mcq", options: ["90°C", "100°C", "110°C", "120°C"], correct: 1, subject: "Science" },
  { id: "q8", text: "In the equation E = mc², what does 'c' represent?", type: "mcq", options: ["Current", "Speed of light", "Heat capacity", "Charge"], correct: 1, subject: "Science" },
];

export function AtlasExamMode({
  subject = "Mathematics Test",
  questions = EXAM_QUESTIONS,
  duration = 30,
  onExit,
}: {
  subject?: string;
  questions?: ExamQuestion[];
  duration?: number;
  onExit?: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [id: string]: string | number }>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(true);

  const totalSec = duration * 60;
  const pct = timeLeft / totalSec;
  const isUrgent = timeLeft <= 300;
  const answered = Object.keys(answers).length;
  const q = questions[current];

  // Timer
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const iv = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(iv);
          setSubmitted(true);
          SoundManager.playUISound("error");
          return 0;
        }
        if (t === 301) SoundManager.playUISound("error");
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [submitted]);

  // Auto-save
  useEffect(() => {
    if (submitted) return;
    setSaved(false);
    const t = setTimeout(() => { setSaved(true); SoundManager.playUISound("whoosh"); }, 800);
    return () => clearTimeout(t);
  }, [answers, current, timeLeft, submitted]);

  const selectAnswer = (val: string | number) => {
    setAnswers(p => ({ ...p, [q.id]: val }));
    SoundManager.playUISound("click");
  };

  const toggleFlag = () => {
    setFlagged(p => {
      const n = new Set(p);
      if (n.has(q.id)) { n.delete(q.id); SoundManager.playUISound("toggle"); }
      else { n.add(q.id); SoundManager.playUISound("success"); }
      return n;
    });
  };

  const submitExam = () => {
    setSubmitted(true);
    SoundManager.playAchievement("gold");
  };

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (submitted) {
    const score = questions.reduce((a, q) => {
      if (q.type === "mcq" && answers[q.id] === q.correct) return a + 1;
      return a;
    }, 0);
    return (
      <motion.div className="atlas-exam atlas-exam--overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <style>{examStyles}</style>
        <div className="atlas-exam__result">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <Trophy size={64} color={T.gold} />
          </motion.div>
          <h2>Exam Complete!</h2>
          <div className="atlas-exam__score">
            <span className="atlas-exam__score-num" style={{ color: score >= questions.length * 0.7 ? T.success : T.gold }}>{score}/{questions.length}</span>
            <span className="atlas-exam__score-pct">{Math.round((score / questions.length) * 100)}%</span>
          </div>
          <p className="atlas-exam__result-sub">
            {score >= questions.length * 0.9 ? "Outstanding! 🌟" : score >= questions.length * 0.7 ? "Great job! 🎉" : "Keep practicing! 💪"}
          </p>
          <div className="atlas-exam__nav-grid" style={{ margin: "20px 0" }}>
            {questions.map((qq, i) => (
              <div key={qq.id} className={`atlas-exam__nav-cell atlas-exam__nav-cell--${answers[qq.id] !== undefined ? (qq.correct === answers[qq.id] ? "correct" : "wrong") : "empty"}`} style={{ width: 38, height: 38 }}>
                {i + 1}
              </div>
            ))}
          </div>
          <motion.button className="atlas-exam__submit-btn" whileTap={{ scale: 0.95 }} onClick={onExit}>Back to Home</motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="atlas-exam" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <style>{examStyles}</style>

      {/* Top bar */}
      <div className="atlas-exam__topbar">
        <div className="atlas-exam__topbar-left">
          <span className="atlas-exam__subject">{subject}</span>
          <span className="atlas-exam__q-count">
            Q{current + 1}<span className="atlas-exam__q-sep">/</span>{questions.length}
          </span>
        </div>
        <div className="atlas-exam__topbar-right">
          <div className="atlas-exam__saved">
            <Save size={12} />
            <span style={{ color: saved ? T.success : T.gold }}>{saved ? "Saved" : "Saving..."}</span>
          </div>
          <div className={`atlas-exam__timer ${isUrgent ? "atlas-exam__timer--urgent" : ""}`}>
            <Clock size={14} />
            <span>{fmtTime(timeLeft)}</span>
            {isUrgent && <motion.div className="atlas-exam__timer-pulse" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }} transition={{ repeat: Infinity, duration: 0.8 }} />}
          </div>
          <button className={`atlas-exam__flag ${flagged.has(q.id) ? "atlas-exam__flag--active" : ""}`} onClick={toggleFlag}>
            <Flag size={15} fill={flagged.has(q.id) ? T.gold : "none"} />
          </button>
          {onExit && <button className="atlas-exam__exit" onClick={onExit}><Maximize2 size={16} /></button>}
        </div>
        <div className="atlas-exam__time-bar">
          <motion.div className="atlas-exam__time-fill" animate={{ width: `${pct * 100}%` }} style={{ background: isUrgent ? `linear-gradient(90deg,${T.gold},${T.danger})` : T.gold }} />
        </div>
      </div>

      {/* Question */}
      <div className="atlas-exam__body">
        <motion.div className="atlas-exam__card" key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <span className="atlas-exam__q-subject">{q.subject}</span>
          <h3 className="atlas-exam__q-text">{q.text}</h3>
          {q.type === "mcq" && q.options && (
            <div className="atlas-exam__options">
              {q.options.map((opt, i) => {
                const sel = answers[q.id] === i;
                return (
                  <motion.button
                    key={i}
                    className={`atlas-exam__option ${sel ? "atlas-exam__option--sel" : ""}`}
                    onClick={() => selectAnswer(i)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="atlas-exam__option-marker">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                    {sel && <CheckCircle2 size={16} color={T.gold} />}
                  </motion.button>
                );
              })}
            </div>
          )}
          {q.type === "text" && (
            <div className="atlas-exam__text-wrap">
              <textarea
                className="atlas-exam__text-input"
                value={(answers[q.id] as string) || ""}
                onChange={e => selectAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
              />
              <div className="atlas-exam__text-meta">
                <span>{(answers[q.id] as string)?.length || 0} characters</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigator */}
      <div className="atlas-exam__nav">
        <div className="atlas-exam__nav-scroll">
          <div className="atlas-exam__nav-grid">
            {questions.map((qq, i) => {
              const isAns = answers[qq.id] !== undefined;
              const isFlag = flagged.has(qq.id);
              const isCur = i === current;
              return (
                <motion.button
                  key={qq.id}
                  className={`atlas-exam__nav-cell atlas-exam__nav-cell--${isAns ? "ans" : isFlag ? "flag" : "empty"} ${isCur ? "atlas-exam__nav-cell--cur" : ""}`}
                  onClick={() => { setCurrent(i); SoundManager.playUISound("click"); }}
                  whileTap={{ scale: 0.9 }}
                  title={`Q${i + 1}${isAns ? " · Answered" : isFlag ? " · Flagged" : ""}`}
                >
                  {i + 1}
                  {isFlag && <Flag size={8} fill={T.gold} color={T.goldDark} />}
                </motion.button>
              );
            })}
          </div>
        </div>
        <div className="atlas-exam__footer">
          <button className="atlas-exam__prev" disabled={current === 0} onClick={() => { setCurrent(c => c - 1); SoundManager.playUISound("click"); }}>
            <ChevronLeft size={16} /> Prev
          </button>
          {current === questions.length - 1 ? (
            <motion.button className="atlas-exam__submit-btn" whileTap={{ scale: 0.95 }} onClick={() => setShowConfirm(true)}>
              Submit Exam
            </motion.button>
          ) : (
            <motion.button className="atlas-exam__next" whileTap={{ scale: 0.95 }} onClick={() => { setCurrent(c => c + 1); SoundManager.playUISound("click"); }}>
              Next <ChevronRight size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Submit modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div className="atlas-exam__modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="atlas-exam__modal-card" initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring" }}>
              <h3>Submit Exam?</h3>
              <div className="atlas-exam__modal-stats">
                <div className="atlas-exam__modal-stat"><CheckCircle2 size={16} color={T.success} /><span>{answered} answered</span></div>
                <div className="atlas-exam__modal-stat"><Flag size={16} color={T.gold} /><span>{flagged.size} flagged</span></div>
                <div className="atlas-exam__modal-stat"><span className="atlas-exam__modal-stat-num">{questions.length - answered}</span><span>remaining</span></div>
              </div>
              {answered < questions.length && <p className="atlas-exam__modal-warn">You have {questions.length - answered} unanswered question(s).</p>}
              <div className="atlas-exam__modal-actions">
                <button className="atlas-exam__modal-cancel" onClick={() => setShowConfirm(false)}>Go Back</button>
                <motion.button className="atlas-exam__modal-submit" whileTap={{ scale: 0.95 }} onClick={submitExam}>Submit Now</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time's up overlay */}
      <AnimatePresence>
        {timeLeft === 0 && !submitted && (
          <motion.div className="atlas-exam__modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="atlas-exam__modal-card" initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <Clock size={40} color={T.gold} />
              <h3 style={{ color: T.gold }}>Time's Up!</h3>
              <p style={{ color: `${T.cream}99`, fontSize: 14 }}>Your answers have been auto-submitted.</p>
              <motion.button className="atlas-exam__modal-submit" whileTap={{ scale: 0.95 }} onClick={submitExam}>View Results</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const examStyles = `
  .atlas-exam{position:fixed;inset:0;z-index:500;background:${T.surfaceDark};display:flex;flex-direction:column}
  .atlas-exam--overlay{z-index:600}
  .atlas-exam__topbar{background:${T.surface};border-bottom:1px solid ${T.surfaceLight};padding:12px 16px 0}
    box-shadow:0 2px 20px rgba(0,0,0,.35)}
  .atlas-exam__topbar-left{display:flex;align-items:center;gap:14px;margin-bottom:10px}
  .atlas-exam__subject{font-weight:700;color:${T.cream};font-size:15px}
  .atlas-exam__q-count{color:${T.gold};font-weight:600;font-size:14px}
  .atlas-exam__q-sep{opacity:.4;margin:0 2px}
  .atlas-exam__topbar-right{display:flex;align-items:center;gap:12px;margin-bottom:8px;justify-content:flex-end}
  .atlas-exam__saved{display:flex;align-items:center;gap:4px;font-size:11px;color:${T.cream};opacity:.7}
    background:${T.surfaceLight};padding:3px 8px;border-radius:6px}
  .atlas-exam__timer{display:flex;align-items:center;gap:5px;font-weight:700;font-size:14px;
    padding:5px 12px;border-radius:8px;background:${T.goldMuted};color:${T.gold};position:relative}
    transition:all .4s}
  .atlas-exam__timer--urgent{background:rgba(224,85,106,.15);color:${T.danger};
    animation:timerPulse 1s ease-in-out infinite}
  .atlas-exam__timer-pulse{position:absolute;inset:0;border-radius:8px;
    border:2px solid ${T.danger}}
  @keyframes timerPulse{0%,100%{opacity:.4}50%{opacity:.1}}
  .atlas-exam__flag{background:none;border:1px solid ${T.surfaceLighter};color:${T.cream};opacity:.5;
    width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all .2s}
  .atlas-exam__flag--active{border-color:${T.gold};opacity:1}
  .atlas-exam__exit{background:none;border:1px solid ${T.surfaceLighter};color:${T.cream};opacity:.5;
    width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer}
  .atlas-exam__time-bar{height:3px;background:${T.surfaceLight};border-radius:2px;overflow:hidden}
  .atlas-exam__time-fill{height:100%;border-radius:2px;transition:width 1s linear}
  .atlas-exam__body{flex:1;overflow-y:auto;padding:24px 20px;display:flex;align-items:flex-start;
    justify-content:center}
  .atlas-exam__card{width:100%;max-width:620px}
  .atlas-exam__q-subject{display:inline-block;font-size:11px;font-weight:600;color:${T.gold};
    background:${T.goldMuted};padding:3px 8px;border-radius:4px;margin-bottom:12px}
  .atlas-exam__q-text{font-size:18px;font-weight:600;color:${T.cream};margin:0 0 22px;line-height:1.6}
  .atlas-exam__options{display:flex;flex-direction:column;gap:10px}
  .atlas-exam__option{display:flex;align-items:center;gap:12px;padding:14px 16px;
    background:${T.surface};border:2px solid ${T.surfaceLighter};border-radius:12px;
    color:${T.cream};font-size:14px;cursor:pointer;transition:all .2s;text-align:left}
  .atlas-exam__option:hover{border-color:${T.gold}55}
  .atlas-exam__option--sel{border-color:${T.gold};background:${T.goldMuted}}
    box-shadow:0 0 18px rgba(245,166,35,.18)}
  .atlas-exam__option-marker{width:28px;height:28px;border-radius:50%;
    background:${T.surfaceLight};display:flex;align-items:center;justify-content:center;
    font-weight:700;font-size:13px;color:${T.gold};flex-shrink:0;
    transition:all .2s}
  .atlas-exam__option--sel .atlas-exam__option-marker{background:${T.gold};color:${T.surfaceDark}}
  .atlas-exam__text-wrap{background:${T.surface};border:1px solid ${T.surfaceLighter};
    border-radius:12px;overflow:hidden}
  .atlas-exam__text-input{width:100%;background:transparent;border:none;padding:14px 16px;
    color:${T.cream};font-size:14px;outline:none;resize:vertical;font-family:system-ui}
  .atlas-exam__text-input::placeholder{color:${T.cream};opacity:.3}
  .atlas-exam__text-meta{text-align:right;font-size:11px;color:${T.cream};opacity:.4;padding:4px 12px 8px}
  .atlas-exam__nav{background:${T.surface};border-top:1px solid ${T.surfaceLight};padding:10px 14px 14px}
    box-shadow:0 -4px 20px rgba(0,0,0,.3)}
  .atlas-exam__nav-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:7px}
  .atlas-exam__nav-cell{width:100%;aspect-ratio:1;border-radius:8px;border:1.5px solid ${T.surfaceLighter};
    background:${T.surfaceDark};color:${T.cream};font-size:12px;font-weight:600;
    cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;
    position:relative}
  .atlas-exam__nav-cell--ans{border-color:${T.success};background:rgba(76,175,130,.15);color:${T.success}}
  .atlas-exam__nav-cell--flag{border-color:${T.gold};color:${T.gold}}
  .atlas-exam__nav-cell--cur{border-color:${T.gold};background:${T.goldMuted};color:${T.gold};
    box-shadow:0 0 12px rgba(245,166,35,.3)}
  .atlas-exam__nav-cell--correct{background:rgba(76,175,130,.2);border-color:${T.success}}
  .atlas-exam__nav-cell--wrong{background:rgba(224,85,106,.15);border-color:${T.danger}}
  .atlas-exam__footer{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
  .atlas-exam__prev,.atlas-exam__next{padding:8px 16px;border-radius:10px;border:1.5px solid ${T.surfaceLighter};
    background:${T.surfaceLight};color:${T.cream};font-size:13px;font-weight:600;cursor:pointer;
    display:flex;align-items:center;gap:5px;transition:all .2s}
  .atlas-exam__prev:hover:not(:disabled),.atlas-exam__next:hover{background:${T.goldMuted};
    border-color:${T.gold}55}
  .atlas-exam__prev:disabled{opacity:.3;cursor:not-allowed}
  .atlas-exam__submit-btn{padding:10px 22px;border-radius:10px;border:none;
    background:linear-gradient(135deg,${T.gold},${T.goldDark});color:${T.surfaceDark};
    font-weight:700;font-size:14px;cursor:pointer;
    box-shadow:0 4px 16px rgba(245,166,35,.35)}
  .atlas-exam__modal{position:fixed;inset:0;z-index:700;background:rgba(13,13,31,.85);
    backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px}
  .atlas-exam__modal-card{background:${T.surface};border:1px solid ${T.surfaceLighter};
    border-radius:18px;padding:32px;max-width:380px;width:100%;text-align:center}
  .atlas-exam__modal-card h3{color:${T.cream};margin:16px 0 8px;font-size:20px}
  .atlas-exam__modal-stats{display:flex;justify-content:center;gap:24px;margin:18px 0}
  .atlas-exam__modal-stat{display:flex;flex-direction:column;align-items:center;gap:4px;
    color:${T.cream};font-size:12px;opacity:.8}
  .atlas-exam__modal-stat-num{font-weight:700;color:${T.gold};font-size:16px}
  .atlas-exam__modal-warn{font-size:13px;color:${T.gold};margin:12px 0}
  .atlas-exam__modal-actions{display:flex;gap:10px;margin-top:20px}
  .atlas-exam__modal-cancel{flex:1;padding:10px;border-radius:10px;border:1.5px solid ${T.surfaceLighter};
    background:${T.surfaceLight};color:${T.cream};font-size:14px;cursor:pointer}
  .atlas-exam__modal-submit{flex:1;padding:10px;border-radius:10px;border:none;
    background:linear-gradient(135deg,${T.gold},${T.goldDark});color:${T.surfaceDark};
    font-weight:700;font-size:14px;cursor:pointer}
  .atlas-exam__result{text-align:center;padding:60px 20px;max-width:380px;margin:auto}
  .atlas-exam__result h2{color:${T.cream};font-size:26px;margin:16px 0 8px}
  .atlas-exam__score{display:flex;align-items:baseline;justify-content:center;gap:10px;margin:8px 0}
  .atlas-exam__score-num{font-size:56px;font-weight:800;line-height:1}
  .atlas-exam__score-pct{font-size:18px;color:${T.cream};opacity:.6}
  .atlas-exam__result-sub{color:${T.cream};opacity:.75;font-size:15px}
`;

// ─────────────────────────────────────────────
// 5. ATLAS PROGRESS VISUALIZATIONS
// ─────────────────────────────────────────────
interface ProgressData {
  subjects: { name: string; value: number }[];
  streak: { date: string; count: number }[];
  timeline: { week: string; value: number }[];
  topics: { name: string; strength: number; category: "strong" | "weak" }[];
  xp: { current: number; target: number; level: number };
}

const DEMO_DATA: ProgressData = {
  subjects: [
    { name: "Math", value: 85 },
    { name: "Science", value: 72 },
    { name: "English", value: 64 },
    { name: "GK", value: 91 },
    { name: "Hindi", value: 58 },
    { name: "CS", value: 47 },
  ],
  streak: (() => {
    const items: { date: string; count: number }[] = [];
    for (let i = 89; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      items.push({
        date: d.toISOString().slice(0, 10),
        count: Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 5) + 1,
      });
    }
    return items;
  })(),
  timeline: [
    { week: "W1", value: 30 },
    { week: "W2", value: 38 },
    { week: "W3", value: 45 },
    { week: "W4", value: 52 },
    { week: "W5", value: 48 },
    { week: "W6", value: 60 },
    { week: "W7", value: 68 },
    { week: "W8", value: 72 },
  ],
  topics: [
    { name: "Fractions & Decimals", strength: 92, category: "strong" },
    { name: "Photosynthesis", strength: 85, category: "strong" },
    { name: "Grammar & Tenses", strength: 78, category: "strong" },
    { name: "Indian History", strength: 55, category: "weak" },
    { name: "Geometry", strength: 48, category: "weak" },
    { name: "Coding Basics", strength: 35, category: "weak" },
  ],
  xp: { current: 2850, target: 3500, level: 12 },
};

export function AtlasProgressViz({
  data = DEMO_DATA,
}: {
  data?: ProgressData;
}) {
  const [tip, setTip] = useState<{ x: number; y: number; text: string; val?: string } | null>(null);
  const onTip = (e: React.MouseEvent, text: string, val?: string) => {
    const r = (e.target as HTMLElement).getBoundingClientRect();
    setTip({ x: r.left + r.width / 2, y: r.top - 8, text, val });
  };

  return (
    <>
      <style>{progressStyles}</style>
      <div className="atlas-progress">
        <h2 className="atlas-progress__title">Your Progress</h2>
        <div className="atlas-progress__grid">
          <div className="atlas-progress__card atlas-progress__card--tall">
            <h3 className="atlas-progress__card-title"><Target size={16} /> Subject Mastery</h3>
            <MasteryRadar data={data.subjects} onTip={onTip} />
          </div>
          <div className="atlas-progress__card">
            <h3 className="atlas-progress__card-title"><Flame size={16} /> Streak</h3>
            <StreakHeatmap data={data.streak} onTip={onTip} />
          </div>
          <div className="atlas-progress__card">
            <h3 className="atlas-progress__card-title"><TrendingUp size={16} /> Mastery Growth</h3>
            <MasteryTimeline data={data.timeline} onTip={onTip} />
          </div>
          <div className="atlas-progress__card">
            <h3 className="atlas-progress__card-title"><Award size={16} /> Topic Strength</h3>
            <TopicStrength data={data.topics} />
          </div>
          <div className="atlas-progress__card atlas-progress__card--level">
            <h3 className="atlas-progress__card-title"><Crown size={16} /> Level</h3>
            <LevelRing data={data.xp} />
          </div>
        </div>
        {tip && (
          <div className="atlas-progress__tip" style={{ left: tip.x, top: tip.y }}>
            <div>{tip.text}</div>
            {tip.val && <div style={{ color: T.gold, fontWeight: 700 }}>{tip.val}</div>}
          </div>
        )}
      </div>
    </>
  );
}

function MasteryRadar({
  data,
  onTip,
}: {
  data: { name: string; value: number }[];
  onTip?: (e: React.MouseEvent, text: string, val?: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const cx = 130, cy = 130, maxR = 95;
  const n = data.length;
  const angleStep = (Math.PI * 2) / n;
  const levels = 5;

  const points = data.map((_, i) => {
    const a = -Math.PI / 2 + i * angleStep;
    return { x: cx + Math.cos(a) * maxR, y: cy + Math.sin(a) * maxR };
  });

  return (
    <svg ref={svgRef} width="260" height="260" viewBox="0 0 260 260" className="atlas-viz__radar">
      {[...Array(levels)].map((_, l) => {
        const r = ((l + 1) / levels) * maxR;
        const pts = data.map((_, i) => {
          const a = -Math.PI / 2 + i * angleStep;
          return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
        }).join(" ");
        return (
          <polygon key={l} points={pts} fill="none" stroke={`${T.surfaceLighter}`} strokeWidth="1" opacity={0.5 - l * 0.08} />
        );
      })}
      {data.map((_, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * maxR} y2={cy + Math.sin(a) * maxR} stroke={T.surfaceLighter} strokeWidth="1" opacity="0.35" />;
      })}
      <motion.polygon
        points={data.map((d, i) => {
          const a = -Math.PI / 2 + i * angleStep;
          const r = (d.value / 100) * maxR;
          return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
        }).join(" ")}
        fill={`${T.gold}22`}
        stroke={T.gold}
        strokeWidth="2.5"
        initial={{ opacity: 0, scale: 0.8, transformOrigin: "130px 130px" }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      {data.map((d, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const r = (d.value / 100) * maxR;
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        return (
          <motion.circle
            key={i}
            cx={x} cy={y} r="5" fill={T.gold}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 0.08, type: "spring" }}
            onMouseEnter={e => onTip?.(e, d.name, `${d.value}%`)}
            onMouseLeave={() => onTip?.({} as any, "", "")}
            style={{ cursor: "pointer" }}
          />
        );
      })}
      {data.map((d, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const lx = cx + Math.cos(a) * (maxR + 22);
        const ly = cy + Math.sin(a) * (maxR + 22);
        const anchor = Math.abs(Math.cos(a)) < 0.15 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
        return (
          <text key={i} x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle"
            fill={T.cream} fontSize="10.5" fontWeight="600" opacity="0.8">
            {d.name}
          </text>
        );
      })}
    </svg>
  );
}

function StreakHeatmap({
  data,
  onTip,
}: {
  data: { date: string; count: number }[];
  onTip?: (e: React.MouseEvent, text: string, val?: string) => void;
}) {
  const weeks = Math.ceil(data.length / 7);
  const cellSize = 14, gap = 3;
  const W = weeks * (cellSize + gap) + 30;
  const H = 7 * (cellSize + gap) + 24;

  const getColor = (count: number) => {
    if (count === 0) return T.surfaceLight;
    const intensity = Math.min(count / 4, 1);
    if (intensity < 0.4) return `rgba(245,166,35,${0.2 + intensity * 0.8})`;
    if (intensity < 0.7) return `rgba(245,166,35,${0.4 + intensity * 0.5})`;
    return T.gold;
  };

  const days = ["M", "W", "F"];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="atlas-viz__heatmap">
      {/* Day labels */}
      {[1, 3, 5].map(d => (
        <text key={d} x={0} y={d * (cellSize + gap) + 9} fill={T.cream} fontSize="8" opacity="0.4">{days[Math.floor(d / 2)]}</text>
      ))}
      {/* Month labels */}
      {(() => {
        const labels: { x: number; label: string }[] = [];
        let lastMonth = -1;
        data.forEach((d, i) => {
          const m = new Date(d.date).getMonth();
          const w = Math.floor(i / 7);
          if (m !== lastMonth) {
            labels.push({ x: w * (cellSize + gap) + 26, label: new Date(d.date).toLocaleString("en", { month: "short" }) });
            lastMonth = m;
          }
        });
        return labels.map((l, i) => <text key={i} x={l.x} y={8} fill={T.cream} fontSize="8" opacity="0.5">{l.label}</text>);
      })()}
      {/* Cells */}
      {data.map((d, i) => {
        const w = Math.floor(i / 7);
        const day = i % 7;
        const x = 24 + w * (cellSize + gap);
        const y = 12 + day * (cellSize + gap);
        return (
          <motion.rect
            key={i}
            x={x} y={y} width={cellSize} height={cellSize} rx="3"
            fill={getColor(d.count)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.008, type: "spring", stiffness: 400, damping: 20 }}
            onMouseEnter={e => onTip?.(e, new Date(d.date).toLocaleDateString("en", { month: "short", day: "numeric" }), `${d.count} sessions`)}
            onMouseLeave={() => onTip?.({} as any, "", "")}
            style={{ cursor: "pointer" }}
          />
        );
      })}
      {/* Legend */}
      <text x={0} y={H - 3} fill={T.cream} fontSize="7" opacity="0.35">Less</text>
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={18 + i * (cellSize + 2)} y={H - 12} width={cellSize} height={cellSize} rx="2" fill={getColor(i)} />
      ))}
      <text x={18 + 5 * (cellSize + 2) + cellSize + 2} y={H - 3} fill={T.cream} fontSize="7" opacity="0.35">More</text>
    </svg>
  );
}

function MasteryTimeline({
  data,
  onTip,
}: {
  data: { week: string; value: number }[];
  onTip?: (e: React.MouseEvent, text: string, val?: string) => void;
}) {
  const W = 300, H = 150, pad = { t: 16, r: 12, b: 28, l: 28 };
  const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
  const maxVal = 100;

  return (
    <svg width="100%" height="160" viewBox={`0 0 ${W} 160`} className="atlas-viz__timeline">
      {/* Grid */}
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={pad.l} y1={pad.t + ch - (v / maxVal) * ch} x2={W - pad.r} y2={pad.t + ch - (v / maxVal) * ch} stroke={T.surfaceLight} strokeWidth="1" opacity="0.5" />
          <text x={pad.l - 5} y={pad.t + ch - (v / maxVal) * ch + 3} fill={T.cream} fontSize="8" opacity="0.4" textAnchor="end">{v}%</text>
        </g>
      ))}
      {/* X labels */}
      {data.map((d, i) => {
        const x = pad.l + (i / (data.length - 1)) * cw;
        return <text key={i} x={x} y={H - 6} fill={T.cream} fontSize="8" opacity="0.4" textAnchor="middle">{d.week}</text>;
      })}
      {/* Gradient area */}
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.gold} stopOpacity="0.3" />
          <stop offset="100%" stopColor={T.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${data.map((d, i) => {
          const x = pad.l + (i / (data.length - 1)) * cw;
          const y = pad.t + ch - (d.value / maxVal) * ch;
          return `${i === 0 ? "M" : "L"}${x},${y}`;
        }).join(" ")}L${pad.l + cw},${pad.t + ch}L${pad.l},${pad.t + ch}Z`}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
      />
      {/* Line */}
      <motion.path
        d={data.map((d, i) => {
          const x = pad.l + (i / (data.length - 1)) * cw;
          const y = pad.t + ch - (d.value / maxVal) * ch;
          return `${i === 0 ? "M" : "L"}${x},${y}`;
        }).join(" ")}
        fill="none" stroke={T.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      {/* Points */}
      {data.map((d, i) => {
        const x = pad.l + (i / (data.length - 1)) * cw;
        const y = pad.t + ch - (d.value / maxVal) * ch;
        return (
          <motion.circle
            key={i}
            cx={x} cy={y} r="4.5" fill={T.gold}
            stroke={T.surfaceDark} strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
            onMouseEnter={e => onTip?.(e, d.week, `${d.value}% mastery`)}
            onMouseLeave={() => onTip?.({} as any, "", "")}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </svg>
  );
}

function TopicStrength({ data }: { data: { name: string; strength: number; category: "strong" | "weak" }[] }) {
  const sorted = [...data].sort((a, b) => b.strength - a.strength);
  const barW = 220, barH = 10, gap = 26, padT = 16;

  return (
    <svg width="100%" height={padT + data.length * gap} viewBox={`0 0 300 ${padT + data.length * gap}`} className="atlas-viz__topics">
      {sorted.map((d, i) => {
        const y = padT + i * gap;
        const barPct = (d.strength / 100) * barW;
        const col = d.category === "strong" ? T.gold : T.danger;
        return (
          <g key={i}>
            <text x={0} y={y + 4} fill={T.cream} fontSize="9" opacity="0.7" className="atlas-viz__topic-label">
              {d.name}
            </text>
            <rect x={0} y={y + 10} width={barW} height={barH} rx="5" fill={T.surfaceLight} />
            <motion.rect
              x={0} y={y + 10} width={barW} height={barH} rx="5"
              fill={col} opacity="0.2"
              initial={{ width: 0 }}
              animate={{ width: barPct }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: "easeOut" }}
            />
            <text x={barW + 6} y={y + 17} fill={col} fontSize="10" fontWeight="700">
              {d.strength}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LevelRing({ data }: { data: { current: number; target: number; level: number } }) {
  const R = 58, C = 2 * Math.PI * R;
  const pct = Math.min(1, data.current / data.target);
  const circ = C * pct;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={R} fill="none" stroke={T.surfaceLight} strokeWidth="10" />
        <motion.circle
          cx="70" cy="70" r={R} fill="none"
          stroke={`url(#ringGrad)`} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C} initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - circ }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={T.gold} />
            <stop offset="100%" stopColor={T.goldLight} />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ marginTop: "-90px", textAlign: "center" }}>
        <div style={{ fontSize: "34px", fontWeight: 800, color: T.gold, lineHeight: 1 }}>{data.level}</div>
        <div style={{ fontSize: "10px", color: `${T.cream}88`, marginTop: 2 }}>LEVEL</div>
        <div style={{ fontSize: "11px", color: `${T.cream}66`, marginTop: 6 }}>
          {data.current} / {data.target} XP
        </div>
        <div style={{ fontSize: "10px", color: T.gold, marginTop: 2 }}>
          {data.target - data.current} to next
        </div>
      </div>
    </div>
  );
}

const progressStyles = `
  .atlas-progress{padding:20px;overflow-y:auto;background:${T.surfaceDark};min-height:100vh}
  .atlas-progress__title{font-size:22px;font-weight:800;color:${T.cream};margin:0 0 18px}
  .atlas-progress__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px}
  .atlas-progress__card{background:${T.surface};border:1px solid ${T.surfaceLight};
    border-radius:14px;padding:18px;transition:box-shadow .2s}
  .atlas-progress__card:hover{box-shadow:0 4px 24px rgba(245,166,35,.08)}
  .atlas-progress__card--tall{grid-column:span 2}
  .atlas-progress__card--level{display:flex;flex-direction:column;align-items:center}
  @media(max-width:700px){.atlas-progress__card--tall{grid-column:span 1}}
  .atlas-progress__card-title{font-size:13px;font-weight:700;color:${T.cream};opacity:.8;
    margin:0 0 14px;display:flex;align-items:center;gap:7px}
  .atlas-progress__tip{position:fixed;z-index:1000;background:${T.surface};
    border:1px solid ${T.gold}44;border-radius:8px;padding:6px 12px;
    transform:translate(-50%,-100%);pointer-events:none;font-size:12px;color:${T.cream};
    white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.4)}
  .atlas-viz__topic-label{font-size:9px!important}
`;

// ─────────────────────────────────────────────
// 6. ATLAS SOUND DESIGN  (TypeScript module)
// ─────────────────────────────────────────────
export const AtlasSoundDesign = {
  playUISound: (type: UISoundType) => SoundManager.playUISound(type),
  playAchievement: (tier: AchievementTier) => SoundManager.playAchievement(tier),
  playWorldAmbience: (mood: AmbienceMood) => SoundManager.startWorldAmbience(mood),
  stopWorldAmbience: () => SoundManager.stopAmbience(),
  playCompanionSound: (mood: CompanionMood) => SoundManager.playCompanionSound(mood),
  setVolume: (v: number) => SoundManager.setVolume(v),
  mute: () => SoundManager.mute(),
  unmute: () => SoundManager.unmute(),
  toggleMute: () => SoundManager.toggleMute(),
};

// ─────────────────────────────────────────────
// DEMO APP
// ─────────────────────────────────────────────
export default function AtlasApp() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [soundOn, setSoundOn] = useState(true);
  const [examOpen, setExamOpen] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);

  // Init audio on first interaction
  useEffect(() => {
    const init = () => { SoundManager.initAudio(); };
    document.addEventListener("click", init, { once: true });
    document.addEventListener("touchstart", init, { once: true });
    return () => {
      document.removeEventListener("click", init);
      document.removeEventListener("touchstart", init);
    };
  }, []);

  if (!onboarded) {
    return <AtlasOnboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div style={{ background: T.surfaceDark, minHeight: "100vh", paddingBottom: 80 }}>
      {/* Home */}
      {activeTab === "home" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "20px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h1 style={{ color: T.cream, fontSize: 26, fontWeight: 800, margin: 0 }}>
                Hey, Student! 👋
              </h1>
              <p style={{ color: `${T.cream}88`, fontSize: 14, margin: "4px 0 0" }}>Ready to learn today?</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                SoundManager.toggleMute();
                setSoundOn(s => !s);
              }}
              style={{
                width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${T.surfaceLighter}`,
                background: T.surface, color: soundOn ? T.gold : `${T.cream}55`,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              {soundOn ? "🔊" : "🔇"}
            </motion.button>
          </div>

          {/* Action cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Tutor Chat", icon: "🧠", action: () => setTutorOpen(true), color: T.gold },
              { label: "Practice Exam", icon: "📝", action: () => setExamOpen(true), color: "#5AD8A6" },
              { label: "My Progress", icon: "📊", action: () => setActiveTab("profile"), color: "#C77DFF" },
              { label: "Quick Solve", icon: "⚡", action: () => setActiveTab("solver"), color: "#FF8C5A" },
            ].map((card, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { SoundManager.playUISound("click"); card.action(); }}
                style={{
                  background: T.surface, border: `1.5px solid ${T.surfaceLight}`,
                  borderRadius: 14, padding: "18px 16px", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                  boxShadow: `0 0 0 1px ${card.color}11`,
                }}
              >
                <span style={{ fontSize: 28 }}>{card.icon}</span>
                <span style={{ color: T.cream, fontSize: 14, fontWeight: 600 }}>{card.label}</span>
                <div style={{ width: 24, height: 3, borderRadius: 2, background: card.color, marginTop: 2 }} />
              </motion.button>
            ))}
          </div>

          {/* Subjects */}
          <h3 style={{ color: `${T.cream}AA`, fontSize: 13, fontWeight: 600, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Subjects
          </h3>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
            {SUBJECTS.map((s, i) => (
              <motion.button
                key={s.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  SoundManager.playUISound("click");
                  setTutorOpen(true);
                }}
                style={{
                  flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  padding: "12px 18px", borderRadius: 12,
                  background: `linear-gradient(145deg, ${T.goldMuted}, ${T.surface})`,
                  border: `1px solid ${T.gold}33`, cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{ color: T.gold, fontSize: 11, fontWeight: 600 }}>{s.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Quick progress peek */}
          <h3 style={{ color: `${T.cream}AA`, fontSize: 13, fontWeight: 600, margin: "20px 0 12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Quick Look
          </h3>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <AtlasProgressViz data={DEMO_DATA} />
          </motion.div>
        </motion.div>
      )}

      {/* Other tabs */}
      {(activeTab === "learn" || activeTab === "practice" || activeTab === "solver" || activeTab === "profile") && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "60px 20px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>
            {activeTab === "learn" && "📚"}
            {activeTab === "practice" && "✏️"}
            {activeTab === "solver" && "🔍"}
            {activeTab === "profile" && "👤"}
          </div>
          <h2 style={{ color: T.cream, fontWeight: 700, margin: "0 0 8px", textTransform: "capitalize" }}>{activeTab}</h2>
          <p style={{ color: `${T.cream}66`, fontSize: 14 }}>Coming soon — switch to Home to explore available features!</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { SoundManager.playUISound("click"); setActiveTab("home"); }}
            style={{
              marginTop: 20, padding: "10px 24px", borderRadius: 10,
              background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
              color: T.surfaceDark, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer",
            }}
          >
            Go to Home
          </motion.button>
        </motion.div>
      )}

      {/* Overlays */}
      {tutorOpen && (
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ type: "spring", damping: 26 }} style={{ position: "fixed", inset: 0, zIndex: 400, background: T.surfaceDark }}>
          <div style={{ position: "absolute", top: 12, left: 16, zIndex: 10 }}>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setTutorOpen(false); SoundManager.playUISound("click"); }}
              style={{ background: T.surface, border: `1px solid ${T.surfaceLighter}`, borderRadius: 8, padding: "6px 12px", color: T.cream, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
              <X size={14} /> Close
            </motion.button>
          </div>
          <AtlasTutorChat subject="Mathematics" topic="Fractions" />
        </motion.div>
      )}

      {examOpen && (
        <AtlasExamMode subject="General Knowledge Test" duration={30} onExit={() => { setExamOpen(false); }} />
      )}

      {/* Bottom nav */}
      <AtlasMobileNav active={activeTab} onChange={t => setActiveTab(t)} streak={7} />
    </div>
  );
}