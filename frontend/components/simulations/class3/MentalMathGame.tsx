'use client';

/**
 * MentalMathGame — Mental computation, multiplication, and estimation for Class 3
 *
 * CISCE Nodes: c3_math_014 (Mental computation of sum and difference of two digit numbers),
 *              c3_math_015 (Mental multiplication of two numbers without paper and pencil),
 *              c3_math_016 (Estimation of sum, difference and product and verification)
 *
 * ELI5: "Mental maths is like having a superpower in your head! Instead of writing
 *   on paper, you use smart tricks like breaking numbers into tens and ones,
 *   rounding to friendly tens, and estimating before you compute! No pencil needed!"
 *
 * Misconceptions:
 *   1. "Mental math means guessing the answer quickly" → "No! Mental math uses exact
 *      reasoned strategies like break-apart, not random guessing!"
 *   2. "Estimation is the exact answer" → "No! Estimation is an approximate guess
 *      close to the real answer, which we then verify by actual computation!"
 *   3. "You always round up when rounding" → "No! 0-4 round DOWN, 5-9 round UP!
 *      24 rounds down to 20, not 30!"
 *   4. "Rounding 48 gives 40" → "No! 48 rounds UP to 50 because the ones digit 8
 *      is 5 or more!"
 *   5. "15 x 4 equals 15 + 4 = 19" → "No! Multiplication is repeated addition:
 *      15 x 4 = 15 + 15 + 15 + 15 = 60!"
 *
 * Story: "Help Mental Math Wizard Mira navigate the Math Arena, use magic mental
 *   tricks, estimate with magic jars, and verify exact answers like a true math wizard!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'Mental Addition & Subtraction! 🧠',
    text: 'Do sums and differences in your head without paper! Use strategies like breaking into tens and ones (45 + 23 = 45 + 20 + 3 = 68) or compensation!',
    emoji: '➕',
    bgColor: 'from-purple-500 to-gold-600',
    spoken: 'Do sums and differences in your head without paper! Use strategies like breaking into tens and ones or compensation!',
  },
  {
    title: 'Mental Multiplication! ✖️',
    text: 'Multiply numbers without a pencil! Recall your tables instantly, or use the break-apart strategy for two-digit numbers (15 x 4: 10 x 4 = 40, 5 x 4 = 20, total 60)!',
    emoji: '✨',
    bgColor: 'from-gold-500 to-gold-600',
    spoken: 'Multiply numbers without a pencil! Recall your tables or use the break-apart strategy for two-digit numbers!',
  },
  {
    title: 'Estimation Magic! 🔮',
    text: 'Estimation gives you a quick close guess before you calculate! Round each number to the nearest ten (0-4 round down, 5-9 round up), then compute!',
    emoji: '🎯',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'Estimation gives you a quick close guess before you calculate! Round each number to the nearest ten, then compute!',
  },
  {
    title: 'Verify Your Answers! 🔍',
    text: 'Estimation is just a guide! Always verify your estimate by actually computing the exact answer using standard addition, subtraction, or multiplication.',
    emoji: '📝',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'Estimation is just a guide! Always verify your estimate by actually computing the exact answer.',
  },
  {
    title: 'Be a Mental Math Wizard! 🧙‍♂️',
    text: 'With practice, you can calculate faster than lightning in your head. No paper, no eraser, just pure math wizardry!',
    emoji: '🌟',
    bgColor: 'from-gold-500 to-purple-600',
    spoken: 'With practice, you can calculate faster than lightning in your head. No paper, no eraser, just pure math wizardry!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_add_sub' | 'identify_sub' | 'sort_strategies' | 'identify_mult' | 'sort_mult' | 'identify_estimate' | 'sort_rounding' | 'sort_estimation_verify';

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: { id: string; label: string; icon: string; correctBin: string }[];
  bins?: { id: string; label: string; color: string }[];
}

// ─── Challenges (8 progressive: easy → hard) ──────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_add_sub',
    question: 'What is 45 + 23 computed mentally?',
    answer: '68',
    options: ['68', '65', '423'],
    hint: 'Break 23 into 20 and 3. Add 20 to 45 (65), then add 3 more!',
    misconception: 'Mental math uses exact steps! 45 + 20 = 65, and 65 + 3 = 68. 423 is just guessing digits, not real mental computation!',
  },
  {
    type: 'identify_sub',
    question: 'What is 80 - 35 computed mentally?',
    answer: '45',
    options: ['45', '55', '115'],
    hint: 'Count on or break 35 into 30 and 5. 80 - 30 = 50, then 50 - 5 = 45!',
    misconception: 'When subtracting, 80 minus 30 is 50, and 50 minus 5 leaves 45. Mental subtraction needs clear steps in your head!',
  },
  {
    type: 'sort_strategies',
    question: 'Drag each mental math strategy to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Break apart splits into tens and ones. Round & adjust rounds numbers and corrects!',
    misconception: 'Strategies are tools! Breaking apart splits numbers into tens and ones. Rounding and adjusting tweaks numbers to friendly tens.',
    sortItems: [
      { id: 'break', label: 'Break Apart (23 = 20+3)', icon: 'strategy', correctBin: 'bin1' },
      { id: 'round', label: 'Round & Adjust (48+1=49)', icon: 'rounding', correctBin: 'bin2' },
    ],
    bins: [
      { id: 'bin1', label: 'Tens & Ones Split', color: '#8B5CF6' },
      { id: 'bin2', label: 'Friendly Tens Tweak', color: '#06B6D4' },
    ],
  },
  {
    type: 'identify_mult',
    question: 'What is 15 x 4 computed mentally?',
    answer: '60',
    options: ['60', '19', '54'],
    hint: 'Multiplication is repeated addition! 15 + 15 + 15 + 15, or 10 x 4 = 40 plus 5 x 4 = 20!',
    misconception: '15 x 4 is NOT 15 + 4 = 19! Multiplication means adding 15 four times: 40 + 20 = 60. No paper needed when you break it apart!',
  },
  {
    type: 'sort_mult',
    question: 'Drag each mental multiplication to its correct answer!',
    answer: 'sort',
    options: [],
    hint: '12 x 5 = 60 (10x5 + 2x5). 15 x 3 = 45 (10x3 + 5x3).',
    misconception: 'Break two-digit numbers into tens and ones! 12 x 5: 10 x 5 = 50, 2 x 5 = 10, total 60. 15 x 3: 30 + 15 = 45.',
    sortItems: [
      { id: 'm12x5', label: '12 x 5 = 60', icon: 'times', correctBin: 'bin60' },
      { id: 'm15x3', label: '15 x 3 = 45', icon: 'times', correctBin: 'bin45' },
      { id: 'm20x4', label: '20 x 4 = 80', icon: 'times', correctBin: 'bin80' },
    ],
    bins: [
      { id: 'bin60', label: 'Equals 60', color: '#3B82F6' },
      { id: 'bin45', label: 'Equals 45', color: '#10B981' },
      { id: 'bin80', label: 'Equals 80', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify_estimate',
    question: 'ESTIMATE: 48 + 31 (round to nearest 10). What is the estimated sum?',
    answer: '80',
    options: ['80', '79', '70'],
    hint: '48 rounds up to 50. 31 rounds down to 30. 50 + 30 = ?',
    misconception: 'Estimation rounds first! 48 rounds to 50, 31 rounds to 30, so 50 + 30 = 80. 79 is the actual exact sum, not the estimate!',
  },
  {
    type: 'sort_rounding',
    question: 'Drag each number to its correct rounded ten!',
    answer: 'sort',
    options: [],
    hint: '0-4 round down, 5-9 round up! 48 -> 50, 24 -> 20, 73 -> 70.',
    misconception: 'Remember rounding rules! 48 has 8 (>=5), so round UP to 50. 24 has 4 (<5), so round DOWN to 20. 73 rounds to 70.',
    sortItems: [
      { id: 'r48', label: '48 rounds to 50', icon: 'rounding', correctBin: 'bin50' },
      { id: 'r24', label: '24 rounds to 20', icon: 'rounding', correctBin: 'bin20' },
      { id: 'r73', label: '73 rounds to 70', icon: 'rounding', correctBin: 'bin70' },
    ],
    bins: [
      { id: 'bin50', label: 'Rounds to 50', color: '#EC4899' },
      { id: 'bin20', label: 'Rounds to 20', color: '#8B5CF6' },
      { id: 'bin70', label: 'Rounds to 70', color: '#3B82F6' },
    ],
  },
  {
    type: 'sort_estimation_verify',
    question: 'Match each problem to its estimate and actual verified answer!',
    answer: 'sort',
    options: [],
    hint: '48+31: Estimate 80, Actual 79. 73-28: Estimate 40, Actual 45.',
    misconception: 'Estimation is an approximate guide! Always verify by computing the exact answer to check how close your estimate was.',
    sortItems: [
      { id: 'e48', label: '48 + 31 (Est: 80, Act: 79)', icon: 'verify', correctBin: 'binA' },
      { id: 'e73', label: '73 - 28 (Est: 40, Act: 45)', icon: 'verify', correctBin: 'binB' },
    ],
    bins: [
      { id: 'binA', label: 'Sum (Est 80 / Act 79)', color: '#10B981' },
      { id: 'binB', label: 'Difference (Est 40 / Act 45)', color: '#F97316' },
    ],
  },
];

// ─── Mental Math Wizard Mira Mascot ───────────────────────────

function WizardMira({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-purple-900 text-white border-2 border-amber-300 rounded-xl px-3 py-2 shadow-lg max-w-[220px]"
          >
            <p className="text-xs font-bold">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Wizard Robe / Body */}
          <ellipse cx="37" cy="65" rx="22" ry="18" fill="#6D28D9" stroke="#4C1D95" strokeWidth="2" />
          {/* Glowing Brain / Head */}
          <circle cx="37" cy="40" r="16" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
          {/* Brain folds (squiggly lines) */}
          <path d="M30 35 Q35 32, 40 35 Q44 38, 38 43 Q33 46, 30 40 Z" fill="#FCE7F3" opacity="0.8" />
          {/* Wizard Hat */}
          <path d="M20 28 L37 2 L54 28 Z" fill="#7C3AED" stroke="#5B21B6" strokeWidth="2" />
          <ellipse cx="37" cy="28" rx="20" ry="4" fill="#8B5CF6" />
          {/* Star on hat */}
          <polygon points="37,10 39,15 44,15 40,18 42,23 37,20 32,23 34,18 30,15 35,15" fill="#FBBF24" />
          {/* Eyes */}
          <circle cx="31" cy="39" r="3" fill="#1E1B4B" />
          <circle cx="43" cy="39" r="3" fill="#1E1B4B" />
          <circle cx="32" cy="38" r="1" fill="white" />
          <circle cx="44" cy="38" r="1" fill="white" />
          {/* Smile */}
          <path d="M33 46 Q37 50 41 46" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Magic Wand in hand */}
          <line x1="55" y1="60" x2="68" y2="45" fill="none" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="68" cy="43" r="5" fill="#FBBF24" />
          {/* Floating math symbols around wizard */}
          <text x="8" y="30" fill="#FBBF24" fontSize="14" fontWeight="bold">+</text>
          <text x="60" y="25" fill="#38BDF8" fontSize="14" fontWeight="bold">-</text>
          <text x="12" y="70" fill="#34D399" fontSize="14" fontWeight="bold">×</text>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Math Arena Scene Background ──────────────────────────────

function MathArenaScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="math-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="50%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <radialGradient id="brain-glow" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#312E81" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#math-sky)" />
        <circle cx={width / 2} cy={height / 3} r={180} fill="url(#brain-glow)" />
      </svg>
      {/* Floating numbers & math symbols in background */}
      <motion.div className="absolute top-12 left-16 text-gold-300 font-bold text-2xl opacity-30" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        48 + 31 = ?
      </motion.div>
      <motion.div className="absolute top-20 right-24 text-pink-300 font-bold text-xl opacity-30" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        15 × 4
      </motion.div>
      <motion.div className="absolute bottom-20 left-20 text-gold-300 font-bold text-xl opacity-30" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
        80 - 35
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Math Component Icons ──────────────────────────

function BrainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d="M24 6 C14 6, 8 12, 8 22 C8 32, 16 38, 24 42 C32 38, 40 32, 40 22 C40 12, 34 6, 24 6 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
      <path d="M24 8 Q20 18, 24 28 Q28 38, 24 40" stroke="#9D174D" strokeWidth="2" fill="none" />
      <path d="M14 18 Q20 22, 24 25" stroke="#9D174D" strokeWidth="1.5" fill="none" />
      <path d="M34 18 Q28 22, 24 25" stroke="#9D174D" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function PlusIconSvg({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M24 12 V36 M12 24 H36" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function TimesIconSvg({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M15 15 L33 33 M33 15 L15 33" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function RoundingIconSvg({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
      <path d="M14 24 Q24 14, 34 24" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M30 20 L34 24 L30 28" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifyIconSvg({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      <path d="M14 24 L21 31 L34 16" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sort Card Icon Mapping ───────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'strategy': return <BrainIcon size={size} />;
    case 'rounding': return <RoundingIconSvg size={size} />;
    case 'times': return <TimesIconSvg size={size} />;
    case 'verify': return <VerifyIconSvg size={size} />;
    default: return <PlusIconSvg size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={130} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-200' : 'bg-white'} px-2 py-1`} style={{ width: 130, height: 95 }}>
        {renderSortIcon(icon, 38)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface MentalMathGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MentalMathGame({ width = 720, height = 560, onComplete }: MentalMathGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [misconceptionText, setMisconceptionText] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome to Mental Math Wizardry!');

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech & Audio management
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.text.slice(0, 50) + '...');
    } else if (screen === 'play' && currentChallenge) {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
    }
    return () => {
      speechManager.stop();
    };
  }, [screen, slideIdx, challengeIdx, currentChallenge]);

  // Reset sort state on challenge change
  useEffect(() => {
    setPlacedItems({});
    setFeedback(null);
    setHintVisible(false);
    setMisconceptionText(null);
  }, [challengeIdx]);

  // Inactivity auto-hint
  useEffect(() => {
    if (screen === 'play') {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        if (!hintVisible && feedback !== 'correct') {
          setHintVisible(true);
          audioManager.play('hint');
          speechManager.speak(currentChallenge.hint);
          setMascotSpeech(currentChallenge.hint);
        }
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [screen, challengeIdx, hintVisible, feedback, currentChallenge]);

  // Handle multiple-choice answers
  const handleAnswer = (option: string) => {
    if (feedback === 'correct') return;
    if (option === currentChallenge.answer) {
      audioManager.play('success');
      speechManager.speak('Correct! Excellent mental math!');
      setFeedback('correct');
      setMascotMood('celebrate');
      setMascotSpeech('Brilliant mental math!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setScore(prev => prev + 1);

      setTimeout(() => {
        advanceChallenge();
      }, 1800);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setFeedback('incorrect');
      setMascotMood('thinking');
      setMisconceptionText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = () => {
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Determine target bin based on drop coordinates (approximate bin zones)
    // Left bin vs Right bin / center bins
    let droppedBin = 'bin1';
    if (x > width / 2) droppedBin = currentChallenge.bins[1]?.id || 'bin2';
    if (currentChallenge.bins.length > 2 && x > width * 0.65) droppedBin = currentChallenge.bins[2]?.id || 'bin3';

    if (droppedBin === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      const allDone = currentChallenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        audioManager.play('success');
        speechManager.speak('Fantastic sorting! All sorted correctly!');
        setFeedback('correct');
        setMascotMood('celebrate');
        setMascotSpeech('Wonderful sorting wizardry!');
        setSparklePos({ x: width / 2, y: height / 2 });
        setScore(prev => prev + 1);

        setTimeout(() => {
          advanceChallenge();
        }, 1800);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMisconceptionText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
      setFeedback(null);
      setMisconceptionText(null);
      setHintVisible(false);
      setMascotMood('happy');
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You are a certified Mental Math Wizard!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  // Teaching slides navigation
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      setScreen('play');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between select-none overflow-hidden rounded-3xl shadow-2xl bg-gold-950 font-sans" style={{ width, height }}>
      {/* Background scene */}
      <MathArenaScene width={width} height={height} />

      {/* Wizard Mira Mascot */}
      <WizardMira mood={mascotMood} speaking={mascotSpeech} />

      {/* Header bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 py-3 bg-gold-900/80 backdrop-blur border-b border-gold-700">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600 shadow-inner">
            <BrainIcon size={28} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-wide">Mental Math Wizard</h1>
            <p className="text-xs text-gold-300">Class 3 CISCE Math</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-gold-300">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <StarRow count={score} total={CHALLENGES.length} />
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-6">
        {screen === 'teaching' ? (
          /* ─── TEACHING SCREEN (5 SLIDES) ─────────────────────── */
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl flex flex-col items-center text-center border-4 border-white/20`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            {/* Slide progress dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`} />
              ))}
            </div>

            <div className="flex gap-4 w-full justify-between">
              {slideIdx > 0 ? (
                <button onClick={handlePrevSlide} className="px-6 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 font-bold transition-all">
                  Back
                </button>
              ) : <div />}
              <button onClick={handleNextSlide} className="px-8 py-2.5 rounded-xl bg-white text-gold-900 font-extrabold shadow-lg hover:bg-amber-300 transition-all">
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        ) : (
          /* ─── PLAY SCREEN ────────────────────────────────────── */
          <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-gold-900/90 backdrop-blur border-2 border-gold-600 rounded-2xl p-6 shadow-xl mb-6 text-center"
            >
              <h2 className="text-xl font-black text-white mb-2">{currentChallenge.question}</h2>
              {hintVisible && (
                <HintBubble message={currentChallenge.hint} onComplete={() => setHintVisible(false)} />
              )}
            </motion.div>

            {/* Challenge Types: Multiple Choice vs Sort */}
            {currentChallenge.answer !== 'sort' ? (
              /* Multiple Choice Grid */
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                {currentChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(opt)}
                    className="py-5 px-4 rounded-2xl bg-gradient-to-br from-purple-600 to-gold-700 hover:from-purple-500 hover:to-gold-600 text-white font-black text-2xl shadow-xl border-2 border-purple-400 flex items-center justify-center"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Sort Challenge Arena */
              <div className="relative w-full h-[285px] bg-gold-900/60 rounded-2xl border-2 border-gold-700 p-4 flex flex-col justify-between">
                {/* Bins at bottom */}
                <div className="flex justify-around w-full mt-auto pt-16">
                  {currentChallenge.bins?.map((bin, idx) => (
                    <div
                      key={bin.id}
                      className="flex flex-col items-center justify-center rounded-2xl border-4 border-dashed border-white/40 p-3"
                      style={{ width: idx === 2 ? 160 : 180, height: 95, backgroundColor: bin.color + '33' }}
                    >
                      <span className="text-sm font-black text-white text-center">{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable items at top */}
                <div className="absolute top-4 left-0 right-0 flex justify-around px-6">
                  {currentChallenge.sortItems?.map((item, idx) => {
                    const placed = placedItems[item.id] || false;
                    const startX = (idx - 1) * 140;
                    const startY = 10;
                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={startX}
                        y={startY}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Misconception Feedback Banner */}
            {misconceptionText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-rose-900/90 border-2 border-rose-500 rounded-xl text-rose-100 text-xs font-bold text-center max-w-lg"
              >
                ⚠️ {misconceptionText}
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Success / Feedback overlays */}
      {feedback === 'correct' && <SuccessBanner message="Brilliant Mental Math! 🌟" onComplete={() => {}} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
