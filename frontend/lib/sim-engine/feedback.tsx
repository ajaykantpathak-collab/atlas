/**
 * Visual Feedback System — Sparkles, confetti, glow, celebrations
 *
 * Provides animated visual feedback that makes interactions feel
 * rewarding and premium. Uses Framer Motion for smooth animations.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import type { FeedbackEvent, FeedbackType } from './types';
import { audioManager } from './audio';

// ─── Sparkle Particle ─────────────────────────────────────────

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const SPARKLE_COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'];

function generateSparkles(x: number, y: number, count: number = 12): SparkleParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    return {
      id: i,
      x: x + Math.cos(angle) * distance,
      y: y + Math.sin(angle) * distance,
      size: 4 + Math.random() * 8,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      delay: Math.random() * 0.1,
      duration: 0.5 + Math.random() * 0.3,
    };
  });
}

// ─── Confetti Particle ────────────────────────────────────────

interface ConfettiParticle {
  id: number;
  x: number;
  rotation: number;
  color: string;
  delay: number;
  shape: 'rect' | 'circle';
}

const CONFETTI_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6B9D', '#C780FA'];

function generateConfetti(count: number = 30): ConfettiParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    rotation: Math.random() * 360,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.3,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
  }));
}

// ─── Sparkle Burst Component ──────────────────────────────────

type LegacyFeedbackProps = {
  /** masters pass text/show/active/x/y — honor them, don't reject */
  message?: string; text?: string;
  show?: boolean; active?: boolean;
  x?: number; y?: number;
  onComplete?: () => void;
};

export function SparkleBurst({ x = 0, y = 0, show, active, onComplete }: LegacyFeedbackProps) {
  const [sparkles] = useState(() => generateSparkles(x, y, 12));

  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (show === false || active === false) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ x, y, scale: 0, opacity: 1 }}
            animate={{ x: s.x, y: s.y, scale: [0, 1, 0], opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: s.duration, delay: s.delay, ease: 'easeOut' }}
            className="absolute"
            style={{
              width: s.size,
              height: s.size,
            }}
          >
            {/* Star shape */}
            <svg viewBox="0 0 24 24" fill={s.color} className="w-full h-full">
              <path d="M12 0L14.4 8.4L24 12L14.4 15.6L12 24L9.6 15.6L0 12L9.6 8.4Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Confetti Celebration ─────────────────────────────────────

export function Confetti({ show, active, onComplete }: LegacyFeedbackProps) {
  const [particles] = useState(() => generateConfetti(40));

  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (show === false || active === false) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}%`, y: -20, rotate: 0, opacity: 1 }}
            animate={{ y: '110vh', rotate: p.rotation, opacity: [1, 1, 0] }}
            transition={{ duration: 2 + Math.random(), delay: p.delay, ease: 'easeIn' }}
            className="absolute"
            style={{
              width: p.shape === 'rect' ? 10 : 8,
              height: p.shape === 'rect' ? 14 : 8,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Success Banner ───────────────────────────────────────────

export function SuccessBanner({ message, text, show, active, onComplete }: LegacyFeedbackProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (show === false || active === false) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-4 shadow-xl">
        <p className="text-lg font-bold text-white">{message ?? text ?? 'Great job!'}</p>
      </div>
    </motion.div>
  );
}

// ─── Hint Bubble ──────────────────────────────────────────────

export function HintBubble({ message, text, show, active, onComplete }: LegacyFeedbackProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (show === false || active === false) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="absolute bottom-4 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="flex items-center gap-2 rounded-xl bg-blue-500/90 px-4 py-3 shadow-lg backdrop-blur-sm">
        <svg className="h-5 w-5 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <p className="text-sm font-medium text-white">{message ?? text ?? ''}</p>
      </div>
    </motion.div>
  );
}

// ─── Error Shake ──────────────────────────────────────────────

export function ErrorShake({ children, trigger }: { children: React.ReactNode; trigger: boolean }) {
  return (
    <motion.div
      animate={trigger ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Feedback Manager Hook ────────────────────────────────────

export interface FeedbackState {
  sparkles: { x: number; y: number; id: number } | null;
  confetti: boolean;
  successBanner: string | null;
  hintBubble: string | null;
  errorShake: boolean;
}

export function useFeedback() {
  const [state, setState] = useState<FeedbackState>({
    sparkles: null,
    confetti: false,
    successBanner: null,
    hintBubble: null,
    errorShake: false,
  });

  const [counter, setCounter] = useState(0);

  const trigger = useCallback((event: FeedbackEvent) => {
    const id = Date.now() + counter;
    setCounter(c => c + 1);

    // Play sound
    if (event.sound) {
      audioManager.play(event.sound as import('./types').SoundEffect);
    }

    switch (event.type) {
      case 'success':
        setState(s => ({ ...s, successBanner: event.message || 'Great job!', sparkles: event.x != null && event.y != null ? { x: event.x, y: event.y, id } : null }));
        break;
      case 'celebration':
        setState(s => ({ ...s, confetti: true, successBanner: event.message || 'You did it!' }));
        break;
      case 'partial':
        setState(s => ({ ...s, sparkles: event.x != null && event.y != null ? { x: event.x, y: event.y, id } : null }));
        break;
      case 'incorrect':
        setState(s => ({ ...s, errorShake: true }));
        setTimeout(() => setState(s => ({ ...s, errorShake: false })), 500);
        break;
      case 'hint':
        setState(s => ({ ...s, hintBubble: event.message || null }));
        break;
    }
  }, [counter]);

  const clearSparkles = useCallback(() => setState(s => ({ ...s, sparkles: null })), []);
  const clearConfetti = useCallback(() => setState(s => ({ ...s, confetti: false })), []);
  const clearSuccessBanner = useCallback(() => setState(s => ({ ...s, successBanner: null })), []);
  const clearHintBubble = useCallback(() => setState(s => ({ ...s, hintBubble: null })), []);

  return {
    state,
    trigger,
    clearSparkles,
    clearConfetti,
    clearSuccessBanner,
    clearHintBubble,
  };
}

// ─── Feedback Overlay (renders all feedback effects) ──────────

export function FeedbackOverlay({ state, clearSparkles, clearConfetti, clearSuccessBanner, clearHintBubble }: {
  state: FeedbackState;
  clearSparkles: () => void;
  clearConfetti: () => void;
  clearSuccessBanner: () => void;
  clearHintBubble: () => void;
}) {
  return (
    <>
      {state.sparkles && (
        <SparkleBurst
          key={state.sparkles.id}
          x={state.sparkles.x}
          y={state.sparkles.y}
          onComplete={clearSparkles}
        />
      )}
      {state.confetti && <Confetti onComplete={clearConfetti} />}
      {state.successBanner && (
        <SuccessBanner message={state.successBanner} onComplete={clearSuccessBanner} />
      )}
      {state.hintBubble && (
        <HintBubble message={state.hintBubble} onComplete={clearHintBubble} />
      )}
    </>
  );
}
