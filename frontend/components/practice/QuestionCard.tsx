'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// ─── Types ────────────────────────────────────────────────────────────

type Difficulty = 'Easy' | 'Medium' | 'Hard';

type BloomsLevel =
  | 'Remembering'
  | 'Understanding'
  | 'Applying'
  | 'Analyzing'
  | 'Evaluating'
  | 'Creating';

type InputType = 'math' | 'numeric' | 'mcq';

export interface Question {
  text: string;
  marks: number;
  difficulty: Difficulty;
  is_competency: boolean;
  blooms_level: BloomsLevel;
  diagram?: string;
  input_type: InputType;
  options?: string[];
}

export interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  timeLimitSeconds?: number;
  onAnswer: (answer: string, timeMs: number) => void;
  onSkip: () => void;
  onHint: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────

const BLOOMS_META: Record<BloomsLevel, { color: string; bg: string; icon: string }> = {
  Remembering:   { color: 'text-gold-300',   bg: 'bg-gold-500/15 border-gold-400/30',  icon: '🧠' },
  Understanding: { color: 'text-gold-300',   bg: 'bg-gold-500/15 border-gold-400/30',   icon: '💡' },
  Applying:      { color: 'text-emerald-300',bg: 'bg-emerald-500/15 border-emerald-400/30', icon: '🔧' },
  Analyzing:     { color: 'text-amber-300',  bg: 'bg-amber-500/15 border-amber-400/30', icon: '🔍' },
  Evaluating:    { color: 'text-orange-300', bg: 'bg-orange-500/15 border-orange-400/30', icon: '⚖️' },
  Creating:      { color: 'text-rose-300',   bg: 'bg-rose-500/15 border-rose-400/30',   icon: '✨' },
};

const DIFFICULTY_META: Record<Difficulty, { color: string; bg: string; dot: string }> = {
  Easy:   { color: 'text-emerald-300', bg: 'bg-emerald-500/20 border-emerald-400/30', dot: 'bg-emerald-400' },
  Medium: { color: 'text-amber-300',   bg: 'bg-amber-500/20 border-amber-400/30',    dot: 'bg-amber-400' },
  Hard:   { color: 'text-red-300',     bg: 'bg-red-500/20 border-red-400/30',       dot: 'bg-red-400' },
};

const DEFAULT_TIME = 120;

// ─── KaTeX Renderer ──────────────────────────────────────────────────

function KaTeXBlock({ formula, displayMode = false }: { formula: string; displayMode?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      katex.render(formula, containerRef.current, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: true,
        macros: {
          '\\R': '\\mathbb{R}',
          '\\N': '\\mathbb{N}',
          '\\Z': '\\mathbb{Z}',
          '\\vec': '\\mathbf{#1}',
        },
      });
    } catch {
      if (containerRef.current) {
        containerRef.current.textContent = formula;
      }
    }
  }, [formula, displayMode]);

  return <span ref={containerRef} className="katex-inline" />;
}

// ─── Question Text Parser ─────────────────────────────────────────────

function parseQuestionText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{text.slice(lastIndex, match.index)}</span>
      );
    }
    const latex = match[1] || match[2];
    if (latex) {
      parts.push(
        <KaTeXBlock key={key++} formula={latex} displayMode={!!match[1]} />
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return parts.length ? parts : [text];
}

// ─── Timer Component ──────────────────────────────────────────────────

function SubtleTimer({
  totalSeconds,
  onExpire,
}: {
  totalSeconds: number;
  onExpire: () => void;
}) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const warnedRef = useRef(false);

  useEffect(() => {
    if (totalSeconds <= 0) return;

    setRemaining(totalSeconds);
    warnedRef.current = false;

    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, onExpire]);

  const fraction = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const isLow = fraction <= 0.25;
  const isMed = fraction <= 0.5 && !isLow;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeLabel = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className="flex items-center gap-1.5"
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${timeLabel}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          isLow
            ? 'text-red-400 animate-pulse'
            : isMed
            ? 'text-amber-400'
            : 'text-white/40'
        }
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>

      <span
        className={
          'text-sm font-medium tabular-nums min-w-[2.5rem] text-center transition-colors duration-500 '
          + (isLow
            ? 'text-red-400'
            : isMed
            ? 'text-amber-300'
            : 'text-white/50')
        }
      >
        {timeLabel}
      </span>

      {isLow && (
        <span className="sr-only">Time is running low</span>
      )}
    </div>
  );
}

// ─── Difficulty Badge ─────────────────────────────────────────────────

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const meta = DIFFICULTY_META[difficulty];
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border '
        + meta.color + ' ' + meta.bg
      }
      aria-label={`Difficulty: ${difficulty}`}
    >
      <span className={'w-1.5 h-1.5 rounded-full ' + meta.dot} aria-hidden="true" />
      {difficulty}
    </span>
  );
}

// ─── Blooms Badge ─────────────────────────────────────────────────────

function BloomsBadge({ level }: { level: BloomsLevel }) {
  const meta = BLOOMS_META[level];
  return (
    <span
      className={
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium border '
        + meta.color + ' ' + meta.bg
      }
      aria-label={`Bloom\'s level: ${level}`}
      title={`Bloom\'s Taxonomy: ${level}`}
    >
      <span aria-hidden="true" className="text-[11px] leading-none">{meta.icon}</span>
      {level}
    </span>
  );
}

// ─── Competency Badge ─────────────────────────────────────────────────

function CompetencyBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold \
      text-purple-300 bg-purple-500/15 border border-purple-400/30"
      aria-label="Competency-based question with real-world context"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      Competency
    </span>
  );
}

// ─── Math Input Component ─────────────────────────────────────────────

function MathInput({
  onSubmit,
  disabled,
}: {
  onSubmit: (value: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
  }, [value, onSubmit, disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="space-y-2">
      <label htmlFor="math-answer" className="sr-only">
        Enter your mathematical answer using LaTeX notation
      </label>
      <div className="relative">
        <textarea
          ref={inputRef}
          id="math-answer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={2}
          placeholder="e.g. \\cos(x) + x\\cdot\\sin(x)"
          className={
            'w-full px-4 py-3 rounded-xl text-base leading-relaxed \
            bg-white/[0.06] border border-white/10 text-white placeholder-white/25 \
            focus:outline-none focus:ring-2 focus:ring-gold-400/60 focus:border-gold-400/50 \
            focus:bg-white/[0.08] transition-all duration-200 resize-none \
            font-mono text-[15px] tracking-wide disabled:opacity-50'
          }
          aria-describedby="math-hint"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute right-3 top-3 p-1 rounded-lg text-white/30 hover:text-white/70 transition-colors"
            aria-label="Clear answer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <p id="math-hint" className="text-[11px] text-white/30 px-1">
        Use LaTeX notation. Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-[10px] font-mono">Enter</kbd> to submit.
      </p>
    </div>
  );
}

// ─── Numeric Input Component ──────────────────────────────────────────

function NumericInput({
  onSubmit,
  disabled,
}: {
  onSubmit: (value: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
  }, [value, onSubmit, disabled]);

  return (
    <div className="space-y-2">
      <label htmlFor="numeric-answer" className="sr-only">
        Enter your numeric answer
      </label>
      <input
        ref={inputRef}
        id="numeric-answer"
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        disabled={disabled}
        placeholder="Your answer..."
        className={
          'w-full px-4 py-3 rounded-xl text-base \
          bg-white/[0.06] border border-white/10 text-white placeholder-white/25 \
          focus:outline-none focus:ring-2 focus:ring-gold-400/60 focus:border-gold-400/50 \
          focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50'
        }
      />
    </div>
  );
}

// ─── MCQ Input Component ──────────────────────────────────────────────

function MCQInput({
  options,
  onSubmit,
  disabled,
}: {
  options: string[];
  onSubmit: (value: string) => void;
  disabled: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstRadio = groupRef.current?.querySelector('input[type="radio"]') as HTMLInputElement | null;
    firstRadio?.focus();
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      if (disabled) return;
      setSelected(option);
      onSubmit(option);
    },
    [onSubmit, disabled]
  );

  const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Answer choices"
      className="space-y-2.5"
    >
      {options.map((option, i) => {
        const isSelected = selected === option;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            disabled={disabled}
            onClick={() => handleSelect(option)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect(option);
              }
            }}
            className={
              'w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left \
              border transition-all duration-200 group \
              '
              + (
                isSelected
                  ? 'bg-gold-500/20 border-gold-400/50 text-white shadow-lg shadow-gold-500/10'
                  : 'bg-white/[0.04] border-white/10 text-white/80 hover:bg-white/[0.07] hover:border-white/20'
              )
              + (disabled ? ' opacity-50 pointer-events-none' : '')
            }
          >
            <span
              className={
                'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 '
                + (
                  isSelected
                    ? 'bg-gold-500 text-white shadow-md shadow-gold-500/30'
                    : 'bg-white/[0.08] text-white/50 group-hover:bg-white/[0.12]'
                )
              }
              aria-hidden="true"
            >
              {labels[i]}
            </span>
            <span className="text-[15px] leading-snug flex-1">
              {option}
            </span>
            {isSelected && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold-300 flex-shrink-0"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Progressive Hints ────────────────────────────────────────────────

function ProgressiveHints({ onRequestHint }: { onRequestHint: () => void }) {
  const [hints, setHints] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const handleHint = useCallback(() => {
    onRequestHint();
    // In production, hints come from API. Here we simulate reveal.
    setHints((prev) => {
      if (prev.length >= 3) return prev;
      const newHints = [
        'Try using the product rule: d/dx[u·v] = u\'·v + u·v\'',
        'Here, u = x, so u\' = 1. And v = sin(x), so v\' = cos(x).',
        'Combine: d/dx[x·sin(x)] = 1·sin(x) + x·cos(x)',
      ];
      return [...prev, newHints[prev.length]];
    });
    setShowAll(false);
  }, [onRequestHint]);

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {hints.map((hint, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={
              'flex items-start gap-2 px-3 py-2.5 rounded-lg \
              bg-gold-500/10 border border-gold-400/20'
            }
          >
            <span
              className={
                'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center \
                text-[10px] font-bold mt-0.5 '
                + (i === 0
                  ? 'bg-amber-500/30 text-amber-200'
                  : i === 1
                  ? 'bg-orange-500/30 text-orange-200'
                  : 'bg-rose-500/30 text-rose-200')
              }
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="text-[13px] text-gold-200/90 leading-relaxed">
              {hint}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {hints.length > 0 && hints.length < 3 && !showAll && (
        <button
          type="button"
          onClick={handleHint}
          className="text-xs text-gold-300/70 hover:text-gold-300 transition-colors py-1 flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          Show next hint ({3 - hints.length} remaining)
        </button>
      )}

      {hints.length === 0 && (
        <button
          type="button"
          onClick={handleHint}
          className={
            'inline-flex items-center gap-1.5 text-xs font-medium py-1.5 px-3 rounded-lg \
            transition-all duration-200 '
            + (
              hints.length >= 3
                ? 'text-white/20 cursor-not-allowed'
                : 'text-amber-300/80 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/20'
            )
          }
          disabled={hints.length >= 3}
          aria-label="Request a hint"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Need a hint?
        </button>
      )}
    </div>
  );
}

// ─── Main QuestionCard Component ──────────────────────────────────────

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  timeLimitSeconds = DEFAULT_TIME,
  onAnswer,
  onSkip,
  onHint,
}: QuestionCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef(Date.now());
  const submitRef = useRef<HTMLButtonElement>(null);

  // Reset state on new question
  useEffect(() => {
    setIsSubmitting(false);
    setShowHints(false);
    setIsExiting(false);
    startTimeRef.current = Date.now();
  }, [question.text]);

  const handleSubmit = useCallback(
    (answer: string) => {
      if (isSubmitting) return;
      const timeMs = Date.now() - startTimeRef.current;
      setIsSubmitting(true);
      onAnswer(answer, timeMs);
    },
    [isSubmitting, onAnswer]
  );

  const handleSkip = useCallback(() => {
    if (isSubmitting) return;
    setIsExiting(true);
    setTimeout(onSkip, 300);
  }, [isSubmitting, onSkip]);

  const handleHintRequest = useCallback(() => {
    setShowHints(true);
    onHint();
  }, [onHint]);

  const handleTimerExpire = useCallback(() => {
    if (!isSubmitting) {
      handleSubmit('');
    }
  }, [isSubmitting, handleSubmit]);

  const progress = ((questionNumber - 1) / totalQuestions) * 100;
  const bloomsMeta = BLOOMS_META[question.blooms_level];
  const diffMeta = DIFFICULTY_META[question.difficulty];

  // Exit animation variants
  const exitVariant = {
    initial: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -120, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <motion.div
      key={question.text}
      variants={exitVariant}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -120 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-full max-w-lg mx-auto"
      aria-label={`Question ${questionNumber} of ${totalQuestions}`}
    >
      {/* ─── Glass Card ─────────────────────────────────────────── */}
      <div
        className={
          'relative overflow-hidden rounded-3xl \
          bg-white/[0.04] backdrop-blur-xl \
          border border-white/[0.08] shadow-2xl shadow-black/20 \
          before:absolute before:inset-0 before:rounded-3xl before:p-[1px] \
          before:bg-gradient-to-br before:from-white/[0.12] before:to-transparent \
          before:pointer-events-none'
        }
      >
        {/* ─── Top shimmer accent ──────────────────────────────── */}
        <div
          className="h-[2px] bg-gradient-to-r from-gold-500/0 via-gold-400/60 to-pink-400/40"
          aria-hidden="true"
        />

        {/* ─── Header: Progress + Question Counter + Timer ────── */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            {/* Question counter */}
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold text-white/30 tracking-wider uppercase"
                aria-hidden="true"
              >
                Q
              </span>
              <span className="text-sm font-bold text-white/80 tabular-nums">
                {questionNumber}
                <span className="text-white/20 mx-1">/</span>
                <span className="text-white/40">{totalQuestions}</span>
              </span>
            </div>

            {/* Timer */}
            <SubtleTimer totalSeconds={timeLimitSeconds} onExpire={handleTimerExpire} />
          </div>

          {/* Progress bar */}
          <div
            className="h-1 rounded-full bg-white/[0.06] overflow-hidden"
            role="progressbar"
            aria-valuenow={questionNumber}
            aria-valuemin={1}
            aria-valuemax={totalQuestions}
            aria-label={`Question ${questionNumber} of ${totalQuestions}`}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
              initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* ─── Badges Row ─────────────────────────────────────── */}
        <div className="px-5 pb-3 flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={question.difficulty} />

          <span
            className={'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border '
              + diffMeta.color + ' ' + diffMeta.bg}
            aria-label={`${question.marks} marks`}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
            </svg>
            {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
          </span>

          <BloomsBadge level={question.blooms_level} />

          {question.is_competency && <CompetencyBadge />}
        </div>

        {/* ─── Question Text ──────────────────────────────────── */}
        <div className="px-5 pb-4">
          <div
            className={
              'text-[17px] leading-[1.6] text-white/90 font-normal \
              [&_.katex]:text-white/95 [&_.katex-display]:my-3 [&_.katex-display]:overflow-x-auto'
            }
          >
            {parseQuestionText(question.text)}
          </div>
        </div>

        {/* ─── Diagram ────────────────────────────────────────── */}
        {question.diagram && (
          <div className="px-5 pb-4">
            <figure className="relative">
              <img
                src={question.diagram}
                alt="Diagram for question"
                className="w-full max-h-52 object-contain rounded-xl bg-white/[0.03] border border-white/[0.06]"
                loading="lazy"
              />
              <figcaption className="sr-only">Question diagram</figcaption>
            </figure>
          </div>
        )}

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" aria-hidden="true" />

        {/* ─── Input Area ─────────────────────────────────────── */}
        <div className="px-5 pt-4 pb-2">
          {question.input_type === 'math' && (
            <MathInput onSubmit={handleSubmit} disabled={isSubmitting} />
          )}
          {question.input_type === 'numeric' && (
            <NumericInput onSubmit={handleSubmit} disabled={isSubmitting} />
          )}
          {question.input_type === 'mcq' && question.options && (
            <MCQInput
              options={question.options}
              onSubmit={handleSubmit}
              disabled={isSubmitting}
            />
          )}
        </div>

        {/* ─── Hints ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="px-5 overflow-hidden"
            >
              <div className="pt-3 pb-1">
                <ProgressiveHints onRequestHint={handleHintRequest} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Action Buttons ─────────────────────────────────── */}
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Hint toggle */}
            <button
              type="button"
              onClick={() => setShowHints((p) => !p)}
              disabled={isSubmitting}
              className={
                'inline-flex items-center gap-1.5 text-xs font-medium py-2 px-3 rounded-xl \
                border transition-all duration-200 '
                + (
                  showHints
                    ? 'bg-gold-500/20 border-gold-400/40 text-gold-200'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/70 hover:bg-white/[0.07]'
                )
                + (isSubmitting ? ' opacity-40 pointer-events-none' : '')
              }
              aria-expanded={showHints}
              aria-controls="hints-panel"
              aria-label={showHints ? 'Hide hints' : 'Show hints'}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              {showHints ? 'Hide' : 'Hint'}
            </button>

            {/* Skip */}
            <button
              type="button"
              onClick={handleSkip}
              disabled={isSubmitting}
              className={
                'inline-flex items-center gap-1 text-xs font-medium py-2 px-3 rounded-xl \
                transition-all duration-200 '
                + (isSubmitting
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]')
              }
              aria-label={`Skip question ${questionNumber}`}
            >
              Skip
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Submit button */}
          <button
            ref={submitRef}
            type="submit"
            onClick={() => {
              const el = document.activeElement as HTMLElement;
              const val = el?.tagName === 'TEXTAREA' || el?.tagName === 'INPUT'
                ? (el as HTMLInputElement | HTMLTextAreaElement).value
                : '';
              if (val.trim()) handleSubmit(val.trim());
            }}
            disabled={isSubmitting}
            className={
              'inline-flex items-center gap-2 py-2.5 px-6 rounded-xl \
              text-sm font-bold transition-all duration-200 \
              shadow-lg shadow-gold-500/20 '
              + (
                isSubmitting
                  ? 'bg-gold-500/30 text-gold-200/50 cursor-wait'
                  : 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500 active:scale-[0.97] shadow-gold-500/30'
              )
            }
            aria-label="Submit answer"
          >
            {isSubmitting ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="animate-spin"
                  aria-hidden="true"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Screen reader live region for dynamic updates */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isSubmitting ? 'Submitting your answer' : ''}
      </div>
    </motion.div>
  );
}
