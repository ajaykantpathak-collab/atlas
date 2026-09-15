'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SolverStep {
  step_number: number;
  rule_applied: string;
  rule_formula: string;
  input_expr: string;
  output_expr: string;
  explanation: string;
  hint?: string;
}

export interface SolverResult {
  steps: SolverStep[];
  final_answer?: string;
  problem_statement?: string;
  is_complete: boolean;
}

interface StepDisplayProps {
  result: SolverResult | null;
  isLoading?: boolean;
  onTrySimilar?: () => void;
  onExplainSimpler?: (step: SolverStep) => void;
  onWhyThisRule?: (step: SolverStep) => void;
  className?: string;
}

// ─── KaTeX Renderer ──────────────────────────────────────────────────────────

function MathBlock({ math, displayMode = true }: { math: string; displayMode?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !math) return;
    try {
      katex.render(math, containerRef.current, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: true,
        macros: {
          '\\f': '\\frac{#1}{#2}',
          '\\ddx': '\\frac{d}{dx}',
          '\\deriv': '\\frac{d}{dx}\left[#1\right]',
        },
      });
    } catch (e) {
      if (containerRef.current) {
        containerRef.current.textContent = math;
      }
    }
  }, [math, displayMode]);

  return (
    <div
      ref={containerRef}
      className={`${displayMode ? 'my-3 overflow-x-auto py-2' : 'inline'}`}
      role="math"
      aria-label={math.replace(/\\/g, '').replace(/[{}/]/g, '')}
    />
  );
}

import { useRef } from 'react';

// ─── Animations ──────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

const transitionConfig = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.25 },
  scale: { duration: 0.25 },
};

// ─── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full" aria-label={`Progress: step ${current} of ${total}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-white/50 font-['Space_Grotesk']">
          Progress
        </span>
        <span className="text-xs font-bold text-brand-400 font-['JetBrains_Mono']">
          {current} / {total}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}

// ─── Step Dots Indicator ─────────────────────────────────────────────────────

function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div
      className="flex items-center justify-center gap-2 mt-4"
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, i) => {
        const isActive = i + 1 <= current;
        const isCurrent = i + 1 === current;
        return (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: isCurrent ? 24 : 8,
              height: 8,
              backgroundColor: isActive
                ? i + 1 === current
                  ? '#818cf8'
                  : '#6366f1'
                : 'rgba(255,255,255,0.15)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        );
      })}
    </div>
  );
}

// ─── Transformation Arrow ────────────────────────────────────────────────────

function TransformationArrow() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-brand-400"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      </div>
    </div>
  );
}

// ─── Action Buttons ──────────────────────────────────────────────────────────

function ActionButton({
  onClick,
  children,
  variant = 'secondary',
  disabled = false,
  icon,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  const base =
    'flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 active:scale-95';

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40',
    secondary:
      'glass-card text-white/80 hover:text-white hover:bg-white/10 border border-white/10',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      type="button"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

// ─── Completion Card ─────────────────────────────────────────────────────────

function CompletionCard({
  answer,
  problem,
  onTrySimilar,
}: {
  answer?: string;
  problem?: string;
  onTrySimilar: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!answerRef.current || !answer) return;
    try {
      katex.render(answer, answerRef.current, {
        displayMode: true,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch {
      if (answerRef.current) answerRef.current.textContent = answer;
    }
  }, [answer]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-mint-400 to-green-500 flex items-center justify-center shadow-lg shadow-mint-500/30"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-1 font-['Space_Grotesk']">
        Solution Complete! 🎉
      </h3>
      <p className="text-sm text-white/50 mb-6 font-['Plus_Jakarta_Sans']">
        Aap ne sahi solution dekha — ab try karo similar problem par!
      </p>

      {/* Final Answer */}
      {answer && (
        <div className="glass-strong rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3 font-['Space_Grotesk']">
            Final Answer
          </p>
          <div
            ref={answerRef}
            className="text-white text-lg"
            role="math"
            aria-label={`Final answer: ${answer}`}
          />
        </div>
      )}

      {/* Problem Statement */}
      {problem && (
        <div className="glass-card rounded-xl px-4 py-2 mb-6 inline-block">
          <span className="text-xs text-white/40 mr-2">Problem:</span>
          <span className="text-sm text-white/70 font-['Plus_Jakarta_Sans']">
            {problem}
          </span>
        </div>
      )}

      {/* Try Similar Button */}
      <div>
        <ActionButton onClick={onTrySimilar} variant="primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 11-6.219-8.56" />
            <path d="M21 3v5h-5" />
          </svg>
          Try Similar Problem
        </ActionButton>
      </div>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="relative w-16 h-16 mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-3 border-brand-500/20 border-t-brand-500 border-r-brand-400"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-2xl">🧮</span>
        </motion.div>
      </div>
      <p className="text-white/50 text-sm font-['Plus_Jakarta_Sans'] animate-pulse">
        Steps solve ho rahe hain...
      </p>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 mb-4 rounded-full bg-white/5 flex items-center justify-center">
        <span className="text-4xl">📐</span>
      </div>
      <h3 className="text-lg font-bold text-white/70 font-['Space_Grotesk'] mb-2">
        Ready to Solve?
      </h3>
      <p className="text-sm text-white/40 font-['Plus_Jakarta_Sans'] max-w-xs">
        Ek problem daalo aur step-by-step solution dekho — har step ke saath samajhte hue seekhenge!
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function StepDisplay({
  result,
  isLoading = false,
  onTrySimilar,
  onExplainSimpler,
  onWhyThisRule,
  className = '',
}: StepDisplayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalSteps = result?.steps?.length ?? 0;
  const isComplete = result?.is_complete ?? false;
  const hasNoResult = !result && !isLoading;

  // Reset on new result
  useEffect(() => {
    setCurrentStep(0);
    setDirection(1);
  }, [result?.problem_statement]);

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, totalSteps]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // ── Loading State ──
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // ── Empty State ──
  if (hasNoResult) {
    return <EmptyState />;
  }

  const step = result?.steps?.[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  // ── Completed State ──
  if (isComplete && currentStep >= totalSteps - 1) {
    return (
      <div className={`w-full max-w-lg mx-auto px-4 py-6 ${className}`}>
        <CompletionCard
          answer={result.final_answer}
          problem={result.problem_statement}
          onTrySimilar={onTrySimilar ?? (() => {})}
        />
      </div>
    );
  }

  // ── Step View ──
  if (!step) {
    return <EmptyState />;
  }

  return (
    <div
      className={`w-full max-w-lg mx-auto px-4 py-4 ${className}`}
      role="region"
      aria-label="Step-by-step solution"
      aria-live="polite"
    >
      {/* Progress */}
      <ProgressBar current={currentStep + 1} total={totalSteps} />
      <StepDots current={currentStep + 1} total={totalSteps} />

      {/* Step Card */}
      <motion.div
        key={step.step_number}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transitionConfig}
        className="mt-6"
      >
        <div className="glass-strong rounded-3xl p-5 shadow-2xl shadow-brand-500/5 border border-white/10">
          {/* Step Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/30 shrink-0">
              <span className="text-sm font-bold text-white font-['JetBrains_Mono']">
                {step.step_number}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white font-['Space_Grotesk'] leading-tight truncate">
                {step.rule_applied}
              </h3>
            </div>
          </div>

          {/* Rule Formula */}
          {step.rule_formula && (
            <div className="bg-white/5 rounded-2xl p-3 mb-4 border border-white/5">
              <p className="text-[10px] font-semibold text-brand-400/80 uppercase tracking-widest mb-2 font-['Space_Grotesk']">
                Rule
              </p>
              <MathBlock math={step.rule_formula} />
            </div>
          )}

          {/* Input → Output Transformation */}
          <div className="bg-white/[0.03] rounded-2xl p-4 mb-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold text-accent-400/80 uppercase tracking-widest font-['Space_Grotesk']">
                Before
              </span>
              <div className="flex-1 h-px bg-white/10" />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-brand-400"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[10px] font-semibold text-mint-400/80 uppercase tracking-widest font-['Space_Grotesk']">
                After
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3">
                <MathBlock math={step.input_expr} displayMode={false} />
              </div>
              <div className="bg-brand-500/10 rounded-xl p-3 border border-brand-500/20">
                <MathBlock math={step.output_expr} displayMode={false} />
              </div>
            </div>
          </div>

          {/* Hint (if exists) */}
          {step.hint && (
            <div className="bg-gold-500/10 rounded-xl px-4 py-2.5 mb-4 border border-gold-500/20 flex items-start gap-2">
              <span className="text-sm mt-0.5">💡</span>
              <p className="text-xs text-gold-300/80 font-['Plus_Jakarta_Sans'] leading-relaxed">
                {step.hint}
              </p>
            </div>
          )}

          {/* Explanation */}
          <div className="bg-brand-500/5 rounded-2xl p-4 mb-5 border border-brand-500/10">
            <p className="text-[10px] font-semibold text-brand-400/80 uppercase tracking-widest mb-2 font-['Space_Grotesk']">
              Explanation
            </p>
            <p className="text-sm text-white/80 font-['Plus_Jakarta_Sans'] leading-relaxed">
              {step.explanation}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <button
                onClick={() => onExplainSimpler?.(step)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer"
                type="button"
                aria-label="Explain this step in simpler terms"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Samjhao aur aasaan
              </button>
              <button
                onClick={() => onWhyThisRule?.(step)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer"
                type="button"
                aria-label="Learn why this rule is applied"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                </svg>
                Why this rule?
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2.5">
              {currentStep > 0 && (
                <button
                  onClick={goPrev}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/70 glass-card hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer"
                  type="button"
                  aria-label="Go to previous step"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Previous
                </button>
              )}

              <button
                onClick={goNext}
                className={`${currentStep === 0 ? 'w-full' : 'flex-1'} flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:scale-95 transition-all duration-200 cursor-pointer`}
                type="button"
                aria-label={isLastStep ? 'View final answer' : 'Go to next step'}
              >
                <span>{isLastStep ? 'See Final Answer' : 'Next Step'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
