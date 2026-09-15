'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Question bank keyed by problem type.
 * Each entry has the question, options array (first is correct),
 * an explanation for the correct answer, and a Hinglish teaching note.
 */
const QUESTION_BANK: Record<string, {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  teachingNote: string;
}> = {
  derivative: {
    question: 'x \u00d7 sin(x) ko differentiate karne ke liye kaunsa rule use hoga?',
    options: ['Product Rule', 'Chain Rule', 'Quotient Rule', 'Power Rule'],
    correct: 'Product Rule',
    explanation:
      'Product Rule tab apply hota hai jab do functions ke product ko differentiate kiya jaye. Yahan x \u00d7 sin(x) ek product hai \u2014 pehla function x, doosra sin(x).',
    teachingNote:
      'Pro tip: Product Rule \u2192 \"donon alag alag differentiate karo, phir combine\" \u2014 yaad rakhne ka shortcut!',
  },
  integral: {
    question: 'x \u00d7 e^x ko integrate karne ke liye kaunsa rule use hoga?',
    options: ['Product Rule', 'Integration by Parts', 'Partial Fractions', 'Substitution Rule'],
    correct: 'Integration by Parts',
    explanation:
      'Integration by Parts product of two functions ko integrate karne ke liye use hota hai. Yahan x \u00d7 e^x ka product hai, isliye IBP apply hoga.',
    teachingNote:
      'LIATE rule yaad rakh \u2014 Logarithmic, Inverse trig, Algebraic, Trig, Exponential \u2014 jo pehle aaye, wo \"u\" banega!',
  },
  limit: {
    question: 'lim (x\u21920) [sin(x)/x] jaise indeterminate form ko solve karne ke liye kaunsa method use hoga?',
    options: ['L\u2019H\u00f4pital Rule', 'Factorization', 'Rationalization', 'Substitution'],
    correct: "L'H\u00f4pital Rule",
    explanation:
      "Jab limit 0/0 ya \u221e/\u221e ki indeterminate form de rahi ho, tab L'H\u00f4pital Rule use hota hai. Yahan sin(0)/0 = 0/0 hai.",
    teachingNote:
      '0/0 ya \u221e/\u221e mil gayi? Seedha L\u2019H\u00f4pital \u2014 numerator aur denominator dono differentiate karo!',
  },
  matrix: {
    question: '2 \u00d7 3 matrix ka determinant possible hai ya nahi?',
    options: ['Yes, always', 'No, only for square matrices', 'Only for 3\u00d7 3', 'Only for identity matrices'],
    correct: 'No, only for square matrices',
    explanation:
      'Determinant sirf square matrices ke liye define hota hai (rows = columns). 2 \u00d7 3 matrix non-square hai, isliye determinant possible nahi hai.',
    teachingNote:
      'Determinant sirf square matrices ke liye \u2014 rows = columns hona chahiye!',
  },
  trigonometry: {
    question: 'sin(2x) ko simplify karne ke liye kaunsa formula use hoga?',
    options: ['Double Angle Formula', 'Sum Formula', 'Half Angle Formula', 'Pythagorean Identity'],
    correct: 'Double Angle Formula',
    explanation:
      'Double Angle Formula sin(2x) = 2sin(x)cos(x) deta hai. Jab angle double ho (2x), tab double angle formula use hota hai.',
    teachingNote:
      'sin(2x) = 2sin(x)cos(x) \u2014 ye formula har trigonometry ke exam mein aata hai!',
  },
  algebra: {
    question: 'Quadratic equation ax\u00b2 + bx + c = 0 ko solve karne ke liye kaunsa formula use hoga?',
    options: ['Quadratic Formula', 'Binomial Theorem', 'Arithmetic Progression', 'Geometric Progression'],
    correct: 'Quadratic Formula',
    explanation:
      'Quadratic Formula (-b \u00b1 \u221a(b\u00b2-4ac)) / 2a directly second-degree equations solve karne ke liye banaya gaya hai.',
    teachingNote:
      '\"B negative, plus minus, square root, b squared minus 4ac, all over 2a\" \u2014 yaad karne ka mnemonic!',
  },
};

/** Animation variants */
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.2 } },
};

const optionVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.08, type: 'spring', stiffness: 200, damping: 20 },
  }),
};

const successParticle = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: [0, 1.2, 1],
    opacity: [0, 1, 0],
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

/** Props for ThinkingQuestion */
interface ThinkingQuestionProps {
  problemType: string;
  onComplete: (result: {
    correct: boolean;
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
  }) => void;
}

/**
 * ThinkingQuestion — Conceptual competency check shown before the solver input form.
 *
 * Flow:
 * 1. Show the thinking question with 4 multiple-choice options.
 * 2. Student taps one option.
 * 3. If correct: green flash + success animation + onComplete({ correct: true })
 * 4. If wrong: red flash + explanation card + onComplete({ correct: false })
 *
 * Performance is tracked silently via the onComplete callback —
 * parent should feed it into a Zustand store or React Query mutation.
 */
export default function ThinkingQuestion({ problemType, onComplete }: ThinkingQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const question = QUESTION_BANK[problemType] || QUESTION_BANK['derivative'];

  const handleSelect = useCallback(
    (option: string) => {
      if (hasAnswered) return;
      setSelected(option);
      setHasAnswered(true);
      const correct = option === question.correct;
      setIsCorrect(correct);

      // Show explanation for wrong answers after a brief delay
      if (!correct) {
        setTimeout(() => setShowExplanation(true), 600);
      }

      // Auto-proceed after showing feedback
      const delay = correct ? 1800 : 3800;
      setTimeout(() => {
        setIsSubmitting(true);
        onComplete({
          correct,
          question: question.question,
          selectedAnswer: option,
          correctAnswer: question.correct,
        });
      }, delay);
    },
    [hasAnswered, question, onComplete]
  );

  // Keyboard navigation
  useEffect(() => {
    if (hasAnswered) return;
    const handleKey = (e: KeyboardEvent) => {
      const keyMap: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3 };
      if (keyMap[e.key] !== undefined) {
        optionRefs.current[keyMap[e.key]]?.click();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [hasAnswered]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-lg mx-auto"
    >
      {/* Header badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-500/15 text-indigo-300 border border-indigo-400/20">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Thinking Question
        </span>
        <span className="text-xs text-zinc-500">Press 1-4 to answer</span>
      </div>

      {/* Main card */}
      <div
        className={
          'relative glass-strong rounded-2xl p-6 border overflow-hidden'
        }
        style={{
          borderColor: hasAnswered
            ? isCorrect
              ? 'rgba(74, 222, 128, 0.3)'
              : 'rgba(248, 113, 113, 0.3)'
            : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Top glow line */}
        <div
          className={
            'absolute top-0 left-0 right-0 h-[2px] transition-colors duration-500'
          }
          style={{
            background: hasAnswered
              ? isCorrect
                ? 'linear-gradient(90deg, #4ade80, #22d3ee)'
                : 'linear-gradient(90deg, #f87171, #fb923c)'
              : 'linear-gradient(90deg, #6366f1, #ec4899)',
          }}
        />

        {/* Question text */}
        <div className="mb-5">
          <p className="text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Pehle soch: konse rule lagana hai?
          </p>
          <h3 className="text-lg font-semibold text-white font-['Space_Grotesk'] leading-snug">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2.5" role="radiogroup" aria-label="Answer options">
          {question.options.map((option, index) => {
            const isSelected = selected === option;
            const isCorrectAnswer = option === question.correct;

            let bgClass = 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08]';
            let textClass = 'text-zinc-300';

            if (hasAnswered) {
              if (isCorrectAnswer) {
                bgClass = 'bg-emerald-500/15 border-emerald-400/30';
                textClass = 'text-emerald-300';
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-red-500/15 border-red-400/30';
                textClass = 'text-red-300';
              } else {
                bgClass = 'bg-white/[0.02] border-white/[0.04]';
                textClass = 'text-zinc-500';
              }
            } else if (isSelected) {
              bgClass = 'bg-indigo-500/15 border-indigo-400/30';
              textClass = 'text-indigo-200';
            }

            return (
              <motion.button
                key={option}
                ref={(el) => { optionRefs.current[index] = el; }}
                custom={index}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
                onClick={() => handleSelect(option)}
                disabled={hasAnswered}
                aria-checked={isSelected}
                role="radio"
                tabIndex={hasAnswered ? -1 : 0}
                className={
                  `w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border\n                  transition-all duration-300 text-left group cursor-pointer\n                  ${bgClass} ${textClass}`
                }
              >
                {/* Option letter badge */}
                <span
                  className={
                    `flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center\n                    text-xs font-bold transition-colors duration-300\n                    ${isSelected ? 'bg-indigo-500/30 text-indigo-200' : 'bg-white/[0.06] text-zinc-500 group-hover:bg-white/[0.1] group-hover:text-zinc-400'}\n                    ${hasAnswered && isCorrectAnswer ? '!bg-emerald-500/30 !text-emerald-300' : ''}\n                    ${hasAnswered && isSelected && !isCorrect ? '!bg-red-500/30 !text-red-300' : ''}`
                }
                >
                  {String.fromCharCode(65 + index)}
                </span>

                {/* Option text */}
                <span className="flex-1 text-sm font-medium">{option}</span>

                {/* Status icons */}
                <AnimatePresence>
                  {hasAnswered && isCorrectAnswer && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex-shrink-0"
                    >
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.span>
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex-shrink-0"
                    >
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation panel (shown on wrong answer) */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20">
                <div className="flex gap-2.5">
                  <span className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-sm text-amber-200/90 leading-relaxed">
                      {question.explanation}
                    </p>
                    <p className="text-xs text-amber-300/70 italic">
                      {question.teachingNote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success feedback overlay */}
        <AnimatePresence>
          {hasAnswered && isCorrect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-2xl"
            >
              {/* Confetti particles */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * 360;
                const distance = 40 + (i % 3) * 20;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={successParticle}
                    initial="hidden"
                    animate="visible"
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#6366f1', '#ec4899', '#22d3ee', '#4ade80', '#fbbf24'][i % 5],
                    }}
                  />
                );
              })}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.05 }}
                className="text-center z-10"
              >
                <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-emerald-300 font-semibold text-sm">
                  Sahi Jawab!
                </p>
                <p className="text-zinc-400 text-xs mt-1">
                  Correct! Product rule apply hota hai jab do functions multiply hote hain.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator for keyboard */}
        {!hasAnswered && (
          <div className="flex items-center justify-center gap-1.5 mt-4" aria-hidden="true">
            {question.options.map((_, i) => (
              <span
                key={i}
                className={
                  'w-5 h-1 rounded-full transition-colors duration-300 '
                }
                style={{ background: 'rgba(255,255,255,0.1)' }}
              />
            ))}
            <span className="text-[10px] text-zinc-600 ml-2">Keys 1-4</span>
          </div>
        )}

        {/* Loading state while transitioning */}
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] rounded-2xl z-20">
            <div className="flex items-center gap-2 text-zinc-300">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm">Loading solver...</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
