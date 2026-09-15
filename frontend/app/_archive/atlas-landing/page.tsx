'use client';

/**
 * ═══════════════════════════════════════════════════════════════════
 * ATLAS — "India's honest AI tutor" · cinematic landing page
 * ═══════════════════════════════════════════════════════════════════
 * Viewport 1 is a pure art piece: a canvas spiral galaxy (2,400 stars,
 * differential rotation, twinkle, depth-tilted disc) with the Three.js
 * Atlas world-element floating inside it, aurora whispers at 10%, film
 * grain, and per-layer mouse parallax. The ONLY text above the fold is
 * a tiny wordmark, one whispered line ("every answer, verified.") and
 * a breathing scroll cue. Scrolling away recedes the galaxy like
 * leaving a planet's orbit; the trust marquee drifts in from below.
 *
 * From scroll 2 onward, everything informative:
 *  2. Trust marquee      — the five real numbers, infinite scroll
 *  3. AstraLoop          — the product thinking for itself, live
 *  4. Feature trilogy    — sticky-stacked 3D-tilt glass cards w/ demos
 *  5. Class chips + CTA  — classes 6–12, Hinglish closing band
 *  6. Footer             — "No guesses. No shortcuts. No ratta."
 */

import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  Check,
  ChevronDown,
  LineChart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AtlasBadge, AtlasLogo } from '@/components/prism/AtlasDesignSystem';
import GalaxyCanvas from '@/components/landing/GalaxyCanvas';
import AstraLoop from '@/components/landing/AstraLoop';
const AstraParticles = dynamic(() => import('@/components/landing/AstraParticles'), {
  ssr: false,
});
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';

// ─────────────────────────────────────────────────────────────
// Lazy Three.js — the Atlas world element floating inside the galaxy
// ─────────────────────────────────────────────────────────────

const AtlasCore3D = dynamic(() => import('@/components/landing/AtlasCore3D'), {
  ssr: false,
  loading: () => <CoreFallback />,
});

/** Text-free fallback while Three.js loads — part of the art, never a label. */
function CoreFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="relative h-36 w-36">
        <div
          className="absolute inset-0 rounded-full border border-dashed border-[#F5A623]/25"
          style={{ animation: 'atlas-spin 18s linear infinite' }}
        />
        <div
          className="absolute inset-5 rounded-full border border-[#F5A623]/15"
          style={{ animation: 'atlas-spin-rev 26s linear infinite' }}
        />
        <div className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-[#F5A623]/20 blur-xl" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tokens & motion constants
// ─────────────────────────────────────────────────────────────

const FONT_DISPLAY = "'Space Grotesk', ui-sans-serif, system-ui, sans-serif";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPRING_SOFT = { type: 'spring', stiffness: 120, damping: 20 } as const;
const SPRING_POP = { type: 'spring', stiffness: 320, damping: 17 } as const;

const GLASS: React.CSSProperties = {
  background: 'linear-gradient(165deg, rgba(30,30,62,0.55) 0%, rgba(11,11,24,0.72) 100%)',
  border: '1px solid rgba(245,166,35,0.15)',
  boxShadow:
    'inset 0 1px 0 rgba(255,250,240,0.06), 0 30px 70px rgba(0,0,0,0.5), 0 8px 28px rgba(0,0,0,0.35)',
  backdropFilter: 'blur(18px) saturate(1.35)',
  WebkitBackdropFilter: 'blur(18px) saturate(1.35)',
};

const GOLD_TEXT: React.CSSProperties = {
  backgroundImage: 'linear-gradient(115deg, #FFE9C0 0%, #F5A623 48%, #D98E1B 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

// The five REAL numbers — never inflated, never guessed.
const TRUST = [
  { v: '6,400+', label: 'concepts mapped' },
  { v: '16,500+', label: 'generated practice questions' },
  { v: '8,800+', label: 'lessons' },
  { v: '945', label: 'interactive sims' },
  { v: '26,000+', label: 'board questions' },
] as const;

const CLASSES = [6, 7, 8, 9, 10, 11, 12] as const;

const CLASS_NOTES: Record<number, { title: string; note: string }> = {
  6: { title: 'Foundations', note: 'Fractions se force tak — har concept ko pehli baar sahi se samjho.' },
  7: { title: 'Pattern-seeking', note: 'Science ab experiments bolti hai. We let it talk — with 945 sims.' },
  8: { title: 'The ramp', note: 'Algebra deepens, reactions begin. Mistakes yahan cheap hain — that is the point.' },
  9: { title: 'The pivot year', note: 'Physics ki pehli asli equations. Method yahan banta hai — ya tootta hai.' },
  10: { title: 'Board year', note: '26,000+ board questions. Har answer verified — ratta optional, samajh nahi.' },
  11: { title: 'The leap', note: 'JEE/NEET base yahin banta hai. Depth pe focus — shortcuts pe nahi.' },
  12: { title: 'Board + beyond', note: 'Boards aa rahe hain? Hum ready karte hain — concept by concept, honestly.' },
};

// ─────────────────────────────────────────────────────────────
// Global CSS (keyframes + chrome) — injected once
// ─────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@keyframes atlas-aurora-a {
  0%, 100% { transform: translate3d(-6%, -4%, 0) scale(1) rotate(0deg); }
  33%      { transform: translate3d(7%, 5%, 0) scale(1.14) rotate(14deg); }
  66%      { transform: translate3d(-3%, 9%, 0) scale(0.94) rotate(-10deg); }
}
@keyframes atlas-aurora-b {
  0%, 100% { transform: translate3d(5%, 6%, 0) scale(1.05) rotate(0deg); }
  40%      { transform: translate3d(-8%, -5%, 0) scale(0.92) rotate(-16deg); }
  70%      { transform: translate3d(4%, -8%, 0) scale(1.12) rotate(9deg); }
}
@keyframes atlas-marquee { to { transform: translateX(-50%); } }
@keyframes atlas-pulse-ring {
  0%   { transform: scale(0.55); opacity: 0.75; }
  100% { transform: scale(1.9); opacity: 0; }
}
@keyframes atlas-spin { to { transform: rotate(360deg); } }
@keyframes atlas-spin-rev { to { transform: rotate(-360deg); } }
@keyframes atlas-shimmer {
  0%   { background-position: -180% 0; }
  100% { background-position: 260% 0; }
}
.marquee-track:hover { animation-play-state: paused; }
::selection { background: rgba(245, 166, 35, 0.35); color: #FFF7E6; }
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #06060F; }
::-webkit-scrollbar-thumb { background: #1C1C3A; border-radius: 8px; border: 2px solid #06060F; }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
`;

function AtlasStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

// ─────────────────────────────────────────────────────────────
// Shared motion primitives
// ─────────────────────────────────────────────────────────────

/** Scroll reveal: blur-lift entrance with spring physics. */
function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Magnetic wrapper — element leans toward the cursor, springs back. */
function Magnetic({
  children,
  className,
  disabled = false,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  strength?: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 170, damping: 15, mass: 0.35 });
  const y = useSpring(my, { stiffness: 170, damping: 15, mass: 0.35 });

  return (
    <motion.div
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={(e) => {
        if (disabled) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Gold primary CTA — gradient fill, glow, sheen sweep, magnetic. */
function GoldCta({ href, children, reduced }: { href: string; children: ReactNode; reduced: boolean }) {
  return (
    <Magnetic disabled={reduced}>
      <Link
        href={href}
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold"
        style={{
          background: 'linear-gradient(135deg, #FFD080 0%, #F5A623 45%, #C7841A 100%)',
          color: '#0C0C1A',
          boxShadow: '0 6px 30px rgba(245,166,35,0.35), 0 0 70px rgba(245,166,35,0.12)',
          fontFamily: FONT_DISPLAY,
        }}
      >
        <span
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, #FFE3AE 0%, #FFC75E 45%, #D98E1B 100%)' }}
        />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[180%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[340%]" />
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
          <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </Magnetic>
  );
}

/** Ghost secondary CTA — glass outline that warms on hover. */
function GhostCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-medium text-[#F0EAD6] backdrop-blur-md transition-all duration-300 hover:border-[#F5A623]/40 hover:text-[#FFD080]"
      style={{ fontFamily: FONT_DISPLAY }}
    >
      {children}
      <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
    </Link>
  );
}

/** Kicker + display heading with blur reveal. */
function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#F5A623]/80">
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className="mt-4 text-4xl font-bold leading-[1.08] text-[#F0EAD6] sm:text-5xl"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#A09DB8]">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 0 · FIXED ATMOSPHERE — aurora, grain, mouse spotlight (scroll 2+)
// ─────────────────────────────────────────────────────────────

function Atmosphere({ reduced }: { reduced: boolean }) {
  const spotRef = useRef<HTMLDivElement>(null);

  // Mouse-following spotlight with lerp — rAF, zero re-renders.
  useEffect(() => {
    if (reduced) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };
    const cur = { ...target };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;
      spotRef.current?.style.setProperty(
        'transform',
        `translate3d(${cur.x - 310}px, ${cur.y - 310}px, 0)`
      );
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* void base */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 0%, #0B0B1E 0%, #06060F 55%)' }}
      />

      {/* aurora blob A — gold, 60s drift */}
      <div
        className="absolute -left-[18%] -top-[22%] h-[72vmax] w-[72vmax] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.15) 0%, rgba(245,166,35,0.05) 32%, transparent 62%)',
          animation: reduced ? 'none' : 'atlas-aurora-a 60s ease-in-out infinite',
        }}
      />

      {/* aurora blob B — deep violet, 60s counter-drift */}
      <div
        className="absolute -bottom-[28%] -right-[16%] h-[80vmax] w-[80vmax] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.17) 0%, rgba(124,58,237,0.06) 34%, transparent 64%)',
          animation: reduced ? 'none' : 'atlas-aurora-b 60s ease-in-out infinite',
        }}
      />

      {/* mouse spotlight (lerped) */}
      <div
        ref={spotRef}
        className="absolute left-0 top-0 h-[620px] w-[620px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(245,166,35,0.08) 0%, rgba(245,166,35,0.03) 34%, transparent 65%)',
          transform: 'translate3d(-600px, -600px, 0)',
        }}
      />

      {/* film grain — SVG feTurbulence, whisper-quiet */}
      <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.04 }}>
        <filter id="atlas-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atlas-grain)" />
      </svg>

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(90% 90% at 50% 45%, transparent 55%, rgba(2,2,8,0.55) 100%)' }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Chrome — scroll progress + nav that arrives only after the art
// ─────────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #C7841A 0%, #F5A623 55%, #FFD080 100%)',
        boxShadow: '0 0 12px rgba(245,166,35,0.5)',
      }}
    />
  );
}

function Nav({ reduced }: { reduced: boolean }) {
  const [entered, setEntered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Viewport 1 is text-free chrome; the nav arrives only once the art
  // is mostly behind us — part of the "leaving orbit" handoff.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setEntered(y > window.innerHeight * 0.6);
      setScrolled(y > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {entered && (
        <motion.header
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-0 top-0 z-50"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div
              className="mt-3 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500"
              style={
                scrolled
                  ? {
                      ...GLASS,
                      background: 'linear-gradient(165deg, rgba(20,20,42,0.75), rgba(8,8,18,0.8))',
                    }
                  : { border: '1px solid transparent' }
              }
            >
              <Link href="/" className="flex items-center gap-2.5" aria-label="ATLAS home">
                <AtlasLogo size={30} variant="wordmark" animated={!reduced} />
              </Link>

              <nav className="hidden items-center gap-7 text-sm text-[#A09DB8] md:flex">
                <a href="#numbers" className="transition-colors hover:text-[#FFD080]">Numbers</a>
                <a href="#loop" className="transition-colors hover:text-[#FFD080]">The loop</a>
                <a href="#trilogy" className="transition-colors hover:text-[#FFD080]">Why honest</a>
                <a href="#classes" className="transition-colors hover:text-[#FFD080]">Classes</a>
              </nav>

              <Magnetic disabled={reduced} strength={0.25}>
                <Link
                  href="/welcome"
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(245,166,35,0.35)]"
                  style={{
                    background: 'linear-gradient(135deg, #FFD080, #F5A623 55%, #C7841A)',
                    color: '#0C0C1A',
                    fontFamily: FONT_DISPLAY,
                  }}
                >
                  Start free
                  <ArrowRight size={14} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// 1 · VIEWPORT ONE — the art. No headline, no copy, no CTAs.
//     Galaxy → aurora whispers → 3D world element → grain → vignette,
//     every layer on its own mouse-parallax rate, and a scroll exit
//     choreographed like leaving a planet's orbit.
// ─────────────────────────────────────────────────────────────

function HeroArt({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // ── scroll choreography: leaving orbit ──
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']); // the whole sky lags
  const galScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]); // you fly through the disc
  const galY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);
  const galOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]); // the world recedes below
  const coreY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const coreOpacity = useTransform(scrollYProgress, [0.1, 0.85], [1, 0]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  // ── mouse parallax: each depth layer drifts at its own rate ──
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 42, damping: 16, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 42, damping: 16, mass: 0.7 });
  const galPX = useTransform(smx, (v) => v * -24);
  const galPY = useTransform(smy, (v) => v * -16);
  const corePX = useTransform(smx, (v) => v * -44);
  const corePY = useTransform(smy, (v) => v * -30);
  const aurPX = useTransform(smx, (v) => v * 18);
  const aurPY = useTransform(smy, (v) => v * 12);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, mx, my]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden"
      style={{ height: '100svh' }}
      aria-label="Atlas"
    >
      {/* the page's real h1 — present for crawlers and screen readers, invisible to the eye */}
      <h1 className="sr-only">ATLAS — India&apos;s honest AI tutor for CBSE Classes 6–12</h1>

      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: artY }}>
        {/* deep-space base */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(130% 96% at 50% 26%, #0B0B22 0%, #060614 48%, #03030A 100%)' }}
        />

        {/* LAYER 1 · galaxy — deepest plane, largest parallax lag */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale: galScale, y: galY, opacity: galOpacity }}
        >
          <motion.div className="absolute -inset-[5%]" style={reduced ? undefined : { x: galPX, y: galPY }}>
            <GalaxyCanvas reduced={reduced} />
          </motion.div>
        </motion.div>

        {/* LAYER 2 · aurora whispers @ 10% — counter-parallax drift */}
        <motion.div
          className="absolute inset-0 overflow-hidden opacity-10"
          aria-hidden
          style={reduced ? undefined : { x: aurPX, y: aurPY }}
        >
          <div
            className="absolute -left-[16%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full will-change-transform"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.5) 0%, rgba(245,166,35,0.16) 32%, transparent 62%)',
              animation: reduced ? 'none' : 'atlas-aurora-a 64s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -bottom-[26%] -right-[14%] h-[76vmax] w-[76vmax] rounded-full will-change-transform"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0.18) 34%, transparent 64%)',
              animation: reduced ? 'none' : 'atlas-aurora-b 64s ease-in-out infinite',
            }}
          />
        </motion.div>

        {/* LAYER 3 · the Three.js world element, floating within the galaxy */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduced ? undefined : { scale: coreScale, y: coreY, opacity: coreOpacity }}
        >
          <motion.div
            className="relative h-[54vmin] max-h-[500px] w-[54vmin] max-w-[500px] -translate-y-[4vh]"
            style={reduced ? undefined : { x: corePX, y: corePY }}
          >
            <Suspense fallback={<CoreFallback />}>
              <AtlasCore3D reduced={reduced} />
            </Suspense>
          </motion.div>
        </motion.div>

        {/* LAYER 3.5 · GPGPU particle field — 250k GPU-simulated stars,
             curl-noise turbulence, pointer repel/swirl, text-morph.
             The dense, alive middle plane the galaxy stars read through. */}
        <motion.div
          className="pointer-events-auto absolute inset-0"
          style={reduced ? undefined : { opacity: galOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.6 }}
        >
          <Suspense fallback={null}>
            <AstraParticles reduced={reduced} />
          </Suspense>
        </motion.div>

        {/* LAYER 4 · film grain */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ opacity: 0.05 }}
          aria-hidden
        >
          <filter id="atlas-grain-hero">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#atlas-grain-hero)" />
        </svg>

        {/* LAYER 5 · vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(88% 82% at 50% 44%, transparent 52%, rgba(2,2,8,0.62) 100%)' }}
        />
      </motion.div>

      {/* ── the only text in viewport 1 ── */}

      {/* tiny centred wordmark */}
      <motion.div
        className="absolute left-1/2 top-7 z-10 -translate-x-1/2 opacity-80"
        style={reduced ? undefined : { opacity: chromeOpacity }}
      >
        <AtlasLogo size={30} variant="wordmark" animated={!reduced} />
      </motion.div>

      {/* one whispered line — fades in after two seconds, barely there */}
      <motion.div
        className="absolute bottom-[17%] left-1/2 z-10 -translate-x-1/2"
        style={reduced ? undefined : { opacity: chromeOpacity }}
      >
        <motion.p
          className="whitespace-nowrap text-[11px] tracking-[0.42em] text-[#C9C4DD] sm:text-xs"
          style={{ textShadow: '0 0 26px rgba(245,166,35,0.22)' }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, filter: 'blur(10px)' }}
          animate={{ opacity: 0.68, y: 0, filter: 'blur(0px)' }}
          transition={reduced ? { delay: 0.4, duration: 0.6 } : { delay: 2, duration: 1.8, ease: EASE }}
        >
          every answer, verified.
        </motion.p>
      </motion.div>

      {/* scroll cue — thin line + dot, breathing */}
      <motion.a
        href="#numbers"
        aria-label="Scroll to begin"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        style={reduced ? undefined : { opacity: chromeOpacity }}
      >
        <span className="flex flex-col items-center gap-2.5">
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-[#FFD080]"
            style={{ boxShadow: '0 0 12px rgba(245,166,35,0.95)' }}
            animate={reduced ? undefined : { scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="block h-12 w-px origin-top"
            style={{ background: 'linear-gradient(to bottom, rgba(245,166,35,0.75), transparent)' }}
            animate={reduced ? undefined : { scaleY: [1, 0.55, 1], opacity: [0.9, 0.4, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 2 · TRUST MARQUEE — the five real counters, infinite loop
// ─────────────────────────────────────────────────────────────

function TrustMarquee({ reduced }: { reduced: boolean }) {
  return (
    <section
      id="numbers"
      aria-label="Real platform numbers"
      className="relative z-10 border-y border-white/[0.06] bg-[#08081A]/70 py-7"
      style={{
        backdropFilter: 'blur(8px)',
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="overflow-hidden">
        <div
          className="marquee-track flex w-max items-center"
          style={{ animation: reduced ? 'none' : 'atlas-marquee 42s linear infinite' }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {TRUST.map((s) => (
                <div key={`${copy}-${s.label}`} className="flex shrink-0 items-center">
                  <div className="px-10 py-1 text-center">
                    <span
                      className="text-2xl font-bold sm:text-3xl"
                      style={{ ...GOLD_TEXT, fontFamily: FONT_DISPLAY }}
                    >
                      {s.v}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-[#6B6890] sm:text-[11px]">
                      {s.label}
                    </span>
                  </div>
                  <span className="select-none text-lg text-[#F5A623]/40" aria-hidden>
                    ◆
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 2.5 · ASTRA LOOP — the product thinking for itself, live
// ─────────────────────────────────────────────────────────────

function LoopSection() {
  return (
    <section id="loop" className="relative z-10 px-4 pb-4 pt-24 sm:pt-28">
      <SectionHead
        kicker="Watch it think"
        title={
          <>
            One loop. <span style={GOLD_TEXT}>Four honest moves.</span>
          </>
        }
        sub="Verified answers, living simulations, Hinglish voice, adaptive difficulty — running live below, unedited. This is the product, on repeat."
      />
      <Reveal y={44}>
        <AstraLoop />
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 3A · Tilt + stack primitives for the trilogy
// ─────────────────────────────────────────────────────────────

/** Card that tilts toward the cursor in 3D, with a gold glare. */
function TiltCard({
  children,
  reduced,
  className,
}: {
  children: ReactNode;
  reduced: boolean;
  className?: string;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.4 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });

  return (
    <motion.div
      className={className}
      style={{
        rotateX: reduced ? undefined : rotateX,
        rotateY: reduced ? undefined : rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 9);
        rx.set(-py * 9);
        setGlare({ x: (px + 0.5) * 100, y: (py + 0.5) * 100, o: 1 });
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
        setGlare((g) => ({ ...g, o: 0 }));
      }}
    >
      {children}
      {/* cursor glare */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: reduced ? 0 : glare.o,
          background: `radial-gradient(46% 60% at ${glare.x}% ${glare.y}%, rgba(245,166,35,0.09) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

/** One entry of the sticky deck: sticks, then scales away as the next card arrives. */
function StackCard({
  index,
  reduced,
  children,
}: {
  index: number;
  reduced: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const dim = useTransform(scrollYProgress, [0.55, 1], [1, 0.35]);

  return (
    <div ref={ref} className="h-[106vh]">
      <motion.div
        className="sticky"
        style={{
          top: `calc(11vh + ${index * 30}px)`,
          scale: reduced ? undefined : scale,
          opacity: reduced ? undefined : dim,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3B · LIVE MICRO-DEMOS
// ─────────────────────────────────────────────────────────────

/** (a) Verified answer stepping through, gold check-stamp. */
function DemoVerified() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const delay = phase === 3 ? 1900 : phase === 7 ? 2300 : 950;
    const t = setTimeout(() => setPhase((p) => (p + 1) % 8), delay);
    return () => clearTimeout(t);
  }, [phase]);

  const steps = [1, 2].filter((s) => phase >= s);
  const showAnswer = phase >= 3;
  const stamped = phase >= 4;

  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col justify-center gap-3 px-1">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={SPRING_SOFT}
        className="self-end rounded-2xl rounded-br-md px-4 py-3 text-sm text-[#F0EAD6]"
        style={{
          background: 'linear-gradient(135deg, rgba(245,166,35,0.16), rgba(124,58,237,0.14))',
          border: '1px solid rgba(245,166,35,0.25)',
          maxWidth: '85%',
        }}
      >
        A car goes 0 → 20 m/s in 5 s. Acceleration?
      </motion.div>

      {steps.map((s) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, x: -14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ ...SPRING_SOFT, delay: 0.05 }}
          className="flex max-w-[88%] items-start gap-2.5"
        >
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
            style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }}
          >
            {s}
          </span>
          <p className="rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-sm text-[#A09DB8]">
            {s === 1 ? (
              <>Rest → u = 0. Uniform acceleration → use a = (v − u) / t.</>
            ) : (
              <>Substitute honestly: a = (20 − 0) / 5.</>
            )}
          </p>
        </motion.div>
      ))}

      <div className="relative mt-1 min-h-[64px]">
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={SPRING_SOFT}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[#FFD080]"
              style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.3)' }}
            >
              a = 4 m/s²
            </motion.div>
          )}
        </AnimatePresence>

        {/* the gold check-stamp */}
        <AnimatePresence>
          {stamped && (
            <motion.div
              key="stamp"
              initial={{ opacity: 0, scale: 2.1, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -9 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={SPRING_POP}
              className="absolute -top-2 right-1 z-10 sm:right-6"
            >
              <span
                className="absolute inset-0 rounded-xl border border-[#F5A623]/50"
                style={{ animation: 'atlas-pulse-ring 1.6s ease-out infinite' }}
              />
              <div
                className="rounded-xl border-2 border-[#F5A623] px-4 py-2"
                style={{
                  background: 'rgba(245,166,35,0.09)',
                  boxShadow: '0 0 30px rgba(245,166,35,0.3), inset 0 0 14px rgba(245,166,35,0.12)',
                }}
              >
                <div
                  className="flex items-center gap-2 text-sm font-bold tracking-[0.18em] text-[#FFD080]"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  <ShieldCheck size={15} /> VERIFIED
                </div>
                <div className="text-[8.5px] tracking-[0.22em] text-[#F5A623]/70">
                  CHECKED NUMERICALLY · 0 HALLUCINATION
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-1 text-[11px] tracking-wide text-[#6B6890]">
        Live replay — exactly how every answer earns your trust.
      </p>
    </div>
  );
}

/** (b) Mini sim canvas — animated atom / orbit, drawn in 2D canvas. */
function SimOrbitCanvas({ reduced }: { reduced: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrapRef, { amount: 0.2 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let t = 1.7;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const orbits = [
      { r: 0.34, tilt: -0.5, squash: 0.42, speed: 1.25, color: '#F5A623', size: 2.8 },
      { r: 0.62, tilt: 0.4, squash: 0.5, speed: 0.8, color: '#7CC4FF', size: 2.3 },
      { r: 0.92, tilt: -0.12, squash: 0.46, speed: 0.55, color: '#C77DFF', size: 3.1 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.46;

      // nucleus — breathing gold core
      const pulse = 1 + Math.sin(t * 2.2) * 0.1;
      const nr = R * 0.13 * pulse;
      const nuc = ctx.createRadialGradient(cx, cy, 0, cx, cy, nr * 2.4);
      nuc.addColorStop(0, 'rgba(255,222,150,0.95)');
      nuc.addColorStop(0.35, 'rgba(245,166,35,0.55)');
      nuc.addColorStop(1, 'rgba(245,166,35,0)');
      ctx.fillStyle = nuc;
      ctx.beginPath();
      ctx.arc(cx, cy, nr * 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, nr * 0.62, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE9C0';
      ctx.fill();

      // orbits + electrons with comet trails
      orbits.forEach((o, oi) => {
        const rx = o.r * R;
        const ry = rx * o.squash;
        const cosT = Math.cos(o.tilt);
        const sinT = Math.sin(o.tilt);

        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, o.tilt, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(240,234,214,0.10)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const a = t * o.speed + oi * 2.1;
        for (let k = 5; k >= 0; k--) {
          const aa = a - k * 0.13;
          const lx = Math.cos(aa) * rx;
          const ly = Math.sin(aa) * ry;
          const x = cx + lx * cosT - ly * sinT;
          const y = cy + lx * sinT + ly * cosT;
          const fade = 1 - k / 6;
          ctx.beginPath();
          ctx.arc(x, y, o.size * fade, 0, Math.PI * 2);
          ctx.fillStyle = o.color;
          ctx.globalAlpha = k === 0 ? 1 : fade * 0.5;
          ctx.shadowColor = o.color;
          ctx.shadowBlur = k === 0 ? 12 : 0;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });
    };

    const loop = () => {
      draw();
      if (!reduced) {
        t += 0.016;
        raf = requestAnimationFrame(loop);
      }
    };

    if (inView) loop();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inView, reduced]);

  return (
    <div className="flex h-full w-full flex-col">
      <div
        ref={wrapRef}
        className="relative min-h-[260px] flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/25"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <span className="absolute left-3 top-3 rounded-md border border-white/[0.08] bg-black/40 px-2 py-1 text-[10px] tracking-[0.18em] text-[#6B6890]">
          SIM · ATOMIC MODELS
        </span>
      </div>
      <p className="mt-3 text-[11px] tracking-wide text-[#6B6890]">
        1 of 945 sims — drag-sliders ship with the real ones.
      </p>
    </div>
  );
}

/** (c) Mastery bar springing to 80% — with ticks, shimmer, badge. */
function MasteryDemo({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let stopped = false;
    let controls: { stop: () => void } | null = null;
    let resetT: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      if (stopped) return;
      controls = animate(0, 80, {
        duration: reduced ? 0.01 : 1.6,
        ease: EASE,
        onUpdate: (v) => setVal(Math.round(v)),
      });
      resetT = setTimeout(() => {
        if (stopped) return;
        setVal(0);
        run();
      }, 4600);
    };
    run();
    return () => {
      stopped = true;
      controls?.stop();
      if (resetT) clearTimeout(resetT);
    };
  }, [inView, reduced]);

  const mastered = val >= 78;

  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-center gap-6 px-1">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-[#6B6890]">Current chapter</p>
          <p className="text-sm font-semibold text-[#F0EAD6]">Motion · Class 9</p>
        </div>
        <div className="relative">
          <AnimatePresence>
            {mastered && (
              <motion.span
                key="badge"
                initial={{ opacity: 0, scale: 0.5, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={SPRING_POP}
                className="absolute -top-9 right-0"
              >
                <AtlasBadge label="Mastered" variant="mastery" size="sm" icon={<Check size={11} />} animated />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="text-5xl font-bold" style={{ ...GOLD_TEXT, fontFamily: FONT_DISPLAY }}>
            {val}
            <span className="text-2xl">%</span>
          </span>
        </div>
      </div>

      {/* main bar */}
      <div
        className="relative h-3.5 overflow-hidden rounded-full bg-white/[0.05]"
        style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}
      >
        {[25, 50, 75].map((tick) => (
          <span key={tick} className="absolute top-0 h-full w-px bg-white/[0.08]" style={{ left: `${tick}%` }} />
        ))}
        <div
          className="absolute left-[80%] top-0 h-full w-0.5 bg-[#F5A623]/60"
          style={{ boxShadow: '0 0 8px rgba(245,166,35,0.7)' }}
        />
        <div
          className="relative h-full rounded-full"
          style={{
            width: `${val}%`,
            background: 'linear-gradient(90deg, rgba(199,132,26,0.85), #F5A623 65%, #FFD080)',
            boxShadow: '0 0 16px rgba(245,166,35,0.45)',
          }}
        >
          <span
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              backgroundImage:
                'linear-gradient(100deg, transparent 30%, rgba(255,244,214,0.5) 50%, transparent 70%)',
              backgroundSize: '220% 100%',
              animation: reduced ? 'none' : 'atlas-shimmer 1.9s linear infinite',
            }}
          />
        </div>
      </div>
      <p className="-mt-3 text-[10px] tracking-[0.2em] text-[#F5A623]/60">▲ BOARD-READY AT 80%</p>

      {/* sibling concepts */}
      {[
        { label: 'Kinematics basics', pct: 64 },
        { label: 'Graphs of motion', pct: 91 },
      ].map((row, i) => (
        <div key={row.label}>
          <div className="mb-1.5 flex justify-between text-[11px]">
            <span className="text-[#A09DB8]">{row.label}</span>
            <span className="font-semibold text-[#FFD080]">{inView ? row.pct : 0}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  i === 0 ? 'rgba(124,196,255,0.75)' : 'linear-gradient(90deg,#F5A623,#FFD080)',
              }}
              initial={{ width: 0 }}
              animate={{ width: inView ? `${row.pct}%` : 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.3 + i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3 · FEATURE TRILOGY — sticky-stacked, tilting, glass
// ─────────────────────────────────────────────────────────────

const FEATURES: {
  id: string;
  no: string;
  kicker: string;
  icon: React.ElementType;
  title: ReactNode;
  copy: string;
  points: string[];
  demo: (reduced: boolean) => ReactNode;
}[] = [
  {
    id: 'verified',
    no: '01',
    kicker: 'The honesty engine',
    icon: ShieldCheck,
    title: (
      <>
        Every answer verified. <span style={GOLD_TEXT}>Never guessed.</span>
      </>
    ),
    copy:
      'Solutions are derived from the CBSE concept graph and checked numerically before they reach you. If the tutor cannot verify a step, it says so — out loud. That is the whole product promise.',
    points: [
      'Derived from the concept graph — not vibed',
      'Checked numerically before delivery',
      'Cannot verify? It tells you, honestly',
    ],
    demo: () => <DemoVerified />,
  },
  {
    id: 'sims',
    no: '02',
    kicker: '945 living laboratories',
    icon: Atom,
    title: (
      <>
        Abstract chapters you can <span style={GOLD_TEXT}>actually touch.</span>
      </>
    ),
    copy:
      '945 interactive simulations turn diagrams into experiments. Drag the slider, flip the switch, watch the physics react — then meet the same setup again in your board paper.',
    points: [
      'Physics, Chemistry, Bio & Maths covered',
      'Drag, tweak, break — the model responds',
      'Parameters aligned to board questions',
    ],
    demo: (reduced) => <SimOrbitCanvas reduced={reduced} />,
  },
  {
    id: 'mastery',
    no: '03',
    kicker: 'Weak spots cannot hide',
    icon: LineChart,
    title: (
      <>
        Mastery that climbs <span style={GOLD_TEXT}>while you sleep on it.</span>
      </>
    ),
    copy:
      'Every attempt updates a per-concept mastery score. Weak concepts resurface until they hit 80% — board-ready. No green ticks of false comfort; the number is the number.',
    points: [
      'Per-concept scores, updated every attempt',
      'Weak nodes resurface until fixed',
      'Board-ready = every concept ≥ 80%',
    ],
    demo: (reduced) => <MasteryDemo reduced={reduced} />,
  },
];

function FeatureCard({
  feature,
  reduced,
}: {
  feature: (typeof FEATURES)[number];
  reduced: boolean;
}) {
  const Icon = feature.icon;
  return (
    <TiltCard reduced={reduced} className="relative">
      <div className="relative overflow-hidden rounded-[28px]" style={{ ...GLASS }}>
        {/* ghost index */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-7 select-none text-[7rem] font-bold leading-none text-white/[0.035]"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          {feature.no}
        </span>
        {/* top sheen line */}
        <span
          aria-hidden
          className="absolute inset-x-10 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.5), transparent)' }}
        />

        <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:p-12">
          {/* copy side */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.28)',
                  color: '#F5A623',
                  boxShadow: '0 0 18px rgba(245,166,35,0.15)',
                }}
              >
                <Icon size={19} />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F5A623]/80">
                {feature.kicker}
              </p>
            </div>

            <h3
              className="mt-5 text-3xl font-bold leading-[1.12] text-[#F0EAD6] sm:text-4xl"
              style={{ fontFamily: FONT_DISPLAY }}
            >
              {feature.title}
            </h3>

            <p className="mt-4 text-[15px] leading-relaxed text-[#A09DB8]">{feature.copy}</p>

            <ul className="mt-6 space-y-2.5">
              {feature.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-[#C9C4DD]">
                  <span
                    className="mt-0.5 flex shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: 'rgba(245,166,35,0.12)',
                      color: '#F5A623',
                      width: 18,
                      height: 18,
                    }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* live demo side */}
          <div
            className="relative flex items-center rounded-2xl p-5 sm:p-6"
            style={{
              background: 'rgba(4,4,12,0.45)',
              border: '1px solid rgba(255,250,240,0.06)',
              boxShadow: 'inset 0 1px 0 rgba(255,250,240,0.04)',
            }}
          >
            {feature.demo(reduced)}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function TrilogySection({ reduced }: { reduced: boolean }) {
  return (
    <section id="trilogy" className="relative z-10 px-4 pb-10 pt-28 sm:pt-32">
      <SectionHead
        kicker="Why students stay"
        title={
          <>
            Three habits of an <span style={GOLD_TEXT}>honest tutor.</span>
          </>
        }
        sub="No dark patterns. No dopamine slot-machine. Just verification, living simulations and mastery you can audit."
      />

      <div className="mx-auto mt-16 max-w-5xl">
        {FEATURES.map((f, i) => (
          <StackCard key={f.id} index={i} reduced={reduced}>
            <Reveal y={44}>
              <FeatureCard feature={f} reduced={reduced} />
            </Reveal>
          </StackCard>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 4 · CLASS CHIPS + CTA BAND
// ─────────────────────────────────────────────────────────────

function ClassesSection() {
  const [sel, setSel] = useState<number>(10);
  const note = CLASS_NOTES[sel];

  return (
    <section id="classes" className="relative z-10 px-4 py-24 sm:py-28">
      <SectionHead
        kicker="Classes 6–12 · CBSE"
        title={
          <>
            Your class. Your pace. <span style={GOLD_TEXT}>Same honesty.</span>
          </>
        }
        sub="Pick a class — the tutor, the sims and the mastery engine ship with all of them."
      />

      <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
        {CLASSES.map((n) => {
          const active = sel === n;
          return (
            <button
              key={n}
              onClick={() => setSel(n)}
              className="rounded-2xl p-[1.5px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]/60"
              style={{
                background: active
                  ? 'linear-gradient(135deg, #FFE9C0 0%, #F5A623 42%, #7C3AED 100%)'
                  : 'rgba(255,250,240,0.09)',
                boxShadow: active ? '0 0 28px rgba(245,166,35,0.28)' : 'none',
                transform: active ? 'translateY(-2px)' : 'none',
              }}
              aria-pressed={active}
            >
              <span
                className="flex items-center justify-center rounded-[14.5px] px-5 py-3 text-sm font-semibold transition-colors duration-300"
                style={{
                  background: active ? 'rgba(22,16,8,0.94)' : '#0B0B18',
                  color: active ? '#FFD080' : '#A09DB8',
                  fontFamily: FONT_DISPLAY,
                }}
              >
                Class {n}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-8 min-h-[76px] max-w-xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#F5A623]">{note.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#A09DB8]">{note.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CtaBand({ reduced }: { reduced: boolean }) {
  return (
    <section id="cta" className="relative z-10 overflow-hidden px-4 py-28 text-center sm:py-36">
      {/* rotating dashed rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#F5A623]/10"
        style={{ animation: reduced ? 'none' : 'atlas-spin 90s linear infinite' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[880px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F5A623]/[0.07]"
        style={{ animation: reduced ? 'none' : 'atlas-spin-rev 140s linear infinite' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'rgba(245,166,35,0.09)', filter: 'blur(110px)' }}
      />

      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#F5A623]/80">
            The honest parting shot
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="mt-5 text-4xl font-bold leading-[1.1] text-[#F0EAD6] sm:text-6xl"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            Board aa raha hai?
            <br />
            <span style={GOLD_TEXT}>Hum ready karte hain.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#A09DB8]">
            Classes 6–12 · full CBSE · every answer verified, never guessed. Start with your
            weakest chapter — the tutor already knows which one it probably is.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldCta href="/welcome" reduced={reduced}>
              Start with your weakest chapter
            </GoldCta>
            <GhostCta href="#trilogy">See the proof again</GhostCta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 5 · FOOTER
// ─────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/[0.06] bg-[#050510]/85 px-4 py-14"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <AtlasLogo size={34} variant="wordmark" />
          <p className="mt-5 text-xl font-bold text-[#F0EAD6]" style={{ fontFamily: FONT_DISPLAY }}>
            No guesses. No shortcuts. <span style={GOLD_TEXT}>No ratta.</span>
          </p>
          <p className="mt-2 text-sm text-[#6B6890]">India&apos;s honest AI tutor — CBSE Classes 6–12.</p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B6890]">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#A09DB8]">
            {[
              { href: '/competency-tutor', label: 'Verified Tutor' },
              { href: '/simulations', label: '945 Simulations' },
              { href: '/topic-map', label: 'Knowledge Map' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#FFD080]"
                >
                  {l.label}
                  <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B6890]">On this page</p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#A09DB8]">
            {[
              { href: '#numbers', label: 'The real numbers' },
              { href: '#loop', label: 'The loop, live' },
              { href: '#trilogy', label: 'The honesty trilogy' },
              { href: '#classes', label: 'Classes 6–12' },
              { href: '#cta', label: 'Start free' },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-[#FFD080]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-6 text-xs text-[#6B6890] sm:flex-row">
        <span>© 2026 ATLAS · Built honestly in India</span>
        <span className="inline-flex items-center gap-2">
          <Sparkles size={12} className="text-[#F5A623]/60" />
          Har jawab verified — kabhi guess nahi.
        </span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  const reduced = !!useReducedMotion();

  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-[#06060F] text-[#F0EAD6] antialiased"
      style={{ fontFamily: FONT_DISPLAY }}
    >
      <AtlasStyles />
      <ScrollProgress />
      <Atmosphere reduced={reduced} />
      <Nav reduced={reduced} />

      <main id="main-content" className="relative z-10">
        {/* viewport 1 — the art */}
        <HeroArt reduced={reduced} />

        {/* viewport 2 onward — everything informative */}
        <motion.div
          initial={{ y: 64, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <TrustMarquee reduced={reduced} />
        </motion.div>

        <LoopSection />
        <TrilogySection reduced={reduced} />
        <ClassesSection />
        <CtaBand reduced={reduced} />
      </main>

      <Footer />
    </div>
  );
}
