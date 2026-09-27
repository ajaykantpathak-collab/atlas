'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Lightbulb,
  MessageCircle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { sanitizeHtml } from '@/lib/sanitize';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Step {
  description: string;
  expression?: string;
  highlight?: boolean;
}

export interface MasteryChange {
  before: number;
  after: number;
}

export interface FeedbackResult {
  correct: boolean;
  partial: boolean;
  correct_answer: string;
  explanation: string;
  steps: Step[];
}

export interface FeedbackSystemProps {
  result: FeedbackResult;
  masteryChange: MasteryChange;
  onNext: () => void;
  onAskTeacher: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const AUTO_ADVANCE_DELAY = 3000;

interface FeedbackMessage {
  headline: string;
  sub: string;
  icon?: string;
}

// Chrome copy lives in messages/{en,hi}.json (namespace "feedback") so the
// EN/हिंदी toggle translates it; the authored question/explanation content
// is NOT part of this map and stays in its authored language.
interface FeedbackBankRef {
  key: 'correct' | 'partial' | 'incorrect';
  i: number;
}

function bankFor(key: 'correct' | 'partial' | 'incorrect', n: number): FeedbackBankRef[] {
  return Array.from({ length: n }, (_, i) => ({ key, i }));
}
const CORRECT_MESSAGES: FeedbackBankRef[] = bankFor('correct', 5);
const INCORRECT_MESSAGES: FeedbackBankRef[] = bankFor('incorrect', 4);
const PARTIAL_MESSAGES: FeedbackBankRef[] = bankFor('partial', 3);

// ─── Animation Variants ──────────────────────────────────────────────────────

const shakeTransition = {
  x: [0, -8, 7, -5, 4, -3, 2, -1, 0],
  transition: { duration: 0.7, ease: 'easeInOut' },
};

const springBounce = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 14,
  mass: 0.8,
};

const fadeSlideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(val: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, val));
}

function renderLatex(expression: string, block = false): string {
  try {
    // trust:true lets authored expressions use \html* — output is sanitized
    // before innerHTML so those commands can't carry event handlers/URIs.
    return sanitizeHtml(katex.renderToString(expression, {
      displayMode: block,
      throwOnError: false,
      strict: false,
      trust: true,
    }));
  } catch {
    return expression;
  }
}

// ─── StepDisplay Sub-component ───────────────────────────────────────────────

function StepDisplay({ steps }: { steps: Step[] }) {
  const t = useTranslations('feedback');
  return (
    <div className="space-y-3" role="list" aria-label={t('stepsAria')}>
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          variants={staggerItem}
          className="flex gap-3 items-start"
          role="listitem"
        >
          <div
            className={
              'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold '
              + (step.highlight
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'bg-white/10 text-gray-400 border border-white/10')
            }
            aria-hidden="true"
          >
            {idx + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm text-gray-300 leading-relaxed">
              {step.description}
            </p>
            {step.expression && (
              <div
                className={
                  'mt-2 p-3 rounded-lg text-center '
                  + (step.highlight
                    ? 'bg-brand-500/10 border border-brand-500/20'
                    : 'bg-white/5 border border-white/5')
                }
                dangerouslySetInnerHTML={{ __html: renderLatex(step.expression, true) }}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Mastery Bar Sub-component ───────────────────────────────────────────────

function MasteryBar({ before, after, direction }: { before: number; after: number; direction: 'up' | 'down' | 'same' }) {
  const t = useTranslations('feedback');
  const [displayed, setDisplayed] = useState(before);
  const afterClamped = clamp(after);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(afterClamped), 400);
    return () => clearTimeout(timer);
  }, [afterClamped]);

  const delta = afterClamped - before;
  const isUp = direction === 'up';
  const barColor = isUp ? 'from-mint to-emerald-400' : direction === 'down' ? 'from-red-500 to-rose-400' : 'from-amber-400 to-yellow-300';
  const arrowColor = isUp ? 'text-mint' : direction === 'down' ? 'text-red-400' : 'text-amber-400';
  const ArrowIcon = isUp ? TrendingUp : direction === 'down' ? TrendingDown : Minus;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {t('masteryLabel')}
        </span>
        <div className="flex items-center gap-1.5" aria-live="polite" aria-atomic="true">
          <ArrowIcon className={`w-4 h-4 ${arrowColor}`} aria-hidden="true" />
          <span className="text-sm font-bold text-white tabular-nums">
            {clamp(before)}% → {afterClamped}%
          </span>
          {delta !== 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                isUp ? 'bg-mint/20 text-mint' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {isUp ? '+' : ''}{delta}%
            </motion.span>
          )}
        </div>
      </div>
      <div
        className="h-3 rounded-full bg-white/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={afterClamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Mastery: ${afterClamped}%`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} relative`}
          initial={{ width: `${before}%` }}
          animate={{ width: `${afterClamped}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Countdown Timer Sub-component ──────────────────────────────────────────

function CountdownRing({ remaining, total }: { remaining: number; total: number }) {
  const progress = remaining / total;
  const circumference = 2 * Math.PI * 10;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative w-6 h-6" aria-hidden="true">
      <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <motion.circle
          cx="12" cy="12" r="10"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: total / 1000, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function FeedbackSystem({
  result,
  masteryChange,
  onNext,
  onAskTeacher,
}: FeedbackSystemProps) {
  const [showHint, setShowHint] = useState(false);
  const [countdown, setCountdown] = useState(AUTO_ADVANCE_DELAY);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isCorrect = result.correct;
  const t = useTranslations('feedback');
  const isPartial = result.partial;
  const direction: 'up' | 'down' | 'same' = isCorrect
    ? 'up'
    : isPartial
      ? 'up'
      : 'down';

  const message = useMemo(() => {
    const pick = isCorrect
      ? pickRandom(CORRECT_MESSAGES)
      : isPartial
        ? pickRandom(PARTIAL_MESSAGES)
        : pickRandom(INCORRECT_MESSAGES);
    const msgs = (t.raw(pick.key) ?? []) as FeedbackMessage[];
    return msgs[pick.i] ?? { headline: '', sub: '' };
    // banks only re-created when t changes identity per locale switch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect, isPartial, t]);

  const handleNext = useCallback(() => {
    setHasInteracted(true);
    onNext();
  }, [onNext]);

  const handleAskTeacher = useCallback(() => {
    setHasInteracted(true);
    onAskTeacher();
  }, [onAskTeacher]);

  // Auto-advance countdown
  useEffect(() => {
    if (hasInteracted) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 100) {
          clearInterval(interval);
          handleNext();
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [hasInteracted, handleNext]);

  // Generate hint text from explanation
  const hintText = useMemo(() => {
    if (isCorrect) return '';
    const sentences = result.explanation.split(/[.!?]+/).filter(Boolean);
    if (sentences.length > 0) {
      return t('hintPrefix') + sentences[0].trim() + '...';
    }
    return t('hintPrefix') + result.explanation.slice(0, 120) + '...';
  }, [result.explanation, isCorrect, t]);

  // ─── Config ──────────────────────────────────────────────────────────────
  const statusConfig = {
    correct: {
      icon: CheckCircle2,
      iconColor: 'text-mint',
      bgTint: 'bg-mint/10',
      borderTint: 'border-mint/20',
      barGradient: 'from-mint to-emerald-400',
      label: t('badgeCorrect'),
    },
    partial: {
      icon: AlertCircle,
      iconColor: 'text-amber-400',
      bgTint: 'bg-amber-400/10',
      borderTint: 'border-amber-400/20',
      barGradient: 'from-amber-400 to-yellow-300',
      label: t('badgeAlmost'),
    },
    incorrect: {
      icon: XCircle,
      iconColor: 'text-red-400',
      bgTint: 'bg-red-500/10',
      borderTint: 'border-red-500/20',
      barGradient: 'from-red-500 to-rose-400',
      label: t('badgeIncorrect'),
    },
  };

  const config = isCorrect
    ? statusConfig.correct
    : isPartial
      ? statusConfig.partial
      : statusConfig.incorrect;

  const IconComponent = config.icon;

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={
        'w-full max-w-lg mx-auto rounded-2xl border backdrop-blur-xl '
        + 'bg-surface-800/90 border-white/10 shadow-2xl '
        + 'overflow-hidden'
      }
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {/* Header with icon and message */}
      <div className={
        'p-5 sm:p-6 border-b '
        + config.borderTint
      }>
        <motion.div
          key={isCorrect ? 'correct' : isPartial ? 'partial' : 'incorrect'}
          initial={isCorrect ? { scale: 0, rotate: -180 } : { x: -40, opacity: 0 }}
          animate={isCorrect ? { scale: 1, rotate: 0 } : { x: 0, opacity: 1 }}
          transition={isCorrect ? springBounce : { duration: 0.5, ease: 'easeOut' }}
          className="flex items-start gap-3"
        >
          <div className={(
            'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center '
            + config.bgTint + ' border ' + config.borderTint
          )}>
            <IconComponent
              className={`w-6 h-6 ${config.iconColor}`}
              strokeWidth={isCorrect ? 2.5 : 2}
              aria-hidden="true"
            />
          </div>
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className={
                'text-lg font-bold ' + config.iconColor
              }
              style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)' }}
            >
              {message.headline}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="text-sm text-gray-400 mt-0.5 leading-relaxed"
            >
              {message.icon && <span aria-hidden="true" className="mr-1">{message.icon}</span>}
              {message.sub}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Body */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="p-5 sm:p-6 space-y-5"
      >

        {/* Mastery Bar */}
        <motion.div variants={staggerItem}>
          <MasteryBar before={masteryChange.before} after={masteryChange.after} direction={direction} />
        </motion.div>

        {/* Correct answer + explanation for incorrect/partial */}
        <AnimatePresence>
          {!isCorrect && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="space-y-4 overflow-hidden"
            >
              {/* Correct Answer */}
              <motion.div variants={staggerItem} className={
                'p-4 rounded-xl border bg-white/5 border-white/10'
              }>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                  {t('correctAnswer')}
                </span>
                <div
                  className="text-base text-white font-medium"
                  dangerouslySetInnerHTML={{ __html: renderLatex(result.correct_answer) }}
                />
              </motion.div>

              {/* Explanation */}
              <motion.div variants={staggerItem} className={
                'p-4 rounded-xl border bg-white/5 border-white/10'
              }>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                  {t('explanation')}
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {result.explanation}
                </p>
              </motion.div>

              {/* Correct Solution Steps */}
              {result.steps && result.steps.length > 0 && (
                <motion.div variants={staggerItem} className={
                  'p-4 rounded-xl border bg-white/5 border-white/10'
                }>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">
                    {t('solutionWalkthrough')}
                  </span>
                  <StepDisplay steps={result.steps} />
                </motion.div>
              )}

              {/* Hint toggle */}
              {!isCorrect && (
                <motion.div variants={staggerItem}>
                  <button
                    onClick={() => setShowHint((prev) => !prev)}
                    className={
                      'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium '
                      + 'bg-brand-500/10 text-brand-300 border border-brand-500/20 '
                      + 'hover:bg-brand-500/20 transition-colors focus:outline-none '
                      + 'focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2 focus:ring-offset-surface-800'
                    }
                    aria-expanded={showHint}
                    aria-controls="hint-panel"
                  >
                    <Lightbulb className="w-4 h-4" aria-hidden="true" />
                    {showHint ? t('hideHint') : t('wantHint')}
                  </button>
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        id="hint-panel"
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="mt-3 p-3 rounded-lg bg-brand-500/5 border border-brand-500/15"
                        role="region"
                        aria-label={t('hintAria')}
                      >
                        <p className="text-sm text-brand-200/90 leading-relaxed">{hintText}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <motion.div variants={staggerItem} className="flex items-center gap-3 pt-1">
          {/* Ask Teacher — shown for incorrect */}
          {!isCorrect && (
            <button
              onClick={handleAskTeacher}
              className={
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium '
                + 'bg-white/5 text-gray-300 border border-white/10 '
                + 'hover:bg-white/10 hover:text-white transition-colors '
                + 'focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-surface-800'
              }
              aria-label={t('askTeacherAria')}
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('askTeacher')}
            </button>
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            className={
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold '
              + 'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-800 '
              + (isCorrect
                ? 'bg-mint text-surface-900 hover:bg-mint/90 focus:ring-mint/40'
                : 'bg-white/10 text-white hover:bg-white/15 focus:ring-white/20')
            }
            aria-label={t('nextAria')}
          >
            {t('nextQuestion')}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Auto-advance indicator */}
          {!hasInteracted && countdown > 0 && (
            <div
              className="ml-auto flex items-center gap-1.5 text-xs text-gray-500"
              aria-live="polite"
              aria-label={`Auto-advancing in ${Math.ceil(countdown / 1000)} seconds`}
            >
              <CountdownRing remaining={countdown} total={AUTO_ADVANCE_DELAY} />
              <span className="tabular-nums">{Math.ceil(countdown / 1000)}s</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
